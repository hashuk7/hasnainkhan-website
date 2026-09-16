const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// ============================================================================
// 1. GENERATE REFINED, ORGANIZED, PRODUCTION-READY style.css
// ============================================================================

const cssContent = `/* ==========================================================================
   HASNAIN KHAN — PORTFOLIO DESIGN SYSTEM
   Dark #080C10 + Lime #B6FF00 Personal Developer Theme
   Pure Vanilla CSS · Zero Dependencies · High Performance
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

/* --- 1. DESIGN TOKENS --- */
:root {
  /* Core Color System */
  --bg: #080C10;
  --surface: #10161D;
  --surface-light: #151D26;
  --text: #F5F7FA;
  --text-muted: #8B98A7;
  --accent: #B6FF00;
  --accent-hover: #D2FF4D;
  --border: #222D38;

  /* Aliases & Complementary Tokens */
  --bg-dark: var(--bg);
  --bg-dark-100: var(--surface);
  --bg-dark-200: var(--surface-light);
  --bg-dark-300: #1B2530;
  --bg-card: var(--surface);
  --bg-card-subtle: rgba(16, 22, 29, 0.85);

  --gold: var(--accent);
  --accent-lime: var(--accent);
  --gold-hover: var(--accent-hover);
  --gold-glow: rgba(182, 255, 0, 0.22);
  --gold-dim: rgba(182, 255, 0, 0.08);
  --gold-subtle: rgba(182, 255, 0, 0.03);

  --border-subtle: var(--border);
  --border-card: var(--border);
  --border-card-hover: rgba(182, 255, 0, 0.35);
  --border-gold: rgba(182, 255, 0, 0.22);

  --text-white: var(--text);
  --text-gray-100: #E6EDF5;
  --text-gray-200: #D0DBE5;
  --text-gray-300: #9EABB8;
  --text-gray-400: var(--text-muted);
  --text-gray-500: #687787;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Border Radii */
  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --radius-full: 9999px;

  /* Transitions */
  --transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* --- 2. RESET & GLOBAL BASE --- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  color-scheme: dark;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: var(--bg);
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.7;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Subtle Technical Background Grid & Vignette */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: 
    radial-gradient(circle at 18% 15%, rgba(182, 255, 0, 0.035) 0%, transparent 42%),
    radial-gradient(circle at 82% 80%, rgba(182, 255, 0, 0.02) 0%, transparent 48%),
    linear-gradient(to right, rgba(255, 255, 255, 0.012) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.012) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 48px 48px, 48px 48px;
  pointer-events: none;
  z-index: 0;
}

a {
  color: inherit;
  text-decoration: none;
  transition: var(--transition);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
  transition: var(--transition);
}

/* --- 3. TYPOGRAPHY SCALE --- */
h1, h2, h3, h4, h5, h6 {
  color: var(--text);
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

p {
  color: var(--text-muted);
  font-size: 16px;
  line-height: 1.75;
}

.eyebrow {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(1.85rem, 3.5vw, 2.5rem);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.section-desc {
  color: var(--text-muted);
  font-size: 15.5px;
  max-width: 620px;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

/* --- 4. SITE LOADER --- */
.site-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}

.site-loader.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.loader-scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(182, 255, 0, 0.015) 2px,
    rgba(182, 255, 0, 0.015) 4px
  );
}

.loader-monogram {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 6vw, 40px);
  transition: gap 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.loader-letter {
  font-family: var(--font-display);
  font-size: clamp(54px, 14vw, 84px);
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
  text-shadow: 0 0 35px var(--gold-glow);
  letter-spacing: -0.04em;
}

.loader-pulse-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 16px var(--accent);
  animation: pulseDot 1.4s infinite ease-in-out;
}

.loader-caption {
  margin-top: 20px;
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--text-muted);
}

@keyframes pulseDot {
  0%, 100% { transform: scale(0.85); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 1; }
}

/* --- 5. FLOATING DESKTOP NAVBAR --- */
.floating-navbar {
  position: fixed;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: none;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.5rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: rgba(16, 22, 29, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
}

@media (min-width: 1024px) {
  .floating-navbar {
    display: flex;
  }
}

.nav-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-muted);
  transition: var(--transition);
}

.nav-item:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

.nav-item.active {
  background: var(--accent);
  color: #080C10;
  font-weight: 700;
  box-shadow: 0 2px 12px var(--gold-glow);
}

.nav-item svg {
  width: 15px;
  height: 15px;
}

/* --- 6. MOBILE BOTTOM DOCK NAVBAR --- */
.mobile-bottom-nav {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: calc(100% - 1.5rem);
  max-width: 440px;
  padding: 0.45rem 0.6rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: rgba(16, 22, 29, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
}

@media (min-width: 1024px) {
  .mobile-bottom-nav {
    display: none;
  }
}

.mobile-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.35rem 0.2rem;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.mobile-nav-item svg {
  width: 18px;
  height: 18px;
}

.mobile-nav-item:hover,
.mobile-nav-item.active {
  color: var(--accent);
}

/* --- 7. MAIN LAYOUT & CONTAINER --- */
.site-layout {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 6.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .site-layout {
    flex-direction: row;
    align-items: flex-start;
    padding: 5.5rem 1.5rem 4rem;
    gap: 2.5rem;
  }
}

.main-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

/* --- 8. PROFILE SIDEBAR --- */
.profile-sidebar {
  width: 100%;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (min-width: 1024px) {
  .profile-sidebar {
    width: 280px;
    flex-shrink: 0;
    position: sticky;
    top: 5.25rem;
    z-index: 40;
  }
  .profile-sidebar.collapsed {
    width: 84px;
  }
}

.sidebar-inner-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.sidebar-inner-card:hover {
  border-color: var(--border-card-hover);
}

/* Collapsed view */
.sidebar-collapsed-view {
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0.6rem;
  gap: 1.25rem;
  cursor: pointer;
  width: 84px;
  user-select: none;
}

@media (min-width: 1024px) {
  .profile-sidebar.collapsed .sidebar-collapsed-view {
    display: flex;
  }
  .profile-sidebar.collapsed .sidebar-expanded-view {
    display: none;
  }
}

.sidebar-mini-avatar {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--surface-light);
  transition: var(--transition);
}

.sidebar-collapsed-view:hover .sidebar-mini-avatar,
.sidebar-header-row:hover .sidebar-mini-avatar {
  border-color: var(--accent);
  box-shadow: 0 0 14px var(--gold-glow);
}

.mini-avatar-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.sidebar-vertical-title {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  color: var(--accent);
  font-size: 10.5px;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  white-space: nowrap;
  padding: 1rem 0;
}

.sidebar-toggle-arrow {
  color: var(--text-muted);
  font-size: 1.25rem;
  line-height: 1;
  transition: var(--transition);
}

.sidebar-collapsed-view:hover .sidebar-toggle-arrow {
  transform: translateX(3px);
  color: var(--accent);
}

/* Expanded view */
.sidebar-expanded-view {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.25rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: background-color 0.2s ease;
  user-select: none;
}

.sidebar-header-row:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

.sidebar-header-meta {
  flex: 1;
  min-width: 0;
}

.sidebar-header-name {
  color: var(--text);
  font-weight: 700;
  font-size: 15px;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-header-pill {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--accent);
  background: var(--surface-light);
  border: 1px solid rgba(182, 255, 0, 0.2);
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
  margin-top: 0.35rem;
  display: inline-block;
  font-weight: 500;
}

.sidebar-collapse-chevron {
  color: var(--text-muted);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  transform: rotate(180deg);
  transition: var(--transition);
}

.sidebar-header-row:hover .sidebar-collapse-chevron {
  color: var(--accent);
  transform: rotate(180deg) translateX(2px);
}

.sidebar-details-list {
  padding: 1.15rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.sidebar-detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sidebar-detail-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--surface-light);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}

.sidebar-detail-icon svg {
  width: 15px;
  height: 15px;
}

.sidebar-detail-meta {
  flex: 1;
  min-width: 0;
}

.sidebar-detail-label {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--text-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
}

.sidebar-detail-val-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
}

.sidebar-detail-val {
  font-size: 13px;
  color: var(--text);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 3px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.copy-btn:hover {
  color: var(--accent);
  background: var(--surface-light);
}

.copy-btn svg {
  width: 14px;
  height: 14px;
}

.copy-btn .check-icon {
  display: none;
  color: var(--accent);
}

.copy-btn.copied .copy-icon {
  display: none;
}

.copy-btn.copied .check-icon {
  display: block;
}

.sidebar-socials-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.9rem 1.25rem;
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.sidebar-social-link {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.sidebar-social-link:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.sidebar-social-link svg {
  width: 17px;
  height: 17px;
}

/* --- 9. HERO SECTION --- */
.hero-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.75rem 2.25rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

@media (max-width: 640px) {
  .hero-box {
    padding: 2rem 1.5rem;
  }
}

.hero-box::after {
  content: "";
  position: absolute;
  top: -60px;
  right: -60px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--gold-dim), transparent 70%);
  pointer-events: none;
}

.hero-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  background: var(--surface-light);
  border: 1px solid var(--border-gold);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 1.25rem;
}

.status-dot-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: statusPulse 2s infinite ease-in-out;
}

@keyframes statusPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.5; }
}

.hero-greeting {
  font-family: var(--font-mono);
  font-size: 13.5px;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero-main-title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  color: var(--text);
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}

.hero-highlight {
  color: var(--accent);
  background: linear-gradient(135deg, var(--accent) 0%, #D2FF4D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-lead {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: 2rem;
  max-width: 660px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem;
}

/* --- 10. BUTTON SYSTEM --- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-size: 14.5px;
  font-weight: 600;
  transition: var(--transition);
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background: var(--accent);
  color: #080C10;
  font-weight: 700;
  box-shadow: 0 4px 16px var(--gold-glow);
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(182, 255, 0, 0.35);
}

.btn-secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--gold-subtle);
  transform: translateY(-2px);
}

/* --- 11. STATS GRID --- */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.4rem 1.15rem;
  text-align: center;
  transition: var(--transition);
}

.stat-card:hover {
  border-color: var(--border-card-hover);
  background: var(--surface-light);
  transform: translateY(-3px);
}

.stat-num {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--accent);
  line-height: 1.15;
  margin-bottom: 0.3rem;
  letter-spacing: -0.03em;
}

.stat-label {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* --- 12. PROJECTS BENTO SHOWCASE --- */
.projects-bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .projects-bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .project-bento-card.large {
    grid-column: span 2;
  }
}

.project-bento-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: var(--transition);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.project-bento-card:hover {
  border-color: var(--border-card-hover);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
}

.project-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--surface-light);
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}

.project-bento-card.large .project-img-wrap {
  aspect-ratio: 16 / 8.5;
}

.project-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-bento-card:hover .project-cover-img {
  transform: scale(1.03);
}

.project-badge-float {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(8, 12, 16, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
}

.project-body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.project-category {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--text-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.project-year {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--text-gray-500);
}

.project-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.65rem;
  letter-spacing: -0.02em;
}

.project-desc {
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 1.25rem;
  flex: 1;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--text-gray-200);
  background: var(--surface-light);
  border: 1px solid var(--border);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.project-bento-card:hover .tech-tag {
  border-color: rgba(182, 255, 0, 0.18);
}

.project-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.project-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--accent);
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-md);
  background: var(--surface-light);
  border: 1px solid var(--border);
  transition: var(--transition);
}

.project-link-btn:hover {
  background: var(--accent);
  color: #080C10;
  border-color: var(--accent);
}

.project-link-secondary {
  color: var(--text-muted);
}

.project-link-secondary:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

/* --- 13. SERVICES SECTION --- */
.services-bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-top: 1rem;
}

@media (min-width: 640px) {
  .services-bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.service-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: var(--transition);
}

.service-card:hover {
  border-color: var(--border-card-hover);
  background: var(--surface-light);
  transform: translateY(-3px);
}

.service-num {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
}

.service-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
}

.service-desc {
  font-size: 14.5px;
  color: var(--text-muted);
  line-height: 1.65;
}

/* --- 14. ABOUT & TWO-COLUMN HIGHLIGHTS --- */
.about-two-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.25rem;
}

@media (min-width: 768px) {
  .about-two-col {
    grid-template-columns: 1.2fr 1fr;
    gap: 2.5rem;
  }
}

.about-story p {
  margin-bottom: 1.25rem;
  font-size: 15.5px;
  line-height: 1.75;
}

.about-story p:last-child {
  margin-bottom: 0;
}

.skills-tags-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1rem;
}

.skill-pill {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-gray-200);
  background: var(--surface-light);
  border: 1px solid var(--border);
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.skill-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

/* --- 15. TERMINAL CLI MODAL & FLOATING BUTTON --- */
.terminal-floating-btn {
  position: fixed;
  bottom: 5.25rem;
  right: 1.25rem;
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.95rem;
  border-radius: var(--radius-full);
  background: rgba(16, 22, 29, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: var(--transition);
}

@media (min-width: 1024px) {
  .terminal-floating-btn {
    bottom: 2rem;
    right: 2rem;
    padding: 0.65rem 1.15rem;
    font-size: 12.5px;
  }
}

.terminal-floating-btn:hover {
  background: var(--accent);
  color: #080C10;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--gold-glow);
}

.terminal-floating-btn svg {
  width: 15px;
  height: 15px;
}

.terminal-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(8, 12, 16, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

.terminal-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.terminal-window {
  width: 100%;
  max-width: 680px;
  height: 440px;
  max-height: 85vh;
  background: #080C10;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px var(--gold-dim);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--font-mono);
}

.terminal-header {
  height: 38px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.terminal-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.terminal-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

.terminal-dot.close { background: #ff5f56; }
.terminal-dot.min { background: #ffbd2e; }
.terminal-dot.max { background: #27c93f; }

.terminal-title {
  font-size: 11.5px;
  color: var(--text-gray-400);
}

.terminal-body {
  flex: 1;
  padding: 1.15rem;
  overflow-y: auto;
  font-size: 13px;
  color: var(--text-gray-100);
  line-height: 1.6;
  display: flex;
  flex-direction: column;
}

.terminal-output {
  white-space: pre-wrap;
  word-break: break-word;
}

.terminal-output .highlight {
  color: var(--accent);
}

.terminal-prompt-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.terminal-prompt {
  color: var(--accent);
  font-weight: 600;
  white-space: nowrap;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  caret-color: var(--accent);
}

/* --- 16. CONTACT & MODAL --- */
.contact-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(8, 12, 16, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

.contact-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.contact-modal-card {
  width: 100%;
  max-width: 520px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.25rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8);
  position: relative;
}

.modal-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface-light);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  cursor: pointer;
}

.modal-close-btn:hover {
  color: var(--text);
  border-color: var(--accent);
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--text-gray-300);
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input,
.form-textarea {
  width: 100%;
  background: var(--surface-light);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-family: var(--font-sans);
  font-size: 14.5px;
  color: var(--text);
  outline: none;
  transition: var(--transition);
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--gold-glow);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* --- 17. FINAL FOOTER CTA & FOOTER --- */
.site-footer-cta {
  background: linear-gradient(135deg, var(--surface) 0%, var(--surface-light) 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.site-footer-cta h3 {
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  color: var(--text);
  margin-bottom: 0.75rem;
}

.site-footer-cta p {
  color: var(--text-muted);
  font-size: 15.5px;
  max-width: 520px;
  margin: 0 auto 1.75rem;
}

.site-footer {
  margin-top: 4rem;
  border-top: 1px solid var(--border);
  background: var(--bg);
  padding: 3.5rem 1.5rem 2rem;
  color: var(--text-muted);
}

.footer-top {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 2rem;
  padding-bottom: 2rem;
}

@media (max-width: 768px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.footer-links,
.footer-right {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 14px;
}

.footer-links a:hover,
.footer-right a:hover {
  color: var(--accent);
}

.footer-bottom {
  max-width: 1100px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.5rem;
  font-size: 13px;
  color: var(--text-gray-500);
  text-align: center;
}

/* --- 18. FILTER TABS (Projects page) --- */
.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filter-tab {
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text-muted);
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: var(--transition);
}

.filter-tab:hover {
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.15);
}

.filter-tab.active {
  background: var(--accent);
  color: #080C10;
  font-weight: 700;
  border-color: var(--accent);
  box-shadow: 0 2px 10px var(--gold-glow);
}

/* --- 19. ACCESSIBILITY & REDUCED MOTION --- */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--accent) !important;
  outline-offset: 3px !important;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

fs.writeFileSync(path.join(rootDir, 'style.css'), cssContent, 'utf8');
console.log('style.css rebuilt successfully with full Dark #080C10 + Lime #B6FF00 spec!');

// ============================================================================
// 2. REFINE index.html WITH EXACT CONTENT & POLISHED SECTIONS
// ============================================================================

const indexHtml = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hasnain Khan — WordPress & Front-End Developer</title>
  <meta name="description"
    content="Personal developer portfolio of Hasnain Khan. Specialized in high-performance WordPress architecture, custom front-end development, and AI chatbot integrations." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>

  <!-- Site Intro Loader (Plays once per session) -->
  <div id="site-loader" class="site-loader">
    <div class="loader-scanlines"></div>
    <div class="loader-monogram">
      <span class="loader-letter">H</span>
      <span class="loader-letter right">K</span>
      <div class="loader-pulse-dot"></div>
    </div>
    <div class="loader-caption">Hasnain Khan · Developer Portfolio</div>
  </div>

  <!-- Floating Desktop Top Navigation -->
  <nav class="floating-navbar" aria-label="Main navigation">
    <a href="index.html" class="nav-item active" aria-label="Home">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    </a>
    <a href="about.html" class="nav-item">About</a>
    <a href="projects.html" class="nav-item">Projects</a>
    <a href="skills.html" class="nav-item">Skills</a>
    <a href="credentials.html" class="nav-item">Credentials</a>
    <a href="contact.html" class="nav-item">Contact</a>
  </nav>

  <!-- Mobile Floating Bottom Dock -->
  <nav class="mobile-bottom-nav" aria-label="Mobile navigation">
    <a href="index.html" class="mobile-nav-item active">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
      <span>Home</span>
    </a>
    <a href="about.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="7" r="4" />
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      </svg>
      <span>About</span>
    </a>
    <a href="projects.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
      <span>Projects</span>
    </a>
    <a href="skills.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
      <span>Skills</span>
    </a>
    <a href="credentials.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="8" r="6" />
        <path d="m15.5 13 1.5 8.5-5-2.5-5 2.5 1.5-8.5" />
      </svg>
      <span>Creds</span>
    </a>
    <a href="contact.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
      <span>Contact</span>
    </a>
  </nav>

  <!-- Layout Container -->
  <div class="site-layout">
    
    <!-- Collapsible Desktop Profile Sidebar -->
    <aside id="collapsible-sidebar" class="profile-sidebar">
      <div class="sidebar-inner-card">

        <!-- Collapsed View (Click to expand) -->
        <div class="sidebar-collapsed-view" id="sidebar-expand-trigger" title="Click to expand profile">
          <div class="sidebar-mini-avatar">
            <span class="mini-avatar-text">HK</span>
          </div>
          <div class="sidebar-vertical-title">Software Developer</div>
          <div class="sidebar-toggle-arrow">›</div>
        </div>

        <!-- Expanded View (Click header to collapse) -->
        <div class="sidebar-expanded-view">
          <!-- Top Header Row -->
          <div class="sidebar-header-row" id="sidebar-collapse-trigger" title="Click to collapse profile">
            <div class="sidebar-mini-avatar">
              <span class="mini-avatar-text">HK</span>
            </div>
            <div class="sidebar-header-meta">
              <h2 class="sidebar-header-name">Hasnain Khan</h2>
              <span class="sidebar-header-pill">WordPress & Front-End</span>
            </div>
            <div class="sidebar-collapse-chevron" title="Collapse">›</div>
          </div>

          <!-- Contact Details List -->
          <div class="sidebar-details-list">
            <div class="sidebar-detail-item">
              <div class="sidebar-detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div class="sidebar-detail-meta">
                <span class="sidebar-detail-label">EMAIL</span>
                <div class="sidebar-detail-val-row">
                  <span class="sidebar-detail-val">hasnainkhanreal18@gmail.com</span>
                  <button type="button" id="copy-email-btn" class="copy-btn" title="Copy email address"
                    aria-label="Copy email">
                    <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="sidebar-detail-item">
              <div class="sidebar-detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div class="sidebar-detail-meta">
                <span class="sidebar-detail-label">PHONE</span>
                <span class="sidebar-detail-val">+92 305 311 0575</span>
              </div>
            </div>

            <div class="sidebar-detail-item">
              <div class="sidebar-detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path
                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div class="sidebar-detail-meta">
                <span class="sidebar-detail-label">PORTFOLIO</span>
                <span class="sidebar-detail-val">hasnainkhan.dev</span>
              </div>
            </div>

            <div class="sidebar-detail-item">
              <div class="sidebar-detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div class="sidebar-detail-meta">
                <span class="sidebar-detail-label">LOCATION</span>
                <span class="sidebar-detail-val">Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          <!-- Bottom Socials Row -->
          <div class="sidebar-socials-row">
            <a href="mailto:hasnainkhanreal18@gmail.com" class="sidebar-social-link" title="Email" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a href="https://hasnainkhan.dev" target="_blank" rel="noreferrer" class="sidebar-social-link"
              title="Website" aria-label="Website">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </a>
            <a href="https://github.com/hasnainkhan" target="_blank" rel="noreferrer" class="sidebar-social-link" title="GitHub"
              aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/hasnainkhan18" target="_blank" rel="noreferrer" class="sidebar-social-link"
              title="LinkedIn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">

      <!-- Hero Section -->
      <section class="hero-box">
        <div class="hero-status-pill">
          <span class="status-dot-pulse"></span>
          <span>Available for new projects</span>
        </div>
        <p class="hero-greeting">Hasnain Khan · WordPress & Front-End Developer</p>
        <h1 class="hero-main-title">
          BUILDING <span class="hero-highlight">FAST & MODERN</span> WEB EXPERIENCES.
        </h1>
        <p class="hero-lead">
          I build high-performance WordPress architectures, custom front-end interfaces, and conversion-focused web solutions that make businesses look premium, load instantly, and turn visitors into clients.
        </p>
        <div class="hero-actions">
          <a href="projects.html" class="btn btn-primary">
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="contact.html" class="btn btn-secondary">Let's Talk</a>
        </div>
      </section>

      <!-- Section 01: By The Numbers (Metrics) -->
      <section>
        <p class="eyebrow">01 — METRICS</p>
        <h2 class="section-title">Proven Track Record</h2>
        <div class="stats-grid" style="margin-top: 1.25rem;">
          <div class="stat-card">
            <div class="stat-num">3+</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">30+</div>
            <div class="stat-label">Projects Delivered</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">100%</div>
            <div class="stat-label">Client Satisfaction</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">5★</div>
            <div class="stat-label">Average Rating</div>
          </div>
        </div>
      </section>

      <!-- Section 02: Selected Projects (Bento Showcase) -->
      <section>
        <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 1.25rem;">
          <div>
            <p class="eyebrow">02 — FEATURED WORK</p>
            <h2 class="section-title">Selected Projects</h2>
          </div>
          <a href="projects.html" class="project-link-btn" style="display: inline-flex; align-items: center; gap: 4px;">
            View All Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>

        <div class="projects-bento-grid">

          <!-- Project 1: SRMC (Large) -->
          <article class="project-bento-card large">
            <div class="project-img-wrap">
              <img loading="lazy" decoding="async" src="images/srmc.png" alt="Suleman Roshan Medical College Website"
                class="project-cover-img" />
              <span class="project-badge-float">Institutional Portal</span>
            </div>
            <div class="project-body">
              <div class="project-meta-row">
                <span class="project-category">Custom Full-Stack · Higher Education</span>
                <span class="project-year">2026</span>
              </div>
              <h3 class="project-title">Suleman Roshan Medical College</h3>
              <p class="project-desc">
                Custom institutional web platform for srmc.edu.pk, engineered from the ground up to present academic programs, prospective student admissions, clinical departments, and institutional credibility with lightning-fast speeds.
              </p>
              <div class="tech-tags">
                <span class="tech-tag">Custom Full-Stack</span>
                <span class="tech-tag">PHP / MySQL</span>
                <span class="tech-tag">Custom CSS</span>
                <span class="tech-tag">Admissions Flow</span>
              </div>
              <div class="project-actions">
                <a href="https://srmc.edu.pk/" target="_blank" rel="noreferrer" class="project-link-btn">
                  View Live →
                </a>
                <a href="case-studies/medical-college-website.html" class="project-link-btn project-link-secondary">
                  Case Study
                </a>
              </div>
            </div>
          </article>

          <!-- Project 2: QEC Portal -->
          <article class="project-bento-card">
            <div class="project-img-wrap">
              <img loading="lazy" decoding="async" src="images/dashboard-qec.png" alt="QEC Quality Assurance Portal" class="project-cover-img" />
              <span class="project-badge-float">Internal Portal</span>
            </div>
            <div class="project-body">
              <div class="project-meta-row">
                <span class="project-category">WordPress · Quality Assurance</span>
                <span class="project-year">2025</span>
              </div>
              <h3 class="project-title">QEC Quality Assurance Portal</h3>
              <p class="project-desc">
                Institutional QA portal for managing course reviews, faculty evaluations, and compliance reporting with role-based dashboard workflows.
              </p>
              <div class="tech-tags">
                <span class="tech-tag">WordPress / PHP</span>
                <span class="tech-tag">Dashboard UI</span>
                <span class="tech-tag">Data Reporting</span>
              </div>
              <div class="project-actions">
                <a href="case-studies/qec-portal.html" class="project-link-btn">
                  Case Study →
                </a>
                <a href="contact.html" class="project-link-btn project-link-secondary">
                  Discuss Project
                </a>
              </div>
            </div>
          </article>

          <!-- Project 3: HMIS Project -->
          <article class="project-bento-card">
            <div class="project-img-wrap">
              <img loading="lazy" decoding="async" src="images/hmis-project.jpeg" alt="HMIS Healthcare System" class="project-cover-img" />
              <span class="project-badge-float">Healthcare UI</span>
            </div>
            <div class="project-body">
              <div class="project-meta-row">
                <span class="project-category">Healthcare · UI/UX</span>
                <span class="project-year">2025</span>
              </div>
              <h3 class="project-title">HMIS Healthcare System</h3>
              <p class="project-desc">
                Hospital management interface handling patient scheduling, electronic medical records, billing modules, and departmental reporting.
              </p>
              <div class="tech-tags">
                <span class="tech-tag">Front-End UI</span>
                <span class="tech-tag">Healthcare Records</span>
                <span class="tech-tag">Workflows</span>
              </div>
              <div class="project-actions">
                <a href="case-studies/hmis-project.html" class="project-link-btn">
                  Case Study →
                </a>
                <a href="contact.html" class="project-link-btn project-link-secondary">
                  Discuss Project
                </a>
              </div>
            </div>
          </article>

        </div>
      </section>

      <!-- Section 03: Services (What I Build) -->
      <section>
        <p class="eyebrow">03 — SERVICES</p>
        <h2 class="section-title">What I Build</h2>
        <p class="section-desc">
          Specialized web solutions tailored to build brand authority, automate workflows, and convert visitors into long-term clients.
        </p>

        <div class="services-bento-grid">
          <div class="service-card">
            <span class="service-num">01 / CMS</span>
            <h3 class="service-title">WordPress Development</h3>
            <p class="service-desc">
              Custom-crafted WordPress themes, Elementor Pro architecture, and tailored plugins engineered for service businesses and founders.
            </p>
          </div>

          <div class="service-card">
            <span class="service-num">02 / FRONT-END</span>
            <h3 class="service-title">Front-End Engineering</h3>
            <p class="service-desc">
              Clean semantic HTML5, CSS3/SCSS, and modern JavaScript builds featuring responsive mobile-first performance and fluid interactions.
            </p>
          </div>

          <div class="service-card">
            <span class="service-num">03 / COMMERCE</span>
            <h3 class="service-title">WooCommerce & Shopify</h3>
            <p class="service-desc">
              High-converting e-commerce storefronts, customized checkouts, product upsells, and payment gateway integrations.
            </p>
          </div>

          <div class="service-card">
            <span class="service-num">04 / PERFORMANCE</span>
            <h3 class="service-title">Speed Optimization & SEO</h3>
            <p class="service-desc">
              Audit and tune Core Web Vitals, asset minification, image compression, and caching strategies for sub-second page loads.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 04: About & Tech Highlights (Two-Column Layout) -->
      <section>
        <p class="eyebrow">04 — ABOUT</p>
        <h2 class="section-title">Engineering with Purpose</h2>
        <div class="about-two-col" style="margin-top: 1.25rem;">
          <div class="about-story">
            <p>
              I am a WordPress & Front-End Developer with over 3 years of hands-on experience delivering robust web platforms for institutions, brands, and service businesses worldwide.
            </p>
            <p>
              My focus is simple: build websites that look exceptionally modern, load at lightning speed, and convert traffic into measurable business growth. I bridge the gap between design precision and rock-solid backend architecture.
            </p>
          </div>
          <div class="about-skills-sidebar">
            <span class="eyebrow" style="margin-bottom: 0.75rem;">CORE TECH STACK</span>
            <div class="skills-tags-cluster">
              <span class="skill-pill">WordPress</span>
              <span class="skill-pill">Elementor Pro</span>
              <span class="skill-pill">WooCommerce</span>
              <span class="skill-pill">HTML5</span>
              <span class="skill-pill">CSS3 / SCSS</span>
              <span class="skill-pill">JavaScript (ES6+)</span>
              <span class="skill-pill">PHP / MySQL</span>
              <span class="skill-pill">Responsive Design</span>
              <span class="skill-pill">Speed Optimization</span>
              <span class="skill-pill">AI Chatbots</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 05: Final CTA -->
      <section class="site-footer-cta">
        <p class="eyebrow">05 — GET IN TOUCH</p>
        <h3>Have a project in mind?</h3>
        <p>
          Let's build something that works. Reach out today to discuss your next web build or custom front-end architecture.
        </p>
        <a href="contact.html" class="btn btn-primary">
          Start a Conversation →
        </a>
      </section>

    </main>
  </div>

  <!-- Floating Terminal Button -->
  <button id="open-terminal-btn" class="terminal-floating-btn" aria-label="Open Interactive Developer Terminal">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
    <span>Terminal CLI</span>
  </button>

  <!-- Terminal Modal Overlay -->
  <div id="terminal-modal" class="terminal-modal-overlay" role="dialog" aria-modal="true"
    aria-label="Interactive Terminal">
    <div class="terminal-window">
      <div class="terminal-header">
        <div class="terminal-controls">
          <button type="button" id="terminal-close-btn" class="terminal-dot close" title="Close" aria-label="Close terminal"></button>
          <span class="terminal-dot min" aria-hidden="true"></span>
          <span class="terminal-dot max" aria-hidden="true"></span>
        </div>
        <div class="terminal-title">hasnain@portfolio:~ (zsh)</div>
        <div style="width: 40px;"></div>
      </div>
      <div class="terminal-body">
        <div class="terminal-output" id="terminal-output">Initializing Khan.portfolio CLI v1.0...
Modules loaded: [WordPress, FrontEnd, WooCommerce, AI-Chatbot]
Connected. Type <span class="highlight">'help'</span> for available commands.</div>
        <div class="terminal-prompt-line">
          <span class="terminal-prompt">khan:~$</span>
          <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" />
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Contact Modal Overlay -->
  <div id="quick-contact-modal" class="contact-modal-overlay" role="dialog" aria-modal="true">
    <div class="contact-modal-card">
      <button id="quick-contact-close" class="modal-close-btn" aria-label="Close modal">✕</button>
      <h3 style="font-size: 1.3rem; color: #F5F7FA; margin-bottom: 0.5rem;">Quick Message</h3>
      <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 1.25rem;">
        Send a note directly to Hasnain. You'll receive a response within hours.
      </p>
      <form id="quick-contact-form">
        <div class="form-group">
          <label class="form-label" for="qc-name">Your Name</label>
          <input type="text" id="qc-name" class="form-input" required placeholder="John Doe" />
        </div>
        <div class="form-group">
          <label class="form-label" for="qc-email">Email Address</label>
          <input type="email" id="qc-email" class="form-input" required placeholder="john@example.com" />
        </div>
        <div class="form-group">
          <label class="form-label" for="qc-msg">Message</label>
          <textarea id="qc-msg" class="form-textarea" required placeholder="Tell me about your project..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
        <div class="form-status"></div>
      </form>
    </div>
  </div>

  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="footer-top">
      <div>
        <p style="color: var(--text); font-weight: 700; font-size: 16px;">Hasnain Khan</p>
        <p style="font-size: 14px; margin-top: 0.35rem; color: var(--text-muted);">
          WordPress & Front-End Developer · Available for remote projects worldwide
        </p>
      </div>
      <div class="footer-links">
        <span class="eyebrow" style="margin-bottom: 0.2rem;">NAVIGATION</span>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="skills.html">Skills</a>
        <a href="credentials.html">Credentials</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-right">
        <span class="eyebrow" style="margin-bottom: 0.2rem;">CONNECT</span>
        <a href="mailto:hasnainkhanreal18@gmail.com">hasnainkhanreal18@gmail.com</a>
        <a href="https://linkedin.com/in/hasnainkhan18" target="_blank" rel="noreferrer">linkedin.com/in/hasnainkhan18</a>
        <a href="https://github.com/hasnainkhan" target="_blank" rel="noreferrer">github.com/hasnainkhan</a>
      </div>
    </div>
    <div class="footer-bottom">
      © 2026 Hasnain Khan · Built with performance & care
    </div>
  </footer>

  <script src="script.js"></script>
</body>

</html>
`;

fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
console.log('index.html updated successfully!');

// ============================================================================
// 3. SYNCHRONIZE ALL OTHER PAGES (about, projects, skills, credentials, contact)
// ============================================================================

const fontHead = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap';

const otherPages = ['about.html', 'projects.html', 'skills.html', 'credentials.html', 'contact.html', 'portfolio.html', 'testimonials.html'];

otherPages.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf8');

  // Font links
  html = html.replace(/https:\/\/fonts\.googleapis\.com\/css2\?[^"]+/g, fontHead);

  // Phone
  html = html.replace(/\+92\s*300\s*0000000/g, '+92 305 311 0575');

  // GitHub link
  html = html.replace(/href="https:\/\/github\.com"/g, 'href="https://github.com/hasnainkhan"');

  // Lazy loading on images
  html = html.replace(/<img (?!.*loading=)/g, '<img loading="lazy" decoding="async" ');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Synchronized ${file}`);
});

console.log('All updates finished successfully!');
