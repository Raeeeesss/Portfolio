import { useScrollHeader } from "../hooks/index.js";
import { IconGH } from "./Icons.jsx";

export default function Header({ theme, toggleTheme, page, go }) {
  const stuck = useScrollHeader();

  function nav(targetPage, scrollId) {
    if (page === targetPage) {
      const el = document.getElementById(scrollId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      go(targetPage, scrollId);
    }
  }

  return (
    <header className={"p-hdr" + (stuck ? " stuck" : "")}>
      <button className="p-logo" onClick={() => go("home")}>
        Mohammed <em>Raees</em>
      </button>

      <nav className="p-nav">
        <button className={page === "home"   ? "active" : ""} onClick={() => nav("home", "about")}>About</button>
        <button className={page === "webdev" ? "active" : ""} onClick={() => go("webdev")}>Web Dev</button>
        <button className={page === "appdev" ? "active" : ""} onClick={() => go("appdev")}>App Dev</button>
        <button className={page === "about"  ? "active" : ""} onClick={() => go("about")}>Story</button>
        <button onClick={() => nav("home", "contact")}>Contact</button>
      </nav>

      <div className="p-hright">
        <a href="https://github.com/Raeeeesss" target="_blank" rel="noreferrer" className="p-gh">
          <IconGH />
          GitHub
        </a>
        <button className="p-tbtn" onClick={toggleTheme}>
          {theme === "dark" ? "☾" : "☀"}
        </button>
      </div>
    </header>
  );
}
