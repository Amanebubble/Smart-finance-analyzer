const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'renderer');
const outDir = path.join(__dirname, '..', 'dist', 'renderer');

const STATIC_EXTENSIONS = new Set([
  '.html',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.gif',
  '.webp',
  '.ico',
  '.json',
  '.txt'
]);

function copyStaticAssets(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyStaticAssets(src, dst);
    } else if (STATIC_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      fs.copyFileSync(src, dst);
    }
  }
}

copyStaticAssets(srcDir, outDir);
console.log('Static renderer assets copied to dist/renderer');
