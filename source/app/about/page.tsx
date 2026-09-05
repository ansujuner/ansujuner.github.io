import type { Metadata } from 'next';

export const metadata: Metadata = { title: '关于我', description: '关于留白，关于写作，以及那些值得被好好收藏的日常。' };
export default function About() {
  return <main id="main" className="article-shell about-page">
    <a href="/" className="back-link">← 回到首页</a>
    <p className="eyebrow">BEHIND THE WORDS</p><h1>你好，<br/>欢迎来到「留白」。</h1>
    <div className="prose"><p className="about-lead">一个普通的生活观察者，<br/>用文字，留住一些容易被忘记的片刻。</p>
    <p>喜欢慢慢走路，读没读完的书，也喜欢没有安排的下午。关心宏大的世界，但更愿意从一杯热茶、一段对话、一条走过很多次的街道开始写。</p>
    <h2>为什么叫留白</h2><p>生活里已经有很多声音了，所以想在这里留一个安静的角落。不急着下结论，不追赶热点。想到什么就写一点，让散落的念头有个可以回来的地方。</p>
    <h2>这里会写些什么</h2><p>生活随笔，记下平常日子里的小事；阅读札记，留住书页之间的回声；还有一些尚未成熟的思考，它们不一定给出答案，但足够真实。</p>
    <blockquote>把注意力放回生活，把生活慢慢写下来。</blockquote>
    <p>谢谢你在这里停留。希望某一段文字，会让你想起自己的一个片刻。</p></div>
    <div className="about-sign">留白<span>生活与思考 · SINCE 2026</span></div>
    <aside className="sample-notice">此处为示例作者介绍，姓名、经历和文章均可替换为你自己的内容。</aside>
    <a className="read-link" href="/#writing">去读一篇文章 <span aria-hidden="true">↗</span></a>
  </main>;
}


