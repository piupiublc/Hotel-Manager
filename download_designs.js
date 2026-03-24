const fs = require('fs');
const https = require('https');
const path = require('path');

const jsonPath = 'C:/Users/trand/.gemini/antigravity/brain/5547abe3-bda6-4121-8850-5a26d24dd5de/.system_generated/steps/14/output.txt';
const outDir = 'd:/CNPM/business-dashboard/stitch_exports';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

let remaining = 0;

try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    if (data.screens) {
        data.screens.forEach(screen => {
            if (screen.htmlCode && screen.htmlCode.downloadUrl) {
                remaining++;
                const title = screen.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                const id = screen.name.split('/').pop();
                const dest = path.join(outDir, `${title}_${id}.html`);
                
                https.get(screen.htmlCode.downloadUrl, (res) => {
                    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                        // Handle redirect
                        https.get(res.headers.location, (redirectRes) => {
                            let body = '';
                            redirectRes.on('data', d => body += d);
                            redirectRes.on('end', () => {
                                fs.writeFileSync(dest, body);
                                remaining--;
                                if (remaining === 0) console.log("Done");
                            });
                        });
                    } else {
                        let body = '';
                        res.on('data', d => body += d);
                        res.on('end', () => {
                            fs.writeFileSync(dest, body);
                            remaining--;
                            if (remaining === 0) console.log("Done");
                        });
                    }
                }).on('error', e => {
                    console.error("Error fetching", title, e);
                    remaining--;
                    if (remaining === 0) console.log("Done");
                });
            }
        });
    }
} catch (e) {
    console.error(e);
}
