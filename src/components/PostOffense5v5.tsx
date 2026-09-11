import { useState } from 'react';

export default function PostOffense5v5() {
  const [activeTab, setActiveTab] = useState<'split' | 'highlow' | 'insideout' | 'spacing'>('split');

  return (
    <div className="offense-5v5-section">
      <div className="offense-header-block">
        <span className="section-pill">⚡ 5v5 團隊戰術體系 5v5 Team Offense</span>
        <h2 className="offense-heading">5v5 低位發動戰術與空間紀律</h2>
        <p className="offense-subtext">
          現代籃球的低位不是死板的背框單打，而是串連全隊的「戰術發動機 (Tactical Hub)」。掌握勇士隊的 Split Cut、古典高低位連線與 Inside-Out 破解包夾！
        </p>

        {/* Tab Switcher */}
        <div className="offense-tab-bar">
          <button
            className={`offense-tab-btn ${activeTab === 'split' ? 'active' : ''}`}
            onClick={() => setActiveTab('split')}
          >
            <span className="tab-icon">✂️</span>
            <span>金州勇士 Split Cut 剪刀戰術</span>
          </button>

          <button
            className={`offense-tab-btn ${activeTab === 'highlow' ? 'active' : ''}`}
            onClick={() => setActiveTab('highlow')}
          >
            <span className="tab-icon">🗼</span>
            <span>古典高低位連線 (High-Low)</span>
          </button>

          <button
            className={`offense-tab-btn ${activeTab === 'insideout' ? 'active' : ''}`}
            onClick={() => setActiveTab('insideout')}
          >
            <span className="tab-icon">🎯</span>
            <span>破解包夾：Inside-Out 傳導</span>
          </button>

          <button
            className={`offense-tab-btn ${activeTab === 'spacing' ? 'active' : ''}`}
            onClick={() => setActiveTab('spacing')}
          >
            <span className="tab-icon">📐</span>
            <span>5v5 空間幾何鐵律 (Spacing)</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="offense-content-panel">
        {activeTab === 'split' && (
          <div className="offense-tab-detail">
            <div className="tab-detail-top">
              <span className="strategy-tag">NBA 金州勇士隊代表作 · Steve Kerr 核心戰術</span>
              <h3 className="strategy-title">Warriors Post Split Action (低位剪刀走位)</h3>
              <p className="strategy-desc">
                金州勇士在柯瑞 (Curry)、湯普森 (Thompson) 與格林 (Green) 時代統治聯盟的核心無球掩護配合。
                球餵入低位後，傳球者絕不發呆，而是與弧頂隊友展開交叉下掩護，將低位中鋒轉化為致命的「分球軸心 (Post Hub)」。
              </p>
            </div>

            <div className="strategy-cards-grid">
              <div className="strategy-step-card">
                <div className="card-phase">PHASE 1</div>
                <h4 className="card-step-title">傳球入低位樞紐 (Feed the Hub)</h4>
                <p className="card-step-text">
                  45度側翼 SF 將球擊地餵入低位中鋒 C 手中。中鋒接球後雙手下巴護球，面向半場觀察外圍跑位。
                </p>
                <div className="card-coach-tip">💡 重點：中鋒不要急著下運球，雙眼抬頭直視弧頂。</div>
              </div>

              <div className="strategy-step-card">
                <div className="card-phase">PHASE 2</div>
                <h4 className="card-step-title">下掩護與剪刀交叉 (Screen Away)</h4>
                <p className="card-step-text">
                  傳完球的 SF 立即全速奔向弧頂，為正在往下切的控衛 PG 做一個扎實的無球下掩護 (Down Screen)。
                </p>
                <div className="card-coach-tip">💡 重點：掩護者必須站穩雙腳，形成擋拆牆。</div>
              </div>

              <div className="strategy-step-card">
                <div className="card-phase">PHASE 3</div>
                <h4 className="card-step-title">二擇一閱讀：Pop 射手 vs Slip 空切</h4>
                <p className="card-step-text">
                  <b>選項 A (Pop)</b>：防守者被擋住，PG 繞過掩護彈出弧頂，接低位分球投射三分！<br />
                  <b>選項 B (Slip)</b>：防守者急忙撲向外線換防，掩護者 SF 瞬間假掩護反跑空切籃下上籃！
                </p>
                <div className="card-coach-tip">💡 重點：防守只要有一絲猶豫，必出空檔。</div>
              </div>
            </div>

            <div className="strategy-summary-banner">
              <div className="banner-badge">實戰價值</div>
              <div className="banner-text">
                當對手習慣派重兵包夾你的中鋒時，Split Cut 可以在包夾尚未成型之前，透過兩位外線球員的無球交叉掩護直接撕裂防線，完全廢除對手的包夾意圖！
              </div>
            </div>
          </div>
        )}

        {activeTab === 'highlow' && (
          <div className="offense-tab-detail">
            <div className="tab-detail-top">
              <span className="strategy-tag">古典雙塔終極殺招 · 破解繞前防守天花板</span>
              <h3 className="strategy-title">High-Low Action (高低位連線)</h3>
              <p className="strategy-desc">
                當對手中鋒防守極為凶悍、採取 3/4 繞前甚至「全繞前」試圖封死低位傳球時，高低位連線 (High-Low) 是在籃球幾何學上「絕對無解」的反制武器。
              </p>
            </div>

            <div className="strategy-cards-grid">
              <div className="strategy-step-card">
                <div className="card-phase">PHASE 1</div>
                <h4 className="card-step-title">中鋒反向死鎖 (Seal on Back)</h4>
                <p className="card-step-text">
                  防守者全繞前站在中鋒身前時，中鋒千萬不要慌！雙臂向外架開，將前胸與雙膝緊緊頂住對手的後背，將對手徹底卡在身前，身後露出整片籃下開闊地。
                </p>
                <div className="card-coach-tip">💡 核心心法：讓對手以為他搶到了身前，實則被困在無援之境。</div>
              </div>

              <div className="strategy-step-card">
                <div className="card-phase">PHASE 2</div>
                <h4 className="card-step-title">4 號位上提罰球線 (Flash to Elbow)</h4>
                <p className="card-step-text">
                  側翼持球者切勿硬傳，迅速將球導給罰球線高位 (Elbow) 接應的大前鋒 (PF) 或高位球員。
                </p>
                <div className="card-coach-tip">💡 角度轉移：從高位看籃下，中鋒與防守者的遮擋關係瞬間逆轉為 100% 空檔！</div>
              </div>

              <div className="strategy-step-card">
                <div className="card-phase">PHASE 3</div>
                <h4 className="card-step-title">高吊空拋作業 (Over-the-Top Lob)</h4>
                <p className="card-step-text">
                  高位球員接球不停留，送出一記柔和的過頭高吊球。低位中鋒轉身迎球起跳，在防守者頭頂空中接力或輕鬆放進得分。
                </p>
                <div className="card-coach-tip">💡 重點：吊球不要給得太硬太急，像排球墊球一樣柔和送至籃框前方。</div>
              </div>
            </div>

            <div className="strategy-summary-banner">
              <div className="banner-badge">防守死穴</div>
              <div className="banner-text">
                全繞前防守最致命的弱點就是「身後沒有視野」。高位持球者傳出的高吊球，防守者即使跳得再高，也無法在背向籃框的情況下阻止空拋！
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insideout' && (
          <div className="offense-tab-detail">
            <div className="tab-detail-top">
              <span className="strategy-tag">懲罰低位包夾 · 現代三分雨發動機</span>
              <h3 className="strategy-title">Beating the Double Team: Inside-Out (內外傳導)</h3>
              <p className="strategy-desc">
                「在低位，包夾從來不是危機，而是外圍射手吃大餐的信號！」
                中鋒在低位吸引兩名防守者，球場上必定有某處形成以多打少的 4 打 3 局面。
              </p>
            </div>

            <div className="strategy-cards-grid">
              <div className="strategy-step-card">
                <div className="card-phase">LINE 1</div>
                <h4 className="card-step-title">生命線一：原傳球者 Relocate 底角</h4>
                <p className="card-step-text">
                  側翼餵球後立即 Relocate 至同側零度角底角。如果包夾是從強側側翼撲過來的，中鋒立刻回傳底角，送出無干擾大空檔三分！
                </p>
                <div className="card-coach-tip">💡 傳球路徑：最短、最快、防守者最難回撲。</div>
              </div>

              <div className="strategy-step-card">
                <div className="card-phase">LINE 2</div>
                <h4 className="card-step-title">生命線二：弧頂安全閥 (Safety Valve)</h4>
                <p className="card-step-text">
                  弧頂控衛向強側方向微調 1-2 步，提供低位中鋒一條直線回傳路徑。接球後可直接投射三分，或發動二次切入突刺。
                </p>
                <div className="card-coach-tip">💡 功用：避免中鋒被逼入死角，弧頂永遠是安全撤退點。</div>
              </div>

              <div className="strategy-step-card">
                <div className="card-phase">LINE 3</div>
                <h4 className="card-step-title">生命線三：弱側對角長傳 (Skip Pass)</h4>
                <p className="card-step-text">
                  當弱側防守者下沉深入禁區包夾時，弱側 45 度或底角處於完全放空狀態。中鋒雙手高舉，送出穿越禁區的對角長傳，製造 Extra Pass 空檔！
                </p>
                <div className="card-coach-tip">💡 護球要點：球必須舉高過肩，用手腕力量跨過包夾球員雙臂。</div>
              </div>
            </div>

            <div className="strategy-summary-banner">
              <div className="banner-badge">中鋒第一誡</div>
              <div className="banner-text">
                「面對包夾，第一時間不要運球，更不要低頭硬幹！」只要球護在高處，包夾者只能徒勞揮手；你傳出的每一次 Inside-Out，都是摧毀對手防守信心的重砲。
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spacing' && (
          <div className="offense-tab-detail">
            <div className="tab-detail-top">
              <span className="strategy-tag">幾何學的藝術 · 讓防守者無法兼顧</span>
              <h3 className="strategy-title">5v5 低位空間五大鐵律 (Spacing Principles)</h3>
              <p className="strategy-desc">
                沒有好的空間 (Spacing)，再強的低位單打也會被擁擠的協防人員埋葬。低位進攻時，全隊其餘 4 名球員必須恪守空間紀律。
              </p>
            </div>

            <div className="strategy-cards-grid">
              <div className="strategy-step-card">
                <div className="card-phase">RULE 1</div>
                <h4 className="card-step-title">弱側底角釘死 (Lock the Weakside Corner)</h4>
                <p className="card-step-text">
                  弱側底角必須始終有一名具備外線威脅的射手站定。這會迫使防守者必須在「保護籃下」與「送出空檔三分」之間做出痛苦抉擇。
                </p>
              </div>

              <div className="strategy-step-card">
                <div className="card-phase">RULE 2</div>
                <h4 className="card-step-title">保持單打三角形 (Triangle Spacing)</h4>
                <p className="card-step-text">
                  低位中鋒、同側底角射手、弧頂控衛形成穩定的強側傳球三角形，距離保持在 15-18 英尺，既不易被單人兼顧，傳球又不至於因過遠而失誤。
                </p>
              </div>

              <div className="strategy-step-card">
                <div className="card-phase">RULE 3</div>
                <h4 className="card-step-title">空切者不可停在禁區 (Don't Clog Paint)</h4>
                <p className="card-step-text">
                  外圍球員切入空切如果沒接到球，必須以最快速度貫穿到底角或弱側外線，絕不可在禁區停留，以免把自己的防守者帶給低位中鋒。
                </p>
              </div>
            </div>

            <div className="strategy-summary-banner">
              <div className="banner-badge">教練心法</div>
              <div className="banner-text">
                「空間就是速度，空間就是投籃命中率。」當球隊擁有良好的低位空間，中鋒單打不需要花巧動作，一個簡單的 Drop Step 就能輕易得分。
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
