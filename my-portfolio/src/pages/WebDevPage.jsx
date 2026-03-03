import { useReveal } from "../hooks/index.js";
import ProjectCard from "../components/ProjectCard.jsx";

const WEB_PROJECTS = [
  {
    num: "01",
    title: "Expense Tracker",
    desc: "Full expense management web app — user login, dashboard, transaction history, category filtering, and running balance. Built in vanilla JS and deployed live on GitHub Pages.",
    tags: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
    status: "live",
    href: "https://raeeeesss.github.io/EXPENCE-TRACKER/login.html",
  },
  {
    num: "02",
    title: "Browser Game",
    desc: "Canvas-based browser game with a custom game loop, collision detection, player movement, enemy AI, and score tracking — vanilla JavaScript only.",
    tags: ["JavaScript", "HTML5 Canvas", "Game Loop", "OOP"],
    status: "soon",
    href: null,
  },
  {
    num: "03",
    title: "Weather Dashboard",
    desc: "Responsive weather app fetching live data from a public API. Shows current conditions, 5-day forecast, and location search with smooth UI transitions.",
    tags: ["JavaScript", "REST API", "CSS3", "Fetch API"],
    status: "soon",
    href: null,
  },
  {
    num: "04",
    title: "Task Manager App",
    desc: "Productivity app with drag-and-drop, priority labels, due dates, and local persistence. Fully responsive across all screen sizes.",
    tags: ["HTML5", "CSS3", "JavaScript", "Drag & Drop API"],
    status: "soon",
    href: null,
  },
  {
    num: "05",
    title: "Quiz Platform",
    desc: "Interactive quiz with timed rounds, score tracking, animated transitions, and a leaderboard — no back-end required.",
    tags: ["JavaScript", "CSS3", "HTML5", "Animations"],
    status: "soon",
    href: null,
  },
  {
    num: "06",
    title: "Landing Page Builder",
    desc: "Animated landing page template system with multiple layout presets, CSS custom properties, and dark mode support.",
    tags: ["HTML5", "CSS3", "JavaScript", "Design"],
    status: "soon",
    href: null,
  },
];

export default function WebDevPage({ go }) {
  useReveal();
  return (
    <>
      <div className="p-intro">
        <div className="p-intro-inner">
          <div className="p-intro-eye">Front-End · Browsers · Interfaces</div>
          <h1 className="p-intro-title">
            Web
            <br />
            <em>Development.</em>
          </h1>
          <p className="p-intro-sub">
            Responsive websites, browser apps, and interactive UIs. The Expense
            Tracker is live — more coming soon.
          </p>
        </div>
      </div>

      <section className="p-sec">
        <div className="p-slabel p-rev">
          <div className="p-stag">All Projects</div>
          <div className="p-srule" />
        </div>
        <div className="p-cards-grid p-rev">
          {WEB_PROJECTS.map((p) => (
            <ProjectCard key={p.num} {...p} />
          ))}
        </div>
      </section>

      <section
        className="p-sec"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="p-cta">
          <div className="p-rev">
            <h2 className="p-cta-title">
              Want to <em>collaborate?</em>
            </h2>
            <p className="p-cta-body">
              Open to freelance projects, collaborations, and new web
              challenges.
            </p>
            <div className="p-cta-btns">
              <button className="p-btn" onClick={() => go("home", "contact")}>
                <span>Get in touch →</span>
              </button>
              <button className="p-outline" onClick={() => go("appdev")}>
                View App Dev
              </button>
              <button className="p-outline" onClick={() => go("home")}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
