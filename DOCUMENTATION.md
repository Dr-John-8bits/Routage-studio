# Routage Studio - Documentation

## Présentation

Routage Studio sert à documenter un patch de studio ou de live setup en reliant visuellement des appareils par leurs entrées et sorties audio, MIDI, USB, CV, gate/trig et clock.

L'objectif est double:

- construire un schéma lisible à la souris
- détecter rapidement les incohérences ou oublis de câblage

## Organisation de l'interface

L'application s'organise autour de trois zones principales:

- inventaire et bibliothèque à gauche
- espace de travail au centre avec les vues `Tableau` et `Graphe`
- inspecteur, aide contextuelle et analyse du patch à droite

Les sections peuvent être repliées pour accélérer la navigation.

Le thème suit automatiquement le mode clair ou sombre du système.

## Démarrage rapide

1. Ouvrir `index.html` dans un navigateur.
2. Saisir le nom du projet dans `Routage Studio`.
3. Charger un gabarit si vous voulez partir d'un setup déjà préparé.
4. Créer un premier appareil dans l'inventaire.
5. Lui ajouter les ports nécessaires.
6. L'ajouter au tableau visuel.
7. Refaire l'opération pour les autres appareils utiles au patch.
8. Créer les liaisons entre sorties et entrées compatibles.
9. Vérifier le panneau `Analyse du patch`.
10. Exporter le résultat en `JSON`.

## Inventaire, tableau et bibliothèque

### Inventaire

L'inventaire contient les appareils du schéma courant. Il sert à retrouver rapidement une machine, la modifier, l'ajouter ou la retirer du tableau, et la sauvegarder dans la bibliothèque.

Depuis l'inventaire, vous pouvez:

- créer un nouvel appareil
- le sélectionner
- le dupliquer
- le supprimer
- l'ajouter au tableau central
- l'enregistrer dans la bibliothèque

### Tableau

Le `Tableau` représente le patch en cours:

- on y place les appareils utiles au câblage courant
- on y déplace les cartes à la souris
- on y crée les liaisons comme des câbles

Un appareil peut donc exister dans l'inventaire sans être présent sur le tableau.

### Bibliothèque

La bibliothèque sert à conserver des appareils réutilisables entre plusieurs schémas sur le même navigateur.

Usage typique:

1. Créer un appareil une première fois.
2. L'enregistrer dans la bibliothèque.
3. Le réutiliser plus tard dans un autre schéma.
4. Sauvegarder la bibliothèque au format JSON.
5. Recharger cette bibliothèque sur le même poste ou un autre.

Points importants:

- la bibliothèque est locale au navigateur courant
- l'ajout manuel d'un doublon demande confirmation avant remplacement
- l'import de bibliothèque enrichit la bibliothèque existante au lieu de l'écraser
- les doublons détectés à l'import sont signalés et mis à jour proprement

## Utiliser les gabarits

Une section `Gabarits` propose plusieurs points de départ:

- `Live compact`
- `Studio hybride`
- `Lab modulaire`

Chaque gabarit charge un schéma complet d'exemple, modifiable ensuite librement.

## Créer et gérer des appareils

Chaque appareil peut contenir:

- un nom
- un type d'appareil
- une couleur
- des tags libres
- des informations de marque, de famille ou de notes
- un ensemble libre de ports

Le type d'appareil sert à deux choses:

- proposer une typologie adaptée aux instruments électroniques et au studio
- afficher une icône de repérage dans l'inventaire, le tableau visuel et la vue graphe

Les tags servent à classer les instruments par usage, par exemple:

- `lead`
- `master clock`
- `live`
- `studio`
- `voix`
- `drums`

## Rechercher et filtrer

L'inventaire du schéma et la bibliothèque disposent:

- d'un champ de recherche texte
- d'un filtre par type d'appareil

La recherche couvre:

- le nom
- le type
- la marque
- le modèle ou rôle
- les tags
- les notes
- les noms de ports

## Ajouter des ports

Les types de ports disponibles sont:

- `Audio In`
- `Audio Out`
- `MIDI In`
- `MIDI Out`
- `MIDI Thru`
- `Gate / Trig In`
- `Gate / Trig Out`
- `CV In`
- `CV Out`
- `Clock In`
- `Clock Out`
- `USB`

Vous pouvez renommer chaque port après création. Pour les ports MIDI, le canal peut être défini afin d'améliorer la lecture du patch et la détection des incohérences.

## Faire une liaison

Le flux prévu est volontairement simple:

1. Cliquer une sortie sur un appareil du tableau.
2. Observer les entrées compatibles mises en surbrillance.
3. Cliquer l'entrée voulue pour finaliser la liaison.

Règles appliquées:

- `Audio` se relie uniquement à `Audio`
- `MIDI` se relie uniquement à `MIDI`
- `CV` se relie uniquement à `CV`
- `Gate / Trig` se relie uniquement à `Gate / Trig`
- `Clock` se relie uniquement à `Clock`
- `USB` se relie uniquement à `USB`

Les liaisons incompatibles sont refusées. Par exemple, `MIDI Out` vers `Audio In` n'est pas autorisé.

## Surbrillance des ports compatibles

Quand une sortie est sélectionnée pour créer une liaison:

- les entrées éligibles sont mises en évidence
- les ports incompatibles sont atténués
- cela aide à comprendre rapidement ce qui peut être relié sans erreur

## Modes d'affichage des appareils

Dans le `Tableau visuel`, chaque appareil peut être:

- en mode normal, avec ses informations détaillées
- en mode réduit, pour gagner de la place tout en conservant le nom et les ports reliés

Ce mode est utile quand le schéma devient dense.

## Analyse du patch

Le panneau `Analyse du patch` sert de contrôle qualité du schéma. Il remonte notamment:

- les liaisons incompatibles ou incomplètes
- les conflits de plusieurs sources sur une même entrée
- les canaux MIDI incompatibles
- les appareils isolés
- les ports inutilisés
- les collisions de noms
- les doublons USB

Les alertes sont cliquables pour retrouver rapidement l'élément concerné dans l'interface.

## Vue Tableau et vue Graphe

### Tableau

Le `Tableau` représente votre patch comme un espace de travail physique:

- on y place les appareils
- on y déplace les cartes à la souris
- on y voit les liaisons comme des câbles

### Graphe

La vue `Graphe` représente plutôt la logique du patch:

- les appareils deviennent des nœuds
- les liaisons deviennent des relations
- la sélection met en valeur un sous-ensemble du réseau

Cette vue est pratique pour vérifier rapidement les chaînes de dépendance et la structure globale du patch.

## Annuler, rétablir et réinitialiser

L'application propose:

- `Annuler`
- `Rétablir`
- `Réinitialiser le tableau`
- `Réinitialiser l'inventaire`

Raccourcis disponibles:

- `Cmd/Ctrl + Z` pour annuler
- `Cmd/Ctrl + Shift + Z` pour rétablir

`Réinitialiser le tableau` vide le plateau central et supprime les liaisons du patch en cours. Les appareils restent dans l'inventaire et peuvent être réajoutés au tableau ensuite.

`Réinitialiser l'inventaire` efface les appareils du schéma courant. Cette action est plus large et doit être utilisée avec prudence.

## Sauvegarder, charger, partager, imprimer

Plusieurs modes de sortie existent:

- sauvegarde automatique du schéma dans le navigateur
- export `JSON`
- import `JSON`
- impression papier
- export PDF via le navigateur
- partage natif quand le navigateur le permet

Le JSON exporté contient notamment:

- les métadonnées du schéma
- les appareils
- les tags d'appareils
- les ports
- les positions dans le tableau
- les liaisons

Le format est détaillé dans [SCHEMA_FORMAT.md](SCHEMA_FORMAT.md).

## Responsive design

L'interface est pensée pour rester utilisable sur desktop et sur écrans plus compacts. Sur petit écran, le repli des sections devient particulièrement utile.

## Bonnes pratiques

- nommer clairement les appareils dès leur création
- définir les canaux MIDI quand ils ont une importance réelle
- sauvegarder régulièrement des versions JSON datées
- vérifier `Analyse du patch` avant impression ou partage
- utiliser la vue `Graphe` quand le tableau devient trop dense
- enrichir la bibliothèque au fil des machines stabilisées

## Limites actuelles

- la sauvegarde locale et la bibliothèque sont liées au navigateur courant
- l'application ne synchronise pas encore automatiquement les données entre plusieurs machines
- une vraie recette navigateur reste importante après de gros ajustements UX

## Où aller ensuite

- présentation du projet: [README.md](README.md)
- format JSON: [SCHEMA_FORMAT.md](SCHEMA_FORMAT.md)
- état d'avancement et roadmap: [PROJECT_STATUS.md](PROJECT_STATUS.md)
- audit priorisé: [ROADMAP.md](ROADMAP.md)
- exemple de schéma: [examples/studio-compact.json](examples/studio-compact.json)
