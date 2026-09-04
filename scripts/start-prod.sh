#!/usr/bin/env bash
# Démarre l'environnement de PRODUCTION (3 conteneurs : nginx + web + db).
# Se place sur `main` à jour avant de builder, pour refléter la version livrée.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "▶ Mise à jour de la branche main..."
git checkout main
git pull origin main

echo "▶ Démarrage de l'environnement de PROD (vide-grenier-prod)..."
docker compose -p vide-grenier-prod -f docker-compose.prod.yml up -d --build

echo "✔ Prod démarrée : http://localhost:8080"
echo "  Base de données exposée : ./environments/prod/data/postgres"