#!/bin/sh
# Entrypoint de l'environnement de PRODUCTION.
# Applique le schéma Prisma à la base (création/migration), insère les données
# d'exemple si la table est vide, puis lance le serveur.
set -e

echo "▶ Application du schéma Prisma (prisma db push)..."
npx prisma db push --skip-generate

echo "▶ Seed des données d'exemple (si table vide)..."
node prisma/seed-node.js

echo "▶ Démarrage du serveur Next.js..."
exec "$@"