'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const letterVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.4 + i * 0.06, duration: 0.75, ease },
  }),
};

function SplitReveal({ text, style, baseDelay = 0 }) {
  return (
    <div style={{ overflow: 'hidden', display: 'block' }}>
      <div style={{ display: 'flex', ...style }}>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            custom={i + baseDelay * 10}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default function Hero({ sectionRef }) {
  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        background: '#0a0a0a',
        marginTop: 0,
      }}
      aria-label="Mohammed Raees"
    >

      {/* Ghost "Mohammed" — background watermark */}
      <motion.div
        className="hero-ghost"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          left: '45%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          fontFamily: 'var(--font-mea-culpa), cursive',
          fontSize: 'clamp(6rem, 16vw, 20rem)',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          color: '#2a2a2a',
          lineHeight: 1,
          opacity: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Mohammed
      </motion.div>

      {/* Portrait — floating entrance */}
      <motion.div
        className="hero-portrait-wrap"
        style={{
          position: 'absolute',
          right: 50,
          top: '50px',
          height: '100%',
          zIndex: 3,
        }}
        initial={{ opacity: 0, x: 60, scale: 1.04 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Desktop portrait */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-img-desktop"
          src="/mohammed%20raees%20img1.png"
          alt="Mohammed Raees"
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'top right',
            display: 'block',
          }}
        />
        {/* Mobile portrait */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-img-mobile"
          src="/mohammed%20raees%20img%2C3.PNG"
          alt="Mohammed Raees"
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'none',
          }}
        />
      </motion.div>

      {/* Name block — left side */}
      <div className="hero-name-block" style={{
        position: 'absolute',
        left: 'clamp(48px, 7vw, 100px)',
        top: '55%',
        transform: 'translateY(-50%)',
        zIndex: 4,
        textAlign: 'left',
      }}>

        {/* Mohammed — letter by letter slide up */}
        <SplitReveal
          text="Mohammed"
          baseDelay={0}
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(3.8rem, 8vw, 10rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            color: '#f5f2ed',
            lineHeight: 0.9,
          }}
        />

        {/* Raees — delayed stagger */}
        <div style={{ marginTop: 8, marginBottom: 22 }}>
          <SplitReveal
            text="Raees"
            baseDelay={1.2}
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.4rem, 4.2vw, 5rem)',
              fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '0.18em',
              color: '#f5f2ed',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          />
        </div>

        {/* Tagline — fade up */}
        <motion.p
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.4, duration: 0.9, ease }}
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.35)',
            margin: 0,
            letterSpacing: '0.08em',
          }}
        >
          full stack developer
        </motion.p>
      </div>

      {/* Bottom-right info block */}
      <motion.div
        className="hero-info-block"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease }}
        style={{
          position: 'absolute',
          bottom: 'clamp(36px, 5vh, 60px)',
          right: 'clamp(36px, 5vw, 72px)',
          zIndex: 4,
          maxWidth: 210,
        }}
      >
        <div style={{ width: 28, height: 1.5, background: 'rgba(255,255,255,0.3)', marginBottom: 12 }} />
        <p style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(0.6rem, 0.85vw, 0.78rem)',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.75,
          margin: 0,
        }}>
          Full Stack Developer &amp; Software Engineer.<br />
          Building AI-powered products<br />
          and digital experiences.
        </p>
      </motion.div>

    </section>
  );
}
