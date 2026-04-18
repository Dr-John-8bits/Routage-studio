const APP_NAME = "Routage Studio";
const DEFAULT_SCHEMA_DESCRIPTION =
  "Outil open source pour cartographier les liaisons audio, MIDI, USB, CV, gate, trig et clock de votre setup musical.";
const LEGACY_DEFAULT_TITLES = new Set(["Table de routage"]);
const LEGACY_DEFAULT_DESCRIPTIONS = new Set([
  "Table de routage est une webapp open source permettant de créer, visualiser, sauvegarder et charger des schémas de routing audio, MIDI, USB, CV, gate, trig et clock entre des appareils.",
  "Table de routage est une webapp open source permettant de créer, visualiser, sauvegarder et charger des schémas de routing audio, MIDI, USB, CV, gate, trig et clock entre des instruments de musique."
]);
const STORAGE_KEY = "patchbay-studio.schema.v1";
const LIBRARY_STORAGE_KEY = "patchbay-studio.library.v1";
const SCHEMA_VERSION = 1;
const LIBRARY_VERSION = 1;
const DEVICE_ACCENTS = ["#0f766e", "#d97706", "#2f6fd0", "#b45309", "#b93838", "#2a7c5a"];
const DEVICE_TYPE_OPTIONS = [
  {
    value: "other",
    label: "Autre",
    description: "Appareil généraliste ou non classé."
  },
  {
    value: "synth",
    label: "Synthé",
    description: "Synthé mono, poly, desktop ou module."
  },
  {
    value: "drum-machine",
    label: "Boîte à rythme",
    description: "Drum machine, TR ou percussion électronique."
  },
  {
    value: "groovebox",
    label: "Groovebox",
    description: "Machine tout-en-un pour patterns, synthèse et séquence."
  },
  {
    value: "sampler",
    label: "Sampler",
    description: "Lecture, découpe et séquence d'échantillons."
  },
  {
    value: "keyboard",
    label: "Clavier / workstation",
    description: "Clavier maître, workstation ou stage keyboard."
  },
  {
    value: "modular",
    label: "Modulaire / Eurorack",
    description: "Modules CV, gate, trig et clock."
  },
  {
    value: "sequencer",
    label: "Séquenceur",
    description: "Step sequencer, pattern sequencer ou clock brain."
  },
  {
    value: "midi-controller",
    label: "Contrôleur MIDI",
    description: "Pads, faders, encodeurs ou clavier de contrôle."
  },
  {
    value: "mixer",
    label: "Table de mixage",
    description: "Mixeur analogique, numérique ou submixer."
  },
  {
    value: "audio-interface",
    label: "Interface audio",
    description: "Conversion audio, MIDI et liaison ordinateur."
  },
  {
    value: "effects",
    label: "Effets / processeur",
    description: "Rack d'effets, multi-effets ou processeur externe."
  },
  {
    value: "pedalboard",
    label: "Pedalboard / pédales",
    description: "Pédales individuelles ou pedalboard complet."
  },
  {
    value: "guitar-bass",
    label: "Guitare / basse",
    description: "Instrument électrique ou électro-acoustique."
  },
  {
    value: "microphone",
    label: "Micro",
    description: "Micro dynamique, statique, instrument ou voix."
  },
  {
    value: "monitor",
    label: "Enceinte / monitoring",
    description: "Monitoring de studio, wedge ou diffusion."
  },
  {
    value: "computer",
    label: "Ordinateur / DAW",
    description: "Laptop, desktop ou poste logiciel de production."
  },
  {
    value: "recorder",
    label: "Enregistreur",
    description: "Field recorder, multitrack ou capture autonome."
  }
];
const DEVICE_TYPE_LIBRARY = Object.fromEntries(
  DEVICE_TYPE_OPTIONS.map((entry) => [entry.value, entry])
);

const PORT_LIBRARY = {
  "audio-in": {
    label: "Audio In",
    family: "Audio",
    directionLabel: "Entrée",
    group: "audio",
    direction: "input",
    color: "#82b6ff",
    description: "Entrée audio analogique ou numérique."
  },
  "audio-out": {
    label: "Audio Out",
    family: "Audio",
    directionLabel: "Sortie",
    group: "audio",
    direction: "output",
    color: "#1f5fbf",
    description: "Sortie audio vers une autre machine ou une interface."
  },
  "midi-in": {
    label: "MIDI In",
    family: "MIDI",
    directionLabel: "Entrée",
    group: "midi",
    direction: "input",
    color: "#f1af75",
    description: "Réception des messages MIDI sur un canal donné."
  },
  "midi-out": {
    label: "MIDI Out",
    family: "MIDI",
    directionLabel: "Sortie",
    group: "midi",
    direction: "output",
    color: "#bc6318",
    description: "Envoi de notes, CC, horloge ou transport MIDI."
  },
  "midi-thru": {
    label: "MIDI Thru",
    family: "MIDI",
    directionLabel: "Thru",
    group: "midi",
    direction: "thru",
    color: "#d9853a",
    description: "Renvoi du flux MIDI reçu vers un autre appareil."
  },
  "gate-in": {
    label: "Gate / Trig In",
    family: "Gate",
    directionLabel: "Entrée",
    group: "gate",
    direction: "input",
    color: "#ef938e",
    description: "Entrée de gate ou trigger."
  },
  "gate-out": {
    label: "Gate / Trig Out",
    family: "Gate",
    directionLabel: "Sortie",
    group: "gate",
    direction: "output",
    color: "#b53f3c",
    description: "Sortie de gate ou trigger."
  },
  "cv-in": {
    label: "CV In",
    family: "CV",
    directionLabel: "Entrée",
    group: "cv",
    direction: "input",
    color: "#7fcfb0",
    description: "Entrée de tension de contrôle."
  },
  "cv-out": {
    label: "CV Out",
    family: "CV",
    directionLabel: "Sortie",
    group: "cv",
    direction: "output",
    color: "#227652",
    description: "Sortie de tension de contrôle."
  },
  "clock-in": {
    label: "Clock In",
    family: "Clock",
    directionLabel: "Entrée",
    group: "clock",
    direction: "input",
    color: "#e0bb62",
    description: "Entrée d'horloge ou de synchro."
  },
  "clock-out": {
    label: "Clock Out",
    family: "Clock",
    directionLabel: "Sortie",
    group: "clock",
    direction: "output",
    color: "#9d760d",
    description: "Sortie d'horloge ou de synchro."
  },
  usb: {
    label: "USB",
    family: "USB",
    directionLabel: "USB",
    group: "usb",
    direction: "multi",
    color: "#207b85",
    description: "Connexion USB générique ou hôte/périphérique."
  }
};

const PORT_ORDER = Object.keys(PORT_LIBRARY);
const MIDI_CHANNELS = [
  { value: "all", label: "Tous les canaux" },
  ...Array.from({ length: 16 }, (_, index) => ({
    value: String(index + 1),
    label: `Canal ${index + 1}`
  }))
];
const MIDI_CONNECTION_CHANNELS = [
  { value: "inherit", label: "Suivre les ports" },
  ...MIDI_CHANNELS
];

const HELP_CONTENT = {
  overview: {
    title: "Vue générale",
    body:
      "La webapp te permet de cartographier ton studio ou ton setup live. Chaque appareil peut recevoir des ports audio, MIDI, CV, gate, clock ou USB, puis être relié visuellement aux autres machines.",
    tips: [
      "Crée d'abord un appareil, puis ajoute ses ports dans le panneau de droite.",
      "Pour une liaison MIDI, clique sur MIDI Out de la source puis sur MIDI In de la destination.",
      "Clique sur un port de sortie dans le tableau pour lancer une liaison.",
      "Le bouton Imprimer / PDF sert aussi bien pour le papier que pour l'export PDF du navigateur."
    ]
  },
  autosave: {
    title: "Sauvegarde locale",
    body:
      "Chaque modification est enregistrée dans le navigateur via localStorage. Cela permet de retrouver le dernier schéma ouvert sans exporter immédiatement un fichier.",
    tips: [
      "L'export JSON reste la meilleure sauvegarde à partager ou archiver.",
      "Un navigateur différent n'accède pas à la même sauvegarde locale."
    ]
  },
  selection: {
    title: "Sélection",
    body:
      "Le bandeau d'état rappelle ce qui est sélectionné: appareil, port ou liaison. La sélection active alimente aussi le panneau d'édition à droite.",
    tips: [
      "Clique dans le vide pour désélectionner.",
      "La touche Échap annule une liaison en cours."
    ]
  },
  "new-schema": {
    title: "Nouveau schéma",
    body:
      "Réinitialise le projet et repart d'une feuille blanche. La sauvegarde locale existante sera remplacée par le nouveau schéma.",
    tips: [
      "Exporte d'abord ton JSON si tu veux conserver une version séparée.",
      "Le titre du projet est remis à un nom par défaut."
    ]
  },
  "sample-schema": {
    title: "Schéma exemple",
    body:
      "Charge un setup de démonstration pour voir rapidement comment organiser des appareils, des ports et des liaisons de plusieurs types.",
    tips: [
      "Tu peux ensuite modifier librement l'exemple et l'enregistrer sous ton propre nom.",
      "C'est pratique pour découvrir la logique des couleurs et du câblage."
    ]
  },
  "reset-board": {
    title: "Réinitialiser le tableau",
    body:
      "Remet le tableau visuel à plat en repositionnant les appareils sur une grille propre et en supprimant les liaisons en cours. L'inventaire des appareils et leurs ports sont conservés.",
    tips: [
      "Pratique pour repartir d'un câblage propre sans recréer tous les appareils.",
      "Les appareils gardent leurs noms, leurs couleurs et leurs ports."
    ]
  },
  "reset-inventory": {
    title: "Réinitialiser l'inventaire",
    body:
      "Supprime tous les appareils, leurs ports et leurs liaisons, tout en conservant le titre et la description du projet.",
    tips: [
      "À utiliser quand tu veux repartir d'un inventaire vide.",
      "Pour tout remettre à zéro, y compris les infos projet, le bouton Nouveau schéma reste disponible."
    ]
  },
  "export-json": {
    title: "Sauvegarder JSON",
    body:
      "Télécharge un fichier JSON complet contenant tous les appareils, leurs ports, les positions sur le tableau et les liaisons. C'est le format de sauvegarde portable du projet.",
    tips: [
      "Le fichier JSON peut être remis dans l'app plus tard avec Charger JSON.",
      "Le nom du fichier reprend automatiquement le titre du schéma."
    ]
  },
  "import-json": {
    title: "Charger JSON",
    body:
      "Recharge un schéma depuis un fichier JSON exporté auparavant. Les appareils, ports, positions et liaisons sont reconstruits automatiquement.",
    tips: [
      "Le fichier importé remplace le projet actuel.",
      "Si le schéma contient des anciens champs, l'app tente de les normaliser."
    ]
  },
  "print-schema": {
    title: "Impression et PDF",
    body:
      "Prépare le schéma pour l'impression. Le navigateur peut ensuite l'envoyer vers une imprimante papier ou un PDF selon ce que tu choisis dans sa boîte de dialogue.",
    tips: [
      "Les panneaux latéraux sont masqués à l'impression pour laisser la place au plan de câblage.",
      "Pense à donner un titre clair au projet, il apparaîtra en haut du document."
    ]
  },
  "share-schema": {
    title: "Partage",
    body:
      "L'app tente d'utiliser la fonction de partage du navigateur. Si elle n'est pas disponible, elle bascule sur une copie de résumé dans le presse-papiers ou sur le téléchargement du JSON.",
    tips: [
      "Sur mobile, certains navigateurs permettent de partager directement le fichier JSON.",
      "Le résumé partagé mentionne le nombre d'appareils et de liaisons."
    ]
  },
  "project-details": {
    title: "Informations du projet",
    body:
      "Le titre et la description donnent du contexte à ton schéma: studio, live set, répétition, patch modulaire, configuration tournée, etc.",
    tips: [
      "Le titre est repris dans les exports JSON et dans l'impression.",
      "La description est utile pour préciser la version du setup ou la scène concernée."
    ]
  },
  "device-form": {
    title: "Créer un appareil",
    body:
      "Ajoute ici une nouvelle machine sur le tableau. Tu peux lui donner un nom, une couleur d'accent et une courte note pour l'identifier rapidement.",
    tips: [
      "Une couleur d'accent aide à repérer visuellement des familles de machines.",
      "Le type d'appareil choisit aussi une icone de repere dans l'inventaire, le tableau et le graphe.",
      "Les ports sont ajoutés après création dans le panneau d'édition."
    ]
  },
  "device-list": {
    title: "Inventaire des appareils",
    body:
      "Cette liste centralise toutes les machines du schéma. Elle sert à passer vite d'un appareil à un autre sans chercher sur le tableau.",
    tips: [
      "Le compteur affiche le nombre total d'appareils.",
      "Chaque ligne indique aussi le nombre de ports et de liaisons liées à l'appareil."
    ]
  },
  "device-library": {
    title: "Bibliothèque des appareils",
    body:
      "La bibliothèque conserve des modèles d'appareils réutilisables avec leurs ports. Tu peux ainsi enregistrer une machine une fois, puis la réinjecter dans un autre schéma sans tout recréer.",
    tips: [
      "La bibliothèque est sauvegardée localement dans le navigateur.",
      "Tu peux aussi la sauvegarder en JSON puis la recharger sur un autre poste.",
      "Utiliser ajoute une nouvelle instance de l'appareil dans le schéma courant."
    ]
  },
  "export-library": {
    title: "Sauvegarder la bibliothèque",
    body:
      "Télécharge un fichier JSON dédié à ta bibliothèque d'instruments. Ce fichier contient les modèles d'appareils réutilisables et leurs ports, sans le patch courant.",
    tips: [
      "Pratique pour archiver tes instruments ou les transférer vers un autre navigateur.",
      "L'export de bibliothèque complète l'export du schéma, il ne le remplace pas."
    ]
  },
  "import-library": {
    title: "Charger une bibliothèque",
    body:
      "Recharge un fichier JSON de bibliothèque pour récupérer des instruments déjà préparés. L'import fusionne avec la bibliothèque locale et met à jour les doublons évidents.",
    tips: [
      "Les doublons sont comparés à partir du nom, de la marque ou famille et du modèle.",
      "Un ancien JSON contenant directement une liste d'instruments peut aussi être accepté."
    ]
  },
  legend: {
    title: "Couleurs des I/O",
    body:
      "Chaque famille de ports possède une couleur dédiée pour rester lisible sur le tableau et à l'impression. Les liaisons reprennent la même couleur que les ports correspondants.",
    tips: [
      "Les entrées utilisent une teinte plus claire et les sorties une teinte plus foncée.",
      "Audio en bleu, MIDI en orange, gate en rouge, CV en vert, clock en ocre et USB en bleu-vert.",
      "Les ports compatibles se mettent en évidence lorsqu'une liaison est en cours."
    ]
  },
  board: {
    title: "Tableau visuel",
    body:
      "Le tableau représente ton patch physique. Tu peux déplacer les appareils à la souris et relier les ports directement pour documenter ton câblage.",
    tips: [
      "Fais glisser la tête d'un appareil pour le repositionner.",
      "Utilise Recentrer la vue après plusieurs déplacements."
    ]
  },
  "graph-view": {
    title: "Graphe logique",
    body:
      "Le graphe logique regroupe les appareils sous forme de nœuds et résume les trajets entre eux. Il aide à comprendre rapidement l'architecture générale du patch, indépendamment de la disposition physique.",
    tips: [
      "Clique sur un appareil dans le graphe pour le sélectionner.",
      "Quand un appareil est sélectionné, ses chemins entrants et sortants restent visibles et le reste est atténué.",
      "Les liaisons problématiques apparaissent en rouge dans le graphe comme dans l'analyse du patch."
    ]
  },
  "connect-mode": {
    title: "Mode liaison",
    body:
      "Quand une liaison est lancée, le port source reste surligné et l'app t'indique les destinations compatibles. Tu peux alors cliquer la destination voulue ou annuler.",
    tips: [
      "Une liaison classique part d'une sortie vers une entrée.",
      "Les liaisons autorisées restent dans la même famille: audio-audio, MIDI-MIDI, CV-CV, gate-gate, clock-clock, USB-USB.",
      "Les entrées compatibles passent en surbrillance dès qu'une sortie est sélectionnée.",
      "Exemple MIDI: clique MIDI Out sur la première machine, puis MIDI In sur la seconde.",
      "Le port USB est traité comme un lien multi-directionnel avec les autres ports USB."
    ]
  },
  undo: {
    title: "Annuler",
    body:
      "Annule la dernière modification du schéma: ajout de port, suppression, déplacement d'appareil, création de liaison, etc.",
    tips: [
      "Raccourci clavier: Cmd/Ctrl + Z.",
      "Très utile si tu ajoutes un mauvais port par erreur."
    ]
  },
  redo: {
    title: "Rétablir",
    body:
      "Restaure l'action qui vient d'être annulée. Cela permet de revenir en avant après un undo.",
    tips: [
      "Raccourci clavier: Cmd/Ctrl + Shift + Z.",
      "Le bouton devient actif dès qu'une action annulée peut être rejouée."
    ]
  },
  "device-details": {
    title: "Détails d'appareil",
    body:
      "Ce panneau permet de renommer une machine, changer sa couleur, documenter son rôle et gérer tous ses ports. C'est ici que l'appareil devient vraiment utile.",
    tips: [
      "Tu peux dupliquer un appareil pour gagner du temps sur des machines similaires.",
      "Supprimer un appareil supprime aussi toutes ses liaisons."
    ]
  },
  "port-list": {
    title: "Ports d'un appareil",
    body:
      "Les ports décrivent la connectique réelle de la machine. Sélectionne un port pour le renommer, changer son type ou préciser un canal MIDI.",
    tips: [
      "Les boutons d'ajout rapide créent immédiatement un nouveau port du type choisi.",
      "Tu peux créer plusieurs ports d'un même type, par exemple plusieurs Audio In."
    ]
  },
  "add-port": {
    title: "Ajout rapide de ports",
    body:
      "Ajoute des I/O standard en un clic. Chaque port hérite de sa couleur, de sa direction et d'une description de base selon son type.",
    tips: [
      "Commence par les ports principaux, puis renomme-les si besoin.",
      "Les ports MIDI reçoivent automatiquement un réglage de canal."
    ]
  },
  "port-details": {
    title: "Détails de port",
    body:
      "Chaque port peut être renommé pour refléter la réalité physique: Main Out, Input 1, MIDI A, Clock In, etc. C'est aussi ici que tu ajustes le type et la description du port.",
    tips: [
      "Les canaux MIDI sont disponibles uniquement sur les ports MIDI.",
      "Supprimer un port retire aussi les liaisons qui l'utilisent."
    ]
  },
  "midi-channel": {
    title: "Canal MIDI",
    body:
      "Le canal MIDI peut être défini au niveau du port, puis éventuellement surchargé au niveau d'une liaison particulière. Cela permet de documenter précisément le comportement prévu.",
    tips: [
      "Choisis Tous les canaux pour un port omni ou un routage global.",
      "La liaison peut suivre automatiquement les réglages des ports."
    ]
  },
  "connection-details": {
    title: "Détails de liaison",
    body:
      "Une liaison relie deux ports compatibles et décrit un trajet de signal. Tu peux lui donner un libellé, une note et un canal MIDI spécifique si nécessaire.",
    tips: [
      "Un libellé est utile pour les exceptions ou les chemins complexes.",
      "Supprimer la liaison la retire seulement du schéma, pas des appareils."
    ]
  },
  diagnostics: {
    title: "Analyse du patch",
    body:
      "Cette zone contrôle la cohérence du câblage et signale les problèmes visibles dans le schéma: incompatibilités, conflits d'entrées ou canaux MIDI incohérents.",
    tips: [
      "Les erreurs en rouge demandent généralement une correction du patch.",
      "Les avertissements en ocre attirent l'attention sur des points à vérifier.",
      "Clique sur un message pour sélectionner directement l'élément concerné."
    ]
  },
  "help-panel": {
    title: "Guide contextuel",
    body:
      "Le panneau d'aide change selon la zone que tu explores. Il sert de mémo intégré pour rendre l'app autonome même sans documentation externe.",
    tips: [
      "Le survol ou le focus d'une zone met à jour cette aide.",
      "Le bouton Vue générale remet l'aide sur les bases de l'application."
    ]
  }
};

const elements = {
  schemaTitleDisplay: document.querySelector("#schemaTitleDisplay"),
  schemaDescriptionDisplay: document.querySelector("#schemaDescriptionDisplay"),
  schemaMetaDescription: document.querySelector('meta[name="description"]'),
  schemaTitleInput: document.querySelector("#schemaTitleInput"),
  schemaDescriptionInput: document.querySelector("#schemaDescriptionInput"),
  autosaveStatus: document.querySelector("#autosaveStatus"),
  selectionStatus: document.querySelector("#selectionStatus"),
  newSchemaBtn: document.querySelector("#newSchemaBtn"),
  loadSampleBtn: document.querySelector("#loadSampleBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  importBtn: document.querySelector("#importBtn"),
  exportLibraryBtn: document.querySelector("#exportLibraryBtn"),
  importLibraryBtn: document.querySelector("#importLibraryBtn"),
  printBtn: document.querySelector("#printBtn"),
  shareBtn: document.querySelector("#shareBtn"),
  addDeviceForm: document.querySelector("#addDeviceForm"),
  newDeviceName: document.querySelector("#newDeviceName"),
  newDeviceManufacturer: document.querySelector("#newDeviceManufacturer"),
  newDeviceType: document.querySelector("#newDeviceType"),
  newDeviceColor: document.querySelector("#newDeviceColor"),
  newDeviceNotes: document.querySelector("#newDeviceNotes"),
  deviceCountBadge: document.querySelector("#deviceCountBadge"),
  deviceList: document.querySelector("#deviceList"),
  libraryList: document.querySelector("#libraryList"),
  legendList: document.querySelector("#legendList"),
  boardWrapper: document.querySelector("#boardWrapper"),
  board: document.querySelector("#board"),
  connectionsLayer: document.querySelector("#connectionsLayer"),
  workspaceTitle: document.querySelector("#workspaceTitle"),
  boardHint: document.querySelector("#boardHint"),
  boardViewBtn: document.querySelector("#boardViewBtn"),
  graphViewBtn: document.querySelector("#graphViewBtn"),
  cancelConnectBtn: document.querySelector("#cancelConnectBtn"),
  centerBoardBtn: document.querySelector("#centerBoardBtn"),
  undoBtn: document.querySelector("#undoBtn"),
  redoBtn: document.querySelector("#redoBtn"),
  resetBoardBtn: document.querySelector("#resetBoardBtn"),
  resetInventoryBtn: document.querySelector("#resetInventoryBtn"),
  emptyState: document.querySelector("#emptyState"),
  emptyAddDeviceBtn: document.querySelector("#emptyAddDeviceBtn"),
  inspectorPanel: document.querySelector("#inspectorPanel"),
  helpTitle: document.querySelector("#helpTitle"),
  helpBody: document.querySelector("#helpBody"),
  helpTips: document.querySelector("#helpTips"),
  helpResetBtn: document.querySelector("#helpResetBtn"),
  diagnosticsPanel: document.querySelector("#diagnosticsPanel"),
  diagnosticsSummary: document.querySelector("#diagnosticsSummary"),
  diagnosticsList: document.querySelector("#diagnosticsList"),
  fileInput: document.querySelector("#fileInput"),
  libraryFileInput: document.querySelector("#libraryFileInput"),
  toast: document.querySelector("#toast")
};

const state = {
  schema: createEmptySchema(),
  deviceLibrary: [],
  selectedDeviceId: null,
  selectedPortId: null,
  selectedConnectionId: null,
  workspaceView: "board",
  connectFrom: null,
  tempPoint: null,
  helpKey: "overview",
  drag: null,
  collapsedSections: new Set(),
  diagnostics: {
    items: [],
    errors: 0,
    warnings: 0,
    deviceCounts: {}
  },
  cache: {
    structureSignature: "",
    diagnosticsSignature: "",
    diagnosticsResult: null,
    graphSignature: "",
    graphBundle: null
  },
  history: {
    past: [],
    future: []
  },
  boardSize: { width: 1400, height: 920 },
  toastTimer: null,
  lastSavedAt: null
};

init();

function init() {
  const restored = loadSchemaFromStorage();
  if (restored) {
    state.schema = restored;
    state.lastSavedAt = restored.meta.updatedAt ? new Date(restored.meta.updatedAt) : new Date();
  }
  state.deviceLibrary = loadDeviceLibraryFromStorage();

  hydrateStaticFields();
  attachEvents();
  renderLegend();
  render();
}

function hydrateStaticFields() {
  if (elements.newDeviceType) {
    elements.newDeviceType.innerHTML = renderDeviceTypeOptionsMarkup("other");
    elements.newDeviceType.value = "other";
  }
}

function attachEvents() {
  elements.newSchemaBtn.addEventListener("click", handleNewSchema);
  elements.loadSampleBtn.addEventListener("click", () => {
    recordHistory();
    state.schema = createSampleSchema();
    state.selectedDeviceId = null;
    state.selectedPortId = null;
    state.selectedConnectionId = null;
    cancelConnectionMode({ announce: false });
    persistSchema("Exemple chargé.");
    centerBoard(false);
  });
  elements.exportBtn.addEventListener("click", exportSchema);
  elements.importBtn.addEventListener("click", () => {
    elements.fileInput.click();
  });
  elements.exportLibraryBtn.addEventListener("click", () => {
    state.helpKey = "export-library";
    renderHelp();
    exportDeviceLibrary();
  });
  elements.importLibraryBtn.addEventListener("click", () => {
    state.helpKey = "import-library";
    renderHelp();
    elements.libraryFileInput.click();
  });
  elements.printBtn.addEventListener("click", () => {
    state.helpKey = "print-schema";
    renderHelp();
    renderConnections();
    window.print();
  });
  elements.shareBtn.addEventListener("click", shareSchema);
  elements.helpResetBtn.addEventListener("click", () => {
    state.helpKey = "overview";
    renderHelp();
  });
  elements.addDeviceForm.addEventListener("submit", handleAddDevice);
  elements.fileInput.addEventListener("change", handleImportFile);
  elements.libraryFileInput.addEventListener("change", handleLibraryImportFile);
  elements.schemaTitleInput.addEventListener("change", handleProjectMetaChange);
  elements.schemaDescriptionInput.addEventListener("change", handleProjectMetaChange);
  elements.cancelConnectBtn.addEventListener("click", () => cancelConnectionMode());
  elements.centerBoardBtn.addEventListener("click", () => centerBoard());
  elements.boardViewBtn.addEventListener("click", () => setWorkspaceView("board"));
  elements.graphViewBtn.addEventListener("click", () => setWorkspaceView("graph"));
  elements.undoBtn.addEventListener("click", undoHistory);
  elements.redoBtn.addEventListener("click", redoHistory);
  elements.resetBoardBtn.addEventListener("click", resetBoardLayout);
  elements.resetInventoryBtn.addEventListener("click", resetInventory);
  elements.emptyAddDeviceBtn.addEventListener("click", () => {
    elements.newDeviceName.focus();
    state.helpKey = "device-form";
    renderHelp();
  });

  elements.board.addEventListener("click", handleBoardClick);
  elements.board.addEventListener("pointerdown", handleBoardPointerDown);
  elements.connectionsLayer.addEventListener("click", handleConnectionsClick);
  elements.inspectorPanel.addEventListener("click", handleInspectorClick);
  elements.inspectorPanel.addEventListener("change", handleInspectorChange);
  elements.deviceList.addEventListener("click", handleDeviceListClick);
  elements.libraryList.addEventListener("click", handleLibraryListClick);
  elements.diagnosticsPanel.addEventListener("click", handleDiagnosticsClick);

  elements.boardWrapper.addEventListener("pointermove", handleBoardPointerMove);
  elements.boardWrapper.addEventListener("click", handleBackgroundClick);
  elements.boardWrapper.addEventListener("scroll", renderConnections, { passive: true });

  window.addEventListener("resize", renderConnections);
  window.addEventListener("keydown", handleKeydown);

  document.addEventListener("click", handleSectionToggle);
  document.addEventListener("mouseover", handleHelpTracking, true);
  document.addEventListener("focusin", handleHelpTracking, true);
}

function handleNewSchema() {
  if (state.schema.devices.length || state.schema.connections.length) {
    const confirmed = window.confirm(
      "Créer un nouveau schéma remplacera le projet actuel et sa sauvegarde locale. Continuer ?"
    );
    if (!confirmed) {
      return;
    }
  }

  recordHistory();
  state.schema = createEmptySchema();
  state.selectedDeviceId = null;
  state.selectedPortId = null;
  state.selectedConnectionId = null;
  cancelConnectionMode({ announce: false });
  persistSchema("Nouveau schéma prêt.");
}

function handleProjectMetaChange(event) {
  recordHistory();
  const field = event.target.id;
  if (field === "schemaTitleInput") {
    state.schema.meta.title = event.target.value.trim() || APP_NAME;
  }
  if (field === "schemaDescriptionInput") {
    state.schema.meta.description = event.target.value.trim() || DEFAULT_SCHEMA_DESCRIPTION;
  }
  persistSchema();
}

function handleAddDevice(event) {
  event.preventDefault();

  const name = elements.newDeviceName.value.trim();
  if (!name) {
    elements.newDeviceName.focus();
    showToast("Ajoute au moins un nom pour créer l'appareil.");
    return;
  }

  recordHistory();
  const nextColor = normalizeColor(elements.newDeviceColor.value, pickAccentColor(state.schema.devices.length));
  const device = {
    id: createId("device"),
    name,
    type: normalizeDeviceType(elements.newDeviceType.value),
    manufacturer: elements.newDeviceManufacturer.value.trim(),
    model: "",
    notes: elements.newDeviceNotes.value.trim(),
    color: nextColor,
    position: getNextDevicePosition(),
    ports: []
  };

  state.schema.devices.push(device);
  state.selectedDeviceId = device.id;
  state.selectedPortId = null;
  state.selectedConnectionId = null;
  cancelConnectionMode({ announce: false });

  elements.addDeviceForm.reset();
  elements.newDeviceType.value = "other";
  elements.newDeviceColor.value = pickAccentColor(state.schema.devices.length);

  persistSchema(`Appareil "${device.name}" créé.`);
  window.requestAnimationFrame(() => focusDeviceOnBoard(device.id));
  state.helpKey = "device-details";
  renderHelp();
}

async function handleImportFile(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  try {
    const raw = await file.text();
    const parsed = JSON.parse(raw);
    recordHistory();
    state.schema = normalizeSchema(parsed);
    state.selectedDeviceId = null;
    state.selectedPortId = null;
    state.selectedConnectionId = null;
    cancelConnectionMode({ announce: false });
    persistSchema(`Schéma "${state.schema.meta.title}" chargé.`);
    centerBoard(false);
  } catch (error) {
    console.error(error);
    showToast("Impossible de charger ce JSON. Vérifie son format.");
  } finally {
    event.target.value = "";
  }
}

async function handleLibraryImportFile(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  try {
    const raw = await file.text();
    const parsed = JSON.parse(raw);
    const importedEntries = extractDeviceLibraryEntries(parsed);

    if (!importedEntries.length) {
      showToast("Impossible de trouver une bibliothèque exploitable dans ce fichier.");
      return;
    }

    const mergeResult = mergeDeviceLibraryEntries(state.deviceLibrary, importedEntries);
    state.deviceLibrary = mergeResult.entries;
    state.helpKey = "device-library";
    renderHelp();

    const importedCount = importedEntries.length;
    const details = [];
    if (mergeResult.added) {
      details.push(`${mergeResult.added} ajouté${mergeResult.added > 1 ? "s" : ""}`);
    }
    if (mergeResult.replaced) {
      details.push(`${mergeResult.replaced} mis à jour`);
    }

    const importedLabel = `${importedCount} instrument${importedCount > 1 ? "s" : ""} importé${importedCount > 1 ? "s" : ""}`;
    persistDeviceLibrary(
      details.length
        ? `Bibliothèque chargée: ${importedLabel} (${details.join(", ")}).`
        : `Bibliothèque chargée: ${importedLabel}.`
    );
  } catch (error) {
    console.error(error);
    showToast("Impossible de charger cette bibliothèque JSON.");
  } finally {
    event.target.value = "";
  }
}

function handleBoardClick(event) {
  const graphNode = event.target.closest("[data-action='select-graph-device']");
  if (graphNode) {
    selectDevice(graphNode.dataset.deviceId);
    state.helpKey = "graph-view";
    render();
    focusDeviceInActiveView(graphNode.dataset.deviceId);
    return;
  }

  const graphEdge = event.target.closest("[data-action='select-graph-edge']");
  if (graphEdge?.dataset.connectionId) {
    state.selectedConnectionId = graphEdge.dataset.connectionId;
    state.selectedDeviceId = null;
    state.selectedPortId = null;
    state.helpKey = "connection-details";
    render();
    return;
  }

  if (state.workspaceView === "graph" && event.target.closest(".logic-graph")) {
    state.selectedDeviceId = null;
    state.selectedPortId = null;
    state.selectedConnectionId = null;
    state.helpKey = "graph-view";
    render();
    return;
  }

  const portButton = event.target.closest("[data-action='board-port']");
  if (portButton) {
    const deviceId = portButton.dataset.deviceId;
    const portId = portButton.dataset.portId;
    if (state.connectFrom) {
      attemptConnectionTo(deviceId, portId);
    } else {
      selectPort(deviceId, portId);
      if (canStartConnection(getPort(deviceId, portId))) {
        beginConnectionFrom(deviceId, portId);
      }
    }
    return;
  }

  const toggleButton = event.target.closest("[data-action='toggle-device-board-view']");
  if (toggleButton) {
    toggleDeviceBoardView(toggleButton.dataset.deviceId);
    return;
  }

  const deleteButton = event.target.closest("[data-action='delete-device-board']");
  if (deleteButton) {
    deleteDevice(deleteButton.dataset.deviceId);
    return;
  }

  const deviceCard = event.target.closest("[data-device-card-id]");
  if (deviceCard) {
    selectDevice(deviceCard.dataset.deviceCardId);
    render();
  }
}

function handleBoardPointerDown(event) {
  if (state.workspaceView !== "board") {
    return;
  }

  const handle = event.target.closest("[data-drag-handle]");
  if (!handle || event.target.closest("button")) {
    return;
  }

  const deviceId = handle.dataset.dragHandle;
  const device = getDevice(deviceId);
  if (!device) {
    return;
  }

  event.preventDefault();
  selectDevice(deviceId);
  cancelConnectionMode({ announce: false });

  const boardRect = elements.board.getBoundingClientRect();
  state.drag = {
    deviceId,
    offsetX: event.clientX - boardRect.left - device.position.x,
    offsetY: event.clientY - boardRect.top - device.position.y,
    historyRecorded: false
  };

  window.addEventListener("pointermove", handleDragMove);
  window.addEventListener("pointerup", handleDragEnd);
}

function handleDragMove(event) {
  if (!state.drag) {
    return;
  }

  const boardRect = elements.board.getBoundingClientRect();
  const device = getDevice(state.drag.deviceId);
  if (!device) {
    return;
  }

  const maxX = Math.max(state.boardSize.width - 360, 40);
  const maxY = Math.max(state.boardSize.height - 260, 40);

  const nextX = clamp(event.clientX - boardRect.left - state.drag.offsetX, 32, maxX);
  const nextY = clamp(event.clientY - boardRect.top - state.drag.offsetY, 32, maxY);

  if (nextX !== device.position.x || nextY !== device.position.y) {
    if (!state.drag.historyRecorded) {
      recordHistory();
      state.drag.historyRecorded = true;
    }
    device.position.x = nextX;
    device.position.y = nextY;
  }

  const card = elements.board.querySelector(`[data-device-card-id="${device.id}"]`);
  if (card) {
    card.style.left = `${device.position.x}px`;
    card.style.top = `${device.position.y}px`;
  }

  renderConnections();
}

function handleDragEnd() {
  if (!state.drag) {
    return;
  }

  const moved = state.drag.historyRecorded;
  state.drag = null;
  window.removeEventListener("pointermove", handleDragMove);
  window.removeEventListener("pointerup", handleDragEnd);
  if (moved) {
    persistSchema("Position de l'appareil mise à jour.", { silentToast: true });
  }
}

function handleConnectionsClick(event) {
  const path = event.target.closest("[data-action='select-connection']");
  if (!path) {
    return;
  }

  state.selectedConnectionId = path.dataset.connectionId;
  state.selectedDeviceId = null;
  state.selectedPortId = null;
  cancelConnectionMode({ announce: false });
  state.helpKey = "connection-details";
  render();
}

function handleInspectorClick(event) {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) {
    return;
  }

  const action = actionTarget.dataset.action;

  if (action === "duplicate-device") {
    duplicateDevice(actionTarget.dataset.deviceId);
    return;
  }

  if (action === "delete-device") {
    deleteDevice(actionTarget.dataset.deviceId);
    return;
  }

  if (action === "select-port") {
    selectPort(actionTarget.dataset.deviceId, actionTarget.dataset.portId);
    state.helpKey = "port-details";
    render();
    return;
  }

  if (action === "quick-add-port") {
    addPortToSelectedDevice(actionTarget.dataset.kind);
    return;
  }

  if (action === "start-port-routing") {
    beginConnectionFrom(actionTarget.dataset.deviceId, actionTarget.dataset.portId);
    return;
  }

  if (action === "delete-port") {
    deletePort(actionTarget.dataset.deviceId, actionTarget.dataset.portId);
    return;
  }

  if (action === "delete-connection") {
    deleteConnection(actionTarget.dataset.connectionId);
    return;
  }

  if (action === "save-device-library") {
    saveDeviceToLibrary(actionTarget.dataset.deviceId);
  }
}

function handleInspectorChange(event) {
  const target = event.target;

  if (target.dataset.deviceField) {
    updateSelectedDeviceField(target.dataset.deviceField, target.value);
    return;
  }

  if (target.dataset.portField) {
    updateSelectedPortField(target.dataset.portField, target.value);
    return;
  }

  if (target.dataset.connectionField) {
    updateSelectedConnectionField(target.dataset.connectionField, target.value);
  }
}

function handleDeviceListClick(event) {
  const button = event.target.closest("[data-action='select-device']");
  if (!button) {
    return;
  }

  selectDevice(button.dataset.deviceId);
  render();
  focusDeviceInActiveView(button.dataset.deviceId);
}

function handleLibraryListClick(event) {
  const useButton = event.target.closest("[data-action='use-library-device']");
  if (useButton) {
    instantiateLibraryDevice(useButton.dataset.libraryId);
    return;
  }

  const deleteButton = event.target.closest("[data-action='delete-library-device']");
  if (deleteButton) {
    deleteLibraryDevice(deleteButton.dataset.libraryId);
  }
}

function handleBackgroundClick(event) {
  const isBackground =
    event.target === elements.boardWrapper ||
    event.target === elements.board ||
    event.target === elements.connectionsLayer;

  if (!isBackground) {
    return;
  }

  if (state.connectFrom) {
    cancelConnectionMode();
    return;
  }

  state.selectedDeviceId = null;
  state.selectedPortId = null;
  state.selectedConnectionId = null;
  state.helpKey = "selection";
  render();
}

function handleDiagnosticsClick(event) {
  const button = event.target.closest("[data-action='select-diagnostic-target']");
  if (!button) {
    return;
  }

  const targetType = button.dataset.targetType;
  const deviceId = button.dataset.deviceId;
  const portId = button.dataset.portId;
  const connectionId = button.dataset.connectionId;

  cancelConnectionMode({ announce: false });

  if (targetType === "connection" && connectionId) {
    const connection = getConnection(connectionId);
    if (!connection) {
      return;
    }
    state.selectedConnectionId = connectionId;
    state.selectedDeviceId = null;
    state.selectedPortId = null;
    state.helpKey = "connection-details";
    render();
    if (connection.source.deviceId) {
      focusDeviceInActiveView(connection.source.deviceId);
    }
    return;
  }

  if (targetType === "port" && deviceId && portId) {
    selectPort(deviceId, portId);
    render();
    focusDeviceInActiveView(deviceId);
    return;
  }

  if (targetType === "device" && deviceId) {
    selectDevice(deviceId);
    render();
    focusDeviceInActiveView(deviceId);
  }
}

function handleBoardPointerMove(event) {
  if (!state.connectFrom || state.workspaceView !== "board") {
    return;
  }

  const wrapperRect = elements.boardWrapper.getBoundingClientRect();
  state.tempPoint = {
    x: event.clientX - wrapperRect.left + elements.boardWrapper.scrollLeft,
    y: event.clientY - wrapperRect.top + elements.boardWrapper.scrollTop
  };
  renderConnections();
}

function handleKeydown(event) {
  const modifierPressed = event.metaKey || event.ctrlKey;
  if (modifierPressed && event.key.toLowerCase() === "z") {
    event.preventDefault();
    if (event.shiftKey) {
      redoHistory();
    } else {
      undoHistory();
    }
    return;
  }

  if (event.key === "Escape" && state.connectFrom) {
    cancelConnectionMode();
  }
}

function resetBoardLayout() {
  if (!state.schema.devices.length && !state.schema.connections.length) {
    showToast("Le tableau est déjà vide.");
    return;
  }

  const confirmed = window.confirm(
    "Réinitialiser le tableau va supprimer toutes les liaisons et replacer les appareils sur une grille propre. Continuer ?"
  );
  if (!confirmed) {
    return;
  }

  recordHistory();
  state.schema.devices.forEach((device, index) => {
    device.position = getDeviceGridPosition(index);
  });
  state.schema.connections = [];
  state.selectedConnectionId = null;
  cancelConnectionMode({ announce: false });
  persistSchema("Tableau réinitialisé.");
  centerBoard();
}

function resetInventory() {
  if (!state.schema.devices.length && !state.schema.connections.length) {
    showToast("L'inventaire est déjà vide.");
    return;
  }

  const confirmed = window.confirm(
    "Réinitialiser l'inventaire supprimera tous les appareils, leurs ports et leurs liaisons. Continuer ?"
  );
  if (!confirmed) {
    return;
  }

  recordHistory();
  state.schema.devices = [];
  state.schema.connections = [];
  state.selectedDeviceId = null;
  state.selectedPortId = null;
  state.selectedConnectionId = null;
  cancelConnectionMode({ announce: false });
  persistSchema("Inventaire réinitialisé.");
}

function handleHelpTracking(event) {
  const helpNode = event.target.closest("[data-help-key]");
  if (!helpNode) {
    return;
  }

  const helpKey = helpNode.dataset.helpKey;
  if (helpKey && helpKey !== state.helpKey) {
    state.helpKey = helpKey;
    renderHelp();
  }
}

function handleSectionToggle(event) {
  const button = event.target.closest("[data-action='toggle-section']");
  if (!button) {
    return;
  }

  const sectionId = button.dataset.sectionId;
  if (!sectionId) {
    return;
  }

  event.preventDefault();
  if (state.collapsedSections.has(sectionId)) {
    state.collapsedSections.delete(sectionId);
  } else {
    state.collapsedSections.add(sectionId);
  }
  applyCollapsibleSections();
}

function decorateCollapsibleSections() {
  const sections = document.querySelectorAll(
    ".panel-section[data-section-id], .inspector-card[data-section-id]"
  );

  sections.forEach((section) => {
    const heading = Array.from(section.children).find((child) =>
      child.classList?.contains("section-heading")
    );
    if (!heading) {
      return;
    }

    let body = Array.from(section.children).find((child) =>
      child.classList?.contains("collapsible-section__body")
    );
    if (!body) {
      body = document.createElement("div");
      body.className = "collapsible-section__body";
      Array.from(section.children)
        .filter((child) => child !== heading)
        .forEach((child) => body.append(child));
      section.append(body);
    }

    let tools = Array.from(heading.children).find((child) =>
      child.classList?.contains("section-heading__tools")
    );
    if (!tools) {
      tools = document.createElement("div");
      tools.className = "section-heading__tools";
      Array.from(heading.children)
        .slice(1)
        .forEach((child) => tools.append(child));
      heading.append(tools);
    }

    let toggle = Array.from(tools.children).find((child) => child.dataset?.action === "toggle-section");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "section-chevron";
      toggle.dataset.action = "toggle-section";
      toggle.dataset.sectionId = section.dataset.sectionId;
      toggle.setAttribute("aria-label", "Déplier ou replier la section");
      toggle.innerHTML = "<span aria-hidden='true'>▾</span>";
      tools.append(toggle);
    }
  });
}

function applyCollapsibleSections() {
  const sections = document.querySelectorAll(
    ".panel-section[data-section-id], .inspector-card[data-section-id]"
  );

  sections.forEach((section) => {
    const isCollapsed = state.collapsedSections.has(section.dataset.sectionId);
    section.classList.toggle("is-collapsed", isCollapsed);

    const body = Array.from(section.children).find((child) =>
      child.classList?.contains("collapsible-section__body")
    );
    if (body) {
      body.hidden = isCollapsed;
    }

    const toggle = section.querySelector("[data-action='toggle-section']");
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(!isCollapsed));
      toggle.setAttribute("title", isCollapsed ? "Déplier" : "Replier");
    }
  });
}

function setWorkspaceView(view) {
  if (view !== "board" && view !== "graph") {
    return;
  }

  if (state.workspaceView === view) {
    if (state.selectedDeviceId) {
      focusDeviceInActiveView(state.selectedDeviceId, false);
    }
    return;
  }

  if (view === "graph" && state.connectFrom) {
    cancelConnectionMode({ announce: false });
  }

  state.workspaceView = view;
  state.helpKey = view === "graph" ? "graph-view" : "board";
  render();

  if (state.selectedDeviceId) {
    focusDeviceInActiveView(state.selectedDeviceId, false);
  } else {
    centerBoard(false);
  }
}

function selectDevice(deviceId) {
  const device = getDevice(deviceId);
  if (!device) {
    return;
  }

  state.selectedDeviceId = deviceId;
  state.selectedPortId = null;
  state.selectedConnectionId = null;
  state.helpKey = "device-details";
}

function selectPort(deviceId, portId) {
  const port = getPort(deviceId, portId);
  if (!port) {
    return;
  }

  state.selectedDeviceId = deviceId;
  state.selectedPortId = portId;
  state.selectedConnectionId = null;
  state.helpKey = isMidiPort(port) ? "midi-channel" : "port-details";
}

function beginConnectionFrom(deviceId, portId) {
  const port = getPort(deviceId, portId);
  if (!port || !canStartConnection(port)) {
    showToast("Ce port ne peut pas être utilisé comme point de départ.");
    return;
  }

  const needsBoardSwitch = state.workspaceView !== "board";
  if (needsBoardSwitch) {
    state.workspaceView = "board";
  }

  state.connectFrom = { deviceId, portId };
  state.tempPoint = null;
  state.selectedDeviceId = deviceId;
  state.selectedPortId = portId;
  state.selectedConnectionId = null;
  state.helpKey = "connect-mode";
  render();
  if (needsBoardSwitch) {
    focusDeviceOnBoard(deviceId, false);
  }
  state.tempPoint = getPortCenter(deviceId, portId);
  renderConnections();
  showToast("Choisis maintenant le port de destination compatible.");
}

function attemptConnectionTo(deviceId, portId) {
  const sourcePort = getPort(state.connectFrom.deviceId, state.connectFrom.portId);
  const targetPort = getPort(deviceId, portId);

  if (!sourcePort || !targetPort) {
    return;
  }

  if (state.connectFrom.deviceId === deviceId && state.connectFrom.portId === portId) {
    cancelConnectionMode();
    return;
  }

  if (!canConnectPorts(sourcePort, targetPort)) {
    selectPort(deviceId, portId);
    render();
    showToast("Ces ports ne sont pas compatibles. Les liaisons doivent rester dans la même famille: audio-audio, MIDI-MIDI, CV-CV, gate-gate, clock-clock ou USB-USB.");
    return;
  }

  const alreadyExists = state.schema.connections.some((connection) =>
    connectionsShareSameRoute(
      connection,
      {
        source: { deviceId: state.connectFrom.deviceId, portId: state.connectFrom.portId },
        target: { deviceId, portId }
      },
      sourcePort,
      targetPort
    )
  );

  if (alreadyExists) {
    cancelConnectionMode({ announce: false });
    showToast("Cette liaison existe déjà.");
    render();
    return;
  }

  recordHistory();
  const connection = {
    id: createId("connection"),
    source: { deviceId: state.connectFrom.deviceId, portId: state.connectFrom.portId },
    target: { deviceId, portId },
    label: "",
    notes: "",
    midiChannel: isMidiPort(sourcePort) ? "inherit" : null
  };

  state.schema.connections.push(connection);
  state.selectedConnectionId = connection.id;
  state.selectedDeviceId = null;
  state.selectedPortId = null;
  cancelConnectionMode({ announce: false });
  persistSchema("Liaison créée.");
  state.helpKey = "connection-details";
}

function cancelConnectionMode(options = {}) {
  state.connectFrom = null;
  state.tempPoint = null;
  elements.cancelConnectBtn.disabled = true;
  if (options.announce !== false) {
    showToast("Liaison annulée.");
  }
  renderConnections();
}

function duplicateDevice(deviceId) {
  const device = getDevice(deviceId);
  if (!device) {
    return;
  }

  recordHistory();
  const duplicate = {
    ...structuredClone(device),
    id: createId("device"),
    name: `${device.name} copie`,
    position: {
      x: device.position.x + 46,
      y: device.position.y + 46
    },
    ports: device.ports.map((port) => ({
      ...structuredClone(port),
      id: createId("port")
    }))
  };

  state.schema.devices.push(duplicate);
  state.selectedDeviceId = duplicate.id;
  state.selectedPortId = null;
  state.selectedConnectionId = null;
  persistSchema(`Appareil dupliqué: ${duplicate.name}.`);
  window.requestAnimationFrame(() => focusDeviceOnBoard(duplicate.id));
}

function deleteDevice(deviceId) {
  const device = getDevice(deviceId);
  if (!device) {
    return;
  }

  const confirmed = window.confirm(
    `Supprimer "${device.name}" retirera aussi toutes ses liaisons. Continuer ?`
  );
  if (!confirmed) {
    return;
  }

  recordHistory();
  state.schema.devices = state.schema.devices.filter((entry) => entry.id !== deviceId);
  state.schema.connections = state.schema.connections.filter(
    (connection) =>
      connection.source.deviceId !== deviceId && connection.target.deviceId !== deviceId
  );

  state.selectedDeviceId = null;
  state.selectedPortId = null;
  state.selectedConnectionId = null;
  cancelConnectionMode({ announce: false });
  persistSchema(`Appareil "${device.name}" supprimé.`);
}

function addPortToSelectedDevice(kind) {
  const device = getDevice(state.selectedDeviceId);
  if (!device || !PORT_LIBRARY[kind]) {
    showToast("Sélectionne d'abord un appareil pour lui ajouter des ports.");
    return;
  }

  recordHistory();
  const port = createPort(kind, getNextPortName(device, kind));
  device.ports.push(port);
  state.selectedPortId = port.id;
  state.selectedConnectionId = null;
  state.helpKey = isMidiPort(port) ? "midi-channel" : "port-details";
  persistSchema(`Port "${port.name}" ajouté.`);
}

function deletePort(deviceId, portId) {
  const device = getDevice(deviceId);
  const port = getPort(deviceId, portId);
  if (!device || !port) {
    return;
  }

  recordHistory();
  device.ports = device.ports.filter((entry) => entry.id !== portId);
  state.schema.connections = state.schema.connections.filter(
    (connection) =>
      !(connection.source.deviceId === deviceId && connection.source.portId === portId) &&
      !(connection.target.deviceId === deviceId && connection.target.portId === portId)
  );

  state.selectedPortId = null;
  state.selectedConnectionId = null;
  persistSchema(`Port "${port.name}" supprimé.`);
}

function deleteConnection(connectionId) {
  const connection = getConnection(connectionId);
  if (!connection) {
    return;
  }

  recordHistory();
  state.schema.connections = state.schema.connections.filter((entry) => entry.id !== connectionId);
  state.selectedConnectionId = null;
  persistSchema("Liaison supprimée.");
}

function toggleDeviceBoardView(deviceId) {
  const device = getDevice(deviceId);
  if (!device) {
    return;
  }

  recordHistory();
  device.boardView = isDeviceCompact(device) ? "full" : "compact";
  persistSchema(
    isDeviceCompact(device)
      ? `Appareil "${device.name}" réduit.`
      : `Appareil "${device.name}" agrandi.`,
    { silentToast: true }
  );
}

function updateSelectedDeviceField(field, value) {
  const device = getDevice(state.selectedDeviceId);
  if (!device) {
    return;
  }

  recordHistory();
  if (field === "color") {
    device.color = normalizeColor(value, device.color);
  } else if (field === "type") {
    device.type = normalizeDeviceType(value);
  } else {
    device[field] = value.trim();
  }

  if (!device.name) {
    device.name = "Appareil sans nom";
  }

  persistSchema();
}

function updateSelectedPortField(field, value) {
  const port = getPort(state.selectedDeviceId, state.selectedPortId);
  if (!port) {
    return;
  }

  recordHistory();
  if (field === "kind") {
    port.kind = PORT_LIBRARY[value] ? value : port.kind;
    if (!isMidiPort(port)) {
      port.midiChannel = null;
    }
    if (port.name === "" || PORT_ORDER.includes(port.kind)) {
      port.name = getNextPortName(getDevice(state.selectedDeviceId), port.kind);
    }
  } else if (field === "midiChannel") {
    port.midiChannel = normalizeMidiChannel(value, "all");
  } else {
    port[field] = value.trim();
  }

  if (!port.name) {
    port.name = PORT_LIBRARY[port.kind].label;
  }

  persistSchema();
}

function updateSelectedConnectionField(field, value) {
  const connection = getConnection(state.selectedConnectionId);
  if (!connection) {
    return;
  }

  recordHistory();
  if (field === "midiChannel") {
    connection.midiChannel = normalizeConnectionMidiChannel(value);
  } else {
    connection[field] = value.trim();
  }

  persistSchema();
}

function exportSchema() {
  downloadJsonText(serializeSchema(), `${slugify(state.schema.meta.title || APP_NAME)}.json`);
  showToast("Fichier JSON téléchargé.");
}

function exportDeviceLibrary() {
  if (!state.deviceLibrary.length) {
    showToast("La bibliothèque est vide pour le moment.");
    return;
  }

  downloadJsonText(
    serializeDeviceLibraryExport(),
    `${slugify(APP_NAME)}-bibliotheque-instruments.json`
  );
  showToast("Bibliothèque téléchargée.");
}

async function shareSchema() {
  state.helpKey = "share-schema";
  renderHelp();

  const title = state.schema.meta.title || APP_NAME;
  const text = buildShareSummary();
  const file = new File([serializeSchema()], `${slugify(title)}.json`, {
    type: "application/json"
  });

  try {
    if (navigator.share) {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title, text, files: [file] });
      } else {
        await navigator.share({ title, text });
      }
      showToast("Partage lancé.");
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      showToast("Résumé du schéma copié dans le presse-papiers.");
      return;
    }

    exportSchema();
  } catch (error) {
    if (error?.name === "AbortError") {
      showToast("Partage annulé.");
      return;
    }
    console.error(error);
    exportSchema();
    showToast("Partage indisponible: le JSON a été téléchargé à la place.");
  }
}

function render() {
  ensureSelectionValidity();
  state.diagnostics = getDiagnosticsReport();
  updateBoardSize();
  renderProjectMeta();
  renderDeviceList();
  renderLibrary();
  renderBoard();
  renderInspector();
  renderDiagnostics();
  renderStatus();
  renderHelp();
  decorateCollapsibleSections();
  applyCollapsibleSections();
  renderConnections();
}

function renderProjectMeta() {
  const title =
    !state.schema.meta.title || LEGACY_DEFAULT_TITLES.has(state.schema.meta.title)
      ? APP_NAME
      : state.schema.meta.title;
  const description =
    !state.schema.meta.description || LEGACY_DEFAULT_DESCRIPTIONS.has(state.schema.meta.description)
      ? DEFAULT_SCHEMA_DESCRIPTION
      : state.schema.meta.description;
  elements.schemaTitleDisplay.textContent = title;
  elements.schemaDescriptionDisplay.textContent = description;
  elements.schemaTitleInput.value = title;
  elements.schemaDescriptionInput.value = description;
  document.title = title === APP_NAME ? APP_NAME : `${title} · ${APP_NAME}`;
  if (elements.schemaMetaDescription) {
    elements.schemaMetaDescription.setAttribute("content", description);
  }
}

function renderStatus() {
  elements.deviceCountBadge.textContent = String(state.schema.devices.length);
  elements.undoBtn.disabled = !canUndoHistory();
  elements.redoBtn.disabled = !canRedoHistory();
  elements.cancelConnectBtn.disabled = !state.connectFrom;
  elements.boardViewBtn.classList.toggle("is-active", state.workspaceView === "board");
  elements.graphViewBtn.classList.toggle("is-active", state.workspaceView === "graph");
  elements.boardViewBtn.setAttribute("aria-pressed", String(state.workspaceView === "board"));
  elements.graphViewBtn.setAttribute("aria-pressed", String(state.workspaceView === "graph"));
  elements.workspaceTitle.textContent =
    state.workspaceView === "graph" ? "Graphe logique" : "Tableau visuel";
  elements.boardWrapper.dataset.helpKey =
    state.workspaceView === "graph" ? "graph-view" : "board";

  if (state.workspaceView === "graph") {
    elements.boardHint.textContent = state.selectedDeviceId
      ? "Le graphe logique met en avant les chemins reliés à l'appareil sélectionné et atténue le reste."
      : "Le graphe logique résume les appareils et leurs liaisons. Clique sur un nœud pour en explorer les chemins reliés.";
  } else {
    elements.boardHint.textContent = state.connectFrom
      ? "Liaison en cours: les entrées compatibles sont surlignées. Clique sur l'une d'elles ou clique dans le vide pour annuler."
      : "Pour relier deux machines, clique sur une sortie comme MIDI Out, puis sur l'entrée compatible comme MIDI In.";
  }

  const selectionLabel = getSelectionLabel();
  elements.selectionStatus.textContent = selectionLabel;

  if (state.lastSavedAt) {
    const timestamp = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(state.lastSavedAt);
    elements.autosaveStatus.textContent = `Sauvegarde locale ${timestamp}`;
  } else {
    elements.autosaveStatus.textContent = "Sauvegarde locale active";
  }
}

function renderDeviceList() {
  if (!state.schema.devices.length) {
    elements.deviceList.innerHTML = `
      <div class="placeholder-card">
        <p class="inspector-copy">Aucun appareil pour le moment. Crée-en un à gauche pour démarrer.</p>
      </div>
    `;
    return;
  }

  elements.deviceList.innerHTML = state.schema.devices
    .map((device) => {
      const connectionCount = state.schema.connections.filter(
        (connection) =>
          connection.source.deviceId === device.id || connection.target.deviceId === device.id
      ).length;
      const isSelected = device.id === state.selectedDeviceId;
      const issueCount = getDeviceDiagnosticCount(device.id);

      return `
        <button
          class="device-list__item ${isSelected ? "is-selected" : ""}"
          type="button"
          data-action="select-device"
          data-device-id="${device.id}"
          data-help-key="device-list"
        >
          ${renderDeviceTypeIcon(device.type, device.color, {
            className: "device-type-icon device-type-icon--list"
          })}
          <span class="device-list__copy">
            <strong>${escapeHtml(device.name)}</strong>
            <span>${escapeHtml(getDeviceTypeLabel(device.type))} · ${device.ports.length} ports · ${connectionCount} liaisons${issueCount ? ` · ${issueCount} alerte${issueCount > 1 ? "s" : ""}` : ""}</span>
          </span>
        </button>
      `;
    })
    .join("");
}

function renderLibrary() {
  if (!state.deviceLibrary.length) {
    elements.libraryList.innerHTML = `
      <div class="placeholder-card">
        <p class="inspector-copy">Aucun instrument sauvegardé. Sélectionne un appareil puis enregistre-le dans la bibliothèque, ou charge une bibliothèque JSON existante.</p>
      </div>
    `;
    return;
  }

  elements.libraryList.innerHTML = state.deviceLibrary
    .map((entry) => {
      const subtitle = [entry.manufacturer, entry.model].filter(Boolean).join(" · ");
      return `
        <div class="device-list__item" data-help-key="device-library">
          ${renderDeviceTypeIcon(entry.type, entry.color, {
            className: "device-type-icon device-type-icon--list"
          })}
          <span class="device-list__copy">
            <strong>${escapeHtml(entry.name)}</strong>
            <span>${escapeHtml(getDeviceTypeLabel(entry.type))} · ${escapeHtml(subtitle || "Modèle réutilisable")} · ${entry.ports.length} ports</span>
          </span>
          <div class="toolbar-inline">
            <button
              class="action-button action-button--soft"
              type="button"
              data-action="use-library-device"
              data-library-id="${entry.id}"
            >
              Utiliser
            </button>
            <button
              class="action-button action-button--danger"
              type="button"
              data-action="delete-library-device"
              data-library-id="${entry.id}"
            >
              Supprimer
            </button>
          </div>
        </div>
      `;
    })
    .join("");
}

function saveDeviceToLibrary(deviceId) {
  const device = getDevice(deviceId);
  if (!device) {
    return;
  }

  const entry = createLibraryEntryFromDevice(device);
  const existingIndex = state.deviceLibrary.findIndex(
    (item) =>
      item.name === entry.name &&
      item.type === entry.type &&
      item.manufacturer === entry.manufacturer &&
      item.model === entry.model
  );

  if (existingIndex >= 0) {
    const confirmed = window.confirm(
      `Un appareil "${entry.name}" existe déjà dans la bibliothèque. Le remplacer ?`
    );
    if (!confirmed) {
      return;
    }

    entry.id = state.deviceLibrary[existingIndex].id;
    state.deviceLibrary.splice(existingIndex, 1, entry);
    persistDeviceLibrary(`"${entry.name}" a été mis à jour dans la bibliothèque.`);
    return;
  }

  state.deviceLibrary.unshift(entry);
  persistDeviceLibrary(`"${entry.name}" a été ajouté à la bibliothèque.`);
}

function instantiateLibraryDevice(libraryId) {
  const entry = state.deviceLibrary.find((item) => item.id === libraryId);
  if (!entry) {
    return;
  }

  recordHistory();
  const device = {
    id: createId("device"),
    name: entry.name,
    type: entry.type,
    manufacturer: entry.manufacturer,
    model: entry.model,
    notes: entry.notes,
    color: entry.color,
    position: getNextDevicePosition(),
    ports: entry.ports.map((port) => ({
      id: createId("port"),
      kind: port.kind,
      name: port.name,
      description: port.description,
      midiChannel: isMidiKind(port.kind) ? normalizeMidiChannel(port.midiChannel, "all") : null
    }))
  };

  state.schema.devices.push(device);
  state.selectedDeviceId = device.id;
  state.selectedPortId = null;
  state.selectedConnectionId = null;
  state.helpKey = "device-details";
  persistSchema(`Appareil "${device.name}" ajouté depuis la bibliothèque.`);
  window.requestAnimationFrame(() => focusDeviceOnBoard(device.id));
}

function deleteLibraryDevice(libraryId) {
  const entry = state.deviceLibrary.find((item) => item.id === libraryId);
  if (!entry) {
    return;
  }

  const confirmed = window.confirm(
    `Supprimer "${entry.name}" de la bibliothèque ?`
  );
  if (!confirmed) {
    return;
  }

  state.deviceLibrary = state.deviceLibrary.filter((item) => item.id !== libraryId);
  persistDeviceLibrary(`"${entry.name}" a été supprimé de la bibliothèque.`);
}

function renderLegend() {
  elements.legendList.innerHTML = PORT_ORDER.map((kind) => {
    const meta = PORT_LIBRARY[kind];
    return `
      <div class="legend-chip">
        <span class="legend-swatch" style="background:${escapeAttr(meta.color)}"></span>
        <span class="legend-chip__copy">
          <strong>${escapeHtml(meta.label)}</strong>
          <span>${escapeHtml(`${meta.family} · ${meta.directionLabel} · ${meta.description}`)}</span>
        </span>
      </div>
    `;
  }).join("");
}

function renderBoard() {
  elements.board.style.width = `${state.boardSize.width}px`;
  elements.board.style.height = `${state.boardSize.height}px`;
  elements.emptyState.hidden = state.schema.devices.length > 0;

  if (state.workspaceView === "graph") {
    elements.connectionsLayer.hidden = true;
    renderLogicGraph();
    return;
  }

  elements.connectionsLayer.hidden = false;
  elements.connectionsLayer.setAttribute("width", String(state.boardSize.width));
  elements.connectionsLayer.setAttribute("height", String(state.boardSize.height));
  elements.connectionsLayer.setAttribute("viewBox", `0 0 ${state.boardSize.width} ${state.boardSize.height}`);
  elements.connectionsLayer.style.width = `${state.boardSize.width}px`;
  elements.connectionsLayer.style.height = `${state.boardSize.height}px`;

  elements.board.innerHTML = state.schema.devices
    .map((device) => {
      const grouped = groupPortsBySide(device.ports);
      const isSelected = device.id === state.selectedDeviceId;
      const compact = isDeviceCompact(device);
      const issueCount = getDeviceDiagnosticCount(device.id);
      return `
        <article
          class="device-card ${isSelected ? "is-selected" : ""} ${compact ? "is-compact" : ""}"
          data-device-card-id="${device.id}"
          style="left:${device.position.x}px; top:${device.position.y}px;"
        >
          <header class="device-card__header" data-drag-handle="${device.id}" data-help-key="board">
            <span class="device-card__accent" style="--device-accent:${escapeAttr(device.color)}; background:${escapeAttr(device.color)}"></span>
            ${renderDeviceTypeIcon(device.type, device.color, {
              className: "device-type-icon device-card__type-icon"
            })}
            <div class="device-card__title">
              <h3>${escapeHtml(device.name)}</h3>
              <p>${escapeHtml(compact ? `${device.ports.length} ports` : composeDeviceSubtitle(device))}</p>
            </div>
            ${
              issueCount
                ? `
                  <span class="device-card__alert" title="${issueCount} problème${issueCount > 1 ? "s" : ""} ou avertissement${issueCount > 1 ? "s" : ""} détecté${issueCount > 1 ? "s" : ""}">
                    ${issueCount}
                  </span>
                `
                : ""
            }
            <button
              class="text-button"
              type="button"
              data-action="toggle-device-board-view"
              data-device-id="${device.id}"
              aria-label="${compact ? "Agrandir" : "Réduire"} ${escapeAttr(device.name)}"
            >
              ${compact ? "Agrandir" : "Réduire"}
            </button>
            <button
              class="text-button"
              type="button"
              data-action="delete-device-board"
              data-device-id="${device.id}"
              aria-label="Supprimer ${escapeAttr(device.name)}"
            >
              Retirer
            </button>
          </header>

          <div class="device-card__body ${compact ? "device-card__body--compact" : ""}">
            <div class="device-card__ports device-card__ports--left">
              ${grouped.left.map((port) => renderBoardPort(device, port, { compact })).join("") || `<p class="device-card__notes">${compact ? "Aucune" : "Aucune entrée"}</p>`}
            </div>

            ${
              compact
                ? `
                  <div class="device-card__center device-card__center--compact">
                    <span class="device-card__meta">${countDeviceConnections(device.id)} liens</span>
                  </div>
                `
                : `
                  <div class="device-card__center">
                    <span class="device-card__meta">${device.ports.length} ports</span>
                    <p class="device-card__notes">${escapeHtml(device.notes || "Ajoute des notes pour décrire le rôle de l'appareil.")}</p>
                  </div>
                `
            }

            <div class="device-card__ports device-card__ports--right">
              ${grouped.right.map((port) => renderBoardPort(device, port, { compact })).join("") || `<p class="device-card__notes">${compact ? "Aucune" : "Aucune sortie"}</p>`}
            </div>
          </div>

          ${
            grouped.bottom.length
              ? `
                <div class="device-card__ports device-card__ports--bottom ${compact ? "device-card__ports--bottom-compact" : ""}">
                  ${grouped.bottom.map((port) => renderBoardPort(device, port, { compact })).join("")}
                </div>
              `
              : ""
          }
        </article>
      `;
    })
    .join("");
}

function renderBoardPort(device, port, options = {}) {
  const meta = PORT_LIBRARY[port.kind];
  const selected = state.selectedPortId === port.id && state.selectedDeviceId === device.id;
  const connectSource =
    state.connectFrom?.deviceId === device.id && state.connectFrom?.portId === port.id;
  const compatible = state.connectFrom && isCompatibleTarget(device.id, port.id);
  const dimmed =
    state.connectFrom &&
    !compatible &&
    !(state.connectFrom.deviceId === device.id && state.connectFrom.portId === port.id);
  const compact = options.compact;
  const compactSymbol = getCompactPortSymbol(port);
  const compactLabel = `${port.name} · ${buildPortMetaLine(port)}`;

  return `
    <button
      class="port-chip ${compact ? "port-chip--compact" : ""} ${selected ? "is-selected" : ""} ${connectSource ? "is-connect-source" : ""} ${compatible ? "is-compatible" : ""} ${dimmed ? "is-dimmed" : ""}"
      type="button"
      style="--port-color:${escapeAttr(meta.color)}"
      data-action="board-port"
      data-device-id="${device.id}"
      data-port-id="${port.id}"
      data-port-ref="${device.id}:${port.id}"
      data-help-key="${isMidiPort(port) ? "midi-channel" : "connect-mode"}"
      title="${escapeAttr(compactLabel)}"
      aria-label="${escapeAttr(compactLabel)}"
    >
      <span class="port-chip__dot"></span>
      ${
        compact
          ? `
            <span class="port-chip__compact-symbol">${escapeHtml(compactSymbol)}</span>
          `
          : `
            <span class="port-chip__copy">
              <strong>${escapeHtml(port.name)}</strong>
              <span>${escapeHtml(buildPortMetaLine(port))}</span>
            </span>
          `
      }
    </button>
  `;
}

function renderInspector() {
  const selectedConnection = getConnection(state.selectedConnectionId);
  if (selectedConnection) {
    elements.inspectorPanel.innerHTML = renderConnectionInspector(selectedConnection);
    return;
  }

  const selectedDevice = getDevice(state.selectedDeviceId);
  if (selectedDevice) {
    elements.inspectorPanel.innerHTML = renderDeviceInspector(selectedDevice);
    return;
  }

  elements.inspectorPanel.innerHTML = `
    <div class="placeholder-card">
      <p class="eyebrow">Inspection</p>
      <h2>Choisis un élément</h2>
      <p>
        Sélectionne un appareil, un port ou une liaison pour modifier ses détails, ajouter des ports ou ajuster le canal MIDI.
      </p>
      <ul class="shortcut-list">
        <li>Créer un appareil dans la colonne de gauche.</li>
        <li>Cliquer une sortie sur le tableau pour lancer un câblage.</li>
        <li>Exporter régulièrement en JSON pour garder des versions.</li>
      </ul>
    </div>
  `;
}

function renderDiagnostics() {
  const diagnostics = state.diagnostics || { items: [], errors: 0, warnings: 0 };
  const total = diagnostics.items.length;

  elements.diagnosticsSummary.innerHTML = `
    <div class="diagnostic-stat">
      <span class="diagnostic-stat__label">Appareils</span>
      <strong>${state.schema.devices.length}</strong>
    </div>
    <div class="diagnostic-stat">
      <span class="diagnostic-stat__label">Liaisons</span>
      <strong>${state.schema.connections.length}</strong>
    </div>
    <div class="diagnostic-stat diagnostic-stat--bad">
      <span class="diagnostic-stat__label">Erreurs</span>
      <strong>${diagnostics.errors}</strong>
    </div>
    <div class="diagnostic-stat diagnostic-stat--warn">
      <span class="diagnostic-stat__label">Avertissements</span>
      <strong>${diagnostics.warnings}</strong>
    </div>
  `;

  if (!total) {
    elements.diagnosticsList.innerHTML = `
      <div class="diagnostic-item diagnostic-item--good">
        <strong>Patch cohérent</strong>
        <span>Aucune incohérence détectée sur les liaisons ou les appareils du schéma courant.</span>
      </div>
    `;
    return;
  }

  elements.diagnosticsList.innerHTML = diagnostics.items
    .map((item) => {
      const label = item.severity === "bad" ? "Erreur" : "Avertissement";
      return `
        <button
          class="diagnostic-item diagnostic-item--${item.severity}"
          type="button"
          data-action="select-diagnostic-target"
          data-target-type="${item.targetType}"
          data-device-id="${escapeAttr(item.deviceId || "")}"
          data-port-id="${escapeAttr(item.portId || "")}"
          data-connection-id="${escapeAttr(item.connectionId || "")}"
          data-help-key="diagnostics"
        >
          <span class="diagnostic-item__topline">
            <strong>${label}</strong>
            <span>${escapeHtml(item.category)}</span>
          </span>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.detail)}</span>
        </button>
      `;
    })
    .join("");
}

function renderLogicGraph() {
  const bundle = getLogicGraphBundle();
  if (!bundle.layout.nodes.length) {
    elements.board.innerHTML = "";
    return;
  }

  const highlightState = buildLogicGraphHighlightState(bundle);
  const defs = `
    <defs>
      <marker id="logicGraphArrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
        <path d="M 1 1 L 11 6 L 1 11 z" fill="rgba(88, 102, 115, 0.65)"></path>
      </marker>
    </defs>
  `;

  const edgesMarkup = bundle.edges
    .map((edge) => {
      const source = bundle.positionById.get(edge.source);
      const target = bundle.positionById.get(edge.target);
      if (!source || !target) {
        return "";
      }

      const geometry = buildLogicGraphEdgeGeometry(source, target);
      const labelWidth = Math.max(64, Math.min(190, edge.label.length * 7.2 + 22));
      const hasHighlight = !!highlightState.highlightedEdgeKeys;
      const isHighlighted = hasHighlight && highlightState.highlightedEdgeKeys.has(edge.key);
      const isSelected =
        state.selectedConnectionId && edge.connectionIds.includes(state.selectedConnectionId);
      const edgeClasses = ["logic-graph__edge"];
      const labelClasses = ["logic-graph__edge-label"];

      if (edge.problemCount > 0) {
        edgeClasses.push("is-problem");
        labelClasses.push("is-problem");
      }
      if (isSelected) {
        edgeClasses.push("is-selected");
        labelClasses.push("is-selected");
      }
      if (hasHighlight) {
        edgeClasses.push(isHighlighted ? "is-highlighted" : "is-dimmed");
        labelClasses.push(isHighlighted ? "is-highlighted" : "is-dimmed");
      }

      return `
        <g
          class="${edgeClasses.join(" ")}"
          data-action="${edge.connectionIds.length === 1 ? "select-graph-edge" : ""}"
          data-connection-id="${edge.connectionIds.length === 1 ? edge.connectionIds[0] : ""}"
          data-help-key="graph-view"
        >
          <path
            class="logic-graph__edge-path"
            marker-end="url(#logicGraphArrow)"
            d="${geometry.path}"
          ></path>
          <g
            class="${labelClasses.join(" ")}"
            transform="translate(${geometry.labelX - labelWidth / 2} ${geometry.labelY - 13})"
          >
            <rect width="${labelWidth}" height="26" rx="13"></rect>
            <text x="${labelWidth / 2}" y="17" text-anchor="middle">${escapeHtml(edge.label)}</text>
          </g>
        </g>
      `;
    })
    .join("");

  const nodesMarkup = bundle.layout.nodes
    .map((node) => {
      const issueCount = getDeviceDiagnosticCount(node.id);
      const hasHighlight = !!highlightState.highlightedNodeIds;
      const isHighlighted = hasHighlight && highlightState.highlightedNodeIds.has(node.id);
      const isFocus = highlightState.focusDeviceId === node.id;
      const isSelected = state.selectedDeviceId === node.id;
      const classes = ["logic-graph__node"];

      if (issueCount) {
        classes.push("has-issues");
      }
      if (isSelected) {
        classes.push("is-selected");
      }
      if (isFocus) {
        classes.push("is-focus");
      }
      if (hasHighlight) {
        classes.push(isHighlighted ? "is-highlighted" : "is-dimmed");
      }

      return `
        <g
          class="${classes.join(" ")}"
          data-action="select-graph-device"
          data-device-id="${node.id}"
          data-help-key="graph-view"
          transform="translate(${node.x} ${node.y})"
        >
          <title>${escapeAttr(node.name)}</title>
          <rect width="${node.width}" height="${node.height}" rx="20"></rect>
          ${renderDeviceTypeGraphIcon(node.type, node.color, 18, 16)}
          <text class="logic-graph__node-title" x="58" y="31">${escapeHtml(node.name)}</text>
          <text class="logic-graph__node-sub" x="58" y="51">${escapeHtml(node.subtitle)}</text>
          <text class="logic-graph__node-meta" x="58" y="73">${escapeHtml(`${node.portCount} ports`)}</text>
          ${
            issueCount
              ? `
                <g class="logic-graph__node-badge" transform="translate(${node.width - 32} 16)">
                  <circle r="12" cx="0" cy="0"></circle>
                  <text x="0" y="4" text-anchor="middle">${issueCount}</text>
                </g>
              `
              : ""
          }
        </g>
      `;
    })
    .join("");

  elements.board.innerHTML = `
    <svg
      class="logic-graph"
      width="${state.boardSize.width}"
      height="${state.boardSize.height}"
      viewBox="0 0 ${state.boardSize.width} ${state.boardSize.height}"
      aria-label="Graphe logique des appareils"
      data-help-key="graph-view"
    >
      ${defs}
      <g id="logicGraphInner">${edgesMarkup}${nodesMarkup}</g>
    </svg>
  `;
}

function renderDeviceInspector(device) {
  const selectedPort = getPort(device.id, state.selectedPortId);

  return `
    <div class="inspector-card" data-help-key="device-details" data-section-id="inspector-device-details">
      <div class="section-heading">
        <div class="inspector-title">
          ${renderDeviceTypeIcon(device.type, device.color, {
            className: "device-type-icon inspector-type-icon"
          })}
          <div>
            <p class="eyebrow">${escapeHtml(getDeviceTypeLabel(device.type))}</p>
            <h2>${escapeHtml(device.name)}</h2>
          </div>
        </div>
      </div>

      <label class="field">
        <span>Nom de l'appareil</span>
        <input type="text" value="${escapeAttr(device.name)}" data-device-field="name">
      </label>

      <div class="split">
        <label class="field">
          <span>Marque / famille</span>
          <input type="text" value="${escapeAttr(device.manufacturer || "")}" data-device-field="manufacturer">
        </label>
        <label class="field">
          <span>Modèle / rôle</span>
          <input type="text" value="${escapeAttr(device.model || "")}" data-device-field="model">
        </label>
      </div>

      <div class="split">
        <label class="field">
          <span>Type d'appareil</span>
          <select data-device-field="type">
            ${renderDeviceTypeOptionsMarkup(device.type)}
          </select>
        </label>
        <label class="field">
          <span>Couleur</span>
          <input type="color" value="${escapeAttr(normalizeColor(device.color, pickAccentColor(0)))}" data-device-field="color">
        </label>
      </div>

      <div class="route-summary">
        <strong>${device.ports.length} ports</strong>
        <span>${countDeviceConnections(device.id)} liaisons liées à cet appareil.</span>
      </div>

      <label class="field">
        <span>Notes</span>
        <textarea rows="3" data-device-field="notes">${escapeHtml(device.notes || "")}</textarea>
      </label>

      <div class="toolbar-inline">
        <button
          class="action-button action-button--soft"
          type="button"
          data-action="save-device-library"
          data-device-id="${device.id}"
          data-help-key="device-library"
        >
          Sauver dans la bibliothèque
        </button>
        <button class="action-button" type="button" data-action="duplicate-device" data-device-id="${device.id}">
          Dupliquer l'appareil
        </button>
        <button class="action-button action-button--danger" type="button" data-action="delete-device" data-device-id="${device.id}">
          Supprimer l'appareil
        </button>
      </div>
    </div>

    <div class="inspector-card" data-help-key="port-list" data-section-id="inspector-port-list">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Ports</p>
          <h3>Connectique de ${escapeHtml(device.name)}</h3>
        </div>
      </div>

      <div class="port-list">
        ${
          device.ports.length
            ? device.ports
                .map((port) => renderInspectorPortButton(device, port))
                .join("")
            : `<p class="inspector-copy">Aucun port pour le moment. Utilise les boutons d'ajout rapide ci-dessous.</p>`
        }
      </div>

      <div class="section-heading">
        <div>
          <p class="eyebrow">Ajout rapide</p>
          <h3>Créer des I/O standards</h3>
        </div>
      </div>

      <div class="port-library" data-help-key="add-port">
        ${PORT_ORDER.map((kind) => renderQuickAddButton(kind)).join("")}
      </div>
    </div>

    ${
      selectedPort
        ? renderPortInspector(device, selectedPort)
        : `
          <div class="inspector-card">
            <p class="inspector-copy">
              Sélectionne un port dans la liste ci-dessus pour le renommer, changer son type ou préciser son canal MIDI.
            </p>
          </div>
        `
    }
  `;
}

function renderInspectorPortButton(device, port) {
  const meta = PORT_LIBRARY[port.kind];
  const selected = device.id === state.selectedDeviceId && port.id === state.selectedPortId;
  return `
    <button
      class="mini-action ${selected ? "is-selected" : ""}"
      type="button"
      data-action="select-port"
      data-device-id="${device.id}"
      data-port-id="${port.id}"
      data-help-key="${isMidiPort(port) ? "midi-channel" : "port-details"}"
    >
      <span class="legend-swatch" style="background:${escapeAttr(meta.color)}"></span>
      <span class="mini-action__copy">
        <strong>${escapeHtml(port.name)}</strong>
        <span>${escapeHtml(buildPortMetaLine(port))}</span>
      </span>
    </button>
  `;
}

function renderQuickAddButton(kind) {
  const meta = PORT_LIBRARY[kind];
  return `
    <button
      class="mini-action"
      type="button"
      data-action="quick-add-port"
      data-kind="${kind}"
      data-help-key="add-port"
    >
      <span class="legend-swatch" style="background:${escapeAttr(meta.color)}"></span>
      <span class="mini-action__copy">
        <strong>${escapeHtml(meta.label)}</strong>
        <span>${escapeHtml(meta.description)}</span>
      </span>
    </button>
  `;
}

function renderPortInspector(device, port) {
  const isStartable = canStartConnection(port);
  const meta = PORT_LIBRARY[port.kind];

  return `
    <div class="inspector-card" data-help-key="${isMidiPort(port) ? "midi-channel" : "port-details"}" data-section-id="inspector-selected-port">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Port sélectionné</p>
          <h3>${escapeHtml(port.name)}</h3>
        </div>
      </div>

      <label class="field">
        <span>Nom du port</span>
        <input type="text" value="${escapeAttr(port.name)}" data-port-field="name">
      </label>

      <label class="field">
        <span>Type</span>
        <select data-port-field="kind">
          ${PORT_ORDER.map((kind) => {
            const optionMeta = PORT_LIBRARY[kind];
            return `
              <option value="${kind}" ${kind === port.kind ? "selected" : ""}>
                ${escapeHtml(optionMeta.label)}
              </option>
            `;
          }).join("")}
        </select>
      </label>

      ${
        isMidiPort(port)
          ? `
            <label class="field" data-help-key="midi-channel">
              <span>Canal MIDI par défaut</span>
              <select data-port-field="midiChannel">
                ${MIDI_CHANNELS.map(
                  (option) => `
                    <option value="${option.value}" ${option.value === normalizeMidiChannel(port.midiChannel, "all") ? "selected" : ""}>
                      ${escapeHtml(option.label)}
                    </option>
                  `
                ).join("")}
              </select>
            </label>
          `
          : `
            <div class="route-summary">
              <strong>${escapeHtml(meta.family)}</strong>
              <span>${escapeHtml(meta.description)}</span>
            </div>
          `
      }

      <label class="field">
        <span>Description libre</span>
        <textarea rows="3" data-port-field="description">${escapeHtml(port.description || "")}</textarea>
      </label>

      <div class="toolbar-inline">
        ${
          isStartable
            ? `
              <button
                class="action-button"
                type="button"
                data-action="start-port-routing"
                data-device-id="${device.id}"
                data-port-id="${port.id}"
              >
                Démarrer une liaison
              </button>
            `
            : ""
        }
        <button
          class="action-button action-button--danger"
          type="button"
          data-action="delete-port"
          data-device-id="${device.id}"
          data-port-id="${port.id}"
        >
          Supprimer ce port
        </button>
      </div>
    </div>
  `;
}

function renderConnectionInspector(connection) {
  const sourceDevice = getDevice(connection.source.deviceId);
  const targetDevice = getDevice(connection.target.deviceId);
  const sourcePort = getPort(connection.source.deviceId, connection.source.portId);
  const targetPort = getPort(connection.target.deviceId, connection.target.portId);

  if (!sourceDevice || !targetDevice || !sourcePort || !targetPort) {
    return `
      <div class="placeholder-card">
        <p class="inspector-copy">Cette liaison n'est plus valide. Recharge le schéma ou supprime-la.</p>
      </div>
    `;
  }

  const meta = PORT_LIBRARY[sourcePort.kind];
  const problem = getConnectionProblem(connection, sourcePort, targetPort);

  return `
    <div class="inspector-card" data-help-key="connection-details" data-section-id="inspector-connection">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Liaison</p>
          <h2>${escapeHtml(sourceDevice.name)} → ${escapeHtml(targetDevice.name)}</h2>
        </div>
      </div>

      <div class="route-summary">
        <strong>${escapeHtml(sourcePort.name)} → ${escapeHtml(targetPort.name)}</strong>
        <span>${escapeHtml(meta.family)} · ${escapeHtml(meta.directionLabel)} vers ${escapeHtml(PORT_LIBRARY[targetPort.kind].directionLabel.toLowerCase())}</span>
      </div>

      ${
        problem
          ? `
            <div class="problem-banner">
              <strong>${escapeHtml(problem.title)}</strong>
              <span>${escapeHtml(problem.detail)}</span>
            </div>
          `
          : ""
      }

      <label class="field">
        <span>Libellé de la liaison</span>
        <input type="text" value="${escapeAttr(connection.label || "")}" data-connection-field="label">
      </label>

      ${
        isMidiPort(sourcePort) && isMidiPort(targetPort)
          ? `
            <label class="field" data-help-key="midi-channel">
              <span>Canal MIDI sur cette liaison</span>
              <select data-connection-field="midiChannel">
                ${MIDI_CONNECTION_CHANNELS.map(
                  (option) => `
                    <option value="${option.value}" ${option.value === normalizeConnectionMidiChannel(connection.midiChannel) ? "selected" : ""}>
                      ${escapeHtml(option.label)}
                    </option>
                  `
                ).join("")}
              </select>
            </label>
          `
          : ""
      }

      <label class="field">
        <span>Notes</span>
        <textarea rows="3" data-connection-field="notes">${escapeHtml(connection.notes || "")}</textarea>
      </label>

      <button
        class="action-button action-button--danger"
        type="button"
        data-action="delete-connection"
        data-connection-id="${connection.id}"
      >
        Supprimer la liaison
      </button>
    </div>
  `;
}

function renderHelp() {
  const help = HELP_CONTENT[state.helpKey] || HELP_CONTENT.overview;
  elements.helpTitle.textContent = help.title;
  elements.helpBody.textContent = help.body;
  elements.helpTips.innerHTML = help.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");
}

function renderConnections() {
  if (state.workspaceView !== "board") {
    elements.connectionsLayer.innerHTML = "";
    elements.connectionsLayer.hidden = true;
    return;
  }

  const pointMap = new Map();
  const wrapperRect = elements.boardWrapper.getBoundingClientRect();

  elements.board.querySelectorAll("[data-port-ref]").forEach((node) => {
    const rect = node.getBoundingClientRect();
    pointMap.set(node.dataset.portRef, {
      x: rect.left - wrapperRect.left + elements.boardWrapper.scrollLeft + rect.width / 2,
      y: rect.top - wrapperRect.top + elements.boardWrapper.scrollTop + rect.height / 2
    });
  });

  const connectionMarkup = state.schema.connections
    .map((connection) => {
      const sourcePort = getPort(connection.source.deviceId, connection.source.portId);
      const targetPort = getPort(connection.target.deviceId, connection.target.portId);
      if (!sourcePort || !targetPort) {
        return "";
      }

      const sourcePoint = pointMap.get(`${connection.source.deviceId}:${connection.source.portId}`);
      const targetPoint = pointMap.get(`${connection.target.deviceId}:${connection.target.portId}`);
      if (!sourcePoint || !targetPoint) {
        return "";
      }

      const path = buildCurvePath(sourcePoint, targetPoint);
      const problem = getConnectionProblem(connection, sourcePort, targetPort);
      const label = problem?.badge || buildConnectionLabel(connection, sourcePort, targetPort);
      const isSelected = connection.id === state.selectedConnectionId;
      const badgeMarkup = label
        ? renderConnectionBadge(label, sourcePoint, targetPoint, { problem: Boolean(problem) })
        : "";

      return `
        <g class="connection-set ${isSelected ? "is-selected" : ""} ${problem ? "is-problem" : ""}">
          <path
            class="connection-hit"
            d="${path}"
            data-action="select-connection"
            data-connection-id="${connection.id}"
          ></path>
          <path
            class="connection-path"
            d="${path}"
            stroke="${problem ? "#c1322a" : PORT_LIBRARY[sourcePort.kind].color}"
          ></path>
          ${badgeMarkup}
        </g>
      `;
    })
    .join("");

  const tempMarkup = renderTempConnection(pointMap);

  elements.connectionsLayer.innerHTML = `${connectionMarkup}${tempMarkup}`;
}

function renderTempConnection(pointMap) {
  if (!state.connectFrom || !state.tempPoint) {
    return "";
  }

  const sourcePoint = pointMap.get(`${state.connectFrom.deviceId}:${state.connectFrom.portId}`);
  if (!sourcePoint) {
    return "";
  }

  const sourcePort = getPort(state.connectFrom.deviceId, state.connectFrom.portId);
  if (!sourcePort) {
    return "";
  }

  return `
    <path
      class="connection-path"
      d="${buildCurvePath(sourcePoint, state.tempPoint)}"
      stroke="${PORT_LIBRARY[sourcePort.kind].color}"
      stroke-dasharray="10 8"
      opacity="0.56"
    ></path>
  `;
}

function renderConnectionBadge(label, sourcePoint, targetPoint, options = {}) {
  const width = Math.max(48, label.length * 7 + 20);
  const midX = (sourcePoint.x + targetPoint.x) / 2;
  const midY = (sourcePoint.y + targetPoint.y) / 2;
  return `
    <g class="connection-badge ${options.problem ? "connection-badge--problem" : ""}" transform="translate(${midX - width / 2}, ${midY - 14})">
      <rect width="${width}" height="28" rx="14"></rect>
      <text x="${width / 2}" y="18" text-anchor="middle">${escapeHtml(label)}</text>
    </g>
  `;
}

function persistSchema(message, options = {}) {
  state.schema.meta.updatedAt = new Date().toISOString();
  state.lastSavedAt = new Date(state.schema.meta.updatedAt);

  try {
    localStorage.setItem(STORAGE_KEY, serializeSchema());
  } catch (error) {
    console.error(error);
    if (!options.silentToast) {
      showToast("La sauvegarde locale a échoué. Exporte le JSON pour sécuriser ton travail.");
    }
  }

  render();

  if (message && !options.silentToast) {
    showToast(message);
  }
}

function persistDeviceLibrary(message) {
  try {
    localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(normalizeDeviceLibrary(state.deviceLibrary)));
  } catch (error) {
    console.error(error);
    showToast("La sauvegarde de la bibliothèque a échoué.");
    return;
  }

  renderLibrary();
  if (message) {
    showToast(message);
  }
}

function getStructureSignature() {
  return JSON.stringify({
    devices: state.schema.devices.map((device) => ({
      id: device.id,
      name: device.name,
      type: normalizeDeviceType(device.type),
      manufacturer: device.manufacturer || "",
      model: device.model || "",
      ports: device.ports.map((port) => ({
        id: port.id,
        kind: port.kind,
        name: port.name,
        midiChannel: isMidiKind(port.kind) ? normalizeMidiChannel(port.midiChannel, "all") : null
      }))
    })),
    connections: state.schema.connections.map((connection) => ({
      id: connection.id,
      source: connection.source,
      target: connection.target,
      label: connection.label || "",
      midiChannel: normalizeConnectionMidiChannel(connection.midiChannel)
    }))
  });
}

function getDiagnosticsReport() {
  const signature = getStructureSignature();
  if (
    state.cache.diagnosticsResult &&
    state.cache.diagnosticsSignature === signature
  ) {
    return state.cache.diagnosticsResult;
  }

  const report = buildDiagnosticsReport();
  state.cache.structureSignature = signature;
  state.cache.diagnosticsSignature = signature;
  state.cache.diagnosticsResult = report;
  return report;
}

function snapshotCurrentSchema() {
  return JSON.stringify(normalizeSchema(state.schema));
}

function parseSchemaSnapshot(snapshot) {
  return normalizeSchema(JSON.parse(snapshot));
}

function recordHistory() {
  const snapshot = snapshotCurrentSchema();
  const lastSnapshot = state.history.past[state.history.past.length - 1];
  if (snapshot === lastSnapshot) {
    state.history.future = [];
    return;
  }

  state.history.past.push(snapshot);
  if (state.history.past.length > 120) {
    state.history.past.shift();
  }
  state.history.future = [];
}

function canUndoHistory() {
  return state.history.past.length > 0;
}

function canRedoHistory() {
  return state.history.future.length > 0;
}

function undoHistory() {
  if (!canUndoHistory()) {
    showToast("Aucune action à annuler.");
    return;
  }

  const currentSnapshot = snapshotCurrentSchema();
  const previousSnapshot = state.history.past.pop();
  state.history.future.push(currentSnapshot);
  state.schema = parseSchemaSnapshot(previousSnapshot);
  cancelConnectionMode({ announce: false });
  persistSchema("Action annulée.");
}

function redoHistory() {
  if (!canRedoHistory()) {
    showToast("Aucune action à rétablir.");
    return;
  }

  const currentSnapshot = snapshotCurrentSchema();
  const nextSnapshot = state.history.future.pop();
  state.history.past.push(currentSnapshot);
  state.schema = parseSchemaSnapshot(nextSnapshot);
  cancelConnectionMode({ announce: false });
  persistSchema("Action rétablie.");
}

function loadSchemaFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return normalizeSchema(JSON.parse(raw));
  } catch (error) {
    console.error(error);
    return null;
  }
}

function loadDeviceLibraryFromStorage() {
  try {
    const raw = localStorage.getItem(LIBRARY_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return normalizeDeviceLibrary(JSON.parse(raw));
  } catch (error) {
    console.error(error);
    return [];
  }
}

function serializeSchema() {
  return JSON.stringify(normalizeSchema(state.schema), null, 2);
}

function serializeDeviceLibraryExport() {
  return JSON.stringify(buildDeviceLibraryExport(), null, 2);
}

function buildDeviceLibraryExport() {
  return {
    type: "routage-studio-library",
    version: LIBRARY_VERSION,
    exportedAt: new Date().toISOString(),
    app: APP_NAME,
    items: normalizeDeviceLibrary(state.deviceLibrary)
  };
}

function normalizeSchema(input) {
  const now = new Date().toISOString();
  const rawTitle = cleanText(input?.meta?.title);
  const rawDescription = cleanText(input?.meta?.description);
  const meta = {
    title: !rawTitle || LEGACY_DEFAULT_TITLES.has(rawTitle) ? APP_NAME : rawTitle,
    description:
      !rawDescription || LEGACY_DEFAULT_DESCRIPTIONS.has(rawDescription)
        ? DEFAULT_SCHEMA_DESCRIPTION
        : rawDescription,
    createdAt: input?.meta?.createdAt || now,
    updatedAt: input?.meta?.updatedAt || now
  };

  const devices = Array.isArray(input?.devices)
    ? input.devices.map((device, index) => normalizeDevice(device, index))
    : [];

  const seen = new Set();
  const connections = Array.isArray(input?.connections)
    ? input.connections
        .map((connection) => normalizeConnection(connection))
        .filter((connection) => {
          const hasEnoughIdentity =
            connection.source.deviceId ||
            connection.source.portId ||
            connection.target.deviceId ||
            connection.target.portId;
          if (!hasEnoughIdentity) {
            return false;
          }

          const key = [
            connection.source.deviceId,
            connection.source.portId,
            connection.target.deviceId,
            connection.target.portId
          ].join(":");
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        })
    : [];

  return {
    version: SCHEMA_VERSION,
    meta,
    devices,
    connections
  };
}

function normalizeDeviceLibrary(input) {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.map((entry, index) => ({
    id: cleanText(entry?.id) || `library-${index + 1}`,
    name: cleanText(entry?.name) || `Appareil ${index + 1}`,
    type: normalizeDeviceType(entry?.type),
    manufacturer: cleanText(entry?.manufacturer),
    model: cleanText(entry?.model),
    notes: cleanText(entry?.notes),
    color: normalizeColor(entry?.color, pickAccentColor(index)),
    ports: Array.isArray(entry?.ports)
      ? entry.ports.map((port) => ({
          kind: PORT_LIBRARY[port?.kind] ? port.kind : "audio-in",
          name: cleanText(port?.name) || PORT_LIBRARY[PORT_LIBRARY[port?.kind] ? port.kind : "audio-in"].label,
          description: cleanText(port?.description),
          midiChannel: isMidiKind(port?.kind) ? normalizeMidiChannel(port?.midiChannel, "all") : null
        }))
      : []
  }));
}

function createLibraryEntryFromDevice(device) {
  return {
    id: createId("library"),
    name: device.name,
    type: normalizeDeviceType(device.type),
    manufacturer: device.manufacturer || "",
    model: device.model || "",
    notes: device.notes || "",
    color: normalizeColor(device.color, pickAccentColor(0)),
    ports: device.ports.map((port) => ({
      kind: port.kind,
      name: port.name,
      description: port.description || "",
      midiChannel: isMidiKind(port.kind) ? normalizeMidiChannel(port.midiChannel, "all") : null
    }))
  };
}

function extractDeviceLibraryEntries(input) {
  if (Array.isArray(input)) {
    return normalizeDeviceLibrary(input);
  }

  const list = [input?.items, input?.library, input?.deviceLibrary, input?.devices].find((value) =>
    Array.isArray(value)
  );
  return normalizeDeviceLibrary(list);
}

function mergeDeviceLibraryEntries(existingEntries, importedEntries) {
  const currentEntries = normalizeDeviceLibrary(existingEntries);
  const nextEntries = normalizeDeviceLibrary(importedEntries);
  const existingByIdentity = new Map(
    currentEntries.map((entry) => [getLibraryEntryIdentity(entry), entry])
  );
  const importedIdentities = new Set();
  let added = 0;
  let replaced = 0;

  const mergedImported = nextEntries.map((entry) => {
    const identity = getLibraryEntryIdentity(entry);
    const existing = existingByIdentity.get(identity);
    importedIdentities.add(identity);

    if (existing) {
      replaced += 1;
    } else {
      added += 1;
    }

    return {
      ...entry,
      id: existing?.id || createId("library")
    };
  });

  const preserved = currentEntries.filter(
    (entry) => !importedIdentities.has(getLibraryEntryIdentity(entry))
  );

  return {
    entries: [...mergedImported, ...preserved],
    added,
    replaced
  };
}

function getLibraryEntryIdentity(entry) {
  return [entry?.name, entry?.type, entry?.manufacturer, entry?.model]
    .map((value) => cleanText(value).toLowerCase())
    .join("::");
}

function normalizeDevice(device, index) {
  return {
    id: cleanText(device?.id) || createId("device"),
    name: cleanText(device?.name) || `Appareil ${index + 1}`,
    type: normalizeDeviceType(device?.type),
    manufacturer: cleanText(device?.manufacturer),
    model: cleanText(device?.model),
    notes: cleanText(device?.notes),
    color: normalizeColor(device?.color, pickAccentColor(index)),
    boardView: device?.boardView === "compact" ? "compact" : "full",
    position: {
      x: clampNumber(device?.position?.x, 80 + (index % 3) * 360, 32, 2600),
      y: clampNumber(device?.position?.y, 80 + Math.floor(index / 3) * 260, 32, 1800)
    },
    ports: Array.isArray(device?.ports)
      ? device.ports.map((port) => normalizePort(port))
      : []
  };
}

function normalizePort(port) {
  const kind = PORT_LIBRARY[port?.kind] ? port.kind : "audio-in";
  return {
    id: cleanText(port?.id) || createId("port"),
    kind,
    name: cleanText(port?.name) || PORT_LIBRARY[kind].label,
    description: cleanText(port?.description),
    midiChannel: isMidiKind(kind) ? normalizeMidiChannel(port?.midiChannel, "all") : null
  };
}

function isDeviceCompact(device) {
  return device?.boardView === "compact";
}

function normalizeConnection(connection) {
  return {
    id: cleanText(connection?.id) || createId("connection"),
    source: {
      deviceId: cleanText(connection?.source?.deviceId),
      portId: cleanText(connection?.source?.portId)
    },
    target: {
      deviceId: cleanText(connection?.target?.deviceId),
      portId: cleanText(connection?.target?.portId)
    },
    label: cleanText(connection?.label),
    notes: cleanText(connection?.notes),
    midiChannel: connection?.midiChannel == null ? null : normalizeConnectionMidiChannel(connection.midiChannel)
  };
}

function getLogicGraphBundle() {
  const signature = getStructureSignature();
  if (state.cache.graphBundle && state.cache.graphSignature === signature) {
    return state.cache.graphBundle;
  }

  const bundle = buildLogicGraphBundle();
  state.cache.structureSignature = signature;
  state.cache.graphSignature = signature;
  state.cache.graphBundle = bundle;
  return bundle;
}

function buildLogicGraphBundle() {
  const nodes = state.schema.devices.map((device) => ({
    id: device.id,
    name: device.name,
    type: normalizeDeviceType(device.type),
    color: device.color,
    subtitle: composeDeviceSubtitle(device),
    portCount: device.ports.length
  }));
  const deviceMap = new Map(state.schema.devices.map((device) => [device.id, device]));
  const edgeGroups = new Map();

  state.schema.connections.forEach((connection) => {
    const sourceDevice = deviceMap.get(connection.source.deviceId);
    const targetDevice = deviceMap.get(connection.target.deviceId);
    if (!sourceDevice || !targetDevice) {
      return;
    }

    const sourcePort = getPort(connection.source.deviceId, connection.source.portId);
    const targetPort = getPort(connection.target.deviceId, connection.target.portId);
    const key = `${sourceDevice.id}=>${targetDevice.id}`;
    if (!edgeGroups.has(key)) {
      edgeGroups.set(key, {
        key,
        source: sourceDevice.id,
        target: targetDevice.id,
        connectionIds: [],
        labels: [],
        familyCounts: new Map(),
        problemCount: 0
      });
    }

    const edgeGroup = edgeGroups.get(key);
    edgeGroup.connectionIds.push(connection.id);
    if (connection.label) {
      edgeGroup.labels.push(connection.label);
    }

    const family = sourcePort
      ? PORT_LIBRARY[sourcePort.kind].family
      : targetPort
        ? PORT_LIBRARY[targetPort.kind].family
        : "Liaison";
    edgeGroup.familyCounts.set(family, (edgeGroup.familyCounts.get(family) || 0) + 1);

    if (getConnectionProblem(connection, sourcePort, targetPort)) {
      edgeGroup.problemCount += 1;
    }
  });

  const edges = [...edgeGroups.values()].map((edgeGroup) => ({
    key: edgeGroup.key,
    source: edgeGroup.source,
    target: edgeGroup.target,
    connectionIds: edgeGroup.connectionIds,
    problemCount: edgeGroup.problemCount,
    label: buildLogicGraphEdgeLabel(edgeGroup)
  }));
  const layout = buildLogicGraphLayout({ nodes, edges });
  const positionById = new Map(layout.nodes.map((node) => [node.id, node]));
  const forwardMap = new Map(nodes.map((node) => [node.id, new Set()]));
  const reverseMap = new Map(nodes.map((node) => [node.id, new Set()]));

  edges.forEach((edge) => {
    forwardMap.get(edge.source)?.add(edge.target);
    reverseMap.get(edge.target)?.add(edge.source);
  });

  return {
    nodes,
    edges,
    layout,
    positionById,
    forwardMap,
    reverseMap
  };
}

function buildLogicGraphEdgeLabel(edgeGroup) {
  if (edgeGroup.connectionIds.length === 1 && edgeGroup.labels.length === 1) {
    return edgeGroup.labels[0];
  }

  const familyParts = [...edgeGroup.familyCounts.entries()]
    .sort(([left], [right]) => left.localeCompare(right, "fr"))
    .map(([family, count]) => (count > 1 ? `${family} ×${count}` : family));

  const parts = familyParts.slice(0, 3);
  if (familyParts.length > 3) {
    parts.push(`+${familyParts.length - 3}`);
  }

  const label = parts.join(" · ") || `${edgeGroup.connectionIds.length} liaisons`;
  return edgeGroup.problemCount > 0 ? `${label} !` : label;
}

function buildLogicGraphLayout(data) {
  const nodeWidth = 252;
  const nodeHeight = 96;
  const paddingX = 90;
  const paddingY = 80;
  const colGap = 320;
  const rowGap = 132;

  if (!data.nodes.length) {
    return {
      nodes: [],
      edges: data.edges,
      width: 1200,
      height: 760
    };
  }

  const adjacency = new Map(data.nodes.map((node) => [node.id, []]));
  const indegree = new Map(data.nodes.map((node) => [node.id, 0]));

  data.edges.forEach((edge) => {
    if (edge.source === edge.target) {
      return;
    }
    adjacency.get(edge.source)?.push(edge.target);
    indegree.set(edge.target, (indegree.get(edge.target) || 0) + 1);
  });

  const roots = data.nodes
    .filter((node) => (indegree.get(node.id) || 0) === 0)
    .map((node) => node.id);
  const orderedIds = data.nodes
    .map((node) => node.id)
    .sort((left, right) => left.localeCompare(right, "fr"));
  const levelById = new Map();

  const traverseFrom = (seedId, seedLevel) => {
    const queue = [{ id: seedId, level: seedLevel }];
    if (!levelById.has(seedId)) {
      levelById.set(seedId, seedLevel);
    }

    while (queue.length) {
      const current = queue.shift();
      (adjacency.get(current.id) || []).forEach((targetId) => {
        if (levelById.has(targetId)) {
          return;
        }
        const nextLevel = current.level + 1;
        levelById.set(targetId, nextLevel);
        queue.push({ id: targetId, level: nextLevel });
      });
    }
  };

  const initialSeeds = roots.length ? roots : orderedIds.slice(0, 1);
  initialSeeds.forEach((seedId) => traverseFrom(seedId, 0));

  orderedIds.forEach((nodeId) => {
    if (levelById.has(nodeId)) {
      return;
    }
    const fallbackLevel = Math.max(...levelById.values(), 0) + 1;
    traverseFrom(nodeId, fallbackLevel);
  });

  const columns = [];
  data.nodes.forEach((node) => {
    const level = levelById.get(node.id) || 0;
    columns[level] ||= [];
    columns[level].push(node);
  });

  columns.forEach((nodes) => {
    nodes.sort((left, right) => left.name.localeCompare(right.name, "fr"));
  });

  const maxRows = Math.max(...columns.map((column) => column?.length || 0), 1);
  const totalGraphHeight = nodeHeight + (maxRows - 1) * rowGap;
  const positionedNodes = [];

  columns.forEach((column, level) => {
    if (!column?.length) {
      return;
    }

    const columnHeight = nodeHeight + (column.length - 1) * rowGap;
    const startY = paddingY + (totalGraphHeight - columnHeight) / 2;
    column.forEach((node, index) => {
      positionedNodes.push({
        ...node,
        x: paddingX + level * colGap,
        y: startY + index * rowGap,
        width: nodeWidth,
        height: nodeHeight
      });
    });
  });

  return {
    nodes: positionedNodes,
    edges: data.edges,
    width: Math.max(760, paddingX * 2 + nodeWidth + Math.max(columns.length - 1, 0) * colGap),
    height: Math.max(520, paddingY * 2 + totalGraphHeight)
  };
}

function collectReachableDeviceIds(startId, adjacencyMap) {
  const visited = new Set();
  const queue = [startId];

  while (queue.length) {
    const currentId = queue.shift();
    (adjacencyMap.get(currentId) || []).forEach((nextId) => {
      if (visited.has(nextId) || nextId === startId) {
        return;
      }
      visited.add(nextId);
      queue.push(nextId);
    });
  }

  return visited;
}

function buildLogicGraphHighlightState(bundle) {
  if (state.selectedConnectionId) {
    const selectedEdge = bundle.edges.find((edge) =>
      edge.connectionIds.includes(state.selectedConnectionId)
    );
    if (!selectedEdge) {
      return {
        highlightedNodeIds: null,
        highlightedEdgeKeys: null,
        focusDeviceId: null
      };
    }

    return {
      highlightedNodeIds: new Set([selectedEdge.source, selectedEdge.target]),
      highlightedEdgeKeys: new Set([selectedEdge.key]),
      focusDeviceId: selectedEdge.source
    };
  }

  const focusDeviceId = state.selectedDeviceId;
  if (!focusDeviceId || !bundle.positionById.has(focusDeviceId)) {
    return {
      highlightedNodeIds: null,
      highlightedEdgeKeys: null,
      focusDeviceId: null
    };
  }

  const ancestors = collectReachableDeviceIds(focusDeviceId, bundle.reverseMap);
  const descendants = collectReachableDeviceIds(focusDeviceId, bundle.forwardMap);
  const highlightedNodeIds = new Set([...ancestors, ...descendants, focusDeviceId]);
  const highlightedEdgeKeys = new Set(
    bundle.edges
      .filter(
        (edge) =>
          highlightedNodeIds.has(edge.source) && highlightedNodeIds.has(edge.target)
      )
      .map((edge) => edge.key)
  );

  return {
    highlightedNodeIds,
    highlightedEdgeKeys,
    focusDeviceId
  };
}

function buildLogicGraphEdgeGeometry(source, target) {
  if (source.id === target.id) {
    const startX = source.x + source.width - 8;
    const startY = source.y + source.height / 2 - 12;
    const endX = source.x + source.width - 8;
    const endY = source.y + source.height / 2 + 12;
    const controlX = source.x + source.width + 82;
    const controlYTop = source.y - 36;
    return {
      path: `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`,
      labelX: controlX - 6,
      labelY: controlYTop + 36
    };
  }

  const startX = source.x + source.width;
  const startY = source.y + source.height / 2;
  const endX = target.x;
  const endY = target.y + target.height / 2;
  const curve = Math.max(64, Math.abs(endX - startX) * 0.35);

  return {
    path: `M ${startX} ${startY} C ${startX + curve} ${startY}, ${endX - curve} ${endY}, ${endX} ${endY}`,
    labelX: (startX + endX) / 2,
    labelY: (startY + endY) / 2
  };
}

function updateBoardSize() {
  const wrapperWidth = elements.boardWrapper.clientWidth || 1100;
  const wrapperHeight = elements.boardWrapper.clientHeight || 760;
  if (state.workspaceView === "graph") {
    const bundle = getLogicGraphBundle();
    state.boardSize = {
      width: Math.max(wrapperWidth + 180, bundle.layout.width),
      height: Math.max(wrapperHeight + 160, bundle.layout.height)
    };
    return;
  }

  const maxX = state.schema.devices.reduce((acc, device) => Math.max(acc, device.position.x + 360), 1200);
  const maxY = state.schema.devices.reduce((acc, device) => Math.max(acc, device.position.y + 260), 840);

  state.boardSize = {
    width: Math.max(wrapperWidth + 340, maxX + 180),
    height: Math.max(wrapperHeight + 260, maxY + 180)
  };
}

function centerBoard(animate = true) {
  const bounds = state.workspaceView === "graph" ? getLogicGraphBounds() : getSchemaBounds();
  const left = Math.max(bounds.centerX - elements.boardWrapper.clientWidth / 2, 0);
  const top = Math.max(bounds.centerY - elements.boardWrapper.clientHeight / 2, 0);
  elements.boardWrapper.scrollTo({
    left,
    top,
    behavior: animate ? "smooth" : "auto"
  });
}

function focusDeviceOnBoard(deviceId, animate = true) {
  const device = getDevice(deviceId);
  if (!device) {
    return;
  }

  const left = Math.max(device.position.x - 140, 0);
  const top = Math.max(device.position.y - 120, 0);
  elements.boardWrapper.scrollTo({
    left,
    top,
    behavior: animate ? "smooth" : "auto"
  });
}

function focusDeviceOnGraph(deviceId, animate = true) {
  const bundle = getLogicGraphBundle();
  const node = bundle.positionById.get(deviceId);
  if (!node) {
    return;
  }

  const left = Math.max(node.x + node.width / 2 - elements.boardWrapper.clientWidth / 2, 0);
  const top = Math.max(node.y + node.height / 2 - elements.boardWrapper.clientHeight / 2, 0);
  elements.boardWrapper.scrollTo({
    left,
    top,
    behavior: animate ? "smooth" : "auto"
  });
}

function focusDeviceInActiveView(deviceId, animate = true) {
  if (state.workspaceView === "graph") {
    focusDeviceOnGraph(deviceId, animate);
    return;
  }
  focusDeviceOnBoard(deviceId, animate);
}

function getSchemaBounds() {
  if (!state.schema.devices.length) {
    return {
      centerX: state.boardSize.width / 2,
      centerY: state.boardSize.height / 2
    };
  }

  const positions = state.schema.devices.map((device) => ({
    minX: device.position.x,
    minY: device.position.y,
    maxX: device.position.x + 320,
    maxY: device.position.y + 220
  }));

  const minX = Math.min(...positions.map((entry) => entry.minX));
  const minY = Math.min(...positions.map((entry) => entry.minY));
  const maxX = Math.max(...positions.map((entry) => entry.maxX));
  const maxY = Math.max(...positions.map((entry) => entry.maxY));

  return {
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2
  };
}

function getLogicGraphBounds() {
  const bundle = getLogicGraphBundle();
  if (!bundle.layout.nodes.length) {
    return {
      centerX: state.boardSize.width / 2,
      centerY: state.boardSize.height / 2
    };
  }

  return {
    centerX: bundle.layout.width / 2,
    centerY: bundle.layout.height / 2
  };
}

function ensureSelectionValidity() {
  if (state.selectedDeviceId && !getDevice(state.selectedDeviceId)) {
    state.selectedDeviceId = null;
    state.selectedPortId = null;
  }

  if (state.selectedPortId && !getPort(state.selectedDeviceId, state.selectedPortId)) {
    state.selectedPortId = null;
  }

  if (state.selectedConnectionId && !getConnection(state.selectedConnectionId)) {
    state.selectedConnectionId = null;
  }

  if (state.connectFrom && !getPort(state.connectFrom.deviceId, state.connectFrom.portId)) {
    state.connectFrom = null;
    state.tempPoint = null;
  }
}

function buildPortMetaLine(port) {
  const meta = PORT_LIBRARY[port.kind];
  const parts = [`${meta.family} · ${meta.directionLabel}`];
  if (isMidiPort(port)) {
    parts.push(
      normalizeMidiChannel(port.midiChannel, "all") === "all"
        ? "Tous canaux"
        : `Ch ${normalizeMidiChannel(port.midiChannel, "all")}`
    );
  }
  return parts.join(" · ");
}

function getCompactPortSymbol(port) {
  const symbols = {
    "audio-in": "A<",
    "audio-out": "A>",
    "midi-in": "M<",
    "midi-out": "M>",
    "midi-thru": "M>>",
    "gate-in": "G<",
    "gate-out": "G>",
    "cv-in": "CV<",
    "cv-out": "CV>",
    "clock-in": "CLK<",
    "clock-out": "CLK>",
    usb: "USB"
  };

  return symbols[port.kind] || PORT_LIBRARY[port.kind]?.family || "?";
}

function getEffectiveMidiChannel(connection, sourcePort) {
  const override = normalizeConnectionMidiChannel(connection?.midiChannel);
  if (override !== "inherit") {
    return override;
  }
  return normalizeMidiChannel(sourcePort?.midiChannel, "all");
}

function isSpecificMidiChannel(value) {
  return /^(?:[1-9]|1[0-6])$/.test(String(value));
}

function getConnectionProblem(connection, sourcePortParam, targetPortParam) {
  const sourcePort =
    sourcePortParam || getPort(connection?.source?.deviceId, connection?.source?.portId);
  const targetPort =
    targetPortParam || getPort(connection?.target?.deviceId, connection?.target?.portId);

  if (!sourcePort || !targetPort) {
    return {
      title: "Liaison incomplète",
      detail: "Cette liaison pointe vers un appareil ou un port manquant, renommé ou supprimé.",
      badge: "Port manquant"
    };
  }

  const sourceMeta = PORT_LIBRARY[sourcePort.kind];
  const targetMeta = PORT_LIBRARY[targetPort.kind];

  if (sourceMeta.group !== targetMeta.group) {
    return {
      title: "Types de ports incompatibles",
      detail: `Cette liaison relie ${sourceMeta.family} vers ${targetMeta.family}. Les liaisons doivent rester dans la même famille de ports.`,
      badge: "Incompatible"
    };
  }

  if (!canConnectPorts(sourcePort, targetPort)) {
    return {
      title: "Sens de liaison invalide",
      detail: `Cette liaison relie ${sourceMeta.label} vers ${targetMeta.label}. Il faut partir d'une sortie, d'un thru ou d'un port USB, puis viser une entrée compatible.`,
      badge: "Sens invalide"
    };
  }

  if (sourceMeta.group === "midi" && targetMeta.group === "midi") {
    const sourceChannel = getEffectiveMidiChannel(connection, sourcePort);
    const targetChannel = normalizeMidiChannel(targetPort.midiChannel, "all");

    if (
      isSpecificMidiChannel(sourceChannel) &&
      isSpecificMidiChannel(targetChannel) &&
      sourceChannel !== targetChannel
    ) {
      return {
        title: "Canaux MIDI incompatibles",
        detail: `Le port source envoie sur le canal ${sourceChannel} alors que la destination écoute le canal ${targetChannel}.`,
        badge: `Ch ${sourceChannel} ≠ ${targetChannel}`
      };
    }
  }

  return null;
}

function buildConnectionLabel(connection, sourcePort, targetPort) {
  const family = PORT_LIBRARY[sourcePort.kind].family;
  if (connection.label) {
    return connection.label;
  }

  if (isMidiPort(sourcePort) && isMidiPort(targetPort)) {
    const channel = normalizeConnectionMidiChannel(connection.midiChannel);
    if (channel === "inherit") {
      if (normalizeMidiChannel(sourcePort.midiChannel, "all") === "all") {
        return family;
      }
      return `${family} Ch ${normalizeMidiChannel(sourcePort.midiChannel, "all")}`;
    }
    if (channel === "all") {
      return `${family} All`;
    }
    return `${family} Ch ${channel}`;
  }

  return family;
}

function buildDiagnosticsReport() {
  const report = {
    items: [],
    errors: 0,
    warnings: 0,
    deviceCounts: {}
  };
  const portUseCounts = new Map();
  const deviceConnectionCounts = new Map(state.schema.devices.map((device) => [device.id, 0]));
  const deviceNames = new Map();

  state.schema.connections.forEach((connection) => {
    const sourceDevice = getDevice(connection.source.deviceId);
    const targetDevice = getDevice(connection.target.deviceId);

    if (sourceDevice) {
      deviceConnectionCounts.set(
        sourceDevice.id,
        (deviceConnectionCounts.get(sourceDevice.id) || 0) + 1
      );
    }
    if (targetDevice) {
      deviceConnectionCounts.set(
        targetDevice.id,
        (deviceConnectionCounts.get(targetDevice.id) || 0) + 1
      );
    }

    const sourceKey = `${connection.source.deviceId}:${connection.source.portId}`;
    const targetKey = `${connection.target.deviceId}:${connection.target.portId}`;
    portUseCounts.set(sourceKey, (portUseCounts.get(sourceKey) || 0) + 1);
    portUseCounts.set(targetKey, (portUseCounts.get(targetKey) || 0) + 1);
  });

  state.schema.devices.forEach((device) => {
    const normalizedName = cleanText(device.name).toLowerCase();
    if (normalizedName) {
      if (!deviceNames.has(normalizedName)) {
        deviceNames.set(normalizedName, []);
      }
      deviceNames.get(normalizedName).push(device);
    }

    if (!device.ports.length) {
      addDiagnostic(report, {
        severity: "warn",
        category: "Appareil vide",
        title: `${device.name} n'a encore aucun port`,
        detail: "Ajoute ses entrées et sorties pour pouvoir l'utiliser dans le tableau visuel.",
        targetType: "device",
        deviceId: device.id,
        relatedDeviceIds: [device.id]
      });
      return;
    }

    if ((deviceConnectionCounts.get(device.id) || 0) === 0) {
      addDiagnostic(report, {
        severity: "warn",
        category: "Appareil isolé",
        title: `${device.name} n'est relié à rien`,
        detail: "Cet appareil possède des ports mais aucune liaison active dans le schéma courant.",
        targetType: "device",
        deviceId: device.id,
        relatedDeviceIds: [device.id]
      });
    }

    const duplicatePortNames = new Map();
    device.ports.forEach((port) => {
      const normalizedPortName = cleanText(port.name).toLowerCase();
      if (!normalizedPortName) {
        return;
      }
      if (!duplicatePortNames.has(normalizedPortName)) {
        duplicatePortNames.set(normalizedPortName, []);
      }
      duplicatePortNames.get(normalizedPortName).push(port);
    });

    duplicatePortNames.forEach((ports, normalizedPortName) => {
      if (ports.length < 2) {
        return;
      }
      addDiagnostic(report, {
        severity: "warn",
        category: "Nommage",
        title: `${device.name} contient plusieurs ports "${ports[0].name}"`,
        detail: "Des noms de ports identiques peuvent compliquer la lecture du patch et des diagnostics.",
        targetType: "device",
        deviceId: device.id,
        relatedDeviceIds: [device.id]
      });
    });

    const unusedPorts = device.ports.filter(
      (port) => (portUseCounts.get(`${device.id}:${port.id}`) || 0) === 0
    );
    if (
      unusedPorts.length > 0 &&
      unusedPorts.length < device.ports.length &&
      (deviceConnectionCounts.get(device.id) || 0) > 0
    ) {
      const preview = unusedPorts
        .slice(0, 3)
        .map((port) => port.name)
        .join(", ");
      addDiagnostic(report, {
        severity: "warn",
        category: "Ports inutilisés",
        title: `${device.name} possède ${unusedPorts.length} port${unusedPorts.length > 1 ? "s" : ""} non utilisé${unusedPorts.length > 1 ? "s" : ""}`,
        detail: `Ports sans liaison: ${preview}${unusedPorts.length > 3 ? ", ..." : ""}.`,
        targetType: "device",
        deviceId: device.id,
        relatedDeviceIds: [device.id]
      });
    }
  });

  deviceNames.forEach((devices) => {
    if (devices.length < 2) {
      return;
    }
    addDiagnostic(report, {
      severity: "warn",
      category: "Nommage",
      title: `Nom d'appareil dupliqué : ${devices[0].name}`,
      detail: "Plusieurs appareils portent exactement le même nom. Les différencier aidera pour le routing et les diagnostics.",
      targetType: "device",
      deviceId: devices[0].id,
      relatedDeviceIds: devices.map((device) => device.id)
    });
  });

  state.schema.connections.forEach((connection) => {
    const sourcePort = getPort(connection.source.deviceId, connection.source.portId);
    const targetPort = getPort(connection.target.deviceId, connection.target.portId);
    const problem = getConnectionProblem(connection, sourcePort, targetPort);
    if (!problem) {
      return;
    }

    addDiagnostic(report, {
      severity: "bad",
      category: "Liaison",
      title: problem.title,
      detail: problem.detail,
      targetType: "connection",
      connectionId: connection.id,
      deviceId: connection.source.deviceId,
      relatedDeviceIds: [connection.source.deviceId, connection.target.deviceId]
    });
  });

  const inputsMap = new Map();
  state.schema.connections.forEach((connection) => {
    const targetPort = getPort(connection.target.deviceId, connection.target.portId);
    if (!targetPort) {
      return;
    }
    const meta = PORT_LIBRARY[targetPort.kind];
    if (meta.direction !== "input") {
      return;
    }
    const key = `${connection.target.deviceId}:${connection.target.portId}`;
    if (!inputsMap.has(key)) {
      inputsMap.set(key, []);
    }
    inputsMap.get(key).push(connection);
  });

  inputsMap.forEach((connections) => {
    if (connections.length < 2) {
      return;
    }

    const targetConnection = connections[0];
    const targetDevice = getDevice(targetConnection.target.deviceId);
    const targetPort = getPort(targetConnection.target.deviceId, targetConnection.target.portId);
    if (!targetDevice || !targetPort) {
      return;
    }

    const sourceNames = connections
      .map((connection) => getDevice(connection.source.deviceId)?.name || "Source inconnue")
      .join(", ");

    addDiagnostic(report, {
      severity: "bad",
      category: "Conflit d'entrée",
      title: `${targetDevice.name} / ${targetPort.name} reçoit plusieurs sources`,
      detail: `Plusieurs liaisons arrivent sur cette entrée: ${sourceNames}. Vérifie qu'il ne s'agit pas d'un câblage impossible ou ambigu.`,
      targetType: "port",
      deviceId: targetDevice.id,
      portId: targetPort.id,
      relatedDeviceIds: [targetDevice.id, ...connections.map((connection) => connection.source.deviceId)]
    });
  });

  const usbPairs = new Map();
  state.schema.connections.forEach((connection) => {
    const sourcePort = getPort(connection.source.deviceId, connection.source.portId);
    const targetPort = getPort(connection.target.deviceId, connection.target.portId);
    if (!sourcePort || !targetPort) {
      return;
    }
    if (PORT_LIBRARY[sourcePort.kind].group !== "usb" || PORT_LIBRARY[targetPort.kind].group !== "usb") {
      return;
    }

    const pairKey = [
      `${connection.source.deviceId}:${connection.source.portId}`,
      `${connection.target.deviceId}:${connection.target.portId}`
    ]
      .sort()
      .join("<->");

    if (!usbPairs.has(pairKey)) {
      usbPairs.set(pairKey, []);
    }
    usbPairs.get(pairKey).push(connection);
  });

  usbPairs.forEach((connections) => {
    if (connections.length < 2) {
      return;
    }

    addDiagnostic(report, {
      severity: "bad",
      category: "USB en double",
      title: "Même liaison USB déclarée plusieurs fois",
      detail: "Deux connexions USB ou plus décrivent le même couple de ports. Une seule liaison suffit normalement pour ce lien physique.",
      targetType: "connection",
      connectionId: connections[0].id,
      deviceId: connections[0].source.deviceId,
      relatedDeviceIds: [
        ...new Set(
          connections.flatMap((connection) => [
            connection.source.deviceId,
            connection.target.deviceId
          ])
        )
      ]
    });
  });

  report.items.sort((a, b) => {
    const severityRank = { bad: 0, warn: 1 };
    return (severityRank[a.severity] ?? 9) - (severityRank[b.severity] ?? 9);
  });

  return report;
}

function addDiagnostic(report, item) {
  report.items.push(item);
  if (item.severity === "bad") {
    report.errors += 1;
  } else if (item.severity === "warn") {
    report.warnings += 1;
  }

  (item.relatedDeviceIds || []).forEach((deviceId) => {
    if (!deviceId) {
      return;
    }
    report.deviceCounts[deviceId] = (report.deviceCounts[deviceId] || 0) + 1;
  });
}

function getDeviceDiagnosticCount(deviceId) {
  return state.diagnostics?.deviceCounts?.[deviceId] || 0;
}

function getSelectionLabel() {
  if (state.selectedConnectionId) {
    const connection = getConnection(state.selectedConnectionId);
    if (!connection) {
      return "Aucune sélection";
    }
    const sourceDevice = getDevice(connection.source.deviceId);
    const targetDevice = getDevice(connection.target.deviceId);
    return `Liaison: ${sourceDevice?.name || "?"} → ${targetDevice?.name || "?"}`;
  }

  if (state.selectedPortId && state.selectedDeviceId) {
    const device = getDevice(state.selectedDeviceId);
    const port = getPort(state.selectedDeviceId, state.selectedPortId);
    return port && device ? `Port: ${device.name} / ${port.name}` : "Aucune sélection";
  }

  if (state.selectedDeviceId) {
    const device = getDevice(state.selectedDeviceId);
    return device ? `Appareil: ${device.name}` : "Aucune sélection";
  }

  return "Aucun élément sélectionné";
}

function buildShareSummary() {
  return [
    `${state.schema.meta.title || APP_NAME}`,
    state.schema.meta.description || DEFAULT_SCHEMA_DESCRIPTION,
    `${state.schema.devices.length} appareils`,
    `${state.schema.connections.length} liaisons`
  ].join(" · ");
}

function canStartConnection(port) {
  if (!port) {
    return false;
  }
  const direction = PORT_LIBRARY[port.kind].direction;
  return direction === "output" || direction === "thru" || direction === "multi";
}

function canConnectPorts(sourcePort, targetPort) {
  if (!sourcePort || !targetPort) {
    return false;
  }

  const sourceMeta = PORT_LIBRARY[sourcePort.kind];
  const targetMeta = PORT_LIBRARY[targetPort.kind];

  if (sourceMeta.group !== targetMeta.group) {
    return false;
  }

  if (sourceMeta.direction === "multi" && targetMeta.direction === "multi") {
    return true;
  }

  return (
    (sourceMeta.direction === "output" || sourceMeta.direction === "thru") &&
    targetMeta.direction === "input"
  );
}

function connectionsShareSameRoute(existingConnection, candidateConnection, sourcePort, targetPort) {
  const sameDirection =
    existingConnection.source.deviceId === candidateConnection.source.deviceId &&
    existingConnection.source.portId === candidateConnection.source.portId &&
    existingConnection.target.deviceId === candidateConnection.target.deviceId &&
    existingConnection.target.portId === candidateConnection.target.portId;

  if (sameDirection) {
    return true;
  }

  if (!sourcePort || !targetPort) {
    return false;
  }

  const sourceMeta = PORT_LIBRARY[sourcePort.kind];
  const targetMeta = PORT_LIBRARY[targetPort.kind];
  if (sourceMeta.direction !== "multi" || targetMeta.direction !== "multi") {
    return false;
  }

  return (
    existingConnection.source.deviceId === candidateConnection.target.deviceId &&
    existingConnection.source.portId === candidateConnection.target.portId &&
    existingConnection.target.deviceId === candidateConnection.source.deviceId &&
    existingConnection.target.portId === candidateConnection.source.portId
  );
}

function isCompatibleTarget(deviceId, portId) {
  if (!state.connectFrom) {
    return false;
  }

  const sourcePort = getPort(state.connectFrom.deviceId, state.connectFrom.portId);
  const targetPort = getPort(deviceId, portId);
  if (!sourcePort || !targetPort) {
    return false;
  }

  return canConnectPorts(sourcePort, targetPort);
}

function groupPortsBySide(ports) {
  return ports.reduce(
    (accumulator, port) => {
      const direction = PORT_LIBRARY[port.kind].direction;
      if (direction === "input") {
        accumulator.left.push(port);
      } else if (direction === "multi") {
        accumulator.bottom.push(port);
      } else {
        accumulator.right.push(port);
      }
      return accumulator;
    },
    { left: [], right: [], bottom: [] }
  );
}

function getPortCenter(deviceId, portId) {
  const node = elements.board.querySelector(`[data-port-ref="${deviceId}:${portId}"]`);
  if (!node) {
    return {
      x: state.boardSize.width / 2,
      y: state.boardSize.height / 2
    };
  }

  const rect = node.getBoundingClientRect();
  const wrapperRect = elements.boardWrapper.getBoundingClientRect();
  return {
    x: rect.left - wrapperRect.left + elements.boardWrapper.scrollLeft + rect.width / 2,
    y: rect.top - wrapperRect.top + elements.boardWrapper.scrollTop + rect.height / 2
  };
}

function buildCurvePath(sourcePoint, targetPoint) {
  const distance = Math.max(Math.abs(targetPoint.x - sourcePoint.x) * 0.45, 92);
  return [
    `M ${sourcePoint.x} ${sourcePoint.y}`,
    `C ${sourcePoint.x + distance} ${sourcePoint.y},`,
    `${targetPoint.x - distance} ${targetPoint.y},`,
    `${targetPoint.x} ${targetPoint.y}`
  ].join(" ");
}

function countDeviceConnections(deviceId) {
  return state.schema.connections.filter(
    (connection) =>
      connection.source.deviceId === deviceId || connection.target.deviceId === deviceId
  ).length;
}

function getNextPortName(device, kind) {
  const label = PORT_LIBRARY[kind].label;
  const sameKind = device.ports.filter((port) => port.kind === kind).length;
  return sameKind === 0 ? label : `${label} ${sameKind + 1}`;
}

function composeDeviceSubtitle(device) {
  const typeLabel = getDeviceTypeLabel(device.type);
  const identity = [device.manufacturer, device.model].filter(Boolean);
  return identity.length ? `${typeLabel} · ${identity.join(" · ")}` : typeLabel;
}

function getNextDevicePosition() {
  return getDeviceGridPosition(state.schema.devices.length);
}

function getDeviceGridPosition(index) {
  return {
    x: 80 + (index % 3) * 360,
    y: 80 + Math.floor(index / 3) * 260
  };
}

function getDevice(deviceId) {
  return state.schema.devices.find((device) => device.id === deviceId) || null;
}

function getPort(deviceId, portId) {
  const device = getDevice(deviceId);
  return device?.ports.find((port) => port.id === portId) || null;
}

function getConnection(connectionId) {
  return state.schema.connections.find((connection) => connection.id === connectionId) || null;
}

function createEmptySchema() {
  const now = new Date().toISOString();
  return {
    version: SCHEMA_VERSION,
    meta: {
      title: APP_NAME,
      description: DEFAULT_SCHEMA_DESCRIPTION,
      createdAt: now,
      updatedAt: now
    },
    devices: [],
    connections: []
  };
}

function createPort(kind, name) {
  return {
    id: createId("port"),
    kind,
    name,
    description: "",
    midiChannel: isMidiKind(kind) ? "all" : null
  };
}

function createSampleSchema() {
  const now = new Date().toISOString();

  const sampler = {
    id: "device-sampler",
    name: "Sampler",
    type: "sampler",
    manufacturer: "Elektron",
    model: "Centre du live set",
    notes: "Machine principale pour les patterns et les samples.",
    color: "#0f766e",
    position: { x: 80, y: 110 },
    ports: [
      { id: "sampler-audio-out-l", kind: "audio-out", name: "Main Out L", description: "", midiChannel: null },
      { id: "sampler-audio-out-r", kind: "audio-out", name: "Main Out R", description: "", midiChannel: null },
      { id: "sampler-midi-out", kind: "midi-out", name: "MIDI Out", description: "", midiChannel: "1" },
      { id: "sampler-clock-in", kind: "clock-in", name: "Clock In", description: "", midiChannel: null },
      { id: "sampler-usb", kind: "usb", name: "USB", description: "", midiChannel: null }
    ]
  };

  const synth = {
    id: "device-synth",
    name: "Synthé desktop",
    type: "synth",
    manufacturer: "ASM",
    model: "Voix polyphonique",
    notes: "Reçoit le MIDI du sampler et repart en audio mono.",
    color: "#2f6fd0",
    position: { x: 500, y: 80 },
    ports: [
      { id: "synth-midi-in", kind: "midi-in", name: "MIDI In", description: "", midiChannel: "1" },
      { id: "synth-audio-out", kind: "audio-out", name: "Main Out", description: "", midiChannel: null },
      { id: "synth-usb", kind: "usb", name: "USB", description: "", midiChannel: null }
    ]
  };

  const modular = {
    id: "device-modular",
    name: "Rack modulaire",
    type: "modular",
    manufacturer: "Eurorack",
    model: "Séquence et modulation",
    notes: "Distribue CV, gate et horloge.",
    color: "#b93838",
    position: { x: 520, y: 380 },
    ports: [
      { id: "mod-clock-out", kind: "clock-out", name: "Clock Out", description: "", midiChannel: null },
      { id: "mod-cv-out", kind: "cv-out", name: "Pitch CV Out", description: "", midiChannel: null },
      { id: "mod-gate-out", kind: "gate-out", name: "Gate Out", description: "", midiChannel: null },
      { id: "mod-usb", kind: "usb", name: "USB", description: "", midiChannel: null }
    ]
  };

  const drum = {
    id: "device-drum",
    name: "Drum module",
    type: "drum-machine",
    manufacturer: "Percussions",
    model: "Triggers externes",
    notes: "Reçoit gate et clock du rack modulaire.",
    color: "#d97706",
    position: { x: 930, y: 360 },
    ports: [
      { id: "drum-gate-in", kind: "gate-in", name: "Trig In", description: "", midiChannel: null },
      { id: "drum-clock-in", kind: "clock-in", name: "Clock In", description: "", midiChannel: null },
      { id: "drum-audio-out", kind: "audio-out", name: "Audio Out", description: "", midiChannel: null }
    ]
  };

  const interfaceAudio = {
    id: "device-interface",
    name: "Interface audio",
    type: "audio-interface",
    manufacturer: "Studio",
    model: "Capture et monitoring",
    notes: "Centralise les entrées audio et relie l'ordinateur en USB.",
    color: "#2a7c5a",
    position: { x: 960, y: 80 },
    ports: [
      { id: "int-audio-in-1", kind: "audio-in", name: "Input 1", description: "", midiChannel: null },
      { id: "int-audio-in-2", kind: "audio-in", name: "Input 2", description: "", midiChannel: null },
      { id: "int-audio-in-3", kind: "audio-in", name: "Input 3", description: "", midiChannel: null },
      { id: "int-midi-in", kind: "midi-in", name: "MIDI In", description: "", midiChannel: "all" },
      { id: "int-midi-out", kind: "midi-out", name: "MIDI Out", description: "", midiChannel: "all" },
      { id: "int-usb", kind: "usb", name: "USB", description: "", midiChannel: null }
    ]
  };

  return normalizeSchema({
    version: SCHEMA_VERSION,
    meta: {
      title: "Exemple de setup live",
      description:
        "Configuration de démonstration mêlant sampler, synthé, rack modulaire, module de batterie et interface audio.",
      createdAt: now,
      updatedAt: now
    },
    devices: [sampler, synth, modular, drum, interfaceAudio],
    connections: [
      {
        id: "connection-sampler-midi-synth",
        source: { deviceId: "device-sampler", portId: "sampler-midi-out" },
        target: { deviceId: "device-synth", portId: "synth-midi-in" },
        label: "",
        notes: "Pilotage principal des notes.",
        midiChannel: "inherit"
      },
      {
        id: "connection-sampler-audio-left",
        source: { deviceId: "device-sampler", portId: "sampler-audio-out-l" },
        target: { deviceId: "device-interface", portId: "int-audio-in-1" },
        label: "Main L",
        notes: "",
        midiChannel: null
      },
      {
        id: "connection-sampler-audio-right",
        source: { deviceId: "device-sampler", portId: "sampler-audio-out-r" },
        target: { deviceId: "device-interface", portId: "int-audio-in-2" },
        label: "Main R",
        notes: "",
        midiChannel: null
      },
      {
        id: "connection-synth-audio",
        source: { deviceId: "device-synth", portId: "synth-audio-out" },
        target: { deviceId: "device-interface", portId: "int-audio-in-3" },
        label: "",
        notes: "Retour du synthé desktop.",
        midiChannel: null
      },
      {
        id: "connection-clock",
        source: { deviceId: "device-modular", portId: "mod-clock-out" },
        target: { deviceId: "device-drum", portId: "drum-clock-in" },
        label: "",
        notes: "",
        midiChannel: null
      },
      {
        id: "connection-gate",
        source: { deviceId: "device-modular", portId: "mod-gate-out" },
        target: { deviceId: "device-drum", portId: "drum-gate-in" },
        label: "",
        notes: "Déclenchement du module de batterie.",
        midiChannel: null
      },
      {
        id: "connection-usb-sampler-interface",
        source: { deviceId: "device-sampler", portId: "sampler-usb" },
        target: { deviceId: "device-interface", portId: "int-usb" },
        label: "",
        notes: "Accès à l'ordinateur hôte via l'interface.",
        midiChannel: null
      },
      {
        id: "connection-usb-modular-interface",
        source: { deviceId: "device-modular", portId: "mod-usb" },
        target: { deviceId: "device-interface", portId: "int-usb" },
        label: "",
        notes: "",
        midiChannel: null
      }
    ]
  });
}

function showToast(message) {
  if (!message) {
    return;
  }

  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2400);
}

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? String(value) : fallback;
}

function normalizeMidiChannel(value, fallback) {
  const raw = String(value ?? fallback);
  if (raw === "all") {
    return "all";
  }
  if (/^(?:[1-9]|1[0-6])$/.test(raw)) {
    return raw;
  }
  return fallback;
}

function normalizeConnectionMidiChannel(value) {
  const raw = String(value ?? "inherit");
  if (raw === "inherit" || raw === "all") {
    return raw;
  }
  return /^(?:[1-9]|1[0-6])$/.test(raw) ? raw : "inherit";
}

function isMidiKind(kind) {
  return PORT_LIBRARY[kind]?.group === "midi";
}

function isMidiPort(port) {
  return isMidiKind(port?.kind);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampNumber(value, fallback, min, max) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return clamp(numeric, min, max);
}

function pickAccentColor(index) {
  return DEVICE_ACCENTS[index % DEVICE_ACCENTS.length];
}

function normalizeDeviceType(value) {
  return DEVICE_TYPE_LIBRARY[value] ? value : "other";
}

function getDeviceTypeMeta(value) {
  return DEVICE_TYPE_LIBRARY[normalizeDeviceType(value)];
}

function getDeviceTypeLabel(value) {
  return getDeviceTypeMeta(value).label;
}

function renderDeviceTypeOptionsMarkup(selectedValue) {
  const normalized = normalizeDeviceType(selectedValue);
  return DEVICE_TYPE_OPTIONS.map(
    (entry) => `
      <option value="${entry.value}" ${entry.value === normalized ? "selected" : ""}>
        ${escapeHtml(entry.label)}
      </option>
    `
  ).join("");
}

function renderDeviceTypeIcon(type, color, options = {}) {
  const meta = getDeviceTypeMeta(type);
  const className = options.className || "device-type-icon";
  return `
    <span
      class="${className}"
      style="--device-type-color:${escapeAttr(normalizeColor(color, pickAccentColor(0)))}"
      title="${escapeAttr(meta.label)}"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" role="presentation">
        ${renderDeviceTypeIconInner(meta.value)}
      </svg>
    </span>
  `;
}

function renderDeviceTypeGraphIcon(type, color, x, y) {
  return `
    <g
      class="logic-graph__node-icon"
      transform="translate(${x} ${y})"
      style="color:${escapeAttr(normalizeColor(color, pickAccentColor(0)))}"
      aria-hidden="true"
    >
      <rect class="logic-graph__node-icon-frame" x="0" y="0" width="28" height="28" rx="10"></rect>
      <g transform="translate(2 2)">
        ${renderDeviceTypeIconInner(type)}
      </g>
    </g>
  `;
}

function renderDeviceTypeIconInner(type) {
  switch (normalizeDeviceType(type)) {
    case "synth":
      return `
        <rect x="2.5" y="7.5" width="17" height="9" rx="2"></rect>
        <path d="M6 16.5V9.5M9.75 16.5V9.5M13.5 16.5V9.5M17.25 16.5V9.5"></path>
      `;
    case "drum-machine":
      return `
        <rect x="3" y="4.5" width="16" height="15" rx="3"></rect>
        <rect x="6" y="8" width="3" height="3" rx="0.8"></rect>
        <rect x="10.5" y="8" width="3" height="3" rx="0.8"></rect>
        <rect x="15" y="8" width="2.5" height="3" rx="0.8"></rect>
        <rect x="6" y="12.5" width="3" height="3" rx="0.8"></rect>
        <rect x="10.5" y="12.5" width="3" height="3" rx="0.8"></rect>
        <circle cx="16.5" cy="14" r="1.5"></circle>
      `;
    case "groovebox":
      return `
        <rect x="3" y="4.5" width="16" height="15" rx="3"></rect>
        <circle cx="7" cy="8" r="1.4"></circle>
        <circle cx="11" cy="8" r="1.4"></circle>
        <path d="M14.5 7.5h2.8"></path>
        <rect x="5.5" y="11.5" width="3" height="3" rx="0.8"></rect>
        <rect x="9.5" y="11.5" width="3" height="3" rx="0.8"></rect>
        <rect x="13.5" y="11.5" width="3" height="3" rx="0.8"></rect>
      `;
    case "sampler":
      return `
        <rect x="3" y="5" width="16" height="14" rx="3"></rect>
        <path d="M5.5 12c1.2 0 1.2-3 2.4-3s1.2 6 2.4 6 1.2-4 2.4-4 1.2 2 2.4 2 1.2-1 2.4-1"></path>
      `;
    case "keyboard":
      return `
        <path d="M3 9.5h18v6.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <path d="M6 16V10M9 16V10M12 16V10M15 16V10M18 16V10"></path>
      `;
    case "modular":
      return `
        <rect x="4" y="4" width="6" height="16" rx="2"></rect>
        <rect x="14" y="4" width="6" height="16" rx="2"></rect>
        <circle cx="7" cy="9" r="1.4"></circle>
        <circle cx="7" cy="15" r="1.4"></circle>
        <circle cx="17" cy="9" r="1.4"></circle>
        <circle cx="17" cy="15" r="1.4"></circle>
        <path d="M8.4 10.2c2.8 1.2 4.4 1.2 7.2 0"></path>
        <path d="M8.4 13.8c2.8-1.2 4.4-1.2 7.2 0"></path>
      `;
    case "sequencer":
      return `
        <path d="M4 17.5h16"></path>
        <rect x="5" y="11" width="2.2" height="4.5" rx="0.8"></rect>
        <rect x="9" y="8.5" width="2.2" height="7" rx="0.8"></rect>
        <rect x="13" y="10" width="2.2" height="5.5" rx="0.8"></rect>
        <rect x="17" y="7" width="2.2" height="8.5" rx="0.8"></rect>
        <path d="M4.5 6.5h3"></path>
      `;
    case "midi-controller":
      return `
        <rect x="3" y="5" width="18" height="14" rx="3"></rect>
        <circle cx="7" cy="9" r="1.3"></circle>
        <circle cx="12" cy="9" r="1.3"></circle>
        <circle cx="17" cy="9" r="1.3"></circle>
        <path d="M6 18v-4M9 18v-4M12 18v-4M15 18v-4M18 18v-4"></path>
      `;
    case "mixer":
      return `
        <path d="M6 5v14M12 5v14M18 5v14"></path>
        <rect x="4.3" y="8.3" width="3.4" height="2.6" rx="1.2"></rect>
        <rect x="10.3" y="12" width="3.4" height="2.6" rx="1.2"></rect>
        <rect x="16.3" y="6.8" width="3.4" height="2.6" rx="1.2"></rect>
      `;
    case "audio-interface":
      return `
        <rect x="3" y="6" width="18" height="12" rx="3"></rect>
        <circle cx="8" cy="12" r="2"></circle>
        <circle cx="14" cy="12" r="2"></circle>
        <circle cx="18" cy="12" r="1"></circle>
      `;
    case "effects":
      return `
        <rect x="5" y="4.5" width="14" height="15" rx="3"></rect>
        <path d="M8 10.5c1 0 1-.8 2-.8s1 .8 2 .8 1-.8 2-.8 1 .8 2 .8"></path>
        <circle cx="12" cy="15.5" r="1.8"></circle>
      `;
    case "pedalboard":
      return `
        <rect x="3" y="13" width="18" height="6" rx="2"></rect>
        <rect x="4.5" y="6" width="4.2" height="7" rx="1.4"></rect>
        <rect x="9.9" y="5" width="4.2" height="8" rx="1.4"></rect>
        <rect x="15.3" y="6.8" width="4.2" height="6.2" rx="1.4"></rect>
      `;
    case "guitar-bass":
      return `
        <path d="M14.5 4.5c.7 1.4 1.9 2.6 3.5 3.3"></path>
        <path d="M13.5 6.5l-3 3v5.8a2.7 2.7 0 1 1-2 0V11l3-3"></path>
        <circle cx="8.5" cy="18" r="2.7"></circle>
        <circle cx="10.5" cy="15.5" r="1.2"></circle>
      `;
    case "microphone":
      return `
        <rect x="8" y="4" width="8" height="10" rx="4"></rect>
        <path d="M12 14v4"></path>
        <path d="M8 18h8"></path>
        <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0"></path>
      `;
    case "monitor":
      return `
        <path d="M5.5 19h13"></path>
        <path d="M7 17l1.5-10h7L17 17"></path>
        <circle cx="12" cy="11" r="2.7"></circle>
        <circle cx="12" cy="11" r="1"></circle>
      `;
    case "computer":
      return `
        <rect x="4" y="5" width="16" height="11" rx="2.2"></rect>
        <path d="M9 19h6"></path>
        <path d="M12 16v3"></path>
      `;
    case "recorder":
      return `
        <rect x="4" y="5" width="16" height="14" rx="3"></rect>
        <circle cx="9" cy="10" r="2.1"></circle>
        <circle cx="15" cy="10" r="2.1"></circle>
        <path d="M8 15.5h8"></path>
      `;
    default:
      return `
        <rect x="4" y="5" width="16" height="14" rx="3"></rect>
        <path d="M8 9h8M8 12h8M8 15h5"></path>
      `;
  }
}

function slugify(value) {
  return String(value || APP_NAME)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function downloadJsonText(text, filename) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
