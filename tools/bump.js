// Bump the site build version so browsers always load the latest files.
// Usage (from repo root):  node tools/bump.js
// Updates: version.json, the BUILD constant in index.html, and every ?v= on local CSS/JS in index.html.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const d = new Date();
const pad = n => String(n).padStart(2, '0');
const build = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;

fs.writeFileSync(path.join(root, 'version.json'), JSON.stringify({ v: build }) + '\n');

const file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8');
html = html.replace(/(var BUILD = ')[^']*(')/, `$1${build}$2`);
html = html.replace(/((?:href|src)="assets\/[^"?]+\.(?:css|js))(\?v=[^"]*)?"/g, `$1?v=${build}"`);
fs.writeFileSync(file, html);

console.log('build', build);
