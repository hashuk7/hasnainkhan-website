const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('Applying 10 Senior UI/UX & Code Review fixes...');

// ============================================================================
// FIX 1 & 2: STYLE.CSS REFINEMENTS (Theme, Typography, Focus, Buttons, Dock)
// ============================================================================
const cssPath = path.join(rootDir, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Ensure Space Grotesk Google Font Import
css = css.replace(
  /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?[^']+'\);/g,
  "@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap');"
);

// Ensure :root tokens are 100% pure #080C10 + #B6FF00
const rootRegex = /:root\s*\{[\s\S]*?--transition-slow:[^\;]+;/;
const cleanRoot = `:root {
  --bg-dark: #080c10;
  --bg-dark-100: #0e1318;
  --bg-dark-200: #141c24;
  --bg-dark-300: #1c2631;
  --bg-card: #0e1318;
  --bg-card-subtle: rgba(14, 19, 24, 0.75);

  --gold: #b6ff00;
  --accent-lime: #b6ff00;
  --gold-hover: #a3e600;
  --gold-glow: rgba(182, 255, 0, 0.35);
  --gold-dim: rgba(182, 255, 0, 0.12);
  --gold-subtle: rgba(182, 255, 0, 0.05);

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-card: rgba(255, 255, 255, 0.09);
  --border-card-hover: rgba(182, 255, 0, 0.4);
  --border-gold: rgba(182, 255, 0, 0.25);

  --text-white: #ffffff;
  --text-gray-100: #f3f4f6;
  --text-gray-200: #e5e7eb;
  --text-gray-300: #d1d5db;
  --text-gray-400: #9ca3af;
  --text-gray-500: #6b7280;

  --font-serif: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Fira Code', 'Courier New', Courier, monospace;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 26px;
  --radius-full: 9999px;

  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);`;

css = css.replace(rootRegex, cleanRoot);

// Ensure Button text contrast
css = css.replace(
  /\.btn-primary\s*\{[\s\S]*?box-shadow:[^\;]+;/g,
  `.btn-primary {
  background: var(--gold);
  color: #080c10;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(182, 255, 0, 0.25);`
);

// Enhance floating terminal on mobile
css = css.replace(
  /\.terminal-floating-btn\s*\{[\s\S]*?transition:[^\;]+;\s*\}/,
  `.terminal-floating-btn {
  position: fixed;
  bottom: 5.25rem;
  right: 1.25rem;
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.95rem;
  border-radius: var(--radius-full);
  background: rgba(14, 19, 24, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border-gold);
  color: var(--gold);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 15px rgba(182, 255, 0, 0.2);
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
}`
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('style.css updated!');

// ============================================================================
// FIX 3: HERO SECTION IN INDEX.HTML
// ============================================================================
const indexPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const heroTarget = /<!-- Hero Section -->\s*<section class="hero-box">[\s\S]*?<\/section>/;
const heroReplacement = `<!-- Hero Section -->
      <section class="hero-box">
        <div class="hero-status-pill">
          <span class="status-dot-pulse"></span>
          <span>Available for projects · Q2 2026</span>
        </div>
        <p class="hero-greeting">Hello, World! I'm</p>
        <h1 class="hero-main-title">Hasnain <span class="hero-highlight">Khan</span></h1>
        <p class="hero-lead">
          Full-Stack WordPress & Front-End Developer engineering fast, conversion-optimized web applications, custom institutional portals, and intelligent AI chatbots.
        </p>
        <div class="hero-actions">
          <a href="projects.html" class="btn btn-primary">
            Explore Selected Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="contact.html" class="btn btn-secondary">Get in Touch</a>
        </div>
      </section>`;

indexHtml = indexHtml.replace(heroTarget, heroReplacement);
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('index.html hero section enhanced!');

// ============================================================================
// FIX 6 & 8: SYNCHRONIZE DATA ACROSS ALL MAIN PAGES & CASE STUDIES
// ============================================================================
const fontLinkTarget = /https:\/\/fonts\.googleapis\.com\/css2\?family=Cinzel[^\"]+/g;
const fontLinkReplacement = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap';

function processHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Update fonts
  content = content.replace(fontLinkTarget, fontLinkReplacement);

  // Synchronize Phone
  content = content.replace(/\+92\s*300\s*0000000/g, '+92 305 311 0575');

  // Synchronize GitHub link
  content = content.replace(/href="https:\/\/github\.com"/g, 'href="https://github.com/hasnainkhan"');

  // Add lazy loading
  content = content.replace(/<img (?!.*loading=)/g, '<img loading="lazy" decoding="async" ');

  fs.writeFileSync(filePath, content, 'utf8');
}

const mainPages = [
  'index.html',
  'about.html',
  'projects.html',
  'skills.html',
  'credentials.html',
  'contact.html',
  'portfolio.html',
  'testimonials.html'
];

mainPages.forEach(file => processHtmlFile(path.join(rootDir, file)));

const caseDir = path.join(rootDir, 'case-studies');
if (fs.existsSync(caseDir)) {
  fs.readdirSync(caseDir).forEach(file => {
    if (file.endsWith('.html')) {
      processHtmlFile(path.join(caseDir, file));
    }
  });
}

console.log('All pages processed and synchronized!');
