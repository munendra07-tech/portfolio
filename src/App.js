import { useState, useEffect, useRef } from "react";

const SKILLS = [
  { cat: "Languages & Cloud", items: ["Python", "SQL", "Bash", "AWS EC2/S3", "Git", "Linux"] },
  { cat: "ML / AI Frameworks", items: ["TensorFlow", "Keras", "Scikit-learn", "Flower", "FATE", "HuggingFace", "OpenCV", "Flask"] },
  { cat: "Data Science", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "NLTK"] },
  { cat: "Concepts", items: ["Federated Learning", "Deep Learning", "Computer Vision", "Differential Privacy", "NLP", "EDA"] },
];

const PROJECTS = [
  {
    id: "federated", num: "01", title: "Federated Fraud Detection", subtitle: "Privacy-Preserving ML System", year: "2024",
    desc: "Architected a distributed fraud detection system that trains across financial institutions without centralising raw data — privacy by design, not as an afterthought.",
    stats: [{ val: "4%", label: "F1 gain" }, { val: "35%", label: "Dim. reduction" }, { val: "2", label: "Frameworks" }],
    tech: ["Flower", "FATE", "FedProx", "PSO", "Differential Privacy", "Matplotlib"],
    bullets: ["FedProx outperformed FedAvg by 4% F1-score on non-IID data with faster client convergence", "Reduced feature space 35% using Particle Swarm Optimisation without loss of predictive power", "Enforced end-to-end data confidentiality via differential privacy mechanisms"],
  },
  {
    id: "stroke", num: "02", title: "Brain Stroke Detection", subtitle: "Medical Imaging via CNN", year: "2024",
    desc: "Deep learning classifier for brain stroke detection — built to handle brutal class imbalance of real clinical datasets, deployed as a production inference API.",
    stats: [{ val: "93%", label: "Accuracy" }, { val: "REST", label: "Flask API" }, { val: "ROC", label: "Validated" }],
    tech: ["TensorFlow", "Keras", "OpenCV", "Flask", "Transfer Learning", "Data Augmentation"],
    bullets: ["Achieved 93% accuracy via transfer learning and augmentation on imbalanced clinical data", "Validated with ROC-AUC, precision-recall curves, and confusion matrix analysis", "Deployed real-time inference pipeline as a Flask REST API"],
  },
];

const CERTS = [
  { title: "AWS Fundamentals Specialization", sub: "3 Courses · Amazon Web Services", issuer: "AWS", date: "Nov 2023", verify: "https://coursera.org/verify/specialization/2AV5Y2EXR4C9" },
  { title: "Python for Data Science, AI & Dev", sub: "IBM · Coursera", issuer: "IBM", date: "Apr 2023", verify: "https://coursera.org/verify/AMF84J3E9M6S" },
  { title: "EDA for Machine Learning", sub: "IBM · Coursera", issuer: "IBM", date: "Nov 2023", verify: "https://coursera.org/verify/XMTXBA4THMS2" },
  { title: "Foundations: Data, Data, Everywhere", sub: "Google · Coursera", issuer: "Google", date: "May 2023", verify: "https://coursera.org/verify/867787HV7YVB" },
  { title: "Introduction to Cloud Computing", sub: "IBM · Coursera", issuer: "IBM", date: "Jul 2024", verify: "https://coursera.org/verify/BLAXTBCY6CCC" },
  { title: "Architecting Solutions on AWS", sub: "Amazon Web Services · Coursera", issuer: "AWS", date: "Nov 2023", verify: "https://coursera.org/verify/9XKZC35NAXJ3" },
  { title: "Social Media Data Analytics", sub: "University of Washington · Coursera", issuer: "UW", date: "Nov 2023", verify: "https://coursera.org/verify/KBW87KHYSN6L" },
];

const TIMELINE = [
  { year: "2021", title: "Started B.Tech — AI & Data Science", sub: "Woxsen University, Hyderabad", type: "edu" },
  { year: "2023", title: "AWS, IBM & Google Certifications", sub: "5 industry certifications completed", type: "cert" },
  { year: "Feb 2024", title: "Cybersecurity Intern", sub: "Techno Spark IT Solutions · 6 months", type: "work" },
  { year: "Sep 2024", title: "🏆 TechVortex 2.0 — 1st Place", sub: "National Hackathon · Symbiosis Institute of Technology, Pune", type: "award" },
  { year: "Mar 2025", title: "Patent Filed & Published", sub: "AI-Enhanced Firefighting Drone · IP India #202541019069", type: "patent" },
  { year: "2025", title: "B.Tech Graduate", sub: "Artificial Intelligence & Data Science · Woxsen University", type: "edu" },
];

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const t = threshold;
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, inView];
}

function useTypewriter(text, speed, delay) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const t1 = setTimeout(() => {
      let i = 0; setTyped("");
      const t2 = setInterval(() => { setTyped(text.slice(0, i + 1)); i++; if (i === text.length) clearInterval(t2); }, speed);
      return () => clearInterval(t2);
    }, delay);
    return () => clearTimeout(t1);
  }, [text, speed, delay]);
  return typed;
}

function FadeIn({ children, delay, y, style }) {
  const d = delay || 0; const yy = y || 40;
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : `translateY(${yy}px)`, transition: `opacity 0.9s ease ${d}s, transform 0.9s ease ${d}s`, ...(style || {}) }}>
      {children}
    </div>
  );
}

function Avatar() {
  return (
    <div style={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ position: "absolute", inset: -(i * 16 + 10), border: `1px solid rgba(255,255,255,${0.1 - i * 0.03})`, borderRadius: "50%", animation: `spin${i % 2 === 0 ? "Cw" : "Ccw"} ${12 + i * 8}s linear infinite` }} />
      ))}
      {[0, 1, 2].map(i => (
        <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 6, height: 6, borderRadius: "50%", background: `rgba(255,255,255,${0.9 - i * 0.25})`, marginLeft: -3, marginTop: -3, animation: `orb${i} ${4 + i * 2.5}s linear infinite` }} />
      ))}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
        <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bg2" cx="40%" cy="35%"><stop offset="0%" stopColor="#222"/><stop offset="100%" stopColor="#060606"/></radialGradient>
            <radialGradient id="face2" cx="45%" cy="35%"><stop offset="0%" stopColor="#c8a882"/><stop offset="100%" stopColor="#a87850"/></radialGradient>
            <clipPath id="clip2"><circle cx="80" cy="80" r="80"/></clipPath>
          </defs>
          <circle cx="80" cy="80" r="80" fill="url(#bg2)"/>
          <g clipPath="url(#clip2)">
            <path d="M34 72 Q38 44 80 42 Q122 44 126 72 Q130 100 120 116 Q108 134 80 138 Q52 134 40 116 Q30 100 34 72Z" fill="url(#face2)"/>
            <path d="M36 74 Q38 38 80 34 Q122 38 124 74 Q112 52 80 50 Q48 52 36 74Z" fill="#0d0802"/>
            <path d="M32 76 Q30 60 40 48 Q54 32 80 30 Q106 32 120 48 Q130 60 128 76 Q118 54 80 52 Q42 54 32 76Z" fill="#0d0802"/>
            <ellipse cx="60" cy="58" rx="12" ry="6" fill="#0a0601" opacity="0.9"/>
            <ellipse cx="100" cy="58" rx="12" ry="6" fill="#0a0601" opacity="0.9"/>
            <ellipse cx="59" cy="80" rx="5.5" ry="6.5" fill="#fff"/>
            <ellipse cx="101" cy="80" rx="5.5" ry="6.5" fill="#fff"/>
            <ellipse cx="61" cy="81" rx="3.5" ry="4.5" fill="#1a0e04"/>
            <ellipse cx="103" cy="81" rx="3.5" ry="4.5" fill="#1a0e04"/>
            <circle cx="62" cy="79" r="1.2" fill="#fff" opacity="0.9"/>
            <circle cx="104" cy="79" r="1.2" fill="#fff" opacity="0.9"/>
            <path d="M70 98 Q80 107 90 98" stroke="#7a5030" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M38 118 Q42 106 52 100 Q64 94 80 92 Q96 94 108 100 Q118 106 122 118 Q110 132 80 135 Q50 132 38 118Z" fill="#121228"/>
            <path d="M52 100 Q64 110 80 108 Q96 110 108 100 Q104 118 80 120 Q56 118 52 100Z" fill="#e8e8e8" opacity="0.9"/>
          </g>
          <circle cx="80" cy="80" r="79" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        </svg>
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.1),transparent)", animation: "scanLine 3s ease-in-out infinite", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView(0.05);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(60px)", transition: `opacity 0.9s ease ${i * 0.15}s, transform 0.9s ease ${i * 0.15}s, background 0.4s, border-color 0.4s`, background: hov ? "#111" : "#080808", border: `1px solid ${hov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"}`, borderRadius: 16, padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginBottom: 10 }}>PROJECT {p.num} · {p.year}</div>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{p.title}</h3>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{p.subtitle}</div>
        </div>
        <div style={{ width: 46, height: 46, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>{p.num === "01" ? "⬡" : "◈"}</div>
      </div>
      <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>{p.desc}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28, padding: "18px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {p.stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
        {p.bullets.map((b, j) => (
          <li key={j} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 14, lineHeight: 1.6, flexShrink: 0 }}>›</span>
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontWeight: 300 }}>{b}</span>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.tech.map(t => <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "4px 10px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}>{t}</span>)}
      </div>
    </div>
  );
}

function CertCard({ c, i }) {
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView(0.05);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `all 0.7s ease ${i * 0.08}s`, background: hov ? "#111" : "#080808", border: `1px solid ${hov ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "24px", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 500, color: "#fff", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4 }}>{c.issuer}</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{c.date}</div>
      </div>
      <div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 500, color: "#fff", lineHeight: 1.4, marginBottom: 4 }}>{c.title}</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{c.sub}</div>
      </div>
      <a href={c.verify} target="_blank" rel="noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'DM Mono',monospace", fontSize: 10, color: hov ? "#fff" : "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textDecoration: "none", transition: "color 0.2s", marginTop: "auto", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        VERIFY ↗
      </a>
    </div>
  );
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [mx, setMx] = useState(0); const [my, setMy] = useState(0);
  const [tx, setTx] = useState(0); const [ty, setTy] = useState(0);
  const name1 = useTypewriter("B V", 130, 400);
  const name2 = useTypewriter("Munendra", 90, 900);
  const role = useTypewriter("Data Scientist", 70, 2000);

  useEffect(() => {
    const s = () => setScrollY(window.scrollY);
    const m = (e) => { setMx(e.clientX); setMy(e.clientY); };
    window.addEventListener("scroll", s, { passive: true });
    window.addEventListener("mousemove", m);
    return () => { window.removeEventListener("scroll", s); window.removeEventListener("mousemove", m); };
  }, []);

  useEffect(() => {
    let frame, cx = 0, cy = 0;
    const go = () => { cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1; setTx(cx); setTy(cy); frame = requestAnimationFrame(go); };
    frame = requestAnimationFrame(go);
    return () => cancelAnimationFrame(frame);
  }, [mx, my]);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: "#050505", color: "#e8e8f0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@300;400;500&family=Sora:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::selection{background:rgba(255,255,255,0.12);color:#fff;}
        ::-webkit-scrollbar{width:2px;}
        ::-webkit-scrollbar-track{background:#050505;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:1px;}
        .container{max-width:1100px;margin:0 auto;padding:0 40px;}
        @media(max-width:768px){.container{padding:0 20px;}.rings-deco{display:none!important;}}
        .nb{background:none;border:none;font-family:'DM Mono',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.25);padding:8px 14px;transition:color 0.3s;cursor:pointer;border-radius:4px;}
        .nb:hover{color:#fff;}
        .cta-w{display:inline-flex;align-items:center;gap:10px;padding:13px 28px;background:#fff;color:#050505;border-radius:6px;font-family:'Sora',sans-serif;font-weight:600;font-size:14px;text-decoration:none;border:none;transition:all 0.3s;cursor:pointer;}
        .cta-w:hover{background:#ddd;transform:translateY(-2px);}
        .cta-b{display:inline-flex;align-items:center;gap:10px;padding:13px 28px;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);border-radius:6px;font-family:'Sora',sans-serif;font-weight:300;font-size:14px;text-decoration:none;transition:all 0.3s;background:transparent;cursor:pointer;}
        .cta-b:hover{border-color:rgba(255,255,255,0.4);color:#fff;transform:translateY(-2px);}
        .sk{display:inline-block;font-family:'DM Mono',monospace;font-size:11px;padding:6px 13px;border-radius:20px;margin:3px;border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.35);transition:all 0.2s;}
        .sk:hover{border-color:rgba(255,255,255,0.35);color:#fff;}
        .cl{display:flex;align-items:center;gap:16px;padding:18px 22px;border:1px solid rgba(255,255,255,0.06);border-radius:10px;background:#080808;text-decoration:none;transition:all 0.3s;}
        .cl:hover{border-color:rgba(255,255,255,0.18);transform:translateX(6px);}
        @keyframes spinCw{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes spinCcw{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
        @keyframes orb0{from{transform:rotate(0deg) translateX(92px) rotate(0deg)}to{transform:rotate(360deg) translateX(92px) rotate(-360deg)}}
        @keyframes orb1{from{transform:rotate(120deg) translateX(82px) rotate(-120deg)}to{transform:rotate(480deg) translateX(82px) rotate(-480deg)}}
        @keyframes orb2{from{transform:rotate(240deg) translateX(74px) rotate(-240deg)}to{transform:rotate(600deg) translateX(74px) rotate(-600deg)}}
        @keyframes blink{50%{opacity:0}}
        @keyframes scanLine{0%{top:-4px;opacity:0}15%{opacity:0.8}85%{opacity:0.3}100%{top:100%;opacity:0}}
        @keyframes pglow{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0.04)}50%{box-shadow:0 0 50px 0 rgba(255,255,255,0.07)}}
        .blink{animation:blink 1s step-end infinite;}
        .pglow{animation:pglow 5s ease-in-out infinite;}
        .sec-tag{font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.25);letter-spacing:0.22em;text-transform:uppercase;margin-bottom:14px;display:flex;align-items:center;gap:14px;}
        .sec-tag::before{content:'';display:block;width:28px;height:1px;background:rgba(255,255,255,0.15);}
        .sec-h{font-family:'Playfair Display',serif;font-size:clamp(34px,5vw,58px);font-weight:700;color:#fff;line-height:1.06;margin-bottom:52px;letter-spacing:-0.02em;}
      `}</style>

      {/* Cursor */}
      <div style={{ position: "fixed", left: mx - 4, top: my - 4, width: 8, height: 8, background: "#fff", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference" }} />
      <div style={{ position: "fixed", left: tx - 20, top: ty - 20, width: 40, height: 40, border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998 }} />

      {/* Noise */}
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, opacity: 0.03 }}>
        <filter id="n2"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
        <rect width="100%" height="100%" filter="url(#n2)"/>
      </svg>

      {/* Grid lines */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[...Array(9)].map((_, i) => <div key={i} style={{ position: "absolute", left: `${(i + 1) * 10}%`, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.035) 20%,rgba(255,255,255,0.035) 80%,transparent)" }} />)}
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 60 ? "rgba(5,5,5,0.92)" : "transparent", backdropFilter: scrollY > 60 ? "blur(20px)" : "none", borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all 0.4s" }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#fff", letterSpacing: "0.08em", opacity: 0.7 }}>bv<span style={{ opacity: 0.3 }}>.</span>munendra</span>
        <div style={{ display: "flex", gap: 0 }}>
          {["home","skills","projects","certifications","achievements","contact"].map(s => (
            <button key={s} className="nb" onClick={() => go(s)}>{s}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "8%", right: "3%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.025) 0%,transparent 60%)", transform: `translateY(${scrollY * 0.12}px)`, pointerEvents: "none" }} />

        {/* Decorative rings */}
        <div className="rings-deco" style={{ position: "absolute", right: "5%", top: "50%", marginTop: -190, pointerEvents: "none" }}>
          {[380, 290, 200].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: s, height: s, top: "50%", left: "50%", marginLeft: -s / 2, marginTop: -s / 2, border: `1px solid rgba(255,255,255,${0.03 + i * 0.015})`, borderRadius: "50%", animation: `spin${i % 2 === 0 ? "Cw" : "Ccw"} ${20 + i * 12}s linear infinite` }} />
          ))}
          <div style={{ position: "absolute", top: "50%", left: "50%", marginLeft: -50, marginTop: -50, width: 100, height: 100, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>AI</span>
          </div>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 5, paddingTop: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 44, marginBottom: 44, flexWrap: "wrap" }}>
            <Avatar />
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 16px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 40, background: "rgba(255,255,255,0.02)", marginBottom: 24 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", opacity: 0.7, animation: "blink 2s ease-in-out infinite" }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em" }}>AVAILABLE FOR HIRE</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: 18 }}>
                <div style={{ fontSize: "clamp(48px,7vw,82px)", color: "#fff" }}>{name1}<span className="blink" style={{ color: "#fff", opacity: name1 === "B V" ? 0 : 1 }}>|</span></div>
                <div style={{ fontSize: "clamp(48px,7vw,82px)", WebkitTextStroke: "1.5px rgba(255,255,255,0.55)", color: "transparent" }}>{name2}<span className="blink" style={{ WebkitTextStroke: "none", color: "#fff", opacity: name2.length > 0 && name2.length < 8 ? 1 : 0 }}>|</span></div>
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 1, background: "rgba(255,255,255,0.25)" }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "clamp(12px,1.6vw,17px)", color: "rgba(255,255,255,0.6)" }}>{role}<span className="blink" style={{ color: "#fff" }}>_</span></span>
              </div>
            </div>
          </div>

          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.9, maxWidth: 540, marginBottom: 40, fontWeight: 300 }}>
            Patent-holding AI graduate & national hackathon champion. Building <span style={{ color: "#fff", fontWeight: 400 }}>privacy-preserving ML systems</span> at the intersection of federated learning, deep learning, and real-world impact.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 40 }}>
            {["📜 Patent Filed & Published", "🏆 Hackathon 1st Place", "🎓 B.Tech AI & DS 2025", "📍 Open to Relocation", "7 Certifications"].map(b => (
              <span key={b} style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "7px 13px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 40, color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.015)" }}>{b}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="mailto:munendrabv07@gmail.com" className="cta-w">Get in touch ↗</a>
            <button className="cta-b" onClick={() => go("projects")}>View projects →</button>
            <a href="https://linkedin.com/in/munendra-b-v-0889b6228" target="_blank" rel="noreferrer" className="cta-b">LinkedIn ↗</a>
            <a href="https://github.com/munendra07-tech" target="_blank" rel="noreferrer" className="cta-b">GitHub ↗</a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.15)", letterSpacing: "0.22em" }}>SCROLL</span>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom,rgba(255,255,255,0.15),transparent)" }} />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "120px 0" }}>
        <div className="container">
          <FadeIn>
            <div className="sec-tag">02 — Skills</div>
            <h2 className="sec-h">Built for the<br /><em>real world.</em></h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
            {SKILLS.map((s, i) => (
              <FadeIn key={s.cat} delay={i * 0.1}>
                <div style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "26px 22px", height: "100%" }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>{s.cat}</div>
                  <div>{s.items.map(item => <span key={item} className="sk">{item}</span>)}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "120px 0" }}>
        <div className="container">
          <FadeIn>
            <div className="sec-tag">03 — Projects</div>
            <h2 className="sec-h">Work that<br /><em>proves it.</em></h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 18 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" style={{ padding: "120px 0" }}>
        <div className="container">
          <FadeIn>
            <div className="sec-tag">04 — Certifications</div>
            <h2 className="sec-h">Credentials<br /><em>that verify.</em></h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
            {CERTS.map((c, i) => <CertCard key={c.title} c={c} i={i} />)}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{ padding: "120px 0" }}>
        <div className="container">
          <FadeIn>
            <div className="sec-tag">05 — Achievements</div>
            <h2 className="sec-h">Proof,<br /><em>not promises.</em></h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="pglow" style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "44px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.2),transparent)" }} />
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <span style={{ fontSize: 42, lineHeight: 1, flexShrink: 0 }}>📜</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", marginBottom: 12 }}>PATENT FILED & PUBLISHED · IP INDIA · 2025</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(17px,2.2vw,24px)", fontWeight: 700, color: "#fff", marginBottom: 16, lineHeight: 1.3 }}>AI-Enhanced Firefighting Drone with Thermal Imaging<br />and First Aid Deployment</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                    {[["Application No.", "202541019069"], ["Filed", "04/03/2025"], ["Published", "21/03/2025"], ["Status", "Filed ✓  Published ✓"]].map(([k, v]) => (
                      <span key={k} style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "5px 12px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, color: "rgba(255,255,255,0.45)" }}>
                        <span style={{ color: "rgba(255,255,255,0.22)" }}>{k}: </span>{v}
                      </span>
                    ))}
                  </div>
                  <a href="https://iprsearch.ipindia.gov.in/PatentSearch/PatentSearch/ViewApplicationStatus" target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#fff", textDecoration: "none", padding: "10px 20px", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 6, letterSpacing: "0.08em" }}>
                    VIEW ON IP INDIA ↗
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "44px", marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <span style={{ fontSize: 42, lineHeight: 1, flexShrink: 0 }}>🏆</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", marginBottom: 12 }}>NATIONAL HACKATHON · 1ST PLACE · SEP 2024</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(17px,2.2vw,24px)", fontWeight: 700, color: "#fff", marginBottom: 10 }}>TechVortex 2.0 — Winner</h3>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, fontWeight: 300, marginBottom: 14 }}>Symbiosis Institute of Technology, Pune · International Project Competition organised by SIT ACM Student Chapter · Team: Generative AI, Woxsen University, Hyderabad</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["1st Place", "International", "SIT ACM Pune", "26–27 Sep 2024"].map(t => (
                      <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "4px 11px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, color: "rgba(255,255,255,0.3)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.3}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 56 }}>
              {[["93%","CNN Accuracy"],["35%","Dim. Reduction"],["4%","FedProx Gain"],["7","Certifications"],["1","Patent"]].map(([val, label]) => (
                <div key={label} style={{ background: "#080808", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "26px 18px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: 10 }}>{val}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Timeline */}
          <FadeIn delay={0.1}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 28 }}>— Journey</div>
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{ position: "absolute", left: 4, top: 8, bottom: 8, width: 1, background: "linear-gradient(to bottom,rgba(255,255,255,0.08),rgba(255,255,255,0.02))" }} />
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 28 }}>
                  <div style={{ position: "absolute", left: -25, top: 5, width: 9, height: 9, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", background: "#050505" }} />
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em", marginBottom: 5 }}>{t.year}</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 3 }}>{t.title}</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>{t.sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px 0 80px" }}>
        <div className="container">
          <FadeIn>
            <div className="sec-tag">06 — Contact</div>
            <h2 className="sec-h">Let's build<br /><em>something real.</em></h2>
            <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.38)", lineHeight: 1.85, maxWidth: 440, marginBottom: 52, fontWeight: 300 }}>Open to Data Scientist, ML Engineer, and AI Analyst roles across India. Working on something ambitious? Let's talk.</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10, maxWidth: 620 }}>
            {[
              { icon: "✉", label: "EMAIL", val: "munendrabv07@gmail.com", href: "mailto:munendrabv07@gmail.com" },
              { icon: "📞", label: "PHONE", val: "+91 7569666827", href: "tel:+917569666827" },
              { icon: "🔗", label: "LINKEDIN", val: "munendra-b-v", href: "https://linkedin.com/in/munendra-b-v-0889b6228" },
              { icon: "⌥", label: "GITHUB", val: "munendra07-tech", href: "https://github.com/munendra07-tech" },
            ].map((c, i) => (
              <FadeIn key={c.label} delay={i * 0.1}>
                <a href={c.href} target="_blank" rel="noreferrer" className="cl">
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", marginBottom: 3 }}>{c.label}</div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{c.val}</div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>© 2025 B V MUNENDRA</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>BUILT WITH REACT · DEPLOYED ON VERCEL</span>
      </footer>
    </div>
  );
}