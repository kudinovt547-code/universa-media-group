/* global React, window */
// Services — six-cell grid with mouse-follow glow

const Services = () => {
  const { t } = window.useLang();
  const s = t.services;
  return (
    <section className="services container" id="services">
      <window.SectionTag>{s.tag}</window.SectionTag>
      <window.Reveal>
        <div className="mono-label">{s.tag}</div>
      </window.Reveal>
      <window.Reveal>
        <div className="section-head" style={{ marginTop: 24 }}>
          <h2>{s.title}</h2>
          <p>{s.desc}</p>
        </div>
      </window.Reveal>

      <window.Reveal>
        <div className="services-grid">
          {s.items.map((item, i) => (
            <window.ServiceCell key={item.n} item={item} isLast={i === s.items.length - 1} />
          ))}
        </div>
      </window.Reveal>
    </section>
  );
};

window.Services = Services;
