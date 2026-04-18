# Routage Studio - Documentation

## Presentation

Routage Studio sert a documenter un patch de studio ou de live setup en reliant visuellement des appareils par leurs entrees et sorties audio, MIDI, USB, CV, gate/trig et clock.

L'objectif est double:

- construire un schema lisible a la souris
- detecter rapidement les incoherences ou oublis de cablage

## Organisation de l'interface

L'application s'organise autour de trois zones principales:

- inventaire et bibliotheque a gauche
- espace de travail au centre avec les vues `Tableau` et `Graphe`
- inspecteur, aide contextuelle et analyse du patch a droite

Les sections peuvent etre repliees pour accelerer la navigation.

## Demarrage rapide

1. Ouvrir `index.html` dans un navigateur.
2. Saisir le nom du projet dans `Routage Studio`.
3. Creer un premier appareil dans l'inventaire.
4. Lui ajouter les ports necessaires.
5. L'envoyer sur le tableau visuel.
6. Refaire l'operation pour les autres appareils.
7. Creer les liaisons entre sorties et entrees compatibles.
8. Verifier le panneau `Analyse du patch`.
9. Exporter le resultat en `JSON`.

## Creer et gerer des appareils

Chaque appareil peut contenir:

- un nom
- un type d'appareil
- une couleur
- des informations de marque, de famille ou de notes
- un ensemble libre de ports

Depuis l'inventaire, vous pouvez:

- creer un nouvel appareil
- le selectionner
- le dupliquer
- le supprimer
- le placer dans le tableau

Le type d'appareil sert a deux choses:

- proposer une typologie adaptee aux instruments electroniques et au studio
- afficher une icone de reperage dans l'inventaire, le tableau visuel et la vue graphe

## Utiliser la bibliotheque d'appareils

La bibliotheque sert a conserver des appareils reutilisables entre plusieurs schemas sur le meme navigateur.

Usage typique:

1. Creer un appareil une premiere fois.
2. L'enregistrer dans la bibliotheque.
3. Le recuperer plus tard pour l'ajouter a un nouveau schema.
4. Sauvegarder la bibliotheque au format JSON.
5. Recharger cette bibliotheque sur le meme poste ou un autre.

Important:

- la bibliotheque est locale au navigateur courant
- des boutons `Sauvegarder` et `Charger` permettent maintenant d'exporter ou d'importer la bibliotheque en JSON
- l'import de bibliotheque fusionne avec la bibliotheque locale existante et remplace les doublons evidents

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

Vous pouvez renommer chaque port apres creation. Pour les ports MIDI, le canal peut etre defini afin d'ameliorer la lecture du patch et la detection des incoherences.

## Faire une liaison

Le flux prevu est volontairement simple:

1. Cliquer une sortie sur un appareil.
2. Observer les entrees compatibles mises en surbrillance.
3. Cliquer l'entree voulue pour finaliser la liaison.

Regles appliquees:

- `Audio` se relie uniquement a `Audio`
- `MIDI` se relie uniquement a `MIDI`
- `CV` se relie uniquement a `CV`
- `Gate / Trig` se relie uniquement a `Gate / Trig`
- `Clock` se relie uniquement a `Clock`
- `USB` se relie uniquement a `USB`

Les liaisons incompatibles sont refusees. Par exemple, `MIDI Out` vers `Audio In` n'est pas autorise.

## Surbrillance des ports compatibles

Quand une sortie est selectionnee pour creer une liaison:

- les entrees eligibles sont mises en evidence
- les ports incompatibles sont attenues
- cela aide a comprendre rapidement ce qui peut etre relie sans erreur

## Modes d'affichage des appareils

Dans le `Tableau visuel`, chaque appareil peut etre:

- en mode normal, avec ses informations detaillees
- en mode reduit, pour gagner de la place tout en conservant le nom et les ports relies

Ce mode est utile quand le schema devient dense.

## Analyse du patch

Le panneau `Analyse du patch` sert de controle qualite du schema. Il remonte notamment:

- les liaisons incompatibles ou incompletes
- les conflits de plusieurs sources sur une meme entree
- les canaux MIDI incompatibles
- les appareils isoles
- les ports inutilises
- les collisions de noms
- les doublons USB

Les alertes sont cliquables pour retrouver rapidement l'element concerne dans l'interface.

## Vue Tableau et vue Graphe

### Tableau

Le `Tableau` represente votre patch comme un espace de travail physique:

- on y place les appareils
- on y deplace les cartes a la souris
- on y voit les liaisons comme des cables

### Graphe

La vue `Graphe` represente plutot la logique du patch:

- les appareils deviennent des noeuds
- les liaisons deviennent des relations
- la selection met en valeur un sous-ensemble du reseau

Cette vue est pratique pour verifier rapidement les chaines de dependance et la structure globale du patch.

## Annuler, retablir et reinitialiser

L'application propose:

- `Annuler`
- `Retablir`
- `Reinitialiser le tableau`
- `Reinitialiser l'inventaire`

Raccourcis disponibles:

- `Cmd/Ctrl + Z` pour annuler
- `Cmd/Ctrl + Shift + Z` pour retablir

`Reinitialiser le tableau` vide l'espace de mise en page du schema courant.

`Reinitialiser l'inventaire` efface les appareils du schema courant. Cette action est plus large et doit etre utilisee avec prudence.

## Sauvegarder, charger, partager, imprimer

Plusieurs modes de sortie existent:

- sauvegarde automatique du schema dans le navigateur
- export `JSON`
- import `JSON`
- impression papier
- export PDF via le navigateur
- partage natif quand le navigateur le permet

Le JSON exporte contient notamment:

- les metadonnees du schema
- les appareils
- les ports
- les positions dans le tableau
- les liaisons

## Responsive design

L'interface est pensee pour rester utilisable sur desktop et sur ecrans plus compacts. Sur petit ecran, le repli des sections devient particulierement utile.

## Bonnes pratiques

- nommer clairement les appareils des leur creation
- definir les canaux MIDI quand ils ont une importance reelle
- sauvegarder regulierement des versions JSON datees
- verifier `Analyse du patch` avant impression ou partage
- utiliser la vue `Graphe` quand le tableau devient trop dense

## Limites actuelles

- la sauvegarde locale et la bibliotheque sont liees au navigateur courant
- l'application ne synchronise pas encore automatiquement les donnees entre plusieurs machines
- l'export de bibliotheque d'appareils peut encore etre ameliore

## Ou aller ensuite

- presentation du projet: [README.md](README.md)
- etat d'avancement et roadmap: [PROJECT_STATUS.md](PROJECT_STATUS.md)
- exemple de schema: [examples/studio-compact.json](examples/studio-compact.json)
