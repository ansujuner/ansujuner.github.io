import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, postHref } from '../lib/posts';
import { siteConfig } from '../site.config';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: `${siteConfig.title} / ${siteConfig.titleEn}`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    customData: `<language>${siteConfig.locale}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: postHref(post),
      categories: post.data.tags,
    })),
  });
}
