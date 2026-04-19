# Routage Studio - Format JSON

## But

Ce document formalise le format JSON exporte par Routage Studio pour:

- les schemas de routage
- la bibliotheque d'instruments

Le format actuel est compatible avec les anciens exports plus simples: les champs absents sont normalises a l'import.

## Version actuelle

- schema: `type = "routage-studio-schema"`, `version = 2`
- bibliotheque: `type = "routage-studio-library"`, `version = 2`

## Schema de routage

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
- `createdAt`: date ISO de creation
- `updatedAt`: date ISO de derniere modification

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
- `type`: type normalise d'appareil
- `manufacturer`: marque, famille ou constructeur
- `model`: modele, role ou sous-intitule
- `tags`: liste libre de mots-clefs pour filtrage et organisation
- `notes`: description libre
- `color`: couleur hexadecimale `#RRGGBB`
- `boardView`: `full` ou `compact`
- `position`: coordonnees du tableau visuel

### Types d'appareil supportes

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

Regles:

- `kind` doit appartenir a la liste de ports supportes
- `midiChannel` vaut `null` pour les ports non MIDI
- `midiChannel` vaut `all` ou `1` a `16` pour les ports MIDI

Ports supportes:

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
  "notes": "Retour facade",
  "midiChannel": "inherit"
}
```

Regles:

- `source` et `target` pointent vers des appareils et ports existants
- `midiChannel` vaut `null` pour les liaisons non MIDI
- `midiChannel` vaut `inherit`, `all` ou `1` a `16` pour les liaisons MIDI

## Bibliotheque d'instruments

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

Chaque element de `items` reprend la structure d'un appareil reutilisable, sans `position`, sans `boardView` et sans `connections`.

Exemple:

```json
{
  "id": "library-123",
  "name": "TR-808",
  "type": "drum-machine",
  "manufacturer": "Roland",
  "model": "Classic drum machine",
  "tags": ["drums", "clock"],
  "notes": "Modele de bibliotheque",
  "color": "#d14124",
  "ports": []
}
```

## Normalisation a l'import

L'application normalise automatiquement:

- les anciens schemas sans champ `type`
- les anciennes versions sans `tags`
- les couleurs invalides
- les types d'appareils inconnus
- les canaux MIDI invalides
- certaines listes de bibliotheque anciennes exportees sans enveloppe racine

## Compatibilite

- les exports plus anciens restent lisibles
- les nouveaux exports ajoutent surtout `type`, `version = 2` et `tags`
- la sauvegarde locale historique reste preservee, meme si ses cles `localStorage` gardent leur ancien nom interne
