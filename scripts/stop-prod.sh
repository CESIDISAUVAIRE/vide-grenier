#!/usr/bin/env bash
# Arrête l'environnement de PRODUCTION.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "▶ Arrêt de l'environnement de PROD (vide-grenier-prod)..."
docker compose -p vide-grenier-prod -f docker-compose.prod.yml down

echo "✔ Prod arrêtée."