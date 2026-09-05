import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Publish only known static output; never copy environment files or server code.
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repository = path.resolve(source, '..');
const build = path.join(source, 'dist/client');
if (!fs.existsSync(path.join(repository, '.git')) || !fs.existsSync(path.join(build, 'index.html'))) {
  throw new Error('Run this script from the source copy inside the GitHub checkout, after npm run build.');
}
const allowed = new Set(['_next', 'posts', 'about', '404.html', 'index.html', 'index.rsc', 'about.rsc', 'coast.png', 'favicon.svg', 'vinext-client-entry-manifest.json']);
for (const name of fs.readdirSync(build)) {
  if (allowed.has(name)) fs.cpSync(path.join(build, name), path.join(repository, name), { recursive: true, force: true });
}
fs.writeFileSync(path.join(repository, '.nojekyll'), '');
console.log('GitHub Pages static files exported to repository root.');

// Vinext beta currently redirects slash-suffixed prerender requests. Build its
// normal flat export, then add directory indexes for GitHub Pages clean URLs.
function addDirectoryIndexes(dir, relative = '') {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.isDirectory()) { addDirectoryIndexes(path.join(dir, item.name), path.join(relative, item.name)); continue; }
    if (!item.name.endsWith('.html') || ['index.html', '404.html'].includes(item.name)) continue;
    const target = path.join(repository, relative, item.name.slice(0, -5), 'index.html');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(dir, item.name), target);
  }
}
addDirectoryIndexes(build);
console.log('Directory indexes prepared for /about/ and all article routes.');
