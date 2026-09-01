import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const failures = [];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function localTarget(raw) {
  if (!raw || /^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(raw)) return null;
  const clean = decodeURIComponent(raw.split('#')[0].split('?')[0]);
  const pathname = clean.startsWith('/') ? clean.slice(1) : clean;
  if (!pathname || clean.endsWith('/')) return join(dist, pathname, 'index.html');
  const direct = join(dist, pathname);
  if (extname(pathname)) return direct;
  return existsSync(direct) ? direct : join(direct, 'index.html');
}

if (!existsSync(dist)) failures.push('dist/ 不存在，请先运行 npm run build');
else {
  const required = ['index.html', '404.html', 'rss.xml', 'robots.txt', 'og.jpg', 'sitemap-index.xml', 'pagefind/pagefind.js'];
  for (const item of required) if (!existsSync(join(dist, item))) failures.push(`缺少构建产物：${item}`);

  const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
  const titles = new Map();
  let linksChecked = 0;

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const label = relative(dist, file).replaceAll('\\', '/');
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
    if (!title) failures.push(`${label} 缺少 title`);
    else {
      if (titles.has(title)) failures.push(`${label} 与 ${titles.get(title)} 的 title 重复：${title}`);
      titles.set(title, label);
    }
    if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) failures.push(`${label} 缺少 meta description`);
    if (!/<link\s+rel="canonical"\s+href="https:\/\/ansujuner\.github\.io\//i.test(html)) failures.push(`${label} canonical 地址不正确`);
    if (!/<html\s+lang="zh-CN"/i.test(html)) failures.push(`${label} 页面语言不是 zh-CN`);

    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
      const target = localTarget(match[1]);
      if (!target) continue;
      linksChecked++;
      if (!existsSync(target)) failures.push(`${label} 的链接不存在：${match[1]}`);
    }
  }

  const rss = existsSync(join(dist, 'rss.xml')) ? readFileSync(join(dist, 'rss.xml'), 'utf8') : '';
  const postsDir = join(dist, 'posts');
  const articleCount = existsSync(postsDir)
    ? readdirSync(postsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory() && existsSync(join(postsDir, entry.name, 'index.html'))).length
    : 0;
  const rssCount = (rss.match(/<item>/g) ?? []).length;
  if (rssCount !== articleCount) failures.push('RSS 条目数 ' + rssCount + ' 与公开文章页数量 ' + articleCount + ' 不一致');
  const sitemap = existsSync(join(dist, 'sitemap-0.xml')) ? readFileSync(join(dist, 'sitemap-0.xml'), 'utf8') : '';
  if (sitemap.includes('draft')) failures.push('Sitemap 中意外包含草稿');

  console.log(`Validated ${htmlFiles.length} HTML files and ${linksChecked} local links.`);
}

if (failures.length) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}
console.log('Static validation passed.');
