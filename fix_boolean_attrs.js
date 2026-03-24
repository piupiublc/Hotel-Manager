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

  const newContent = content.replace(/(disabled|checked|required|readOnly|autoFocus|hidden)=""/g, (match, p1) => {
    changed = true;
    return p1;
  });

  if (changed) {
    fs.writeFileSync(file, newContent);
    console.log(`Fixed boolean attrs in ${file}`);
  }
});
