#!/bin/sh
# Entrypoint de l'environnement de PRODUCTION.
# Applique le schéma Prisma à la base (création/migration) puis lance le serveur.
set -e

echo "▶ Application du schéma Prisma (prisma db push)..."
npx prisma db push --skip-generate

echo "▶ Démarrage du serveur Next.js..."
exec "$@"