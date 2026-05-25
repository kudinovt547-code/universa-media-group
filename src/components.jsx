/* global React, window */
// Universa Media Group — shared components

// ============================================================
// Logo — monogram UMG (no mark, just three letters)
// ============================================================
const Logo = () => (
  <a href="#top" className="logo" aria-label="Universa Media Group">
    <span className="logo-text">
      UMG<span className="logo-dot">.</span>
    </span>
  </a>
);

// ============================================================
// Magnetic cursor
// ============================================================
const Cursor = () => {
  const dot = React.useRef(null);
  const ring = React.useRef(null);
  React.useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;

    const state = { x: 0, y: 0, rx: 0, ry: 0, dx: 0, dy: 0 };
    let raf;

    const onMove = (e) => {
      state.x = e.clientX;
      state.y = e.clientY;
      state.dx = e.clientX;
      state.dy = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${state.dx}px, ${state.dy}px) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      state.rx += (state.x - state.rx) * 0.18;
      state.ry += (state.y - state.ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${state.rx}px, ${state.ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e) => {
      const interactive = e.target.closest("a, button, [data-magnetic], input, textarea");
      if (!ring.current) return;
      ring.current.dataset.state = interactive ? "hover" : "";
    };
    const onDown = () => { if (ring.current) ring.current.dataset.state = "press"; };
    const onUp = () => { if (ring.current) ring.current.dataset.state = ""; };
    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = 0;
      if (ring.current) ring.current.style.opacity = 0;
    };
    const onEnter = () => {
      if (dot.current) dot.current.style.opacity = 1;
      if (ring.current) ring.current.style.opacity = 1;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);
  return (
    <React.Fragment>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </React.Fragment>
  );
};

// ============================================================
// Theme & Language pills
// ============================================================
const ThemeToggle = () => {
  const { theme, setTheme } = window.useTheme();
  return (
    <div className="pill" role="group" aria-label="Theme">
      <button aria-pressed={theme === "dark"} onClick={() => setTheme("dark")} aria-label="Dark theme">DARK</button>
      <button aria-pressed={theme === "light"} onClick={() => setTheme("light")} aria-label="Light theme">LIGHT</button>
    </div>
  );
};

const LangToggle = () => {
  const { lang, setLang } = window.useLang();
  return (
    <div className="pill" role="group" aria-label="Language">
      <button aria-pressed={lang === "ru"} onClick={() => setLang("ru")}>RU</button>
      <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
    </div>
  );
};

// ============================================================
// Reveal-on-scroll
// ============================================================
const Reveal = ({ children, delay = 0, as: Tag = "div", className = "", ...rest }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
};

// ============================================================
// ParticleMorph — the centerpiece.
// 1800 particles morph between SPHERE → UMG → GLOBE → NETWORK
// → WAVE → TORUS in an endless loop. Springy physics, depth-sorted
// rendering, cursor repulsion, rotates in 3D.
// ============================================================
const ParticleMorph = () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 1800;
    const px = new Float32Array(N), py = new Float32Array(N), pz = new Float32Array(N);
    const tx = new Float32Array(N), ty = new Float32Array(N), tz = new Float32Array(N);
    const vx = new Float32Array(N), vy = new Float32Array(N), vz = new Float32Array(N);

    // Seed random positions inside unit cube
    for (let i = 0; i < N; i++) {
      px[i] = (Math.random() - 0.5) * 2;
      py[i] = (Math.random() - 0.5) * 2;
      pz[i] = (Math.random() - 0.5) * 2;
    }

    // ----- Shape generators (each returns Array<[x,y,z]> of length N, normalized ~[-1,1]) -----
    const shapeSphere = () => {
      const pts = new Array(N);
      const phi = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = phi * i;
        pts[i] = [Math.cos(t) * r, y, Math.sin(t) * r];
      }
      return pts;
    };

    const shapeGlobe = () => {
      const pts = new Array(N);
      let idx = 0;
      const latCount = 14, lonCount = 16;
      const ringSamples = Math.floor(N / (latCount + lonCount));
      for (let l = 0; l < latCount && idx < N; l++) {
        const lat = -Math.PI / 2 + ((l + 0.5) / latCount) * Math.PI;
        const r = Math.cos(lat), y = Math.sin(lat);
        for (let p = 0; p < ringSamples && idx < N; p++) {
          const a = (p / ringSamples) * Math.PI * 2;
          pts[idx++] = [Math.cos(a) * r, y, Math.sin(a) * r];
        }
      }
      for (let l = 0; l < lonCount && idx < N; l++) {
        const lon = (l / lonCount) * Math.PI * 2;
        const cs = Math.cos(lon), sn = Math.sin(lon);
        for (let p = 0; p < ringSamples && idx < N; p++) {
          const lat = -Math.PI / 2 + (p / ringSamples) * Math.PI;
          const r = Math.cos(lat);
          pts[idx++] = [cs * r, Math.sin(lat), sn * r];
        }
      }
      const phi = Math.PI * (3 - Math.sqrt(5));
      while (idx < N) {
        const y = 1 - (idx / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = phi * idx;
        pts[idx] = [Math.cos(t) * r, y, Math.sin(t) * r];
        idx++;
      }
      return pts;
    };

    const shapeText = (text) => {
      const off = document.createElement("canvas");
      off.width = 1000; off.height = 500;
      const c = off.getContext("2d");
      c.fillStyle = "#fff";
      c.font = 'bold 280px "JetBrains Mono", ui-monospace, monospace';
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(text, 500, 250);
      const img = c.getImageData(0, 0, 1000, 500);
      const filled = [];
      for (let y = 0; y < 500; y += 4) {
        for (let x = 0; x < 1000; x += 4) {
          const i = (y * 1000 + x) * 4;
          if (img.data[i + 3] > 128) {
            filled.push([(x - 500) / 250, (y - 250) / 250, 0]);
          }
        }
      }
      const pts = new Array(N);
      if (filled.length === 0) {
        // Font not ready yet — fall back to sphere
        return shapeSphere();
      }
      for (let i = 0; i < N; i++) {
        const src = filled[i % filled.length];
        const jx = (Math.random() - 0.5) * 0.02;
        const jy = (Math.random() - 0.5) * 0.02;
        const jz = (Math.random() - 0.5) * 0.18;
        pts[i] = [src[0] + jx, src[1] + jy, src[2] + jz];
      }
      return pts;
    };

    const shapeNetwork = () => {
      const pts = new Array(N);
      const nodes = 20;
      const centers = [];
      for (let i = 0; i < nodes; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(2 * Math.random() - 1);
        const r = 0.55 + Math.random() * 0.35;
        centers.push([
          r * Math.sin(v) * Math.cos(u),
          r * Math.sin(v) * Math.sin(u),
          r * Math.cos(v),
        ]);
      }
      // ~30% of particles cluster at nodes, ~70% along edges
      const nodeShare = Math.floor(N * 0.3);
      for (let i = 0; i < nodeShare; i++) {
        const c = centers[i % nodes];
        pts[i] = [
          c[0] + (Math.random() - 0.5) * 0.06,
          c[1] + (Math.random() - 0.5) * 0.06,
          c[2] + (Math.random() - 0.5) * 0.06,
        ];
      }
      for (let i = nodeShare; i < N; i++) {
        const a = centers[Math.floor(Math.random() * nodes)];
        const b = centers[Math.floor(Math.random() * nodes)];
        const t = Math.random();
        pts[i] = [
          a[0] + (b[0] - a[0]) * t + (Math.random() - 0.5) * 0.02,
          a[1] + (b[1] - a[1]) * t + (Math.random() - 0.5) * 0.02,
          a[2] + (b[2] - a[2]) * t + (Math.random() - 0.5) * 0.02,
        ];
      }
      return pts;
    };

    const shapeWave = () => {
      const pts = new Array(N);
      const side = Math.ceil(Math.sqrt(N));
      for (let i = 0; i < N; i++) {
        const r = i % side;
        const c = Math.floor(i / side);
        const x = (r / (side - 1) - 0.5) * 1.7;
        const z = (c / (side - 1) - 0.5) * 1.7;
        const y = Math.sin(x * 3.2) * 0.22 + Math.cos(z * 2.8) * 0.22;
        pts[i] = [x, y, z];
      }
      return pts;
    };

    const shapeTorus = () => {
      const pts = new Array(N);
      const R = 0.75, r = 0.28;
      const tubeCount = 28;
      const ringCount = Math.ceil(N / tubeCount);
      for (let i = 0; i < N; i++) {
        const tIdx = i % tubeCount;
        const rIdx = Math.floor(i / tubeCount);
        const u = (rIdx / ringCount) * Math.PI * 2;
        const v = (tIdx / tubeCount) * Math.PI * 2;
        const cu = Math.cos(u), su = Math.sin(u);
        const cv = Math.cos(v), sv = Math.sin(v);
        pts[i] = [(R + r * cv) * cu, r * sv, (R + r * cv) * su];
      }
      return pts;
    };

    const shapeHelix = () => {
      const pts = new Array(N);
      const turns = 4;
      for (let i = 0; i < N; i++) {
        const t = i / (N - 1);
        const angle = t * Math.PI * 2 * turns;
        const helix = i % 2 === 0 ? 1 : -1;
        const x = 0.6 * helix * Math.cos(angle);
        const z = 0.6 * helix * Math.sin(angle);
        const y = (t - 0.5) * 1.7;
        pts[i] = [x, y, z];
      }
      return pts;
    };

    // Build initial shape list (UMG text may need fonts; we'll lazy-build on first cycle)
    let shapes = [];
    const buildShapes = () => {
      shapes = [
        { name: "SPHERE",  pts: shapeSphere() },
        { name: "UMG",     pts: shapeText("UMG") },
        { name: "GLOBE",   pts: shapeGlobe() },
        { name: "NETWORK", pts: shapeNetwork() },
        { name: "HELIX",   pts: shapeHelix() },
        { name: "WAVE",    pts: shapeWave() },
        { name: "TORUS",   pts: shapeTorus() },
      ];
    };
    // Wait for fonts before building text shape
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { buildShapes(); applyShape(0); });
    } else {
      buildShapes();
    }
    buildShapes(); // initial (sphere is correct regardless)

    let currentShape = 0;
    let nextShapeAt = performance.now() + 4800;

    const applyShape = (idx) => {
      if (!shapes[idx]) return;
      const pts = shapes[idx].pts;
      // Random reassignment — gives a satisfying scatter+regroup motion
      const order = new Int32Array(N);
      for (let i = 0; i < N; i++) order[i] = i;
      for (let i = N - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
      }
      for (let i = 0; i < N; i++) {
        const p = pts[order[i]];
        tx[i] = p[0];
        ty[i] = p[1];
        tz[i] = p[2];
      }
    };
    applyShape(0);

    // Interaction
    let rotY = 0;
    let mxRel = 0, myRel = 0, tmx = 0, tmy = 0;
    let mouseSx = -9999, mouseSy = -9999;

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseSx = e.clientX - r.left;
      mouseSy = e.clientY - r.top;
      tmx = (e.clientX / window.innerWidth) - 0.5;
      tmy = (e.clientY / window.innerHeight) - 0.5;
    };
    const onLeave = () => { mouseSx = -9999; mouseSy = -9999; };
    window.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const pxs = new Float32Array(N);
    const pys = new Float32Array(N);
    const pzs = new Float32Array(N);
    const orderArr = new Int32Array(N);
    for (let i = 0; i < N; i++) orderArr[i] = i;

    let lastT = performance.now();
    let raf;
    const STIFF = 5.0;
    const DAMP = 5.5;

    const draw = (now) => {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      if (now > nextShapeAt && shapes.length > 0) {
        currentShape = (currentShape + 1) % shapes.length;
        applyShape(currentShape);
        nextShapeAt = now + 4800;
      }

      mxRel += (tmx - mxRel) * 0.08;
      myRel += (tmy - myRel) * 0.08;
      rotY += dt * 0.22;

      const tiltX = -0.18 + myRel * 0.45;
      const swivelY = rotY + mxRel * 0.7;
      const cosY = Math.cos(swivelY), sinY = Math.sin(swivelY);
      const cosX = Math.cos(tiltX),  sinX = Math.sin(tiltX);

      const cx = W / 2, cy = H / 2;
      const rad = Math.min(W, H) * 0.36;

      // Update + project
      for (let i = 0; i < N; i++) {
        const dxT = tx[i] - px[i], dyT = ty[i] - py[i], dzT = tz[i] - pz[i];
        vx[i] += (dxT * STIFF - vx[i] * DAMP) * dt;
        vy[i] += (dyT * STIFF - vy[i] * DAMP) * dt;
        vz[i] += (dzT * STIFF - vz[i] * DAMP) * dt;
        px[i] += vx[i] * dt;
        py[i] += vy[i] * dt;
        pz[i] += vz[i] * dt;

        const x0 = px[i], y0 = py[i], z0 = pz[i];
        const x1 = x0 * cosY - z0 * sinY;
        const z1 = x0 * sinY + z0 * cosY;
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        let sx = cx + x1 * rad;
        let sy = cy + y2 * rad;

        // Cursor repulsion in screen space
        if (mouseSx > -1000) {
          const ddx = sx - mouseSx;
          const ddy = sy - mouseSy;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < 9000) {
            const d = Math.sqrt(d2) + 0.001;
            const f = (1 - d2 / 9000) * 40;
            sx += (ddx / d) * f;
            sy += (ddy / d) * f;
          }
        }
        pxs[i] = sx;
        pys[i] = sy;
        pzs[i] = z2;
      }

      // Insertion-ish sort by z (back -> front); plain JS sort is fast enough
      for (let i = 0; i < N; i++) orderArr[i] = i;
      const ord = Array.from(orderArr);
      ord.sort((a, b) => pzs[a] - pzs[b]);

      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.dataset.theme !== "light";

      // Inner haze
      const haze = ctx.createRadialGradient(cx, cy, rad * 0.15, cx, cy, rad * 1.4);
      haze.addColorStop(0, isDark ? "rgba(139,92,246,0.20)" : "rgba(139,92,246,0.12)");
      haze.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, W, H);

      // Particles
      for (let i = 0; i < N; i++) {
        const k = ord[i];
        const depth = (pzs[k] + 1) * 0.5;
        const size = 0.5 + depth * 1.9;
        const a = isDark ? 0.07 + depth * 0.88 : 0.10 + depth * 0.72;
        const Hh = 262 + depth * 28;
        const L = isDark ? 58 + depth * 22 : 36 + depth * 16;
        ctx.fillStyle = `hsla(${Hh}, 84%, ${L}%, ${a})`;
        ctx.beginPath();
        ctx.arc(pxs[k], pys[k], size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return <canvas ref={ref} className="dot-sphere" />;
};

// ============================================================
// Orb — just the morph canvas, no HUD readouts
// ============================================================
const Orb = () => (
  <div className="orb-stage" aria-hidden="true">
    <ParticleMorph />
  </div>
);

// ============================================================
// Background — clean, focused: dotted texture + radial glow + scan lines
// ============================================================
const MeshBackground = () => {
  return (
    <div className="mesh-bg" aria-hidden="true">
      <div className="mesh-glow" />
      <div className="mesh-glow mesh-glow-2" />
      <div className="mesh-dots" />
      <div className="mesh-scan" />
      <div className="mesh-vignette" />
    </div>
  );
};

// ============================================================
// Section tag (top-right corner number)
// ============================================================
const SectionTag = ({ children }) => (
  <div className="section-tag">{children}</div>
);

// ============================================================
// Magnetic CTA wrapper
// ============================================================
const Magnetic = ({ children, strength = 0.25 }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return <span ref={ref} style={{ display: "inline-block", transition: "transform .25s cubic-bezier(.16,1,.3,1)" }} data-magnetic="">{children}</span>;
};

// ============================================================
// Service card with mouse-follow glow
// ============================================================
const ServiceCell = ({ item, isLast }) => {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} className="service-cell" onMouseMove={onMove}>
      <div className="num">
        <span>SERVICE / {item.n}</span>
        <span className="dot" />
      </div>
      <h3>{item.t}</h3>
      <p>{item.d}</p>
      <div className="tags">
        {item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
      </div>
    </div>
  );
};

// expose
Object.assign(window, { Logo, Cursor, ThemeToggle, LangToggle, Reveal, Orb, MeshBackground, SectionTag, Magnetic, ServiceCell });
