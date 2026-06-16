'use client';
import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Hero.module.css';

function createParticles(count, width, height) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.1,
  }));
}

export default function Hero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth < 768;
    const drawLines = !isMobile;
    const maxDist = 100;
    let particleCount = isMobile ? 18 : 32;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let particles = createParticles(particleCount, canvas.width, canvas.height);

    let visible = true;
    let tabVisible = true;
    let animId = null;

    const draw = () => {
      if (!visible || !tabVisible) {
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();
      });

      if (drawLines) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < maxDist * maxDist) {
              const dist = Math.sqrt(distSq);
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / maxDist)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (animId === null) draw();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0 }
    );
    observer.observe(section);

    const onVisibility = () => {
      tabVisible = document.visibilityState === 'visible';
      if (tabVisible && visible) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      particleCount = mobile ? 18 : 32;
      resize();
      particles = createParticles(particleCount, canvas.width, canvas.height);
    };
    window.addEventListener('resize', handleResize);

    start();

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      {!reducedMotion && <canvas ref={canvasRef} className={styles.canvas} />}

      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className={styles.badge}>
          <span className={styles.badgeDot} />
          Available for opportunities
        </motion.div>

        <motion.h1 variants={itemVariants} className={styles.title}>
          Hi, I&apos;m{' '}
          <span className={styles.nameGradient}>Rishabh Bhardwaj</span>
        </motion.h1>

        <motion.p variants={itemVariants} className={styles.role}>
          Software Engineer &nbsp;·&nbsp; Backend &amp; Full-Stack Developer
        </motion.p>

        <motion.p variants={itemVariants} className={styles.subtitle}>
          I build and deploy real-world web applications using{' '}
          <span className={styles.highlight}>JavaScript</span>,{' '}
          <span className={styles.highlight}>Python</span>,{' '}
          <span className={styles.highlight}>React</span>, and{' '}
          <span className={styles.highlight}>Node.js</span>.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.actions}>
          <a href="#projects" className="btn-glow">
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="https://github.com/Dantescenario" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href="#contact" className="btn-outline">Contact Me</a>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.stats}>
          {[
            { num: '4+', label: 'Projects Built' },
            { num: '2+', label: 'Years Coding' },
            { num: '5+', label: 'Technologies' },
          ].map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statNum}>{stat.num}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
