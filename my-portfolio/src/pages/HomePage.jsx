import React, { useState } from "react";
import { useReveal, useSkillBars } from "../hooks/index.js";
import { HomeSkillsGrid } from "../components/SkillsGrid.jsx";
import ProjItem from "../components/ProjItem.jsx";
import {
  IconEmail,
  IconArrow,
  IconGH,
  IconLinkedIn,
  IconPhone,
} from "../components/Icons.jsx";
import emailjs from "@emailjs/browser";
const calculateAge = (birthDateString) => {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const AGE = calculateAge("2006-03-06");
const STATS = [
  { n: "5", sup: "+", label: "Projects shipped" },
  { n: "3", sup: "+", label: "Tech stacks" },
  { n: AGE.toString(), sup: "", label: "Years of age" },
  { n: "∞", sup: "", label: "Curiosity" },
];

export default function HomePage({ go }) {
  useReveal();
  useSkillBars();

  const [fname, setFname] = useState("");
  const [femail, setFemail] = useState("");
  const [fmsg, setFmsg] = useState("");
  const [sent, setSent] = useState(false);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function submit() {
    if (!fname.trim() || !femail.trim() || !fmsg.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const data = {
      name: fname,
      email: femail,
      message: fmsg,
      title: "Portfolio Contact",
    };

    // Send to you
    emailjs
      .send("service_s2nz36n", "template_6avvg9j", data, "mHowrhhVwa5YNfMdx")
      .then(() => {
        // Send auto-reply to them
        return emailjs.send(
          "service_s2nz36n",
          "template_u737lem",
          data,
          "mHowrhhVwa5YNfMdx",
        );
      })
      .then(() => {
        setSent(true);
        setFname("");
        setFemail("");
        setFmsg("");
        setTimeout(() => setSent(false), 5000);
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
      });
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="p-hero" id="home">
        <div className="p-hero-content">
          <div className="p-hero-tag">Available for opportunities</div>
          <h1 className="p-hero-hl">
            Mohammed
            <br />
            <em>Raees.</em>
          </h1>
          <div className="p-hero-sub">
            <p className="p-hero-desc">
              <strong>Python Full-Stack Developer</strong> &amp; BCA student
              based in India. {AGE} years old, building with Python, JavaScript,
              and a deep curiosity for AI.
            </p>
            <div className="p-hero-cta">
              <button className="p-btn" onClick={() => scrollTo("projects")}>
                <span>View my work →</span>
              </button>
              <button className="p-ghost" onClick={() => go("about")}>
                Read full story <span className="arr">→</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-hero-bar">
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="p-bardiv" />}
              <div className="p-stat">
                <div className="p-stat-n">
                  {s.n}
                  {s.sup && <em>{s.sup}</em>}
                </div>
                <div className="p-stat-l">{s.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section className="p-sec" id="about">
        <div className="p-slabel p-rev">
          <div className="p-stag">01 — About</div>
          <div className="p-srule" />
        </div>
        <div className="p-about-grid">
          <div className="p-about-body p-rev">
            <p>
              I'm a {AGE}-year-old developer <strong>&amp; BCA student</strong>{" "}
              from India, advancing in Full-Stack Development with a genuine
              passion for building real things. I believe the best way to learn
              is to <strong>ship — then ship again</strong>.
            </p>
            <p>
              Currently exploring the intersection of web development and
              beginning to explore <strong>AI and Machine Learning</strong> —
              just getting started, but genuinely excited by where it's going.
            </p>
            <p>
              I write clean, purposeful code and care deeply about the craft.
              Every project is a chance to raise the bar.
            </p>
          </div>
          <div className="p-panel p-rev" style={{ transitionDelay: "0.1s" }}>
            <div className="p-irow">
              <span className="p-ikey">Status</span>
              <span className="p-ival">
                <span className="p-sdot">Open to work</span>
              </span>
            </div>
            <div className="p-irow">
              <span className="p-ikey">Location</span>
              <span className="p-ival">India</span>
            </div>
            <div className="p-irow">
              <span className="p-ikey">Age</span>
              <span className="p-ival">{AGE}</span>
            </div>
            <div className="p-irow">
              <span className="p-ikey">Focus</span>
              <span className="p-ival">Python Full-Stack</span>
            </div>
            <div className="p-irow">
              <span className="p-ikey">Email</span>
              <span className="p-ival">
                <a href="mailto:raeeeesss0@gmail.com">raeeeesss0@gmail.com</a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work — ONLY 2 ROWS ── */}
      <section
        className="p-sec"
        id="projects"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="p-slabel p-rev">
          <div className="p-stag">02 — Work</div>
          <div className="p-srule" />
        </div>
        <div className="p-plist">
          <div className="p-rev" style={{ transitionDelay: "0s" }}>
            <ProjItem
              num="01"
              name="Web Development"
              tags={["HTML5", "CSS3", "JavaScript", "React"]}
              desc="Responsive websites and browser apps — includes the live Expense Tracker plus more coming soon."
              status="live"
              onClick={() => go("webdev")}
            />
          </div>
          <div className="p-rev" style={{ transitionDelay: "0.06s" }}>
            <ProjItem
              num="02"
              name="App Development"
              tags={["Python", "Flask", "Django", "REST APIs"]}
              desc="Python back-end apps, REST APIs, and full-stack projects — all coming soon."
              status="live"
              onClick={() => go("appdev")}
            />
          </div>
        </div>
        <div
          style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}
        ></div>
      </section>

      {/* ── Skills ── */}
      <section
        className="p-sec"
        id="skills"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="p-slabel p-rev">
          <div className="p-stag">03 — Skills</div>
          <div className="p-srule" />
        </div>
        <div className="p-rev">
          <HomeSkillsGrid />
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        className="p-sec"
        id="contact"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="p-slabel p-rev">
          <div className="p-stag">04 — Contact</div>
          <div className="p-srule" />
        </div>
        <div className="p-cgrid">
          <div className="p-rev">
            <div className="p-cey">Get in touch</div>
            <h2 className="p-chl">
              Let's build
              <br />
              something <em>great.</em>
            </h2>
            <p className="p-cbody">
              Open to collaboration, freelance work, learning opportunities, and
              new challenges.
            </p>
            <div className="p-clinks">
              <a className="p-clink">
                <div className="p-clink-l">
                  <div className="p-cico">
                    <IconEmail />
                  </div>
                  <div>
                    <div className="p-clabel">Email</div>
                    <div className="p-cval">raeeeesss0@gmail.com</div>
                  </div>
                </div>
                <div className="p-carr">
                  <IconArrow />
                </div>
              </a>
              <a
                href="https://github.com/Raeeeesss"
                target="_blank"
                rel="noreferrer"
                className="p-clink"
              >
                <div className="p-clink-l">
                  <div className="p-cico">
                    <IconGH />
                  </div>
                  <div>
                    <div className="p-clabel">GitHub</div>
                    <div className="p-cval">github.com/Raeeeesss</div>
                  </div>
                </div>
                <div className="p-carr">
                  <IconArrow />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-raees-9937b634a/"
                target="_blank"
                rel="noreferrer"
                className="p-clink"
              >
                <div className="p-clink-l">
                  <div className="p-cico">
                    <IconLinkedIn />
                  </div>
                  <div>
                    <div className="p-clabel">LinkedIn</div>
                    <div className="p-cval">mohammed-raees</div>
                  </div>
                </div>
                <div className="p-carr">
                  <IconArrow />
                </div>
              </a>
              <a className="p-clink">
                <div className="p-clink-l">
                  <div className="p-cico">
                    <IconPhone />
                  </div>
                  <div>
                    <div className="p-clabel">Phone</div>
                    <div className="p-cval">+91 81380 82848</div>
                  </div>
                </div>
                <div className="p-carr">
                  <IconArrow />
                </div>
              </a>
            </div>
          </div>
          <div className="p-rev" style={{ transitionDelay: "0.12s" }}>
            <div className="p-form">
              <div className="p-ffield">
                <label className="p-flabel">Your name</label>
                <input
                  className="p-finput"
                  placeholder="Alex Johnson"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="p-ffield">
                <label className="p-flabel">Email address</label>
                <input
                  className="p-finput"
                  type="email"
                  placeholder="alex@example.com"
                  value={femail}
                  onChange={(e) => setFemail(e.target.value)}
                />
              </div>
              <div className="p-ffield">
                <label className="p-flabel">Message</label>
                <textarea
                  className="p-ftextarea"
                  placeholder="Tell me about your project or just say hello..."
                  value={fmsg}
                  onChange={(e) => setFmsg(e.target.value)}
                />
              </div>
              <button className="p-fsubmit" onClick={submit}>
                <span>Send message →</span>
              </button>
              {sent && (
                <div className="p-fsuccess">
                  ✓ Message received. I'll get back to you shortly.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
