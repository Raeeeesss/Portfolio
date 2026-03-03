export default function Footer() {
  return (
    <footer className="p-footer">
      <div className="p-flogo">Mohammed <em>Raees</em></div>
      <div className="p-fcopy">© 2025 — All rights reserved</div>
      <div className="p-flinks">

        <button onClick={() => window.open("https://github.com/Raeeeesss", "_blank")}>GitHub</button>
        <button onClick={() => window.open("https://www.linkedin.com/in/mohammed-raees-9937b634a/", "_blank")}>LinkedIn</button>
      </div>
    </footer>
  );
}
