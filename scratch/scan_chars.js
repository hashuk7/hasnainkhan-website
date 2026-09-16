const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'case-studies');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const allowed = new Set(['—', '←', '→', '✓', '·', '©', '↑', '☰', '▸', '’', '”', '“']);
let weird = new Set();

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const nonAscii = content.match(/[^\x00-\x7F]/g) || [];
  nonAscii.forEach(c => {
    if (!allowed.has(c)) {
      weird.add(`${c} (code: ${c.charCodeAt(0)})`);
    }
  });
});

console.log('Unrecognized non-ascii characters found:', [...weird]);
