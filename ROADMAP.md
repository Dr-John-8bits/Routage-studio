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

### P1 - La vue Graphe ne se rafraichissait pas completement apres certains changements visuels

Le cache structurel ne prenait pas encore en compte tous les attributs utilises par la vue graphe. Ce point a ete corrige en ajoutant les attributs visuels et descriptifs utilises par le graphe a la signature de cache.

References:

- [app.js](app.js:2856)
- [app.js](app.js:3216)

### P2 - Les noeuds du graphe risquaient de deborder avec des noms ou sous-titres longs

La mise en page du graphe reposait sur une largeur fixe de noeud, tandis que les textes etaient rendus bruts sans troncature ni clipping. Une troncature visuelle a ete ajoutee pour eviter les debordements les plus courants, mais une recette visuelle reste souhaitable sur des cas tres longs.

References:

- [app.js](app.js:3314)
- [app.js](app.js:2346)

### P2 - Le dark mode demande n'etait pas encore implemente

Le theme etait essentiellement en mode clair. Ce point est maintenant traite avec un dark mode automatique base sur `prefers-color-scheme`, dans une direction visuelle inspiree de la TR-808.

Reference:

- [styles.css](styles.css:1)

### P3 - La detection de doublons dans la bibliotheque n'etait pas coherente entre sauvegarde manuelle et import

La sauvegarde manuelle comparait les champs a l'identique, alors que la fusion a l'import normalisait les chaines. Ce point a ete harmonise pour utiliser la meme logique d'identite dans les deux cas.

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

## Etat apres implementation

Ce qui est maintenant livre:

- cache graphe corrige pour les attributs visuels utiles
- troncature des libelles longs dans le graphe
- dark mode automatique selon le systeme
- direction visuelle claire/sombre plus proche d'une palette TR-808
- recherche texte et filtre par type dans l'inventaire et la bibliotheque
- tags d'appareils utilisables pour classement et recherche
- gabarits integres `Live compact`, `Studio hybride` et `Lab modulaire`
- format JSON documente dans [SCHEMA_FORMAT.md](SCHEMA_FORMAT.md)
- deduplication de bibliotheque harmonisee entre sauvegarde et import

Ce qui reste prioritaire:

- recette navigateur complete sur desktop et mobile
- verification visuelle fine du dark mode sur tous les ecrans et navigateurs cibles
- verification impression / PDF sur des schemas denses
- premiers tests automatises sur les regles de compatibilite et les diagnostics

## Prochaine etape recommandee

Le meilleur prochain chantier est maintenant:

1. faire une vraie recette visuelle et fonctionnelle dans le navigateur
2. durcir l'impression, le PDF et le partage sur des schemas denses
3. poser une base de tests automatises minimale

Cela donnera une base plus solide avant un decoupage du code et une publication plus large.
