#!/bin/sh
# Entrypoint de l'environnement de PRODUCTION.
# Crée le schéma (via le Prisma Client), insère les données d'exemple si la
# table est vide, puis lance le serveur.
set -e

echo "▶ Initialisation du schéma (init-db.js)..."
node prisma/init-db.js

echo "▶ Seed des données d'exemple (si table vide)..."
node prisma/seed-node.js

echo "▶ Démarrage du serveur Next.js..."
exec "$@"