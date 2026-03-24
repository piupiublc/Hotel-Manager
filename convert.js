const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const OUT_DIR = path.join(__dirname, 'src/app');
const IN_DIR = path.join(__dirname, 'stitch_exports');

const mappings = {
    'admin_dashboard_0e52eac6c23f4e7abf18bec53ddabbca.html': '(dashboard)/admin/dashboard',
    'admin_finance_overview_2da12f285e1f4f29a281aba3a711c1ce.html': '(dashboard)/admin/finance',
    'admin_revenue_analytics_c71221e5600a4dd29ef86436d901a4f1.html': '(dashboard)/admin/revenue',
    'admin_user_management_a3acd234f68a409bac7ebd2d9462b364.html': '(dashboard)/admin/users',
    'business_help_center_a21b48733b36464c9da91b3b0739a44a.html': '(dashboard)/business/help',
    'business_listings_28542a6de5e342a89acff211d4db98fc.html': '(dashboard)/business/listings',
    'business_payments___earnings_aa3ac5ef5dd041f3b0d6f613e3b695e8.html': '(dashboard)/business/payments',
    'business_settings_58c278a6c84742b7adf841b2fe128d16.html': '(dashboard)/business/settings',
    'my_guesthouse_details_e76571fb71e84f00bf222f766142b9ce.html': '(dashboard)/business/guesthouse/[id]',
    'customer_discovery_7e577348f443486c8a1a1f0487fc881b.html': '(public)/discovery',
    'login___registration_623975ebf8a7446f8142080cbca7e1eb.html': '(public)/login',
    'updated_booking_with_momo_pay_dbcd3ae6add34173ab515ebe4182ffff.html': '(public)/booking/momo'
};

function htmlToJsx(html) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/@click="[^"]*"/g, '')
        .replace(/:className="[^"]*"/g, '')
        .replace(/:class="[^"]*"/g, '')
        .replace(/x-data="[^"]*"/g, '')
        .replace(/x-show="[^"]*"/g, '')
        .replace(/<template x-htmlFor="[^"]*">/g, '')
        .replace(/<\/template>/g, '')
        .replace(/clip-rule=/g, 'clipRule=')
        .replace(/fill-rule=/g, 'fillRule=')
        .replace(/stroke-width=/g, 'strokeWidth=')
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/tabindex=/g, 'tabIndex=')
        .replace(/autofocus/g, 'autoFocus')
        .replace(/<img(.*?)>/g, (match, p1) => {
             if (p1.endsWith('/')) return match;
             return `<img${p1} />`;
        })
        .replace(/<input(.*?)>/g, (match, p1) => {
             if (p1.endsWith('/')) return match;
             return `<input${p1} />`;
        })
        .replace(/<hr(.*?)>/g, (match, p1) => {
             if (p1.endsWith('/')) return match;
             return `<hr${p1} />`;
        })
        .replace(/<br(.*?)>/g, (match, p1) => {
             if (p1.endsWith('/')) return match;
             return `<br${p1} />`;
        })
        // Remove empty styles
        .replace(/style=""/g, '')
        // Convert basic style="..." to style={{...}} for background-image
        .replace(/style="background-image:\s*url\((.*?)\)"/g, "style={{ backgroundImage: `url('$1')` }}")
        .replace(/<!--(.*?)-->/g, '{/* $1 */}');
}

for (const [file, routePath] of Object.entries(mappings)) {
    const fullPath = path.join(IN_DIR, file);
    if (!fs.existsSync(fullPath)) continue;
    
    const html = fs.readFileSync(fullPath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    let contentHtml = '';
    
    if (routePath.includes('(dashboard)')) {
        const main = document.querySelector('main');
        if (main) {
            let innerContent = '';
            // Get all children of main that are NOT header
            Array.from(main.children).forEach(child => {
                 if (child.tagName.toLowerCase() !== 'header') {
                      innerContent += child.outerHTML;
                 }
            });
            contentHtml = innerContent || document.body.innerHTML;
        } else {
            contentHtml = document.body.innerHTML;
        }
    } else {
        const temp = document.querySelector('.min-h-screen');
        contentHtml = temp ? temp.innerHTML : document.body.innerHTML;
    }
    
    const jsx = htmlToJsx(contentHtml);
    
    const targetDir = path.join(OUT_DIR, routePath);
    fs.mkdirSync(targetDir, { recursive: true });
    
    const compName = file.split('_').slice(0, -1).map(w=>w.charAt(0).toUpperCase() + w.slice(1)).join('').replace(/[^a-zA-Z]/g, '');
    
    const fileContent = `
export default function ${compName}() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;
    fs.writeFileSync(path.join(targetDir, 'page.tsx'), fileContent);
    console.log(`Created ${routePath}/page.tsx`);
}
