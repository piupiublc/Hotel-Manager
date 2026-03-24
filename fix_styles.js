const fs = require('fs');
const path = require('path');

function walk(dir) {
  let fileList = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fileList = fileList.concat(walk(fullPath));
    } else if (fullPath.endsWith('.tsx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = walk(path.join(__dirname, 'src/app'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const newContent = content.replace(/style="([^"]*)"/g, (match, styleString) => {
    changed = true;
    const parts = styleString.split(';').filter(p => p.trim());
    let objStr = [];
    for (const part of parts) {
      if (!part.includes(':')) continue;
      const [key, ...vals] = part.split(':');
      let val = vals.join(':').trim();
      const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      val = val.replace(/&quot;/g, "'");
      objStr.push(`${camelKey}: "${val}"`);
    }
    return `style={{ ${objStr.join(', ')} }}`;
  });

  if (changed) {
    fs.writeFileSync(file, newContent);
    console.log(`Fixed styles in ${file}`);
  }
});
