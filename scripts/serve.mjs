import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const rootDir = process.cwd();
const port = Number(process.env.PORT || 3000);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

export function resolveStaticAsset(rawUrl, baseDir = rootDir) {
  const rawPathname = String(rawUrl || '/').split('?')[0].split('#')[0];
  let relPath;
  try {
    relPath = decodeURIComponent(rawPathname);
  } catch {
    return { status: 400, contentType: 'text/plain', body: 'Bad Request' };
  }

  if (relPath.includes('..') || relPath.includes('\\')) {
    return { status: 403, contentType: 'text/plain', body: 'Forbidden' };
  }

  if (relPath === '/') relPath = '/index.html';

  const segments = relPath.split('/').filter(Boolean);
  if (
    segments.some((seg) => seg.startsWith('.')) ||
    relPath === '/package.json' ||
    relPath === '/package-lock.json' ||
    relPath.startsWith('/scripts/') ||
    relPath.startsWith('/tests/')
  ) {
    return { status: 403, contentType: 'text/plain', body: 'Forbidden' };
  }

  const isAllowedPublicPath =
    relPath === '/index.html' ||
    relPath === '/embedded-cv.html' ||
    relPath.startsWith('/assets/');
  if (!isAllowedPublicPath) {
    return { status: 404, contentType: 'text/plain', body: 'Not Found' };
  }

  const rootResolved = path.resolve(baseDir);
  const resolved = path.resolve(rootResolved, '.' + relPath);
  if (resolved !== rootResolved && !resolved.startsWith(rootResolved + path.sep)) {
    return { status: 403, contentType: 'text/plain', body: 'Forbidden' };
  }

  if (!fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
    return { status: 404, contentType: 'text/plain', body: 'Not Found' };
  }

  const ext = path.extname(resolved).toLowerCase();
  return {
    status: 200,
    contentType: MIME_TYPES[ext] || 'application/octet-stream',
    filePath: resolved
  };
}

export function handleStaticRequest(req, res, baseDir = rootDir) {
  const result = resolveStaticAsset(req.url, baseDir);
  if (result.status !== 200) {
    res.writeHead(result.status, { 'Content-Type': result.contentType });
    res.end(result.body);
    return;
  }

  res.writeHead(200, { 'Content-Type': result.contentType });
  fs.createReadStream(result.filePath).pipe(res);
}

export function createStaticServer(baseDir = rootDir) {
  return http.createServer((req, res) => handleStaticRequest(req, res, baseDir));
}

export function invokeStaticRequest(rawUrl, baseDir = rootDir) {
  return new Promise((resolve) => {
    const chunks = [];
    const res = new EventEmitter();
    res.statusCode = 200;
    res.headers = {};
    res.writeHead = (status, headers) => {
      res.statusCode = status;
      res.headers = headers || {};
    };
    res.write = (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      return true;
    };
    res.end = (chunk) => {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      resolve({
        status: res.statusCode,
        headers: res.headers,
        body: Buffer.concat(chunks)
      });
    };

    handleStaticRequest({ url: rawUrl }, res, baseDir);
  });
}

if (process.argv[1] && process.argv[1].endsWith('serve.mjs')) {
  const server = createStaticServer(rootDir);
  server.listen(port, '127.0.0.1', () => {
    console.log(`Static portfolio running at http://127.0.0.1:${port}`);
  });
}
