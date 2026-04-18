# Routage Studio - Suivi projet

## Objectif

Construire une webapp open source, simple a publier sur GitHub, permettant de:

- creer des appareils personnalises
- definir leurs entrees et sorties `Audio`, `MIDI`, `Gate / Trig`, `CV`, `Clock`, `USB`
- documenter les canaux MIDI
- relier visuellement les machines entre elles
- sauvegarder, charger, partager et imprimer des schemas
- reutiliser des appareils a travers une bibliotheque locale

## Etat actuel

Le projet est aujourd'hui un MVP avance et deja exploitable:

- application statique sans backend
- sauvegarde locale automatique
- import/export JSON
- routage a la souris entre ports compatibles
- diagnostic structurel du patch
- vue physique et vue logique

Le socle technique actuel reste pertinent. Il n'y a pas de raison de reecrire le projet dans une autre technologie a ce stade.

## Fichiers principaux

- [index.html](index.html)
- [styles.css](styles.css)
- [app.js](app.js)
- [README.md](README.md)
- [DOCUMENTATION.md](DOCUMENTATION.md)
- [PROJECT_STATUS.md](PROJECT_STATUS.md)
- [ROADMAP.md](ROADMAP.md)
- [examples/studio-compact.json](examples/studio-compact.json)

## Ce qui est en place

### Produit

- titre de projet et description du schema
- interface responsive avec panneau gauche, zone centrale et panneau droit
- sections repliables pour accelerer la navigation
- aide contextuelle integree

### Appareils et bibliotheque

- creation, duplication, suppression et edition d'appareils
- typologie d'appareils avec icones de reperage
- inventaire des appareils du schema courant
- bibliotheque locale d'appareils reutilisables
- export/import JSON de la bibliotheque
- placement et recentrage des appareils dans le tableau

### Ports et routage

- support des types `Audio`, `MIDI`, `Gate / Trig`, `CV`, `Clock`, `USB`
- differenciation visuelle entree / sortie par nuance claire / foncee
- canaux MIDI configurables
- liaisons a la souris entre ports compatibles uniquement
- mise en surbrillance des destinations eligibles
- appareils reductibles ou developpes dans le tableau

### Diagnostics et lisibilite

- panneau `Analyse du patch`
- detection des liaisons incompatibles, incomplètes ou incoherentes
- detection des conflits de sources sur une meme entree
- detection des canaux MIDI incompatibles
- detection des appareils isoles, ports inutilises et doublons USB
- vue `Graphe` pour lire la logique du schema
- mise en avant des chemins lies a la selection

### Persistance et sorties

- sauvegarde automatique via `localStorage`
- export/import du schema en `JSON`
- export/import de la bibliotheque en `JSON`
- impression papier / PDF
- partage via les API navigateur disponibles
- exemple de schema fourni

### Ergonomie

- `Annuler` / `Retablir`
- raccourcis `Cmd/Ctrl + Z` et `Cmd/Ctrl + Shift + Z`
- `Reinitialiser le tableau`
- `Reinitialiser l'inventaire`

## Ameliorations majeures deja ajoutees

Les dernieres iterations ont surtout renforce la robustesse et la lecture du patch:

- correction de la geometrie des cables dans la zone scrollable
- conservation des liaisons importees invalides afin qu'elles apparaissent dans les diagnostics
- ajout d'une vraie vue `Graphe`
- ajout d'un cache simple pour limiter certains recalculs de diagnostic et de rendu logique
- blocage des doublons USB inverses
- clarification du nom produit `Routage Studio`
- documentation initiale du projet

## Ce qu'il reste a valider

### Recette navigateur

- verifier visuellement les liaisons sur plusieurs tailles de fenetre
- tester le mode reduit / agrandi sur des schemas charges
- confirmer que les surbrillances de ports restent evidentes sur des patches denses
- tester l'impression sur un schema simple et un schema complexe
- tester le partage sur navigateurs compatibles

### Validation fonctionnelle

- revalider `Annuler / Retablir` sur les actions critiques
- verifier les resets sur des schemas volumineux
- tester les imports JSON volontairement incomplets ou errones
- verifier les alertes MIDI sur differents cas de canaux
- tester la bibliotheque sur une session longue avec plusieurs appareils

## Roadmap

La roadmap detaillee et l'audit priorise sont maintenant dans [ROADMAP.md](ROADMAP.md).

Resume rapide:

### Priorite 1

- faire une recette UX complete dans le navigateur
- corriger les points de stabilite de la vue graphe
- implementer le dark mode systeme
- lisser les derniers details visuels et d'espacement
- durcir encore les tests manuels autour des liaisons et des diagnostics
- ameliorer les messages d'aide sur les actions les moins evidentes

### Priorite 2

- ajouter recherche et filtrage dans l'inventaire et la bibliotheque
- enrichir les diagnostics avec davantage de conseils de correction
- ameliorer la mise en page d'impression

### Priorite 3

- ajouter des gabarits de studio ou de live setup
- proposer des categories ou tags d'appareils
- permettre la duplication rapide de groupes de ports
- preparer une publication GitHub Pages prete a l'emploi

### Priorite 4

- ajouter des tests automatises navigateur pour limiter les regressions
- etudier un mode multi-projets plus structure
- envisager a terme un export/import plus riche des bibliotheques et presets

## Points de vigilance

- la sauvegarde locale et la bibliotheque dependent du navigateur et du poste utilises
- une vraie campagne de test visuelle reste necessaire apres les gros changements UX
- l'application est volontairement legere et sans backend, ce qui simplifie le deploiement mais limite la synchronisation native

## Prochaine etape recommandee

Faire une passe de test reel dans le navigateur avec plusieurs cas concrets de patch, puis ajuster les derniers details d'ergonomie avant publication sur GitHub.
