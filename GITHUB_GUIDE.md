# Guide GitHub - Versioning & Commandes

## Commandes de base

### Remote & Push
```bash
git remote add origin https://github.com/user/repo.git
git push origin dev
git push origin main
```

## Workflow de développement

### Branches
```bash
# Créer et basculer sur une branche
git checkout -b feature/nouvelle-fonctionnalite
git checkout -b dev

# Basculer entre branches
git checkout main
git checkout dev

# Lister les branches
git branch -a

# Supprimer une branche locale
git branch -d nom-branche

# Push d'une nouvelle branche
git push -u origin nom-branche
```

### Commit efficace
```bash
# Vérifier les changements
git status
git diff

# Ajouter des fichiers
git add fichier.js
git add .  # Tous les fichiers

# Commit avec message descriptif
git commit -m "feat: ajouter authentification utilisateur"
git commit -m "fix: corriger bug validation formulaire"
git commit -m "docs: mettre à jour README"

# Push des commits
git push origin dev
```

## Messages de commit (Conventional Commits)

### Format
```
type(scope): description

feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage
refactor: refactoring
test: tests
chore: maintenance
```

### Exemples
```bash
git commit -m "feat(auth): ajouter login avec Google"
git commit -m "fix(api): corriger timeout requêtes"
git commit -m "docs: ajouter guide installation"
git commit -m "refactor(components): optimiser rendu"
```

## Tags & Versions

### Créer un tag
```bash
# Tag annoté (recommandé)
git tag -a v1.0.0 -m "Version 1.0.0 - Release initiale"

# Push des tags
git push origin v1.0.0
git push origin --tags  # Tous les tags

# Lister les tags
git tag -l
git tag -l "v1.*"  # Tags commençant par v1
```

### Gestion des versions (Semantic Versioning)
```
MAJOR.MINOR.PATCH
1.0.0

MAJOR: changements incompatibles
MINOR: nouvelles fonctionnalités compatibles
PATCH: corrections de bugs
```

### Exemples de versions
```bash
git tag -a v1.0.0 -m "Release initiale"
git tag -a v1.1.0 -m "Ajout fonctionnalité X"
git tag -a v1.1.1 -m "Fix bug critique"
git tag -a v2.0.0 -m "Refactoring majeur"

# Push après chaque tag
git push origin v1.0.0
```

## Workflow complet

### Développement quotidien
```bash
# 1. Récupérer les dernières modifications
git pull origin dev

# 2. Créer une branche pour la feature
git checkout -b feature/ma-feature

# 3. Développer et commiter
git add .
git commit -m "feat: implémenter ma feature"
git push origin feature/ma-feature

# 4. Basculer sur dev et merger
git checkout dev
git merge feature/ma-feature
git push origin dev

# 5. Supprimer la branche feature
git branch -d feature/ma-feature
```

### Release
```bash
# 1. Basculer sur main depuis dev
git checkout main
git merge dev
git push origin main

# 2. Créer le tag
git tag -a v1.2.0 -m "Release v1.2.0"

# 3. Push du tag
git push origin v1.2.0
```

## Commandes utiles

### Historique
```bash
git log --oneline
git log --graph --oneline --all
git show commit-hash
```

### Annuler des changements
```bash
git checkout -- fichier.js  # Annuler modifications
git reset HEAD fichier.js   # Unstage
git reset --hard HEAD~1     # Annuler dernier commit
```

### Stash
```bash
git stash                    # Sauvegarder temporairement
git stash pop               # Restaurer
git stash list              # Lister les stash
```

### Merge & Rebase
```bash
git merge branche           # Merge simple
git rebase branche          # Rebase (historique linéaire)
```

## Bonnes pratiques

- **Commits fréquents** : petits commits descriptifs
- **Branches courtes** : une feature = une branche
- **Messages clairs** : utiliser conventional commits
- **Tests avant commit** : vérifier que tout fonctionne
- **Pull Requests** : toujours passer par PR pour main
- **Tags réguliers** : marquer les releases importantes
- **README à jour** : documenter les changements majeurs
