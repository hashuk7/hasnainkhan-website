const fs = require('fs');
const path = require('path');

const caseStudiesDir = path.join(__dirname, '..', 'case-studies');
const files = fs.readdirSync(caseStudiesDir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} case study files to upgrade.`);

const floatingNav = `  <!-- Floating Desktop Top Navigation -->
  <nav class="floating-navbar" aria-label="Main navigation">
    <a href="../index.html" class="nav-item" aria-label="Home">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
    </a>
    <a href="../about.html" class="nav-item">About</a>
    <a href="../projects.html" class="nav-item active">Projects</a>
    <a href="../skills.html" class="nav-item">Skills</a>
    <a href="../credentials.html" class="nav-item">Credentials</a>
    <a href="../contact.html" class="nav-item">Contact</a>
  </nav>

  <!-- Mobile Floating Bottom Dock -->
  <nav class="mobile-bottom-nav" aria-label="Mobile navigation">
    <a href="../index.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      <span>Home</span>
    </a>
    <a href="../about.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/></svg>
      <span>About</span>
    </a>
    <a href="../projects.html" class="mobile-nav-item active">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      <span>Projects</span>
    </a>
    <a href="../skills.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      <span>Skills</span>
    </a>
    <a href="../credentials.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="m15.5 13 1.5 8.5-5-2.5-5 2.5 1.5-8.5"/></svg>
      <span>Creds</span>
    </a>
    <a href="../contact.html" class="mobile-nav-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      <span>Contact</span>
    </a>
  </nav>`;

const breadcrumbReplacement = `<div class="case-study-breadcrumb"><a href="../projects.html" class="case-study-back-link"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to Projects</a></div>`;

const luxuryFonts = `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet" />`;

files.forEach(file => {
  const filePath = path.join(caseStudiesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix UTF-8 double-encoding artifacts
  content = content
    .replace(/\uFEFF/g, '')
    .replace(/â˜°/g, '☰')
    .replace(/â†\x90/g, '←')
    .replace(/â† /g, '←')
    .replace(/â†’/g, '→')
    .replace(/â€”/g, '—')
    .replace(/âœ“/g, '✓')
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/Â·/g, '·')
    .replace(/Â©/g, '©')
    .replace(/â†‘/g, '↑');

  // Upgrade Google fonts
  if (content.includes('fonts.googleapis.com')) {
    content = content.replace(/<link[^>]*fonts\.googleapis\.com[^>]*>\s*<link[^>]*fonts\.gstatic\.com[^>]*>\s*<link[^>]*family=Plus\+Jakarta\+Sans[^>]*>/, luxuryFonts);
  }

  // Replace header with Floating Nav
  if (content.includes('class="site-header"')) {
    content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/, floatingNav);
  }

  // Replace breadcrumb
  if (content.includes('case-study-breadcrumb')) {
    content = content.replace(/<div class="[^"]*case-study-breadcrumb">[\s\S]*?<\/div>/, breadcrumbReplacement);
  }

  // Ensure case-study-hero-overlay is present
  if (content.includes('class="case-study-hero"') && !content.includes('class="case-study-hero-overlay"')) {
    content = content.replace(/(<div class="case-study-hero"[^>]*>)/, '$1<div class="case-study-hero-overlay"></div>');
  }

  // Update back to top button or script if needed
  content = content.replace(/<button class="back-to-top"[\s\S]*?<\/button>/, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${file}`);
});

console.log('All case study files successfully updated.');
