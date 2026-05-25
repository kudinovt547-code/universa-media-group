/* global React, window */
// Cases — collapsible rows

const CaseRow = ({ item, isOpen, onToggle }) => {
  return (
    <div className="case-row" data-open={isOpen} onClick={onToggle}>
      <div className="case-head">
        <div className="case-num">/{item.n}</div>
        <div className="case-title">
          <div className="client">{item.client}</div>
          <div className="kind">{item.kind}</div>
        </div>
        <div className="case-meta">{item.year} · {item.tech}</div>
        <div className="case-toggle" aria-expanded={isOpen}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="case-body">
        <div className="case-body-inner">
          <div className="case-block">
            <div className="label">{useLabelTask()}</div>
            <p>{item.task}</p>
          </div>
          <div className="case-block">
            <div className="label">{useLabelSolution()}</div>
            <p>{item.solution}</p>
          </div>
          <div className="case-block">
            <div className="label">{useLabelResult()}</div>
            <div className="case-result">
              {item.result.map((r, i) => (
                <div key={i} className="metric">
                  {r.v}
                  <small>{r.k}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const useLabelTask = () => {
  const { lang } = window.useLang();
  return lang === "ru" ? "Задача" : "Task";
};
const useLabelSolution = () => {
  const { lang } = window.useLang();
  return lang === "ru" ? "Решение" : "Solution";
};
const useLabelResult = () => {
  const { lang } = window.useLang();
  return lang === "ru" ? "Результат" : "Result";
};

const Cases = () => {
  const { t } = window.useLang();
  const c = t.cases;
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <section className="cases container" id="cases">
      <window.SectionTag>{c.tag}</window.SectionTag>
      <window.Reveal>
        <div className="mono-label">{c.tag}</div>
      </window.Reveal>
      <window.Reveal>
        <div className="section-head" style={{ marginTop: 24 }}>
          <h2>{c.title}</h2>
          <p>{c.desc}</p>
        </div>
      </window.Reveal>

      <window.Reveal>
        <div className="case-list">
          {c.items.map((item, i) => (
            <CaseRow
              key={item.n}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </window.Reveal>
    </section>
  );
};

window.Cases = Cases;
