import { useState } from 'react';
import { POST_VIDEOS } from '../data/postVideos';

const SEARCH_PRESETS = [
  { label: 'basketball post entry pass', tag: '基礎餵球' },
  { label: 'how to make an entry pass basketball', tag: '傳球手法' },
  { label: 'wing to post entry pass', tag: '側翼角度' },
  { label: 'low post entry pass', tag: '低位直塞' },
  { label: 'post feed basketball', tag: '餵球時機' },
  { label: 'feeding the post basketball', tag: '持球觀念' },
  { label: 'basketball post player seal defender', tag: '中鋒卡位' },
  { label: 'how to seal defender in the post', tag: '下盤鎖腳' },
  { label: 'post player target hand basketball', tag: '目標手' },
  { label: 'Stephen Curry off ball movement breakdown', tag: '柯瑞無球' },
  { label: 'pin down screen basketball shooting drill', tag: '下掩護投籃' },
  { label: 'Warriors post split action', tag: '5v5 剪刀戰術' },
];

export default function VideoLibrary() {
  const [filter, setFilter] = useState<'all' | 'passer' | 'center' | 'shooter' | 'team' | 'drill'>('all');
  const [activeVideoEmbed, setActiveVideoEmbed] = useState<string | null>(null);

  const filteredVideos = POST_VIDEOS.filter((v) => {
    if (filter === 'all') return true;
    return v.category === filter;
  });

  const handleOpenDirectVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenSearch = (query: string) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="video-library-section">
      <div className="video-header-block">
        <span className="section-pill">🎥 精選影音教學庫 Video Masterclass</span>
        <h2 className="video-heading">18 部大師級實戰影音解析與 Checklist</h2>
        <p className="video-subtext">
          100% 驗證有效可播！精選全球頂級訓練師、NBA 名人堂大師（SportsEdTV、DICK'S Sporting Goods、Hakeem Olajuwon、Shot Science、By Any Means、Drew Hanlen 等）實戰教學，附高畫質縮圖與筆記！
        </p>

        {/* Quick Keyword Query Tags */}
        <div className="search-tags-box">
          <div className="tags-label">🔍 點擊關鍵字直達 YouTube 探索更多：</div>
          <div className="tags-scroller">
            {SEARCH_PRESETS.map((item, i) => (
              <button
                key={i}
                className="query-chip-btn"
                onClick={() => handleOpenSearch(item.label)}
                title={`在 YouTube 搜尋 "${item.label}"`}
              >
                <span className="chip-tag">{item.tag}</span>
                <span className="chip-text">{item.label}</span>
                <span className="chip-arrow">↗</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="video-filter-bar">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            全部影片 ({POST_VIDEOS.length})
          </button>
          <button
            className={`filter-btn ${filter === 'passer' ? 'active' : ''}`}
            onClick={() => setFilter('passer')}
          >
            🎯 傳球者技巧 ({POST_VIDEOS.filter((v) => v.category === 'passer').length})
          </button>
          <button
            className={`filter-btn ${filter === 'center' ? 'active' : ''}`}
            onClick={() => setFilter('center')}
          >
            🛡️ 中鋒卡位要球 ({POST_VIDEOS.filter((v) => v.category === 'center').length})
          </button>
          <button
            className={`filter-btn ${filter === 'shooter' ? 'active' : ''}`}
            onClick={() => setFilter('shooter')}
          >
            ⚡ 射手無球跑位 ({POST_VIDEOS.filter((v) => v.category === 'shooter').length})
          </button>
          <button
            className={`filter-btn ${filter === 'team' ? 'active' : ''}`}
            onClick={() => setFilter('team')}
          >
            🧠 5v5 團隊體系 ({POST_VIDEOS.filter((v) => v.category === 'team').length})
          </button>
          <button
            className={`filter-btn ${filter === 'drill' ? 'active' : ''}`}
            onClick={() => setFilter('drill')}
          >
            🏋️ 實戰特訓 Drills ({POST_VIDEOS.filter((v) => v.category === 'drill').length})
          </button>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="video-cards-grid">
        {filteredVideos.map((video) => {
          const isEmbedOpen = activeVideoEmbed === video.id;
          const thumbnailUrl = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

          return (
            <div key={video.id} className="video-card">
              {/* Top Media / Player Area */}
              <div className="video-media-box">
                {isEmbedOpen ? (
                  <div className="iframe-responsive-wrap">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="youtube-iframe"
                    ></iframe>
                  </div>
                ) : (
                  <div
                    className="video-poster-placeholder"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.88) 100%), url(${thumbnailUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    onClick={() => setActiveVideoEmbed(video.id)}
                    title="點擊直接在頁面播放影片"
                  >
                    <div className="poster-overlay">
                      <button className="play-trigger-btn" aria-label="播放影片">
                        <span className="play-triangle">▶</span>
                      </button>
                      <div className="poster-hint">點擊直接播放或前往原片</div>
                    </div>
                    <div className="poster-info">
                      <span className="poster-channel">{video.channel}</span>
                      <span className="poster-badge">{video.badge}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="video-action-bar">
                <button
                  className={`toggle-embed-btn ${isEmbedOpen ? 'active' : ''}`}
                  onClick={() => setActiveVideoEmbed(isEmbedOpen ? null : video.id)}
                >
                  {isEmbedOpen ? '關閉播放器 ✖' : '在頁面直接播放 ▶'}
                </button>

                <button
                  className="open-youtube-btn"
                  onClick={() => handleOpenDirectVideo(video.youtubeId)}
                  title="在 YouTube 官方網站開啟此影片"
                >
                  前往 YouTube 原片 ↗
                </button>
              </div>

              {/* Card Text Content */}
              <div className="video-content-body">
                <div className="video-meta-row">
                  <span className="video-channel-name">📺 {video.channel}</span>
                  <span className="video-category-tag">#{video.category}</span>
                </div>

                <h3 className="video-card-title">{video.titleZh}</h3>
                <h4 className="video-card-title-en">{video.title}</h4>
                <p className="video-summary-text">{video.summary}</p>

                {/* Key Takeaways Checklist */}
                <div className="takeaways-box">
                  <div className="takeaways-title">📌 核心技術筆記 (Key Highlights)</div>
                  <ul className="takeaways-ul">
                    {video.keyPoints.map((pt, idx) => (
                      <li key={idx} className="takeaway-li">
                        <span className="li-check">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Coach Tip */}
                <div className="video-coach-tip">
                  <span className="tip-badge">教練秘笈</span>
                  <span className="tip-quote">{video.proTip}</span>
                </div>

                {/* Common Mistakes */}
                {video.commonMistakes && video.commonMistakes.length > 0 && (
                  <div className="mistakes-box">
                    <span className="mistake-badge">⚠️ 避免失誤</span>
                    <ul className="mistakes-ul">
                      {video.commonMistakes.map((mis, i) => (
                        <li key={i}>{mis}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
