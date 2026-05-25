/* global React, ReactDOM, window */
// Top-level app: nav + sections

const Nav = () => {
  const { t } = window.useLang();
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <window.Logo />
      <div className="nav-links">
        <a href="#services">{t.nav.services}</a>
        <a href="#cases">{t.nav.cases}</a>
        <a href="#process">{t.nav.process}</a>
        <a href="#quiz">{t.nav.quiz}</a>
        <a href="#contact">{t.nav.contact}</a>
      </div>
      <div className="nav-right">
        <window.LangToggle />
        <window.ThemeToggle />
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <React.Fragment>
      <window.MeshBackground />
      <window.Cursor />
      <Nav />
      <main>
        <window.Hero />
        <window.Services />
        <window.Cases />
        <window.Process />
        <window.Quiz />
        <window.Marquee />
        <window.Contact />
      </main>
      <window.Footer />
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
