'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import styles from './Skills.module.css';

const TechGlobe = dynamic(() => import('../TechGlobe/TechGlobe'), { ssr: false });

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    icon: '⚡',
    color: '#6366f1',
    skills: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Backend',
    icon: '🛠️',
    color: '#a855f7',
    skills: ['Python', 'Node.js', 'CLI Tools', 'Data Processing', 'REST APIs'],
  },
  {
    title: 'Tools & Platforms',
    icon: '🚀',
    color: '#06b6d4',
    skills: ['Git', 'GitHub', 'GitHub Pages', 'Cloudinary', 'VS Code', 'Vercel', 'Netlify'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <p className={styles.eyebrow}>What I work with</p>
          <h2 className="section-title">Skills &amp; <span>Technologies</span></h2>
          <p className="section-subtitle">A visual tour of my tech stack — drag the globe to explore!</p>
        </motion.div>

        <div className={styles.grid}>
          {/* Left: categories */}
          <div className={styles.categories}>
            {SKILL_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                className={`${styles.card} glass-card`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>{cat.icon}</span>
                  <h3 className={styles.cardTitle} style={{ color: cat.color }}>
                    {cat.title}
                  </h3>
                </div>
                <div className={styles.tags}>
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      className={styles.tag}
                      style={{ '--tag-color': cat.color }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.15 + j * 0.06 + 0.3 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: globe */}
          <motion.div
            className={styles.globeContainer}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <TechGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
