const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const caseDir = path.join(rootDir, 'case-studies');
const fontHead = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap';

if (fs.existsSync(caseDir)) {
  fs.readdirSync(caseDir).forEach(f => {
    if (f.endsWith('.html')) {
      const p = path.join(caseDir, f);
      let content = fs.readFileSync(p, 'utf8');
      content = content.replace(/https:\/\/fonts\.googleapis\.com\/css2\?[^"]+/g, fontHead);
      content = content.replace(/\+92\s*300\s*0000000/g, '+92 305 311 0575');
      content = content.replace(/href="https:\/\/github\.com"/g, 'href="https://github.com/hasnainkhan"');
      content = content.replace(/<img (?!.*loading=)/g, '<img loading="lazy" decoding="async" ');
      fs.writeFileSync(p, content, 'utf8');
    }
  });
  console.log('Case studies synchronized!');
}
