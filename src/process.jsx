/* global React, window */
// Process — 6-step list

const Process = () => {
  const { t } = window.useLang();
  const p = t.process;
  return (
    <section className="process" id="process">
      <div className="container">
        <window.SectionTag>{p.tag}</window.SectionTag>
        <window.Reveal>
          <div className="mono-label">{p.tag}</div>
        </window.Reveal>
        <window.Reveal>
          <div className="section-head" style={{ marginTop: 24 }}>
            <h2>{p.title}</h2>
            <p>{p.desc}</p>
          </div>
        </window.Reveal>

        <window.Reveal>
          <div className="process-list">
            {p.steps.map((s) => (
              <div className="process-step" key={s.n}>
                <div className="step-num">/{s.n}</div>
                <div>
                  <h4>{s.t}</h4>
                </div>
                <div>
                  <p>{s.d}</p>
                  <div className="step-meta">{s.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </window.Reveal>
      </div>
    </section>
  );
};

window.Process = Process;
