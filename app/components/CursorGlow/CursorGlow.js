'use client';
import { useEffect, useRef } from 'react';
import styles from './CursorGlow.module.css';

export default function CursorGlow() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let frame = null;
    let x = 0;
    let y = 0;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        frame = null;
      });
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={cursorRef} className={styles.glow} aria-hidden="true" />;
}
