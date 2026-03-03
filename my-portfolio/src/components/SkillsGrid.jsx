export function HomeSkillsGrid() {
  const skills = [
    { name: "Web Development", pct: 62, chips: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design"] },
    { name: "App Development", pct: 45, chips: ["Python", "Flask", "Django", "REST APIs", "SQLite"] },
  ];
  return (
    <div className="p-sgrid">
      {skills.map(s => (
        <div className="p-sblock" key={s.name}>
          <div className="p-shead">
            <div className="p-sname">{s.name}</div>
            <div className="p-spct">{s.pct}%</div>
          </div>
          <div className="p-strack">
            <div className="p-sfill" data-w={s.pct} style={{ width: 0 }} />
          </div>
          <div className="p-schips">
            {s.chips.map(c => <span className="p-schip" key={c}>{c}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FullSkillsGrid() {
  const skills = [
    { name: "Web Development",  pct: 62, chips: ["HTML5", "CSS3", "JavaScript", "React"] },
    { name: "App Development",  pct: 45, chips: ["Python", "Flask", "Django", "REST APIs"] },
    { name: "AI / ML",          pct: 15, chips: ["Python", "NumPy", "Learning phase"] },
    { name: "Database & Tools", pct: 50, chips: ["MySQL", "SQLite", "Git", "VS Code"] },
  ];
  return (
    <div className="p-sgrid">
      {skills.map(s => (
        <div className="p-sblock" key={s.name}>
          <div className="p-shead">
            <div className="p-sname">{s.name}</div>
            <div className="p-spct">{s.pct}%</div>
          </div>
          <div className="p-strack">
            <div className="p-sfill" data-w={s.pct} style={{ width: 0 }} />
          </div>
          <div className="p-schips">
            {s.chips.map(c => <span className="p-schip" key={c}>{c}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}
