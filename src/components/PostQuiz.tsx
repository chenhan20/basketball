import { useState } from 'react';

interface QuizQuestion {
  id: number;
  scenario: string;
  situationZh: string;
  question: string;
  options: {
    label: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: '情境一：側翼傳球判讀 (Wing Entry Reading)',
    situationZh: '你在 45 度側翼持球，防守中鋒在低位對我方中鋒採取強硬的「高位側 3/4 繞前 (3/4 Front)」，我方中鋒用身體鎖住高位，並將目標手伸向底線方向。',
    question: '身為傳球者，你此時的最佳決策是什麼？',
    options: [
      {
        label: 'A',
        text: '直接大力朝中鋒胸口送出胸前傳球，試圖用球速突破對手長臂。',
        isCorrect: false,
        explanation: '錯誤！對手已佔據高位傳球路線，直傳胸口 90% 會被防守者的手臂直接攔截造成快攻。',
      },
      {
        label: 'B',
        text: '向底線方向運一步改善角度，朝中鋒底線側目標手送出貼地擊地傳球 (Bounce Pass)。',
        isCorrect: true,
        explanation: '完全正確！這正是「Pass Away From Defender」的核心精髓。防守者卡在高側，底線就是無人看管的康莊大道，擊地傳球直穿後門！',
      },
      {
        label: 'C',
        text: '原地收球不動，大聲催促中鋒把防守者推開。',
        isCorrect: false,
        explanation: '錯誤！停球死球只會讓自己陷入無法運球的窘境，催促中鋒推人極易被吹判進攻推人犯規。',
      },
    ],
  },
  {
    id: 2,
    scenario: '情境二：中鋒破解全繞前 (Countering Full Front)',
    situationZh: '你是低位中鋒，對手防守者採取極度冒進的「全繞前防守 (Full Front)」，直接站在你正前方擋住側翼隊友的視線。',
    question: '身為中鋒，你應該如何要球與得分？',
    options: [
      {
        label: 'A',
        text: '雙手張開將防守者「背身反向卡死 (Seal on Back)」，呼叫外圍回傳罰球線高位，由高位送出高吊球 (High-Low Lob)。',
        isCorrect: true,
        explanation: '教科書級別的正解！全繞前的防守者身後就是整片大空檔。背身卡死後，只要高位起吊過頭球，輕鬆暴扣或挑籃得分！',
      },
      {
        label: 'B',
        text: '用力用雙手把防守者推到禁區外，搶回身前位置。',
        isCorrect: false,
        explanation: '錯誤！在低位用雙手發力推人是明明白白的進攻犯規 (Offensive Foul)，直接奉送球權給對手。',
      },
      {
        label: 'C',
        text: '立即放棄低位，直接跑出三分線向控衛要球單打。',
        isCorrect: false,
        explanation: '錯誤！全繞前是防守者給予你最大的空檔恩賜，跑出三分線等於放棄了籃下最輕鬆的兩分機會。',
      },
    ],
  },
  {
    id: 3,
    scenario: '情境三：傳球後的無球紀律 (Spacing After Entry)',
    situationZh: '側翼前鋒成功送出一記漂亮的擊地餵球，中鋒已在低位牢牢穩住身位接獲傳球。',
    question: '此時傳球者最糟糕的動作是什麼？',
    options: [
      {
        label: 'A',
        text: '原地站在 45 度三分線上叉腰觀看中鋒單打。',
        isCorrect: true,
        explanation: '賓果！原地發呆是最糟糕的習慣。你的防守者會毫不猶豫地轉身衝向低位對中鋒進行包夾！傳球者必須立刻 Relocate 到底角或做 Split 掩護。',
      },
      {
        label: 'B',
        text: '立即向零度角底線 (Corner) 滑步 Relocate 拉開空間。',
        isCorrect: false,
        explanation: '這是極佳的正確跑位！拉開到底角可以牽制防守者，讓中鋒擁有寬廣的 1-on-1 單打空間。',
      },
      {
        label: 'C',
        text: '全速奔向弧頂為控球後衛做下掩護 (Split Cut Down-Screen)。',
        isCorrect: false,
        explanation: '這正是勇士隊著名的 Split Cut 戰術！能有效製造外線三分空檔或空切機會，是非常優秀的進攻發動。',
      },
    ],
  },
  {
    id: 4,
    scenario: '情境四：低位護球與破包夾 (Ball Security & Double Team)',
    situationZh: '中鋒在低位成功接球，對手弱側防守者立即如猛獸般衝入禁區形成夾擊包夾。',
    question: '中鋒第一時間最關鍵的自保與反擊動作是什麼？',
    options: [
      {
        label: 'A',
        text: '立刻低頭拍球下運，試圖用速度撞開兩名防守者。',
        isCorrect: false,
        explanation: '大忌！在雙人包夾中低頭下運球，球落地的瞬間 99% 會被切掉或抄截，直接形成致命反擊。',
      },
      {
        label: 'B',
        text: '保持冷靜，雙手下巴護球 (Chin the Ball)，維持球在高處，跨步以雙手過頭長傳 (Skip Pass) 找到被放空的弱側射手。',
        isCorrect: true,
        explanation: '完美答案！包夾必有空檔。維持球在高位，防守者手短無法搶奪，一記過頭分球就能粉碎包夾體系！',
      },
      {
        label: 'C',
        text: '慌張閉眼直接往後腦勺隨意拋傳。',
        isCorrect: false,
        explanation: '錯誤！慌亂盲傳只會造成直接失誤。中鋒必須具備冷靜的高空視野。',
      },
    ],
  },
];

export default function PostQuiz() {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const handleSelect = (qIdx: number, optIdx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q, qIdx) => {
      const selected = userAnswers[qIdx];
      if (selected !== undefined && q.options[selected].isCorrect) {
        score += 25;
      }
    });
    return score;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const score = calculateScore();

  return (
    <div className="post-quiz-section">
      <div className="quiz-header-block">
        <span className="section-pill">🧠 實戰智商測驗 Tactical IQ Quiz</span>
        <h2 className="quiz-heading">低位攻防四道關鍵難題挑戰</h2>
        <p className="quiz-subtext">
          檢驗你的低位戰術智商！面對 3/4 繞前、全繞前、傳球後跑位與雙人包夾，你能做出像 NBA 職業球員一樣的最佳解嗎？
        </p>

        {/* Score Summary */}
        <div className="quiz-scoreboard">
          <div className="score-item">
            <span className="score-label">答題進度:</span>
            <span className="score-val">{answeredCount} / {QUESTIONS.length} 題</span>
          </div>
          {answeredCount === QUESTIONS.length && (
            <div className="score-item highlight-score">
              <span className="score-label">戰術 IQ 得分:</span>
              <span className="score-val-big">{score} 分</span>
              <span className="score-comment">
                {score === 100 ? '👑 完美！你具備職業級低位戰術思維！' : '💪 非常優秀！再複習一下失誤題目就能百發百中！'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Questions Stack */}
      <div className="quiz-stack">
        {QUESTIONS.map((q, qIdx) => {
          const selectedOptIdx = userAnswers[qIdx];
          const hasAnswered = selectedOptIdx !== undefined;

          return (
            <div key={qIdx} className="quiz-card">
              <div className="quiz-card-head">
                <span className="q-badge">Question 0{qIdx + 1}</span>
                <span className="q-scenario">{q.scenario}</span>
              </div>

              <div className="q-situation-box">
                <span className="sit-icon">📍</span>
                <span className="sit-text">{q.situationZh}</span>
              </div>

              <h3 className="q-question-text">{q.question}</h3>

              {/* Options List */}
              <div className="q-options-grid">
                {q.options.map((opt, optIdx) => {
                  const isChosen = selectedOptIdx === optIdx;
                  let optClass = 'quiz-opt-btn';
                  if (hasAnswered) {
                    if (isChosen && opt.isCorrect) optClass += ' correct-chosen';
                    else if (isChosen && !opt.isCorrect) optClass += ' wrong-chosen';
                    else if (!isChosen && opt.isCorrect) optClass += ' correct-neutral';
                  }

                  return (
                    <button
                      key={optIdx}
                      className={optClass}
                      onClick={() => handleSelect(qIdx, optIdx)}
                    >
                      <div className="opt-top-row">
                        <span className="opt-letter">{opt.label}</span>
                        {hasAnswered && opt.isCorrect && <span className="opt-feedback-tag correct">正解 ✓</span>}
                        {hasAnswered && isChosen && !opt.isCorrect && <span className="opt-feedback-tag wrong">錯誤 ✗</span>}
                      </div>
                      <div className="opt-text">{opt.text}</div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {hasAnswered && (
                <div className={`explanation-callout ${q.options[selectedOptIdx].isCorrect ? 'is-correct' : 'is-wrong'}`}>
                  <div className="exp-title">
                    {q.options[selectedOptIdx].isCorrect ? '🎉 答案正確！戰術解析：' : '💡 答錯了！深入解析：'}
                  </div>
                  <div className="exp-text">{q.options[selectedOptIdx].explanation}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
