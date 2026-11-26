import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outArgIndex = process.argv.indexOf('--out');
const outFolderName = outArgIndex !== -1 && process.argv[outArgIndex + 1] ? process.argv[outArgIndex + 1] : 'dist';
const outDir = path.resolve(rootDir, outFolderName);
const htmlPages = ['index.html', 'embedded-cv.html'];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function verifyBuiltAssets(targetDir) {
  const cssPath = path.join(targetDir, 'assets', 'css', 'style.css');
  const css = fs.readFileSync(cssPath, 'utf8');
  const missing = [];

  for (const page of htmlPages) {
    const htmlPath = path.join(targetDir, page);
    const html = fs.readFileSync(htmlPath, 'utf8');
    const attrRegex = /(?:src|href)=["']([^"']+)["']/gi;
    for (const match of html.matchAll(attrRegex)) {
      const rawRef = match[1].trim();
      if (
        !rawRef ||
        rawRef.startsWith('#') ||
        rawRef.startsWith('http://') ||
        rawRef.startsWith('https://') ||
        rawRef.startsWith('mailto:') ||
        rawRef.startsWith('tel:') ||
        rawRef.startsWith('data:')
      ) {
        continue;
      }
      const cleanRef = rawRef.split('#')[0].split('?')[0];
      const resolved = path.resolve(targetDir, cleanRef);
      if (!fs.existsSync(resolved)) {
        missing.push(`${page} -> ${rawRef}`);
      }
    }
  }

  const cssUrlRegex = /url\(["']?([^"')]+)["']?\)/gi;
  for (const match of css.matchAll(cssUrlRegex)) {
    const rawUrl = match[1].trim();
    if (!rawUrl || rawUrl.startsWith('data:') || rawUrl.startsWith('http')) continue;
    const cleanUrl = rawUrl.split('#')[0].split('?')[0];
    const resolved = path.resolve(path.dirname(cssPath), cleanUrl);
    if (!fs.existsSync(resolved)) {
      missing.push(`assets/css/style.css -> ${rawUrl}`);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing built assets:\n${missing.join('\n')}`);
  }
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const page of htmlPages) {
  fs.copyFileSync(path.join(rootDir, page), path.join(outDir, page));
}
copyRecursive(path.join(rootDir, 'assets'), path.join(outDir, 'assets'));
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

verifyBuiltAssets(outDir);
console.log(`Static portfolio built and verified in ${outFolderName}/`);
