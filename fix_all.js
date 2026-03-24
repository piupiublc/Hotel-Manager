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
let totalFixed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // 1. Fix SVG attributes that need camelCase
  content = content.replace(/stroke-dasharray=/g, 'strokeDasharray=');
  content = content.replace(/stroke-dashoffset=/g, 'strokeDashoffset=');
  content = content.replace(/stroke-width=/g, 'strokeWidth=');
  content = content.replace(/stroke-linecap=/g, 'strokeLinecap=');
  content = content.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  content = content.replace(/clip-rule=/g, 'clipRule=');
  content = content.replace(/fill-rule=/g, 'fillRule=');
  content = content.replace(/ viewbox=/gi, ' viewBox=');

  // 2. Fix HTML entities that shouldn't be in JSX
  content = content.replace(/&amp;/g, '&');
  content = content.replace(/&lt;/g, '<');
  content = content.replace(/&gt;/g, '>');

  // 3. Fix broken background-image URLs in style objects
  // Pattern: style={{ backgroundImage: "...&quot", https: "//..." }}
  // Should be: style={{ backgroundImage: "url('https://...')" }}
  content = content.replace(
    /style=\{\{\s*backgroundImage:\s*"([^"]*?)&quot",\s*https:\s*"\/\/([^"]*?)&quot"\s*\}\}/g,
    (match, prefix, url) => {
      // prefix might be like "url(" or "linear-gradient(...), url("
      let cleanPrefix = prefix.replace(/&quot/g, "'");
      return `style={{ backgroundImage: "${cleanPrefix}https://${url}')" }}`;
    }
  );

  // 4. Fix remaining &quot; in style props (catch-all)
  // Pattern: style={{ backgroundImage: `url('&quot;https://...&quot;')` }}
  content = content.replace(/&quot;/g, "'");

  // 5. Fix remaining style={{ ... }} with broken URL patterns
  // Handle cases where URL got split across object keys
  content = content.replace(
    /style=\{\{\s*backgroundImage:\s*"([^"]*?)'",\s*https:\s*"\/\/([^"]*?)'"\s*\}\}/g,
    (match, prefix, url) => {
      return `style={{ backgroundImage: "${prefix}https://${url})" }}`;
    }
  );

  // 6. Fix double-escaped quotes in url() calls within style
  content = content.replace(
    /url\(''/g, "url('"
  );
  content = content.replace(
    /''\)/g, "')"
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    totalFixed++;
    console.log(`Fixed: ${path.relative(__dirname, file)}`);
  }
});

console.log(`\nTotal files fixed: ${totalFixed}`);
