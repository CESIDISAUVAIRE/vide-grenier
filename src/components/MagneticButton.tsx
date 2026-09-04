'use client';

import { useRef } from 'react';
import styles from './MagneticButton.module.css';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

/**
 * Bouton magnétique : la surface suit légèrement le curseur au survol.
 */
export default function MagneticButton({
  children,
  className,
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  };

  const base = `${styles.button} ${className ?? ''}`;

  if (href) {
    return (
      <a
        ref={ref as never}
        href={href}
        className={base}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="hover"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as never}
      className={base}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor="hover"
    >
      {children}
    </button>
  );
}