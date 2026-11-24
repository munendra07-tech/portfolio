import { useState, useEffect, useRef } from "react";
import "./App.css";

/* ---------- Site settings (edit these) ---------- */
const FORMSPREE_ID = ""; // paste your Formspree form ID here, e.g. "xyzabcde"
const RESUME_URL = ""; // e.g. "/resume.pdf" once the PDF is in /public
const EMAIL = "munendrabv07@gmail.com";
const PHONE = "+91 7569666827";
const LINKEDIN = "https://linkedin.com/in/munendra-b-v-0889b6228";
const GITHUB = "https://github.com/munendra07-tech";

const SKILLS = [
  { cat: "AI & Agents", items: ["LLM apps", "MCP", "RAG", "Qdrant", "LLM evals", "TensorFlow", "Keras", "scikit-learn", "OpenCV"] },
  { cat: "Backend", items: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "MySQL", "SQL", "Flask", "pytest"] },
  { cat: "Frontend", items: ["React", "JavaScript", "HTML / CSS"] },
  { cat: "Tooling", items: ["Git & GitHub", "GitHub Actions", "Docker", "Linux", "AWS (EC2, S3)", "Vercel"] },
];

const FEATURED = [
  {
    title: "agent-crashtest",
    tag: "Open source · AI reliability",
    link: "https://github.com/munendra07-tech/agent-crashtest",
    desc: "Crash-tests an AI agent's MCP tool calls. When a tool's response is lost, did the refund happen once, twice, or not at all? A local fake refund tool and a database as ground truth give a PASS/FAIL report for CI.",
    points: [
      "Injects a lost-response fault, then counts real refunds from the database instead of trusting the agent's own report",
      "Ships a self-test with a safe and an unsafe control agent, so the harness itself can be trusted",
      "Versioned package with CI, releases and Docker images (MIT)",
    ],
    tech: ["Python", "MCP", "PostgreSQL", "Docker", "GitHub Actions"],
  },
  {
    title: "memory-assistant",
    tag: "LLM · Vector search",
    link: "https://github.com/munendra07-tech/memory-assistant",
    desc: "A FastAPI chat service that remembers facts about each user across conversations, stored in Qdrant, plus an evaluation suite that measures how well it remembers.",
    points: [
      "Recalls relevant memories by embedding search before answering, and stores new facts after each message",
      "Replaces changed facts in place and skips repeats, so memory stays clean",
      "Every read and write is filtered per user, so memories never leak between users",
    ],
    tech: ["Python", "FastAPI", "Qdrant", "RAG", "Evals"],
  },
  {
    title: "Dalal Street Pro",
    tag: "Full stack · Finance",
    link: "https://github.com/munendra07-tech/dalal-street-pro",
    live: "https://dalal-street-pro.vercel.app",
    desc: "Portfolio tracker for the Indian stock market with live P&L, a BUY/SELL trade engine, SIP planning, a screener and automatic tax classification.",
    points: [
      "Live portfolio P&L computed in a SQL view, with day-gain tracking",
      "Trade engine for CNC, MIS and NRML orders with automatic STT and brokerage",
      "Screener, dividend calendar, IPO tracker and a NIFTY 50 benchmark comparison",
    ],
    tech: ["FastAPI", "MySQL", "React", "JWT"],
  },
];

const EARLIER = [
  { title: "Federated Fraud Detection", desc: "Privacy-preserving fraud detection trained across institutions without sharing raw data. FedProx beat FedAvg by 4% F1 on non-IID data.", tech: ["Flower", "FATE", "Differential Privacy"] },
  { title: "Brain Stroke Detection", desc: "CNN classifier with transfer learning on imbalanced clinical images, reaching 93% accuracy and served as a Flask REST API.", tech: ["TensorFlow", "Keras", "OpenCV", "Flask"] },
];

const NAV = [["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["contact", "Contact"]];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={"reveal" + (shown ? " in" : "")} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

function SectionHead({ kicker, title }) {
  return (
    <div className="sec-head">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      const body = `${form.message}\n\nFrom: ${form.name} (${form.email})`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio message from " + form.name)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (r.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); } else setStatus("error");
    } catch { setStatus("error"); }
  };

  if (status === "sent") return <div className="form-done">Thanks, your message is on its way. I'll reply soon.</div>;
  return (
    <form className="form" onSubmit={submit}>
      <label>Name<input required value={form.name} onChange={set("name")} placeholder="Your name" /></label>
      <label>Email<input required type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" /></label>
      <label>Message<textarea required rows={5} value={form.message} onChange={set("message")} placeholder="Tell me about the role or project" /></label>
      <button className="btn primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send message"}</button>
      {status === "error" && <p className="form-err">Something went wrong. Please email me directly at {EMAIL}.</p>}
    </form>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  return (
    <div className="app">
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <a className="logo" href="#top">BV<span>.</span>Munendra</a>
        <nav className={"links" + (menu ? " open" : "")}>
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "☀" : "☾"}</button>
          <button className="icon-btn menu-btn" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? "✕" : "☰"}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="badge"><i /> Open to full-time roles · Hyderabad, India</span>
              <h1>Hi, I'm <span className="grad">B V Munendra</span></h1>
              <p className="role">AI &amp; Backend Engineer</p>
              <p className="lead">
                I build reliable AI systems: testing how agents fail, giving assistants measurable long-term memory, and shipping everything with tests, CI and clear documentation.
              </p>
              <div className="cta">
                <a className="btn primary" href="#contact">Get in touch</a>
                <a className="btn" href="#projects">View projects</a>
                {RESUME_URL && <a className="btn" href={RESUME_URL} download>Resume ↓</a>}
              </div>
              <div className="socials">
                <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={`mailto:${EMAIL}`}>Email</a>
              </div>
            </div>
            <div className="avatar-wrap">
              <div className="avatar-glow" />
              <img src={process.env.PUBLIC_URL + "/avatar.svg"} alt="Illustrated avatar of B V Munendra" className="avatar" />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <Reveal><SectionHead kicker="01 · About" title="Building software that keeps working when things go wrong" /></Reveal>
            <div className="about-grid">
              <Reveal>
                <p className="body">
                  I'm an AI &amp; Data Science graduate who likes the unglamorous part of AI: reliability. My recent projects test what happens when an agent's tool call fails halfway, and measure whether a chat assistant really remembers what users told it.
                </p>
                <p className="body">
                  I learn by shipping. Each project here is a working repository with tests and documentation, not a notebook. I'm looking for an AI, ML or backend engineering role where I can keep building and learning quickly.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="card edu">
                  <span className="kicker">Education</span>
                  <h3>B.Tech, Artificial Intelligence &amp; Data Science</h3>
                  <p>Woxsen University, Hyderabad</p>
                  <p className="muted">2021 – 2025</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className="section alt">
          <div className="container">
            <Reveal><SectionHead kicker="02 · Skills" title="Tools I work with" /></Reveal>
            <div className="skills-grid">
              {SKILLS.map((s, i) => (
                <Reveal key={s.cat} delay={i * 0.07}>
                  <div className="card">
                    <h3>{s.cat}</h3>
                    <div className="chips">{s.items.map((t) => <span key={t}>{t}</span>)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <Reveal><SectionHead kicker="03 · Projects" title="Things I've built" /></Reveal>
            <div className="featured">
              {FEATURED.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <article className="card project">
                    <span className="kicker">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                    <div className="chips">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
                    <div className="proj-links">
                      <a href={p.link} target="_blank" rel="noreferrer">GitHub ↗</a>
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live demo ↗</a>}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <h3 className="sub-h">Earlier work</h3>
            <div className="earlier">
              {EARLIER.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="card">
                    <h3>{p.title}</h3>
                    <p className="muted-p">{p.desc}</p>
                    <div className="chips">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section alt">
          <div className="container">
            <Reveal><SectionHead kicker="04 · Contact" title="Let's talk" /></Reveal>
            <div className="contact-grid">
              <Reveal>
                <p className="body">I'm open to AI engineer, ML engineer, backend and data roles. Send a message or reach me directly.</p>
                <ul className="contact-list">
                  <li><span>Email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                  <li><span>Phone</span><a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a></li>
                  <li><span>LinkedIn</span><a href={LINKEDIN} target="_blank" rel="noreferrer">munendra-b-v</a></li>
                  <li><span>GitHub</span><a href={GITHUB} target="_blank" rel="noreferrer">munendra07-tech</a></li>
                </ul>
              </Reveal>
              <Reveal delay={0.1}><div className="card"><ContactForm /></div></Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <span>© 2026 B V Munendra</span>
          <span>Built with React · Hosted on Vercel</span>
        </div>
      </footer>
    </div>
  );
}
