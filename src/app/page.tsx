import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

// Catégories disponibles pour le filtre (feature/live-demo).
const CATEGORIES = [
  'Meubles',
  'Sports & Loisirs',
  'Livres',
  'High-Tech',
  'Décoration',
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const selected =
    typeof searchParams.categorie === 'string'
      ? searchParams.categorie
      : undefined;

  const annonces = await prisma.annonce.findMany({
    where: selected ? { categorie: selected } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Vide Grenier</h1>
        <p className={styles.subtitle}>
          {annonces.length} annonce{annonces.length > 1 ? 's' : ''} en vente
          {selected ? ` — catégorie « ${selected} »` : ''}
        </p>
      </header>

      {/* Filtre par catégorie (feature/live-demo) */}
      <nav className={styles.filters} aria-label="Filtrer par catégorie">
        <a
          href="/"
          className={`${styles.filter} ${!selected ? styles.filterActive : ''}`}
        >
          Toutes
        </a>
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`/?categorie=${encodeURIComponent(cat)}`}
            className={`${styles.filter} ${
              selected === cat ? styles.filterActive : ''
            }`}
          >
            {cat}
          </a>
        ))}
      </nav>

      <section className={styles.grid}>
        {annonces.map((annonce) => (
          <article key={annonce.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={annonce.imageUrl}
                alt={annonce.titre}
                className={styles.image}
              />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.category}>{annonce.categorie}</span>
              <h2 className={styles.title}>{annonce.titre}</h2>
              <p className={styles.description}>{annonce.description}</p>
              <p className={styles.price}>{annonce.prix.toFixed(2)} €</p>
            </div>
          </article>
        ))}
      </section>

      {annonces.length === 0 && (
        <p className={styles.empty}>
          Aucune annonce pour le moment. Lancez le seed pour ajouter des
          données.
        </p>
      )}
    </main>
  );
}