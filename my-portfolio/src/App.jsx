import { useState, useEffect, useCallback, useRef } from "react";
import { injectGlobalStyles } from "./styles/global.js";
import { useTheme, useCursor, useHoverCursor } from "./hooks/index.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage   from "./pages/HomePage.jsx";
import AboutPage  from "./pages/AboutPage.jsx";
import WebDevPage from "./pages/WebDevPage.jsx";
import AppDevPage from "./pages/AppDevPage.jsx";

// Inject CSS and sync theme before first React paint
injectGlobalStyles();

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [page,  setPage]     = useState("home");

  // pendingScroll holds a section id to scroll to after a page transition.
  // Double rAF ensures the new page DOM is fully laid out before we scroll.
  const pendingScroll = useRef(null);

  useCursor();
  useHoverCursor();

  // go(targetPage, scrollId?)
  // scrollId is optional — used to deep-link to a section on the target page.
  const go = useCallback((targetPage, scrollId) => {
    if (scrollId) pendingScroll.current = scrollId;
    setPage(targetPage);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const id = pendingScroll.current;
    if (id) {
      pendingScroll.current = null;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      });
    }
  }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--ink)" }}>
      {/* Custom cursor elements */}
      <div id="p-dot" />
      <div id="p-ring" />

      {/* Shared navigation */}
      <Header theme={theme} toggleTheme={toggleTheme} page={page} go={go} />

      {/* Page router — no external library needed */}
      <main>
        {page === "home"   && <HomePage   go={go} />}
        {page === "about"  && <AboutPage  go={go} />}
        {page === "webdev" && <WebDevPage go={go} />}
        {page === "appdev" && <AppDevPage go={go} />}
      </main>

      {/* Shared footer */}
      <Footer go={go} />
    </div>
  );
}
