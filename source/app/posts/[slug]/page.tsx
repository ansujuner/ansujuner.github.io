import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { posts, readingMinutes } from '@/lib/posts';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return posts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const post = posts.find(p => p.slug === slug);
  return post ? { title: post.title, description: post.summary } : { title: '文章未找到' };
}
export default async function PostPage({ params }: Props) {
  const { slug } = await params; const index = posts.findIndex(p => p.slug === slug); const post = posts[index];
  if (!post) notFound();
  const nextPost = posts[(index + 1) % posts.length];
  return <main id="main" className="article-shell">
    <a href="/#writing" className="back-link">← 返回文字与片刻</a>
    <article>
      <header className="article-header"><div className="post-meta"><span className="category">{post.category}</span><span>{post.date}</span><span>约 {readingMinutes(post)} 分钟阅读</span></div><h1>{post.title}</h1><p className="article-deck">{post.summary}</p><span className="sample-label">示例文章 · 原创示例文字</span></header>
      {index === 0 && <figure className="article-cover"><img src="/coast.png" width="1536" height="1024" alt="海岸松枝与晨雾中的远山"/><figcaption>海岸片刻 · AI 创作配图</figcaption></figure>}
      <div className="prose">{post.paragraphs.map((text,i) => <div key={text}>{i === 3 && <blockquote>{post.quote}</blockquote>}<p>{text}</p></div>)}</div>
      <div className="article-end"><span/><span>写于 {post.date} · 留白</span><span/></div>
    </article>
    <a className="next-post" href={`/posts/${nextPost.slug}/`}><span>继续阅读</span><h2>{nextPost.title}<span aria-hidden="true">↗</span></h2></a>
  </main>;
}


