import { useEffect, useRef } from 'react';
import type * as ThreeNamespace from 'three';

const MODEL_FILE = 'public/models/allen.glb';
const MODEL_PATH = `${import.meta.env.BASE_URL}${MODEL_FILE.replace('public/', '')}`;
type ThreeRuntime = typeof ThreeNamespace;

function createLegoWarrior(THREE: ThreeRuntime) {
  const warrior = new THREE.Group();
  warrior.name = 'lego-warrior-fallback';

  const yellow = new THREE.MeshStandardMaterial({ color: '#ffd44d', roughness: 0.5 });
  const blue = new THREE.MeshStandardMaterial({ color: '#2563eb', roughness: 0.55 });
  const orange = new THREE.MeshStandardMaterial({ color: '#f97316', roughness: 0.45 });
  const dark = new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.65 });
  const metal = new THREE.MeshStandardMaterial({
    color: '#d1d5db',
    metalness: 0.5,
    roughness: 0.32,
  });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.35, 0.55), blue);
  torso.position.y = 1.55;
  warrior.add(torso);

  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.48, 32), yellow);
  head.position.y = 2.45;
  warrior.add(head);

  const helmet = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.44, 0.26, 32), dark);
  helmet.position.y = 2.82;
  warrior.add(helmet);

  const face = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.04), dark);
  face.position.set(0, 2.47, 0.43);
  warrior.add(face);

  const belt = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.16, 0.62), orange);
  belt.position.y = 0.84;
  warrior.add(belt);

  const armGeometry = new THREE.BoxGeometry(0.28, 1, 0.34);
  const leftArm = new THREE.Mesh(armGeometry, yellow);
  leftArm.position.set(-0.88, 1.46, 0);
  leftArm.rotation.z = -0.28;
  warrior.add(leftArm);

  const rightArm = new THREE.Mesh(armGeometry, yellow);
  rightArm.position.set(0.88, 1.58, 0);
  rightArm.rotation.z = 0.58;
  warrior.add(rightArm);

  const legGeometry = new THREE.BoxGeometry(0.46, 0.92, 0.46);
  const leftLeg = new THREE.Mesh(legGeometry, blue);
  leftLeg.position.set(-0.34, 0.18, 0);
  warrior.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeometry, blue);
  rightLeg.position.set(0.34, 0.18, 0);
  warrior.add(rightLeg);

  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.35, 24), metal);
  bar.position.set(0.38, 2.08, 0.1);
  bar.rotation.z = Math.PI / 2;
  warrior.add(bar);

  [-0.9, 1.66].forEach((x) => {
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.12, 32), dark);
    plate.position.set(x, 2.08, 0.1);
    plate.rotation.z = Math.PI / 2;
    warrior.add(plate);
  });

  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(1.35, 1.55, 0.18, 48),
    new THREE.MeshStandardMaterial({ color: '#1f2937', roughness: 0.7 }),
  );
  platform.position.y = -0.38;
  warrior.add(platform);

  warrior.rotation.y = -0.35;
  return warrior;
}

function disposeObject3D(object: ThreeNamespace.Object3D, THREE: ThreeRuntime) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => material.dispose());
  });
}

export default function StrengthTrainingPreview() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let disposed = false;
    let cleanupScene: (() => void) | undefined;

    const setupScene = async () => {
      const [THREE, { GLTFLoader }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
      ]);
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 1.45, 6.2);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      const keyLight = new THREE.DirectionalLight('#ffffff', 2.4);
      keyLight.position.set(4, 5, 6);
      scene.add(keyLight);
      scene.add(new THREE.HemisphereLight('#93c5fd', '#111827', 1.8));

      const modelRoot = new THREE.Group();
      scene.add(modelRoot);

      const fallback = createLegoWarrior(THREE);
      modelRoot.add(fallback);

      const loader = new GLTFLoader();
      loader.load(
        MODEL_PATH,
        (gltf) => {
          modelRoot.clear();
          disposeObject3D(fallback, THREE);
          const model = gltf.scene;
          model.name = 'allen-glb-model';
          model.scale.setScalar(1.45);
          model.position.y = -0.35;
          modelRoot.add(model);
        },
        undefined,
        () => {
          // Keep the LEGO warrior fallback until public/models/allen.glb is available.
        },
      );

      const resize = () => {
        const { width, height } = mount.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = Math.max(width, 100) / Math.max(height, 100);
        camera.updateProjectionMatrix();
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();

      let frame = 0;
      let animationId = 0;
      const animate = () => {
        frame += 0.012;
        modelRoot.rotation.y += 0.01;
        modelRoot.position.y = Math.sin(frame) * 0.06;
        renderer.render(scene, camera);
        animationId = window.requestAnimationFrame(animate);
      };
      animate();

      cleanupScene = () => {
        window.cancelAnimationFrame(animationId);
        resizeObserver.disconnect();
        disposeObject3D(modelRoot, THREE);
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    void setupScene();

    return () => {
      disposed = true;
      cleanupScene?.();
    };
  }, []);

  return (
    <section className="training-panel" aria-label="Strength training preview">
      <div className="training-copy">
        <span className="training-kicker">Strength Training · 重量訓練</span>
        <h2 className="training-title">LEGO Warrior Mode</h2>
        <p className="training-desc">
          Three.js preview shell is ready; drop Allen's GLB at
          <code> {MODEL_FILE} </code>
          to replace the fallback model.
        </p>
        <div className="training-actions">
          <button className="training-action-card training-action-detail" type="button">
            <span className="training-action-label">詳情</span>
            <span className="training-action-sub">Power detail</span>
          </button>
          <a
            className="training-action-card training-action-strava"
            href="https://www.strava.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="training-action-label">去 STRAVA</span>
            <span className="training-action-sub">Open activity</span>
          </a>
        </div>
      </div>
      <div ref={mountRef} className="training-canvas" aria-hidden="true" />
    </section>
  );
}
