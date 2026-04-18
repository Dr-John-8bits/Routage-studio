# Routage Studio - Audit et roadmap

## Position actuelle

Routage Studio est deja un MVP solide:

- schema de routage exploitable en local
- inventaire d'appareils avec bibliotheque
- tableau visuel et vue graphe
- diagnostics de patch
- export/import JSON du schema et de la bibliotheque

Le projet n'a pas besoin d'etre reecrit. En revanche, il a encore besoin d'une passe nette de stabilisation produit, d'ergonomie et de qualite avant une publication plus large.

## Audit prioritaire

### P1 - La vue Graphe ne se rafraichit pas completement apres certains changements visuels

Le cache structurel ne prend pas encore en compte tous les attributs utilises par la vue graphe. Aujourd'hui, la couleur de l'appareil est consommee dans le bundle du graphe, mais n'entre pas dans la signature de cache. Resultat possible: changer une couleur peut laisser une icone ou un noeud du graphe visuellement stale jusqu'a une autre modification plus structurelle.

References:

- [app.js](app.js:2856)
- [app.js](app.js:3216)

### P2 - Les noeuds du graphe risquent de deborder avec des noms ou sous-titres longs

La mise en page du graphe repose sur une largeur fixe de noeud, tandis que les textes sont rendus bruts sans troncature ni clipping. Des noms d'appareils plus longs ou des sous-titres riches peuvent sortir du cadre et nuire a la lisibilite.

References:

- [app.js](app.js:3314)
- [app.js](app.js:2346)

### P2 - Le dark mode demande n'est pas encore implemente

Le theme actuel reste essentiellement en mode clair. Il n'y a pas encore de variante `prefers-color-scheme: dark`, alors que c'est un besoin deja exprime pour l'application.

Reference:

- [styles.css](styles.css:1)

### P3 - La detection de doublons dans la bibliotheque n'est pas coherente entre sauvegarde manuelle et import

La sauvegarde manuelle compare les champs a l'identique, alors que la fusion a l'import normalise les chaines. Cela peut creer des doublons acceptes localement puis fusionnes d'une autre facon lors d'un import ulterieur.

References:

- [app.js](app.js:1904)
- [app.js](app.js:3145)

## Risques transverses

- le projet repose encore sur un seul gros fichier [app.js](app.js), ce qui ralentit la maintenance
- il n'y a pas encore de tests automatises dans le depot
- la recette navigateur reste indispensable pour valider les interactions de cablage, le graphe et l'impression

## Roadmap recommande

### Phase 1 - Stabilisation produit

Objectif: fiabiliser le comportement visible et fermer les ecarts les plus sensibles.

- corriger le cache de la vue graphe pour inclure tous les attributs visuels utiles
- gerer proprement la troncature ou le wrapping des noms dans le graphe
- faire une vraie recette navigateur sur creation, cablage, diagnostic, undo/redo, import/export et bibliotheque
- clarifier encore les messages et confirmations des actions de reinitialisation
- verifier l'impression et les PDF sur des schemas plus charges

### Phase 2 - Confort d'utilisation

Objectif: rendre l'app plus rapide a utiliser au quotidien.

- implementer le dark mode automatique selon le systeme
- affiner l'identite visuelle dans l'esprit TR-808 sans perdre en contraste
- ajouter recherche et filtres dans l'inventaire et la bibliotheque
- mieux distinguer les diagnostics bloquants des simples alertes de confort
- ajouter des actions rapides plus visibles pour supprimer une liaison ou un port

### Phase 3 - Robustesse technique

Objectif: reduire le risque de regression et preparer l'evolution du projet.

- decouper [app.js](app.js) en modules fonctionnels plus petits
- introduire des tests automatises pour les regles de compatibilite et les diagnostics
- ajouter au minimum un petit scenario de test navigateur pour les interactions critiques
- formaliser davantage le format JSON du schema et de la bibliotheque

### Phase 4 - Valeur produit

Objectif: rendre Routage Studio plus utile pour de vrais setups complexes.

- proposer des gabarits de setup: studio, live, modulaire, hybride
- enrichir la bibliotheque avec categories, tags et presets
- ajouter un export plus propre pour impression, partage et documentation technique
- envisager a terme plusieurs pages ou vues de routage dans un meme projet

## Prochaine etape recommandee

Le meilleur prochain chantier est:

1. corriger les deux points de stabilite de la vue graphe
2. implementer le dark mode systeme
3. poser une base de tests automatises minimale

Cela donnerait un vrai saut de qualite avant les finitions plus cosmiques.
