import { siteConfig } from '../site.config';
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function postHref(post: Post): string {
  return `/posts/${post.id}/`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: siteConfig.timezone,
  }).format(date);
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: siteConfig.timezone,
  }).format(date).replaceAll('/', '.');
}

export function formatYear(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    timeZone: siteConfig.timezone,
  }).format(date);
}

export function readingTime(body = ''): number {
  const source = body.replace(/```[\s\S]*?```/g, ' ').replace(/<[^>]+>/g, ' ');
  const cjk = source.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latin = source
    .replace(/[\u3400-\u9fff]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil((cjk + latin) / 300));
}

export function tagHref(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`;
}

export function collectTags(posts: Post[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}
