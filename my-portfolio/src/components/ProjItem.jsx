import { IconArrow } from "./Icons.jsx";

export default function ProjItem({ num, name, tags, desc, status, href, onClick, disabled }) {
  const statusLabel =
    status === "live"     ? "Live" :
    status === "soon"     ? "Publishing soon" :
    status === "progress" ? "In progress" :
    status;

  const inner = (
    <>
      <div className="p-pnum">{num}</div>
      <div>
        <div className="p-pname">{name}</div>
        <div className="p-pmeta">
          {tags.map(t => <span className="p-ptag" key={t}>{t}</span>)}
        </div>
        <div className="p-pdesc">{desc}</div>
      </div>
      <div className="p-pright">
        <span className={"p-pstatus" + (status === "live" ? " live" : "")}>
          {statusLabel}
        </span>
        <div className="p-parr"><IconArrow /></div>
      </div>
    </>
  );

  if (disabled) return <div className="p-pitem dis">{inner}</div>;
  if (href)     return <a href={href} target="_blank" rel="noreferrer" className="p-pitem">{inner}</a>;
  return <div className="p-pitem" style={{ cursor: "none" }} onClick={onClick}>{inner}</div>;
}
