# Routage Studio

Outil open source pour cartographier les liaisons audio, MIDI, USB, CV, gate, trig et clock de votre setup musical.

L'application fonctionne sans backend ni compilation. Elle est pensee pour etre facile a publier sur GitHub Pages ou sur n'importe quel hebergement statique.

## Points forts

- creation d'appareils personnalises avec nom, couleur, notes et ports adaptes a votre setup
- tags libres et filtres rapides pour retrouver facilement un instrument ou un preset de cablage
- typologie d'appareils avec icones de reperage dans l'inventaire, le tableau et le graphe
- bibliotheque locale d'appareils reutilisables avec export/import en JSON
- gabarits integres pour demarrer vite en mode live, studio hybride ou lab modulaire
- routage a la souris entre ports compatibles avec mise en surbrillance des destinations eligibles
- double visualisation: `Tableau` physique et `Graphe` logique
- analyse du patch avec erreurs, avertissements et alertes MIDI
- sauvegarde locale automatique, export/import JSON, partage, impression papier et PDF
- dark mode automatique selon le systeme avec palette inspiree des machines Roland TR-808
- aide contextuelle integree dans l'interface

## Fonctions principales

- ports disponibles: `Audio In`, `Audio Out`, `MIDI In`, `MIDI Out`, `MIDI Thru`, `Gate / Trig In`, `Gate / Trig Out`, `CV In`, `CV Out`, `Clock In`, `Clock Out`, `USB`
- types d'appareils proposes: `Synthé`, `Boîte à rythme`, `Groovebox`, `Sampler`, `Clavier / workstation`, `Modulaire / Eurorack`, `Séquenceur`, `Contrôleur MIDI`, `Table de mixage`, `Interface audio`, `Effets / processeur`, `Pedalboard / pédales`, `Guitare / basse`, `Micro`, `Enceinte / monitoring`, `Ordinateur / DAW`, `Enregistreur`
- canal MIDI configurable sur les ports et pris en compte dans l'analyse des liaisons
- couleurs distinctes par famille d'I/O avec nuance differente pour entree et sortie
- tags d'appareils pour classer les instruments par usage ou role
- recherche texte et filtre de type dans l'inventaire et la bibliotheque
- appareils reductibles ou developpes dans le tableau visuel
- boutons `Annuler`, `Retablir`, `Reinitialiser le tableau`, `Reinitialiser l'inventaire`
- sections repliables pour accelerer la navigation dans l'interface

## Documentation

- [Guide d'utilisation](DOCUMENTATION.md)
- [Format JSON](SCHEMA_FORMAT.md)
- [Roadmap et audit](ROADMAP.md)
- [Suivi projet et roadmap](PROJECT_STATUS.md)
- [Exemple de schema](examples/studio-compact.json)
- [Licence MIT](LICENSE)

## Utilisation rapide

1. Ouvrir `index.html` dans un navigateur moderne.
2. Donner un titre et, si besoin, une description au schema.
3. Charger un gabarit si vous voulez partir d'un setup deja structure.
4. Creer vos appareils dans l'inventaire ou les recuperer depuis la bibliotheque locale.
5. Utiliser les tags, la recherche et les filtres pour retrouver rapidement un instrument.
6. Placer les appareils sur le `Tableau visuel`.
7. Cliquer un port de sortie, puis un port d'entree compatible mis en surbrillance pour creer la liaison.
8. Consulter `Analyse du patch` pour verifier les erreurs, conflits et incoherences.
9. Sauvegarder en JSON pour conserver des versions portables du patch.

## Vues disponibles

### Tableau

Vue de travail principale pour disposer les appareils, deplacer les cartes et realiser les liaisons visuellement.

### Graphe

Vue logique du schema pour lire plus rapidement les relations entre appareils. La selection d'un appareil ou d'une liaison met en avant les chemins lies et attenue le reste.

## Sauvegarde et portabilite

- sauvegarde automatique du schema courant dans le navigateur via `localStorage`
- export/import du schema complet en `JSON`
- export/import de la bibliotheque d'instruments en `JSON`
- format JSON documente dans [SCHEMA_FORMAT.md](SCHEMA_FORMAT.md)
- bibliotheque locale d'appareils conservee dans le navigateur courant
- impression papier ou PDF depuis la boite d'impression du navigateur
- partage via l'API Web Share lorsque le navigateur la supporte, avec repli sur un resume ou le JSON

## Structure du projet

- `index.html`: structure de l'application
- `styles.css`: interface, responsive design, impression et theme visuel
- `app.js`: logique metier, rendu, routage, diagnostics et persistance
- `examples/studio-compact.json`: exemple de schema chargeable
- `DOCUMENTATION.md`: mode d'emploi
- `SCHEMA_FORMAT.md`: format JSON du schema et de la bibliotheque
- `PROJECT_STATUS.md`: etat du projet et historique recent
- `ROADMAP.md`: audit priorise et feuille de route

## Choix techniques

- application statique en `HTML`, `CSS` et `JavaScript`
- aucune dependance de build obligatoire
- hebergement simple sur GitHub Pages ou equivalent
- stockage local privilegie pour garder le projet leger et autonome

## Lancer l'application

Le plus simple est d'ouvrir `index.html` directement dans le navigateur.

Pour un usage plus proche d'un hebergement web, vous pouvez aussi lancer un petit serveur statique local, par exemple:

```bash
python3 -m http.server
```

Puis ouvrir l'URL locale affichee par le terminal.

## Etat du projet

Le projet est deja utilisable pour construire un patch complet, verifier les incoherences, filtrer un inventaire dense, reutiliser une bibliotheque et demarrer depuis des gabarits integres. Les prochaines etapes se concentrent surtout sur la recette navigateur, les finitions UX et la robustesse.

Les details sont dans [PROJECT_STATUS.md](PROJECT_STATUS.md) et [ROADMAP.md](ROADMAP.md).
