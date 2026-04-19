# Routage Studio - Format JSON

## But

Ce document formalise le format JSON exporté par Routage Studio pour:

- les schémas de routage
- la bibliothèque d'instruments

Le format actuel reste compatible avec les anciens exports plus simples: les champs absents sont normalisés à l'import.

## Version actuelle

- schéma: `type = "routage-studio-schema"`, `version = 2`
- bibliothèque: `type = "routage-studio-library"`, `version = 2`

## Schéma de routage

Structure racine:

```json
{
  "type": "routage-studio-schema",
  "version": 2,
  "meta": {
    "title": "Mon setup",
    "description": "Description du patch",
    "createdAt": "2026-04-19T10:00:00.000Z",
    "updatedAt": "2026-04-19T10:05:00.000Z"
  },
  "devices": [],
  "connections": []
}
```

### `meta`

- `title`: titre visible dans l'application, l'onglet navigateur et les exports
- `description`: sous-titre descriptif
- `createdAt`: date ISO de création
- `updatedAt`: date ISO de dernière modification

### `devices`

Chaque appareil suit cette forme:

```json
{
  "id": "device-123",
  "name": "Synth principal",
  "type": "synth",
  "manufacturer": "Moog",
  "model": "Lead mono",
  "tags": ["lead", "live"],
  "notes": "Voix principale",
  "color": "#2f6fd0",
  "onBoard": true,
  "boardView": "full",
  "position": {
    "x": 120,
    "y": 180
  },
  "ports": []
}
```

Champs importants:

- `id`: identifiant unique
- `name`: nom de l'appareil
- `type`: type normalisé d'appareil
- `manufacturer`: marque, famille ou constructeur
- `model`: modèle, rôle ou sous-intitulé
- `tags`: liste libre de mots-clés pour filtrage et organisation
- `notes`: description libre
- `color`: couleur hexadécimale `#RRGGBB`
- `onBoard`: `true` si l'appareil est actuellement présent sur le tableau central, `false` s'il reste seulement dans l'inventaire
- `boardView`: `full` ou `compact`
- `position`: coordonnées du tableau visuel

Remarques:

- un appareil peut rester dans l'inventaire avec `onBoard = false`
- `Réinitialiser le tableau` met les appareils hors tableau et supprime les liaisons, sans vider l'inventaire

### Types d'appareil supportés

- `other`
- `synth`
- `drum-machine`
- `groovebox`
- `sampler`
- `keyboard`
- `modular`
- `sequencer`
- `midi-controller`
- `mixer`
- `audio-interface`
- `effects`
- `pedalboard`
- `guitar-bass`
- `microphone`
- `monitor`
- `computer`
- `recorder`

### `ports`

Chaque port suit cette forme:

```json
{
  "id": "port-123",
  "kind": "midi-out",
  "name": "MIDI Out",
  "description": "Sortie principale",
  "midiChannel": "1"
}
```

Règles:

- `kind` doit appartenir à la liste de ports supportés
- `midiChannel` vaut `null` pour les ports non MIDI
- `midiChannel` vaut `all` ou `1` à `16` pour les ports MIDI

Ports supportés:

- `audio-in`
- `audio-out`
- `midi-in`
- `midi-out`
- `midi-thru`
- `gate-in`
- `gate-out`
- `cv-in`
- `cv-out`
- `clock-in`
- `clock-out`
- `usb`

### `connections`

Chaque liaison suit cette forme:

```json
{
  "id": "connection-123",
  "source": {
    "deviceId": "device-a",
    "portId": "port-a"
  },
  "target": {
    "deviceId": "device-b",
    "portId": "port-b"
  },
  "label": "Main L",
  "notes": "Retour façade",
  "midiChannel": "inherit"
}
```

Règles:

- `source` et `target` pointent vers des appareils et ports existants
- `midiChannel` vaut `null` pour les liaisons non MIDI
- `midiChannel` vaut `inherit`, `all` ou `1` à `16` pour les liaisons MIDI

## Bibliothèque d'instruments

Structure racine:

```json
{
  "type": "routage-studio-library",
  "version": 2,
  "exportedAt": "2026-04-19T10:10:00.000Z",
  "app": "Routage Studio",
  "items": []
}
```

Chaque élément de `items` reprend la structure d'un appareil réutilisable, sans `position`, sans `onBoard`, sans `boardView` et sans `connections`.

Exemple:

```json
{
  "id": "library-123",
  "name": "TR-808",
  "type": "drum-machine",
  "manufacturer": "Roland",
  "model": "Classic drum machine",
  "tags": ["drums", "clock"],
  "notes": "Modèle de bibliothèque",
  "color": "#d14124",
  "ports": []
}
```

## Gestion des doublons de bibliothèque

- l'ajout manuel d'un appareil déjà connu demande confirmation avant remplacement
- l'import fusionne avec la bibliothèque locale existante
- les doublons évidents sont détectés sur l'identité de l'appareil et mis à jour proprement

## Normalisation à l'import

L'application normalise automatiquement:

- les anciens schémas sans champ `type`
- les anciennes versions sans `tags`
- les couleurs invalides
- les types d'appareils inconnus
- les canaux MIDI invalides
- l'absence du champ `onBoard`, qui est alors interprétée comme `true`
- certaines listes de bibliothèque anciennes exportées sans enveloppe racine

## Compatibilité

- les exports plus anciens restent lisibles
- les nouveaux exports ajoutent notamment `onBoard` pour distinguer inventaire et tableau
- la sauvegarde locale historique reste préservée, même si ses clés `localStorage` gardent leur ancien nom interne
