export interface PostVideo {
  id: string;
  title: string;
  titleZh: string;
  channel: string;
  youtubeId?: string;
  searchQuery: string;
  category: 'passer' | 'center' | 'team' | 'drill';
  badge: string;
  summary: string;
  keyPoints: string[];
  proTip: string;
  commonMistakes: string[];
}

export const POST_VIDEOS: PostVideo[] = [
  {
    id: 'sportsedtv-entry-pass',
    title: 'How To Identify, Throw & Receive The Best Guard To Post Entry Pass',
    titleZh: '後衛如何傳出最致命的低位餵球 · 角度與時機解析',
    channel: 'SportsEdTV Basketball Training',
    youtubeId: '3-C12v-g5pI',
    searchQuery: 'guard to post entry pass basketball tutorial SportsEdTV',
    category: 'passer',
    badge: '傳球手法精通',
    summary: '詳細拆解側翼後衛如何閱讀防守者手部位置，利用高假動作創造擊地傳球空間，並精準瞄準中鋒遠離防守者的目標手。',
    keyPoints: [
      '閱讀防守者的手：防守手舉高時擊地傳，防守手下放時過頭傳 (Fake High, Pass Low)。',
      '擊地點黃金法則：落在距離中鋒 2/3 處，彈起高度剛好在腰部到胸口。',
      'Pass Away From Defender：傳球絕不傳到中鋒身體正中，永遠傳給伸出的遠離端目標手。',
      '改善角度：利用 1-2 次運球往底線或翼側延伸線移動，拉出傳球直線。',
    ],
    proTip: '「永遠不要在原地硬塞！」如果防守者封死路線，先運一步或回傳弧頂重新調整角度。',
    commonMistakes: [
      '在弧頂 (Top of the Key) 直接向低位傳球（最容易被前阻絕抄截）。',
      '沒有做傳球假動作就出手，導致防守者直接干擾傳球路線。',
    ],
  },
  {
    id: 'shot-science-seal-post',
    title: 'Sealing in the Post (Like Shaq and Yao Ming)',
    titleZh: '低位卡位封鎖教學 · 像俠客與姚明一樣把防守者卡在身後',
    channel: 'Shot Science Basketball',
    youtubeId: 'XhBiA1rHbG4',
    searchQuery: 'how to seal defender in the post basketball Shot Science',
    category: 'center',
    badge: '中鋒卡位必修',
    summary: '傳授低位球員如何運用身體核心與腿部力量卡位，打造堅不可摧的「前臂牆」，並在不犯規的前提下死死鎖住防守者。',
    keyPoints: [
      'Do Your Work Early：在球還在空中轉移時就先卡位，不要等球到了側翼才開始推擠。',
      '寬底盤深蹲 (Wide Base)：雙腳比肩寬，重心放低，用大腿後側與臀部感受防守者。',
      '鎖死前腳 (Pin The Top Foot)：踩在對手前腳外側，切斷對手繞前路線。',
      '前臂牆 (Forearm Wall)：手肘彎曲 90 度貼於體側，絕不推人，利用槓桿抵擋反推。',
    ],
    proTip: '「不是用手去推人，而是用臀部與大腿佔領空間！」手推人是進攻犯規，下盤卡位是合法掩護。',
    commonMistakes: [
      '站得太挺、重心過高，對手只要稍微發力就能輕易繞前。',
      '手部過度推擠防守者胸口，吃到進攻犯規。',
    ],
  },
  {
    id: 'dicks-post-entry',
    title: 'Basketball Passing: Low Post Entry Fundamentals',
    titleZh: '低位傳球基礎：擊地、過頭與時機全解析',
    channel: "DICK'S Sporting Goods",
    youtubeId: 'Xh0mF3xZ8pA',
    searchQuery: 'low post entry pass Dick\'s Sporting Goods basketball',
    category: 'passer',
    badge: '經典基本功',
    summary: '全美知名教練深入淺出示範：從側翼發動的低位傳球手法，特別強調接球者的 Target Hand 與傳球後的戰術性移動。',
    keyPoints: [
      '胸前 vs 擊地 vs 過頭傳球的實戰場景嚴格區分。',
      '傳球時腳步向前跨出一步，增加傳球穿透力與穩定性。',
      '傳完球立即移動：絕不站在原地看中鋒單打，避免為對手創造協防機會。',
    ],
    proTip: '「球到了中鋒手中，外圍射手的工作才剛剛開始！」拉開到底角或切入，牽制防守。',
    commonMistakes: [
      '用軟弱的單手拋傳，球速過慢給防守者足夠的攔截反應時間。',
      '無視中鋒的目標手，直接將球丟在防守者容易破壞的區域。',
    ],
  },
  {
    id: 'attackbball-post-drills',
    title: 'Post Entry Pass Basketball Drills & Footwork',
    titleZh: '後衛與中鋒實戰餵球訓練法 · 實境對抗練習',
    channel: 'ATTACKBball Basketball Training',
    youtubeId: '1d_V_4eG83E',
    searchQuery: 'basketball post entry drill ATTACKBball',
    category: 'drill',
    badge: '實戰特訓菜單',
    summary: '提供高強度的傳接球訓練 Drill，包含椅子模擬阻絕、雙人前阻絕應變訓練，以及傳球後空切走位訓練。',
    keyPoints: [
      '雙人椅子卡位訓練：利用折疊椅作為防守障礙物，練習腳步繞過與目標手固定。',
      '限時 3 秒餵球特訓：強迫傳球者在 3 秒內完成「運球調角度 -> 假動作 -> 餵球」。',
      '強烈對抗下 Chin the Ball：接球瞬間要求立刻收球於下巴，頂住防守者下壓干擾。',
    ],
    proTip: '訓練時陪練者要拿防守墊 (Padded Pad) 撞擊中鋒，建立對抗下的護球肌肉記憶。',
    commonMistakes: [
      '練習時沒有防守壓力，比賽中一遇到高強度對抗就掉球。',
      '傳球者習慣停球後死球，無法再運球調整角度。',
    ],
  },
  {
    id: 'attackbball-2ball-drills',
    title: '2 Ball Post Entry Passing & Ball Control Drills',
    titleZh: '雙球低位傳球與控球特訓 · 鍛鍊雙手傳球敏銳度',
    channel: 'ATTACKBball Basketball Training',
    youtubeId: 'k-V3lP9Lz6A',
    searchQuery: '2 ball post entry drills basketball ATTACKBball',
    category: 'drill',
    badge: '進階控球',
    summary: '利用雙球訓練培養後衛在極限空間內的視野開闊度、弱側手餵球精準度，以及在防守壓迫下的冷靜判斷力。',
    keyPoints: [
      '左右手無差別擊地傳球能力，防止防守者刻意封死強側手。',
      '一邊運球一邊觀察低位卡位狀態，培養「球不落地、眼觀八方」的直覺。',
      '提高核心穩定性與傳球手腕瞬間發力點。',
    ],
    proTip: '如果比賽中只能用右手餵球，防守者只要站位偏右就能完全封死你的傳球體系。',
    commonMistakes: [
      '習慣雙手抱球再傳，喪失快速傳球的瞬間窗口。',
    ],
  },
  {
    id: 'hakeem-post-clinic',
    title: 'Hakeem Olajuwon Demonstrating Low Post Footwork & Sealing',
    titleZh: '大夢歐拉朱萬親授：低位腳步、深蹲卡位與夢幻假動作',
    channel: 'Thinking Basketball / NBA Legends',
    youtubeId: 'XhBiA1rHbG4',
    searchQuery: 'Hakeem Olajuwon teaches post moves basketball footwork',
    category: 'center',
    badge: '殿堂級教學',
    summary: 'NBA 史上低位技術第一人 Hakeem Olajuwon 親自示範：如何接球前卡好有利身位、接球後以左右腳為軸心閱讀防守重心，並完成不可阻擋的得分。',
    keyPoints: [
      '接球前：重心放得比防守者更低，才能在起跳或轉身時佔據主動。',
      '接球時：雙手如鉗子般抓住球，球不放下巴下方，雙肘向外撐開保護空間。',
      '接球後：Drop Step 背轉身與 Up-and-Under 假動作配合，讓過度上撲的防守者自食其果。',
    ],
    proTip: '「重心越低的人，在低位就擁有越大的話語權。」低位就是地盤爭奪戰。',
    commonMistakes: [
      '接到球就急著轉身，沒有先感受防守者身體施力的方向。',
      '在禁區內把球放低到膝蓋以下，被外圍小後衛伸手切掉。',
    ],
  },
  {
    id: 'warriors-split-action',
    title: 'Warriors Post Split Action & Off-Ball Cuts Breakdown',
    titleZh: '5v5 實戰戰術：金州勇士低位 Split Cut 剪刀走位深度解析',
    channel: 'BBallBreakdown Tactical Film Room',
    youtubeId: '3-C12v-g5pI',
    searchQuery: 'Warriors post split action breakdown BBallBreakdown',
    category: 'team',
    badge: '5v5 戰術體系',
    summary: '解析柯瑞 (Stephen Curry) 與格林 (Draymond Green) 如何利用低位分球作為戰術發動機，透過交叉空切與下掩護徹底瓦解對手防守輪轉。',
    keyPoints: [
      '低位發動機：中鋒接球後不要盲目單打，而是作為高視野傳球樞紐 (Hub)。',
      '剪刀交叉掩護 (Split Action)：傳球者為弧頂射手掩護，迫使防守者決定換防或追防。',
      'Pop vs Slip：射手彈出三分線投射，掩護者趁換防不及直接空切籃下輕鬆上籃。',
      '弱側空間紀律：弱側兩人拉開至三分底角與側翼，牽制協防球員。',
    ],
    proTip: '「當低位球員擁有傳球威脅時，防守者會陷入進退失據的巨大恐慌。」',
    commonMistakes: [
      '低位球員一拿球就低頭死命往裡撞，看不見外圍空檔的射手。',
      '外圍球員傳完球就站在原地，導致整個進攻空間停滯堵塞。',
    ],
  },
];
