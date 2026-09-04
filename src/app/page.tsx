import { prisma } from '@/lib/prisma';
import FrameSequenceHero from '@/components/FrameSequenceHero';
import HeroContent from '@/components/HeroContent';
import Navbar from '@/components/Navbar';
import CategorySection from '@/components/CategorySection';
import VideoSection from '@/components/VideoSection';
import AnnonceGrid from '@/components/AnnonceGrid';
import SectionHeading from '@/components/SectionHeading';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

const NAV_LINKS = [
  { label: 'Collection', target: '#collection' },
  { label: 'Savoir-faire', target: '#savoir-faire' },
  { label: 'Annonces', target: '#annonces' },
];

const CATEGORIES = [
  {
    name: 'Meubles',
    tagline: 'Pièces d’exception',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  },
  {
    name: 'High-Tech',
    tagline: 'Objets rares',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  },
  {
    name: 'Décoration',
    tagline: 'Art de vivre',
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80',
  },
  {
    name: 'Livres',
    tagline: 'Éditions curées',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
  },
];

export default async function HomePage() {
  const annonces = await prisma.annonce.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className={styles.main}>
      <PageTransition />
      <CustomCursor />
      <Navbar links={NAV_LINKS} />

      {/* Hero scroll-frame avec titre superposé */}
      <div className={styles.heroWrap}>
        <FrameSequenceHero
          frameBase="/video-frames/hero"
          fallbackVideo="/video/hero.mp4"
        >
          <HeroContent
            title="L’art de la rareté"
            subtitle="Une collection privée de pièces vintage et d’objets rares, sélectionnés avec exigence."
            ctaLabel="Découvrir la collection"
            ctaTarget="#collection"
          />
        </FrameSequenceHero>
      </div>

      {/* Catégories curées — la vitrine */}
      <section id="collection" className={styles.section}>
        <SectionHeading eyebrow="Curatelle" title="La collection" />
        <CategorySection categories={CATEGORIES} />
      </section>

      {/* Section vidéo secondaire : detail — le savoir-faire */}
      <VideoSection
        id="savoir-faire"
        eyebrow="Savoir-faire"
        title="Le détail qui fait la différence"
        text="Chaque pièce est inspectée, restaurée et documentée avec la rigueur d’un atelier de haute horlogerie."
        src="/video/detail.mp4"
      />

      {/* Grille des annonces réelles */}
      <section id="annonces" className={styles.section}>
        <SectionHeading eyebrow="La vitrine" title="Annonces" />
        <p className={styles.count}>
          {annonces.length} pièce{annonces.length > 1 ? 's' : ''} disponible
          {annonces.length > 1 ? 's' : ''}
        </p>
        <AnnonceGrid annonces={annonces} />
      </section>

      <Footer />
    </main>
  );
}