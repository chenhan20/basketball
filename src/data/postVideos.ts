export interface PostVideo {
  id: string;
  title: string;
  titleZh: string;
  channel: string;
  youtubeId: string;
  searchQuery: string;
  category: 'passer' | 'center' | 'shooter' | 'team' | 'drill';
  badge: string;
  summary: string;
  keyPoints: string[];
  proTip: string;
  commonMistakes: string[];
}

export const POST_VIDEOS: PostVideo[] = [
  // ── 1. 傳球者技巧 (Passer Skills) ─────────────────────────────────────────
  {
    id: 'sportsedtv-entry-pass',
    title: 'How To Identify, Throw & Receive The Best Guard To Post Entry Pass',
    titleZh: '後衛如何傳出最致命的低位餵球 · 角度與時機解析',
    channel: 'SportsEdTV Basketball Training',
    youtubeId: 'ISsNHo6Y_9M',
    searchQuery: 'guard to post entry pass basketball SportsEdTV',
    category: 'passer',
    badge: '傳球角度與手法',
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
    id: 'dicks-post-entry',
    title: 'Basketball Passing: Low Post Entry Fundamentals',
    titleZh: '低位傳球基礎教學 · 擊地、過頭與時機全解析',
    channel: "DICK'S Sporting Goods",
    youtubeId: 'AwxAU9E0LpI',
    searchQuery: "low post entry pass Dick's Sporting Goods basketball",
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

  // ── 2. 中鋒卡位要球 (Center Sealing & Footwork) ───────────────────────────
  {
    id: 'shot-science-seal-post',
    title: 'Sealing in the Post (Like Shaq and Yao Ming)',
    titleZh: '低位卡位封鎖教學 · 像俠客與姚明一樣把防守者卡在身後',
    channel: 'Shot Science Basketball',
    youtubeId: 't2dJ6EpQIgk',
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
    id: 'breakthrough-sealing-duckin',
    title: 'Sealing & Ducking In: Teaching Post Players to Score vs 3/4 Denial',
    titleZh: '破解 3/4 繞前阻絕防守 · 低位卡位與 Duck-In 突刺要球',
    channel: 'Breakthrough Basketball',
    youtubeId: 'Fahvj8bW9Yo',
    searchQuery: 'Sealing Ducking In Post Players Breakthrough Basketball',
    category: 'center',
    badge: '破解阻絕防守',
    summary: '針對防守者採取 3/4 前阻絕 (Three-Quarter Front) 時的實戰破法：中鋒如何抓住傳球轉移瞬間進行 Duck-In 突刺，將防守者壓在背後。',
    keyPoints: [
      '抓住傳球時機：當球從弧頂轉移到翼側的飛行途中，正是防守者重心調整的盲點。',
      'Duck-In 步伐：內側腳迅速跨入禁區，用臀部與背部將防守者頂在身後。',
      '極致高目標手：單手高舉過頭頂，讓後衛有清晰安全的空中高吊路線。',
    ],
    proTip: '防守者越想繞前，背後的空檔就越大。後衛一個假動作就能讓吊球得分變得像上籃一樣簡單。',
    commonMistakes: [
      '在中鋒還沒 Duck-In 站穩前就傳球，導致掉球失誤。',
      '中鋒要球時兩隻手都在推人，裁判會直接吹進攻犯規。',
    ],
  },
  {
    id: 'hakeem-legends-training',
    title: 'Hakeem Olajuwon ULTIMATE Post Moves Session with Kobe & LeBron',
    titleZh: '大夢歐拉朱萬親授：低位腳步、深蹲卡位與 Kobe/LeBron 傳奇訓練',
    channel: 'NBA Legends Clinic',
    youtubeId: 'vtm7VizPQXU',
    searchQuery: 'Hakeem Olajuwon Kobe Bryant LeBron James post workout',
    category: 'center',
    badge: '殿堂級卡位',
    summary: 'NBA 史上低位技術第一人 Hakeem Olajuwon 親自指導 Kobe Bryant 與 LeBron James：如何接球前卡位、以左右腳為軸心閱讀防守並轉身終結。',
    keyPoints: [
      '接球前：重心放得比防守者更低，才能在起跳或轉身時佔據絕對主動。',
      '接球時：雙手如鉗子般抓住球，球不放下巴下方，雙肘向外撐開保護圓柱體。',
      '接球後：Drop Step 背轉身與 Up-and-Under 假動作配合，讓撲搶的防守者自食其果。',
    ],
    proTip: '「重心越低的人，在低位就擁有越大的話語權。」低位就是地盤爭奪戰。',
    commonMistakes: [
      '接到球就急著轉身，沒有先感受防守者身體施力的方向。',
      '在禁區內把球放低到膝蓋以下，被外圍小後衛伸手切掉。',
    ],
  },
  {
    id: 'hakeem-demonstrating-footwork',
    title: 'Hakeem Olajuwon Demonstrating Low Post Moves - Amazing Footwork',
    titleZh: '大夢奧拉朱萬低位腳步示範 · 軸心腳轉移與護球空間',
    channel: 'Basketball Legends',
    youtubeId: 'rpcu33pqvXQ',
    searchQuery: 'Hakeem Olajuwon Demonstrating Low Post Moves Footwork',
    category: 'center',
    badge: '夢幻腳步拆解',
    summary: '細緻展現低位背框接到球之後的 Drop Step（底線背轉身）、晃肩虛晃與反向上籃的連續技巧。',
    keyPoints: [
      '非軸心腳的探步與擺動幅度和速度，決定了防守者是否會吃假動作。',
      '肩膀晃動必須連同眼神一併做出投籃假象。',
      '背轉身時軀幹要貼近防守者轉動，越緊貼越不易被斷球。',
    ],
    proTip: '低位單打不是硬撞，而是槓桿與反作用力的物理藝術。',
    commonMistakes: [
      '轉身時兩腳同時起跳，被吹走步。',
      '出手時沒有鎖住手腕，弧度平直容易打鐵。',
    ],
  },

  // ── 3. 173cm 射手無球走位 (Shooter & Off-Ball) ────────────────────────────
  {
    id: 'curry-art-of-offball',
    title: 'Stephen Curry’s ART of Off Ball Movement — 6 Ways',
    titleZh: 'Stephen Curry 無球跑位藝術 · 6 大擺脫防守神技',
    channel: 'By Any Means Basketball',
    youtubeId: 'wgiFZ8H5440',
    searchQuery: 'Stephen Curry art of off ball movement By Any Means',
    category: 'shooter',
    badge: '173cm 必修跑位',
    summary: '深層剖析身材偏矮後衛如何靠「變速急停」、「幽靈掩護 (Ghost Screen)」、「後仰退回 (Fade Cut)」在三分線外撕開防守獲取大空檔。',
    keyPoints: [
      '用減速 (Deceleration) 取勝：全速衝刺突然急停踩剎車，防守者會因慣性衝過頭 1-2 公尺。',
      '摩擦掩護隊友 (Shoulder-to-Shoulder)：切入時肩膀緊貼掩護者，不留絲毫夾縫給追防者。',
      '幽靈掩護 (Ghost Screen)：假裝要過去擋拆，在碰觸前瞬間彈出三分線外，讓換防陷入混亂。',
      '永不停歇的再定位 (Relocation)：只要隊友切入或低位持球，射手就必須移動到傳球視線對角。',
    ],
    proTip: '「防守者不怕你跑得快，最怕你忽快忽慢！」173cm 射手最頂級的武器是急停剎車節奏。',
    commonMistakes: [
      '等球到了手才想著怎麼投，沒有在無球跑動中就完成出手瞄準。',
      '與掩護者距離太寬，讓追防者輕鬆擠過。',
    ],
  },
  {
    id: 'move-like-steph',
    title: 'Breakdown Series: Move Like Steph (Reading Screens & Pace)',
    titleZh: '像柯瑞一樣跑位 · 掩護閱讀與變速節奏掌控',
    channel: 'Hooper University',
    youtubeId: 'jPypNxhH-YU',
    searchQuery: 'Move Like Steph Hooper University off ball breakdown',
    category: 'shooter',
    badge: '掩護閱讀樹',
    summary: '教導射手在接近掩護牆時，如何閱讀防守者追防 (Trail) 或繞過 (Under)，並果斷做出 Curl 捲切或 Flare 外彈投籃。',
    keyPoints: [
      '追防者在身後緊追 (Trail)：走 Curl 弧形捲切切入中距離或籃下上籃。',
      '防守者抄捷徑繞前 (Under)：立刻停在掩護背後拔起投三分。',
      '防守者擠在掩護上方 (Top-Lock)：果斷走 Backdoor 後門直插籃下。',
    ],
    proTip: '在跑向掩護時，眼睛要看防守者的前胸與雙腳，而不是看球！',
    commonMistakes: [
      '在掩護還沒到位前就起跑，導致隊友被吹非法掩護犯規。',
    ],
  },
  {
    id: 'shot-science-the-hop',
    title: '"The Hop" (Quickest Shooting Footwork) // Make More Threes!',
    titleZh: 'The Hop 跳步接球投籃 · 0.4 秒極致出手的秘密',
    channel: 'Shot Science Basketball',
    youtubeId: 'QlrGrvIuOL8',
    searchQuery: 'The Hop quickest shooting footwork Shot Science Basketball',
    category: 'shooter',
    badge: '極速投籃腳步',
    summary: '針對身高不佔優勢的射手，Hop Catch（雙腳同步微起跳著地）能省去左右腳先後落地的延遲，在空中完成轉體，落地即起跳。',
    keyPoints: [
      '空中預備 (Catch in the Air)：在接球瞬間整個人已經完成空中面框。',
      '雙腳平穩落點：落地同時下肢吸震壓縮，儲存起跳彈力，做到零停頓出手。',
      '縮短出手時間 0.2~0.4 秒：對 173cm 球員來說，這 0.3 秒就是干擾與空檔的天壤之別。',
    ],
    proTip: '跳步著地時膝蓋微微內夾蓄力，千萬不要踏成大八字步分散了垂直彈跳力。',
    commonMistakes: [
      '跳得太高：Hop 只是離地 2-3 公分的小微跳，跳太高反而破壞投籃重心。',
    ],
  },
  {
    id: 'shot-science-turn-feet',
    title: 'How ELITE Shooters Turn Their Feet (Sweep & Sway)',
    titleZh: '菁英射手雙腳朝向與側角校準 · 10點鐘傾斜角 (Sweep & Sway)',
    channel: 'Shot Science Basketball',
    youtubeId: '-W7eAnNwOSo',
    searchQuery: 'How ELITE Shooters Turn Their Feet Sweep Sway Shot Science',
    category: 'shooter',
    badge: '投籃力學優化',
    summary: '揭露現代頂尖三分射手不再要求十趾正對籃框，而是將雙腳微偏向 10 點鐘方向，讓投籃手肩膀與手肘自然對齊籃框中心。',
    keyPoints: [
      '10 點鐘轉體：右手投籃者腳尖朝向 10-11 點方向，放鬆右肩三角肌張力。',
      'Sweep & Sway（掃腿與後仰）：起跳後雙腳自然向前飄 15-30 公分，上半身自然微後傾，創造極致弧度。',
      '放鬆肩部與胸肌：不需要硬把手肘夾到正中，避免出手僵硬。',
    ],
    proTip: '45 度角是 Sweep & Sway 最自然的發射點，因為視線邊界與籃板角度最契合投射軌跡。',
    commonMistakes: [
      '落地位置比出手位置更靠後（過度後仰破壞力量傳導）。',
    ],
  },

  // ── 4. 5v5 團隊戰術體系 (5v5 Team Offense) ────────────────────────────────
  {
    id: 'film-room-warriors-split',
    title: "Why the Warriors' Split Action Is Impossible to Guard",
    titleZh: '為什麼勇士隊的低位剪刀戰術 (Split Action) 根本防不住',
    channel: 'The Film Room',
    youtubeId: 'N6kWYgpBHt4',
    searchQuery: 'Why the Warriors Split Action Is Impossible to Guard Film Room',
    category: 'team',
    badge: '5v5 戰術核武',
    summary: '深度解析勇士隊傳球給低位或肘區中鋒後，外圍兩名射手交叉掩護 (Split Cut)，逼迫對手在 0.5 秒內做出不可能完美協防的二選一難題。',
    keyPoints: [
      '傳球後掩護 (Pass & Screen Away)：後衛傳完球絕不看球，直接替隊友下掩護。',
      '雙向撕裂：射手利用掩護彈出三分（Pop），掩護者順勢內切籃下（Slip）。',
      '低位策應手 (Hub)：低位球員必須具備單手精準分球與高視野觀察力。',
    ],
    proTip: '「只要外圍有高命中率射手，低位中鋒的傳球威力將被放大五倍！」',
    commonMistakes: [
      '低位球員拿到球就埋頭單打，完全無視外圍正在空切跑位的射手。',
    ],
  },
  {
    id: 'bballbreakdown-warriors-split',
    title: 'Warriors Split Action: Plays We Love',
    titleZh: '勇士 Split Action 實戰戰術剪輯與防守破綻點評',
    channel: 'BBallBreakdown',
    youtubeId: '6FRikiZXK5U',
    searchQuery: 'Warriors Split Action Plays We Love BBallBreakdown',
    category: 'team',
    badge: 'NBA 戰術教室',
    summary: 'Coach Nick 親自劃線點評：柯瑞與格林如何將低位分球玩到極致，射手如何利用換防不及空切扣籃，或後彈命中致命三分。',
    keyPoints: [
      '閱讀換防遲疑：當防守者溝通出現 0.3 秒空檔時，直接吊球給切入者。',
      '弱側底角拉開：弱側射手必須維持底角三分站位，牽制對手弱側協防球員。',
    ],
    proTip: 'Split Action 是專門為 173cm 靈活射手量身打造的致命戰術，身材小反而切入更快。',
    commonMistakes: [
      '掩護角度設得太斜，讓防守者能直接抄捷徑攔截傳球路線。',
    ],
  },
  {
    id: 'hooper-warriors-split',
    title: 'Split Action | Golden State Warriors',
    titleZh: '金州勇士低位 Split 戰術基礎結構與原則',
    channel: 'Hooper University',
    youtubeId: '1xknCTmjKOg',
    searchQuery: 'Split Action Golden State Warriors Hooper University',
    category: 'team',
    badge: '體系架構解析',
    summary: '梳理 5v5 中鋒拿球後的「傳球者設掩護 (Pass & Screen Away)」基本幾何原理與外圍空檔創造機制。',
    keyPoints: [
      '三角站位與空間拉扯。',
      '低位持球者的護球高度（Chin the ball）。',
      '後衛外彈投籃的腳步調整。',
    ],
    proTip: '戰術成功的關鍵不是中鋒的單打能力，而是全隊 5 個人的空間紀律。',
    commonMistakes: [
      '外圍球員傳球後站著不動，壓縮了低位單打的進攻空間。',
    ],
  },

  // ── 5. 實戰特訓課表 (Drills & Practice) ───────────────────────────────────
  {
    id: 'attackbball-post-drills',
    title: 'Post Entry Pass Basketball Drills & Footwork',
    titleZh: '後衛與中鋒實戰餵球訓練法 · 實境對抗練習',
    channel: 'ATTACKBball Basketball Training',
    youtubeId: 'WXK5JP6G11o',
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
    youtubeId: 'ERjttVlnlTY',
    searchQuery: '2 ball post entry drills basketball ATTACKBball',
    category: 'drill',
    badge: '進階雙球特訓',
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
    id: 'pure-sweat-post-drills',
    title: '4 Drills for Finishing, Sealing & Post Footwork',
    titleZh: 'NBA 頂級訓練師 Drew Hanlen：4 套低位卡位與禁區終結訓練',
    channel: 'Pure Sweat Basketball',
    youtubeId: 'Q8iX120y7gM',
    searchQuery: 'Drew Hanlen 4 Drills for Finishing Sealing Post Footwork Pure Sweat',
    category: 'drill',
    badge: 'NBA 訓練師菜單',
    summary: '知名 NBA 個人技術教練 Drew Hanlen 親授：4 組針對低位抗干擾卡位、對抗接球與禁區多角度挑籃的系統化課表。',
    keyPoints: [
      '對抗接觸後的穩定著地 (Absorb Contact)。',
      '手腕最後彈擊力量與拋物線高度。',
      'Drop Step 時利用膝蓋內扣卡住防守者退路。',
    ],
    proTip: '「在禁區裡不要躲對抗，要主動製造對抗建立你的圓柱體。」',
    commonMistakes: [
      '害怕被封蓋而身體後仰，導致失去平衡與命中率。',
    ],
  },
  {
    id: 'byron-scott-pindown',
    title: 'Byron Scott Dr. Dish Shooting Drill: Pin Down Progression',
    titleZh: '前湖人教練 Byron Scott：Pin-Down 下掩護投籃進階訓練',
    channel: 'Dr. Dish Basketball',
    youtubeId: 'NGhoSLdyV0U',
    searchQuery: 'Byron Scott Dr Dish Shooting Drill Pin Down Progression',
    category: 'drill',
    badge: 'Pin-Down 特訓',
    summary: '前 NBA 得分後衛與主教練 Byron Scott 示範：射手繞過 Pin-down 掩護後的三種致命終結（接球即拔、一運拔投、拋投跳投）。',
    keyPoints: [
      '切出角度由深變淺，確保接球時身體自然面框。',
      '第一步踩在掩護者外側腳尖前，徹底截斷追防路線。',
      '每次練習至少完成 50 顆高品質進球。',
    ],
    proTip: '練習時務必維持全速切出，模擬比賽第四節的真實體力負荷。',
    commonMistakes: [
      '切出路徑過平，沒有足夠的離框距離調整投籃節奏。',
    ],
  },
  {
    id: 'tony-miller-pindown-game',
    title: 'Game Action Pin-Down: Tight Curl & Screen The Screener',
    titleZh: '實戰下掩護演練：緊密捲切與連續掩護投籃',
    channel: 'Coach Tony Miller Basketball',
    youtubeId: '5Vz7dLjCEYU',
    searchQuery: 'Game Action Pin Down Tight Curl Screen The Screener Coach Tony Miller',
    category: 'drill',
    badge: '實戰連續掩護',
    summary: '團隊戰術演練：當射手透過 Pin-down 出來被對手緊貼追防時，如何做出緊密捲切 (Tight Curl) 吸引防守，並立刻觸發連續掩護。',
    keyPoints: [
      'Tight Curl 路線如同圓規劃圓，切入禁區肘區取分。',
      'Screen the Screener：射手捲切後立刻為第二名射手作反掩護，雙重打擊。',
    ],
    proTip: '永遠不要只有一套劇本，連續掩護能讓任何區域聯防或人盯人徹底崩潰。',
    commonMistakes: [
      '捲切角度太寬，給了防守者由內側抄截的機會。',
    ],
  },
];
