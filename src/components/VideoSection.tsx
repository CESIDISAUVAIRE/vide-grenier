'use client';

import LoopVideo from './LoopVideo';
import SectionHeading from './SectionHeading';
import styles from './VideoSection.module.css';

interface VideoSectionProps {
  eyebrow: string;
  title: string;
  text: string;
  src: string;
  poster?: string;
  id?: string;
}

/**
 * Section vidéo secondaire : une vidéo en boucle (detail/ambiance) qui ne
 * joue que lorsqu'elle est visible, avec un titre superposé.
 */
export default function VideoSection({
  eyebrow,
  title,
  text,
  src,
  poster,
  id,
}: VideoSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.media}>
        <LoopVideo src={src} poster={poster} />
        <div className={styles.overlay}>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </section>
  );
}