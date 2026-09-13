const fs = require('fs');
const path = require('path');

const root = 'C:/Users/Administrator/DSH/plugins/dsh-skill-hub';
const pngPath = path.join(root, 'assets/my_logo.png');   //在此处修改logo后，执行 node fix_logo.cjs 即可重新生成logo
const clientPath = path.join(root, 'src/client.js');

const b64 = fs.readFileSync(pngPath).toString('base64');
const dataUrl = 'data:image/png;base64,' + b64;

let src = fs.readFileSync(clientPath, 'utf8');
// Match: var BRAND_LOGO_DATA_URL = "data:image/png;base64,....";
const re = /var BRAND_LOGO_DATA_URL\s*=\s*"data:image\/png;base64,[^"]*";/;
if (!re.test(src)) {
  console.error('PATTERN_NOT_FOUND');
  process.exit(1);
}
src = src.replace(re, 'var BRAND_LOGO_DATA_URL = "' + dataUrl + '";');
fs.writeFileSync(clientPath, src, 'utf8');
console.log('OK len=' + dataUrl.length);
