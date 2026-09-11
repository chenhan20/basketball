import { useState } from 'react';
import './App.css';
import PostTacticsBoard from './components/PostTacticsBoard';
import PostMechanicsGuide from './components/PostMechanicsGuide';
import PostOffense5v5 from './components/PostOffense5v5';
import VideoLibrary from './components/VideoLibrary';
import DrillStation from './components/DrillStation';
import PostQuiz from './components/PostQuiz';

type ActiveTab = 'tactics' | 'mechanics' | 'offense' | 'videos' | 'drills' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tactics');

  return (
    <div className="app-container">
      {/* ── Top Navigation Bar ──────────────────────────────────────────────── */}
      <header className="navbar">
        <div className="nav-brand">
          <div className="brand-logo-icon">🏀</div>
          <div className="brand-text-block">
            <h1 className="brand-title">HOOPS LAB · 籃球技術分享庫</h1>
            <span className="brand-subtitle">低位餵球 (Post Feed) × 中鋒卡位要球 (Post Seal) 完全指南</span>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="nav-tabs-wrapper" aria-label="Main Navigation">
          <button
            className={`nav-tab-link ${activeTab === 'tactics' ? 'active' : ''}`}
            onClick={() => setActiveTab('tactics')}
          >
            <span className="tab-link-icon">🏀</span>
            <span>戰術推演板</span>
          </button>

          <button
            className={`nav-tab-link ${activeTab === 'mechanics' ? 'active' : ''}`}
            onClick={() => setActiveTab('mechanics')}
          >
            <span className="tab-link-icon">📖</span>
            <span>動作細節拆解</span>
          </button>

          <button
            className={`nav-tab-link ${activeTab === 'offense' ? 'active' : ''}`}
            onClick={() => setActiveTab('offense')}
          >
            <span className="tab-link-icon">⚡</span>
            <span>5v5 團隊體系</span>
          </button>

          <button
            className={`nav-tab-link ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <span className="tab-link-icon">🎥</span>
            <span>精選影音庫</span>
          </button>

          <button
            className={`nav-tab-link ${activeTab === 'drills' ? 'active' : ''}`}
            onClick={() => setActiveTab('drills')}
          >
            <span className="tab-link-icon">🏋️</span>
            <span>訓練課表</span>
          </button>

          <button
            className={`nav-tab-link ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <span className="tab-link-icon">🧠</span>
            <span>戰術 IQ 測驗</span>
          </button>
        </nav>
      </header>

      {/* ── Hero Banner with Key Takeaways ─────────────────────────────────── */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <span className="hero-live-badge">🔥 戰術專題深度解析</span>
            <span className="hero-tag">Post Entry Passing & Sealing Mechanics</span>
          </div>
          <h2 className="hero-headline">
            從傳球角度、擊地手法，到中鋒下盤鎖腳、目標手與 5v5 剪刀戰術
          </h2>
          <p className="hero-desc">
            比賽結束，技術永存！這是一套專門針對「側翼如何餵球給中鋒」與「中鋒如何卡位要求」的實戰教學庫。
            包含 5 套 SVG 動態推演、肢體力學槓桿、勇士隊 Split Cut、NBA 名人堂影音以及科學特訓課表。
          </p>

          {/* Quick Highlights Row */}
          <div className="hero-stats-row">
            <div className="stat-card">
              <span className="stat-num">5</span>
              <span className="stat-label">套動態戰術推演</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">11+</span>
              <span className="stat-label">項攻防肢體槓桿</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">7</span>
              <span className="stat-label">部權威影音解析</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">4</span>
              <span className="stat-label">套系統化特訓課表</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Dynamic Tab Content ────────────────────────────────────────── */}
      <main className="main-content-area">
        {activeTab === 'tactics' && <PostTacticsBoard />}
        {activeTab === 'mechanics' && <PostMechanicsGuide />}
        {activeTab === 'offense' && <PostOffense5v5 />}
        {activeTab === 'videos' && <VideoLibrary />}
        {activeTab === 'drills' && <DrillStation />}
        {activeTab === 'quiz' && <PostQuiz />}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="footer-section">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-logo">
              <span className="footer-ball">🏀</span>
              <span className="footer-name">HOOPS LAB · 籃球實戰技術分享庫</span>
            </div>
            <p className="footer-tagline">
              專注於現代籃球戰術細節、肢體槓桿力學與高階球商訓練。可在 GitHub Pages 靜態環境直接瀏覽與互動。
            </p>
          </div>

          <div className="footer-keywords-box">
            <span className="kw-heading">核心主題索引 (Tactical Keywords Index):</span>
            <div className="kw-tags-cloud">
              <span className="kw-item">basketball post entry pass</span>
              <span className="kw-item">how to make an entry pass basketball</span>
              <span className="kw-item">wing to post entry pass</span>
              <span className="kw-item">low post entry pass</span>
              <span className="kw-item">post feed basketball</span>
              <span className="kw-item">feeding the post basketball</span>
              <span className="kw-item">basketball post player seal defender</span>
              <span className="kw-item">how to seal defender in the post</span>
              <span className="kw-item">post player target hand basketball</span>
              <span className="kw-item">pass away from defender basketball</span>
              <span className="kw-item">5v5 post entry offense</span>
              <span className="kw-item">basketball post entry drill</span>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 HOOPS LAB · Built for GitHub Pages · Pure Client-Side Static Execution</span>
            <span>Basketball Tactics & Mechanics Playbook</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
