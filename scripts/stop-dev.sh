#!/usr/bin/env bash
# Arrête l'environnement de DÉVELOPPEMENT.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "▶ Arrêt de l'environnement de DEV (vide-grenier-dev)..."
docker compose -p vide-grenier-dev -f docker-compose.dev.yml down

echo "✔ Dev arrêté."