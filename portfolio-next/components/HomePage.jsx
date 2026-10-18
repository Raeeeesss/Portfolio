'use client';

import { useEffect, useRef, useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useMotionTemplate, animate as fmAnimate } from "framer-motion";

/* Context that carries the cv-entries-wrap ref so child metric
   components can use it as the IntersectionObserver root —
   required for whileInView to fire inside a horizontal scroll container */
const CvScrollRootCtx = createContext(null);
import gsap from "gsap";
import Lenis from "lenis";
import { ArrowRight, Download, Mail, Globe, Smartphone, Layers, Cpu, Zap, TrendingUp, GraduationCap, Code, Rocket, Server, Database, Search, Palette } from "lucide-react";
import Hero from "./Hero";

/* ── Inline brand icons (not in this build of lucide-react) ── */
const InstagramIcon = ({ size = 16, strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = ({ size = 16, strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const GithubIcon = ({ size = 16, strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const XIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ── Scroll-visibility hook — works with Lenis (uses getBoundingClientRect) ── */
function useVisible(enterFrac = 0.1, exitFrac = 0.05) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const { top, bottom } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setVis(top < vh * (1 - enterFrac) && bottom > vh * exitFrac);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, [enterFrac, exitFrac]);
  return [ref, vis];
}

/* ── Shared animation presets ── */
const ease = [0.22, 1, 0.36, 1];
const fadeUp    = { hidden: { opacity: 0, y: 40  }, show: { opacity: 1, y: 0,   transition: { duration: 0.8,  ease } } };
const fadeDown  = { hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0,   transition: { duration: 0.75, ease } } };
const fadeLeft  = { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0,   transition: { duration: 0.85, ease } } };
const fadeRight = { hidden: { opacity: 0, x:  60 }, show: { opacity: 1, x: 0,   transition: { duration: 0.85, ease } } };
const scaleUp   = { hidden: { opacity: 0, scale: 0.92, y: 32 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.85, ease } } };
const stagger     = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const staggerFast = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* ── Data ── */
/* Microlink — free tier, high-quality screenshots, no key needed */
const SHOT = "https://api.microlink.io?screenshot=true&meta=false&embed=screenshot.url&url=";

/* ── Tech stack for marquee (Simple Icons CDN) ── */
const STACK_1 = [
  { name: 'React',         icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js',       icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: 'TypeScript',    icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Node.js',       icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'PostgreSQL',    icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Tailwind CSS',  icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Framer Motion', icon: 'https://cdn.simpleicons.org/framer/ffffff' },
  { name: 'Prisma',        icon: 'https://cdn.simpleicons.org/prisma/ffffff' },
  { name: 'MongoDB',       icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Redis',         icon: 'https://cdn.simpleicons.org/redis/DC382D' },
];
const STACK_2 = [
  { name: 'Python',        icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'OpenAI',        icon: 'https://cdn.simpleicons.org/openai/ffffff' },
  { name: 'Firebase',      icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
  { name: 'Vercel',        icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
  { name: 'Docker',        icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'React Native',  icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Figma',         icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'GraphQL',       icon: 'https://cdn.simpleicons.org/graphql/E10098' },
  { name: 'Supabase',      icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { name: 'Expo',          icon: 'https://cdn.simpleicons.org/expo/ffffff' },
];

/* ── Services data ── */
const SERVICES = [
  {
    Icon: Globe,
    title: 'Web Development',
    short: 'Cinematic websites & web apps',
    desc: 'Full-stack web applications built with Next.js, React, and modern APIs. From cinematic landing pages to complex SaaS platforms — fast, accessible, and production-ready.',
  },
  {
    Icon: Smartphone,
    title: 'Mobile Applications',
    short: 'iOS & Android solutions',
    desc: 'Native and cross-platform mobile apps using React Native and Expo. Smooth performance, native feel, and seamless deployment to both app stores.',
  },
  {
    Icon: Palette,
    title: 'Brand & Logo Design',
    short: 'Identity design that resonates',
    desc: 'Logo creation, brand systems, and visual identity design. From concept to final assets — every touchpoint crafted to communicate who you are and why it matters.',
  },
  {
    Icon: Layers,
    title: 'UI/UX Design',
    short: 'Beautiful, intuitive interfaces',
    desc: 'User-centered design that converts. Wireframes, prototypes, and high-fidelity designs crafted for clarity, delight, and measurable business outcomes.',
  },
  {
    Icon: Cpu,
    title: 'AI Systems Engineering',
    short: 'AI-powered operations & automation',
    desc: 'LLM integrations, RAG pipelines, AI video production, and AI-powered healthcare and operations infrastructure. Practical AI that solves real operational problems at scale.',
  },
  {
    Icon: Zap,
    title: 'Intelligent Automation',
    short: 'Workflows & API integrations',
    desc: 'End-to-end automation of business processes — CRM pipelines, WhatsApp API integrations, email flows, and internal tools that save hours every single week.',
  },
  {
    Icon: Code,
    title: 'Enterprise Software',
    short: 'Custom production-grade systems',
    desc: 'Bespoke enterprise software — billing systems, multi-tenant SaaS platforms, internal dashboards, and production-ready digital products built to scale from day one.',
  },
  {
    Icon: Server,
    title: 'Cloud Infrastructure',
    short: 'Scalable server & cloud setup',
    desc: 'Cloud architecture, server provisioning, CI/CD pipelines, and deployment infrastructure. Reliable, secure, and cost-efficient setups on AWS, GCP, and Vercel.',
  },
  {
    Icon: Rocket,
    title: 'Platform Architecture',
    short: 'Scalable system design',
    desc: 'End-to-end platform design for high-growth products — microservices, API gateways, database schemas, and architecture that scales without rewrites.',
  },
  {
    Icon: Database,
    title: 'Data Intelligence',
    short: 'Data solutions & analytics',
    desc: 'Data pipelines, analytics dashboards, reporting systems, and business intelligence tooling that turn raw data into decisions that move the business forward.',
  },
  {
    Icon: Search,
    title: 'SEO & Growth',
    short: 'Search visibility & organic growth',
    desc: 'Technical SEO audits, on-page optimisation, structured data, and performance tuning that push rankings higher and bring qualified traffic consistently.',
  },
  {
    Icon: TrendingUp,
    title: 'Digital Consulting',
    short: 'Strategy for your digital presence',
    desc: 'Technical strategy, product roadmaps, and hands-on consulting to help businesses and teams make the right decisions faster and ship with confidence.',
  },
];

const projects = [
  {
    num: "01",
    name: "Talent Axiss",
    desc: "AI-powered CRM built for recruitment agencies — structured pipelines, intelligent workflows, and conversion-focused design.",
    tags: ["CRM", "AI", "SaaS"],
    href: "https://talent-axiss.vercel.app/",
    img: `${SHOT}https://talent-axiss.vercel.app/`,
    year: "2024",
    role: "Full Stack Developer & Designer",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI API", "Prisma", "Tailwind CSS"],
    highlights: [
      "AI-powered candidate scoring and job-matching engine",
      "Drag-and-drop recruitment pipeline with custom stages",
      "Automated email sequences and follow-up scheduling",
      "Real-time analytics dashboard for agency KPIs",
      "Role-based access for recruiters, managers, and clients",
    ],
  },
  {
    num: "02",
    name: "Plenora",
    desc: "Digital platform for a premium cleaning service — clean booking flow, tiered packages, and a professional brand presence.",
    tags: ["Service", "Booking", "Web"],
    href: "https://plenora-service.vercel.app/",
    img: `${SHOT}https://plenora-service.vercel.app/`,
    year: "2024",
    role: "Frontend Developer & Brand Designer",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"],
    highlights: [
      "Multi-step booking flow with service customization",
      "Tiered service package comparison and upsell UI",
      "Mobile-first responsive design with smooth animations",
      "Integrated contact and instant quote request system",
    ],
  },
  {
    num: "03",
    name: "Khoj Cafe",
    desc: "Hospitality system connecting customer ordering, browsing, and cafe management in one polished interface.",
    tags: ["F&B", "Operations", "UI"],
    href: "https://khoj-cafe.vercel.app/",
    img: `${SHOT}https://khoj-cafe.vercel.app/`,
    year: "2024",
    role: "Full Stack Developer",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    highlights: [
      "Digital menu with category browsing and search",
      "Customer-facing cart and ordering interface",
      "Admin dashboard for menu and order management",
      "Table QR code integration for in-cafe ordering",
    ],
  },
  {
    num: "04",
    name: "Event Kitchen",
    desc: "Wedding and events platform — portfolio-first presentation, inquiry flows, and a brand presence built for high-trust clients.",
    tags: ["Events", "Wedding", "UI"],
    href: "https://event-kitchen.vercel.app/",
    img: `${SHOT}https://event-kitchen.vercel.app/`,
    year: "2024",
    role: "Frontend Developer & Designer",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "EmailJS"],
    highlights: [
      "Portfolio gallery with event category filtering",
      "Multi-step inquiry form with package selection",
      "Brand-focused design with high-trust visual language",
      "Testimonials and social proof integration",
    ],
  },
  {
    num: "05",
    name: "London Holidays",
    desc: "Premium travel booking experience built around destination discovery and high-intent tourism buyers.",
    tags: ["Travel", "Booking", "UI"],
    href: "https://london-holidays.vercel.app/",
    img: `${SHOT}https://london-holidays.vercel.app/`,
    year: "2024",
    role: "Frontend Developer",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    highlights: [
      "Destination discovery with curated tour packages",
      "Date-based availability and dynamic pricing display",
      "Inquiry and booking request flow with confirmation",
      "Immersive visual design with full-screen hero imagery",
    ],
  },
];

const timeline = [
  {
    year: "2023",
    role: "BCA — Computer Applications",
    org: "Bachelor's Degree",
    desc: "Built programming foundations in software engineering, interface design, data structures, and product thinking across three years of applied study.",
    tags: ["Algorithms", "Data Structures", "OOP", "UI Design", "Networking"],
    current: false,
  },
  {
    year: "2023–24",
    role: "Fullstack Developer",
    org: "Independent & Client Work",
    desc: "Shipped production web applications, SaaS tools, and client-ready digital products — handling everything from architecture to deployment.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL", "Figma", "Vercel"],
    current: false,
  },
  {
    year: "2025",
    role: "Full Stack Engineer",
    org: "Product & Systems Engineering",
    desc: "Engineering scalable web applications, AI integrations, and cloud solutions with focus on performance, security, and developer experience.",
    tags: ["System Architecture", "AI Integration", "Next.js", "PostgreSQL", "Cloud"],
    current: false,
  },
  {
    year: "2026",
    role: "Scaling AI & Digital Products",
    org: "Independent Practice",
    desc: "Developing intelligent systems, business automation solutions, and scalable modern web platforms bridging design and engineering.",
    tags: ["AI / ML", "SaaS", "Business Automation", "Next.js", "TypeScript"],
    current: true,
  },
];


/* ── MagneticButton ── */
function MagneticButton({ href, children, variant = "primary", external = false, isDownload = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * 0.15, y: y * 0.2, duration: 0.35, ease: "power3.out" });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.35)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic-btn magnetic-btn--${variant}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(isDownload ? { download: true } : {})}
    >
      {children}
    </a>
  );
}



/* ── CursorRevealImg — spotlight reveal + target crosshair ── */
function CursorRevealImg({ src, alt }) {
  const containerRef = useRef(null);
  const overlayRef   = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const cx = useMotionValue(-999);
  const cy = useMotionValue(-999);
  const springCX = useSpring(cx, { stiffness: 220, damping: 24, mass: 0.4 });
  const springCY = useSpring(cy, { stiffness: 220, damping: 24, mass: 0.4 });

  useEffect(() => {
    const u1 = springCX.on('change', v => overlayRef.current?.style.setProperty('--cx', `${v}px`));
    const u2 = springCY.on('change', v => overlayRef.current?.style.setProperty('--cy', `${v}px`));
    return () => { u1(); u2(); };
  }, [springCX, springCY]);

  const onMove = useCallback((e) => {
    const r = containerRef.current.getBoundingClientRect();
    cx.set(e.clientX - r.left);
    cy.set(e.clientY - r.top);
  }, [cx, cy]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', cursor: 'none', borderRadius: 0, overflow: 'hidden', aspectRatio: '3/4', background: '#0a0a0f' }}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', filter: 'grayscale(12%) contrast(1.06)' }} />

      {/* Base vignette (always) */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,10,0.88) 0%, transparent 50%)', pointerEvents: 'none' }} />

      {/* Spotlight overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'rgba(5,5,10,0.86)',
          WebkitMaskImage: isHovered ? 'radial-gradient(circle 160px at var(--cx) var(--cy), transparent 0%, rgba(0,0,0,0.92) 68%)' : 'none',
          maskImage:       isHovered ? 'radial-gradient(circle 160px at var(--cx) var(--cy), transparent 0%, rgba(0,0,0,0.92) 68%)' : 'none',
          opacity: isHovered ? 1 : 0.55,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Target crosshair cursor */}
      <motion.div style={{ position: 'absolute', pointerEvents: 'none', zIndex: 8, x: springCX, y: springCY, translateX: '-50%', translateY: '-50%', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s ease' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="22" stroke="rgba(255,255,255,0.72)" strokeWidth="1"/>
          <circle cx="30" cy="30" r="2.5" fill="white" opacity="0.9"/>
          <line x1="30" y1="2"  x2="30" y2="12" stroke="white" strokeWidth="1.5" opacity="0.72"/>
          <line x1="30" y1="48" x2="30" y2="58" stroke="white" strokeWidth="1.5" opacity="0.72"/>
          <line x1="2"  y1="30" x2="12" y2="30" stroke="white" strokeWidth="1.5" opacity="0.72"/>
          <line x1="48" y1="30" x2="58" y2="30" stroke="white" strokeWidth="1.5" opacity="0.72"/>
        </svg>
      </motion.div>

      {/* Caption */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px', zIndex: 3 }}>
        <p style={{ margin: 0, fontSize: '0.5rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>Kerala, India</p>
        <p style={{ margin: '5px 0 0', fontSize: '0.86rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Full Stack Developer · Software Engineer</p>
      </div>
    </div>
  );
}

/* ── StatCounter — animated number on scroll ── */
function StatCounter({ to, suffix = '', delay = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  useEffect(() => {
    if (!inView) return;
    const ctrl = fmAnimate(0, to, { duration: 1.8, delay, ease: [0.22, 1, 0.36, 1], onUpdate: v => setVal(Math.round(v)) });
    return () => ctrl.stop();
  }, [inView, to, delay]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── ActivityBars — monthly code contribution chart ── */
function ActivityBars() {
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const data   = [42, 68, 55, 82, 74, 91, 79, 88, 71, 95, 83, 77];
  const max = Math.max(...data);
  return (
    <div>
      <p style={{ margin: '0 0 12px', fontSize: '0.5rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Code Activity · 2024</p>
      <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 52 }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.055, duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: `${(v / max) * 40}px`, borderRadius: '3px 3px 0 0', background: 'linear-gradient(to top, #2547FF, #5b7fff)', transformOrigin: 'bottom' }}
            />
            <span style={{ fontSize: '0.42rem', color: 'rgba(255,255,255,0.22)', fontFamily: 'monospace', lineHeight: 1 }}>{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── AboutSkillBar — simple bar without scroll-root context ── */
/* ─── Line-by-line reveal: opens top→bottom, closes bottom→top ─── */
function LineByLine({ lines, tag: Tag = 'div', baseDelay = 0, stagger = 0.11, style, className }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} style={style} className={className}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden', lineHeight: 'inherit' }}>
          <motion.span
            style={{ display: 'block', lineHeight: 'inherit' }}
            initial={{ y: '110%' }}
            animate={{ y: inView ? 0 : '110%' }}
            transition={{
              duration: 0.88,
              delay: inView ? baseDelay + i * stagger : (lines.length - 1 - i) * stagger * 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function AboutSkillBar({ label, pct, color = '#2547FF', delay = 0 }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontSize: '0.58rem', fontWeight: 700, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
        <span style={{ fontSize: '0.6rem', fontWeight: 800, color }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 999, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  );
}

/* ── SkillBar ── */
function SkillBar({ label, pct, color = '#2547FF', delay = 0 }) {
  const root = useContext(CvScrollRootCtx);
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
        <span style={{ fontSize: '0.58rem', fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontSize: '0.6rem', fontWeight: 800, color, letterSpacing: '0.02em' }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 999, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.5, root }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${color}99, ${color})` }}
        />
      </div>
    </div>
  );
}

/* ── SkillRing ── */
function SkillRing({ label, pct, color, size = 64, delay = 0 }) {
  const root = useContext(CvScrollRootCtx);
  const r = (size - 8) / 2;
  const circ = parseFloat((2 * Math.PI * r).toFixed(2));
  const dash = parseFloat((circ * pct / 100).toFixed(2));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={4} />
          <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circ}` }}
            whileInView={{ strokeDasharray: `${dash} ${circ}` }}
            viewport={{ once: true, amount: 0.5, root }}
            transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.68rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{pct}%</span>
      </div>
      <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}

/* ── GrowthChart (entry 3) ── */
function GrowthChart({ ML }) {
  const root = useContext(CvScrollRootCtx);
  const circ = 2 * Math.PI * 10;
  return (
    <div>
      <p style={ML}>Product velocity</p>
      <svg viewBox="0 0 140 72" style={{ width: '100%', height: 72, display: 'block', marginBottom: 8 }}>
        {[0.25, 0.5, 0.75].map((f, i) => (
          <line key={i} x1="0" y1={f * 72} x2="140" y2={f * 72} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        <motion.polygon points="0,70 28,58 56,46 84,30 112,14 140,4 140,72 0,72"
          fill="rgba(184,224,0,0.13)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4, root }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.polyline points="0,70 28,58 56,46 84,30 112,14 140,4"
          fill="none" stroke="#b8e000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4, root }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {[[0,70],[28,58],[56,46],[84,30],[112,14],[140,4]].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r={3.5} fill="#b8e000"
            initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4, root }}
            transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 300, damping: 20 }}
          />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.49rem', color: 'rgba(255,255,255,0.26)', fontWeight: 700, letterSpacing: '0.06em' }}>2025</span>
        <span style={{ fontSize: '0.49rem', color: 'rgba(255,255,255,0.26)', fontWeight: 700, letterSpacing: '0.06em' }}>2026 →</span>
      </div>
    </div>
  );
}

/* ── ScaleChart (entry 4) ── */
function ScaleChart({ ML }) {
  const root = useContext(CvScrollRootCtx);
  return (
    <div>
      <p style={ML}>Scale metrics</p>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 60, marginBottom: 8 }}>
        {[30, 46, 42, 65, 80, 96].map((h, i) => (
          <motion.div key={i}
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.4, root }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1, height: `${h}%`, background: `linear-gradient(to top, rgba(34,211,238,${0.4 + i * 0.1}), rgba(34,211,238,${0.15 + i * 0.05}))`, borderRadius: '3px 3px 0 0', transformOrigin: 'bottom' }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['AI','ML','LLM','SaaS','Sys','Auto'].map(t => (
          <span key={t} style={{ flex: 1, fontSize: '0.42rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ── ExperienceSection ── */
function ExperienceSection() {
  const ML = { margin: '0 0 14px', fontSize: '0.56rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)' };
  const scrollRootRef = useRef(null);
  const [cvIdx, setCvIdx] = useState(0);

  const entries = [
    {
      ...timeline[0],
      IconEl: GraduationCap,
      accent: '#4e6ef2',
      metric: (
        <div>
          <p style={ML}>Skills acquired</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <SkillRing label="Algorithms" pct={88} color="#4e6ef2" delay={0} />
            <SkillRing label="Design" pct={74} color="#818cf8" delay={0.12} />
            <SkillRing label="Systems" pct={82} color="#6366f1" delay={0.24} />
          </div>
        </div>
      ),
    },
    {
      ...timeline[1],
      IconEl: Code,
      accent: '#a78bfa',
      metric: (
        <div>
          <p style={ML}>Tech proficiency</p>
          <SkillBar label="React / Next.js" pct={93} color="#a78bfa" delay={0} />
          <SkillBar label="Node.js / APIs" pct={88} color="#a78bfa" delay={0.1} />
          <SkillBar label="PostgreSQL" pct={80} color="#a78bfa" delay={0.2} />
          <SkillBar label="UI / Figma" pct={85} color="#a78bfa" delay={0.3} />
        </div>
      ),
    },
    {
      ...timeline[2],
      IconEl: Layers,
      accent: '#b8e000',
      metric: (
        <GrowthChart ML={ML} />
      ),
    },
    {
      ...timeline[3],
      IconEl: Cpu,
      accent: '#22d3ee',
      metric: (
        <ScaleChart ML={ML} />
      ),
    },
  ];

  useEffect(() => {
    const el = scrollRootRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / entries.length;
      setCvIdx(Math.min(Math.round(el.scrollLeft / cardW), entries.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [entries.length]);

  const scrollToCv = (idx) => {
    const el = scrollRootRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.scrollWidth / entries.length, behavior: 'smooth' });
  };

  return (
    <section id="cv" aria-label="Experience" style={{ background: '#05050a', padding: 'clamp(72px,9vw,120px) clamp(24px,6vw,80px)' }}>
      <style>{`
        @keyframes cv-blink { 0%,100%{opacity:1} 50%{opacity:0.28} }
        .cv-row { display:grid; grid-template-columns:120px 1fr 260px; gap:0 48px; padding:clamp(32px,4vw,52px) 0; }
        @media(max-width:960px){ .cv-row{ grid-template-columns:100px 1fr 220px; gap:0 28px; } }
        @media(max-width:720px){ .cv-row{ grid-template-columns:80px 1fr; gap:0 20px; } }
        @media(max-width:460px){ .cv-row{ grid-template-columns:1fr; gap:14px 0; } }
      `}</style>

      {/* ── Header ── */}
      <div style={{ marginBottom: 'clamp(36px,5vw,60px)' }}>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.28)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}>Experience</span>
        </motion.div>
        <LineByLine
          tag="h2"
          style={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: 'clamp(2.4rem,5vw,5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.05, margin: '0 0 12px' }}
          lines={['The journey', 'so far.']}
        />
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
          3 years · From first line of code to founding a company.
        </motion.p>
      </div>

      {/* ── Timeline entries ── */}
      <CvScrollRootCtx.Provider value={scrollRootRef}>
      <div className="cv-entries-wrap" ref={scrollRootRef}>
      {entries.map((item, i) => (
        <div key={item.year} className="cv-entry-snap">
          {/* Divider line draws in from left on scroll */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 1, background: 'rgba(255,255,255,0.08)', originX: 0 }}
          />

          <div className="cv-row">
            {/* ── Left: index + year + icon ── */}
            <div style={{ paddingTop: 4 }}>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.04 }}
                style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16, userSelect: 'none' }}>
                <span style={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: 'clamp(2rem,2.8vw,3rem)', fontWeight: 900, color: 'rgba(255,255,255,0.75)', lineHeight: 1, letterSpacing: '-0.05em' }}>
                  0{i + 1}
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em' }}>
                  /{String(entries.length).padStart(2,'0')} &rsaquo;
                </span>
              </motion.div>
              <motion.span initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.07 }}
                style={{ display: 'inline-block', fontSize: '0.57rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: item.accent, background: `${item.accent}16`, border: `1px solid ${item.accent}33`, borderRadius: 999, padding: '4px 11px', marginBottom: 14 }}>
                {item.year}
              </motion.span>
              <motion.div initial={{ opacity: 0, scale: 0.65 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 260, damping: 22 }}
                style={{ width: 34, height: 34, borderRadius: 9, background: `${item.accent}14`, border: `1px solid ${item.accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <item.IconEl size={16} style={{ color: item.accent }} strokeWidth={1.5} />
              </motion.div>
              {item.current && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.15 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', animation: 'cv-blink 2.2s ease-in-out infinite', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.49rem', fontWeight: 700, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Active</span>
                </motion.div>
              )}
            </div>

            {/* ── Center: role + desc + tags ── */}
            <div>
              <div style={{ overflow: 'hidden', marginBottom: 10 }}>
                <motion.h3 initial={{ y: '108%' }} whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.72, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: 'clamp(1.25rem,2.2vw,2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08, margin: 0 }}>
                  {item.role}
                </motion.h3>
              </div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.48, delay: 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 3, height: 12, borderRadius: 2, background: item.accent, flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.36)' }}>{item.org}</span>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.14 }}
                style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.46)', lineHeight: 1.84, margin: '0 0 18px', maxWidth: 500 }}>
                {item.desc}
              </motion.p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {item.tags.map((tag, j) => (
                  <motion.span key={tag}
                    initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: 0.16 + j * 0.05 }}
                    style={{ fontSize: '0.58rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '4px 11px', letterSpacing: '0.04em' }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ── Right: metric visualization ── */}
            <motion.div className="cv-metric-col"
              initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.18 }}
              style={{ paddingTop: 4 }}>
              {item.metric}
            </motion.div>
          </div>
        </div>
      ))}
      </div>
      </CvScrollRootCtx.Provider>

      {/* Final divider */}
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 1, background: 'rgba(255,255,255,0.08)', originX: 0, marginBottom: 'clamp(40px,5vw,64px)' }}
      />

      {/* ── Bottom stats + download ── */}
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', gap: 'clamp(24px,5vw,56px)', flexWrap: 'wrap' }}>
          {[{ num: '3+', label: 'Years' },{ num: 'BCA', label: 'CS Graduate' },{ num: '12+', label: 'Projects' },{ num: '1', label: 'Company' }].map(({ num, label }) => (
            <div key={label}>
              <p style={{ margin: 0, fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: 'clamp(1.5rem,2.6vw,2.4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>{num}</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.57rem', fontWeight: 700, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}


/* ── ScrambleText — cycles random chars then settles ── */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234!@#$&';
function ScrambleText({ text, delay = 0, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [output, setOutput] = useState(text);
  useEffect(() => {
    if (!inView) return;
    const t0 = setTimeout(() => {
      let frame = 0;
      const id = setInterval(() => {
        setOutput(
          text.split('').map((ch, i) => {
            if (ch === ' ' || ch === '·' || ch === '.' || ch === ',') return ch;
            return i <= frame / 1.6
              ? ch
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join('')
        );
        frame++;
        if (frame > text.length * 1.7) { setOutput(text); clearInterval(id); }
      }, 30);
    }, delay);
    return () => clearTimeout(t0);
  }, [inView, text, delay]);
  return <span ref={ref} style={style}>{output}</span>;
}

/* ── WavyUnderline — SVG path that draws in on scroll ── */
function WavyUnderline({ color = '#2547FF', delay = 0, wavy = true }) {
  return (
    <svg viewBox="0 0 100 6" preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: -3, left: 0, width: '100%', height: 6, overflow: 'visible', pointerEvents: 'none' }}>
      <motion.path
        d={wavy ? 'M0,3 Q25,0.5 50,3.5 Q75,6 100,3' : 'M0,3 L100,3'}
        fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.65, delay, ease: 'easeOut' }}
      />
    </svg>
  );
}

/* ── HomePage ── */
export default function HomePage() {
  const heroRef = useRef(null);
  const lenisRef = useRef(null);
  const [pastHero, setPastHero] = useState(false);

  const [projIdx,   setProjIdx]   = useState(0);
  const workGridRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navY = useMotionValue(-100);
  const navOpacity = useMotionValue(0);
  const solidOnce = useRef(false);

  /* Project scroll tracker */
  useEffect(() => {
    const grid = workGridRef.current;
    if (!grid) return;
    const onScroll = () => {
      const cardW = grid.scrollWidth / projects.length;
      setProjIdx(Math.min(Math.round(grid.scrollLeft / cardW), projects.length - 1));
    };
    grid.addEventListener('scroll', onScroll, { passive: true });
    return () => grid.removeEventListener('scroll', onScroll);
  }, []);
  const [workHdrRef, workHdrVis] = useVisible(0.2,  0.05);
  const [cvRef,      cvVis]      = useVisible(0.08, 0.04);
  const [ctaRef,     ctaVis]     = useVisible(0.15, 0.05);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    let rafId = 0;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); lenisRef.current = null; };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Page-load entrance */
  useEffect(() => {
    fmAnimate(navY, 0, { duration: 0.75, ease: [0.22, 1, 0.36, 1] });
    fmAnimate(navOpacity, 1, { duration: 0.6, ease: 'easeOut' });
  }, []);

  /* Mark once pastHero fires */
  useEffect(() => {
    if (pastHero) solidOnce.current = true;
  }, [pastHero]);

  /* Mobile only: hide on scroll-down, show on scroll-up */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      if (window.innerWidth > 900) return;
      const y = window.scrollY;
      if (y < 80) {
        fmAnimate(navY, 0, { duration: 0.35, ease: [0.22, 1, 0.36, 1] });
        fmAnimate(navOpacity, 1, { duration: 0.25 });
      } else if (y > lastY + 6) {
        fmAnimate(navY, -110, { duration: 0.38, ease: [0.22, 1, 0.36, 1] });
        fmAnimate(navOpacity, 0, { duration: 0.25 });
      } else if (y < lastY - 6) {
        fmAnimate(navY, 0, { duration: 0.38, ease: [0.22, 1, 0.36, 1] });
        fmAnimate(navOpacity, 1, { duration: 0.25 });
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="portfolio-site">

      {/* ── Floating pill navbar ── */}
      <motion.header
        className={`site-header${pastHero ? ' site-header--solid' : ''}`}
        role="banner"
        style={{ y: navY, opacity: navOpacity }}
      >
        {/* Logo */}
        <a className="brand-mark" href="#home" aria-label="Mohammed Raees — home">
          <span className="brand-monogram" aria-hidden="true">MR</span>
          <span className="brand-name">Mohammed Raees</span>
        </a>

        {/* Center nav */}
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#cv">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* CTA */}
        <div className="nav-cta-wrap">
          {/* Hamburger — mobile only */}
          <button className="nav-hamburger" aria-label="Menu" onClick={() => setMenuOpen(o => !o)}>
            <span className={`ham-line${menuOpen ? ' ham-open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' ham-open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' ham-open' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMenuOpen(false)}>
          <nav className="mobile-nav" onClick={e => e.stopPropagation()}>
            {[['#home','Home'],['#work','Work'],['#about','About'],['#services','Services'],['#cv','Experience'],['#contact','Contact']].map(([href, label]) => (
              <a key={href} href={href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        </div>
      )}

      <main>
        {/* ── 1. Hero ── */}
        <Hero sectionRef={heroRef} />

        {/* Wave: hero dark → about white */}
        <div style={{ lineHeight: 0, background: '#fff', marginTop: -1 }}>
          <svg viewBox="0 0 1440 36" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 36 }}>
            <path d="M0,0 C480,36 960,0 1440,0 L1440,36 L0,36 Z" fill="#05050a" />
          </svg>
        </div>

        {/* ── 2. About ── */}
        <section id="about" aria-label="About Mohammed Raees" style={{ background: '#fff', overflow: 'hidden', padding: 'clamp(64px,9vw,112px) clamp(24px,6vw,80px)' }}>
          <style>{`
            .about-v2-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(48px,7vw,96px); align-items: start; max-width: 1240px; margin: 0 auto; }
            @media (max-width: 860px) { .about-v2-grid { grid-template-columns: 1fr; gap: 36px; } }
          `}</style>

          <div className="about-v2-grid">

            {/* LEFT — Headline & Stats */}
            <div>
              {/* Kicker */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
              >
                <span style={{ width: 28, height: 1.5, background: '#0B0B0C', display: 'inline-block' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0B0B0C' }}>About Me</span>
              </motion.div>

              <div style={{ overflow: 'hidden', marginBottom: 18 }}>
                <motion.div initial={{ y: '115%' }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                  <ScrambleText text="FULL STACK DEVELOPER · SOFTWARE ENGINEER" delay={300} style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.14em', color: '#2547FF', display: 'block' }} />
                </motion.div>
              </div>

              <LineByLine
                tag="h3"
                style={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: 'clamp(2rem,3.8vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B0B0C', lineHeight: 1.15, margin: '0 0 32px' }}
                baseDelay={0.05}
                lines={[
                  'Building modern software &',
                  <><span style={{ position: 'relative', display: 'inline-block' }}>scalable<WavyUnderline color="#2547FF" delay={0} wavy /></span>{' '}digital systems.</>,
                ]}
              />

              {/* Stats bento */}
              <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {[
                  { Icon: Layers,     stat: '12+', label: 'Shipped Projects', sub: 'Production apps' },
                  { Icon: Zap,        stat: '3+',  label: 'Years Experience', sub: 'Continuous building' },
                  { Icon: Cpu,        stat: '2',   label: 'SaaS Products',    sub: 'Active platforms' },
                  { Icon: TrendingUp, stat: '∞',   label: 'Growth Mindset',   sub: 'Engineered for scale' },
                ].map(({ Icon, stat, label, sub }) => (
                  <div key={label} style={{ padding: '20px 18px', borderRadius: 16, background: '#F7F6F2', border: '1px solid rgba(11,11,12,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <Icon size={18} strokeWidth={1.8} style={{ color: '#2547FF' }} />
                      <span style={{ fontSize: '0.68rem', color: '#6B6A66', fontWeight: 500 }}>{sub}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#0B0B0C', letterSpacing: '-0.03em', lineHeight: 1 }}>{stat}</p>
                    <p style={{ margin: '6px 0 0', fontSize: '0.62rem', fontWeight: 700, color: '#6B6A66', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Bio & Quote */}
            <div style={{ paddingTop: 'clamp(12px,2vw,28px)' }}>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.18 }}
                style={{ fontSize: '1.05rem', color: '#4A4944', lineHeight: 1.85, margin: '0 0 20px', fontWeight: 400 }}>
                I&rsquo;m a fullstack developer and BCA graduate who builds{' '}
                <span style={{ position: 'relative', display: 'inline', fontWeight: 600, color: '#0B0B0C' }}>SaaS products<WavyUnderline color="#2547FF" delay={0.5} wavy={false} /></span>
                , modern web applications, and intuitive digital interfaces. I connect sound architectural decisions directly to real business outcomes.
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.26 }}
                style={{ fontSize: '0.98rem', color: '#6B6A66', lineHeight: 1.84, margin: '0 0 36px' }}>
                My journey started with foundational software engineering and evolved into delivering end-to-end platforms: from database design and backend APIs to polished, pixel-perfect user experiences. Over the past three years, I&rsquo;ve focused on one core objective — building software that functions seamlessly, loads instantly, and creates tangible value.
              </motion.p>

              {/* Highlight callout box */}
              <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.35 }}
                style={{ position: 'relative', padding: '24px 28px', background: '#F7F6F2', borderRadius: 16, borderLeft: '4px solid #2547FF' }}>
                <p style={{ margin: 0, fontSize: '1.02rem', fontStyle: 'italic', color: '#0B0B0C', lineHeight: 1.72, fontFamily: 'var(--font-playfair),Georgia,serif', fontWeight: 500 }}>
                  &ldquo;The strongest products aren&rsquo;t built for attention. They remove friction, improve decisions, and create measurable value.&rdquo;
                </p>
                <p style={{ margin: '10px 0 0', fontSize: '0.72rem', fontWeight: 700, color: '#6B6A66', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  — Mohammed Raees
                </p>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Wave: about white → services */}
        <div style={{ lineHeight: 0, background: '#FAFAF8', marginTop: -1 }}>
          <svg viewBox="0 0 1440 28" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 28 }}>
            <path d="M0,14 C480,28 960,0 1440,14 L1440,28 L0,28 Z" fill="#fff" />
          </svg>
        </div>

        {/* ── Services (What I Offer) ── */}
        <section id="services" aria-label="Services" style={{ padding: 'clamp(64px,8vw,104px) clamp(24px,6vw,80px)', background: '#FAFAF8' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>

            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}
              >
                <span style={{ width: 20, height: 1.5, background: '#2547FF', display: 'inline-block' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2547FF' }}>What I Offer</span>
                <span style={{ width: 20, height: 1.5, background: '#2547FF', display: 'inline-block' }} />
              </motion.div>

              <h2 style={{ fontFamily: 'var(--font-playfair),Georgia,serif', fontSize: 'clamp(2rem,4vw,3.4rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0B0B0C', lineHeight: 1.1, margin: '0 0 16px' }}>
                Engineering &amp; Digital Solutions
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#6B6A66', lineHeight: 1.7, margin: 0 }}>
                Specialized capabilities designed to help businesses ship faster, scale reliably, and automate critical operations.
              </p>
            </div>

            {/* Clean 6-card services grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
              marginBottom: 72,
            }}>
              {[
                {
                  num: '01',
                  Icon: Globe,
                  title: 'Web Applications & SaaS',
                  desc: 'Full-stack web applications and platforms built with Next.js, React, Node.js, and modern databases. Fast, responsive, accessible, and ready for production scale.',
                  tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
                },
                {
                  num: '02',
                  Icon: Cpu,
                  title: 'AI Systems Engineering',
                  desc: 'Practical LLM integrations, RAG pipelines, intelligent agent workflows, and AI tooling that solve operational challenges and automate business intelligence.',
                  tags: ['OpenAI', 'Python', 'Vector DBs', 'RAG'],
                },
                {
                  num: '03',
                  Icon: Smartphone,
                  title: 'Mobile App Development',
                  desc: 'Cross-platform mobile applications for iOS and Android using React Native and Expo. Smooth performance, native UX, and seamless app store releases.',
                  tags: ['React Native', 'Expo', 'iOS', 'Android'],
                },
                {
                  num: '04',
                  Icon: Layers,
                  title: 'UI/UX & Product Design',
                  desc: 'Intuitive, conversion-centered interface design and component libraries. Turning complex workflows into clean, effortless user experiences in Figma.',
                  tags: ['Figma', 'Design Systems', 'Prototyping', 'UI/UX'],
                },
                {
                  num: '05',
                  Icon: Zap,
                  title: 'Intelligent Automation',
                  desc: 'End-to-end automation of business processes — CRM pipelines, custom internal tools, webhooks, and third-party API integrations that eliminate repetitive work.',
                  tags: ['APIs', 'CRMs', 'Automation', 'Workflows'],
                },
                {
                  num: '06',
                  Icon: Server,
                  title: 'Cloud & Infrastructure',
                  desc: 'Cloud provisioning, microservices, API architecture, CI/CD pipelines, and serverless hosting on Vercel and AWS designed to scale without costly rewrites.',
                  tags: ['AWS', 'Vercel', 'Docker', 'Prisma'],
                },
              ].map((svc) => (
                <motion.div
                  key={svc.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(11,11,12,0.08)' }}
                  style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    padding: '36px 32px',
                    border: '1px solid rgba(11,11,12,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: '#F7F6F2',
                        color: '#0B0B0C',
                        border: '1px solid rgba(11,11,12,0.06)',
                      }}>
                        <svc.Icon size={22} strokeWidth={1.7} />
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'rgba(11,11,12,0.24)', letterSpacing: '0.04em', fontFamily: 'monospace' }}>
                        {svc.num}
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-playfair),Georgia,serif',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: '#0B0B0C',
                      marginBottom: 10,
                      lineHeight: 1.25,
                    }}>
                      {svc.title}
                    </h3>

                    <p style={{
                      fontSize: '0.91rem',
                      color: '#6B6A66',
                      lineHeight: 1.72,
                      margin: 0,
                    }}>
                      {svc.desc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(11,11,12,0.06)' }}>
                    {svc.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 999,
                        background: '#F7F6F2',
                        color: '#4A4944',
                        letterSpacing: '0.02em',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack marquee */}
            <style>{`
              @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            `}</style>
            <div style={{ paddingTop: 36, borderTop: '1px solid rgba(11,11,12,0.08)' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6B6A66', marginBottom: 22, textAlign: 'center' }}>
                Core Technologies &amp; Tools
              </p>

              {/* Row 1 → left */}
              <div style={{ overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 10, width: 'max-content', animation: 'marquee 32s linear infinite' }}>
                  {[...STACK_1, ...STACK_1].map((item, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '9px 18px 9px 12px', borderRadius: 999, border: '1px solid rgba(11,11,12,0.08)', color: '#0B0B0C', fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                      <img src={item.icon} alt={item.name} width={18} height={18} style={{ flexShrink: 0, objectFit: 'contain' }} />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 2 → right (reverse) */}
              <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: 10, width: 'max-content', animation: 'marquee 28s linear infinite reverse' }}>
                  {[...STACK_2, ...STACK_2].map((item, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '9px 18px 9px 12px', borderRadius: 999, border: '1px solid rgba(11,11,12,0.08)', color: '#0B0B0C', fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                      <img src={item.icon} alt={item.name} width={18} height={18} style={{ flexShrink: 0, objectFit: 'contain' }} />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Wave: services light → work beige */}
        <div style={{ lineHeight: 0, background: '#F0EFE9', marginTop: -1 }}>
          <svg viewBox="0 0 1440 36" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 36 }}>
            <path d="M0,0 C480,36 960,0 1440,36 L1440,0 L0,0 Z" fill="#FAFAF8" />
          </svg>
        </div>

        {/* ── 4. Work ── */}
        <section id="work" className="work-section" aria-label="Selected work">
          <div style={{ padding: '0 0 clamp(32px,4vw,56px)' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2547FF', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2547FF', display: 'inline-block' }} />
              Selected Work
            </p>
            <h2 style={{ fontFamily: 'var(--font-croissant),Georgia,serif', fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400, letterSpacing: '-0.03em', color: '#0B0B0C', margin: 0, lineHeight: 1 }}>What I&rsquo;ve shipped.</h2>
          </div>
          <div className="work-grid" ref={workGridRef}>
            {projects.map((project, i) => (
              <motion.article
                key={project.name}
                className="project-card"
                initial={{ opacity: 0, y: 48, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.1 }}
                onClick={() => window.open(project.href, '_blank', 'noreferrer')}
                style={{ cursor: 'pointer' }}
              >
                {/* Screenshot */}
                <div className="project-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.img} alt="" className="project-img" loading="lazy" decoding="async" width={1200} height={630} />
                  <div className="project-img-overlay">
                    <a href={project.href} target="_blank" rel="noreferrer" className="project-visit-btn">Visit site <ArrowRight size={12} strokeWidth={2.4} aria-hidden="true" /></a>
                  </div>
                </div>
                {/* Info */}
                <div className="project-info">
                  <div>
                    <p className="project-num">{project.num}</p>
                    <h3 className="project-name">{project.name}</h3>
                    <p className="project-desc">{project.desc}</p>
                  </div>
                  <div className="project-footer">
                    <div className="project-tags">
                      {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                    </div>
                    <a href={project.href} target="_blank" rel="noreferrer" className="project-link">Visit <ArrowRight size={12} strokeWidth={2.4} aria-hidden="true" /></a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Slide counter — mobile only */}
          <div className="proj-counter-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 28 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, border: '1.5px solid rgba(11,11,12,0.14)', borderRadius: 999, overflow: 'hidden', background: '#fff' }}>
              <button
                onClick={() => { const g = workGridRef.current; if (g) g.scrollTo({ left: Math.max(0, projIdx - 1) * g.scrollWidth / projects.length, behavior: 'smooth' }); }}
                style={{ background: 'none', border: 'none', borderRight: '1.5px solid rgba(11,11,12,0.14)', cursor: projIdx === 0 ? 'default' : 'pointer', padding: '10px 20px', fontSize: '1rem', fontWeight: 700, color: projIdx === 0 ? 'rgba(11,11,12,0.2)' : '#0B0B0C', lineHeight: 1, transition: 'color 0.2s' }}
                aria-label="Previous project"
              >{'<'}</button>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B0B0C', letterSpacing: '0.06em', padding: '10px 24px', minWidth: 64, textAlign: 'center' }}>
                {projIdx + 1}/{projects.length}
              </span>
              <button
                onClick={() => { const g = workGridRef.current; if (g) g.scrollTo({ left: Math.min(projects.length - 1, projIdx + 1) * g.scrollWidth / projects.length, behavior: 'smooth' }); }}
                style={{ background: 'none', border: 'none', borderLeft: '1.5px solid rgba(11,11,12,0.14)', cursor: projIdx === projects.length - 1 ? 'default' : 'pointer', padding: '10px 20px', fontSize: '1rem', fontWeight: 700, color: projIdx === projects.length - 1 ? 'rgba(11,11,12,0.2)' : '#0B0B0C', lineHeight: 1, transition: 'color 0.2s' }}
                aria-label="Next project"
              >{'>'}</button>
            </div>
          </div>
        </section>

        {/* Wave: work beige → experience dark */}
        <div style={{ lineHeight: 0, background: '#05050a', marginTop: -1 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 40 }}>
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z" fill="#F0EFE9" />
          </svg>
        </div>

        {/* ── 5. Experience ── */}
        <ExperienceSection />

        {/* ── Footer ── */}
        <footer className="ft" role="contentinfo" id="contact">

            {/* Top grid */}
            <div className="ft-top">
              {/* Col 1 — tagline + socials */}
              <div className="ft-col ft-col--brand">
                <p className="ft-tagline">We believe great solutions should be accessible to everyone.</p>
                <p className="ft-tagline-sub">For enterprise · For community</p>
                <div className="ft-socials">
                  {[
                    { href: 'https://www.instagram.com/raeeess___?igsh=d3ZrYWJsOWNvbmV3&utm_source=qr', label: 'Instagram', Icon: InstagramIcon },
                    { href: 'https://x.com/raeeeesss?s=11', label: 'X / Twitter', Icon: XIcon },
                    { href: 'https://www.linkedin.com/in/mohammed-raees-9937b634a/', label: 'LinkedIn', Icon: LinkedinIcon },
                    { href: 'https://github.com/raeeeesss', label: 'GitHub', Icon: GithubIcon },
                  ].map(({ href, label, Icon }) => (
                    <a key={label} className="ft-social-btn" href={href} target="_blank" rel="noreferrer" aria-label={label}>
                      <Icon size={14} strokeWidth={1.8} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Col 2 — Explore */}
              <div className="ft-col">
                <p className="ft-col-head">Explore</p>
                <a className="ft-link" href="#about">Featured</a>
                <a className="ft-link" href="#about">About</a>
                <a className="ft-link" href="#services">AI &amp; Systems</a>
                <a className="ft-link" href="#cv">Expertise</a>
              </div>

              {/* Col 3 — Core Expertise */}
              <div className="ft-col">
                <p className="ft-col-head">Core Expertise</p>
                <span className="ft-link">AI Systems Engineering</span>
                <span className="ft-link">Product Engineering</span>
                <span className="ft-link">Intelligent Automation</span>
                <span className="ft-link">Platform Architecture</span>
                <span className="ft-link">Data Intelligence</span>
                <span className="ft-link">Cloud-Native Solutions</span>
              </div>

              {/* Col 4 — Connect */}
              <div className="ft-col">
                <p className="ft-col-head">Connect</p>
                <a className="ft-link" href="mailto:raeeeesss0@gmail.com">Work With Me</a>
                <a className="ft-link" href="#work">Featured Projects</a>
                <a className="ft-link" href="mailto:raeeeesss0@gmail.com">Get in Touch</a>
                <a className="ft-link" href="#cv">Background &amp; CV</a>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="ft-bottom">
              <p className="ft-copy">&copy; 2026 Mohammed Raees. All rights reserved.</p>
              <div className="ft-legal">
                <a href="mailto:raeeeesss0@gmail.com" className="ft-legal-link">Contact</a>
                <a href="#home" className="ft-legal-link">Back to Top</a>
              </div>
            </div>

        </footer>


      </main>
    </div>
  );
}
