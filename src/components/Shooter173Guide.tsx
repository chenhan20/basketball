import { useState } from 'react';

export default function Shooter173Guide() {
  const [activeSection, setActiveSection] = useState<'philosophy' | 'footwork' | 'reading' | 'tactics' | 'workout'>('philosophy');

  return (
    <div className="shooter-guide-section">
      {/* Header Banner */}
      <div className="shooter-header-block">
        <div className="shooter-badge-row">
          <span className="section-pill">🎯 射手特訓指南 Sniper Blueprint</span>
          <span className="hero-tag">低重心優勢 × 45 度三分甜區 × 無球跑位專題</span>
        </div>
        <h2 className="shooter-heading">靈活射手專區：45 度無球跑位與急停出手完全手冊</h2>
        <p className="shooter-subtext">
          低重心、極速急停減速 (Deceleration) 與借掩護甩開防守的爆發力，能讓你在 45 度三分線成為所有防守者的終極夢魘。
        </p>

        {/* Section Navigation Tabs */}
        <div className="shooter-tab-bar">
          <button
            className={`shooter-tab-btn ${activeSection === 'philosophy' ? 'active' : ''}`}
            onClick={() => setActiveSection('philosophy')}
          >
            <span className="btn-icon">⚡</span>
            <span>跑位哲學與 45° 甜區</span>
          </button>

          <button
            className={`shooter-tab-btn ${activeSection === 'footwork' ? 'active' : ''}`}
            onClick={() => setActiveSection('footwork')}
          >
            <span className="btn-icon">🦶</span>
            <span>三大無球接球腳步 (Footwork)</span>
          </button>

          <button
            className={`shooter-tab-btn ${activeSection === 'reading' ? 'active' : ''}`}
            onClick={() => setActiveSection('reading')}
          >
            <span className="btn-icon">🧠</span>
            <span>閱讀掩護決策樹 (Read Screens)</span>
          </button>

          <button
            className={`shooter-tab-btn ${activeSection === 'tactics' ? 'active' : ''}`}
            onClick={() => setActiveSection('tactics')}
          >
            <span className="btn-icon">📋</span>
            <span>四大招牌 45° 跑位戰術</span>
          </button>

          <button
            className={`shooter-tab-btn ${activeSection === 'workout' ? 'active' : ''}`}
            onClick={() => setActiveSection('workout')}
          >
            <span className="btn-icon">🏋️</span>
            <span>100 顆 45° 個人神射特訓</span>
          </button>
        </div>
      </div>

      {/* ── Section Content Panels ─────────────────────────────────────────── */}
      <div className="shooter-panel-container">
        {/* PANEL 1: PHILOSOPHY */}
        {activeSection === 'philosophy' && (
          <div className="shooter-tab-panel">
            <div className="panel-intro-box">
              <span className="panel-tag">👑 靈活射手的致命武器</span>
              <h3 className="panel-title">為什麼低重心在 45 度三分線是防守者的終極夢魘？</h3>
              <p className="panel-desc">
                不要試圖在身材上與高大防守者硬碰！NBA 巨星柯瑞 (Stephen Curry)、雷艾倫 (Ray Allen) 與瑞迪克 (JJ Redick) 證明了：
                真正決定無球射手命運的是<b>「急停減速的能力 (Deceleration)」</b>與<b>「借用隊友肉盾掩護的精確度」</b>。
              </p>
            </div>

            <div className="pillars-grid">
              <div className="pillar-card">
                <div className="pillar-icon">🛑</div>
                <h4 className="pillar-title">1. 「急停減速」大於「衝刺速度」</h4>
                <p className="pillar-text">
                  高大長人質量大、慣性大，跑動時煞車至少需要 1.5 到 2 步；而靈活射手重心極低，你可以在極限衝刺中<b>「一步定竿煞車」</b>！
                  當你在 45 度三分線突然踩死煞車時，追防你的防守者會因為慣性直接滑過頭，留下 1.5 米的絕對大空檔！
                </p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">📐</div>
                <h4 className="pillar-title">2. 為什麼 45 度角是黃金命中甜區？</h4>
                <p className="pillar-text">
                  比起底角（沒有籃板深度與打板角度）與弧頂（距離籃框正中、防守者協防距離最近），
                  <b>45 度角享有全場最佳的入網容錯率</b>，且弧頂控衛向 45 度傳球是人體最自然的胸前送球角度，球速最快、彈道最正！
                </p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">⚡</div>
                <h4 className="pillar-title">3. 0.45 秒閃電出手 (Quick Release)</h4>
                <p className="pillar-text">
                  外線射手千萬不要慢條斯理地「接球、蹲下、瞄準、起跳」。
                  無球跑位的最高境界是<b>「借地起跳」</b>：在接球落地前的瞬間，雙膝已經微屈蓄力，球剛碰到手指，下半身的力量已經推動身體垂直升空！
                </p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon">🛡️</div>
                <h4 className="pillar-title">4. 把大個子隊友當作「不可穿透的牆」</h4>
                <p className="pillar-text">
                  無球跑位時切忌繞大彎！跑過掩護時必須<b>「肩貼肩 (Shoulder to Shoulder)」</b>擦過隊友的手臂。
                  哪怕只留下一拳的空隙，防守者就能擠過來；只要擦身而過，追防者 100% 會被隊友撞得人仰馬翻。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 2: FOOTWORK */}
        {activeSection === 'footwork' && (
          <div className="shooter-tab-panel">
            <div className="panel-intro-box">
              <span className="panel-tag">🦶 腿部力學與下盤根基</span>
              <h3 className="panel-title">必修三大無球接球腳步 (Shooting Footwork)</h3>
              <p className="panel-desc">
                命中率不高，90% 不是手部姿勢的問題，而是「腳步沒有踩穩就出手」！掌握這三種腳步，你在 45 度接球瞬間就已經具備完美投籃平衡。
              </p>
            </div>

            <div className="footwork-cards-list">
              <div className="footwork-card">
                <div className="fw-badge">腳步 01 · 王道必備</div>
                <h4 className="fw-title">1-2 踩步 (Inside-to-Outside Footwork)</h4>
                <div className="fw-subtitle">適用場景：從底角或禁區衝刺繞出到 45 度三分線</div>
                <p className="fw-desc">
                  當你從底角向 45 度切出時，球在飛行中，先用<b>內側腳（離籃框近的左腳）強力踩地煞車</b>，接著迅速踏出<b>外側腳（右腳）正對籃框</b>。
                  這個動作能將向前衝刺的強大水平動能，瞬間 100% 轉化為直拔向上的垂直起跳高度！
                </p>
                <div className="fw-key-tips">
                  <span className="tip-dot">💡</span>
                  <span>關鍵細節：內側腳踩地瞬間要深深降重心，讓身體像蓄滿力的彈簧一樣隨時準備彈射。</span>
                </div>
              </div>

              <div className="footwork-card">
                <div className="fw-badge">腳步 02 · 極速出手</div>
                <h4 className="fw-title">雙腳墊步 (The Hop Catch)</h4>
                <div className="fw-subtitle">適用場景：時間只剩最後 1 秒，或防守者極度靠近時</div>
                <p className="fw-desc">
                  在球即將到達雙手的前 0.1 秒，身體在空中做一個微小的向前跳步 (Hop)，<b>雙手觸球與雙腳著地在同一瞬間完成</b>！
                  雙腳一觸地立刻借力回彈升空，完全省去 1-2 踏步的轉移時間，出手時間直接壓縮至 0.4 秒以內，高大防守者根本來不及起跳封蓋。
                </p>
                <div className="fw-key-tips">
                  <span className="tip-dot">💡</span>
                  <span>關鍵細節：雙腳著地距離比肩膀略寬，腳尖微朝向左側 10 度（右手射手），釋放肩膀緊繃度。</span>
                </div>
              </div>

              <div className="footwork-card">
                <div className="fw-badge">腳步 03 · 防封蓋神技</div>
                <h4 className="fw-title">Sweep & Sway (腳前掃 · 身微後傾)</h4>
                <div className="fw-subtitle">適用場景：面對高大長人迎面撲防 (Contest)</div>
                <p className="fw-desc">
                  起跳出手時，<b>雙腳自然向前擺動 10~15 度，上半身放鬆自然向後微傾</b>（就像坐在鞦韆上一樣）。
                  這不是故意後仰跳投，而是自然的重心代償！它能讓你的投籃出手點硬生生向後拉開 15~20 公分，並且讓投籃弧度高達 50 度以上，長人只能望球興嘆！
                </p>
                <div className="fw-key-tips">
                  <span className="tip-dot">💡</span>
                  <span>關鍵細節：落地時雙腳落在起跳點前方約 1 步位置，肩膀維持放鬆，千萬不要僵硬直挺挺落地。</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 3: READING THE DEFENSE */}
        {activeSection === 'reading' && (
          <div className="shooter-tab-panel">
            <div className="panel-intro-box">
              <span className="panel-tag">🧠 球場高階智商</span>
              <h3 className="panel-title">閱讀掩護三秒決策樹 (Read & React)</h3>
              <p className="panel-desc">
                頂尖無球射手不是死板地照著路線跑，而是「看防守者怎麼選，我就怎麼殺」！
                防守者只有三種選擇，而你每一種都有 100% 克制的致命解法。
              </p>
            </div>

            <div className="reading-decision-grid">
              <div className="decision-card">
                <div className="decision-header trail-header">
                  <span className="decision-tag">防守選擇 A</span>
                  <h4 className="decision-name">防守者死命在身後追 (Lock & Trail)</h4>
                </div>
                <div className="decision-body">
                  <p className="decision-reaction">
                    <b>🎯 射手解法：【捲曲切入 (Curl Cut)】</b><br />
                    防守者為了封殺你的 45 度三分，跟在身後加速追趕。這時你<b>絕對不要彈出外線</b>！
                    緊貼隊友肩膀順勢向籃下「捲曲切入 (Curl)」，隊友的身體會像一堵牆把防守者卡死在身後，你直插禁區挑籃輕鬆得分！
                  </p>
                </div>
              </div>

              <div className="decision-card">
                <div className="decision-header under-header">
                  <span className="decision-tag">防守選擇 B</span>
                  <h4 className="decision-name">防守者想抄近路走掩護下方 (Go Under)</h4>
                </div>
                <div className="decision-body">
                  <p className="decision-reaction">
                    <b>🎯 射手解法：【原地急停外彈 (Flare / Pop 3PT)】</b><br />
                    防守者看你想跑 45 度，自作聰明從隊友掩護下方抄捷徑想攔截。
                    這時你只要<b>腳步急停、向後退半步彈出三分線外</b>，防守者被困在隊友身後，立刻獲得 2 米大空檔，自信出手三分！
                  </p>
                </div>
              </div>

              <div className="decision-card">
                <div className="decision-header switch-header">
                  <span className="decision-tag">防守選擇 C</span>
                  <h4 className="decision-name">防守大個子直接換防撲上來 (Switch)</h4>
                </div>
                <div className="decision-body">
                  <p className="decision-reaction">
                    <b>🎯 射手解法：【後撤步或後門反跑 (Stepback / Backdoor)】</b><br />
                    如果對方長人提早撲向 45 度換防：<br />
                    1. 假裝投籃點起長人重心，運一步急停後撤步三分！<br />
                    2. 或在換防形成的瞬間，中鋒隊友直接順下禁區形成「大打小 (Mismatch)」，直接高吊得分！
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 4: 4 TACTICS */}
        {activeSection === 'tactics' && (
          <div className="shooter-tab-panel">
            <div className="panel-intro-box">
              <span className="panel-tag">📋 四套實戰王牌戰術</span>
              <h3 className="panel-title">專屬 45 度無球戰術庫（已實裝至 3D 戰術板）</h3>
              <p className="panel-desc">
                以下四套戰術已全部整合進上方的「互動戰術板」，你可以隨時切換 3D/2D 模式或「後衛主觀視角 (Passer POV)」查看推演細節！
              </p>
            </div>

            <div className="tactics-overview-grid">
              <div className="tactic-info-card">
                <div className="t-card-badge">Play 01 · 必修基礎</div>
                <h4 className="t-card-title">Corner Pin-Down to 45° (底角下掩護彈出)</h4>
                <p className="t-card-p">
                  <b>戰術起手：</b>SG 在底角沉底，中鋒在低位站定。<br />
                  <b>跑位路線：</b>SG 突然加速擦過中鋒肩膀彈向 45 度三分線，追防者被中鋒肉盾擋停，SG 接弧頂分球 0.5 秒三分拔起！
                </p>
              </div>

              <div className="tactic-info-card">
                <div className="t-card-badge">Play 02 · 傳奇殺招</div>
                <h4 className="t-card-title">Floppy Single-Double (雙向選擇連續雙掩護)</h4>
                <p className="t-card-p">
                  <b>戰術起手：</b>SG 站在籃下底線中央，左右兩側各有人掩護。<br />
                  <b>跑位路線：</b>SG 閱讀防守重心，選擇右側「連續雙重掩護 (Stagger)」，高大防守者連續撞上兩堵牆，SG 飄至 45 度空檔三分！
                </p>
              </div>

              <div className="tactic-info-card">
                <div className="t-card-badge">Play 03 · 盲區奇襲</div>
                <h4 className="t-card-title">Top-to-Wing Flare (弧頂橫向盲區背掩護)</h4>
                <p className="t-card-p">
                  <b>戰術起手：</b>SG 在弧頂持球導向弱側。<br />
                  <b>跑位路線：</b>中鋒在防守者背後設立盲區掩護，SG 沿著三分線向 45 度橫向飄移外彈，接對角長傳 (Skip Pass) 空檔三分出鞘！
                </p>
              </div>

              <div className="tactic-info-card">
                <div className="t-card-badge">Play 04 · 野球無敵</div>
                <h4 className="t-card-title">DHO Hand-Off (45 度手遞手 + 肉盾拔起)</h4>
                <p className="t-card-p">
                  <b>戰術起手：</b>大個子在罰球線高位持球策應，主動往 45 度運球。<br />
                  <b>跑位路線：</b>SG 貼身交接手遞手，大個子轉身站定封死防守者，SG 橫跨一步拉開 1.5 米空間急停拔起三分！打野球最容易得分！
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PANEL 5: WORKOUT */}
        {activeSection === 'workout' && (
          <div className="shooter-tab-panel">
            <div className="panel-intro-box">
              <span className="panel-tag">🏋️ 專屬自主訓練課表</span>
              <h3 className="panel-title">每日 100 顆 45 度無球神射特訓 (Daily 100 3PT Routine)</h3>
              <p className="panel-desc">
                投籃技術是在孤獨的球場上練出來的。這套特訓專門模擬 45 度的無球跑動、變速煞車與極速出手，每天堅持 30 分鐘，兩週內實戰命中率暴增！
              </p>
            </div>

            <div className="workout-phases-grid">
              <div className="workout-card">
                <div className="wk-badge">PHASE 1 · 25 顆</div>
                <h4 className="wk-title">底角折返衝刺 1-2 踏步投籃</h4>
                <p className="wk-text">
                  從右底角全速衝向右側 45 度三分線，模擬擦過掩護，內側腳煞車、外側腳踩定，接朋友傳球或自己轉球回彈，出手命中 25 顆（左右兩側各 12-13 顆）。
                </p>
              </div>

              <div className="workout-card">
                <div className="wk-badge">PHASE 2 · 25 顆</div>
                <h4 className="wk-title">雙腳墊步 (Hop Catch) 0.4 秒極速出手</h4>
                <p className="wk-text">
                  在 45 度三分線外 1 步距離，向前小跳墊步進三分線，雙腳落地觸球瞬間直接拔起，要求出手極速且弧度高於籃板上沿，命中 25 顆。
                </p>
              </div>

              <div className="workout-card">
                <div className="wk-badge">PHASE 3 · 25 顆</div>
                <h4 className="wk-title">手遞手接球 + 橫跨一步急停跳投</h4>
                <p className="wk-text">
                  模擬與中鋒在 45 度完成 DHO 手遞手，左手或右手接球後向外橫跨一步 (Lateral Dribble Step)，拉開空間後立刻急停拔起，命中 25 顆。
                </p>
              </div>

              <div className="workout-card">
                <div className="wk-badge">PHASE 4 · 25 顆</div>
                <h4 className="wk-title">高強度體能枯竭壓軸三分</h4>
                <p className="wk-text">
                  在半場中線與 45 度三分線之間做折返衝刺，每次跑回 45 度立即接球出手，模擬比賽最後一分鐘體力耗盡時的致命三分，投進 25 顆方可結束訓練！
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
