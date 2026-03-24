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

walk(path.join(__dirname, 'src/app')).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  let newContent = content.replace(/"(.*?url\()&quot", https: "\/\/([^"]*)&quot"/g, '"$1\'https://$2\')"');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed', file);
  }
});
