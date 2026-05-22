'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';

const TIMELINE = [
  { year: '2022', event: 'Started coding journey with Python & web basics' },
  { year: '2023', event: 'Built first full-stack web apps with JavaScript & React' },
  { year: '2024', event: 'Deployed multiple production projects on Vercel & Netlify' },
  { year: '2025+', event: 'Expanding into backend systems & open to full-time roles' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.eyebrow}>Who I am</p>
          <h2 className="section-title">About <span>Me</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {/* Left: avatar + quick facts */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.avatarWrap}>
              <div className={styles.avatarRing} />
              <div className={styles.avatar}>
                <span className={styles.avatarInitials}>RB</span>
              </div>
              <div className={styles.avatarOrbit}>
                <span className={styles.orbitDot} style={{ '--orbit-delay': '0s', '--orbit-color': '#6366f1' }} />
                <span className={styles.orbitDot} style={{ '--orbit-delay': '-2s', '--orbit-color': '#a855f7' }} />
                <span className={styles.orbitDot} style={{ '--orbit-delay': '-4s', '--orbit-color': '#06b6d4' }} />
              </div>
            </div>

            <div className={`${styles.factCard} glass-card`}>
              {[
                { icon: '🌏', label: 'Location', value: 'India' },
                { icon: '💼', label: 'Status', value: 'Open to Work' },
                { icon: '⚡', label: 'Focus', value: 'Full-Stack Dev' },
                { icon: '🎓', label: 'Mindset', value: 'Always Learning' },
              ].map((fact, i) => (
                <motion.div
                  key={fact.label}
                  className={styles.factRow}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <span className={styles.factIcon}>{fact.icon}</span>
                  <div>
                    <p className={styles.factLabel}>{fact.label}</p>
                    <p className={styles.factValue}>{fact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio + timeline */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className={styles.bio}>
              <p>
                I'm <strong>Rishabh Bhardwaj</strong>, a passionate Software Engineer focused on building
                clean, performant, and user-friendly web applications. I love turning complex problems into
                elegant digital solutions.
              </p>
              <p>
                My journey started with Python scripting and quickly evolved into full-stack development —
                from crafting responsive frontends with React to architecting backend services.
                I care deeply about code quality, developer experience, and shipping products that matter.
              </p>
              <p>
                When I'm not coding, I'm exploring new technologies, contributing to open source,
                and continuously leveling up my skills.
              </p>
            </div>

            <div className={styles.timeline}>
              <h3 className={styles.timelineTitle}>My Journey</h3>
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  className={styles.timelineItem}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <p className={styles.timelineEvent}>{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
