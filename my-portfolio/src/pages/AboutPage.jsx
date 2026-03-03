import { useReveal, useSkillBars } from "../hooks/index.js";
import { FullSkillsGrid } from "../components/SkillsGrid.jsx";

const J = [
  { num:"01", title:"Python Full Stack — BCA Course", text:"Studying Python Full Stack as part of my BCA degree. Built first deployed project — an Expense Tracker. Learning by shipping." },
  { num:"02", title:"Web Development — Browser Projects", text:"Building responsive sites with HTML5, CSS3, JavaScript. Finishing a canvas-based browser game with collision detection." },
  { num:"03", title:"App Development — Back-End Foundations", text:"Learning Flask and Django. Building REST APIs, working with databases, creating full-stack applications." },
  { num:"04", title:"AI & Machine Learning — Early Steps", text:"Beginning to explore AI/ML. Working through Python libraries and core ML concepts. Genuinely excited about where this leads." },
];

export default function AboutPage({ go }) {
  useReveal();
  useSkillBars();
  return (
    <>
      <div className="p-intro">
        <div className="p-intro-inner">
          <div className="p-intro-eye">BCA Student · Python Full Stack Developer</div>
          <h1 className="p-intro-title">About<br /><em>Raees.</em></h1>
          <p className="p-intro-sub">BCA student specialising in Python Full Stack Development. Building real projects, exploring AI/ML, growing one commit at a time.</p>
        </div>
      </div>
      <section className="p-sec">
        <div className="p-slabel p-rev"><div className="p-stag">01 — Journey</div><div className="p-srule"/></div>
        <div className="p-jlist">
          {J.map((j,i) => (
            <div className="p-jitem p-rev" style={{transitionDelay:i*0.07+"s"}} key={j.num}>
              <div className="p-jnum">{j.num}</div>
              <div className="p-jbody"><div className="p-jtitle">{j.title}</div><p className="p-jtext">{j.text}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section className="p-sec" style={{borderTop:"1px solid var(--border)"}}>
        <div className="p-slabel p-rev"><div className="p-stag">02 — Skills</div><div className="p-srule"/></div>
        <div className="p-rev"><FullSkillsGrid/></div>
      </section>
      <section className="p-sec" style={{borderTop:"1px solid var(--border)"}}>
        <div className="p-slabel p-rev"><div className="p-stag">03 — Philosophy</div><div className="p-srule"/></div>
        <div className="p-phil p-rev">
          <div className="p-phil-q">"Build, break, learn, repeat. Every failure is a lesson wearing a disguise."</div>
          <p className="p-phil-b">I believe the best way to learn is to build real projects, hit real problems, and find real solutions — not just follow tutorials.</p>
          <p className="p-phil-b">I'm exploring AI and Machine Learning, the most exciting frontier in tech. My goal: grow steadily as a developer who ships things that actually work.</p>
        </div>
      </section>
      <div className="p-cta">
        <div className="p-rev">
          <h2 className="p-cta-title">Let's work <em>together.</em></h2>
          <p className="p-cta-body">Open to collaboration, freelance opportunities, and meaningful new challenges.</p>
          <div className="p-cta-btns">
            <button className="p-btn" onClick={()=>go("home","contact")}><span>Get in touch</span></button>
            <button className="p-outline" onClick={()=>go("webdev")}>Web Dev</button>
            <button className="p-outline" onClick={()=>go("appdev")}>App Dev</button>
          </div>
        </div>
      </div>
    </>
  );
}
