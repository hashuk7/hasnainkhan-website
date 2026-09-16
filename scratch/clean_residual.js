const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'case-studies');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip char 129
  content = content.split(String.fromCharCode(129)).join('');

  // Clean up any double spaces inside icon
  content = content.replace(/>✓\s*<\/div>/g, '>✓</div>');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Stripped char 129 from all files.');
