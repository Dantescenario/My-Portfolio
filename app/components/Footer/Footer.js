'use client';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />
      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.logo}>RB<span className={styles.dot}>.</span></span>
          <p className={styles.copy}>© {year} Rishabh Bhardwaj. All rights reserved.</p>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className={styles.madeWith}>
            Made with{' '}
            <span className={styles.heart}>♥</span>
            {' '}using{' '}
            <span className={styles.tech}>Next.js</span>
            {' '}&amp;{' '}
            <span className={styles.tech}>Framer Motion</span>
          </p>
          <nav className={styles.links}>
            {['#hero', '#about', '#skills', '#projects', '#contact'].map(href => (
              <a key={href} href={href} className={styles.link}>
                {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}
