// Seed pour l'environnement de PRODUCTION (exécuté par l'entrypoint).
// Version en Node.js pur (pas de tsx) car l'image standalone de prod
// n'embarque pas les dépendances de dev.
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const annonces = [
  {
    titre: 'Canapé 3 places en cuir',
    description:
      'Canapé en cuir véritable, très bon état général. Quelques traces d’usure sur les accoudoirs.',
    prix: 120,
    categorie: 'Meubles',
    imageUrl:
      'https://images.unsplash.com/photo-1553874770484-9f0b1c0f0a0e?w=600&q=80',
  },
  {
    titre: 'Vélo de route Triban 520',
    description:
      'Vélo de route en aluminium, taille M. Révisé récemment, pneus neufs.',
    prix: 250,
    categorie: 'Sports & Loisirs',
    imageUrl:
      'https://images.unsplash.com/photo-1553874770484-9f0b1c0f0a0e?w=600&q=80',
  },
  {
    titre: 'Livre « Le Petit Prince »',
    description:
      'Édition collector illustrée, état neuf. Idéal pour collectionneur.',
    prix: 8,
    categorie: 'Livres',
    imageUrl:
      'https://images.unsplash.com/photo-1553874770484-9f0b1c0f0a0e?w=600&q=80',
  },
  {
    titre: 'Table basse en bois massif',
    description:
      'Table basse en chêne massif, fabriquée à la main. Dimensions 90x50 cm.',
    prix: 45,
    categorie: 'Meubles',
    imageUrl:
      'https://images.unsplash.com/photo-1553874770484-9f0b1c0f0a0e?w=600&q=80',
  },
  {
    titre: 'Console de jeux rétro',
    description:
      'Console rétro avec 2 manettes et 10 jeux préinstallés. Fonctionne parfaitement.',
    prix: 60,
    categorie: 'High-Tech',
    imageUrl:
      'https://images.unsplash.com/photo-1553874770484-9f0b1c0f0a0e?w=600&q=80',
  },
  {
    titre: 'Lampe de chevet design',
    description:
      'Lampe de chevet en laiton et abat-jour en lin. Ampoule LED incluse.',
    prix: 15,
    categorie: 'Décoration',
    imageUrl:
      'https://images.unsplash.com/photo-1553874770484-9f0b1c0f0a0e?w=600&q=80',
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