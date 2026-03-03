export default function ProjectCard({ num, title, desc, tags, status, href }) {
  const badge = status === "live" ? "live" : status === "progress" ? "progress" : "soon";
  const label = status === "live" ? "Live" : status === "progress" ? "In progress" : "Coming soon";
  return (
    <div className="p-card">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span className="p-card-num">{num}</span>
        <span className={"p-card-badge " + badge}>{label}</span>
      </div>
      <div className="p-card-title">{title}</div>
      <div className="p-card-desc">{desc}</div>
      <div className="p-card-tags">{tags.map(t=><span className="p-card-tag" key={t}>{t}</span>)}</div>
      <div className="p-card-footer">
        {href && status==="live"
          ? <a href={href} target="_blank" rel="noreferrer" className="p-card-link">View project →</a>
          : <span className="p-card-soon">{status==="progress"?"In development":"Publishing soon"}</span>
        }
      </div>
    </div>
  );
}
