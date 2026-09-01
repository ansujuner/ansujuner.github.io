import { existsSync, readdirSync } from 'node:fs';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postsDirectory = new URL('./content/posts/', import.meta.url);
const hasPostFiles = existsSync(postsDirectory)
  && readdirSync(postsDirectory, { recursive: true }).some((entry) => String(entry).endsWith('.md'));

const posts = defineCollection({
  loader: hasPostFiles
    ? glob({ base: './src/content/posts', pattern: '**/*.md', retainBody: true })
    : async () => [],
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).min(1),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts };
