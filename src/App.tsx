import { useState, useEffect, useCallback } from 'react';
import './App.css';
import AllInOnePage from './components/AllInOnePage';

const TOTAL = 10;

/* ═══════════════════════════════════════════════════════════
   資料層：核心戰術（通用） + 對位特化（每隊覆寫 S1 / S3 / S8 / S9 / S10）
   ═══════════════════════════════════════════════════════════ */

type Opponent = { name: string; emoji: string; threat: string; strategy: string };
type VictoryKey = { title: string; detail: string };
type Play = { name: string; tag: string; goal: string; how: string[] };

type MatchupData = {
  id: string;
  shortName: string;
  fullName: string;
  badgeClass: string;          // CSS color: main / yellow / blue / red

  // Slide 1
  ourBadge: string;
  theirBadge: string;
  ourAdvantages: string[];
  theirAdvantages: string[];
  fatalWeakness: string[];
  defensePrincipleTitle: string;
  defensePrincipleDetail: string;
  offensePrincipleTitle: string;
  offensePrincipleDetail: string;

  // Slide 3
  opponents: Opponent[];

  // Slide 8
  victoryKeys: VictoryKey[];
  finalMotto: string;

  // Slide 9 對位特化戰術
  extraPlays: Play[];

  // Slide 10 賽前 Briefing
  briefingDefense: string[];
  briefingOffense: string[];
  briefingMentality: string;
};

/* ─── 主戰術（通用版）─── */
const MAIN_MATCHUP: MatchupData = {
  id: 'main',
  shortName: '主戰術',
  fullName: 'Core Playbook',
  badgeClass: 'main',
  ourBadge: '橘隊\n速度 × 空間 × 外線',
  theirBadge: '任何對手\n通用準則',
  ourAdvantages: [
    '機動性高，全隊可上可下',
    '外線火力是穩定得分來源',
    '快攻反擊能力強，能瞬間拉開比分',
  ],
  theirAdvantages: [
    '幾乎所有對手都有「禁區或速度」其中一項優勢',
    '我們不能用蠻力比身材',
  ],
  fatalWeakness: [
    '本隊最大威脅永遠是「快攻被打」與「禁區被吃」',
    '只要切斷對方快攻，我們勝率立刻 +30%',
  ],
  defensePrincipleTitle: '「鐵桶收縮 + SAFE」',
  defensePrincipleDetail: '放投不放切，禁區絕不失守；同時必有人站弧頂阻斷快攻',
  offensePrincipleTitle: '「快攻第一・空間第二」',
  offensePrincipleDetail: '抓板就推，推不動就拉開空間打擋拆找外線',
  opponents: [
    { name: '速度型對手', emoji: '💨', threat: '抄截 → 快攻一條龍', strategy: '弧頂永遠留 SAFE 人；接球者主動上前迎球' },
    { name: '高大型禁區', emoji: '🏔️', threat: '低位卡死 / 二波籃板', strategy: '不硬碰；用擋拆把他拉出禁區，外線消耗他的體力' },
    { name: '壯漢硬漢型', emoji: '🧱', threat: '貼身對抗 / 強推進', strategy: 'Ken 對位卡死；進攻打他換防慢的時機' },
    { name: '空檔射手型', emoji: '🎯', threat: '無球跑位接球就投', strategy: '盯人不能漏；輪轉時 X-out 必須撲到底' },
  ],
  victoryKeys: [
    { title: '無 SAFE 不進攻', detail: '每一次進攻，弧頂必有 SAFE 人員駐守。打斷對手快攻，比賽就贏了一半。' },
    { title: '三分線是我們的生命線', detail: '只要外線進球，對手防守壓力就會瓦解，禁區空間自動打開。' },
    { title: '繞開高度，打出空間', detail: '不在禁區硬秀。拉開空間、傳導空切、有空檔就果斷投籃，把對方高度化為無用。' },
  ],
  finalMotto: '防守帶動快攻 · 外線打開空間 · SAFE 保障一切',

  extraPlays: [
    {
      name: '🚧 高位應對：Pinch & Recover',
      tag: '修補 · 2-3 區域聯防最弱破口',
      goal: '解決 2-3 區域聯防中「罰球線高位」被輕鬆中距離投爆的問題',
      how: [
        '只要對手在罰球線拿球，底線 Kai 或 Ken 大喊並果斷跨出一步干擾（Show）',
        '逼持球者把球分出去',
        'Steve 或 Neil 同時往下收縮，補進中鋒原本的位置，形成瞬間夾擊網',
      ],
    },
    {
      name: '💪 籃板鐵律：Hit First 法則',
      tag: '修補 · 區域聯防的籃板崩潰',
      goal: '解決區域聯防「看球不看人」導致防守籃板被爆搶的問題',
      how: [
        '對手一出手，Kai / Ken / Tony 第一個動作不是跳起來搶球',
        '先轉身找對方禁區大個的身體「撞上去卡死」（Box out）',
        '只要把禁區大個卡在油漆區外，籃板掉下來就是我們的',
      ],
    },
  ],

  briefingDefense: [
    '區域聯防死守油漆區，放對手投長兩分，不跟速度型球員比快',
    'SAFE 三分線頂端永遠留一個人，投不進絕不衝搶，第一時間轉身狂奔退防',
    '對手出手後第一動作是「先撞人再搶球」（Box out）',
  ],
  briefingOffense: [
    '看到大個在籃下，立刻急停跳投或往外分球，不准硬上',
    '打點對手防守紀律最差的人 — 找出他防誰，就用他單打或空切',
    '接球時迎著球跑，看到對方眼神想抄球，直接反跑開後門',
  ],
  briefingMentality: '對手可能比我們高、跑得快，但籃球是打空間和速度的。退防快、卡位確實、外線果斷出手，節奏就在我們手裡。SAFE 做好，空檔就投 — Let\'s Go！',
};

/* ─── 黃隊 ─── */
const YELLOW_MATCHUP: MatchupData = {
  id: 'yellow',
  shortName: '黃隊',
  fullName: 'vs Yellow Team',
  badgeClass: 'yellow',
  ourBadge: '橘隊\n球商 × 紀律',
  theirBadge: '黃隊\n體能 × 高度',
  ourAdvantages: ['機動性極高', '外線火力充沛', '快攻反擊能力強'],
  theirAdvantages: [
    '🚨 小G — 聯盟頂級體能怪物：速度 + 彈跳 + 耐力三項滿值，只要有一點空間就一條龍直接得分',
    'Paul 禁區絕對高度優勢（190cm 制空）',
  ],
  fatalWeakness: ['全隊幾乎沒有穩定的三分外線能力'],
  defensePrincipleTitle: '🚨「SAFE 第一 · 鐵桶收縮」',
  defensePrincipleDetail: '本場最高指令：弧頂不能空！小G 體能頂級，只要拿到半步空間就是一條龍 2 分。Steve / Neil 輪流守死弧頂，放投不放切，禁區封死 Paul',
  offensePrincipleTitle: '「拉扯 Paul · 懲罰小G」',
  offensePrincipleDetail: '用外線與擋拆把 Paul 拉出禁區；用反跑懲罰小G的賭博抄截',
  opponents: [
    { name: '🚨 小G (Glenn)', emoji: '💨', threat: '⚡ 全場最強體能！速度 / 彈跳 / 耐力三頂滿 — 一旦有空間立刻一條龍直接 2 分；同時愛賭博式抄截', strategy: '【最優先】SAFE 守住弧頂讓他沒有快攻空間；反跑懲罰他的貪心；接球者主動迎球閃過抄截' },
    { name: 'Paul', emoji: '🏔️', threat: '禁區制空霸主・190cm 高度優勢', strategy: '繞前防守 + 接球瞬間包夾；進攻完全避開他的高度' },
    { name: 'Jack', emoji: '🧱', threat: '體格壯碩・無三分外線', strategy: 'Ken 全場緊盯卡死；進攻打他換防慢的時機' },
    { name: 'Mark / Randolph', emoji: '🎯', threat: '防守紀律弱・外線不穩', strategy: 'Neil 與 Tony 的提款機，有機會就主動單打' },
  ],
  victoryKeys: [
    { title: '🚨 第一優先：SAFE 守死弧頂', detail: '小G 體能全聯盟最頂，快攻一條龍只需要半秒鐘。Steve、Neil 每次出手後第一個動作就是補弧頂，任何情況都不能打折扣 — 弧頂一空，失分是必然！' },
    { title: '三分線是空間鑰匙', detail: '黃隊缺乏三分能力，只要我們命中外線，Paul 就被迫拉出禁區，空間立刻打開。' },
    { title: '不跟 Paul 硬碰禁區', detail: 'Kai 用繞前 + 干擾傳球路線，讓他接不到舒服球；進攻完全避開他的高度範圍。' },
  ],
  finalMotto: '🚨 SAFE 守死弧頂 · 困住小G一條龍 · 三分拉開 Paul',

  extraPlays: [
    {
      name: '🅰️ 五外空間拉扯（5-Out Spacing）',
      tag: '對 Paul · 騙他出禁區',
      goal: 'Paul 死守禁區不出來、我們切入屢屢碰壁時使用',
      how: [
        '5 個人全部退到三分線外（包含 Ken 和 Kai）',
        '【Paul 不出來】Ken 直接幫持球的 Kai 設立掩護，Kai 獲得無障礙的三分或中距離出手',
        '【Paul 撲出來】禁區唱空城，Neil 或 Steve 立刻反跑空切（Backdoor），輕鬆上籃',
      ],
    },
    {
      name: '🅱️ 西班牙擋拆簡化版（Stack PnR）',
      tag: '對 Paul · 雙掩護避火鍋',
      goal: '需要強攻禁區，但又要避開 Paul 的火鍋',
      how: [
        'Kai 持球，Ken 上來幫 Kai 擋人',
        'Steve 或 Tony 同時跑到 Paul 背後再設一個掩護（擋住 Paul）',
        'Kai 繞過 Ken 的掩護切入時，Paul 被擋住無法補防 → 直接挑戰防守較弱的 Jack 或 Randolph',
      ],
    },
    {
      name: '🅲 反跑懲罰（The Backdoor Punish）',
      tag: '對小G · 懲罰賭博抄截',
      goal: '小G 死盯傳球路線、準備衝出來抄截時使用',
      how: [
        '被小G防的人（如 Neil）先做「假裝要出來接球」的動作',
        '吸引小G 重心往前撲',
        'Neil 後腳一蹬，轉身往籃下空切；持球者直接吊球到籃下，輕鬆上籃',
      ],
    },
    {
      name: '🅳 假交遞真突破（Fake DHO）',
      tag: '對小G · 利用他撲球失位',
      goal: '我們在弧頂進行手遞手傳球（DHO）時使用',
      how: [
        'Kai 運球往 Steve 靠近，假裝要把球手遞手交給 Steve',
        '小G 為了抄這球，會從中間硬擠或撲向 Steve',
        'Kai 把球收回不傳，自己順勢轉身加速切入 — 小G 撲空，Kai 一條康莊大道',
      ],
    },
  ],

  briefingDefense: [
    '🚨 SAFE 是本場命脈！小G 體能頂級體力無限、快攻一條龍 — Steve / Neil 出手後第一動作轉身補弧頂，絕不衝搶！',
    '區域聯防死守油漆區，放他們投長兩分，不准撲出去跟小G比速度',
    'Ken / Kai — 對手出手就轉身找 Paul 跟 Jack 卡死，不給他們起跳空間',
  ],
  briefingOffense: [
    '不要挑戰 190 — 看到 Paul 在籃下，立刻急停跳投或往外分球，不准硬上',
    'Mark 跟 Randolph 是提款機 — Neil 跟 Tony 有機會就找他們單打或空切',
    '懲罰小G — 接球時迎著球跑；他眼神不對想抄球，立刻反跑開後門讓他撲空',
  ],
  briefingMentality: '小G 是這場最危險的人，體能頂級、快攻一條龍。只要 SAFE 弧頂守死，他的優勢歸零。退防到位、外線果斷，比賽節奏就在我們手裡 — Let\'s Go！',
};

/* ─── 藍隊 ─── */
const BLUE_MATCHUP: MatchupData = {
  id: 'blue',
  shortName: '藍隊',
  fullName: 'vs Blue Team',
  badgeClass: 'blue',
  ourBadge: '橘隊\n速度 × 機動',
  theirBadge: '藍隊\n重裝坦克 × 陣地肉搏',
  ourAdvantages: ['速度遠勝對手', '退防快、轉換進攻優勢明顯', '外線靈活、能拉開空間'],
  theirAdvantages: ['全隊噸位極重（Kyle 90 / Fred 80 / Tom 80）', '有外線冷箭（Rex、Neal）'],
  fatalWeakness: ['退防速度極慢', '缺乏全場防守觀念，Fred 不熟區域聯防'],
  defensePrincipleTitle: '「提早站定 · 雙人關門」',
  defensePrincipleDetail: '不退守！Tom 的大墊步用「提早站定製造進攻犯規」破解；Rex / Neal 絕不漏空',
  offensePrincipleTitle: '「拖快節奏 · 折返跑大賽」',
  offensePrincipleDetail: '搶到板就推，把比賽變成田徑賽，第三節之前累垮他們',
  opponents: [
    { name: 'Rex（射手）', emoji: '🎯', threat: '45 度 / 底角空檔就投', strategy: '絕對不漏！輪轉時 X-out 必須撲到底，不給他舒服位置' },
    { name: 'Neal（射手）', emoji: '🎯', threat: '無球跑位、接球就投', strategy: '貼身追防，繞掩護不能掉以輕心' },
    { name: 'Tom（街球硬漢）', emoji: '🧱', threat: '愛用大墊步硬推進', strategy: '提早站定卡位製造進攻犯規；切入路線雙人關門' },
    { name: 'Kyle / Fred（重裝坦克）', emoji: '🚛', threat: '噸位重、卡位強、會搶板', strategy: '不跟他們拼蠻力，用速度拖垮 — 高位 PnP 把他們拉出禁區' },
  ],
  victoryKeys: [
    { title: '把比賽變成折返跑大賽', detail: '搶到板就跑！藍隊噸位重、退防慢，第三節體能崩潰前我們就要拉開比分。' },
    { title: '射手不能漏 — Rex / Neal', detail: '藍隊的得分手段除了禁區肉搏就是這兩位射手。寧可放禁區硬上，也不能漏外線。' },
    { title: '不拼籃板拼速度', detail: '不要跟 Kyle / Fred 拼蠻力搶籃板。Box out 卡到位就好，搶到馬上推前場。' },
  ],
  finalMotto: '速度炸裂 · 拖垮坦克 · 退防保護 · 射手必貼',

  extraPlays: [
    {
      name: '🅰️ 田徑隊戰術（The Track Meet）',
      tag: '對藍隊 · 懲罰過重噸位與緩慢退防',
      goal: '把比賽變成折返跑大賽，第三節累垮他們',
      how: [
        '搶到籃板或對手進球，發球必須在 2 秒內完成',
        'Steve、Neil、Kai 呈三線快攻全速衝前場',
        'Kyle 和 Fred 絕對跑不回來 → 形成 3 打 2 或 3 打 1',
      ],
    },
    {
      name: '🅱️ 高位擋拆外彈（High Pick & Pop）',
      tag: '對藍隊 · 把坦克拉出禁區',
      goal: '把藍隊體重最重的 Kyle 或 Fred 拉出禁區，瓦解他們的肉搏優勢',
      how: [
        'Kai 在弧頂持球，Ken（或 Tony）上來設立掩護',
        '藍隊內線腳步慢，面對擋拆會選擇「沉退防守 (Drop)」',
        '【對方沒跟上】Kai 直接中距離拔起；【對方換防】Ken 往外彈到三分線，Kai 回傳給 Ken 或外圍 Steve 投射',
      ],
    },
  ],

  briefingDefense: [
    'Tom 的大墊步 — 不要退！提早站定位卡好，用身體製造進攻犯規',
    'Rex / Neal 永遠貼身 — 寧可放禁區，也絕不能漏外線空檔',
    '搶到防守籃板第一時間長傳出去，不要黏球！',
  ],
  briefingOffense: [
    '速度是我們的最強武器 — Steve / Neil / Kai，看到籃板就是三把刀直接刺穿半場',
    '弧頂擋拆把 Kyle / Fred 拉出來，讓他們的腳步追不上轉換',
    '半場陣地戰打不開時，立刻打 PnP 找空位射手',
  ],
  briefingMentality: '他們很重、很會卡位，但他們跑不動。把節奏拉到最快，第三節之前讓他們的體能歸零，這場我們贏定了。退防是命脈，外線是鑰匙 — Team Orange！',
};

/* ─── 紅隊 ─── */
const RED_MATCHUP: MatchupData = {
  id: 'red',
  shortName: '紅隊',
  fullName: 'vs Red Team',
  badgeClass: 'red',
  ourBadge: '橘隊\n紀律 × 團隊',
  theirBadge: '紅隊\n內外雙修 · 菁英軍',
  ourAdvantages: ['團隊紀律佳，輪轉到位', '外線群仍有空間優勢', '對位中可以打點他們最弱的 Jason'],
  theirAdvantages: ['Light（190cm/90kg）頂級中鋒', 'Darren 二波籃板機器', 'Jason 底角射手命中率 60%'],
  fatalWeakness: ['Jason 身材劣勢（173cm/65kg）', 'Darren 打法單調 — 上中跳投自搶'],
  defensePrincipleTitle: '「包夾 Light · 貼死 Jason · 卡死 Darren」',
  defensePrincipleDetail: 'Light 必夾擊；Jason 永遠貼身不離；Darren 出手全隊找人卡位',
  offensePrincipleTitle: '「點打 Jason · 拖陷阱 Darren」',
  offensePrincipleDetail: '進攻找出 Jason 防誰就攻誰；製造機會把 Darren 帶進籃板陷阱',
  opponents: [
    { name: 'Light', emoji: '🏔️', threat: '190cm/90kg 頂級中鋒・低位無解', strategy: '單防守不住！繞前防守 + 接球瞬間包夾，逼他出球' },
    { name: 'Darren', emoji: '🦘', threat: '體能怪獸・上中跳投自搶二波', strategy: '他出手 = 全隊立刻 box-out！製造他「衝搶撞牆」' },
    { name: 'Jason', emoji: '🎯', threat: '173cm 底角射手・命中率 60%', strategy: '是 2-3 區域的破壞者！底線球員必須隨時貼身照顧' },
    { name: '其他輪替球員', emoji: '🧩', threat: '能補位但沒有單點爆發', strategy: '不主動關注，集中火力對付三大威脅即可' },
  ],
  victoryKeys: [
    { title: 'Light 必夾擊 — 單防必死', detail: 'Kai 繞前 + 旁邊的人立刻上去包夾，逼 Light 把球傳出去，絕不讓他在禁區舒服接球。' },
    { title: 'Jason 貼死不放', detail: '他是 2-3 區域唯一的破壞者。底線防守球員必須隨時貼身，移動時也要黏住。' },
    { title: 'Darren 出手 = 全隊 Box Out', detail: '他每次出手都會自己衝搶。所有人不要看球，第一時間轉身找人卡位。' },
  ],
  finalMotto: '夾死 Light · 貼死 Jason · 卡死 Darren — 我們才有機會',

  extraPlays: [
    {
      name: '🅰️ 針對性打點（Targeting Jason）',
      tag: '對紅隊 · 消耗他們最準的射手',
      goal: '讓 Jason 在防守端疲於奔命，降低他進攻端的投籃穩定度',
      how: [
        '進攻時找出 Jason 防誰（假設他守 Steve 或 Tony）',
        'Kai 啟動切入時，被 Jason 防的 Steve 主動去幫 Kai 設立無球掩護',
        '逼 Jason 換防去對付 Kai → Kai 直接把 Jason 帶到低位單吃，或利用身高優勢拔起投籃',
      ],
    },
    {
      name: '🅱️ 誘捕 Darren（The Rebound Trap）',
      tag: '對紅隊 · 化解他的無賴打法',
      goal: '化解 Darren「上中跳投 + 衝搶籃板」的無賴打法',
      how: [
        '故意放 Darren 在高位（罰球線附近）接球',
        '他準備拔起跳投時，防守的 Kai 不要全力撲，立刻轉身背對他做卡位姿勢',
        '兩側 Ken 或 Neil 瞬間收縮，形成「三人肉牆」— Darren 跳下來就撞上人牆',
      ],
    },
  ],

  briefingDefense: [
    '底線絕對不漏 Jason（173cm 底線射手）— 永遠保持貼身',
    'Darren 在罰球線投籃時，所有人不要看球！轉身找人卡位 — 他一定會自己衝搶',
    'Light 拿球，Kai 繞前干擾，旁邊的人立刻上去包夾，逼他把球傳出去',
  ],
  briefingOffense: [
    '進攻時找出 Jason 防誰，就讓他換防到 Kai 身上單吃',
    '避開 Light 的高度範圍 — 切入碰到他立刻急停或分球',
    '搶到籃板第一時間推快攻，紅隊雖強但陣地戰才是他們的舒適圈',
  ],
  briefingMentality: '紅隊是這三隊裡最完整的對手。但他們有 Jason 這個破口，有 Darren 的單調打法。只要把他們三大威脅各別處理好，這場勝負就在我們手裡。團隊紀律是命脈 — Team Orange！',
};

const MATCHUPS: MatchupData[] = [MAIN_MATCHUP, YELLOW_MATCHUP, BLUE_MATCHUP, RED_MATCHUP];

/* ═══════════════════════════════════════════════════════════
   主元件
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [matchupId, setMatchupId] = useState<string>(MAIN_MATCHUP.id);
  const [idx, setIdx] = useState(0);
  const [allInOne, setAllInOne] = useState(false);
  const m = MATCHUPS.find(t => t.id === matchupId) ?? MAIN_MATCHUP;

  const next = useCallback(() => setIdx(i => Math.min(i + 1, TOTAL - 1)), []);
  const prev = useCallback(() => setIdx(i => Math.max(i - 1, 0)), []);

  useEffect(() => {
    if (allInOne) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [next, prev, allInOne]);

  const slides = [
    <S1 m={m} />,
    <S2 />,
    <S3 m={m} />,
    <S4 />,
    <S5 />,
    <S6 />,
    <S7 />,
    <S8 m={m} />,
    <S9 m={m} />,
    <S10 m={m} />,
  ];

  return (
    <div className="ppt">
      <header className="ppt-bar">
        <div className="bar-left">
          <span>🏀</span>
          <strong>橘隊戰術手冊</strong>
          <span className="bar-en">Orange Team Playbook</span>
        </div>

        <div className="team-switch">
          {MATCHUPS.map(t => (
            <button
              key={t.id}
              className={`team-btn team-btn-${t.badgeClass}${matchupId === t.id ? ' active' : ''}`}
              onClick={() => setMatchupId(t.id)}
              title={t.fullName}
            >
              {t.shortName}
            </button>
          ))}
        </div>

        <button className="allinone-toggle" onClick={() => setAllInOne(v => !v)}>
          {allInOne ? '切換分頁模式' : '單頁長捲動'}
        </button>
        {!allInOne && <span className="bar-counter">{idx + 1}&nbsp;/&nbsp;{TOTAL}</span>}
      </header>

      <main className="ppt-stage">
        {allInOne ? (
          <AllInOnePage m={m} />
        ) : (
          <>
            <button className="nav-btn" onClick={prev} disabled={idx === 0} aria-label="上一頁">&#8249;</button>
            <div className="slide-viewport">
              <div className="slide-wrap" key={`${matchupId}-${idx}`}>{slides[idx]}</div>
            </div>
            <button className="nav-btn" onClick={next} disabled={idx === TOTAL - 1} aria-label="下一頁">&#8250;</button>
          </>
        )}
      </main>

      {!allInOne && (
        <footer className="ppt-footer">
          <div className="dot-row">
            {Array.from({ length: TOTAL }, (_, i) => (
              <button key={i} className={`dot${i === idx ? ' on' : ''}`} onClick={() => setIdx(i)} aria-label={`第 ${i + 1} 頁`} />
            ))}
          </div>
          <span className="kbd-hint">← → 鍵盤換頁　·　頂部按鈕切換對位特化</span>
        </footer>
      )}
    </div>
  );
}

/* ─── Shared building blocks ─── */
function SlideLayout({ num, title, sub, icon, children }: {
  num: number; title: string; sub: string; icon: string; children: React.ReactNode;
}) {
  const display = num < 10 ? `0${num}` : `${num}`;
  return (
    <div className="slide">
      <div className="slide-head">
        <span className="slide-num">{display}</span>
        <div>
          <h1 className="slide-title"><span className="slide-icon">{icon}</span>{title}</h1>
          <p className="slide-sub">{sub}</p>
        </div>
      </div>
      <div className="slide-body">{children}</div>
    </div>
  );
}

function Sec({ heading, accent, children }: { heading?: string; accent?: string; children: React.ReactNode; }) {
  return (
    <div className="sec" style={accent ? { borderLeftColor: accent } : undefined}>
      {heading && <h3 className="sec-head">{heading}</h3>}
      {children}
    </div>
  );
}

type BulletItem = string | { text: string; sub?: string[] };
function Bullets({ items }: { items: BulletItem[] }) {
  return (
    <ul className="bullets">
      {items.map((item, i) => (
        <li key={i}>
          {typeof item === 'string' ? item : (
            <>
              {item.text}
              {item.sub && <ul className="sub-bullets">{item.sub.map((s, j) => <li key={j}>{s}</li>)}</ul>}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ─── Slide 1: Game Overview（依對位切換）─── */
export function S1({ m }: { m: MatchupData }) {
  const isMain = m.id === 'main';
  return (
    <SlideLayout
      num={1}
      title={isMain ? '賽局總覽與核心策略' : `對位特化：${m.shortName}`}
      sub={m.fullName}
      icon="⚔️"
    >
      <div className="two-col">
        <div>
          <Sec heading="⚡ 對戰本質" accent="#f97316">
            <div className="matchup">
              <span className="team-badge orange">{m.ourBadge.split('\n').map((l, i) => <span key={i}>{l}<br/></span>)}</span>
              <span className="vs">VS</span>
              <span className={`team-badge ${m.badgeClass}`}>{m.theirBadge.split('\n').map((l, i) => <span key={i}>{l}<br/></span>)}</span>
            </div>
          </Sec>
          <Sec heading="✅ 我方優勢" accent="#22c55e">
            <Bullets items={m.ourAdvantages} />
          </Sec>
          <Sec heading="⚠️ 敵方優勢" accent="#ef4444">
            <Bullets items={m.theirAdvantages} />
          </Sec>
          <Sec heading="🎯 敵方致命傷" accent="#a855f7">
            <Bullets items={m.fatalWeakness} />
          </Sec>
        </div>
        <div>
          <Sec heading="📋 最高指導原則" accent="#f97316">
            <div className="principle-card">
              <span className="ptag def">防守端</span>
              <p className="ptitle">{m.defensePrincipleTitle}</p>
              <p className="pdetail">{m.defensePrincipleDetail}</p>
            </div>
            <div className="principle-card mt">
              <span className="ptag off">進攻端</span>
              <p className="ptitle">{m.offensePrincipleTitle}</p>
              <p className="pdetail">{m.offensePrincipleDetail}</p>
            </div>
          </Sec>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ─── Slide 2: 我方陣容（共用）─── */
const PLAYERS = [
  {
    name: 'Steve', emoji: '🎯',
    pos: '後衛 · 外線射手',
    color: '#f97316',
    strengths: ['三分外線', 'SAFE 輪值', '冷靜出手'],
    desc: '全隊最穩定的外線開火點。只要隊友把防守吸引進去，Steve 接球就投，不猶豫、不等待。',
    mission: '外線點火，弧頂 SAFE 輪值',
  },
  {
    name: 'Neil', emoji: '🔒',
    pos: '後衛 · 防守引擎',
    color: '#3b82f6',
    strengths: ['退防速度', '防守溝通', '切入空切'],
    desc: '全隊防守的大腦，負責喊出退防指令、確認 SAFE 輪值。對手想發動快攻，第一個擋在路上的人就是他。',
    mission: 'SAFE 指揮，封鎖快攻發動者',
  },
  {
    name: 'Kai', emoji: '💥',
    pos: '前鋒 · 攻擊核心',
    color: '#a855f7',
    strengths: ['禁區突破', '籃板發動', '快攻箭頭'],
    desc: '最有破壞力的進攻威脅。抓到板就往前推，半場陣地戰負責突破禁區，讓防守收縮，隊友才有空檔。',
    mission: '搶板即推快攻，半場強攻破局',
  },
  {
    name: 'Ken', emoji: '🛡️',
    pos: '中鋒 · 功能核心',
    color: '#22c55e',
    strengths: ['無球掩護', '卡位頂住', '禁區屯兵'],
    desc: '全場最重要的無球功能型球員。進攻端設掩護讓隊友脫身，防守端用身材封住禁區，讓對手接不到好球。',
    mission: '掩護開空間，禁區頂住扯人',
  },
  {
    name: 'Tony', emoji: '🎪',
    pos: '前鋒 · 空間刺客',
    color: '#facc15',
    strengths: ['底角三分', '中距離', '空間拉扯'],
    desc: '把防守者吸引出禁區，讓 Kai 有切入空間。蹲守底角或 45 度熱點，有空檔就立刻果斷出手。',
    mission: '拉開禁區，底線空檔終結',
  },
];
export function S2() {
  return (
    <SlideLayout num={2} title="我方陣容與任務分配" sub="Orange Team Roles" icon="🧡">
      <div className="player-grid">
        {PLAYERS.map(p => (
          <div key={p.name} className="player-card" style={{ '--pcolor': p.color } as React.CSSProperties}>
            <div className="pcard-header">
              <span className="pemoji">{p.emoji}</span>
              <div className="pcard-title">
                <span className="pname">{p.name}</span>
                <span className="ppos">{p.pos}</span>
              </div>
            </div>
            <div className="pstrengths">
              {p.strengths.map(s => <span key={s} className="strength-pill">{s}</span>)}
            </div>
            <p className="pdesc">{p.desc}</p>
            <div className="pmission">
              <span className="pmission-label">⚡ 本場任務</span>
              {p.mission}
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ─── Slide 3: Scouting（依對位切換）─── */
export function S3({ m }: { m: MatchupData }) {
  const isMain = m.id === 'main';
  return (
    <SlideLayout
      num={3}
      title={isMain ? '通用對位原則（4 種威脅類型）' : `敵方情蒐：${m.shortName}`}
      sub={isMain ? 'General Matchup Principles' : `Scouting Report · ${m.fullName}`}
      icon="🔍"
    >
      <div className="scout-grid">
        {m.opponents.map(o => (
          <div key={o.name} className="scout-card">
            <div className="scout-head">
              <span className="scout-emoji">{o.emoji}</span>
              <strong className="scout-name">{o.name}</strong>
            </div>
            <div className="scout-row"><span className="tag-threat">威脅</span>{o.threat}</div>
            <div className="scout-row"><span className="tag-strategy">策略</span>{o.strategy}</div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ─── Slide 4: 2-3 Zone Defense（共用）─── */
export function S4() {
  return (
    <SlideLayout num={4} title="防守鐵則 ─ 2-3 區域聯防" sub="The 2-3 Zone Defense" icon="🛡️">
      <div className="two-col">
        <div>
          <Sec heading="📐 陣型總則" accent="#3b82f6">
            <Bullets items={['嚴禁人盯人，全員固守罰球線以內', '前排 2 人干擾外線，後排 3 人守護禁區', '核心目標：放投不放切']} />
          </Sec>
          <Sec heading="🔷 前排：Steve + Neil" accent="#60a5fa">
            <Bullets items={['站位在罰球線兩側', '主要任務：干擾持球者推進', '對手投三分不撲，對手切入立刻關門']} />
          </Sec>
        </div>
        <div>
          <Sec heading="🔶 後排：Kai + Ken + Tony" accent="#f97316">
            <Bullets items={[
              { text: 'Ken 站中間或底線', sub: ['以身材優勢頂住對方禁區，禁止接舒服位置球'] },
              { text: 'Kai 負責對位禁區大個', sub: ['不求蓋火鍋，只求繞前干擾，讓對方接不到舒服傳球'] },
              'Tony 守底角，不讓對手有底線切入空間',
            ]} />
          </Sec>
          <div className="callout">🚨 <strong>禁止</strong>：任何人被對手扯離區域位置</div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ─── Slide 5: SAFE Protocol（共用）─── */
export function S5() {
  return (
    <SlideLayout num={5} title="防守鐵則 ─ SAFE 退防機制（全場通用）" sub="The SAFE Protocol · Anti Fast-Break" icon="🔐">
      <div className="two-col">
        <div>
          <Sec heading="🔑 核心邏輯" accent="#a855f7">
            <Bullets items={['破解所有對手快攻的唯一解法', 'Steve 與 Neil 建立無聲默契，輪流駐守弧頂', '弧頂（三分線頂端）永遠要留一個人']} />
          </Sec>
          <Sec heading="📣 溝通指令" accent="#22c55e">
            <div className="cmd-box">
              <span className="cmd-who">Steve</span>
              <span className="cmd-say">「Neil 上去！我底角！」</span>
            </div>
            <p className="cmd-note">Steve 要跑底角時大聲喊出，Neil 立刻補上弧頂</p>
          </Sec>
        </div>
        <div>
          <Sec heading="⏱️ 出手瞬間的紀律" accent="#ef4444">
            <Bullets items={['站在弧頂的 SAFE 人員：絕對禁止衝搶進攻籃板', '球一離手，立刻轉身全速衝回防守半場三分線', '執行到位，任何對手的快攻威脅將直接歸零']} />
          </Sec>
          <div className="callout success">✅ <strong>SAFE 做好，比賽就贏了一半 — 不分對手</strong></div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ─── Slide 6: Fast Break（共用）─── */
export function S6() {
  return (
    <SlideLayout num={6} title="進攻戰術 A ─ 閃電三箭頭（全場通用）" sub="Triple Arrow Fast Break" icon="⚡">
      <div className="two-col">
        <div>
          <Sec heading="🎯 發動時機" accent="#22c55e">
            <Bullets items={['Ken、Tony 或 Kai 抓下防守籃板的瞬間', '敵方出手失誤被抄截時']} />
          </Sec>
          <Sec heading="📍 跑位路線" accent="#f97316">
            <Bullets items={['持球者不黏球，第一時間抬頭找前場', '三箭頭 (Steve、Neil、Kai) 瞬間呈傘狀散開', '三人各佔左中右三條路線全速衝前場']} />
          </Sec>
        </div>
        <div>
          <Sec heading="🚀 破抄截細節" accent="#3b82f6">
            <Bullets items={['接球者絕不原地等球', '必須主動上前迎球，閃過對方賭博抄截', '直接形成前場 3 打 2 或 3 打 1 優勢']} />
          </Sec>
          <div className="flow-chart">
            <div className="flow-step">抓板/抄截</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">長傳出球</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">三路散開</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step hi">多打少得分</div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ─── Slide 7: Corner Trap（共用）─── */
export function S7() {
  return (
    <SlideLayout num={7} title="進攻戰術 B ─ 底角陷阱與空間拉扯（全場通用）" sub="Corner Trap & Space Creation" icon="🪤">
      <div className="two-col">
        <div>
          <Sec heading="📐 陣型佈置" accent="#f97316">
            <Bullets items={['Steve 蹲守底角（三分線角落）', 'Tony 站對側 45 度或底線', '油漆區完全清空，讓 Kai 有突破空間']} />
          </Sec>
          <Sec heading="⚡ 戰術發動（擋拆錯位）" accent="#a855f7">
            <Bullets items={['Kai 在高位持球', 'Ken 上提設立掩護 (Pick & Roll)', '利用敵方換防時機，Kai 直接加速切入']} />
          </Sec>
        </div>
        <div>
          <Sec heading="🎯 終結選擇" accent="#22c55e">
            <div className="decision">
              <div className="dec-cond">敵方禁區大個出來補防？</div>
              <div className="dec-branch">
                <div className="branch">
                  <span className="btag yes">是</span>Kai 立刻分球給底角 Steve 或 Tony 投三分
                </div>
                <div className="branch">
                  <span className="btag no">否</span>Kai 直接中距離急停跳投或挑戰籃框
                </div>
              </div>
            </div>
          </Sec>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ─── Slide 8: Keys to Victory（依對位切換）─── */
export function S8({ m }: { m: MatchupData }) {
  return (
    <SlideLayout num={8} title="終極致勝密碼" sub={`Keys to Victory · ${m.fullName}`} icon="🏆">
      <div className="victory-grid">
        {m.victoryKeys.map((k, i) => (
          <div key={i} className="victory-card">
            <span className="vnum">{i + 1}</span>
            <div>
              <h3>{k.title}</h3>
              <p>{k.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="final-motto">
        <span>🔥</span>
        <span>{m.finalMotto}</span>
        <span>🔥</span>
      </div>
    </SlideLayout>
  );
}

/* ─── Slide 9: 對位特化戰術（依對位切換）─── */
export function S9({ m }: { m: MatchupData }) {
  return (
    <SlideLayout num={9} title={`對位特化戰術：${m.shortName}`} sub={`Specialized Plays · ${m.fullName}`} icon="🧠">
      <div className="play-grid">
        {m.extraPlays.map((p, i) => (
          <div key={i} className="play-card">
            <div className="play-head">
              <h3 className="play-name">{p.name}</h3>
              <span className="play-tag">{p.tag}</span>
            </div>
            <p className="play-goal"><strong>目的：</strong>{p.goal}</p>
            <ul className="play-how">
              {p.how.map((h, j) => <li key={j}>{h}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}

/* ─── Slide 10: 賽前 Briefing 卡（依對位切換）─── */
export function S10({ m }: { m: MatchupData }) {
  return (
    <SlideLayout num={10} title="賽前 5 分鐘 Briefing" sub={`Pre-Game Briefing · ${m.fullName}`} icon="📣">
      <div className="briefing-grid">
        <div className="briefing-card def">
          <div className="briefing-head"><span className="b-icon">🛡️</span>防守端</div>
          <ul>{m.briefingDefense.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div className="briefing-card off">
          <div className="briefing-head"><span className="b-icon">⚔️</span>進攻端</div>
          <ul>{m.briefingOffense.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
      </div>
      <div className="mentality">
        <span className="mentality-label">🔥 Mentality</span>
        <p>{m.briefingMentality}</p>
      </div>
    </SlideLayout>
  );
}
