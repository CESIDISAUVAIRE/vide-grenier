#!/usr/bin/env bash
# Démarre l'environnement de DÉVELOPPEMENT (2 conteneurs : web + db).
set -euo pipefail

cd "$(dirname "$0")/.."

echo "▶ Démarrage de l'environnement de DEV (vide-grenier-dev)..."
docker compose -p vide-grenier-dev -f docker-compose.dev.yml up -d --build

echo "✔ Dev démarré : http://localhost:3000"
echo "  Base de données exposée : ./environments/dev/data/postgres"