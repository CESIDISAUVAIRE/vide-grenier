'use client';

import { useEffect, useRef } from 'react';
import styles from './LoopVideo.module.css';

interface LoopVideoProps {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
}

/**
 * Vidéo en boucle (autoplay muet) qui ne joue que lorsque la section est
 * visible à l'écran (IntersectionObserver) et se met en pause sinon,
 * pour économiser les ressources.
 */
export default function LoopVideo({
  src,
  poster,
  className,
  label,
}: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const play = () => {
      try {
        void video.play();
      } catch {
        /* ignore */
      }
    };
    const pause = () => {
      try {
        video.pause();
      } catch {
        /* ignore */
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            play();
          } else {
            pause();
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(wrap);

    return () => {
      observer.disconnect();
      pause();
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <video
        ref={videoRef}
        className={className ?? styles.video}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      />
    </div>
  );
}