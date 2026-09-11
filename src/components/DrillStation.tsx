import { useState } from 'react';

interface Drill {
  id: string;
  title: string;
  titleEn: string;
  badge: string;
  playersNeeded: string;
  equipment: string;
  goal: string;
  standard: string;
  steps: string[];
  coachingFocus: string[];
}

const DRILLS: Drill[] = [
  {
    id: 'chair-drill',
    title: 'Drill 1: 雙人椅子卡位與擊地傳球訓練',
    titleEn: 'Chair Post Entry & 2/3 Bounce Pass Drill',
    badge: '基礎雙人特訓',
    playersNeeded: '2 人一組（1 側翼 + 1 中鋒）',
    equipment: '1 張折疊椅（放置於低位模擬防守阻絕者）、1 顆籃球',
    goal: '建立側翼運球改善角度、2/3 擊地傳球與中鋒下巴護球 (Chin) 的肌肉記憶。',
    standard: '連續完成 10 次不掉球、傳球不碰椅子、中鋒轉身放籃得分（左右兩側各 2 組）。',
    steps: [
      '折疊椅放置於低位禁區外緣（代表防守者的身位與長臂）。',
      '側翼球員從 45 度三分線接球，向前/邊線運球 2 次拉開傳球角度。',
      '中鋒球員深蹲靠近椅子，一隻腳踩在椅子外側（鎖腳），伸出遠離椅子的右手作為目標手。',
      '側翼送出距離中鋒 2/3 處的貼地擊地傳球，球越過椅子邊緣精準落入目標手。',
      '中鋒雙手收球於下巴下方 (Chin the Ball)，順勢背轉身 (Drop Step) 擦板放籃。',
    ],
    coachingFocus: [
      '傳球如果撞到椅子，代表傳球角度尚未拉開，或者擊地點過近。',
      '中鋒接球前手指必須完全張開，接球瞬間發出響亮抓球聲。',
      '傳球者傳完球後必須立刻向零度角滑步 2 步 (Relocate)。',
    ],
  },
  {
    id: 'two-on-two-fronting',
    title: 'Drill 2: 2v2 繞前防守應變訓練',
    titleEn: '2-on-2 Reading Fronting Post Defense Drill',
    badge: '實戰防守判讀',
    playersNeeded: '4 人（2 進攻：側翼 + 中鋒；2 防守：側翼盯防 + 禁區防守）',
    equipment: '1 顆籃球、半場',
    goal: '培養中鋒依據防守者站位（身後、3/4 繞前、全繞前）即時變換要球策略的臨場直覺。',
    standard: '進攻方在 5 秒內成功餵球入禁區，連續 5 個回合不得發生失誤。',
    steps: [
      '防守中鋒在回合開始前隨機選擇一種站位：【身後抵抗】、【3/4 繞前】或【完全全繞前】。',
      '側翼持球在 45 度觀察，中鋒在 1 秒內判讀防守重心：',
      '  - 若為身後抵抗：中鋒深蹲出示胸前目標手，側翼運球擊地餵球。',
      '  - 若為 3/4 繞前：中鋒前臂鎖死高側，亮出底線目標手，側翼送後門擊地。',
      '  - 若為完全全繞前：中鋒背身反向卡死對手，側翼立即高吊或回傳弧頂打高低位。',
      '球成功餵入後，中鋒有 2 次運球機會完成單打。',
    ],
    coachingFocus: [
      '嚴格計時 5 秒：低位要球不能拖泥帶水，搶不到位置就重置角度。',
      '側翼不能有「盲目高吊」的壞習慣，必須看清中鋒是否完成背身卡死。',
    ],
  },
  {
    id: 'post-split-trio',
    title: 'Drill 3: 3人低位剪刀切入走位特訓',
    titleEn: '3-Player Post Feed & Split Cut Action Drill',
    badge: '團隊無球走位',
    playersNeeded: '3 人（低位中鋒 C、側翼傳球者 SF、弧頂射手 PG）+ 1-2 位防守者',
    equipment: '1 顆籃球、半場',
    goal: '熟練金州勇士經典 Split Cut，讓低位接球後的傳球視野與無球跑位無縫銜接。',
    standard: '8 個進攻回合，產出至少 6 次直接助攻空檔（三分命中或空切放籃）。',
    steps: [
      'SF 在 45 度擊地傳球給低位中鋒 C。',
      'SF 傳球後立刻啟動，全速衝向弧頂為 PG 做下掩護 (Down Screen)。',
      'C 雙手下巴護球，面向弧頂，閱讀防守做出二選一決策：',
      '  - 若防守者追防 PG：C 將球分給繞過掩護彈出弧頂的 PG，PG 拔起投射三分。',
      '  - 若防守者撲向外線換防：掩護者 SF 瞬間變向空切籃下 (Slip Cut)，C 送出擊地直塞助攻上籃。',
    ],
    coachingFocus: [
      '低位球員就是四分衛：接球後不要低頭，保持視野開闊。',
      '掩護者要做實掩護：假掩護若太早跑，防守者不會受到任何牽制。',
    ],
  },
  {
    id: 'inside-out-shooting',
    title: 'Drill 4: 內外傳導破包夾三分轟炸訓練',
    titleEn: 'Inside-Out Double Team Kickout Drill',
    badge: '破解包夾高壓',
    playersNeeded: '4-5 人（1 中鋒 + 2-3 名外圍射手 + 1 名專職包夾防守者）',
    equipment: '2 顆籃球、半場',
    goal: '訓練中鋒在遭遇雙人包夾時冷靜護球並以雙手過頭長傳 (Skip Pass) 找到弱側空檔射手。',
    standard: '外圍射手在 10 次接低位分球投射中，命中至少 6 記三分球。',
    steps: [
      '中鋒在低位接球，一名教練或防守球員隨即以凶悍姿態衝入低位進行死纏包夾。',
      '中鋒保持冷靜，雙腳站穩，將球高高舉過肩膀 (High Chin)，禁止下運球。',
      '弱側射手向三分線弧頂或底角滑步，拉出傳球通道並大喊「Shoot!」。',
      '中鋒雙手越過包夾球員手臂送出精準的過頭長傳 (Skip Pass)。',
      '射手 Catch & Shoot 順暢出手，投籃完成後中鋒立刻衝搶進攻籃板。',
    ],
    coachingFocus: [
      '包夾撲過來時，中鋒身體不能後仰，要用背部或前臂站穩。',
      '傳球必須在空中保持直線穿透力，弧度過高會給防守者撲防補位時間。',
    ],
  },
];

export default function DrillStation() {
  const [completedDrills, setCompletedDrills] = useState<Record<string, boolean>>({});

  const toggleComplete = (id: string) => {
    setCompletedDrills((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(completedDrills).filter(Boolean).length;

  return (
    <div className="drill-station-section">
      <div className="drill-header-block">
        <span className="section-pill">🏋️ 實戰訓練菜單 Post Training Station</span>
        <h2 className="drill-heading">科學化低位特訓課表 (Drills Checklist)</h2>
        <p className="drill-subtext">
          由淺入深設計的 4 套實戰訓練，從雙人單項動作、防守讀秒判讀，到 5v5 剪刀走位與破包夾三分。將知識轉化為球場肌肉記憶！
        </p>

        {/* Progress Tracker */}
        <div className="drill-tracker-card">
          <div className="tracker-info">
            <span className="tracker-title">今日特訓進度：</span>
            <span className="tracker-score">{completedCount} / {DRILLS.length} 項訓練完成</span>
          </div>
          <div className="tracker-bar-bg">
            <div
              className="tracker-bar-fill"
              style={{ width: `${(completedCount / DRILLS.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Drills Grid */}
      <div className="drills-grid">
        {DRILLS.map((drill) => {
          const isDone = !!completedDrills[drill.id];

          return (
            <div key={drill.id} className={`drill-card ${isDone ? 'is-completed' : ''}`}>
              <div className="drill-card-top">
                <div className="drill-badge-row">
                  <span className="drill-badge">{drill.badge}</span>
                  <button
                    className={`drill-check-btn ${isDone ? 'checked' : ''}`}
                    onClick={() => toggleComplete(drill.id)}
                    title={isDone ? '標記為未完成' : '標記為已完成'}
                  >
                    {isDone ? '✓ 已完成' : '○ 標記完成'}
                  </button>
                </div>
                <h3 className="drill-title-zh">{drill.title}</h3>
                <div className="drill-title-en">{drill.titleEn}</div>
              </div>

              {/* Specs Box */}
              <div className="drill-specs-box">
                <div className="spec-row">
                  <span className="spec-label">👥 人員配置:</span>
                  <span className="spec-val">{drill.playersNeeded}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">🏀 器材配置:</span>
                  <span className="spec-val">{drill.equipment}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">🎯 訓練目標:</span>
                  <span className="spec-val">{drill.goal}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">🏆 達標標準:</span>
                  <span className="spec-val highlight-val">{drill.standard}</span>
                </div>
              </div>

              {/* Steps List */}
              <div className="drill-steps-block">
                <div className="steps-title">📋 執行步驟 (Execution Steps)：</div>
                <ol className="drill-steps-ol">
                  {drill.steps.map((st, sIdx) => (
                    <li key={sIdx}>{st}</li>
                  ))}
                </ol>
              </div>

              {/* Coaching Focus */}
              <div className="drill-coaching-block">
                <div className="coaching-title">🚨 教練檢驗重點 (Coach Checklist)：</div>
                <ul className="coaching-ul">
                  {drill.coachingFocus.map((cf, cIdx) => (
                    <li key={cIdx}>{cf}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
