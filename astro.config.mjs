// @ts-check
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const postsDirectory = fileURLToPath(new URL('./src/content/posts/', import.meta.url));
const frontmatterPattern = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;
const draftPattern = /^draft[ \t]*:[ \t]*true[ \t]*(?:#.*)?$/im;

/** @param {string} directory @returns {string[]} */
function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return /\.md$/i.test(entry.name) ? [path] : [];
  });
}

/** @param {string} path @returns {boolean} */
function isDraftPost(path) {
  const source = readFileSync(path, 'utf8').replace(/^\uFEFF/, '');
  const frontmatter = source.match(frontmatterPattern)?.[1];
  return frontmatter ? draftPattern.test(frontmatter) : false;
}

const hasPublishedPosts = existsSync(postsDirectory)
  && markdownFiles(postsDirectory).some((path) => !isDraftPost(path));
const emptyCollectionRoutes = ['/posts/', '/tags/', '/archive/'];

export default defineConfig({
  site: 'https://ansujuner.github.io',
  integrations: [sitemap({
    filter: (page) => page !== 'https://ansujuner.github.io/search/'
      && (hasPublishedPosts || !emptyCollectionRoutes.some((route) => page.endsWith(route))),
  })],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
