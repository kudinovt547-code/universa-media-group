/* global React, window */
// Hero — kinetic headline, liquid orb, ticker, stats

const Hero = () => {
  const { t } = window.useLang();
  const h = t.hero;

  // Render headline: word in [brackets] becomes accent
  const words = h.headline.map((w, i) => {
    const accent = /^\[.*\]$/.test(w);
    const text = accent ? w.slice(1, -1) : w;
    return (
      <span key={i} className="word" style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
        <span style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
          {accent ? <em>{text}</em> : text}
        </span>
      </span>
    );
  });

  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="hero-orb-wrap"><window.Orb /></div>

      <div className="container">
        <div className="hero-content">
          <div className="mono-label">{h.tag}</div>
          <h1 className="hero-headline">{words.reduce((acc, el, i) => acc.concat(i ? [" ", el] : [el]), [])}</h1>
          <p className="hero-sub">{h.sub}</p>
          <div className="hero-ctas">
            <window.Magnetic>
              <a href="#quiz" className="btn primary">
                {h.ctaPrimary}
                <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </window.Magnetic>
            <window.Magnetic>
              <a href="#cases" className="btn">{h.ctaSecondary}</a>
            </window.Magnetic>
          </div>

          <div className="hero-stats">
            {h.stats.map((s, i) => (
              <div key={i} className="hero-stat">
                <div className="v">{s.v}</div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          {[...h.ticker, ...h.ticker].map((w, i) => (
            <span key={i}>
              {w}
              <svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" fill="currentColor" opacity="0.6"/></svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
