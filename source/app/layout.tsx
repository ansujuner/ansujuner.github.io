import type { Metadata } from 'next';

import './globals.css';
export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: { default: '留白 · 生活与思考', template: '%s | 留白' },
  description: '写下日常，也写下偶尔的远方。一处安静的个人写作空间，收藏生活、阅读与思考。',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>
    <a href="#main" className="skip-link">跳至正文</a>
    <header className="site-header site-width">
      <a href="/" className="brand" aria-label="留白，返回首页"><span className="brand-mark" aria-hidden="true"/><span>留白<span className="brand-roman">LIU BAI</span></span></a>
      <nav aria-label="主导航"><a href="/#writing">文字</a><a href="/about/">关于我</a></nav>
      <span className="header-note"><span className="accent-dot"/> 一处安静的自留地</span>
    </header>
    {children}
    <footer className="site-footer site-width"><div><a href="/" className="footer-brand">留白</a><span>© 2026 · 生活与思考</span></div><span>示例内容 · 愿文字有温度，生活有余地。</span></footer>
  </body></html>;
}



