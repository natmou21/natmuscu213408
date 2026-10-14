# Muscu — version 2

Mise à jour de ton application de musculation (PWA). Elle garde tes séances actuelles.

## Nouveautés

- **Mode sombre** : Auto (suit l'iPhone), Clair ou Sombre → onglet Réglages.
- **Nouveau design** inspiré d'Apple / Google : grands titres, barres floutées, cartes arrondies, animations discrètes.
- **Accueil** : ta dernière séance effectuée (durée, volume, muscles travaillés), l'anneau d'objectif de la semaine, tes séances avec un bouton ▶ pour démarrer.
- **Mode séance** : coche tes séries au fur et à mesure, chrono, bandeau « séance en cours » ; à la fin, la séance est enregistrée dans l'historique.
- **Déplacer un exercice** : dans une séance, bouton « Réorganiser » → glisse la poignée ≡ ou utilise les flèches ↑ ↓ (aussi dans le menu ⋯ de l'exercice).
- **Créer ses exercices** : onglet Exercices → « + » : nom, catégorie, matériel, muscles travaillés (touche directement le personnage : 1 touche = principal, 2 = secondaire, 3 = aucun). Modifiable et supprimable.
- **200 exercices** (88 d'avant + 112 nouveaux : poulie, machines guidées, Smith machine, haltères, kettlebell, poids du corps…).
- **Pas de poids** réglable (1 / 2 / 2,5 / 5 kg) et objectif hebdomadaire.

## Mettre à jour SANS perdre tes données

Tes données sont stockées dans l'application, **liées à l'adresse web** où elle est hébergée. Il faut donc mettre les fichiers **à la même adresse**.

1. **Sauvegarde d'abord (recommandé)** : dans l'ancienne version, onglet Séances → ⋯ → « Copier ma sauvegarde », puis colle-la dans une note.
2. **Remplace les fichiers** de l'ancienne version par ceux de ce dossier :
   - **GitHub Pages** : dans le même dépôt, « Add file → Upload files », glisse tous les fichiers (même noms = remplacés), puis « Commit ».
   - **Netlify** : ouvre le site existant → onglet **Deploys** → glisse le dossier dans la zone « Drag and drop » de ce même site. **Ne crée pas un nouveau site** (nouvelle adresse = application vide).
3. Attends 1 à 2 minutes, puis ouvre l'application sur l'iPhone, attends quelques secondes, **ferme-la complètement** (balayer vers le haut) et rouvre-la. La première ouverture peut encore afficher l'ancienne version (c'est normal, cache hors-ligne).
4. Tes séances sont là. Une copie de sécurité de tes données d'avant la mise à jour est conservée automatiquement.

## Sauvegarde / restauration

Réglages → « Copier ma sauvegarde » (texte à garder dans une note). Pour restaurer : « Restaurer une sauvegarde » et colle le texte. Les sauvegardes de la v1 sont acceptées.

## Détails techniques

- Données dans `localStorage`, clé `muscu.v1` (inchangée) ; copie d'avant migration : `muscu.v1.avant-v2`.
- Service worker `muscu-v2` : fonctionne hors connexion.
- Fichiers : `index.html`, `styles.css`, `data.js`, `core.js`, `body.js`, `views.js`, `app.js`, `sw.js`, `manifest.webmanifest`, 3 icônes.
