const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = ['index.html', 'about.html', 'projects.html', 'skills.html', 'credentials.html', 'contact.html'];

files.forEach(f => {
  const filePath = path.join(rootDir, f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
      /<span id="terminal-close-btn" class="terminal-dot close" title="Close"><\/span>/g,
      '<button type="button" id="terminal-close-btn" class="terminal-dot close" title="Close" aria-label="Close terminal"></button>'
    );
    content = content.replace(
      /<span class="terminal-dot min"><\/span>/g,
      '<span class="terminal-dot min" aria-hidden="true"></span>'
    );
    content = content.replace(
      /<span class="terminal-dot max"><\/span>/g,
      '<span class="terminal-dot max" aria-hidden="true"></span>'
    );
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Terminal controls accessibility updated in all files!');
