
export default function Home() {
  return <main id="main" className="site-width">
    <section className="intro" aria-labelledby="intro-title">
      <div><p className="eyebrow"><span className="accent-dot"/> A PERSONAL JOURNAL</p><h1 id="intro-title">生活，有时需要<br/>一点<span className="quiet-word">留白</span>。</h1></div>
      <div className="intro-note"><span className="note-line"/><p>写下日常，也写下偶尔的远方。<br/>在这里，收藏生活中值得停留的片刻，<br/>和那些尚未想明白的小事。</p><p className="small-note">不必匆忙，随意看看。</p></div>
    </section>
    <section id="writing" aria-labelledby="writing-heading">
      <div className="section-label"><h2 id="writing-heading">文字与片刻 <span>THE JOURNAL</span></h2><span>2026 — 持续记录</span></div>
      <a href="/posts/a-slower-day/" className="featured">
        <div className="featured-copy"><div className="post-meta"><span className="category">生活随笔</span><span>2026.09.05</span><span>示例文章</span></div><h3>把日子过慢一点</h3><p>散步不一定要有目的地，周末也不必被安排填满。偶尔把时间还给自己，才发现，平常的日子里也藏着许多微小的好。</p><span className="read-link">读这篇文章 <span aria-hidden="true">↗</span></span></div>
        <figure className="feature-image"><img src="/coast.png" width="1536" height="1024" alt="晨雾里的安静海岸，松枝与远山" fetchPriority="high"/><figcaption>A MOMENT OF STILLNESS</figcaption></figure>
      </a>
      <div className="post-list">
        <a className="post-row" href="/posts/reading-in-the-margins/"><span className="post-number">02</span><div><div className="post-meta"><span>阅读札记</span><span>2026.08.28</span></div><h3>书页的空白处，也有生活</h3><p>重新翻开一本旧书，遇见当时的自己。</p></div><span className="row-arrow" aria-hidden="true">↗</span></a>
        <a className="post-row" href="/posts/an-unplanned-walk/"><span className="post-number">03</span><div><div className="post-meta"><span>日常观察</span><span>2026.08.16</span></div><h3>一次没有目的地的散步</h3><p>换一条回家的路，让熟悉的城市重新变得陌生。</p></div><span className="row-arrow" aria-hidden="true">↗</span></a>
        <a className="post-row" href="/posts/leaving-some-space/"><span className="post-number">04</span><div><div className="post-meta"><span>个人思考</span><span>2026.08.02</span></div><h3>不急着给每件事一个答案</h3><p>有些问题，适合带着它们继续生活。</p></div><span className="row-arrow" aria-hidden="true">↗</span></a>
      </div>
    </section>
    <aside className="closing-note"><span className="eyebrow">A NOTE TO SELF</span><p>日子不一定闪闪发光，<br className="mobile-break"/>但每一天，都值得被好好收藏。</p><span className="note-signature">— 留白</span></aside>
  </main>;
}


