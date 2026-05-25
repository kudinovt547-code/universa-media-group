/* global React, window */
// Quiz — multi-step brief that opens Telegram with prefilled message
// Лиды параллельно уходят в наш backend, который пересылает их в лид-бот.

const TELEGRAM_HANDLE = "universamgmanagebot";
const LEAD_ENDPOINT = "https://apart.guru/api/universa/lead";

const Quiz = () => {
  const { t, lang } = window.useLang();
  const q = t.quiz;
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState(() => q.questions.map((qq) => qq.multi ? [] : (qq.input ? "" : null)));
  const [done, setDone] = React.useState(false);

  // Reset answers shape when language switches (keeps content sane)
  React.useEffect(() => {
    setAnswers(q.questions.map((qq, i) => {
      const prev = answers[i];
      if (qq.multi) return Array.isArray(prev) ? prev : [];
      if (qq.input) return typeof prev === "string" ? prev : "";
      return prev != null && typeof prev !== "object" ? prev : null;
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const current = q.questions[step];
  const isLast = step === q.questions.length - 1;

  const canProceed = (() => {
    const a = answers[step];
    if (current.multi) return Array.isArray(a) && a.length > 0;
    if (current.input) return typeof a === "string" && a.trim().length >= 2;
    return a != null;
  })();

  const toggleOpt = (opt) => {
    setAnswers((arr) => {
      const copy = [...arr];
      if (current.multi) {
        const s = new Set(copy[step] || []);
        if (s.has(opt)) s.delete(opt); else s.add(opt);
        copy[step] = Array.from(s);
      } else {
        copy[step] = opt;
      }
      return copy;
    });
  };

  const submit = () => {
    // Build a structured payload for the lead bot
    const payload = {
      source: "universa-media-group/quiz",
      lang,
      submittedAt: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      answers: q.questions.map((qq, i) => ({
        question: qq.q,
        value: qq.multi ? (answers[i] || []) : (answers[i] || ""),
      })),
    };

    // Fire-and-forget: пересылаем в лид-бот через backend.
    try {
      fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch (e) { /* ignore */ }

    // Сразу открываем диалог с AI-консультантом с предзаполненным сообщением
    const lines = [];
    lines.push(lang === "ru" ? "🟣 Заявка с сайта Universa Media Group" : "🟣 Universa Media Group brief");
    lines.push("");
    q.questions.forEach((qq, i) => {
      const a = answers[i];
      let val = "";
      if (qq.multi) val = (a || []).join(", ");
      else if (qq.input) val = a || "";
      else val = a || "";
      lines.push(`▸ ${qq.q}`);
      lines.push(`   ${val}`);
      lines.push("");
    });
    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://t.me/${TELEGRAM_HANDLE}?start=brief&text=${text}`;
    window.open(url, "_blank", "noopener");
    setDone(true);
  };

  const onNext = () => {
    if (!canProceed) return;
    if (isLast) submit();
    else setStep(step + 1);
  };
  const onBack = () => setStep(Math.max(0, step - 1));

  return (
    <section className="quiz" id="quiz">
      <div className="container">
        <window.SectionTag>{q.tag}</window.SectionTag>
        <window.Reveal>
          <div className="mono-label">{q.tag}</div>
        </window.Reveal>
        <window.Reveal>
          <div className="section-head" style={{ marginTop: 24 }}>
            <h2>{q.title}</h2>
            <p>{q.desc}</p>
          </div>
        </window.Reveal>

        <window.Reveal>
          <div className="quiz-card">
            {!done ? (
              <React.Fragment>
                <div className="quiz-progress">
                  <div className="quiz-steps">
                    {q.questions.map((_, i) => (
                      <div
                        key={i}
                        className="quiz-step-pill"
                        data-active={i === step}
                        data-done={i < step}
                      />
                    ))}
                  </div>
                  <div className="quiz-step-counter">
                    {q.stepLabel} {step + 1} {q.of} {q.questions.length}
                  </div>
                </div>

                <div className="quiz-q" key={step}>
                  <h3>{current.q}</h3>
                  <div className="quiz-sub">{current.sub}</div>

                  {current.input ? (
                    <input
                      className="quiz-input"
                      type="text"
                      placeholder={current.placeholder}
                      value={answers[step] || ""}
                      onChange={(e) => {
                        setAnswers((arr) => {
                          const copy = [...arr];
                          copy[step] = e.target.value;
                          return copy;
                        });
                      }}
                      onKeyDown={(e) => { if (e.key === "Enter" && canProceed) onNext(); }}
                      autoFocus
                    />
                  ) : (
                    <div className={`quiz-options ${current.opts.length <= 4 && current.opts.some(o => o.length > 22) ? "single" : ""}`}>
                      {current.opts.map((opt) => {
                        const isSelected = current.multi
                          ? (answers[step] || []).includes(opt)
                          : answers[step] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            className="quiz-option"
                            aria-pressed={isSelected}
                            onClick={() => toggleOpt(opt)}
                          >
                            <span className="opt-label">{opt}</span>
                            <span className="check">
                              <svg viewBox="0 0 12 12" fill="none">
                                <path d="M2 6.5l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="quiz-footer">
                  <button className="btn" onClick={onBack} disabled={step === 0} style={{ opacity: step === 0 ? 0.4 : 1 }}>
                    ← {q.back}
                  </button>
                  <window.Magnetic>
                    <button
                      className="btn primary"
                      onClick={onNext}
                      disabled={!canProceed}
                      style={{ opacity: canProceed ? 1 : 0.45, pointerEvents: canProceed ? "auto" : "none" }}
                    >
                      {isLast ? q.submit : q.next}
                      <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </window.Magnetic>
                </div>
              </React.Fragment>
            ) : (
              <div className="quiz-final">
                <div className="check-big">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14.5l5.5 5.5L23 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>{q.finalTitle}</h3>
                <p>{q.finalDesc}</p>
                <window.Magnetic>
                  <a className="btn primary" href={`https://t.me/${TELEGRAM_HANDLE}`} target="_blank" rel="noopener">
                    {q.finalCta}
                    <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7.5 2.5L12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </window.Magnetic>
              </div>
            )}
          </div>
        </window.Reveal>
      </div>
    </section>
  );
};

window.Quiz = Quiz;
