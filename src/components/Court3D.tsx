import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { PlayStep } from '../types';

interface Court3DProps {
  step: PlayStep;
  previousStep?: PlayStep;
  animate: boolean;
  isPlaying: boolean;
}

type CameraMode = 'tactical' | 'passer_pov' | 'post_cam';

// ── Coordinate Converter ─────────────────────────────────────────────────────
// 2D Court: 470 x 500 (Basket at 52.5, 250)
// 3D Court: Length X [-23.5, 23.5], Width Z [-25, 25], Height Y [0, 15]
function to3D(x2d: number, y2d: number) {
  const x3d = (x2d - 52.5) / 10 - 18.25;
  const z3d = (y2d - 250) / 10;
  return { x: x3d, z: z3d };
}

// ── Create Floating Position Text Sprite ───────────────────────────────────
function createTextSprite(text: string, bgColor: string, textColor: string = '#ffffff') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Sprite();

  // Pill background
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.arc(64, 64, 52, 0, Math.PI * 2);
  ctx.fill();

  // Border
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  // Text
  ctx.fillStyle = textColor;
  ctx.font = 'bold 54px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 64, 66);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.4, 1.4, 1);
  return sprite;
}

export default function Court3D({ step, previousStep }: Court3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>('tactical');

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Mesh registries
  const playersGroupRef = useRef<THREE.Group>(new THREE.Group());
  const ballMeshRef = useRef<THREE.Mesh | null>(null);
  const trajectoryLineRef = useRef<THREE.Line | null>(null);
  const rippleMeshRef = useRef<THREE.Mesh | null>(null);
  const annotationsGroupRef = useRef<THREE.Group>(new THREE.Group());

  // Animation progress ref
  const transitionStartRef = useRef<number>(0);

  // Target camera position for smooth lerp
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 24, 30));
  const targetCamLookRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));

  // Mutable function ref to break closure loop in RAF
  const updateBallAnimationRef = useRef<(now: number) => void>(() => {});

  // ── 1. Create Procedural Hardwood Basketball Court Texture ────────────────
  const createCourtTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Hardwood plank background
    ctx.fillStyle = '#b5793a';
    ctx.fillRect(0, 0, 2048, 2048);

    // Draw wood planks
    const plankHeight = 16;
    for (let y = 0; y < 2048; y += plankHeight) {
      const shadeOffset = Math.sin(y * 0.15) * 8;
      const r = Math.round(181 + shadeOffset);
      const g = Math.round(121 + shadeOffset * 0.8);
      const b = Math.round(58 + shadeOffset * 0.6);
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, 2048, plankHeight - 1);
      ctx.fillStyle = 'rgba(60, 30, 5, 0.2)';
      ctx.fillRect(0, y + plankHeight - 1, 2048, 1);
    }

    // Semi-transparent court line styling
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 4;

    // Dimensions: mapped to 2048 x 2048
    const mapX = (x: number) => 60 + (x / 470) * (2048 - 120);
    const mapY = (y: number) => 60 + (y / 500) * (2048 - 120);

    // Court boundary lines
    ctx.strokeRect(mapX(0), mapY(0), mapX(470) - mapX(0), mapY(500) - mapY(0));

    // Paint Area (The Key)
    ctx.fillStyle = 'rgba(140, 70, 25, 0.35)';
    ctx.fillRect(mapX(0), mapY(190), mapX(190) - mapX(0), mapY(310) - mapY(190));
    ctx.strokeRect(mapX(0), mapY(190), mapX(190) - mapX(0), mapY(310) - mapY(190));

    // Free throw circle
    ctx.beginPath();
    ctx.arc(mapX(190), mapY(250), (60 / 470) * (2048 - 120), 0, Math.PI * 2);
    ctx.stroke();

    // 3-Point Arc
    const basketX = mapX(52.5);
    const basketY = mapY(250);
    const arcRadius = (237.5 / 470) * (2048 - 120);

    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(30));
    ctx.lineTo(mapX(142), mapY(30));
    ctx.arc(basketX, basketY, arcRadius, -Math.asin((250 - 30) / 237.5), Math.asin((470 - 250) / 237.5), false);
    ctx.lineTo(mapX(0), mapY(470));
    ctx.stroke();

    // Restricted area arc
    ctx.beginPath();
    ctx.arc(basketX, basketY, (40 / 470) * (2048 - 120), -Math.PI / 2, Math.PI / 2, false);
    ctx.stroke();

    // Center Court Logo / Watermark
    ctx.save();
    ctx.translate(mapX(380), mapY(250));
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.font = 'bold 90px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('HOOPS LAB', 0, 0);
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  // ── 2. Build 3D Basketball Hoop Assembly ──────────────────────────────────
  const buildBasketballHoop = useCallback(() => {
    const hoopGroup = new THREE.Group();
    const basketCoord = to3D(52.5, 250);

    // Stanchion Post behind baseline
    const postMat = new THREE.MeshStandardMaterial({ color: 0x1f293d, roughness: 0.4 });
    const postGeo = new THREE.CylinderGeometry(0.22, 0.22, 4.8, 16);
    const post = new THREE.Mesh(postGeo, postMat);
    post.position.set(basketCoord.x - 2.2, 2.4, basketCoord.z);
    hoopGroup.add(post);

    // Overhang boom
    const boomGeo = new THREE.CylinderGeometry(0.16, 0.16, 2.5, 12);
    const boom = new THREE.Mesh(boomGeo, postMat);
    boom.rotation.z = Math.PI / 3;
    boom.position.set(basketCoord.x - 1.1, 3.7, basketCoord.z);
    hoopGroup.add(boom);

    // Glass Backboard (1.8m x 1.05m)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      transmission: 0.8,
      thickness: 0.2,
    });
    const bbGeo = new THREE.BoxGeometry(0.06, 1.2, 1.8);
    const backboard = new THREE.Mesh(bbGeo, glassMat);
    backboard.position.set(basketCoord.x - 0.4, 3.4, basketCoord.z);
    hoopGroup.add(backboard);

    // Backboard White Border
    const borderGeo = new THREE.BoxGeometry(0.07, 0.45, 0.65);
    const borderMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const targetBox = new THREE.Mesh(borderGeo, borderMat);
    targetBox.position.set(basketCoord.x - 0.38, 3.25, basketCoord.z);
    hoopGroup.add(targetBox);

    // Steel Rim (Orange, 10ft = 3.05 units)
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xe85c04, metalness: 0.3, roughness: 0.3 });
    const rimGeo = new THREE.TorusGeometry(0.46, 0.035, 12, 24);
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(basketCoord.x, 3.05, basketCoord.z);
    hoopGroup.add(rim);

    // Net
    const netMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.65 });
    const netGeo = new THREE.CylinderGeometry(0.44, 0.28, 0.65, 12, 4, true);
    const net = new THREE.Mesh(netGeo, netMat);
    net.position.set(basketCoord.x, 2.7, basketCoord.z);
    hoopGroup.add(net);

    return hoopGroup;
  }, []);

  // ── 3. Dynamic 3D Ball & Flight Trajectory ────────────────────────────────
  const updateBallAnimation = useCallback((now: number) => {
    if (!ballMeshRef.current) return;

    const ballHolder = step.players.find((p) => p.hasBall);
    const prevHolder = previousStep?.players.find((p) => p.hasBall);

    if (ballHolder && (!prevHolder || prevHolder.id === ballHolder.id)) {
      // Ball held statically
      const p3d = to3D(ballHolder.x, ballHolder.y);
      ballMeshRef.current.position.set(p3d.x + 0.35, 1.25, p3d.z - 0.2);
      if (trajectoryLineRef.current) trajectoryLineRef.current.visible = false;
      return;
    }

    if (prevHolder && ballHolder && prevHolder.id !== ballHolder.id) {
      // Active Pass in Flight
      const duration = 1400; // ms
      const elapsed = (now - transitionStartRef.current) % duration;
      const t = elapsed / duration;

      const from3d = to3D(prevHolder.x, prevHolder.y);
      const to3d = to3D(ballHolder.x, ballHolder.y);

      // Check if Bounce Pass or Lob Pass
      const isBounce = !!step.bouncePoint;
      const isLob = step.label.includes('Lob') || (step.labelZh ? step.labelZh.includes('吊') : false);

      let curX = from3d.x + (to3d.x - from3d.x) * t;
      let curZ = from3d.z + (to3d.z - from3d.z) * t;
      let curY: number;

      if (isBounce && step.bouncePoint) {
        const bounce3d = to3D(step.bouncePoint.x, step.bouncePoint.y);
        if (t < 0.6) {
          // Phase 1: From passer hand to ground bounce point
          const subT = t / 0.6;
          curX = from3d.x + (bounce3d.x - from3d.x) * subT;
          curZ = from3d.z + (bounce3d.z - from3d.z) * subT;
          curY = 1.35 * (1 - subT) + 0.22 * subT - Math.sin(subT * Math.PI) * 0.2;
        } else {
          // Phase 2: From ground bounce point to target hand
          const subT = (t - 0.6) / 0.4;
          curX = bounce3d.x + (to3d.x - bounce3d.x) * subT;
          curZ = bounce3d.z + (to3d.z - bounce3d.z) * subT;
          curY = 0.22 * (1 - subT) + 1.2 * subT + Math.sin(subT * Math.PI) * 0.35;
        }
      } else if (isLob) {
        curY = 1.35 + Math.sin(t * Math.PI) * 2.3;
      } else {
        curY = 1.35 + Math.sin(t * Math.PI) * 0.35;
      }

      ballMeshRef.current.position.set(curX, curY, curZ);
      ballMeshRef.current.rotation.x += 0.08;
      ballMeshRef.current.rotation.z += 0.05;

      // Pulse Ripple on ground impact
      if (rippleMeshRef.current && isBounce) {
        const rippleScale = 1 + ((elapsed % 700) / 700) * 2.2;
        rippleMeshRef.current.scale.set(rippleScale, rippleScale, 1);
      }
    }
  }, [step, previousStep]);

  // Keep ref up to date
  useEffect(() => {
    updateBallAnimationRef.current = updateBallAnimation;
  }, [updateBallAnimation]);

  // ── 4. Initialize Scene & Renderer ───────────────────────────────────────
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    transitionStartRef.current = performance.now();

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080c16);
    scene.fog = new THREE.FogExp2(0x080c16, 0.015);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 120);
    camera.position.set(0, 24, 30);
    cameraRef.current = camera;

    // WebGL Renderer with High-Quality Soft Shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't clip under floor
    controls.minDistance = 6;
    controls.maxDistance = 55;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Arena Overhead Main Light
    const arenaLight = new THREE.DirectionalLight(0xffffff, 1.4);
    arenaLight.position.set(10, 30, 15);
    arenaLight.castShadow = true;
    arenaLight.shadow.mapSize.width = 2048;
    arenaLight.shadow.mapSize.height = 2048;
    arenaLight.shadow.camera.near = 5;
    arenaLight.shadow.camera.far = 60;
    arenaLight.shadow.camera.left = -28;
    arenaLight.shadow.camera.right = 28;
    arenaLight.shadow.camera.top = 28;
    arenaLight.shadow.camera.bottom = -28;
    arenaLight.shadow.bias = -0.0005;
    scene.add(arenaLight);

    // Warm Low-Post Key Light
    const postLight = new THREE.SpotLight(0xf97316, 2.5, 30, Math.PI / 4, 0.4);
    postLight.position.set(-10, 16, 8);
    postLight.target.position.set(-10, 0, 5);
    scene.add(postLight);
    scene.add(postLight.target);

    // Rim Silhouette Blue Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    rimLight.position.set(-15, 10, -20);
    scene.add(rimLight);

    // Hardwood Floor Mesh
    const courtTexture = createCourtTexture();
    const courtGeo = new THREE.PlaneGeometry(47, 50);
    const courtMat = new THREE.MeshStandardMaterial({
      map: courtTexture,
      roughness: 0.32,
      metalness: 0.08,
    });
    const courtMesh = new THREE.Mesh(courtGeo, courtMat);
    courtMesh.rotation.x = -Math.PI / 2;
    courtMesh.receiveShadow = true;
    scene.add(courtMesh);

    // Court Perimeter Border Plate
    const borderGeo = new THREE.PlaneGeometry(55, 58);
    const borderMat = new THREE.MeshStandardMaterial({ color: 0x0a101f, roughness: 0.8 });
    const borderMesh = new THREE.Mesh(borderGeo, borderMat);
    borderMesh.rotation.x = -Math.PI / 2;
    borderMesh.position.y = -0.02;
    scene.add(borderMesh);

    // Basketball Hoop
    const hoop = buildBasketballHoop();
    scene.add(hoop);

    // Groups
    scene.add(playersGroupRef.current);
    scene.add(annotationsGroupRef.current);

    // 3D Basketball
    const ballGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xe85c04, roughness: 0.4, metalness: 0.15 });
    const ballMesh = new THREE.Mesh(ballGeo, ballMat);
    ballMesh.castShadow = true;
    ballMesh.position.set(0, 1.2, 0);
    scene.add(ballMesh);
    ballMeshRef.current = ballMesh;

    // Floor Bounce Ripple
    const rippleGeo = new THREE.RingGeometry(0.2, 0.3, 32);
    const rippleMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide, transparent: true, opacity: 0 });
    const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
    rippleMesh.rotation.x = -Math.PI / 2;
    rippleMesh.position.y = 0.04;
    scene.add(rippleMesh);
    rippleMeshRef.current = rippleMesh;

    // Trajectory Dotted Ribbon
    const trajMat = new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.4, gapSize: 0.2, linewidth: 2 });
    const trajGeo = new THREE.BufferGeometry();
    const trajLine = new THREE.Line(trajGeo, trajMat);
    scene.add(trajLine);
    trajectoryLineRef.current = trajLine;

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 520;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ── Render Loop ──────────────────────────────────────────────────────────
    const renderLoop = (time: number) => {
      // Smooth Camera Lerp
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.06);
        controlsRef.current.target.lerp(targetCamLookRef.current, 0.06);
        controlsRef.current.update();
      }

      // Ball & Trajectory Update via ref
      updateBallAnimationRef.current(time);

      // Rotate player target hand reticle
      annotationsGroupRef.current.children.forEach((child) => {
        if (child.name === 'targetReticle') {
          child.rotation.y += 0.03;
        }
      });

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };
    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      courtTexture.dispose();
    };
  }, [createCourtTexture, buildBasketballHoop]);

  // ── 5. Camera Presets Switcher ────────────────────────────────────────────
  const switchCamera = useCallback((mode: CameraMode) => {
    setCameraMode(mode);
    const activeBallHolder = step.players.find((p) => p.hasBall) || step.players[0];
    const postCenter = step.players.find((p) => p.position === 'C') || step.players[2];

    const passer3D = to3D(activeBallHolder.x, activeBallHolder.y);
    const center3D = to3D(postCenter.x, postCenter.y);

    if (mode === 'tactical') {
      targetCamPosRef.current.set(0, 24, 28);
      targetCamLookRef.current.set(0, 1.2, 0);
    } else if (mode === 'passer_pov') {
      // First-Person Passer POV
      targetCamPosRef.current.set(passer3D.x + 0.3, 1.85, passer3D.z + 0.5);
      targetCamLookRef.current.set(center3D.x, 1.35, center3D.z);
    } else if (mode === 'post_cam') {
      // Low Post Close-Up
      targetCamPosRef.current.set(center3D.x - 4.8, 1.7, center3D.z + 4.2);
      targetCamLookRef.current.set(center3D.x, 1.3, center3D.z);
    }
  }, [step.players]);

  // ── 6. Update 3D Players & Models ─────────────────────────────────────────
  useEffect(() => {
    const group = playersGroupRef.current;
    group.clear();

    const annotations = annotationsGroupRef.current;
    annotations.clear();

    transitionStartRef.current = performance.now();

    step.players.forEach((p) => {
      const p3d = to3D(p.x, p.y);
      const isOffense = p.team === 'offense';
      const playerContainer = new THREE.Group();
      playerContainer.position.set(p3d.x, 0, p3d.z);

      // Contact Shadow Decal
      const shadowGeo = new THREE.CircleGeometry(0.75, 20);
      const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45 });
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.02;
      playerContainer.add(shadow);

      // Stance / Orientation Footplate
      const plateGeo = new THREE.RingGeometry(0.55, 0.72, 24);
      const plateMat = new THREE.MeshBasicMaterial({
        color: isOffense ? 0xf97316 : 0xef4444,
        side: THREE.DoubleSide,
      });
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.rotation.x = -Math.PI / 2;
      plate.position.y = 0.03;
      playerContainer.add(plate);

      // Stylized Sleek Torso
      const torsoGeo = new THREE.CylinderGeometry(0.38, 0.45, 1.35, 20);
      const torsoMat = new THREE.MeshStandardMaterial({
        color: isOffense ? 0xea580c : 0x1e293b,
        roughness: 0.35,
        metalness: 0.15,
      });
      const torso = new THREE.Mesh(torsoGeo, torsoMat);
      torso.castShadow = true;
      torso.position.y = 0.85;
      playerContainer.add(torso);

      // Head Sphere
      const headGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const headMat = new THREE.MeshStandardMaterial({
        color: isOffense ? 0xfcd34d : 0x94a3b8,
        roughness: 0.4,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.castShadow = true;
      head.position.y = 1.7;
      playerContainer.add(head);

      // Floating Position Label Sprite
      const sprite = createTextSprite(
        p.position,
        isOffense ? '#ea580c' : '#dc2626',
        '#ffffff'
      );
      sprite.position.set(0, 2.35, 0);
      playerContainer.add(sprite);

      // ── ARTICULATED TARGET HAND (for C) ───────────────────────────────────
      if (p.position === 'C' && step.targetHand) {
        const hand3d = to3D(step.targetHand.x, step.targetHand.y);
        const relX = hand3d.x - p3d.x;
        const relZ = hand3d.z - p3d.z;

        // Arm reaching out
        const armLength = Math.hypot(relX, relZ);
        const armGeo = new THREE.CylinderGeometry(0.08, 0.08, armLength, 8);
        const armMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.4 });
        const arm = new THREE.Mesh(armGeo, armMat);
        arm.position.set(relX / 2, 1.25, relZ / 2);
        arm.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(relX, 0, relZ).normalize());
        playerContainer.add(arm);

        // Glowing Target Hand Holographic Reticle
        const reticleGroup = new THREE.Group();
        reticleGroup.name = 'targetReticle';
        reticleGroup.position.set(hand3d.x, 1.25, hand3d.z);

        const handSphereGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const handSphereMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const handSphere = new THREE.Mesh(handSphereGeo, handSphereMat);
        reticleGroup.add(handSphere);

        const ringGeo = new THREE.RingGeometry(0.3, 0.4, 24);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        reticleGroup.add(ring);

        annotations.add(reticleGroup);
      }

      // ── DEFENDER CONTEST ZONE (Holographic Shield) ────────────────────────
      if (!isOffense && (p.position === 'C' || p.position === 'SF')) {
        const contestGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.2, 24, 1, true);
        const contestMat = new THREE.MeshBasicMaterial({
          color: 0xef4444,
          transparent: true,
          opacity: 0.16,
          side: THREE.DoubleSide,
        });
        const contestDome = new THREE.Mesh(contestGeo, contestMat);
        contestDome.position.y = 1.1;
        playerContainer.add(contestDome);
      }

      group.add(playerContainer);
    });

    // Bounce Spot 3D Marker
    if (step.bouncePoint) {
      const b3d = to3D(step.bouncePoint.x, step.bouncePoint.y);
      if (rippleMeshRef.current) {
        rippleMeshRef.current.position.set(b3d.x, 0.04, b3d.z);
        (rippleMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.85;
      }
    } else {
      if (rippleMeshRef.current) {
        (rippleMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
      }
    }
  }, [step]);

  return (
    <div className="court-3d-wrapper">
      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} className="court-3d-viewport" />

      {/* Floating Camera Mode Switcher Overlay */}
      <div className="camera-switch-dock">
        <div className="dock-title">🎥 3D 視角切換：</div>
        <div className="dock-buttons">
          <button
            className={`cam-mode-btn ${cameraMode === 'tactical' ? 'active' : ''}`}
            onClick={() => switchCamera('tactical')}
            title="360 度自由旋轉戰術俯視角"
          >
            <span className="cam-icon">🌐</span>
            <span>3D 戰術全景</span>
          </button>

          <button
            className={`cam-mode-btn ${cameraMode === 'passer_pov' ? 'active' : ''}`}
            onClick={() => switchCamera('passer_pov')}
            title="側翼傳球者第一人稱視角 (Passer POV)"
          >
            <span className="cam-icon">👁️</span>
            <span>後衛主觀視角 (POV)</span>
          </button>

          <button
            className={`cam-mode-btn ${cameraMode === 'post_cam' ? 'active' : ''}`}
            onClick={() => switchCamera('post_cam')}
            title="低位中鋒卡位纏鬥特寫鏡頭"
          >
            <span className="cam-icon">🔒</span>
            <span>低位纏鬥特寫</span>
          </button>
        </div>
      </div>

      {/* 3D Overlay Help Badge */}
      <div className="court-3d-hint">
        <span>🖱️ 拖曳旋轉 360° · 滾輪縮放 · 右鍵平移</span>
      </div>
    </div>
  );
}
