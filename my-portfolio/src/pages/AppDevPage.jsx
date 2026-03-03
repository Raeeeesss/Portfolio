import { useReveal } from "../hooks/index.js";
import ProjectCard from "../components/ProjectCard.jsx";

const APP_PROJECTS = [
  {
    num: "01",
    title: "Flask REST API",
    desc: "Fully structured REST API — CRUD operations, JWT authentication, request validation, and SQLite integration. Clean modular architecture.",
    tags: ["Python", "Flask", "REST API", "SQLite", "JWT"],
    status: "soon",
    href: null,
  },
  {
    num: "02",
    title: "Django Blog Platform",
    desc: "Full-featured blog with user auth, post creation and editing, comment threads, category tags, and an admin dashboard.",
    tags: ["Python", "Django", "PostgreSQL", "HTML", "CSS"],
    status: "soon",
    href: null,
  },
  {
    num: "03",
    title: "Inventory Management System",
    desc: "Python back-end for managing product inventory — stock tracking, low-stock alerts, supplier records, and PDF report generation.",
    tags: ["Python", "Flask", "MySQL", "REST API"],
    status: "soon",
    href: null,
  },
  {
    num: "04",
    title: "Student Grade Tracker",
    desc: "CLI Python app that tracks student grades, calculates GPA, generates summary reports, and exports CSV. Clean OOP architecture.",
    tags: ["Python", "SQLite", "CSV", "OOP", "CLI"],
    status: "soon",
    href: null,
  },
  {
    num: "05",
    title: "CLI Budget Planner",
    desc: "Terminal-based budget planner with income/expense tracking, monthly summaries, ASCII charts, and JSON data persistence.",
    tags: ["Python", "JSON", "CLI", "Data Viz"],
    status: "soon",
    href: null,
  },
  {
    num: "06",
    title: "AI / ML Mini Projects",
    desc: "Collection of ML experiments — digit recognition, sentiment analysis, and data visualisation using NumPy, Pandas, and scikit-learn.",
    tags: ["Python", "NumPy", "Pandas", "scikit-learn", "ML"],
    status: "soon",
    href: null,
  },
];

export default function AppDevPage({ go }) {
  useReveal();
  return (
    <>
      <div className="p-intro">
        <div className="p-intro-inner">
          <div className="p-intro-eye">Python · Back-End · APIs · ML</div>
          <h1 className="p-intro-title">App<br /><em>Development.</em></h1>
          <p className="p-intro-sub">
            Python-powered back-end apps, REST APIs, Django and Flask projects, and early AI/ML experiments — all coming soon.
          </p>
        </div>
      </div>

      <section className="p-sec">
        <div className="p-slabel p-rev"><div className="p-stag">All Projects</div><div className="p-srule" /></div>
        <div className="p-cards-grid p-rev">
          {APP_PROJECTS.map(p => <ProjectCard key={p.num} {...p} />)}
        </div>
      </section>

      <section className="p-sec" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="p-slabel p-rev"><div className="p-stag">Tech Stack</div><div className="p-srule" /></div>
        <div className="p-stack-row p-rev">
          {["Python 3", "Flask", "Django", "REST APIs", "SQLite", "MySQL", "PostgreSQL", "JWT Auth", "NumPy", "Pandas", "scikit-learn", "Git"].map(t => (
            <span className="p-schip" key={t}>{t}</span>
          ))}
        </div>
      </section>

      <div className="p-cta">
        <div className="p-rev">
          <h2 className="p-cta-title">Want to <em>collaborate?</em></h2>
          <p className="p-cta-body">Open to back-end freelance work, API integrations, and Python projects of all sizes.</p>
          <div className="p-cta-btns">
            <button className="p-btn" onClick={() => go("home", "contact")}><span>Get in touch →</span></button>
            <button className="p-outline" onClick={() => go("webdev")}>View Web Dev</button>
            <button className="p-outline" onClick={() => go("home")}>Back to Home</button>
          </div>
        </div>
      </div>
    </>
  );
}
