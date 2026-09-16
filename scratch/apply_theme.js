const fs = require('fs');
const path = require('path');

const rootDir = __dirname ? path.resolve(__dirname, '..') : process.cwd();

// --- 1. UPDATE style.css ---
const cssPath = path.join(rootDir, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Font Import
css = css.replace(
  /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?[^']+'\);/g,
  "@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap');"
);

// Header
css = css.replace(
  /\/\* ==========================================================================\s+HASNAIN KHAN[^\*]+\*\//,
  `/* ==========================================================================
   HASNAIN KHAN - OBSIDIAN & ELECTRIC LIME DEVELOPER THEME (#080C10 + #B6FF00)
   Bespoke, high-performance developer portfolio design system
   ========================================================================== */`
);

// Root CSS Variables
const rootTarget = /:root\s*\{[\s\S]*?--transition-slow:[^\;]+;/;
const rootReplacement = `:root {
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

css = css.replace(rootTarget, rootReplacement);

// Color Replacements
css = css.replace(/16,\s*185,\s*129/g, '182, 255, 0');
css = css.replace(/245,\s*166,\s*35/g, '182, 255, 0');
css = css.replace(/#10b981/g, '#b6ff00');
css = css.replace(/#059669/g, '#a3e600');
css = css.replace(/#34d399/g, '#d4ff66');
css = css.replace(/#6ee7b7/g, '#d4ff66');
css = css.replace(/#f5a623/g, '#b6ff00');
css = css.replace(/#ffc875/g, '#d4ff66');

// Background replacements
css = css.replace(/#080c0a/g, '#080c10');
css = css.replace(/#0f1713/g, '#0e1318');
css = css.replace(/#15221c/g, '#141c24');
css = css.replace(/#1d2f26/g, '#1c2631');
css = css.replace(/rgba\(15,\s*23,\s*19,/g, 'rgba(14, 19, 24,');
css = css.replace(/#0a0a0a/g, '#080c10');

// Hero Highlight Gradient
css = css.replace(
  /background:\s*linear-gradient\(135deg,\s*#b6ff00,\s*#d4ff66\);/g,
  'background: linear-gradient(135deg, #b6ff00 0%, #e2ff80 100%);'
);

// High contrast button text for Lime buttons
css = css.replace(
  /\.btn-primary\s*\{\s*background:\s*var\(--gold\);\s*color:\s*#[0-9a-fA-F]+;/g,
  '.btn-primary {\n  background: var(--gold);\n  color: #080c10;\n  font-weight: 700;'
);

css = css.replace(
  /\.nav-item\.active\s*\{\s*background:\s*var\(--gold\);\s*color:\s*#[0-9a-fA-F]+;/g,
  '.nav-item.active {\n  background: var(--gold);\n  color: #080c10;\n  font-weight: 700;'
);

// Add Status Pill styles if not present
if (!css.includes('.hero-status-pill')) {
  css += `
/* ==========================================================================
   DEVELOPER HERO STATUS PILL & BADGES
   ========================================================================== */
.hero-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  background: var(--bg-dark-200);
  border: 1px solid var(--border-gold);
  color: var(--gold);
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 500;
  margin-bottom: 1rem;
  box-shadow: 0 0 15px var(--gold-subtle);
}

.status-dot-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 8px var(--gold);
  animation: statusPulse 2s infinite ease-in-out;
}

@keyframes statusPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.5; }
}

/* ==========================================================================
   ACCESSIBILITY & FOCUS VISIBLE
   ========================================================================== */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--gold) !important;
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
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('style.css transformed successfully!');

// --- 2. UPDATE ALL HTML FILES FOR FONTS & CONTACT CONSISTENCY ---
const htmlFiles = [
  'index.html',
  'about.html',
  'projects.html',
  'skills.html',
  'credentials.html',
  'contact.html',
  'portfolio.html',
  'testimonials.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf8');

  // Update Font links
  html = html.replace(
    /https:\/\/fonts\.googleapis\.com\/css2\?family=Cinzel[^\"]+/g,
    'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap'
  );

  // Synchronize Phone
  html = html.replace(/\+92\s*300\s*0000000/g, '+92 305 311 0575');

  // Synchronize GitHub link
  html = html.replace(/href="https:\/\/github\.com"/g, 'href="https://github.com/hasnainkhan"');

  // Ensure images have lazy loading
  html = html.replace(/<img (?!.*loading=)/g, '<img loading="lazy" decoding="async" ');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${file}`);
});
