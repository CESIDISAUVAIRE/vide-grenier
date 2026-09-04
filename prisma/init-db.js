// Initialisation de la base pour l'environnement de PRODUCTION.
// Crée la table `Annonce` si elle n'existe pas, via le Prisma Client
// (pas besoin du CLI prisma, fragile dans l'image standalone).
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Annonce" (
      "id" SERIAL PRIMARY KEY,
      "titre" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "prix" DOUBLE PRECISION NOT NULL,
      "categorie" TEXT NOT NULL,
      "imageUrl" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('Table "Annonce" prête.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });