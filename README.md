# Vide Grenier

Projet scolaire (CESI — Bloc 5, Projet Expérientiel Collaboratif) : un script
web qui requête une base de données PostgreSQL et affiche le contenu d'une table
`Annonce`. Le tout est conteneurisé avec Docker, avec **deux environnements qui
coexistent sur la même machine** : un environnement de développement et un
environnement de production.

## Architecture

```
┌─────────────────────────────┐   ┌──────────────────────────────────────┐
│  DEV  (2 conteneurs)        │   │  PROD  (3 conteneurs)                │
│                             │   │                                      │
│  web  :3000  (Next.js)      │   │  nginx :8080  (reverse proxy)        │
│  db   :5433  (PostgreSQL)   │   │  web   :3000  (Next.js, image)       │
│                             │   │  db    :5432  (PostgreSQL, interne)  │
└─────────────────────────────┘   └──────────────────────────────────────┘
```

- **Dev** : le code web **et** les fichiers de la base sont exposés (bind mounts
  visibles/éditables depuis l'hôte). Hot-reload Next.js activé.
- **Prod** : seuls les fichiers de la base sont exposés (bind mount dans un
  répertoire distinct). Le code web est **intégré dans l'image Docker** (build
  multi-stage), pas de bind mount du code.

## Stack

- **Next.js** (App Router, TypeScript) — `output: 'standalone'`
- **Prisma** (ORM) + **PostgreSQL**
- **Docker / Docker Compose**
- **Nginx** (reverse proxy, prod uniquement)

## Modèle de données

Une seule table `Annonce` :

| Champ        | Type     |
| ------------ | -------- |
| `id`         | Int (PK) |
| `titre`      | String   |
| `description`| String   |
| `prix`       | Float    |
| `categorie`  | String   |
| `imageUrl`   | String   |
| `createdAt`  | DateTime |

## Prérequis

- Docker Desktop
- `gh` CLI authentifié (pour les commandes GitHub)
- Node.js 20+ (optionnel, pour le dev hors Docker)

## Lancer l'environnement de développement

```bash
./scripts/start-dev.sh
```

- Web : http://localhost:3000
- Base de données exposée : `./environments/dev/data/postgres`
- Arrêt : `./scripts/stop-dev.sh`

## Lancer l'environnement de production

```bash
./scripts/start-prod.sh
```

> Ce script se place sur `main` à jour (`git checkout main && git pull`) puis
> rebuild l'image de prod.

- Web : http://localhost:8080 (via Nginx)
- Base de données exposée : `./environments/prod/data/postgres`
- Arrêt : `./scripts/stop-prod.sh`

## Fichiers exposés de la base de données

| Environnement | Répertoire hôte (bind mount) |
| ------------- | ---------------------------- |
| Dev           | `./environments/dev/data/postgres` |
| Prod          | `./environments/prod/data/postgres` |

Les deux répertoires sont **distincts** : les données de dev et de prod ne se
mélangent jamais.

## Initialiser la base (premier lancement)

Les conteneurs PostgreSQL se créent automatiquement au premier démarrage.

- **Prod** : l'entrypoint du conteneur `web` applique automatiquement le schéma
  (`prisma db push`) et insère les données d'exemple si la table est vide. Rien
  à faire.
- **Dev** : le schéma et le seed se lancent manuellement dans le conteneur web :

```bash
docker exec -it vide-grenier-dev-web sh -c "npx prisma db push && npm run db:seed"
```

## GitFlow

- Branches : `main`, `dev`, `feature/*`
- La production suit `main` ; le développement se fait sur `dev` via des
  branches `feature/*` mergées par merge request.
- Voir `docs/demo-soutenance.md` pour la checklist de soutenance complète.

## Structure du projet

```
.
├── docker-compose.dev.yml      # Environnement de dev (2 conteneurs)
├── docker-compose.prod.yml     # Environnement de prod (3 conteneurs)
├── Dockerfile.dev              # Image de dev (next dev, hot-reload)
├── Dockerfile.prod             # Image de prod (multi-stage, standalone)
├── docker-entrypoint.prod.sh   # Entrypoint prod (db push + seed + serveur)
├── nginx/
│   └── nginx.conf              # Reverse proxy de prod
├── prisma/
│   ├── schema.prisma           # Modèle Annonce
│   ├── seed.ts                 # 6 annonces d'exemple (dev, via tsx)
│   └── seed-node.js            # Seed prod (Node.js pur, exécuté par l'entrypoint)
├── scripts/
│   ├── start-dev.sh
│   ├── stop-dev.sh
│   ├── start-prod.sh
│   └── stop-prod.sh
├── environments/
│   ├── dev/.env                # Variables de dev
│   └── prod/.env               # Variables de prod
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Page d'accueil (liste des annonces)
│   │   └── page.module.css
│   └── lib/
│       └── prisma.ts           # Client Prisma (singleton)
└── docs/
    └── demo-soutenance.md      # Checklist de soutenance
```