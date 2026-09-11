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
  { label: 'pass away from defender basketball', tag: '遠離防守' },
  { label: '5v5 post entry offense', tag: '5v5 戰術' },
  { label: 'basketball post entry drill', tag: '訓練菜單' },
];

export default function VideoLibrary() {
  const [filter, setFilter] = useState<'all' | 'passer' | 'center' | 'team' | 'drill'>('all');
  const [activeVideoEmbed, setActiveVideoEmbed] = useState<string | null>(null);

  const filteredVideos = POST_VIDEOS.filter((v) => {
    if (filter === 'all') return true;
    return v.category === filter;
  });

  const handleOpenSearch = (query: string) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="video-library-section">
      <div className="video-header-block">
        <span className="section-pill">🎥 精選影音教學庫 Video Masterclass</span>
        <h2 className="video-heading">大師級影音解析與實戰 Checklist</h2>
        <p className="video-subtext">
          精選全球知名教練、訓練機構與傳奇球星（SportsEdTV、ATTACKBball、Shot Science、Hakeem Olajuwon 等）的權威教學，附帶重點筆記與一鍵 YouTube 原片播放！
        </p>

        {/* Quick Keyword Query Tags */}
        <div className="search-tags-box">
          <div className="tags-label">🔍 點擊關鍵字一鍵直達 YouTube 深度搜尋：</div>
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
            className={`filter-btn ${filter === 'team' ? 'active' : ''}`}
            onClick={() => setFilter('team')}
          >
            ⚡ 5v5 團隊體系 ({POST_VIDEOS.filter((v) => v.category === 'team').length})
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

          return (
            <div key={video.id} className="video-card">
              {/* Top Media / Player Area */}
              <div className="video-media-box">
                {isEmbedOpen && video.youtubeId ? (
                  <div className="iframe-responsive-wrap">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="youtube-iframe"
                    ></iframe>
                  </div>
                ) : (
                  <div
                    className="video-poster-placeholder"
                    onClick={() => setActiveVideoEmbed(video.id)}
                  >
                    <div className="poster-overlay">
                      <button className="play-trigger-btn">
                        <span className="play-triangle">▶</span>
                      </button>
                      <div className="poster-hint">點擊內嵌播放或在 YouTube 觀看</div>
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
                {video.youtubeId && (
                  <button
                    className={`toggle-embed-btn ${isEmbedOpen ? 'active' : ''}`}
                    onClick={() => setActiveVideoEmbed(isEmbedOpen ? null : video.id)}
                  >
                    {isEmbedOpen ? '關閉內嵌播放 ✖' : '在頁面直接播放 ▶'}
                  </button>
                )}

                <button
                  className="open-youtube-btn"
                  onClick={() => handleOpenSearch(video.searchQuery)}
                  title="在 YouTube 官方網站觀看高畫質影片"
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
