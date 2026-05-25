/* global React, window */
// Marquee + Contact (big telegram link) + Footer

const Marquee = () => {
  const { lang } = window.useLang();
  const items = lang === "ru"
    ? ["AI · Сайты", "Приложения", "Чат-агенты", "Внутреннее ПО", "Telegram боты", "VK боты", "Контент-фабрики"]
    : ["AI · Websites", "Mobile Apps", "Chat Agents", "Internal Tools", "Telegram Bots", "VK Bots", "Content Factories"];
  const track = [...items, ...items];
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((w, i) => (
          <React.Fragment key={i}>
            <span className={i % 2 ? "accent" : ""}>{w}</span>
            <span className="dot" />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = window.useLang();
  const c = t.contact;
  return (
    <section className="contact container" id="contact">
      <window.SectionTag>{c.tag}</window.SectionTag>
      <window.Reveal>
        <div className="mono-label">{c.tag}</div>
      </window.Reveal>
      <window.Reveal>
        <h2 className="contact-big" style={{ marginTop: 32 }}>
          {c.lead} {c.mid}{" "}
          <window.Magnetic strength={0.12}>
            <a href={`https://t.me/${c.handle.replace("@", "")}`} target="_blank" rel="noopener">
              {c.handle}
            </a>
          </window.Magnetic>
          {c.end}
        </h2>
      </window.Reveal>

      <window.Reveal>
        <div className="contact-meta">
          {c.meta.map((m) => (
            <div key={m.k}>
              <div className="k">{m.k}</div>
              <div className="v">{m.v}</div>
            </div>
          ))}
        </div>
      </window.Reveal>
    </section>
  );
};

const Footer = () => {
  const { t } = window.useLang();
  return (
    <footer className="footer container">
      <div>{t.footer.left}</div>
      <div>{t.footer.right}</div>
    </footer>
  );
};

window.Marquee = Marquee;
window.Contact = Contact;
window.Footer = Footer;
