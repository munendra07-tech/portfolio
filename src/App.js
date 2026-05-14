import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Achievements", "Contact"];

const SKILLS = [
  { category: "Languages & Cloud", items: ["Python", "SQL", "Bash", "AWS (EC2, S3)", "Git"] },
  { category: "ML / AI Frameworks", items: ["TensorFlow", "Keras", "Scikit-learn", "Flower (Flwr)", "FATE", "HuggingFace", "OpenCV", "Flask"] },
  { category: "Data Science", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "NLTK"] },
  { category: "Concepts", items: ["Federated Learning", "Deep Learning", "Computer Vision", "Differential Privacy", "NLP", "EDA"] },
];

const PROJECTS = [
  {
    title: "Federated Learning Fraud Detection",
    tag: "Privacy-Preserving ML",
    tagColor: "#00e5a0",
    description: "Architected a privacy-preserving fraud detection system across distributed financial datasets using Flower and FATE frameworks, eliminating the need to centralise sensitive data.",
    bullets: [
      "FedProx outperformed FedAvg by 4% F1-score on non-IID data with faster convergence",
      "Reduced feature space by 35% using Particle Swarm Optimisation (PSO)",
      "Enforced end-to-end confidentiality via differential privacy mechanisms",
    ],
    tech: ["Flower", "FATE", "FedAvg", "FedProx", "PSO", "Differential Privacy", "Matplotlib"],
    icon: "⬡",
  },
  {
    title: "Brain Stroke Detection via CNN",
    tag: "Medical Imaging AI",
    tagColor: "#ff6b6b",
    description: "Built a CNN classifier for brain stroke detection achieving 93% accuracy via transfer learning and data augmentation on imbalanced clinical data.",
    bullets: [
      "Validated with ROC-AUC, precision-recall curves, and confusion matrix analysis",
      "Deployed real-time inference pipeline via Flask REST API",
      "Applied targeted data augmentation to handle class imbalance",
    ],
    tech: ["TensorFlow", "Keras", "OpenCV", "Flask", "Transfer Learning", "ROC-AUC"],
    icon: "◈",
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "1st Prize — TechVortex 2.0", sub: "National Hackathon · Symbiosis Institute of Technology, Pune · 2024", color: "#f5c842" },
  { icon: "📜", title: "Patent Holder", sub: "AI-based Drone Surveillance System · Granted", color: "#00e5a0" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Section({ id, children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      padding: "80px 0",
    }}>
      {children}
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#00e5a0", letterSpacing: "0.15em", textTransform: "uppercase" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #00e5a0, transparent)" }} />
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "Data Scientist";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <div style={{
      background: "#080c10",
      color: "#e8edf2",
      minHeight: "100vh",
      fontFamily: "'Sora', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #00e5a033; color: #00e5a0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080c10; } ::-webkit-scrollbar-thumb { background: #00e5a0; border-radius: 2px; }
        .container { max-width: 980px; margin: 0 auto; padding: 0 28px; }
        .nav-link { background: none; border: none; cursor: pointer; font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 14px; border-radius: 4px; transition: all 0.2s; }
        .chip { display: inline-block; font-family: 'DM Mono', monospace; font-size: 11px; padding: 3px 10px; border-radius: 3px; background: #0d1a14; border: 1px solid #00e5a022; color: #00e5a0; margin: 3px; }
        .project-card { background: #0c1117; border: 1px solid #1a2332; border-radius: 12px; padding: 36px; transition: border-color 0.3s, transform 0.3s; cursor: default; }
        .project-card:hover { border-color: #00e5a044; transform: translateY(-4px); }
        .skill-pill { display: inline-block; font-family: 'DM Mono', monospace; font-size: 11px; padding: 6px 14px; border-radius: 20px; margin: 4px; border: 1px solid #1e2d3d; color: #8899aa; cursor: pointer; transition: all 0.2s; background: #0c1117; }
        .skill-pill:hover { border-color: #00e5a0; color: #00e5a0; background: #0d1a14; }
        .achievement-card { display: flex; align-items: flex-start; gap: 20px; background: #0c1117; border: 1px solid #1a2332; border-radius: 12px; padding: 28px 32px; transition: border-color 0.3s; }
        .achievement-card:hover { border-color: #00e5a044; }
        .contact-link { display: flex; align-items: center; gap: 12px; color: #8899aa; text-decoration: none; font-size: 14px; padding: 16px 20px; border: 1px solid #1a2332; border-radius: 10px; background: #0c1117; transition: all 0.25s; }
        .contact-link:hover { border-color: #00e5a0; color: #00e5a0; transform: translateX(4px); }
        .cursor { display: inline-block; width: 2px; height: 1em; background: #00e5a0; margin-left: 3px; animation: blink 1s step-end infinite; vertical-align: text-bottom; }
        @keyframes blink { 50% { opacity: 0; } }
        .glow-dot { width: 8px; height: 8px; border-radius: 50%; background: #00e5a0; box-shadow: 0 0 12px #00e5a0; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        .grid-bg { position: fixed; inset: 0; background-image: linear-gradient(#0d1520 1px, transparent 1px), linear-gradient(90deg, #0d1520 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; opacity: 0.4; z-index: 0; }
        .hero-accent { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, #00e5a011 0%, transparent 70%); top: -100px; right: -100px; pointer-events: none; }
      `}</style>

      <div className="grid-bg" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "14px 28px",
        background: scrolled ? "rgba(8,12,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1a2332" : "none",
        transition: "all 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#00e5a0", letterSpacing: "0.05em" }}>bv.munendra</span>
        <div style={{ display: "flex", gap: 4 }}>
          {NAV_LINKS.map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l)}
              style={{ color: active === l ? "#00e5a0" : "#6677889" }}>
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div id="about" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div className="hero-accent" />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 100 }}>
          <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <div className="glow-dot" />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#00e5a0", letterSpacing: "0.15em" }}>AVAILABLE FOR WORK</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(52px, 8vw, 88px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 16, letterSpacing: "-0.02em" }}>
            B V<br />
            <span style={{ WebkitTextStroke: "2px #e8edf2", color: "transparent" }}>Munendra</span>
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(16px, 2.5vw, 22px)", color: "#00e5a0", fontWeight: 500 }}>
              {typedText}<span className="cursor" />
            </span>
          </div>

          <p style={{ fontSize: 16, color: "#8899aa", lineHeight: 1.8, maxWidth: 560, marginBottom: 40 }}>
            Patent-holding AI graduate & national hackathon winner. Specialised in
            <span style={{ color: "#00e5a0" }}> federated learning</span>,
            <span style={{ color: "#00e5a0" }}> deep learning</span>, and
            <span style={{ color: "#00e5a0" }}> privacy-preserving ML</span> across financial and medical imaging domains.
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {["📜 Patent Holder", "🏆 Hackathon Winner", "🎓 B.Tech AI & DS 2025", "📍 Open to Relocation"].map(b => (
              <span key={b} style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, padding: "7px 14px", border: "1px solid #1e2d3d", borderRadius: 20, color: "#8899aa" }}>{b}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="https://linkedin.com/in/munendra-b-v-0889b6228" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "#00e5a0", color: "#080c10", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseOver={e => e.currentTarget.style.opacity = 0.85} onMouseOut={e => e.currentTarget.style.opacity = 1}>
              LinkedIn ↗
            </a>
            <a href="https://github.com/munendra-bv" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", border: "1px solid #1e2d3d", color: "#e8edf2", borderRadius: 8, fontWeight: 500, fontSize: 14, textDecoration: "none", background: "transparent", transition: "border-color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#00e5a0"} onMouseOut={e => e.currentTarget.style.borderColor = "#1e2d3d"}>
              GitHub ↗
            </a>
            <a href="mailto:munendraravi999@gmail.com"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", border: "1px solid #1e2d3d", color: "#e8edf2", borderRadius: 8, fontWeight: 500, fontSize: 14, textDecoration: "none", background: "transparent", transition: "border-color 0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#00e5a0"} onMouseOut={e => e.currentTarget.style.borderColor = "#1e2d3d"}>
              Email ↗
            </a>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <Section id="skills">
        <div className="container">
          <SectionLabel>02 / Skills</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {SKILLS.map(({ category, items }) => (
              <div key={category} style={{ background: "#0c1117", border: "1px solid #1a2332", borderRadius: 12, padding: "24px" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#00e5a0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{category}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {items.map(item => (
                    <span key={item} className="skill-pill"
                      onMouseEnter={() => setHoveredSkill(item)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={hoveredSkill === item ? { borderColor: "#00e5a0", color: "#00e5a0", background: "#0d1a14" } : {}}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <div className="container">
          <SectionLabel>03 / Projects</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {PROJECTS.map(p => (
              <div key={p.title} className="project-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ fontSize: 32, lineHeight: 1 }}>{p.icon}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "4px 12px", borderRadius: 20, border: `1px solid ${p.tagColor}33`, color: p.tagColor }}>
                    {p.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "#8899aa", lineHeight: 1.7, marginBottom: 20 }}>{p.description}</p>
                <ul style={{ paddingLeft: 0, marginBottom: 24, listStyle: "none" }}>
                  {p.bullets.map(b => (
                    <li key={b} style={{ fontSize: 13, color: "#6677aa", lineHeight: 1.6, marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: p.tagColor }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ACHIEVEMENTS */}
      <Section id="achievements">
        <div className="container">
          <SectionLabel>04 / Achievements</SectionLabel>
          <div style={{ display: "grid", gap: 16 }}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.title} className="achievement-card">
                <span style={{ fontSize: 36, lineHeight: 1 }}>{a.icon}</span>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, color: a.color }}>{a.title}</h3>
                  <p style={{ fontSize: 14, color: "#8899aa" }}>{a.sub}</p>
                </div>
              </div>
            ))}
            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 8 }}>
              {[["93%", "CNN Accuracy"], ["35%", "Dimensionality Reduction"], ["4%", "FedProx Accuracy Gain"]].map(([val, label]) => (
                <div key={label} style={{ background: "#0c1117", border: "1px solid #1a2332", borderRadius: 12, padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 900, color: "#00e5a0", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6677aa", marginTop: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div className="container">
          <SectionLabel>05 / Contact</SectionLabel>
          <p style={{ fontSize: 16, color: "#8899aa", marginBottom: 36, maxWidth: 480, lineHeight: 1.7 }}>
            Open to Data Scientist, ML Engineer, and AI Analyst roles across India. Let's build something impactful together.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, maxWidth: 600 }}>
            <a href="mailto:munendrabv07@gmail.com" className="contact-link">
              <span style={{ fontSize: 20 }}>✉</span>
              <div>
                <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", color: "#00e5a0", marginBottom: 2 }}>EMAIL</div>
                <div style={{ fontSize: 13 }}>munendrabv07@gmail.com</div>
              </div>
            </a>
            <a href="tel:+917569666827" className="contact-link">
              <span style={{ fontSize: 20 }}>📞</span>
              <div>
                <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", color: "#00e5a0", marginBottom: 2 }}>PHONE</div>
                <div style={{ fontSize: 13 }}>+91 7569666827</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/munendra-b-v-0889b6228" target="_blank" rel="noreferrer" className="contact-link">
              <span style={{ fontSize: 20 }}>🔗</span>
              <div>
                <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", color: "#00e5a0", marginBottom: 2 }}>LINKEDIN</div>
                <div style={{ fontSize: 13 }}>munendra-b-v</div>
              </div>
            </a>
            <a href="https://github.com/munendra-bv" target="_blank" rel="noreferrer" className="contact-link">
              <span style={{ fontSize: 20 }}>⌥</span>
              <div>
                <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", color: "#00e5a0", marginBottom: 2 }}>GITHUB</div>
                <div style={{ fontSize: 13 }}>munendra-bv</div>
              </div>
            </a>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #1a2332", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#445566" }}>© 2025 B V Munendra</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#445566" }}>Built with React · Deployed on Vercel</span>
      </div>
    </div>
  );
}