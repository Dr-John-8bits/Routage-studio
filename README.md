# Routage Studio

Outil open source pour cartographier les liaisons audio, MIDI, USB, CV, gate, trig et clock de votre setup musical.

L'application fonctionne sans backend ni compilation. Elle est pensée pour être facile à publier sur GitHub Pages ou sur n'importe quel hébergement statique.

## Points forts

- création d'appareils personnalisés avec nom, couleur, notes et ports adaptés à votre setup
- tags libres et filtres rapides pour retrouver facilement un instrument ou un preset de câblage
- typologie d'appareils avec icônes de repérage dans l'inventaire, le tableau et le graphe
- bibliothèque locale d'appareils réutilisables avec export/import en JSON
- gabarits intégrés pour démarrer vite en mode live, studio hybride ou lab modulaire
- routage à la souris entre ports compatibles avec mise en surbrillance des destinations éligibles
- double visualisation: `Tableau` physique et `Graphe` logique
- analyse du patch avec erreurs, avertissements et alertes MIDI
- sauvegarde locale automatique, export/import JSON, partage, impression papier et PDF
- dark mode automatique selon le système avec palette inspirée des machines Roland TR-808
- aide contextuelle intégrée dans l'interface

## Logique du produit

- l'`inventaire` contient les appareils du schéma courant
- le `tableau` central contient le patch en cours de construction
- la `bibliothèque` conserve des machines réutilisables entre plusieurs schémas

`Réinitialiser le tableau` vide uniquement le plateau central et supprime les liaisons du patch en cours. Les appareils restent dans l'inventaire pour pouvoir être réajoutés sans tout recréer.

`Réinitialiser l'inventaire` supprime en revanche les appareils du schéma courant, leurs ports et leurs liaisons.

## Fonctions principales

- ports disponibles: `Audio In`, `Audio Out`, `MIDI In`, `MIDI Out`, `MIDI Thru`, `Gate / Trig In`, `Gate / Trig Out`, `CV In`, `CV Out`, `Clock In`, `Clock Out`, `USB`
- types d'appareils proposés: `Synthé`, `Boîte à rythme`, `Groovebox`, `Sampler`, `Clavier / workstation`, `Modulaire / Eurorack`, `Séquenceur`, `Contrôleur MIDI`, `Table de mixage`, `Interface audio`, `Effets / processeur`, `Pedalboard / pédales`, `Guitare / basse`, `Micro`, `Enceinte / monitoring`, `Ordinateur / DAW`, `Enregistreur`
- canal MIDI configurable sur les ports et pris en compte dans l'analyse des liaisons
- couleurs distinctes par famille d'I/O avec nuance différente pour entrée et sortie
- tags d'appareils pour classer les instruments par usage ou rôle
- recherche texte et filtre de type dans l'inventaire et la bibliothèque
- appareils réductibles ou développés dans le tableau visuel
- boutons `Annuler`, `Rétablir`, `Réinitialiser le tableau`, `Réinitialiser l'inventaire`
- sections repliables pour accélérer la navigation dans l'interface

## Bibliothèque

- l'ajout manuel d'un appareil à la bibliothèque demande confirmation en cas de doublon évident
- l'import d'une bibliothèque enrichit la bibliothèque locale existante au lieu de l'écraser
- les doublons détectés à l'import sont signalés et mis à jour proprement
- l'export de bibliothèque ne contient pas le patch courant, uniquement les machines réutilisables

## Documentation

- [Guide d'utilisation](DOCUMENTATION.md)
- [Format JSON](SCHEMA_FORMAT.md)
- [Roadmap et audit](ROADMAP.md)
- [Suivi projet et état d'avancement](PROJECT_STATUS.md)
- [Exemple de schéma](examples/studio-compact.json)
- [Licence MIT](LICENSE)

## Utilisation rapide

1. Ouvrir `index.html` dans un navigateur moderne.
2. Donner un titre et, si besoin, une description au schéma.
3. Charger un gabarit si vous voulez partir d'un setup déjà structuré.
4. Créer vos appareils dans l'inventaire ou les récupérer depuis la bibliothèque locale.
5. Ajouter au tableau les machines utiles pour le patch en cours.
6. Cliquer un port de sortie, puis un port d'entrée compatible mis en surbrillance pour créer la liaison.
7. Consulter `Analyse du patch` pour vérifier les erreurs, conflits et incohérences.
8. Sauvegarder en JSON pour conserver des versions portables du schéma.

## Vues disponibles

### Tableau

Vue de travail principale pour disposer les appareils, déplacer les cartes et réaliser les liaisons visuellement.

### Graphe

Vue logique du schéma pour lire plus rapidement les relations entre appareils. La sélection d'un appareil ou d'une liaison met en avant les chemins liés et atténue le reste.

## Sauvegarde et portabilité

- sauvegarde automatique du schéma courant dans le navigateur via `localStorage`
- export/import du schéma complet en `JSON`
- export/import de la bibliothèque d'instruments en `JSON`
- format JSON documenté dans [SCHEMA_FORMAT.md](SCHEMA_FORMAT.md)
- bibliothèque locale d'appareils conservée dans le navigateur courant
- impression papier ou PDF depuis la boîte d'impression du navigateur
- partage via l'API Web Share lorsque le navigateur la supporte, avec repli sur un résumé ou le JSON

## Structure du projet

- `index.html`: structure de l'application
- `styles.css`: interface, responsive design, impression et thème visuel
- `app.js`: logique métier, rendu, routage, diagnostics et persistance
- `examples/studio-compact.json`: exemple de schéma chargeable
- `DOCUMENTATION.md`: mode d'emploi détaillé
- `SCHEMA_FORMAT.md`: format JSON du schéma et de la bibliothèque
- `PROJECT_STATUS.md`: état du projet et historique récent
- `ROADMAP.md`: audit priorisé et feuille de route

## Choix techniques

- application statique en `HTML`, `CSS` et `JavaScript`
- aucune dépendance de build obligatoire
- hébergement simple sur GitHub Pages ou équivalent
- stockage local privilégié pour garder le projet léger et autonome

## Lancer l'application

Le plus simple est d'ouvrir `index.html` directement dans le navigateur.

Pour un usage plus proche d'un hébergement web, vous pouvez aussi lancer un petit serveur statique local, par exemple:

```bash
python3 -m http.server
```

Puis ouvrir l'URL locale affichée par le terminal.

## État du projet

Le projet est déjà utilisable pour construire un patch complet, vérifier les incohérences, filtrer un inventaire dense, réutiliser une bibliothèque et démarrer depuis des gabarits intégrés. Les prochaines étapes se concentrent surtout sur la recette navigateur, les finitions UX et la robustesse.

Les détails sont dans [PROJECT_STATUS.md](PROJECT_STATUS.md) et [ROADMAP.md](ROADMAP.md).
