# Routage Studio - Suivi projet

## Objectif

Construire une webapp open source, simple à publier sur GitHub, permettant de:

- créer des appareils personnalisés
- définir leurs entrées et sorties `Audio`, `MIDI`, `Gate / Trig`, `CV`, `Clock`, `USB`
- documenter les canaux MIDI
- relier visuellement les machines entre elles
- sauvegarder, charger, partager et imprimer des schémas
- réutiliser des appareils à travers une bibliothèque locale

## État actuel

Le projet est aujourd'hui un MVP avancé et déjà exploitable:

- application statique sans backend
- sauvegarde locale automatique
- import/export JSON
- routage à la souris entre ports compatibles
- diagnostic structurel du patch
- vue physique et vue logique

Le socle technique actuel reste pertinent. Il n'y a pas de raison de réécrire le projet dans une autre technologie à ce stade.

## Fichiers principaux

- [index.html](index.html)
- [styles.css](styles.css)
- [app.js](app.js)
- [README.md](README.md)
- [DOCUMENTATION.md](DOCUMENTATION.md)
- [SCHEMA_FORMAT.md](SCHEMA_FORMAT.md)
- [PROJECT_STATUS.md](PROJECT_STATUS.md)
- [ROADMAP.md](ROADMAP.md)
- [examples/studio-compact.json](examples/studio-compact.json)

## Ce qui est en place

### Produit

- titre de projet et description du schéma
- interface responsive avec panneau gauche, zone centrale et panneau droit
- sections repliables pour accélérer la navigation
- aide contextuelle intégrée

### Appareils, inventaire et bibliothèque

- création, duplication, suppression et édition d'appareils
- typologie d'appareils avec icônes de repérage
- tags d'appareils pour classification et filtres rapides
- inventaire des appareils du schéma courant
- séparation entre présence dans l'inventaire et présence sur le tableau
- filtre d'emplacement dans l'inventaire pour isoler le tableau courant ou les appareils hors plateau
- actions rapides dans l'inventaire pour ajouter, retirer ou cadrer un appareil
- action globale `Tout remettre` pour réinjecter les appareils hors tableau
- bibliothèque locale d'appareils réutilisables
- export/import JSON de la bibliothèque
- import de bibliothèque non destructif avec enrichissement de l'existant
- signalement et mise à jour des doublons évidents
- filtres texte et type dans l'inventaire et la bibliothèque
- gabarits intégrés pour partir d'un setup live, studio hybride ou modulaire

### Ports et routage

- support des types `Audio`, `MIDI`, `Gate / Trig`, `CV`, `Clock`, `USB`
- différenciation visuelle entrée / sortie par nuance claire / foncée
- canaux MIDI configurables
- liaisons à la souris entre ports compatibles uniquement
- mise en surbrillance des destinations éligibles
- appareils réductibles ou développés dans le tableau

### Diagnostics et lisibilité

- panneau `Analyse du patch`
- détection des liaisons incompatibles, incomplètes ou incohérentes
- détection des conflits de sources sur une même entrée
- détection des canaux MIDI incompatibles
- détection des appareils isolés, ports inutilisés et doublons USB
- vue `Graphe` pour lire la logique du schéma
- mise en avant des chemins liés à la sélection

### Persistance et sorties

- sauvegarde automatique via `localStorage`
- export/import du schéma en `JSON`
- export/import de la bibliothèque en `JSON`
- format JSON documenté et versionné
- impression papier / PDF
- partage via les API navigateur disponibles
- exemple de schéma fourni

### Ergonomie

- `Annuler` / `Rétablir`
- raccourcis `Cmd/Ctrl + Z` et `Cmd/Ctrl + Shift + Z`
- `Réinitialiser le tableau`
- `Réinitialiser l'inventaire`
- dark mode automatique selon le système

## Améliorations majeures déjà ajoutées

Les dernières itérations ont surtout renforcé la robustesse et la lecture du patch:

- correction de la géométrie des câbles dans la zone scrollable
- conservation des liaisons importées invalides afin qu'elles apparaissent dans les diagnostics
- ajout d'une vraie vue `Graphe`
- ajout d'un cache simple pour limiter certains recalculs de diagnostic et de rendu logique
- harmonisation des doublons de bibliothèque entre sauvegarde manuelle et import
- clarification du nom produit `Routage Studio`
- documentation du format JSON du schéma et de la bibliothèque
- séparation explicite entre inventaire du schéma et tableau central
- réinitialisation du tableau recentrée sur le patch visuel sans vider l'inventaire

## Ce qu'il reste à valider

### Recette navigateur

- vérifier visuellement les liaisons sur plusieurs tailles de fenêtre
- tester le mode réduit / agrandi sur des schémas chargés
- confirmer que les surbrillances de ports restent évidentes sur des patches denses
- tester l'impression sur un schéma simple et un schéma complexe
- tester le partage sur navigateurs compatibles

### Validation fonctionnelle

- revalider `Annuler / Rétablir` sur les actions critiques
- vérifier les resets sur des schémas volumineux
- tester les imports JSON volontairement incomplets ou erronés
- vérifier les alertes MIDI sur différents cas de canaux
- tester la bibliothèque sur une session longue avec plusieurs appareils

## Roadmap

La roadmap détaillée et l'audit priorisé sont maintenant dans [ROADMAP.md](ROADMAP.md).

Résumé rapide:

### Priorité 1

- faire une recette UX complète dans le navigateur
- lisser les derniers détails visuels et d'espacement
- durcir encore les tests manuels autour des liaisons et des diagnostics
- améliorer les messages d'aide sur les actions les moins évidentes

### Priorité 2

- enrichir les diagnostics avec davantage de conseils de correction
- améliorer la mise en page d'impression

### Priorité 3

- permettre la duplication rapide de groupes de ports
- préparer une publication GitHub Pages prête à l'emploi

### Priorité 4

- ajouter des tests automatisés navigateur pour limiter les régressions
- étudier un mode multi-projets plus structuré
- envisager à terme un export/import plus riche des bibliothèques et presets

## Points de vigilance

- la sauvegarde locale et la bibliothèque dépendent du navigateur et du poste utilisés
- une vraie campagne de test visuelle reste nécessaire après les gros changements UX
- l'application est volontairement légère et sans backend, ce qui simplifie le déploiement mais limite la synchronisation native

## Prochaine étape recommandée

Faire une passe de test réelle dans le navigateur avec plusieurs cas concrets de patch, en particulier sur les nouveaux resets, les filtres, les gabarits, le dark mode et l'impression, puis ajuster les derniers détails d'ergonomie avant publication sur GitHub.
