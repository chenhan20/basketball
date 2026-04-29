import type { Play, PlayerState } from '../types';

// Court dimensions: 940 x 500 (94ft x 50ft, 10px = 1ft)
// Left basket at (52.5, 250), Right basket at (887.5, 250)
// Offense attacks LEFT basket in these plays.

// ─────────────────────────────────────────────
// Play 1: Pick and Roll (Offense)
// ─────────────────────────────────────────────
const pickAndRoll: Play = {
  id: 'pick-and-roll',
  name: 'Pick & Roll',
  nameZh: '擋拆配合',
  description: 'Center sets a ball-screen for the PG at the elbow. PG attacks off the screen while C rolls hard to the basket.',
  descriptionZh: '中鋒在罰球線側為控球後衛設立掩護，控球者利用掩護切入，中鋒立刻往籃下下擋（roll）形成兩人配合。',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Initial Setup',
      labelZh: '第一步 · 初始陣型',
      description: 'Players spread the floor. PG has the ball at the top of the key. C is at the low block preparing to set the screen.',
      descriptionZh: '球員拉開空間。控球後衛在弧頂持球，中鋒在低位準備上提設立掩護。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 225, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 120, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 132, y: 298 },
      ],
      movements: [
        { playerId: 5, toX: 248, toY: 263, type: 'screen' },
      ],
    },
    {
      label: 'Step 2 · Screen Set',
      labelZh: '第二步 · 設立掩護',
      description: 'C moves up to set the screen at the elbow. PG dribbles toward the screen.',
      descriptionZh: '中鋒上提到罰球線側設立擋人掩護，控球後衛運球朝掩護方向移動。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 225, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 248, y: 263 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 258, y: 270 },
      ],
      movements: [
        { playerId: 1, toX: 248, toY: 248, type: 'run' },
      ],
    },
    {
      label: 'Step 3 · PG Uses Screen',
      labelZh: '第三步 · 利用掩護',
      description: 'PG dribbles off the screen. D1 is momentarily impeded. C immediately rolls toward the basket.',
      descriptionZh: '控球後衛繞過掩護向籃下殺入，原本的防守者被擋住。中鋒立刻往籃下下擋（roll）。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 248, y: 248, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 225, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 248, y: 263 },
        { id: 6, position: 'PG', team: 'defense', x: 263, y: 270 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 258, y: 270 },
      ],
      movements: [
        { playerId: 1, toX: 158, toY: 238, type: 'run' },
        { playerId: 5, toX: 135, toY: 285, type: 'cut' },
      ],
    },
    {
      label: 'Step 4 · Finish (Read & React)',
      labelZh: '第四步 · 判讀完成',
      description: 'PG penetrates the paint, C is rolling. Read the help: if D5 helps → drop the pass to C for a layup; if the wing defender collapses → kick to SG/SF for three.',
      descriptionZh: '控球突破至禁區，中鋒下擋籃下。判讀協防：若中鋒的防守者來補→傳球給內切的中鋒上籃；若側翼防守者收縮→外傳給外線射手投三分。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 158, y: 238, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 225, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 135, y: 285 },
        { id: 6, position: 'PG', team: 'defense', x: 270, y: 280 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 145, y: 275 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 5 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 2: Horns Set / Motion Offense (Offense)
// ─────────────────────────────────────────────
const motionOffense: Play = {
  id: 'motion-offense',
  name: 'Horns Motion',
  nameZh: '牛角戰術 (Horns)',
  description: 'A versatile horns-set that flows into motion offense. Both bigs (PF, C) start at the elbows, creating multiple options: drive, pull-up, or kick-out.',
  descriptionZh: '兩名長人站於罰球線兩肘形成「牛角」陣型，配合動態進攻，可選擇切入、急停跳投或外傳給空檔射手。',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Horns Setup',
      labelZh: '第一步 · 牛角陣型',
      description: 'PG at the top of the key with the ball. PF and C at the elbows. SG and SF wide on the wings.',
      descriptionZh: '控球持球於弧頂，大前鋒與中鋒分站兩肘形成牛角，得分後衛與小前鋒拉開到兩翼。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 205, y: 152 },
        { id: 3, position: 'SF', team: 'offense', x: 205, y: 348 },
        { id: 4, position: 'PF', team: 'offense', x: 195, y: 195 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 255 },
        { id: 7, position: 'SG', team: 'defense', x: 218, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 218, y: 342 },
        { id: 9, position: 'PF', team: 'defense', x: 208, y: 200 },
        { id: 10, position: 'C', team: 'defense', x: 208, y: 300 },
      ],
      movements: [
        { playerId: 1, toX: 245, toY: 220, type: 'run' },
        { playerId: 4, toX: 168, toY: 175, type: 'cut' },
      ],
    },
    {
      label: "Step 2 · Drive Right",
      labelZh: '第二步 · 向右切入',
      description: "PG attacks the right elbow off PF's shoulder. PF flares to the three-point line. SF cuts to the weak-side elbow.",
      descriptionZh: '控球從大前鋒的肩膀切入右側肘區，大前鋒外拉到三分線，小前鋒切到弱邊肘區。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 245, y: 220, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 205, y: 152 },
        { id: 3, position: 'SF', team: 'offense', x: 205, y: 348 },
        { id: 4, position: 'PF', team: 'offense', x: 168, y: 175 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 258, y: 228 },
        { id: 7, position: 'SG', team: 'defense', x: 218, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 218, y: 342 },
        { id: 9, position: 'PF', team: 'defense', x: 180, y: 180 },
        { id: 10, position: 'C', team: 'defense', x: 208, y: 300 },
      ],
      movements: [
        { playerId: 1, toX: 160, toY: 200, type: 'run' },
        { playerId: 5, toX: 145, toY: 290, type: 'cut' },
      ],
    },
    {
      label: 'Step 3 · Kick-out or Finish',
      labelZh: '第三步 · 分球或攻擊',
      description: 'PG has penetrated the lane. SG is open on the wing for a kick-out three. C is rolling to the basket for a lob.',
      descriptionZh: '控球已切入禁區。得分後衛在側翼有空檔可接外傳投三分；中鋒下擋籃下可接空中接力。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 160, y: 200, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 205, y: 152 },
        { id: 3, position: 'SF', team: 'offense', x: 205, y: 348 },
        { id: 4, position: 'PF', team: 'offense', x: 168, y: 175 },
        { id: 5, position: 'C',  team: 'offense', x: 145, y: 290 },
        { id: 6, position: 'PG', team: 'defense', x: 170, y: 208 },
        { id: 7, position: 'SG', team: 'defense', x: 218, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 218, y: 342 },
        { id: 9, position: 'PF', team: 'defense', x: 180, y: 180 },
        { id: 10, position: 'C', team: 'defense', x: 155, y: 280 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 4 · Corner Three',
      labelZh: '第四步 · 底角三分',
      description: 'SG receives the kick-out pass. D7 collapsed helping on the drive, leaving SG open for the corner three.',
      descriptionZh: '得分後衛接到外傳球。原本的防守者協防去阻止突破，留下空檔給得分後衛投空檔三分。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 160, y: 200 },
        { id: 2, position: 'SG', team: 'offense', x: 205, y: 152, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 205, y: 348 },
        { id: 4, position: 'PF', team: 'offense', x: 168, y: 175 },
        { id: 5, position: 'C',  team: 'offense', x: 145, y: 290 },
        { id: 6, position: 'PG', team: 'defense', x: 170, y: 208 },
        { id: 7, position: 'SG', team: 'defense', x: 175, y: 190 },
        { id: 8, position: 'SF', team: 'defense', x: 218, y: 342 },
        { id: 9, position: 'PF', team: 'defense', x: 180, y: 180 },
        { id: 10, position: 'C', team: 'defense', x: 155, y: 280 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 3: Baseline Cut (繞底) — Offense
// ─────────────────────────────────────────────
const baselineCut: Play = {
  id: 'baseline-cut',
  name: 'Baseline Cut (繞底)',
  nameZh: '底線繞切',
  description: 'Weak-side wing cuts hard along the baseline to the rim. If the defender ball-watches, the cutter is wide open for a layup.',
  descriptionZh: '弱邊側翼沿底線快速繞到籃下，若防守者只盯球而失位，繞切者就能輕鬆上籃。',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · 4-out 1-in Setup',
      labelZh: '第一步 · 4 外 1 內陣型',
      description: 'PG at the top with the ball. SG on the strong-side wing. SF in the weak-side corner. PF on the weak-side wing. C on the strong-side block.',
      descriptionZh: '控球持球在弧頂。得分後衛在強邊側翼，小前鋒在弱邊底角，大前鋒在弱邊側翼，中鋒在強邊低位。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 150 },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 430 },
        { id: 4, position: 'PF', team: 'offense', x: 200, y: 350 },
        { id: 5, position: 'C',  team: 'offense', x: 110, y: 200 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 110, y: 410 },
        { id: 9, position: 'PF', team: 'defense', x: 215, y: 343 },
        { id: 10, position: 'C', team: 'defense', x: 122, y: 207 },
      ],
      movements: [
        { playerId: 1, toX: 200, toY: 150, type: 'run' },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 2 · Ball Swings to the Wing',
      labelZh: '第二步 · 球轉移到側翼',
      description: 'PG passes to SG on the strong-side wing. The defense shifts its eyes to the ball — perfect time for the weak-side cut.',
      descriptionZh: '控球傳給強邊側翼的得分後衛。防守者目光跟著球移動——正是弱邊空切的最佳時機。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 150, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 95,  y: 430 },
        { id: 4, position: 'PF', team: 'offense', x: 200, y: 350 },
        { id: 5, position: 'C',  team: 'offense', x: 110, y: 200 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 380 },
        { id: 9, position: 'PF', team: 'defense', x: 215, y: 343 },
        { id: 10, position: 'C', team: 'defense', x: 122, y: 207 },
      ],
      movements: [
        { playerId: 3, toX: 60, toY: 285, type: 'cut' },
      ],
    },
    {
      label: 'Step 3 · Baseline Cut',
      labelZh: '第三步 · 底線繞切',
      description: 'SF sprints along the baseline behind C, who acts as a natural screen. D8 is caught ball-watching and trails badly.',
      descriptionZh: '小前鋒沿著底線繞過中鋒（自然掩護）切到強邊。原本的防守者只顧盯球，跟丟在後面。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 150, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 285 },
        { id: 4, position: 'PF', team: 'offense', x: 200, y: 350 },
        { id: 5, position: 'C',  team: 'offense', x: 110, y: 200 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 165, y: 360 },
        { id: 9, position: 'PF', team: 'defense', x: 215, y: 343 },
        { id: 10, position: 'C', team: 'defense', x: 122, y: 207 },
      ],
      passes: [
        { fromPlayerId: 2, toPlayerId: 3 },
      ],
    },
    {
      label: 'Step 4 · Layup at the Rim',
      labelZh: '第四步 · 籃下完成',
      description: 'SG hits SF on the move for a finish at the rim. Key teaching point: the cutter must time the cut to arrive AS the pass is thrown.',
      descriptionZh: '得分後衛在小前鋒移動中傳球給他完成上籃。重點：空切者要算準時間，傳球出手的瞬間正好抵達接球點。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 150 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 285, hasBall: true },
        { id: 4, position: 'PF', team: 'offense', x: 200, y: 350 },
        { id: 5, position: 'C',  team: 'offense', x: 110, y: 200 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 175, y: 340 },
        { id: 9, position: 'PF', team: 'defense', x: 215, y: 343 },
        { id: 10, position: 'C', team: 'defense', x: 122, y: 207 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 4: Drive & Kick (切傳) — Offense
// ─────────────────────────────────────────────
const driveAndKick: Play = {
  id: 'drive-and-kick',
  name: 'Drive & Kick (切傳)',
  nameZh: '切入分球',
  description: 'PG attacks the lane forcing the defense to collapse, then kicks the ball out to a spot-up shooter for an open three.',
  descriptionZh: '控球突破殺入禁區迫使防守收縮，再把球外傳給定點射手出手三分球，是現代籃球最基本的得分模式。',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · 5-out Spacing',
      labelZh: '第一步 · 5 外站位',
      description: 'All five offensive players are outside the arc. Maximum spacing means a single drive forces a real help decision.',
      descriptionZh: '五名進攻球員全部站在三分線外，最大化拉開空間。任何一次突破都迫使防守必須做出協防選擇。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 80 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 420 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 138 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 90 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 410 },
      ],
      movements: [
        { playerId: 1, toX: 180, toY: 230, type: 'run' },
      ],
    },
    {
      label: 'Step 2 · Hard Drive',
      labelZh: '第二步 · 強力突破',
      description: 'PG attacks the gap and turns the corner. The lane is now open and defenders must decide whether to help.',
      descriptionZh: '控球從縫隙切入並過人轉角。禁區已敞開，防守必須決定是否要過來補防。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 180, y: 230, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 80 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 420 },
        { id: 6, position: 'PG', team: 'defense', x: 220, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 138 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 90 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 410 },
      ],
      movements: [
        { playerId: 7, toX: 175, toY: 200, type: 'run' },
      ],
    },
    {
      label: 'Step 3 · Defense Collapses',
      labelZh: '第三步 · 防守收縮',
      description: "D7 sinks to help on the drive, leaving SG wide open in the wing. Don't force the layup — make the right read.",
      descriptionZh: '防守協防去阻止突破，得分後衛在側翼大空檔。不要硬上籃，要做出正確判讀。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 180, y: 230, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 80 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 420 },
        { id: 6, position: 'PG', team: 'defense', x: 220, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 175, y: 200 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 90 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 410 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 4 · Open Three',
      labelZh: '第四步 · 空檔三分',
      description: 'SG catches and shoots before the closeout arrives. If D7 recovers in time, swing it again to PF in the corner.',
      descriptionZh: '得分後衛接球後在防守撲到前出手。若防守及時回補，再把球轉到底角的大前鋒。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 180, y: 230 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 80 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 420 },
        { id: 6, position: 'PG', team: 'defense', x: 220, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 195, y: 155 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 90 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 410 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 5: Backdoor Cut (45度反跑) — Offense
// ─────────────────────────────────────────────
const backdoorCut: Play = {
  id: 'backdoor-cut',
  name: 'Backdoor Cut (反跑)',
  nameZh: '反跑空切',
  description: 'Counter to over-aggressive denial defense. The wing fakes a v-cut up to the ball, then sprints back-door to the rim.',
  descriptionZh: '對付過度貼身防守的最佳武器。側翼先做 V 型假動作向上要球，待防守者上前壓迫時立刻反跑切入籃下。',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Pressure Setup',
      labelZh: '第一步 · 壓迫式防守',
      description: 'Defense is playing high pressure ("上") — every off-ball defender is in a deny stance, hand in the passing lane.',
      descriptionZh: '防守採高壓（「上」）防守——所有無球防守者都採取阻絕姿勢，手伸進傳球路線。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 175 },
        { id: 8, position: 'SF', team: 'defense', x: 250, y: 325 },
        { id: 9, position: 'PF', team: 'defense', x: 130, y: 120 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 380 },
      ],
      movements: [
        { playerId: 2, toX: 245, toY: 145, type: 'cut' },
      ],
    },
    {
      label: 'Step 2 · V-Cut (Sell the Pop-out)',
      labelZh: '第二步 · V 型假動作',
      description: 'SG steps UP toward the ball as if asking for a wing pass. The denying defender (D7) sprints higher to deny.',
      descriptionZh: '得分後衛先往上朝持球者方向移動，假裝要球。阻絕的防守者跟著上提加強壓迫。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 245, y: 145 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 268, y: 158 },
        { id: 8, position: 'SF', team: 'defense', x: 250, y: 325 },
        { id: 9, position: 'PF', team: 'defense', x: 130, y: 120 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 380 },
      ],
      movements: [
        { playerId: 2, toX: 95, toY: 220, type: 'cut' },
      ],
    },
    {
      label: 'Step 3 · Sprint Backdoor',
      labelZh: '第三步 · 反跑切入',
      description: 'SG plants and explodes back-door behind D7 toward the basket. PG sees the cut and lifts the ball for a bounce pass.',
      descriptionZh: '得分後衛急停轉向，從防守者背後爆發反跑切入籃下。控球看到切入時機，舉球準備傳地板球。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 95,  y: 220 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 240, y: 175 },
        { id: 8, position: 'SF', team: 'defense', x: 250, y: 325 },
        { id: 9, position: 'PF', team: 'defense', x: 130, y: 120 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 380 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 4 · Layup',
      labelZh: '第四步 · 上籃得分',
      description: 'SG catches the bounce pass at the rim for an open layup. Rule: the harder they deny, the more open the back-door.',
      descriptionZh: '得分後衛在籃下接到地板傳球完成空檔上籃。原則：對方阻絕愈兇，反跑就愈空檔。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 75,  y: 240, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 320, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 220, y: 175 },
        { id: 8, position: 'SF', team: 'defense', x: 250, y: 325 },
        { id: 9, position: 'PF', team: 'defense', x: 130, y: 120 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 380 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 6: 2-3 Zone Defense
// ─────────────────────────────────────────────
const zoneDefense23: Play = {
  id: 'zone-defense-2-3',
  name: '2-3 Zone Defense',
  nameZh: '2-3 區域防守',
  description: 'A 2-3 zone with two guards up top and three players along the baseline. The zone shifts as the offense moves the ball.',
  descriptionZh: '上方兩名後衛守外圍，下方三人沿底線護籃。整個區域會隨著球的移動同步平移輪轉。',
  type: 'defense',
  steps: [
    {
      label: 'Step 1 · 2-3 Zone Set',
      labelZh: '第一步 · 2-3 區域陣型',
      description: 'Two guards (D1, D2) cover the perimeter. Three defenders (D3, D4, D5) protect the paint and baseline area.',
      descriptionZh: '兩名後衛守外圍，三名球員守禁區與底線區域，形成 2-3 區域。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 155, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 278, y: 210 },
        { id: 7, position: 'SG', team: 'defense', x: 278, y: 290 },
        { id: 8, position: 'SF', team: 'defense', x: 165, y: 180 },
        { id: 9, position: 'C',  team: 'defense', x: 130, y: 250 },
        { id: 10, position: 'PF', team: 'defense', x: 165, y: 320 },
      ],
      movements: [
        { playerId: 1, toX: 220, toY: 158, type: 'run' },
      ],
    },
    {
      label: 'Step 2 · Ball Swings to Wing',
      labelZh: '第二步 · 球轉移到側翼',
      description: 'Offense swings the ball to the right wing. D1 closes out hard. The bottom three shift right to cut off baseline drives.',
      descriptionZh: '進攻方把球轉到右側翼。守衛快速撲防，下方三人整體右移以封鎖底線突破。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 310, y: 250 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 155, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 230, y: 162 },
        { id: 7, position: 'SG', team: 'defense', x: 278, y: 278 },
        { id: 8, position: 'SF', team: 'defense', x: 148, y: 163 },
        { id: 9, position: 'C',  team: 'defense', x: 130, y: 230 },
        { id: 10, position: 'PF', team: 'defense', x: 160, y: 295 },
      ],
      movements: [
        { playerId: 1, toX: 90, toY: 100, type: 'run' },
        { playerId: 8, toX: 110, toY: 140, type: 'run' },
        { playerId: 9, toX: 120, toY: 210, type: 'run' },
      ],
    },
    {
      label: 'Step 3 · Corner Rotation',
      labelZh: '第三步 · 底角輪轉',
      description: 'Ball enters the corner. D3 sprints to close out. D5 slides to cover the paint. Zone sags to eliminate easy baskets.',
      descriptionZh: '球進到底角。底線最近的防守者衝出撲防，其他人向內收縮保護禁區，杜絕輕鬆得分。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 90,  y: 100, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 310, y: 250 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 158 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 155, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 240, y: 185 },
        { id: 7, position: 'SG', team: 'defense', x: 265, y: 278 },
        { id: 8, position: 'SF', team: 'defense', x: 110, y: 108 },
        { id: 9, position: 'C',  team: 'defense', x: 120, y: 210 },
        { id: 10, position: 'PF', team: 'defense', x: 148, y: 288 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 7: Beat 2-3 Zone — High Post Touch (Offense vs Zone)
// ─────────────────────────────────────────────
const beatZoneHighPost: Play = {
  id: 'beat-zone-high-post',
  name: 'Vs 2-3 · High Post',
  nameZh: '破 2-3 區域 · 高位策應',
  description: 'Best single rule against a 2-3 zone: get the ball to the free-throw line. From there the offense can shoot, hit a cutter, or dump to the corner.',
  descriptionZh: '破 2-3 區域最重要的一條原則：把球送到罰球線。在那裡可以出手中投、餵切入者，或下分球到底角射手。',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Zone Recognition',
      labelZh: '第一步 · 識別區域',
      description: 'Defense is in a 2-3 zone. Two guards up top, three defenders along the baseline. The high post (free-throw line) is the soft spot.',
      descriptionZh: '防守是 2-3 區域。上方兩後衛、下方三人沿底線。高位（罰球線）是區域最脆弱的位置。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 470 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 30 },
        { id: 5, position: 'C',  team: 'offense', x: 250, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 270, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 270, y: 300 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 150 },
        { id: 9, position: 'PF', team: 'defense', x: 95,  y: 250 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 350 },
      ],
      movements: [
        { playerId: 5, toX: 195, toY: 250, type: 'cut' },
      ],
    },
    {
      label: 'Step 2 · Flash to High Post',
      labelZh: '第二步 · 中鋒上提高位',
      description: 'C flashes into the gap between the two top defenders, sitting at the free-throw line — the seam of the zone.',
      descriptionZh: '中鋒切入上方兩名防守者之間的縫隙，停在罰球線——這是區域的接縫點。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 470 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 30 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 270, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 270, y: 300 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 150 },
        { id: 9, position: 'PF', team: 'defense', x: 95,  y: 250 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 350 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 5 },
      ],
    },
    {
      label: 'Step 3 · Catch & Read',
      labelZh: '第三步 · 接球判讀',
      description: 'C catches at the free-throw line. The bottom-middle defender (D9) MUST step up. Three reads: shoot, hit the corner shooter, or feed a cutter.',
      descriptionZh: '中鋒在罰球線接球。底線中間的防守者必須上前協防。三種選擇：自己出手、傳給底角射手、或餵給空切者。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 470 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 30 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250, hasBall: true },
        { id: 6, position: 'PG', team: 'defense', x: 250, y: 215 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 285 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 150 },
        { id: 9, position: 'PF', team: 'defense', x: 165, y: 240 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 350 },
      ],
      passes: [
        { fromPlayerId: 5, toPlayerId: 3 },
      ],
    },
    {
      label: 'Step 4 · Corner Shot',
      labelZh: '第四步 · 底角出手',
      description: 'C dumps the ball to SF in the corner. The bottom defender D10 cannot recover in time — wide-open three from the weakest spot in the zone.',
      descriptionZh: '中鋒分球到底角的小前鋒。底線防守者來不及回防——區域最弱的位置出空檔三分。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 470, hasBall: true },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 30 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 250, y: 215 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 285 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 150 },
        { id: 9, position: 'PF', team: 'defense', x: 165, y: 240 },
        { id: 10, position: 'C', team: 'defense', x: 140, y: 400 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 8: Beat 2-3 Zone — Ball Swing (Skip-Reversal)
// ─────────────────────────────────────────────
const beatZoneBallSwing: Play = {
  id: 'beat-zone-ball-swing',
  name: 'Vs 2-3 · Ball Swing',
  nameZh: '破 2-3 區域 · 快速轉移',
  description: 'Move the ball faster than the zone can shift. Side-to-side reversals (and a skip pass) force the bottom defenders to scramble — eventually a shooter is open.',
  descriptionZh: '球的轉移要比區域輪轉更快。透過左右兩邊的反轉（甚至大跨邊長傳），逼底線防守者來不及補位，就會空出射手。',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Overload One Side',
      labelZh: '第一步 · 強側集中',
      description: 'PG starts on the right wing with the ball. SG, C, and PF are stacked on the strong side to draw the zone over.',
      descriptionZh: '控球從右側翼持球開始。得分後衛、中鋒、大前鋒都集中於強邊，把區域整體吸過來。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 90,  y: 100 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 470 },
        { id: 5, position: 'C',  team: 'offense', x: 130, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 230, y: 165 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 290 },
        { id: 8, position: 'SF', team: 'defense', x: 110, y: 130 },
        { id: 9, position: 'PF', team: 'defense', x: 95,  y: 250 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 360 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 3 },
      ],
    },
    {
      label: 'Step 2 · Quick Reversal',
      labelZh: '第二步 · 快速反轉',
      description: 'PG reverses the ball to SF on the opposite wing. The whole zone has to shift; the bottom defenders are scrambling.',
      descriptionZh: '控球把球反轉到對側翼的小前鋒。整個區域必須跟著平移，底線防守者來回奔跑。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158 },
        { id: 2, position: 'SG', team: 'offense', x: 90,  y: 100 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342, hasBall: true },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 470 },
        { id: 5, position: 'C',  team: 'offense', x: 130, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 245, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 235, y: 335 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 200 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 280 },
        { id: 10, position: 'C', team: 'defense', x: 145, y: 350 },
      ],
      passes: [
        { fromPlayerId: 3, toPlayerId: 4 },
      ],
    },
    {
      label: 'Step 3 · Skip to the Corner',
      labelZh: '第三步 · 跨邊長傳到底角',
      description: 'SF immediately skips a pass to PF in the weak-side corner. The bottom defender is two slides late — corner is open.',
      descriptionZh: '小前鋒立刻跨邊長傳給弱邊底角的大前鋒。底線防守者已經慢了兩步——底角空出來了。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158 },
        { id: 2, position: 'SG', team: 'offense', x: 90,  y: 100 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 470, hasBall: true },
        { id: 5, position: 'C',  team: 'offense', x: 130, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 245, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 235, y: 335 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 200 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 280 },
        { id: 10, position: 'C', team: 'defense', x: 175, y: 380 },
      ],
    },
    {
      label: 'Step 4 · Open Corner Three',
      labelZh: '第四步 · 底角三分空檔',
      description: 'PF rises into the corner three before D10 can close out. Rule: ball moves faster than feet — keep swinging until the defense breaks.',
      descriptionZh: '大前鋒在防守撲到前果斷出手底角三分。原則：球永遠跑得比人快——持續轉移直到區域被撕裂。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 220, y: 158 },
        { id: 2, position: 'SG', team: 'offense', x: 90,  y: 100 },
        { id: 3, position: 'SF', team: 'offense', x: 220, y: 342 },
        { id: 4, position: 'PF', team: 'offense', x: 60,  y: 470, hasBall: true },
        { id: 5, position: 'C',  team: 'offense', x: 130, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 245, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 235, y: 335 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 200 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 280 },
        { id: 10, position: 'C', team: 'defense', x: 100, y: 430 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 9: Man-to-Man Help Defense
// ─────────────────────────────────────────────
const helpDefense: Play = {
  id: 'help-defense',
  name: 'Help Defense',
  nameZh: '盯人協防輪轉',
  description: 'Man-to-man defense with proper help rotations. When the ball penetrates, weak-side defenders rotate to stop the drive.',
  descriptionZh: '盯人防守搭配正確的協防輪轉。當持球者突破時，弱邊球員必須及時補防阻止上籃，被補位的人則往內輪轉補位。',
  type: 'defense',
  steps: [
    {
      label: 'Step 1 · Man-to-Man Setup',
      labelZh: '第一步 · 盯人陣型',
      description: 'Each defender guards their assigned player. Ball is at the top with the PG. Defenders are in deny/gap positions.',
      descriptionZh: '每位防守者各自盯防自己負責的球員。控球持球在弧頂，防守者站在阻絕／縫隙位置。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 120, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 132, y: 298 },
      ],
      movements: [
        { playerId: 1, toX: 195, toY: 235, type: 'run' },
      ],
    },
    {
      label: 'Step 2 · Drive Penetration',
      labelZh: '第二步 · 突破殺入',
      description: 'PG beats D1 off the dribble and drives into the lane. D5 must help! D4 rotates to replace D5.',
      descriptionZh: '控球運球過了主防守者，殺入禁區。中鋒的防守者必須過來協防！同時大前鋒的防守者輪轉去補中鋒留下的空位。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 195, y: 235, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 120, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 245, y: 255 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 108, y: 393 },
        { id: 10, position: 'C', team: 'defense', x: 132, y: 298 },
      ],
      movements: [
        { playerId: 10, toX: 160, toY: 248, type: 'run' },
        { playerId: 9,  toX: 118, toY: 310, type: 'run' },
      ],
    },
    {
      label: 'Step 3 · Help Rotation',
      labelZh: '第三步 · 協防輪轉',
      description: 'D5 steps up to take the charge / cut off the drive. D4 has rotated down to cover the vacated post. D1 sprints back to recover.',
      descriptionZh: '中鋒的防守者上前擋切入或製造帶球撞人。大前鋒的防守者已輪轉到內線補位。原本的主防守者全速回撤回防。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 195, y: 235, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
        { id: 3, position: 'SF', team: 'offense', x: 90,  y: 100 },
        { id: 4, position: 'PF', team: 'offense', x: 90,  y: 400 },
        { id: 5, position: 'C',  team: 'offense', x: 120, y: 305 },
        { id: 6, position: 'PG', team: 'defense', x: 210, y: 248 },
        { id: 7, position: 'SG', team: 'defense', x: 238, y: 165 },
        { id: 8, position: 'SF', team: 'defense', x: 108, y: 107 },
        { id: 9, position: 'PF', team: 'defense', x: 118, y: 310 },
        { id: 10, position: 'C', team: 'defense', x: 160, y: 248 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 10: Free Tactics Board (Sandbox)
// ─────────────────────────────────────────────
// A single-step play where every player can be dragged anywhere on the floor.
// Useful for drawing your own scheme on top of the standard 10-player layout.
const sandboxPlayers: PlayerState[] = [
  { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
  { id: 2, position: 'SG', team: 'offense', x: 220, y: 158 },
  { id: 3, position: 'SF', team: 'offense', x: 95,  y: 100 },
  { id: 4, position: 'PF', team: 'offense', x: 95,  y: 400 },
  { id: 5, position: 'C',  team: 'offense', x: 155, y: 250 },
  { id: 6, position: 'PG', team: 'defense', x: 480, y: 250 },
  { id: 7, position: 'SG', team: 'defense', x: 560, y: 158 },
  { id: 8, position: 'SF', team: 'defense', x: 670, y: 100 },
  { id: 9, position: 'PF', team: 'defense', x: 670, y: 400 },
  { id: 10, position: 'C', team: 'defense', x: 620, y: 250 },
];

const sandbox: Play = {
  id: 'sandbox',
  name: '🎨 Free Tactics Board',
  nameZh: '🎨 自由戰術板',
  description: 'Drag any player anywhere on the court to design your own play. Use the reset button to restore the starting lineup.',
  descriptionZh: '可以拖曳任何球員到場上任意位置，自由設計你的戰術。按重置按鈕可恢復初始陣型。',
  type: 'sandbox',
  steps: [
    {
      label: 'Free Tactics Board',
      labelZh: '自由戰術板',
      description: 'Click and drag any player to move them. There are no preset steps — sketch your own scheme. Hit Reset to restore the default lineup.',
      descriptionZh: '點擊並拖曳任何球員來移動位置。沒有預設步驟——自由繪製你的戰術。按重置可恢復預設陣型。',
      players: sandboxPlayers,
    },
  ],
};

// ─────────────────────────────────────────────
// Play 11: Give & Go (傳切配合) — Most basic 2-man play
// ─────────────────────────────────────────────
const giveAndGo: Play = {
  id: 'give-and-go',
  name: 'Give & Go',
  nameZh: '傳切配合',
  description: 'The simplest two-player play in basketball. PG passes to the wing, then immediately cuts to the basket for a return pass.',
  descriptionZh: '籃球最基本的兩人配合。控球傳球給側翼後，立刻空切到籃下接回傳球上籃。',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Pass to the Wing',
      labelZh: '第一步 · 傳球到側翼',
      description: 'PG at the top of the key passes the ball to SG on the wing. The defense relaxes for a beat after the pass.',
      descriptionZh: '控球在弧頂把球傳給側翼的得分後衛。傳球後防守者通常會稍微鬆懈。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 138 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 110 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 390 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 2 · Cut to the Basket',
      labelZh: '第二步 · 空切到籃下',
      description: "After passing, PG immediately sprints (cuts) toward the basket. Don't stand and watch the pass! D1 often relaxes, watching the ball.",
      descriptionZh: '傳球後，控球立刻全速空切到籃下。重點：傳完球不要站著看！防守者通常會放鬆視線跟著球。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 325, y: 257 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 138 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 110 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 390 },
      ],
      movements: [
        { playerId: 1, toX: 145, toY: 250, type: 'cut' },
      ],
    },
    {
      label: 'Step 3 · Return Pass',
      labelZh: '第三步 · 回傳球',
      description: "PG arrives at the rim ahead of D1. SG hits the cutter with a quick bounce pass. Cutter looks for the ball as soon as he plants his cut.",
      descriptionZh: '控球在防守者之前抵達籃下。得分後衛立刻地板球回傳給空切者。空切者起步瞬間就要尋找球。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 145, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 200, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 138 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 110 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 390 },
      ],
      passes: [
        { fromPlayerId: 2, toPlayerId: 1 },
      ],
    },
    {
      label: 'Step 4 · Easy Layup',
      labelZh: '第四步 · 輕鬆上籃',
      description: 'PG catches at the rim for an open layup. Coaching point: the cut must be sharp and immediate — hesitation lets the defender recover.',
      descriptionZh: '控球在籃下接球完成空檔上籃。教學重點：空切必須果斷且立刻啟動——猶豫就會讓防守者跟上來。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 80, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 200, y: 370 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 100 },
        { id: 5, position: 'C',  team: 'offense', x: 95,  y: 400 },
        { id: 6, position: 'PG', team: 'defense', x: 175, y: 250 },
        { id: 7, position: 'SG', team: 'defense', x: 215, y: 138 },
        { id: 8, position: 'SF', team: 'defense', x: 215, y: 362 },
        { id: 9, position: 'PF', team: 'defense', x: 110, y: 110 },
        { id: 10, position: 'C', team: 'defense', x: 110, y: 390 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// Play 12: Beat 2-3 Zone — Overload + Short Corner
// ─────────────────────────────────────────────
const beatZoneOverload: Play = {
  id: 'beat-zone-overload',
  name: 'Vs 2-3 · Overload + Short Corner',
  nameZh: '破 2-3 區域 · 強側集中＋短角落',
  description: "Put 4 shooters on one side of the floor and a player in the 'short corner' (just outside the lane on the baseline). The zone has too many bodies to cover.",
  descriptionZh: '把 4 名球員集中在球場一側，並讓一名球員站在「短角落」（禁區外側、底線位置）。區域防守在這側人手不足，必有空檔。',
  type: 'offense',
  steps: [
    {
      label: 'Step 1 · Overload the Strong Side',
      labelZh: '第一步 · 強側集中',
      description: 'PG at the top with the ball. SG on the strong-side wing, SF in the strong-side corner, C at the high post, PF at the SHORT CORNER (baseline outside the lane). Four players on one side.',
      descriptionZh: '控球持球在弧頂。得分後衛在強邊側翼，小前鋒在強邊底角，中鋒在高位（罰球線），大前鋒在「短角落」（禁區邊、貼底線）。同一側集中 4 人。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250, hasBall: true },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 30 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 180 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 270, y: 200 },
        { id: 7, position: 'SG', team: 'defense', x: 270, y: 300 },
        { id: 8, position: 'SF', team: 'defense', x: 130, y: 150 },
        { id: 9, position: 'PF', team: 'defense', x: 95,  y: 250 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 350 },
      ],
      passes: [
        { fromPlayerId: 1, toPlayerId: 2 },
      ],
    },
    {
      label: 'Step 2 · Ball to the Wing',
      labelZh: '第二步 · 球到側翼',
      description: 'PG passes to SG on the strong-side wing. The top defender D1 closes out. C flashes to the high post pulling D9 with him.',
      descriptionZh: '控球傳給強邊側翼的得分後衛。上方防守撲出去守球，中鋒上提到高位，把底線中間的防守者拉出來。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130, hasBall: true },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 30 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 180 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 215, y: 165 },
        { id: 7, position: 'SG', team: 'defense', x: 270, y: 280 },
        { id: 8, position: 'SF', team: 'defense', x: 110, y: 110 },
        { id: 9, position: 'PF', team: 'defense', x: 145, y: 220 },
        { id: 10, position: 'C', team: 'defense', x: 130, y: 350 },
      ],
      passes: [
        { fromPlayerId: 2, toPlayerId: 4 },
      ],
    },
    {
      label: 'Step 3 · Quick Pass to the Short Corner',
      labelZh: '第三步 · 快傳短角落',
      description: "SG drops the ball to PF in the short corner. The bottom defender D10 has to choose: cover the short corner shooter or the corner. Either way, someone is open.",
      descriptionZh: '得分後衛把球下傳給短角落的大前鋒。底線防守者必須二選一：守短角落射手還是底角，總會空一個出來。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 30 },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 180, hasBall: true },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 215, y: 165 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 270 },
        { id: 8, position: 'SF', team: 'defense', x: 110, y: 110 },
        { id: 9, position: 'PF', team: 'defense', x: 145, y: 220 },
        { id: 10, position: 'C', team: 'defense', x: 120, y: 200 },
      ],
    },
    {
      label: 'Step 4 · Read the Help',
      labelZh: '第四步 · 判讀協防',
      description: "PF can shoot the open mid-range jumper, drive baseline (D10 vacated), or kick to SF in the corner if D10 helps. The short corner is the zone's blind spot.",
      descriptionZh: '大前鋒可以選擇出手空檔中距離、走底線突破（防守已空出），或在防守協防時把球傳給底角的小前鋒。短角落是區域防守的死角。',
      players: [
        { id: 1, position: 'PG', team: 'offense', x: 310, y: 250 },
        { id: 2, position: 'SG', team: 'offense', x: 200, y: 130 },
        { id: 3, position: 'SF', team: 'offense', x: 60,  y: 30, hasBall: true },
        { id: 4, position: 'PF', team: 'offense', x: 95,  y: 180 },
        { id: 5, position: 'C',  team: 'offense', x: 195, y: 250 },
        { id: 6, position: 'PG', team: 'defense', x: 215, y: 165 },
        { id: 7, position: 'SG', team: 'defense', x: 250, y: 270 },
        { id: 8, position: 'SF', team: 'defense', x: 110, y: 110 },
        { id: 9, position: 'PF', team: 'defense', x: 145, y: 220 },
        { id: 10, position: 'C', team: 'defense', x: 120, y: 130 },
      ],
    },
  ],
};

export const plays: Play[] = [
  pickAndRoll,
  giveAndGo,
  motionOffense,
  baselineCut,
  driveAndKick,
  backdoorCut,
  zoneDefense23,
  beatZoneHighPost,
  beatZoneBallSwing,
  beatZoneOverload,
  helpDefense,
  sandbox,
];
