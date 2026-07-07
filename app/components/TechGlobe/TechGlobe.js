'use client';
import { useRef, useEffect } from 'react';
import styles from './TechGlobe.module.css';

const SKILLS = [
  { name: 'Python', color: '#3776AB', bg: '#00101a', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'PyTorch', color: '#EE4C2C', bg: '#1a0800', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
  { name: 'Scikit-learn', color: '#F7931E', bg: '#1a1000', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
  { name: 'FastAPI', color: '#059669', bg: '#001a10', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  { name: 'NumPy', color: '#4DABCF', bg: '#00101a', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
  { name: 'Pandas', color: '#e70488', bg: '#1a001a', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
  { name: 'Matplotlib', color: '#11557c', bg: '#00101a', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg' },
  { name: 'Git', color: '#F05032', bg: '#1a0800', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub', color: '#ffffff', bg: '#161b22', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { name: 'VS Code', color: '#007ACC', bg: '#001020', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'C++', color: '#00599C', bg: '#00101a', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'SQL', color: '#003B57', bg: '#00101a', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  { name: 'Ollama', color: '#a855f7', bg: '#1a001a', url: '' },
  { name: 'Llama', color: '#06b6d4', bg: '#001a1f', url: '' },
];

function fibonacciSphere(n) {
  const pts = [];
  const phi = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / n);
    const a = (2 * Math.PI * i) / phi;
    pts.push({ x: Math.sin(theta) * Math.cos(a), y: Math.sin(theta) * Math.sin(a), z: Math.cos(theta) });
  }
  return pts;
}

function rotatePoint(p, rx, ry) {
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const y1 = p.y * cx - p.z * sx;
  const z1 = p.y * sx + p.z * cx;
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  return { x: p.x * cy + z1 * sy, y: y1, z: -p.x * sy + z1 * cy };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function TechGlobe() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ dragging: false, lastX: 0, lastY: 0 });
  const stateRef = useRef({ rotY: 0, rotX: 0.3 });
  const imagesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    let size = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let dotPts = [];
    let skillPts = fibonacciSphere(SKILLS.length);
    let running = true;

    const resize = () => {
      size = Math.min(500, window.innerWidth * 0.85);
      canvas.width = size;
      canvas.height = size;
      cx = size / 2;
      cy = size / 2;
      R = size * 0.33;
      dotPts = fibonacciSphere(window.innerWidth < 768 ? 140 : 260);
    };
    resize();

    SKILLS.forEach((skill, i) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imagesRef.current[i] = img;
      };
      img.onerror = () => {
        imagesRef.current[i] = null;
      };
      img.src = skill.url;
    });

    const draw = () => {
      if (!running) return;

      ctx.clearRect(0, 0, size, size);
      if (!reducedMotion && !mouseRef.current.dragging) {
        stateRef.current.rotY += 0.004;
      }
      const { rotX, rotY } = stateRef.current;

      dotPts.forEach((p) => {
        const r = rotatePoint(p, rotX, rotY);
        const a = ((r.z + 1) / 2) * 0.22;
        const s = 1 + ((r.z + 1) / 2) * 1.2;
        ctx.beginPath();
        ctx.arc(cx + r.x * R, cy + r.y * R, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${a})`;
        ctx.fill();
      });

      for (let lat = -75; lat <= 75; lat += 30) {
        ctx.beginPath();
        for (let lon = 0; lon <= 360; lon += 6) {
          const ph = (lon * Math.PI) / 180;
          const th = ((90 - lat) * Math.PI) / 180;
          const r = rotatePoint(
            { x: Math.sin(th) * Math.cos(ph), y: Math.cos(th), z: Math.sin(th) * Math.sin(ph) },
            rotX,
            rotY
          );
          if (lon === 0) ctx.moveTo(cx + r.x * R, cy + r.y * R);
          else ctx.lineTo(cx + r.x * R, cy + r.y * R);
        }
        ctx.strokeStyle = 'rgba(99,102,241,0.07)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 6) {
          const ph = (lon * Math.PI) / 180;
          const th = ((90 - lat) * Math.PI) / 180;
          const r = rotatePoint(
            { x: Math.sin(th) * Math.cos(ph), y: Math.cos(th), z: Math.sin(th) * Math.sin(ph) },
            rotX,
            rotY
          );
          if (lat === -90) ctx.moveTo(cx + r.x * R, cy + r.y * R);
          else ctx.lineTo(cx + r.x * R, cy + r.y * R);
        }
        ctx.strokeStyle = 'rgba(99,102,241,0.07)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      const projected = skillPts
        .map((p, i) => {
          const r = rotatePoint(p, rotX, rotY);
          return { sx: cx + r.x * R * 1.28, sy: cy + r.y * R * 1.28, z: r.z, i };
        })
        .sort((a, b) => a.z - b.z);

      projected.forEach(({ sx, sy, z, i }) => {
        const scale = Math.max(0.35, (z + 1.2) / 2.2);
        const alpha = Math.max(0.15, scale);
        const badgeS = Math.round(28 + scale * 18);
        const pad = 4;
        const imgS = badgeS - pad * 2;
        const bx = sx - badgeS / 2;
        const by = sy - badgeS / 2;
        const skill = SKILLS[i];
        const img = imagesRef.current[i];

        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.moveTo(cx + (sx - cx) * 0.78, cy + (sy - cy) * 0.78);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = skill.color + '55';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        if (scale > 0.75) {
          ctx.shadowColor = skill.color;
          ctx.shadowBlur = scale * 14;
        }

        ctx.fillStyle = skill.bg;
        roundRect(ctx, bx, by, badgeS, badgeS, badgeS * 0.22);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.strokeStyle = skill.color + 'cc';
        ctx.lineWidth = 1.4 * scale;
        roundRect(ctx, bx, by, badgeS, badgeS, badgeS * 0.22);
        ctx.stroke();

        if (img && img.complete && img.naturalWidth > 0) {
          try {
            ctx.save();
            roundRect(ctx, bx + pad, by + pad, imgS, imgS, imgS * 0.18);
            ctx.clip();
            ctx.drawImage(img, bx + pad, by + pad, imgS, imgS);
            ctx.restore();
          } catch {
            ctx.font = `bold ${Math.max(8, 9 * scale)}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = skill.color;
            ctx.fillText(skill.name.slice(0, 2), sx, sy);
          }
        } else {
          ctx.font = `bold ${Math.max(8, 9 * scale)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = skill.color;
          ctx.fillText(skill.name.slice(0, 2), sx, sy);
        }

        ctx.globalAlpha = 1;
      });

      if (!reducedMotion) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const loop = () => {
      if (reducedMotion) {
        draw();
        return;
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    loop();

    const md = (e) => {
      mouseRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
    };
    const mm = (e) => {
      if (!mouseRef.current.dragging) return;
      stateRef.current.rotY += (e.clientX - mouseRef.current.lastX) * 0.008;
      stateRef.current.rotX += (e.clientY - mouseRef.current.lastY) * 0.008;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
      if (reducedMotion) draw();
    };
    const mu = () => {
      mouseRef.current.dragging = false;
    };
    const ts = (e) => {
      mouseRef.current = { dragging: true, lastX: e.touches[0].clientX, lastY: e.touches[0].clientY };
    };
    const tm = (e) => {
      if (!mouseRef.current.dragging) return;
      stateRef.current.rotY += (e.touches[0].clientX - mouseRef.current.lastX) * 0.008;
      stateRef.current.rotX += (e.touches[0].clientY - mouseRef.current.lastY) * 0.008;
      mouseRef.current.lastX = e.touches[0].clientX;
      mouseRef.current.lastY = e.touches[0].clientY;
      if (reducedMotion) draw();
    };

    const onResize = () => {
      resize();
      if (reducedMotion) draw();
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        return;
      }
      if (!reducedMotion && rafRef.current === null) loop();
    };

    canvas.addEventListener('mousedown', md);
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', mu);
    canvas.addEventListener('touchstart', ts, { passive: true });
    canvas.addEventListener('touchmove', tm, { passive: true });
    canvas.addEventListener('touchend', mu);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousedown', md);
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseup', mu);
      canvas.removeEventListener('touchstart', ts);
      canvas.removeEventListener('touchmove', tm);
      canvas.removeEventListener('touchend', mu);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className={styles.globeWrapper}>
      <div className={styles.glowRing} />
      <canvas ref={canvasRef} className={styles.canvas} aria-label="Interactive tech stack globe" />
      <p className={styles.hint}>Drag to rotate</p>
      <div className={styles.skillList}>
        {SKILLS.map((s) => (
          <span key={s.name} className={styles.skillPill} style={{ borderColor: s.color + '55', color: s.color }}>
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
