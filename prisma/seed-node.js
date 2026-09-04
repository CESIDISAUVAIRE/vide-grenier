// Seed pour l'environnement de PRODUCTION (exécuté par l'entrypoint).
// Version en Node.js pur (pas de tsx) car l'image standalone de prod
// n'embarque pas les dépendances de dev.
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const annonces = [
  {
    titre: 'Montre automatique en acier',
    description:
      'Montre mécanique à remontage automatique, boîtier acier brossé, cadran noir soleillé. Étanche 100m.',
    prix: 1200,
    categorie: 'High-Tech',
    imageUrl:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
  },
  {
    titre: 'Canapé Chesterfield en cuir',
    description:
      'Canapé Chesterfield en cuir pleine fleur, capitonné, patine naturelle. Pièce d’exception.',
    prix: 2400,
    categorie: 'Meubles',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  },
  {
    titre: 'Table basse en marbre et laiton',
    description:
      'Table basse en marbre de Carrare et piètement laiton brossé. Design italien.',
    prix: 890,
    categorie: 'Décoration',
    imageUrl:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  },
  {
    titre: 'Livre « Le Petit Prince » — édition originale',
    description:
      'Édition collector illustrée, reliure cuir, dorure à chaud. État neuf.',
    prix: 350,
    categorie: 'Livres',
    imageUrl:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
  },
  {
    titre: 'Lunettes de soleil aviateur',
    description:
      'Lunettes aviateur monture dorée, verres polarisés. Étui cuir inclus.',
    prix: 420,
    categorie: 'Accessoires',
    imageUrl:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
  },
  {
    titre: 'Enceinte hi-fi vintage',
    description:
      'Enceinte haute-fidélité, façade aluminium brossé, son chaleureux. Restaurée.',
    prix: 650,
    categorie: 'High-Tech',
    imageUrl:
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
  },
];

async function main() {
  const count = await prisma.annonce.count();
  if (count > 0) {
    console.log(`Seed ignoré : ${count} annonce(s) déjà présente(s).`);
    return;
  }
  for (const annonce of annonces) {
    await prisma.annonce.create({ data: annonce });
  }
  console.log(`Seed terminé : ${annonces.length} annonces créées.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });