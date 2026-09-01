export const siteConfig = {
  title: 'Ansujuner',
  author: 'Ansujuner',
  tagline: '写代码，也写生活。',
  description: '记录关于代码、产品与日常思考的个人博客。',
  url: 'https://ansujuner.github.io',
  locale: 'zh-CN',
  timezone: 'Asia/Shanghai',
  since: 2026,
  now: '正在整理值得反复阅读的技术笔记，也记录生活里那些不必急着下结论的瞬间。',
  nav: [
    { label: '首页', href: '/' },
    { label: '文章', href: '/posts/' },
    { label: '标签', href: '/tags/' },
    { label: '归档', href: '/archive/' },
    { label: '关于', href: '/about/' },
  ],
  social: {
    github: 'https://github.com/ansujuner',
    email: '',
  },
} as const;

export type SiteConfig = typeof siteConfig;
