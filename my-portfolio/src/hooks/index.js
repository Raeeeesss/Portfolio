import { useState, useEffect, useCallback } from "react";

// ── Theme ──────────────────────────────────────────────────────────────────
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("t") || "light"; } catch { return "light"; }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("t", theme); } catch { /* ignore */ }
  }, [theme]);

  const toggle = useCallback(() => setTheme(t => (t === "light" ? "dark" : "light")), []);
  return [theme, toggle];
}

// ── Custom cursor ──────────────────────────────────────────────────────────
export function useCursor() {
  useEffect(() => {
    const dot  = document.getElementById("p-dot");
    const ring = document.getElementById("p-ring");
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;

    function onMove(e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    }
    function loop() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf = requestAnimationFrame(loop);
    }

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}

// ── Cursor hover enlargement ───────────────────────────────────────────────
export function useHoverCursor() {
  useEffect(() => {
    function on()  { document.body.classList.add("ch"); }
    function off() { document.body.classList.remove("ch"); }

    function attach() {
      document.querySelectorAll("a, button, .p-pitem, .p-clink, .p-jitem, .p-card").forEach(el => {
        el.removeEventListener("mouseenter", on);
        el.removeEventListener("mouseleave", off);
        el.addEventListener("mouseenter", on);
        el.addEventListener("mouseleave", off);
      });
    }

    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);
}

// ── Sticky header detection ────────────────────────────────────────────────
export function useScrollHeader() {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    function h() { setStuck(window.scrollY > 20); }
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return stuck;
}

// ── Scroll-reveal (IntersectionObserver) ──────────────────────────────────
export function useReveal() {
  useEffect(() => {
    let obs;
    const raf = requestAnimationFrame(() => {
      obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

      document.querySelectorAll(".p-rev:not(.vis)").forEach(el => obs.observe(el));
    });
    return () => { cancelAnimationFrame(raf); if (obs) obs.disconnect(); };
  }, []);
}

// ── Skill bar animation ────────────────────────────────────────────────────
export function useSkillBars() {
  useEffect(() => {
    let obs;
    const raf = requestAnimationFrame(() => {
      obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".p-sfill").forEach(b => {
              b.style.width = b.dataset.w + "%";
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      document.querySelectorAll(".p-sgrid").forEach(el => obs.observe(el));
    });
    return () => { cancelAnimationFrame(raf); if (obs) obs.disconnect(); };
  }, []);
}
