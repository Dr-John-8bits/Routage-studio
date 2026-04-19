# Routage Studio - Audit et roadmap

## Position actuelle

Routage Studio est déjà un MVP solide:

- schéma de routage exploitable en local
- inventaire d'appareils avec bibliothèque
- tableau visuel et vue graphe
- diagnostics de patch
- export/import JSON du schéma et de la bibliothèque

Le projet n'a pas besoin d'être réécrit. En revanche, il a encore besoin d'une passe nette de stabilisation produit, d'ergonomie et de qualité avant une publication plus large.

## Audit prioritaire

### P1 - `app.js` concentre encore trop de responsabilités

Le fichier [app.js](app.js) mélange état global, persistance, rendu, interactions, diagnostics et format JSON. Le projet reste lisible tant qu'il est manipulé par une seule personne, mais ce point freinera vite la maintenance, les correctifs et l'arrivée de tests fiables.

Conséquence:

- les évolutions transverses demandent des modifications à plusieurs endroits du même fichier
- la lecture du flux métier devient coûteuse
- le risque de régression augmente quand on touche à l'UI ou à la structure du schéma

### P1 - Il manque toujours des tests automatisés sur les flux critiques

Le dépôt ne contient pas encore de socle de tests automatisés pour sécuriser:

- la logique de compatibilité entre ports
- les diagnostics
- l'import/export JSON
- le comportement des resets
- la gestion des doublons de bibliothèque

Aujourd'hui, la robustesse repose surtout sur la recette manuelle.

### P2 - Les textes produit restent dispersés

Les chaînes utilisateur sont réparties entre [index.html](index.html), [app.js](app.js) et plusieurs fichiers Markdown. Cela ralentit les corrections éditoriales, explique certaines incohérences de ton ou d'accents, et rend plus difficile une éventuelle internationalisation.

### P2 - Certaines boucles de rendu recalculent plus que nécessaire

Le rendu de l'inventaire, des diagnostics et des liaisons repose encore sur plusieurs filtrages et recomptages à la volée. Sur de gros patchs, cela risque d'alourdir l'interface plus vite que prévu.

### P3 - La recette navigateur reste indispensable avant publication large

Les interactions riches du tableau, le scroll, les câbles SVG, la vue graphe, l'impression et le responsive demandent encore une vraie campagne de validation sur plusieurs navigateurs et tailles d'écran.

## État après les derniers correctifs

Ce qui est maintenant livré:

- séparation explicite entre inventaire du schéma et présence sur le tableau
- `Réinitialiser le tableau` vide le patch visuel central sans vider l'inventaire
- possibilité de retirer un appareil du tableau sans le supprimer du schéma
- possibilité de réajouter au tableau un appareil conservé dans l'inventaire
- import de bibliothèque non destructif avec enrichissement de l'existant
- signalement plus clair des doublons mis à jour à l'import
- documentation Markdown remise en français correct avec accents

## Roadmap recommandée

### Phase 1 - Stabilisation produit

Objectif: fiabiliser le comportement visible et fermer les écarts les plus sensibles.

- faire une vraie recette navigateur sur création, câblage, diagnostics, undo/redo, reset, import/export et bibliothèque
- ajouter une vérification manuelle dédiée au nouveau flux `inventaire → tableau`
- clarifier encore les messages et confirmations des actions potentiellement destructives
- vérifier l'impression et les PDF sur des schémas plus chargés

### Phase 2 - Confort d'utilisation

Objectif: rendre l'app plus rapide à utiliser au quotidien.

- améliorer les actions rapides depuis l'inventaire
- mieux distinguer visuellement les appareils présents sur le tableau et ceux gardés uniquement dans l'inventaire
- enrichir les diagnostics avec davantage de conseils de correction
- proposer des actions groupées pour remettre plusieurs appareils sur le tableau

### Phase 3 - Robustesse technique

Objectif: réduire le risque de régression et préparer l'évolution du projet.

- découper [app.js](app.js) en modules fonctionnels plus petits
- introduire des tests unitaires pour les règles de compatibilité, les diagnostics et la fusion de bibliothèque
- ajouter au minimum un scénario de test navigateur pour les interactions critiques
- formaliser davantage le format JSON du schéma et de la bibliothèque

### Phase 4 - Valeur produit

Objectif: rendre Routage Studio plus utile pour de vrais setups complexes.

- enrichir la bibliothèque avec catégories, tags et presets
- ajouter un export plus propre pour impression, partage et documentation technique
- envisager à terme plusieurs pages ou vues de routage dans un même projet
- proposer des opérations de lot sur l'inventaire et le tableau

## Prochaine étape recommandée

Le meilleur prochain chantier est maintenant:

1. faire une vraie recette visuelle et fonctionnelle dans le navigateur
2. poser une base minimale de tests automatisés sur les règles métier
3. commencer à sortir la logique de schéma et de bibliothèque de `app.js` pour alléger la maintenance
