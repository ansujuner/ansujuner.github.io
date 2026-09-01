export const siteConfig = {
  title: '徐丰俊',
  romanizedName: 'Xu Fengjun',
  author: '徐丰俊',
  tagline: '嫉妒懒惰症患者晚期',
  description: '徐丰俊（Xu Fengjun）的个人网站：一名在杭州的在校学生，喜欢天马星空的项目，也是一名坚定的开源主义者。',
  url: 'https://ansujuner.github.io',
  locale: 'zh-CN',
  timezone: 'Asia/Shanghai',
  since: 2026,
  profile: {
    initial: '徐',
    role: '在校学生',
    roleEn: 'Student',
    location: '杭州',
    locationEn: 'Hangzhou',
    interest: '喜欢天马星空的项目',
    interestEn: 'Imaginative projects',
    belief: '坚定的开源主义者',
    beliefEn: 'Open source',
  },
  now: '在杭州学习，也关注天马星空的项目与开源世界。',
  nowEn: 'Studying in Hangzhou, with an interest in imaginative projects and open source.',
  nav: [
    { label: '首页', labelEn: 'Home', href: '/' },
    { label: '关于', labelEn: 'About', href: '/about/' },
    { label: '联系', labelEn: 'Contact', href: '/#contact' },
  ],
  social: {
    github: 'https://github.com/ansujuner',
    email: '1795811354@qq.com',
    bilibili: 'https://space.bilibili.com/3493136561081252',
    bilibiliName: 'bili_94968455178',
  },
} as const;

export type SiteConfig = typeof siteConfig;
