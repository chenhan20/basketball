import { useState } from 'react';

export default function PostMechanicsGuide() {
  const [activeRole, setActiveRole] = useState<'passer' | 'center'>('passer');
  const [selectedTopic, setSelectedTopic] = useState<number>(0);

  const passerTopics = [
    {
      id: 'angle',
      badge: '傳球角度',
      title: '改善角度：運球拉開傳球直線 (Dribble to Improve Angle)',
      en: 'wing to post entry pass / improving passing angle',
      summary: '從弧頂直接塞入低位是所有失誤中代價最高的一種！必須建立側翼 45 度或延伸線的直接傳球通道。',
      doText: '接球後觀察防守，向邊線或底線運 1-2 步，拉開傳球者、防守者與中鋒之間的阻絕角度。',
      dontText: '在弧頂 (Top of Key) 或停球死球狀態下，試圖跨越防守者長臂硬塞低位。',
      mechanics: [
        '弧頂到低位的角度過平，防守中鋒只要跨出半步即可完成前阻絕抄截。',
        '向底線運一步 (Dribble down)，防守中鋒如果跟著往下退，高位空間打開；如果防守者留在高位，底線直線打穿。',
        '保持「三威脅」或活球狀態，絕不提早收球成為死球。',
      ],
      quote: '「傳球角度比傳球力道重要 100 倍。角度對了，傳球就像穿針引線一樣輕鬆。」',
    },
    {
      id: 'bounce',
      badge: '擊地手法',
      title: '擊地 2/3 黃金法則：防守長臂唯一破口 (2/3 Bounce Pass)',
      en: 'low post entry pass / bounce pass mechanics',
      summary: '擊地傳球是低位餵球最穩健的手法。防守者雙手通常舉在高處，下盤地面就是唯一無法被快速干擾的綠色通道。',
      doText: '擊地點選在距離中鋒 2/3 處（離傳球者較遠、離中鋒較近），球反彈時剛好落在中鋒腰腹至胸口位置。',
      dontText: '把球重重砸在兩人正中央 1/2 處，導致球彈起過高或速度減緩，被防守者伸手拍掉。',
      mechanics: [
        '單手推傳 (One-hand push bounce pass) 或雙手胸前擊地，跨出前腳帶動重心向前穿透。',
        '球體帶有一點由下往上的正向旋轉，落地後快速彈入中鋒手中。',
        '防守者重心偏高時，擊地傳球的到達速度遠高於防守者的彎腰反應速度。',
      ],
      quote: '「防守者的手再長，他的膝蓋以下也防不住一把貼地的刀。」',
    },
    {
      id: 'target',
      badge: '目標手原則',
      title: '遠離防守者原則：傳向目標手 (Pass Away From Defender)',
      en: 'pass away from defender / post player target hand',
      summary: '不要把球傳到中鋒的肚臍或防守者那側！永遠將球送至中鋒伸出的「目標手」(Target Hand)。',
      doText: '觀察中鋒出示的右手或左手。防守在上方，傳底線手；防守在下方，傳高位手。',
      dontText: '看著中鋒胸口直接傳球，球剛好送進防守者的防守半徑內被拍掉。',
      mechanics: [
        '傳球前先確認中鋒的「目標手 (Target Hand)」是否張開五指確立接球點。',
        '將傳球想像成傳到一堵牆的另一側：中鋒的身體是保護牆，球必須留在牆的內側。',
        '傳球速度要迅速果決 (Crisp & Sharp)，避免球在空中漂浮太久。',
      ],
      quote: '「傳球是送禮物給隊友，不是給防守者抽獎的機會。」',
    },
    {
      id: 'fake',
      badge: '假動作心法',
      title: 'Fake a Pass to Make a Pass：先高後低假動作',
      en: 'fake high pass low / feeding the post basketball',
      summary: '防守者會預判你的傳球。先用逼真的過頭假傳吸引防守者手向上舉，再貼地送出擊地傳球。',
      doText: '用眼神與雙手高舉做出一記有說服力的過頭假動作 (Overhead Fake)，迫使防守者挺直身體舉手。',
      dontText: '眼神死盯著低位中鋒一動不動 (Telegraphing the pass)，讓外圍防守者與協防者全體就位攔截。',
      mechanics: [
        '雙手過頭假動作 -> 防守者重心上提並舉高手臂干擾。',
        '趁防守者雙腳稍微離地或重心上升瞬間，迅速屈膝壓低重心，將球從防守者腋下或側邊送出。',
        '「假動作一定要逼真」：球至少要抬到額頭以上，雙眼看向假動作方向。',
      ],
      quote: '「高假拉高防守，低擊穿透防線。這就是後衛與側翼的最高藝術。」',
    },
    {
      id: 'relocate',
      badge: '傳球後跑位',
      title: '傳球後禁忌：絕不站在原地！(Relocate to Space)',
      en: 'action after post entry / post feed spacing',
      summary: '把球餵入低位後，傳球者的工作才剛開始！原地停留只會把自己的防守者帶去夾擊中鋒。',
      doText: '傳完球後迅速 Relocate 到零度角底線、或向弧頂退防拉開空間、或發動 Split 剪刀掩護。',
      dontText: '傳球後在 45 度三分線上叉腰看著中鋒單打，讓對手輕鬆形成二人包夾。',
      mechanics: [
        'Relocate 到 Corner（底角）：牽制對手防守者，如果防守者去包夾中鋒，底角立即獲得大空檔三分。',
        'Post Cut（向籃下空切）：趁中鋒吸引防守注意時，空切穿越禁區帶走防守注意力。',
        'Screen Away（下掩護）：為弧頂控衛做掩護，創造射手空檔或中鋒分球路線。',
      ],
      quote: '「球給低位，外線就要動！動起來的進攻，防守者一秒都無法安心。」',
    },
  ];

  const centerTopics = [
    {
      id: 'seal-early',
      badge: '提早卡位',
      title: '提早卡位原則：球在空中就要卡好位置 (Do Your Work Early)',
      en: 'how to seal defender in the post / do work early',
      summary: '低位單打的成功，80% 決定於接球前的那一秒！等球傳到側翼才開始卡位，防守者早已站穩陣腳。',
      doText: '球從弱側轉移到弧頂時，中鋒就已經在禁區外側深蹲卡好身位，等球到側翼時直接要球。',
      dontText: '散步進入低位，等側翼隊友拿球後才開始用蠻力推擠防守者，造成推人進攻犯規。',
      mechanics: [
        '在球轉移的飛行時間中移動：此時防守者的注意力往往在球上，最容易搶下內線優勢身位。',
        '卡位點選擇：低位近籃框 2-3 步處 (Low Block)，既有進攻射程，又不會太貼近底線被包夾。',
        '建立強烈的接球企圖心：讓隊友看到你已經將對手擋在身後，給傳球者十足信心。',
      ],
      quote: '「偉大的中鋒在球還沒到手前就已經得分了，接球只是把球放進籃框而已。」',
    },
    {
      id: 'wide-base',
      badge: '下盤底盤',
      title: '寬底盤深蹲 × 鎖住前腳 (Wide Base & Pin Top Foot)',
      en: 'basketball post player seal defender / locking the foot',
      summary: '卡位不是靠上半身推，而是靠強大的下盤地基！雙腳比肩寬，踩住防守者前腳，徹底封死對手繞前路線。',
      doText: '雙腳比肩膀略寬，深蹲將臀部向後坐，將自己的一隻腳踩在對手前腳的外側，大腿發力死死鎖住對手。',
      dontText: '雙腳站直直的、雙膝併攏，重心過高被對手輕輕一頂就失去平衡。',
      mechanics: [
        '底盤深蹲越低，對手的移動空間就越小。你的臀部就是最好的防守阻擋板。',
        '「踩住對手的前腳 (Pin the Foot)」：對手想從高側繞前，就用前腳和臀部鎖住高側；想從底線繞前，就鎖住底線。',
        '重心壓在雙腳掌中央，隨時感受防守者背後施力的方向（向左偏、向右偏、或向後撤）。',
      ],
      quote: '「誰的下盤更低、底盤更寬，誰就能統治禁區的每一寸木地板。」',
    },
    {
      id: 'forearm-wall',
      badge: '合法前臂牆',
      title: '90 度前臂牆：感受重心絕不推人 (The Forearm Wall)',
      en: 'forearm wall mechanics / legal arm bar seal',
      summary: '用手推人是進攻犯規！職業中鋒用「前臂牆」作為探測雷達與槓桿支撐，合法且無可撼動。',
      doText: '手臂彎曲呈 90 度 L 型貼於體側，以前臂外側與對手胸膛保持接觸，感受其重心流向。',
      dontText: '手臂伸直向外猛推對手胸口或頸部，被裁判吹進攻推人犯規 (Offensive Foul)。',
      mechanics: [
        '前臂維持彎曲，不主動發力推，而是作為堅硬的「吸收衝擊牆」。',
        '當對手試圖往前擠壓時，利用前臂與臀部同時向外下壓，形成槓桿效應鎖死對手。',
        '另一隻手臂完全釋放，高高伸出作為目標手。',
      ],
      quote: '「手肘彎曲是藝術，手臂伸直是犯規。頂尖中鋒永遠懂得分寸在哪裡。」',
    },
    {
      id: 'target-hand',
      badge: '巨大目標手',
      title: '清楚呼叫與目標手：給傳球者最明確的標靶 (Target Hand)',
      en: 'post player target hand basketball / demanding the ball',
      summary: '傳球者在防守壓迫下視野受限。中鋒必須展示巨大、不可忽視的目標手，並大聲呼叫引導傳球！',
      doText: '五指張開朝向傳球者，手臂完全延伸展示接球手掌，眼神鎖定隊友並大喊「Ball!」或「這裡！」。',
      dontText: '雙手縮在胸前默默等待，或者雙手忙著跟對手纏鬥，讓傳球者完全不知道該傳往哪裡。',
      mechanics: [
        'Show 10 Fingers：手指全開，手掌做為目標靶心。手掌越明確，隊友傳球越有信心。',
        '目標手的位置決定防守者的生死：遠離防守者的那側就是唯一的安全降落區。',
        '呼喊聲不可或缺：在吵雜的球場中，聲音能瞬間喚醒持球者的低位直覺。',
      ],
      quote: '「伸出目標手，就是告訴隊友：放心傳過來，這球我包了！」',
    },
    {
      id: 'read-fronting',
      badge: '防守判讀',
      title: '防守站位判讀：身後、3/4 繞前與全繞前三種解法',
      en: 'reading post defense / behind vs fronting',
      summary: '防守者站哪裡，你的要球策略就變到哪裡！不要用同一種要球方式面對不同的防守者。',
      doText: '對手在身後 -> 正面要擊地；對手 3/4 繞前 -> 鎖高位要底線；對手全繞前 -> 背身卡死要高吊。',
      dontText: '對手已經全繞前站在你身前了，你還在低頭跟隊友要胸前傳球，造成致命抄截。',
      mechanics: [
        '身後防守 (Behind)：最理想狀態。深蹲卡位，胸前目標手，接球後直接展開低位進攻。',
        '3/4 繞前 (3/4 Front)：對手企圖封鎖強側。中鋒用手臂鎖住對手身體，伸出底線目標手，要求後門傳球。',
        '全繞前 (Full Front)：對手賭博式全繞前。中鋒雙手張開「反向卡死對手後背 (Seal Behind)」，呼叫高吊球 (Lob Pass) 或轉移高位打 High-Low。',
      ],
      quote: '「防守者越激進，留下的空檔就越巨大。讀懂他的站位，你就讀懂了籃球。」',
    },
    {
      id: 'chin-the-ball',
      badge: '下巴護球',
      title: '接球鐵律：Chin the Ball！嚴禁人堆中隨意下運球',
      en: 'chin the ball / post ball security',
      summary: '低位是全場防守最密集的絞肉機！接球後隨意放低球或下運球，等於把球雙手奉送給小後衛。',
      doText: '雙手強勢抓球，球收於下巴前方，手肘向外撐開保護球權，眼睛抬頭觀察弱側協防。',
      dontText: '一接到球就下意識拍球下運，球被從盲區衝過來的外圍防守者一巴掌拍掉。',
      mechanics: [
        'Chin the Ball：球在下巴高度，雙手緊握，手肘自然微張保護球。',
        '第一時間不運球：保留運球權利，先掃視全場是否有包夾，確認進攻方向再啟動。',
        '若遭遇雙人包夾，維持球在高處，利用身高優勢直接將球挑傳給外圍空檔隊友。',
      ],
      quote: '「球護在下巴，進攻主動權就在你手上；球掉到膝蓋，主動權就屬於防守者。」',
    },
  ];

  const currentList = activeRole === 'passer' ? passerTopics : centerTopics;
  const currentDetail = currentList[selectedTopic] || currentList[0];

  return (
    <div className="mechanics-guide-section">
      <div className="guide-header-block">
        <span className="section-pill">📖 實戰完全指南 Playbook Mechanics</span>
        <h2 className="guide-heading">低位攻防核心拆解：傳球者 vs 中鋒</h2>
        <p className="guide-subtext">
          不論你是外圍發動機（後衛 / 側翼），還是禁區支柱（中鋒 / 大前鋒），掌握這兩側的思維與肢體動作，低位效率立刻提升 50%！
        </p>

        {/* Role Switcher */}
        <div className="role-switch-container">
          <button
            className={`role-switch-btn ${activeRole === 'passer' ? 'active' : ''}`}
            onClick={() => {
              setActiveRole('passer');
              setSelectedTopic(0);
            }}
          >
            <span className="role-icon">🎯</span>
            <div className="role-text-wrap">
              <span className="role-main-text">我是傳球者 (後衛 / 側翼)</span>
              <span className="role-sub-text">如何餵球給中鋒 · Feeding the Post</span>
            </div>
          </button>

          <button
            className={`role-switch-btn ${activeRole === 'center' ? 'active' : ''}`}
            onClick={() => {
              setActiveRole('center');
              setSelectedTopic(0);
            }}
          >
            <span className="role-icon">🛡️</span>
            <div className="role-text-wrap">
              <span className="role-main-text">我是中鋒 (禁區球員)</span>
              <span className="role-sub-text">如何卡位要球 · Sealing & Demanding Ball</span>
            </div>
          </button>
        </div>
      </div>

      {/* Guide Content Grid */}
      <div className="mechanics-grid">
        {/* Left: Topic Selector List */}
        <div className="mechanics-nav-list">
          {currentList.map((topic, idx) => (
            <button
              key={topic.id}
              className={`mechanic-topic-item ${selectedTopic === idx ? 'active' : ''}`}
              onClick={() => setSelectedTopic(idx)}
            >
              <div className="item-top-row">
                <span className="topic-badge">{topic.badge}</span>
                <span className="topic-idx">0{idx + 1}</span>
              </div>
              <div className="topic-name-zh">{topic.title}</div>
              <div className="topic-name-en">{topic.en}</div>
            </button>
          ))}
        </div>

        {/* Right: Detailed Deep Dive Card */}
        <div className="mechanics-detail-card">
          <div className="detail-card-head">
            <div className="head-badge-row">
              <span className="detail-badge-pill">{currentDetail.badge}</span>
              <span className="detail-en-pill">{currentDetail.en}</span>
            </div>
            <h3 className="detail-title">{currentDetail.title}</h3>
            <p className="detail-summary">{currentDetail.summary}</p>
          </div>

          {/* Do vs Don't Comparison */}
          <div className="comparison-box">
            <div className="comp-col do-col">
              <div className="comp-header do-header">
                <span className="comp-icon">✅</span>
                <span className="comp-title">正確做法 (DO)</span>
              </div>
              <p className="comp-text">{currentDetail.doText}</p>
            </div>

            <div className="comp-col dont-col">
              <div className="comp-header dont-header">
                <span className="comp-icon">❌</span>
                <span className="comp-title">常見致命失誤 (DON'T)</span>
              </div>
              <p className="comp-text">{currentDetail.dontText}</p>
            </div>
          </div>

          {/* Deep Dive Key Points */}
          <div className="detail-points-section">
            <h4 className="points-heading">🔍 核心動作細節與物理槓桿 (Mechanics Breakdown)</h4>
            <div className="points-list">
              {currentDetail.mechanics.map((m, i) => (
                <div key={i} className="point-item">
                  <span className="point-bullet">{i + 1}</span>
                  <span className="point-text">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Quote */}
          <div className="golden-quote-box">
            <div className="quote-mark">“</div>
            <div className="quote-content">{currentDetail.quote}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
