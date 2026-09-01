import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const failures = [];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function pagePathFor(file) {
  const path = relative(dist, file).replaceAll('\\', '/');
  if (path === 'index.html') return '/';
  if (path.endsWith('/index.html')) return `/${path.slice(0, -'index.html'.length)}`;
  return `/${path}`;
}

function attributeValue(tag, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const quoted = tag.match(new RegExp(`\\b${escapedName}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  if (quoted) return quoted[2];
  return tag.match(new RegExp(`\\b${escapedName}\\s*=\\s*([^\\s>]+)`, 'i'))?.[1] ?? null;
}

function canonicalUrl(html, file) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const rel = attributeValue(match[0], 'rel')?.toLowerCase().split(/\s+/) ?? [];
    if (rel.includes('canonical')) return attributeValue(match[0], 'href');
  }
  return new URL(pagePathFor(file), 'https://ansujuner.github.io').href;
}

function hasNoindex(html) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (attributeValue(match[0], 'name')?.toLowerCase() !== 'robots') continue;
    const directives = attributeValue(match[0], 'content')?.toLowerCase().split(/[\s,]+/) ?? [];
    if (directives.includes('noindex')) return true;
  }
  return false;
}

function decodeXmlText(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function localTarget(raw, sourceFile) {
  if (!raw || /^(?:mailto:|tel:|data:|javascript:|#|\?)/i.test(raw)) return null;
  let url;
  try {
    url = new URL(raw, `https://local.invalid${pagePathFor(sourceFile)}`);
  } catch {
    failures.push(`${relative(dist, sourceFile)} 的链接格式无效：${raw}`);
    return null;
  }
  if (url.origin !== 'https://local.invalid') return null;
  const pathname = decodeURIComponent(url.pathname).replace(/^\//, '');
  if (!pathname || url.pathname.endsWith('/')) return join(dist, pathname, 'index.html');
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
  const noindexPages = [];
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

    if (hasNoindex(html)) noindexPages.push({ label, url: canonicalUrl(html, file) });

    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
      const target = localTarget(match[1], file);
      if (!target) continue;
      linksChecked++;
      if (!existsSync(target)) failures.push(`${label} 的链接不存在：${match[1]}`);
    }
  }

  const rss = existsSync(join(dist, 'rss.xml')) ? readFileSync(join(dist, 'rss.xml'), 'utf8') : '';
  const postsDir = join(dist, 'posts');
  const articleCount = existsSync(postsDir)
    ? walk(postsDir).filter((file) => file.endsWith(`${join('', 'index.html')}`) && resolve(file) !== resolve(postsDir, 'index.html')).length
    : 0;
  const rssCount = (rss.match(/<item>/g) ?? []).length;
  if (rssCount !== articleCount) failures.push('RSS 条目数 ' + rssCount + ' 与公开文章页数量 ' + articleCount + ' 不一致');
  const sitemapFiles = walk(dist).filter((file) => /^sitemap(?:-index|-\d+)?\.xml$/i.test(basename(file)));
  const sitemap = sitemapFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
  const sitemapUrls = new Set(
    [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decodeXmlText(match[1].trim())),
  );
  if (sitemap.includes('draft')) failures.push('Sitemap 中意外包含草稿');

  for (const page of noindexPages) {
    if (page.url && sitemapUrls.has(page.url)) {
      failures.push(`${page.label} has noindex but is listed in Sitemap: ${page.url}`);
    }
  }

  console.log(`Validated ${htmlFiles.length} HTML files and ${linksChecked} local links.`);
}

if (failures.length) {
  console.error(failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}
console.log('Static validation passed.');
