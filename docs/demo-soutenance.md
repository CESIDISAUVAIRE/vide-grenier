# Démo de soutenance — Vide Grenier

Ce document est la **checklist commande par commande** à suivre pendant l'oral
(20 min). Il couvre le démarrage des deux environnements, le développement live
d'une fonctionnalité en GitFlow, la preuve que dev est à jour et prod encore sur
l'ancienne version, puis la mise à jour de la prod.

---

## 0. Prérequis

- Docker Desktop démarré.
- `gh` CLI authentifié (`gh auth status`).
- L'organisation GitHub `cesi-lino-sauvaire` existe et le repo `vide-grenier`
  est cloné en local.

```bash
gh auth status
```

---

## 1. Démarrage simultané des deux environnements

```bash
# Terminal 1 — environnement de DEV (2 conteneurs : web + db)
./scripts/start-dev.sh

# Terminal 2 — environnement de PROD (3 conteneurs : nginx + web + db)
./scripts/start-prod.sh
```

Vérification que les deux répondent sur leurs ports respectifs :

```bash
curl -s -o /dev/null -w "dev  -> %{http_code}\n" http://localhost:3000
curl -s -o /dev/null -w "prod -> %{http_code}\n" http://localhost:8080
```

> Les deux tournent **en même temps** : ports (3000 / 8080), noms de conteneurs
> (`vide-grenier-dev-*` / `vide-grenier-prod-*`) et réseaux
> (`vide-grenier-dev-net` / `vide-grenier-prod-net`) sont distincts.

---

## 2. Développement live d'une fonctionnalité (GitFlow)

La fonctionnalité est **déjà codée à l'avance** sur la branche `feature/live-demo`
(un filtre par catégorie sur la page d'accueil). Pendant l'oral, on la merge dans
`dev` pour montrer le flux.

```bash
# On part de dev à jour
git checkout dev
git pull origin dev

# On merge la feature préparée (pas de conflit attendu)
git merge feature/live-demo
git push origin dev
```

### Preuve que DEV est à jour

Ouvrir `http://localhost:3000` : la page affiche désormais le **filtre par
catégorie** (nouveauté).

### Preuve que PROD est encore sur l'ancienne version

Ouvrir `http://localhost:8080` : la page **n'affiche pas** le filtre. La prod
tourne toujours sur l'ancienne image (le code est intégré dans l'image, il ne
change pas tant qu'on ne rebuild pas).

---

## 3. Mise à jour de la production

### 3.1 Merge request `dev` → `main`

```bash
# Création de la merge request
gh pr create --base main --head dev \
  --title "Release: filtre par catégorie" \
  --body "Merge de dev vers main pour la mise en production."

# Merge de la merge request
gh pr merge --merge --delete-branch=false
```

### 3.2 Relance de la prod pour rebuilder l'image

```bash
./scripts/start-prod.sh
```

> `start-prod.sh` fait `git checkout main && git pull` puis rebuild l'image
> Docker de prod avec le nouveau code.

### Preuve que PROD est à jour

Recharger `http://localhost:8080` : la page affiche désormais le **filtre par
catégorie**. La prod est synchronisée avec `main`.

---

## Récapitulatif visuel de la démo

| Étape | Dev (3000) | Prod (8080) |
| ----- | ---------- | ----------- |
| Démarrage | version initiale | version initiale |
| Merge `feature/live-demo` → `dev` | **filtre visible** ✅ | ancienne version |
| MR `dev` → `main` + `start-prod.sh` | filtre visible | **filtre visible** ✅ |