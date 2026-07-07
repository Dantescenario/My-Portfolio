'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    id: 'medical-disease-detection',
    title: 'Medical Image Disease Detection',
    description: 'An end-to-end deep learning system for chest X-ray classification. Implemented preprocessing, augmentation, weighted loss, model checkpointing, and evaluation using Accuracy, Precision, Recall, F1-score, and Confusion Matrix. Built a FastAPI REST API for deployment-ready inference.',
    tags: ['PyTorch', 'FastAPI', 'Computer Vision', 'Deep Learning', 'Python'],
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    icon: '🏥',
    github: 'https://github.com/Dantescenario/Medical-Image-Disease-Detection',
    features: ['Chest X-ray disease classification pipeline', 'Preprocessing and image augmentation', 'Weighted loss function handling class imbalance', 'Model evaluation (F1-score, Confusion Matrix)', 'FastAPI REST API for real-time inference'],
  },
  {
    id: 'rag-ai-tutor',
    title: 'RAG AI Tutor (Harvard CS50)',
    description: 'An end-to-end RAG system built on Harvard CS50 lecture transcripts. Implemented semantic chunking, BGE-M3 vector embeddings, cosine similarity retrieval, and Ollama + Llama integration to generate grounded responses along with lecture timestamps.',
    tags: ['RAG', 'Llama', 'FastAPI', 'Semantic Search', 'Ollama', 'Vector Embeddings'],
    gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    icon: '🤖',
    github: 'https://github.com/Dantescenario/rag-based-ai',
    features: ['Semantic chunking of lecture transcripts', 'BGE-M3 embedding generation', 'Cosine similarity-based retrieval model', 'Ollama + Llama inference integration', 'Lecture timestamp retrieval for easy lookup'],
  },
  {
    id: 'resume-builder',
    title: 'AI Resume Builder',
    description: 'A full-stack AI-powered, ATS-friendly resume builder designed with automated resume generation and backend APIs for real-time resume suggestions and formatting.',
    tags: ['Next.js', 'FastAPI', 'REST APIs', 'Generative AI', 'Python'],
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    icon: '📄',
    github: 'https://github.com/Dantescenario/resume-builder',
    live: 'https://resume-builder-black-eight.vercel.app/',
    videoUrl: 'https://res.cloudinary.com/dpcnteaog/video/upload/v1768469461/resume-builder_y8oc3u.mp4',
    features: ['ATS-friendly professional formatting', 'AI-powered suggestions and keyword optimization', 'Automated PDF resume generation', 'Full-stack REST API backend structure'],
  },
];

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], video, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const items = Array.from(focusable).filter((el) => !el.disabled);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`${styles.modal} glass-card`}
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className={styles.modalClose} onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.modalHeader} style={{ background: project.gradient }}>
          <span className={styles.modalIcon}>{project.icon}</span>
          <h2 id="modal-title" className={styles.modalTitle}>{project.title}</h2>
          <div className={styles.modalTags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.modalTag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className={styles.modalBody}>
          {project.videoUrl && (
            <video
              src={project.videoUrl}
              controls
              preload="metadata"
              className={styles.video}
            />
          )}

          <h3 className={styles.modalSubtitle}>About this project</h3>
          <p className={styles.modalDesc}>{project.description}</p>

          <h3 className={styles.modalSubtitle}>Key Features</h3>
          <ul className={styles.featureList}>
            {project.features.map(f => (
              <li key={f} className={styles.featureItem}>
                <span className={styles.featureDot} />
                {f}
              </li>
            ))}
          </ul>

          <div className={styles.modalActions}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-glow">
                🚀 Live Demo
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState(null);

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.eyebrow}>What I&apos;ve built</p>
          <h2 className="section-title">My <span>Work</span></h2>
          <p className="section-subtitle">Real-world applications — click any card to explore details & demo</p>
        </motion.div>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              className={`${styles.card} glass-card`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              {/* Card top gradient bar */}
              <div className={styles.cardBar} style={{ background: project.gradient }} />
              {!project.live && (
                <span className={styles.statusBadge}>Video demo</span>
              )}

              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.projectIcon}>{project.icon}</span>
                  <div className={styles.cardLinks}>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        title="Live Demo"
                        aria-label="Live demo"
                        onClick={e => e.stopPropagation()}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.iconLink}
                      title="GitHub"
                      aria-label="View source on GitHub"
                      onClick={e => e.stopPropagation()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>

                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <button
                  className={styles.viewBtn}
                  onClick={() => setSelected(project)}
                >
                  View Details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}
