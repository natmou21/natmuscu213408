/* Données du catalogue (généré). Les identifiants ne doivent pas changer : les séances les utilisent. */
const MUSCLES = [
 {
  "id": "chest",
  "name": "Pectoraux",
  "side": "front"
 },
 {
  "id": "lats",
  "name": "Grand dorsal",
  "side": "back"
 },
 {
  "id": "upperBack",
  "name": "Haut du dos",
  "side": "back"
 },
 {
  "id": "traps",
  "name": "Trapèzes",
  "side": "back"
 },
 {
  "id": "lowerBack",
  "name": "Lombaires",
  "side": "back"
 },
 {
  "id": "frontDelts",
  "name": "Deltoïde antérieur",
  "side": "front"
 },
 {
  "id": "sideDelts",
  "name": "Deltoïde latéral",
  "side": "front"
 },
 {
  "id": "rearDelts",
  "name": "Deltoïde postérieur",
  "side": "back"
 },
 {
  "id": "biceps",
  "name": "Biceps",
  "side": "front"
 },
 {
  "id": "triceps",
  "name": "Triceps",
  "side": "back"
 },
 {
  "id": "forearms",
  "name": "Avant-bras",
  "side": "front"
 },
 {
  "id": "abs",
  "name": "Abdominaux",
  "side": "front"
 },
 {
  "id": "obliques",
  "name": "Obliques",
  "side": "front"
 },
 {
  "id": "glutes",
  "name": "Fessiers",
  "side": "back"
 },
 {
  "id": "quads",
  "name": "Quadriceps",
  "side": "front"
 },
 {
  "id": "hamstrings",
  "name": "Ischio-jambiers",
  "side": "back"
 },
 {
  "id": "adductors",
  "name": "Adducteurs",
  "side": "front"
 },
 {
  "id": "calves",
  "name": "Mollets",
  "side": "back"
 }
];

const CATEGORIES = [
 {
  "id": "pec",
  "name": "Pectoraux",
  "muscles": [
   "chest"
  ]
 },
 {
  "id": "dos",
  "name": "Dos",
  "muscles": [
   "lats",
   "upperBack",
   "traps",
   "lowerBack"
  ]
 },
 {
  "id": "epaules",
  "name": "Épaules",
  "muscles": [
   "frontDelts",
   "sideDelts",
   "rearDelts"
  ]
 },
 {
  "id": "bras",
  "name": "Bras",
  "muscles": [
   "biceps",
   "triceps",
   "forearms"
  ]
 },
 {
  "id": "abdos",
  "name": "Abdos",
  "muscles": [
   "abs",
   "obliques"
  ]
 },
 {
  "id": "jambes",
  "name": "Jambes",
  "muscles": [
   "glutes",
   "quads",
   "hamstrings",
   "adductors",
   "calves"
  ]
 }
];

const EQUIPMENTS = ["Barre", "Haltères", "Machine", "Poulie", "Poids du corps", "Kettlebell", "Autre"];

const EXERCISES = [
 {
  "id": "developpe-couche-barre",
  "name": "Développé couché (barre)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps"
  ],
  "equipment": "Barre",
  "category": "pec",
  "tip": "Omoplates serrées, pieds bien ancrés. Descends la barre au milieu des pectoraux, coudes à environ 45° du buste, puis pousse sans trop cambrer."
 },
 {
  "id": "developpe-incline-halteres",
  "name": "Développé incliné (haltères)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps"
  ],
  "equipment": "Haltères",
  "category": "pec",
  "tip": "Banc incliné à 30°. Descends jusqu'à sentir l'étirement des pectoraux, puis pousse en rapprochant les haltères en haut."
 },
 {
  "id": "developpe-decline-barre",
  "name": "Développé décliné (barre)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "triceps",
   "frontDelts"
  ],
  "equipment": "Barre",
  "category": "pec",
  "tip": "Banc légèrement décliné. La barre descend vers le bas des pectoraux. Contrôle la descente et garde les poignets alignés."
 },
 {
  "id": "ecartes-halteres",
  "name": "Écartés (haltères)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts"
  ],
  "equipment": "Haltères",
  "category": "pec",
  "tip": "Coudes légèrement fléchis et fixes. Ouvre en arc de cercle jusqu'à l'étirement, puis ramène en serrant les pectoraux."
 },
 {
  "id": "pompes",
  "name": "Pompes",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps",
   "abs"
  ],
  "equipment": "Poids du corps",
  "category": "pec",
  "tip": "Corps gainé comme une planche, coudes à 45°. Descends la poitrine près du sol et pousse sans cambrer."
 },
 {
  "id": "pec-deck-butterfly",
  "name": "Pec deck (butterfly)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts"
  ],
  "equipment": "Machine",
  "category": "pec",
  "tip": "Dos plaqué, avant-bras sur les coussins. Serre au centre sans décoller les épaules du dossier."
 },
 {
  "id": "ecartes-poulie-vis-a-vis",
  "name": "Écartés poulie vis-à-vis",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts"
  ],
  "equipment": "Poulie",
  "category": "pec",
  "tip": "Un pas en avant, buste légèrement penché. Ramène les mains devant toi en les croisant légèrement en fin de mouvement."
 },
 {
  "id": "dips-pectoraux",
  "name": "Dips (pectoraux)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "triceps",
   "frontDelts"
  ],
  "equipment": "Poids du corps",
  "category": "pec",
  "tip": "Buste penché vers l'avant, coudes légèrement écartés. Descends jusqu'à l'étirement des pectoraux puis repousse."
 },
 {
  "id": "tractions-pronation",
  "name": "Tractions pronation",
  "primary": [
   "lats"
  ],
  "secondary": [
   "upperBack",
   "biceps",
   "forearms"
  ],
  "equipment": "Poids du corps",
  "category": "dos",
  "tip": "Prise un peu plus large que les épaules. Sors la poitrine et tire le menton au-dessus de la barre en descendant les coudes."
 },
 {
  "id": "tractions-supination-chin-ups",
  "name": "Tractions supination (chin-ups)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "biceps",
   "upperBack"
  ],
  "equipment": "Poids du corps",
  "category": "dos",
  "tip": "Paumes vers toi, prise à la largeur des épaules. Monte la poitrine vers la barre et contrôle la descente."
 },
 {
  "id": "tirage-vertical-poitrine",
  "name": "Tirage vertical (poitrine)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "biceps",
   "upperBack"
  ],
  "equipment": "Poulie",
  "category": "dos",
  "tip": "Penche-toi légèrement en arrière, tire la barre vers le haut de la poitrine en abaissant les coudes, sans balancer le buste."
 },
 {
  "id": "tirage-poulie-bras-tendus",
  "name": "Tirage poulie bras tendus",
  "primary": [
   "lats"
  ],
  "secondary": [
   "triceps"
  ],
  "equipment": "Poulie",
  "category": "dos",
  "tip": "Bras presque tendus, descends la barre vers les cuisses en contractant les dorsaux. Seules les épaules bougent."
 },
 {
  "id": "pull-over-haltere",
  "name": "Pull-over (haltère)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "chest",
   "triceps"
  ],
  "equipment": "Haltères",
  "category": "dos",
  "tip": "Allongé en travers du banc, bras quasi tendus. Amène l'haltère derrière la tête en gardant les côtes serrées."
 },
 {
  "id": "rowing-haltere-un-bras",
  "name": "Rowing haltère un bras",
  "primary": [
   "lats"
  ],
  "secondary": [
   "upperBack",
   "biceps",
   "rearDelts"
  ],
  "equipment": "Haltères",
  "category": "dos",
  "tip": "Une main et un genou sur le banc, dos à plat. Tire le coude vers la hanche, sans tourner le buste."
 },
 {
  "id": "rowing-barre-buste-penche",
  "name": "Rowing barre (buste penché)",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "lats",
   "lowerBack",
   "biceps",
   "rearDelts"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Buste penché à environ 45°, dos plat. Tire la barre vers le nombril en serrant les omoplates."
 },
 {
  "id": "tirage-horizontal-poulie-basse",
  "name": "Tirage horizontal (poulie basse)",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "lats",
   "biceps",
   "rearDelts"
  ],
  "equipment": "Poulie",
  "category": "dos",
  "tip": "Assis, dos droit. Tire la poignée vers le ventre en serrant les omoplates, sans te pencher en arrière."
 },
 {
  "id": "rowing-machine-prise-neutre",
  "name": "Rowing machine (prise neutre)",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "lats",
   "biceps",
   "rearDelts"
  ],
  "equipment": "Machine",
  "category": "dos",
  "tip": "Poitrine contre le support. Tire les poignées en arrière en serrant les omoplates, puis reviens lentement."
 },
 {
  "id": "rowing-t-bar",
  "name": "Rowing T-bar",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "lats",
   "biceps",
   "lowerBack"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Buste incliné, dos plat. Tire la charge vers la poitrine, coudes près du corps."
 },
 {
  "id": "rowing-poitrine-appuyee-halteres",
  "name": "Rowing poitrine appuyée (haltères)",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "rearDelts",
   "biceps"
  ],
  "equipment": "Haltères",
  "category": "dos",
  "tip": "Poitrine sur un banc incliné, haltères le long du corps. Tire les coudes vers le haut et l'arrière."
 },
 {
  "id": "shrugs-halteres",
  "name": "Shrugs (haltères)",
  "primary": [
   "traps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Haltères",
  "category": "dos",
  "tip": "Bras le long du corps. Hausse les épaules vers les oreilles en marquant une pause, sans faire de rotation."
 },
 {
  "id": "shrugs-barre",
  "name": "Shrugs (barre)",
  "primary": [
   "traps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Barre devant les cuisses. Monte les épaules verticalement, bras tendus, et redescends lentement."
 },
 {
  "id": "tirage-menton-barre",
  "name": "Tirage menton (barre)",
  "primary": [
   "traps"
  ],
  "secondary": [
   "sideDelts",
   "biceps"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Prise un peu plus large que les épaules. Monte la barre jusqu'au menton, coudes plus hauts que les mains."
 },
 {
  "id": "souleve-de-terre",
  "name": "Soulevé de terre",
  "primary": [
   "lowerBack",
   "glutes",
   "hamstrings"
  ],
  "secondary": [
   "traps",
   "forearms",
   "quads",
   "upperBack"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Barre près des tibias, dos plat, poitrine haute. Pousse le sol avec les jambes puis verrouille les hanches en haut."
 },
 {
  "id": "extensions-lombaires-banc-a-45",
  "name": "Extensions lombaires (banc à 45°)",
  "primary": [
   "lowerBack"
  ],
  "secondary": [
   "glutes",
   "hamstrings"
  ],
  "equipment": "Poids du corps",
  "category": "dos",
  "tip": "Descends le buste dos neutre, puis remonte jusqu'à l'alignement du corps, sans te cambrer en haut."
 },
 {
  "id": "good-morning",
  "name": "Good morning",
  "primary": [
   "lowerBack",
   "hamstrings"
  ],
  "secondary": [
   "glutes"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Barre sur les trapèzes, genoux légèrement fléchis. Bascule le bassin en arrière, dos plat, puis reviens debout."
 },
 {
  "id": "superman",
  "name": "Superman",
  "primary": [
   "lowerBack"
  ],
  "secondary": [
   "glutes"
  ],
  "equipment": "Poids du corps",
  "category": "dos",
  "tip": "Allongé sur le ventre, lève bras et jambes en même temps. Marque une pause d'une seconde en haut."
 },
 {
  "id": "developpe-militaire-barre",
  "name": "Développé militaire (barre)",
  "primary": [
   "frontDelts"
  ],
  "secondary": [
   "sideDelts",
   "triceps",
   "traps"
  ],
  "equipment": "Barre",
  "category": "epaules",
  "tip": "Debout, abdos serrés. Pousse la barre à la verticale en passant la tête sous la barre en haut."
 },
 {
  "id": "developpe-epaules-halteres",
  "name": "Développé épaules (haltères)",
  "primary": [
   "frontDelts",
   "sideDelts"
  ],
  "secondary": [
   "triceps",
   "traps"
  ],
  "equipment": "Haltères",
  "category": "epaules",
  "tip": "Assis dos calé. Pousse les haltères au-dessus de la tête sans claquer les coudes en haut."
 },
 {
  "id": "developpe-arnold",
  "name": "Développé Arnold",
  "primary": [
   "frontDelts"
  ],
  "secondary": [
   "sideDelts",
   "triceps"
  ],
  "equipment": "Haltères",
  "category": "epaules",
  "tip": "Pars paumes vers toi devant la poitrine, tourne les poignets en poussant vers le haut."
 },
 {
  "id": "elevations-frontales",
  "name": "Élévations frontales",
  "primary": [
   "frontDelts"
  ],
  "secondary": [
   "sideDelts",
   "chest"
  ],
  "equipment": "Haltères",
  "category": "epaules",
  "tip": "Monte les haltères devant toi jusqu'à hauteur des yeux, bras presque tendus, sans élan."
 },
 {
  "id": "elevations-laterales-halteres",
  "name": "Élévations latérales (haltères)",
  "primary": [
   "sideDelts"
  ],
  "secondary": [
   "traps"
  ],
  "equipment": "Haltères",
  "category": "epaules",
  "tip": "Coudes légèrement fléchis. Monte les bras sur les côtés jusqu'à l'horizontale, comme si tu versais une carafe."
 },
 {
  "id": "elevations-laterales-poulie",
  "name": "Élévations latérales (poulie)",
  "primary": [
   "sideDelts"
  ],
  "secondary": [
   "traps"
  ],
  "equipment": "Poulie",
  "category": "epaules",
  "tip": "Poulie basse, bras opposé. Monte le bras sur le côté jusqu'à l'horizontale pour une tension continue."
 },
 {
  "id": "oiseau-halteres-buste-penche",
  "name": "Oiseau (haltères, buste penché)",
  "primary": [
   "rearDelts"
  ],
  "secondary": [
   "upperBack",
   "traps"
  ],
  "equipment": "Haltères",
  "category": "epaules",
  "tip": "Buste penché, dos plat. Ouvre les bras sur les côtés en serrant les omoplates."
 },
 {
  "id": "reverse-pec-deck",
  "name": "Reverse pec deck",
  "primary": [
   "rearDelts"
  ],
  "secondary": [
   "upperBack"
  ],
  "equipment": "Machine",
  "category": "epaules",
  "tip": "Face au dossier, bras tendus. Ouvre vers l'arrière en gardant les épaules basses."
 },
 {
  "id": "face-pull",
  "name": "Face pull",
  "primary": [
   "rearDelts"
  ],
  "secondary": [
   "upperBack",
   "traps"
  ],
  "equipment": "Poulie",
  "category": "epaules",
  "tip": "Poulie à hauteur du visage, corde. Tire vers le front en écartant les mains et les coudes hauts."
 },
 {
  "id": "curl-barre-ez",
  "name": "Curl barre EZ",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Barre",
  "category": "bras",
  "tip": "Coudes collés au corps. Monte la barre sans balancer le buste et redescends lentement."
 },
 {
  "id": "curl-halteres-alterne",
  "name": "Curl haltères alterné",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Tourne le poignet en montant (supination) et serre le biceps en haut."
 },
 {
  "id": "curl-marteau",
  "name": "Curl marteau",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Paumes face à face. Monte sans bouger les coudes, ce qui sollicite aussi le brachio-radial."
 },
 {
  "id": "curl-pupitre-larry-scott",
  "name": "Curl pupitre (Larry Scott)",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Barre",
  "category": "bras",
  "tip": "Bras calés sur le pupitre. Descends complètement sans verrouiller brutalement le coude."
 },
 {
  "id": "curl-incline-halteres",
  "name": "Curl incliné (haltères)",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Banc incliné à 45°, bras vers l'arrière. Étire bien le biceps en bas, puis monte lentement."
 },
 {
  "id": "curl-poulie-basse",
  "name": "Curl poulie basse",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Poulie",
  "category": "bras",
  "tip": "Coudes fixes le long du corps. La poulie garde une tension constante tout le long du mouvement."
 },
 {
  "id": "curl-concentre",
  "name": "Curl concentré",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Assis, coude contre l'intérieur de la cuisse. Monte lentement et serre en haut."
 },
 {
  "id": "extension-poulie-haute-corde",
  "name": "Extension poulie haute (corde)",
  "primary": [
   "triceps"
  ],
  "secondary": [],
  "equipment": "Poulie",
  "category": "bras",
  "tip": "Coudes collés au corps. Étends les bras et écarte la corde en bas."
 },
 {
  "id": "barre-au-front-skull-crusher",
  "name": "Barre au front (skull crusher)",
  "primary": [
   "triceps"
  ],
  "secondary": [],
  "equipment": "Barre",
  "category": "bras",
  "tip": "Allongé, coudes pointés vers le plafond. Descends la barre vers le front, puis étends les bras."
 },
 {
  "id": "extension-nuque-haltere",
  "name": "Extension nuque (haltère)",
  "primary": [
   "triceps"
  ],
  "secondary": [],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Haltère à deux mains derrière la tête, coudes serrés. Étends les bras vers le haut."
 },
 {
  "id": "developpe-couche-prise-serree",
  "name": "Développé couché prise serrée",
  "primary": [
   "triceps"
  ],
  "secondary": [
   "chest",
   "frontDelts"
  ],
  "equipment": "Barre",
  "category": "bras",
  "tip": "Mains à la largeur des épaules, coudes près du corps. Descends vers le bas de la poitrine."
 },
 {
  "id": "dips-banc",
  "name": "Dips banc",
  "primary": [
   "triceps"
  ],
  "secondary": [
   "chest",
   "frontDelts"
  ],
  "equipment": "Poids du corps",
  "category": "bras",
  "tip": "Mains sur le banc derrière toi. Descends les fesses près du banc jusqu'à 90° au coude, puis pousse."
 },
 {
  "id": "kickback-haltere",
  "name": "Kickback (haltère)",
  "primary": [
   "triceps"
  ],
  "secondary": [
   "rearDelts"
  ],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Buste penché, coude collé en haut. Étends l'avant-bras vers l'arrière."
 },
 {
  "id": "curl-poignets",
  "name": "Curl poignets",
  "primary": [
   "forearms"
  ],
  "secondary": [],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Avant-bras posés sur un banc, paumes vers le haut. Fléchis les poignets lentement."
 },
 {
  "id": "curl-inverse",
  "name": "Curl inversé",
  "primary": [
   "forearms"
  ],
  "secondary": [
   "biceps"
  ],
  "equipment": "Barre",
  "category": "bras",
  "tip": "Prise pronation (paumes vers le bas). Monte la barre sans bouger les coudes."
 },
 {
  "id": "marche-du-fermier",
  "name": "Marche du fermier",
  "primary": [
   "forearms"
  ],
  "secondary": [
   "traps",
   "abs"
  ],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Haltères lourds en main. Marche en gardant le dos droit et les épaules basses."
 },
 {
  "id": "crunch",
  "name": "Crunch",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Bas du dos au sol. Enroule les épaules vers le bassin en expirant, sans tirer sur la nuque."
 },
 {
  "id": "releve-de-jambes-suspendu",
  "name": "Relevé de jambes (suspendu)",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques",
   "forearms"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Suspendu, monte les genoux ou les jambes tendues en enroulant le bassin, sans balancer."
 },
 {
  "id": "gainage-planche",
  "name": "Gainage (planche)",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques",
   "lowerBack",
   "frontDelts"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Avant-bras au sol, corps aligné de la tête aux talons. Serre abdos et fessiers."
 },
 {
  "id": "crunch-poulie-haute",
  "name": "Crunch poulie haute",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poulie",
  "category": "abdos",
  "tip": "À genoux face à la poulie. Enroule le buste vers le bas en contractant les abdominaux."
 },
 {
  "id": "roue-abdominale",
  "name": "Roue abdominale",
  "primary": [
   "abs"
  ],
  "secondary": [
   "lats",
   "frontDelts",
   "lowerBack"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Roule vers l'avant en gardant le dos rond, sans creuser. Reviens avec les abdominaux."
 },
 {
  "id": "russian-twist",
  "name": "Russian twist",
  "primary": [
   "obliques"
  ],
  "secondary": [
   "abs"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Assis, buste incliné en arrière, pieds levés. Tourne le torse d'un côté puis de l'autre."
 },
 {
  "id": "planche-laterale",
  "name": "Planche latérale",
  "primary": [
   "obliques"
  ],
  "secondary": [
   "abs",
   "sideDelts",
   "glutes"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Sur l'avant-bras, corps aligné de profil. Garde le bassin haut sans pivoter."
 },
 {
  "id": "bucheron-poulie",
  "name": "Bûcheron (poulie)",
  "primary": [
   "obliques"
  ],
  "secondary": [
   "abs",
   "frontDelts"
  ],
  "equipment": "Poulie",
  "category": "abdos",
  "tip": "Tire la poulie en diagonale, de haut en bas, en pivotant le tronc."
 },
 {
  "id": "crunch-oblique",
  "name": "Crunch oblique",
  "primary": [
   "obliques"
  ],
  "secondary": [
   "abs"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Enroule une épaule vers la hanche opposée, en alternant les côtés."
 },
 {
  "id": "flexions-laterales-haltere",
  "name": "Flexions latérales (haltère)",
  "primary": [
   "obliques"
  ],
  "secondary": [],
  "equipment": "Haltères",
  "category": "abdos",
  "tip": "Debout, un haltère à la main. Incline le buste sur le côté puis reviens, sans te pencher vers l'avant."
 },
 {
  "id": "squat-barre",
  "name": "Squat (barre)",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "adductors",
   "lowerBack",
   "abs"
  ],
  "equipment": "Barre",
  "category": "jambes",
  "tip": "Barre sur les trapèzes, pieds largeur d'épaules. Descends en poussant les genoux vers l'extérieur, buste gainé."
 },
 {
  "id": "squat-avant-barre",
  "name": "Squat avant (barre)",
  "primary": [
   "quads"
  ],
  "secondary": [
   "glutes",
   "abs",
   "upperBack"
  ],
  "equipment": "Barre",
  "category": "jambes",
  "tip": "Barre sur l'avant des épaules, coudes hauts. Garde le buste vertical en descendant."
 },
 {
  "id": "presse-a-cuisses",
  "name": "Presse à cuisses",
  "primary": [
   "quads"
  ],
  "secondary": [
   "glutes",
   "hamstrings",
   "adductors"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Dos et bassin plaqués. Descends jusqu'à environ 90° sans décoller le bassin, puis pousse sans verrouiller les genoux."
 },
 {
  "id": "hack-squat",
  "name": "Hack squat",
  "primary": [
   "quads"
  ],
  "secondary": [
   "glutes",
   "adductors"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Dos calé sur le support. Descends profondément en gardant les talons au sol."
 },
 {
  "id": "leg-extension",
  "name": "Leg extension",
  "primary": [
   "quads"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Étends les jambes sans à-coups et contracte les quadriceps en haut."
 },
 {
  "id": "goblet-squat",
  "name": "Goblet squat",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "adductors",
   "abs"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Haltère contre la poitrine. Descends entre les jambes en gardant le buste droit."
 },
 {
  "id": "fentes-avant-halteres",
  "name": "Fentes avant (haltères)",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "adductors"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Fais un grand pas, descends le genou arrière près du sol et pousse sur le talon avant."
 },
 {
  "id": "fentes-marchees",
  "name": "Fentes marchées",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "calves"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Avance d'un pas à chaque répétition en gardant le buste droit."
 },
 {
  "id": "squat-bulgare",
  "name": "Squat bulgare",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "adductors"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Pied arrière sur un banc. Descends à la verticale sur la jambe avant."
 },
 {
  "id": "hip-thrust",
  "name": "Hip thrust",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "adductors"
  ],
  "equipment": "Barre",
  "category": "jambes",
  "tip": "Haut du dos sur un banc. Pousse le bassin vers le haut et serre les fessiers en haut."
 },
 {
  "id": "pont-fessier",
  "name": "Pont fessier",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "hamstrings"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "Allongé, pieds près des fesses. Monte le bassin en serrant les fessiers et marque une pause."
 },
 {
  "id": "kickback-poulie",
  "name": "Kickback (poulie)",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "hamstrings"
  ],
  "equipment": "Poulie",
  "category": "jambes",
  "tip": "Sangle à la cheville. Envoie la jambe vers l'arrière sans cambrer le bas du dos."
 },
 {
  "id": "abduction-machine",
  "name": "Abduction (machine)",
  "primary": [
   "glutes"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Écarte les jambes contre la résistance, buste droit et bassin stable."
 },
 {
  "id": "souleve-de-terre-roumain",
  "name": "Soulevé de terre roumain",
  "primary": [
   "hamstrings",
   "glutes"
  ],
  "secondary": [
   "lowerBack",
   "forearms",
   "traps"
  ],
  "equipment": "Barre",
  "category": "jambes",
  "tip": "Jambes presque tendues, dos plat. Recule le bassin en gardant la barre près des jambes jusqu'à l'étirement."
 },
 {
  "id": "souleve-de-terre-jambes-tendues-halteres",
  "name": "Soulevé de terre jambes tendues (haltères)",
  "primary": [
   "hamstrings"
  ],
  "secondary": [
   "glutes",
   "lowerBack"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Haltères près des jambes. Penche le buste dos plat jusqu'à l'étirement des ischio-jambiers."
 },
 {
  "id": "leg-curl-allonge",
  "name": "Leg curl allongé",
  "primary": [
   "hamstrings"
  ],
  "secondary": [
   "calves"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Ramène les talons vers les fesses sans décoller le bassin du banc."
 },
 {
  "id": "leg-curl-assis",
  "name": "Leg curl assis",
  "primary": [
   "hamstrings"
  ],
  "secondary": [
   "calves"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Dos bien calé. Fléchis les jambes à fond puis reviens lentement."
 },
 {
  "id": "nordic-curl",
  "name": "Nordic curl",
  "primary": [
   "hamstrings"
  ],
  "secondary": [
   "glutes",
   "calves"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "À genoux, chevilles bloquées. Descends le buste le plus lentement possible, puis aide-toi des mains."
 },
 {
  "id": "adduction-machine",
  "name": "Adduction (machine)",
  "primary": [
   "adductors"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Rapproche les jambes contre la résistance, sans à-coups."
 },
 {
  "id": "adduction-poulie",
  "name": "Adduction (poulie)",
  "primary": [
   "adductors"
  ],
  "secondary": [],
  "equipment": "Poulie",
  "category": "jambes",
  "tip": "Sangle à la cheville. Ramène la jambe vers l'intérieur devant l'autre jambe."
 },
 {
  "id": "squat-sumo",
  "name": "Squat sumo",
  "primary": [
   "adductors",
   "glutes"
  ],
  "secondary": [
   "quads",
   "hamstrings"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Pieds très écartés, pointes vers l'extérieur. Descends entre les jambes en gardant le buste droit."
 },
 {
  "id": "fente-laterale",
  "name": "Fente latérale",
  "primary": [
   "adductors",
   "quads"
  ],
  "secondary": [
   "glutes"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Fais un grand pas sur le côté, fléchis cette jambe et garde l'autre tendue."
 },
 {
  "id": "mollets-debout-machine",
  "name": "Mollets debout (machine)",
  "primary": [
   "calves"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Monte sur la pointe des pieds au maximum, marque une pause puis étire bien en bas."
 },
 {
  "id": "mollets-assis-machine",
  "name": "Mollets assis (machine)",
  "primary": [
   "calves"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Genoux fléchis à 90°, ce qui cible davantage le soléaire. Mouvement lent et complet."
 },
 {
  "id": "mollets-a-la-presse",
  "name": "Mollets à la presse",
  "primary": [
   "calves"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Jambes tendues, appuie sur la pointe des pieds en gardant les genoux verrouillés."
 },
 {
  "id": "mollets-a-une-jambe-haltere",
  "name": "Mollets à une jambe (haltère)",
  "primary": [
   "calves"
  ],
  "secondary": [],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Debout sur une marche, une jambe. Monte et descends lentement avec l'étirement complet."
 },
 {
  "id": "montees-sur-pointes-poids-du-corps",
  "name": "Montées sur pointes (poids du corps)",
  "primary": [
   "calves"
  ],
  "secondary": [],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "Sur une marche, talons dans le vide. Monte haut, puis descends en étirant les mollets."
 },
 {
  "id": "developpe-couche-halteres",
  "name": "Développé couché (haltères)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps"
  ],
  "equipment": "Haltères",
  "category": "pec",
  "tip": "Haltères au niveau des pectoraux, coudes à environ 45°. Pousse en rapprochant les haltères et descends lentement pour garder l'étirement."
 },
 {
  "id": "developpe-couche-smith",
  "name": "Développé couché (Smith)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps"
  ],
  "equipment": "Machine",
  "category": "pec",
  "tip": "Place le banc pour que la barre descende au milieu des pectoraux. Omoplates serrées, pieds au sol, pousse sans décoller les fessiers."
 },
 {
  "id": "developpe-couche-machine",
  "name": "Développé couché (machine)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps"
  ],
  "equipment": "Machine",
  "category": "pec",
  "tip": "Règle le siège pour que les poignées soient au niveau du milieu de la poitrine. Pousse sans verrouiller les coudes et contrôle le retour."
 },
 {
  "id": "developpe-incline-barre",
  "name": "Développé incliné (barre)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps"
  ],
  "equipment": "Barre",
  "category": "pec",
  "tip": "Banc incliné à 30°. Descends la barre vers le haut de la poitrine et pousse en gardant les poignets au-dessus des coudes."
 },
 {
  "id": "developpe-incline-smith",
  "name": "Développé incliné (Smith)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps"
  ],
  "equipment": "Machine",
  "category": "pec",
  "tip": "Banc à 30°. La barre descend vers le haut des pectoraux ; garde les omoplates serrées et ne cambre pas excessivement."
 },
 {
  "id": "developpe-incline-machine",
  "name": "Développé incliné (machine)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps"
  ],
  "equipment": "Machine",
  "category": "pec",
  "tip": "Siège réglé pour que les poignées partent du haut de la poitrine. Pousse en diagonale et contrôle la descente."
 },
 {
  "id": "developpe-a-la-poulie-pectoraux",
  "name": "Développé à la poulie (pectoraux)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps"
  ],
  "equipment": "Poulie",
  "category": "pec",
  "tip": "Poulies à hauteur de poitrine, un pas en avant. Pousse les mains devant toi en gardant le buste gainé, puis reviens lentement."
 },
 {
  "id": "ecartes-incline-halteres",
  "name": "Écartés incliné (haltères)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts"
  ],
  "equipment": "Haltères",
  "category": "pec",
  "tip": "Banc incliné à 30°, coudes légèrement fléchis. Ouvre en arc de cercle, puis ramène en pensant à rapprocher les coudes."
 },
 {
  "id": "ecartes-poulie-haute-crossover",
  "name": "Écartés poulie haute (crossover)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts"
  ],
  "equipment": "Poulie",
  "category": "pec",
  "tip": "Poulies hautes, buste légèrement penché. Amène les mains devant le bas de la poitrine en serrant les pectoraux."
 },
 {
  "id": "ecartes-poulie-basse-vers-le-haut",
  "name": "Écartés poulie basse (vers le haut)",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts"
  ],
  "equipment": "Poulie",
  "category": "pec",
  "tip": "Poulies basses. Monte les mains devant le visage en arc de cercle pour cibler le haut des pectoraux."
 },
 {
  "id": "pompes-pieds-sureleves",
  "name": "Pompes pieds surélevés",
  "primary": [
   "chest"
  ],
  "secondary": [
   "frontDelts",
   "triceps",
   "abs"
  ],
  "equipment": "Poids du corps",
  "category": "pec",
  "tip": "Pieds sur un banc, corps gainé. Descends la poitrine entre les mains puis pousse sans creuser le dos."
 },
 {
  "id": "tractions-prise-neutre",
  "name": "Tractions prise neutre",
  "primary": [
   "lats"
  ],
  "secondary": [
   "biceps",
   "upperBack",
   "forearms"
  ],
  "equipment": "Poids du corps",
  "category": "dos",
  "tip": "Mains face à face. Tire les coudes vers les hanches jusqu'à ce que le menton passe la barre, puis redescends bras tendus."
 },
 {
  "id": "tractions-assistees-machine",
  "name": "Tractions assistées (machine)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "biceps",
   "upperBack"
  ],
  "equipment": "Machine",
  "category": "dos",
  "tip": "Choisis une assistance qui te permet 8 à 10 répétitions propres. Tire la poitrine vers la barre et contrôle la descente."
 },
 {
  "id": "tirage-vertical-prise-serree-neutre",
  "name": "Tirage vertical prise serrée (neutre)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "biceps",
   "upperBack"
  ],
  "equipment": "Poulie",
  "category": "dos",
  "tip": "Poignée en V ou prise neutre. Tire vers le haut de la poitrine en gardant les coudes près du corps."
 },
 {
  "id": "tirage-vertical-a-un-bras-poulie",
  "name": "Tirage vertical à un bras (poulie)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "biceps",
   "upperBack"
  ],
  "equipment": "Poulie",
  "category": "dos",
  "tip": "Un bras à la fois, buste légèrement incliné. Tire le coude vers la hanche et laisse le dorsal s'étirer en haut."
 },
 {
  "id": "tirage-vertical-machine",
  "name": "Tirage vertical (machine)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "biceps",
   "upperBack"
  ],
  "equipment": "Machine",
  "category": "dos",
  "tip": "Cuisses calées sous les coussins. Tire les poignées vers le haut de la poitrine en serrant les omoplates vers le bas."
 },
 {
  "id": "pull-over-machine",
  "name": "Pull-over (machine)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "chest",
   "triceps"
  ],
  "equipment": "Machine",
  "category": "dos",
  "tip": "Coudes sur les coussins. Ramène les bras vers les hanches en contractant les dorsaux et reviens lentement."
 },
 {
  "id": "rowing-un-bras-poulie-basse",
  "name": "Rowing un bras (poulie basse)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "upperBack",
   "biceps",
   "rearDelts"
  ],
  "equipment": "Poulie",
  "category": "dos",
  "tip": "Assis ou debout, dos gainé. Tire la poignée vers la hanche en gardant le buste immobile."
 },
 {
  "id": "rowing-meadows-landmine",
  "name": "Rowing Meadows (landmine)",
  "primary": [
   "lats"
  ],
  "secondary": [
   "upperBack",
   "biceps",
   "rearDelts"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Barre calée dans un coin, en appui sur un côté. Tire le bout de la barre vers la hanche, coude près du corps."
 },
 {
  "id": "rowing-pendlay",
  "name": "Rowing Pendlay",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "lats",
   "lowerBack",
   "biceps"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Barre au sol à chaque répétition, dos parallèle au sol. Tire explosivement vers le bas de la poitrine puis repose."
 },
 {
  "id": "rowing-barre-supination",
  "name": "Rowing barre supination",
  "primary": [
   "lats"
  ],
  "secondary": [
   "upperBack",
   "biceps",
   "lowerBack"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Paumes vers le haut, buste penché à 45°. Tire la barre vers le bas du ventre en gardant les coudes près du corps."
 },
 {
  "id": "rowing-smith",
  "name": "Rowing (Smith)",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "lats",
   "biceps",
   "rearDelts"
  ],
  "equipment": "Machine",
  "category": "dos",
  "tip": "Buste penché, dos plat. Tire la barre guidée vers le nombril en serrant les omoplates."
 },
 {
  "id": "rowing-machine-prise-large",
  "name": "Rowing machine (prise large)",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "rearDelts",
   "lats",
   "biceps"
  ],
  "equipment": "Machine",
  "category": "dos",
  "tip": "Poitrine calée. Tire les poignées avec les coudes écartés pour cibler le haut du dos, et marque une pause en serrant."
 },
 {
  "id": "rowing-inverse-tractions-australiennes",
  "name": "Rowing inversé (tractions australiennes)",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "lats",
   "biceps",
   "rearDelts"
  ],
  "equipment": "Poids du corps",
  "category": "dos",
  "tip": "Sous une barre à hauteur de taille, corps aligné. Tire la poitrine vers la barre en serrant les omoplates."
 },
 {
  "id": "tirage-horizontal-prise-large-poulie",
  "name": "Tirage horizontal prise large (poulie)",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "rearDelts",
   "lats",
   "biceps"
  ],
  "equipment": "Poulie",
  "category": "dos",
  "tip": "Barre large, coudes vers l'extérieur. Tire vers le haut du ventre sans balancer le buste."
 },
 {
  "id": "rowing-deux-halteres-buste-penche",
  "name": "Rowing deux haltères (buste penché)",
  "primary": [
   "upperBack"
  ],
  "secondary": [
   "lats",
   "rearDelts",
   "biceps",
   "lowerBack"
  ],
  "equipment": "Haltères",
  "category": "dos",
  "tip": "Dos plat, genoux légèrement fléchis. Tire les deux haltères vers les hanches en serrant les omoplates."
 },
 {
  "id": "shrugs-smith",
  "name": "Shrugs (Smith)",
  "primary": [
   "traps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Machine",
  "category": "dos",
  "tip": "Barre devant les cuisses. Hausse les épaules à la verticale, marque une pause, redescends lentement."
 },
 {
  "id": "elevations-en-y-banc-incline",
  "name": "Élévations en Y (banc incliné)",
  "primary": [
   "traps"
  ],
  "secondary": [
   "rearDelts",
   "upperBack"
  ],
  "equipment": "Haltères",
  "category": "dos",
  "tip": "Allongé sur le ventre sur un banc incliné. Lève les bras en Y, pouces vers le haut, sans cambrer."
 },
 {
  "id": "rack-pull",
  "name": "Rack pull",
  "primary": [
   "lowerBack",
   "traps"
  ],
  "secondary": [
   "glutes",
   "hamstrings",
   "forearms",
   "upperBack"
  ],
  "equipment": "Barre",
  "category": "dos",
  "tip": "Barre posée au niveau des genoux sur les supports. Verrouille les hanches en gardant le dos plat et les épaules en arrière."
 },
 {
  "id": "banc-a-lombaires-machine",
  "name": "Banc à lombaires (machine)",
  "primary": [
   "lowerBack"
  ],
  "secondary": [
   "glutes",
   "hamstrings"
  ],
  "equipment": "Machine",
  "category": "dos",
  "tip": "Dos neutre. Redresse le buste jusqu'à l'alignement du corps, sans te cambrer en haut."
 },
 {
  "id": "reverse-hyper",
  "name": "Reverse hyper",
  "primary": [
   "lowerBack",
   "glutes"
  ],
  "secondary": [
   "hamstrings"
  ],
  "equipment": "Machine",
  "category": "dos",
  "tip": "Allongé sur le ventre, jambes dans le vide. Lève les jambes en contractant les fessiers, sans balancer."
 },
 {
  "id": "bird-dog",
  "name": "Bird dog",
  "primary": [
   "lowerBack"
  ],
  "secondary": [
   "glutes",
   "abs"
  ],
  "equipment": "Poids du corps",
  "category": "dos",
  "tip": "À quatre pattes. Étends le bras droit et la jambe gauche en gardant le bassin stable, puis alterne."
 },
 {
  "id": "souleve-de-terre-sumo",
  "name": "Soulevé de terre sumo",
  "primary": [
   "glutes",
   "hamstrings",
   "adductors"
  ],
  "secondary": [
   "lowerBack",
   "quads",
   "traps",
   "forearms"
  ],
  "equipment": "Barre",
  "category": "jambes",
  "tip": "Pieds très écartés, pointes vers l'extérieur, mains à l'intérieur des jambes. Pousse le sol en gardant la poitrine haute."
 },
 {
  "id": "souleve-de-terre-trap-bar",
  "name": "Soulevé de terre trap bar",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "lowerBack",
   "traps",
   "forearms"
  ],
  "equipment": "Barre",
  "category": "jambes",
  "tip": "Debout dans la barre hexagonale, poignées neutres. Pousse le sol et redresse-toi, dos plat."
 },
 {
  "id": "developpe-epaules-machine",
  "name": "Développé épaules (machine)",
  "primary": [
   "frontDelts",
   "sideDelts"
  ],
  "secondary": [
   "triceps",
   "traps"
  ],
  "equipment": "Machine",
  "category": "epaules",
  "tip": "Règle le siège pour que les poignées soient à hauteur d'épaules. Pousse sans cambrer et sans verrouiller les coudes."
 },
 {
  "id": "developpe-militaire-smith",
  "name": "Développé militaire (Smith)",
  "primary": [
   "frontDelts"
  ],
  "secondary": [
   "sideDelts",
   "triceps",
   "traps"
  ],
  "equipment": "Machine",
  "category": "epaules",
  "tip": "Assis dos calé, barre devant le visage. Pousse à la verticale et redescends au niveau du menton."
 },
 {
  "id": "developpe-landmine",
  "name": "Développé landmine",
  "primary": [
   "frontDelts"
  ],
  "secondary": [
   "chest",
   "triceps",
   "abs"
  ],
  "equipment": "Barre",
  "category": "epaules",
  "tip": "Barre calée dans un coin, debout. Pousse le bout de la barre en diagonale vers le haut en gardant les abdos serrés."
 },
 {
  "id": "elevations-laterales-machine",
  "name": "Élévations latérales (machine)",
  "primary": [
   "sideDelts"
  ],
  "secondary": [
   "traps"
  ],
  "equipment": "Machine",
  "category": "epaules",
  "tip": "Coudes sous les coussins. Écarte les bras jusqu'à l'horizontale sans hausser les épaules."
 },
 {
  "id": "elevations-frontales-poulie",
  "name": "Élévations frontales (poulie)",
  "primary": [
   "frontDelts"
  ],
  "secondary": [
   "sideDelts",
   "chest"
  ],
  "equipment": "Poulie",
  "category": "epaules",
  "tip": "Poulie basse, dos à la machine. Monte la barre ou la corde à hauteur des yeux, bras presque tendus."
 },
 {
  "id": "oiseau-a-la-poulie-croisee",
  "name": "Oiseau à la poulie (croisée)",
  "primary": [
   "rearDelts"
  ],
  "secondary": [
   "upperBack",
   "traps"
  ],
  "equipment": "Poulie",
  "category": "epaules",
  "tip": "Poulies hautes, bras croisés. Ouvre les bras en arc de cercle jusqu'à l'horizontale, en serrant les omoplates."
 },
 {
  "id": "tirage-menton-poulie",
  "name": "Tirage menton (poulie)",
  "primary": [
   "sideDelts",
   "traps"
  ],
  "secondary": [
   "biceps",
   "frontDelts"
  ],
  "equipment": "Poulie",
  "category": "epaules",
  "tip": "Barre basse. Monte vers le menton, coudes plus hauts que les mains, puis redescends lentement."
 },
 {
  "id": "rotation-externe-poulie",
  "name": "Rotation externe (poulie)",
  "primary": [
   "rearDelts"
  ],
  "secondary": [
   "upperBack"
  ],
  "equipment": "Poulie",
  "category": "epaules",
  "tip": "Coude collé au corps, à 90°. Tourne l'avant-bras vers l'extérieur sans bouger le coude, charge légère."
 },
 {
  "id": "developpe-kettlebell-un-bras",
  "name": "Développé kettlebell (un bras)",
  "primary": [
   "frontDelts"
  ],
  "secondary": [
   "sideDelts",
   "triceps",
   "abs"
  ],
  "equipment": "Kettlebell",
  "category": "epaules",
  "tip": "Kettlebell au niveau de l'épaule, poignet droit. Pousse à la verticale sans pencher le buste."
 },
 {
  "id": "curl-pupitre-machine",
  "name": "Curl pupitre (machine)",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Machine",
  "category": "bras",
  "tip": "Bras calés sur le coussin. Monte les poignées sans décoller les coudes et descends lentement jusqu'à l'extension."
 },
 {
  "id": "curl-barre-droite",
  "name": "Curl barre droite",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Barre",
  "category": "bras",
  "tip": "Mains à la largeur des épaules, coudes collés. Monte la barre sans balancer le buste."
 },
 {
  "id": "curl-araignee-spider-curl",
  "name": "Curl araignée (spider curl)",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Poitrine sur un banc incliné, bras pendants à la verticale. Monte les haltères en serrant le biceps."
 },
 {
  "id": "curl-poulie-haute-double-biceps",
  "name": "Curl poulie haute (double biceps)",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Poulie",
  "category": "bras",
  "tip": "Poulies hautes, bras à l'horizontale. Amène les poignées vers les oreilles en serrant le biceps, comme une pose de pectoraux."
 },
 {
  "id": "curl-marteau-a-la-corde-poulie",
  "name": "Curl marteau à la corde (poulie)",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Poulie",
  "category": "bras",
  "tip": "Corde sur poulie basse, prise neutre. Monte les mains vers les épaules, coudes fixes le long du corps."
 },
 {
  "id": "curl-zottman",
  "name": "Curl Zottman",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Monte en supination, tourne les poignets en haut, puis redescends en pronation lentement."
 },
 {
  "id": "curl-bayesian-poulie",
  "name": "Curl Bayesian (poulie)",
  "primary": [
   "biceps"
  ],
  "secondary": [
   "forearms"
  ],
  "equipment": "Poulie",
  "category": "bras",
  "tip": "Dos à la poulie basse, bras vers l'arrière. Monte la main en gardant le coude en arrière pour un étirement maximal."
 },
 {
  "id": "extension-poulie-haute-barre",
  "name": "Extension poulie haute (barre)",
  "primary": [
   "triceps"
  ],
  "secondary": [],
  "equipment": "Poulie",
  "category": "bras",
  "tip": "Barre droite ou en V, coudes collés au corps. Étends complètement les bras et remonte jusqu'à 90°."
 },
 {
  "id": "extension-poulie-haute-a-un-bras",
  "name": "Extension poulie haute à un bras",
  "primary": [
   "triceps"
  ],
  "secondary": [],
  "equipment": "Poulie",
  "category": "bras",
  "tip": "Poignée en supination ou pronation. Coude fixe contre le buste, étends le bras sans le balancer."
 },
 {
  "id": "extension-triceps-au-dessus-de-la-tete-poulie",
  "name": "Extension triceps au-dessus de la tête (poulie)",
  "primary": [
   "triceps"
  ],
  "secondary": [],
  "equipment": "Poulie",
  "category": "bras",
  "tip": "Dos à la poulie, corde entre les mains. Étends les bras vers l'avant et le haut, coudes serrés."
 },
 {
  "id": "extension-triceps-machine",
  "name": "Extension triceps (machine)",
  "primary": [
   "triceps"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "bras",
  "tip": "Dos calé, coudes alignés sur l'axe de la machine. Pousse jusqu'à l'extension et reviens lentement."
 },
 {
  "id": "dips-assistes-machine",
  "name": "Dips assistés (machine)",
  "primary": [
   "triceps"
  ],
  "secondary": [
   "chest",
   "frontDelts"
  ],
  "equipment": "Machine",
  "category": "bras",
  "tip": "Buste droit pour les triceps, penché pour les pectoraux. Descends jusqu'à 90° au coude puis repousse."
 },
 {
  "id": "extension-couchee-halteres",
  "name": "Extension couchée (haltères)",
  "primary": [
   "triceps"
  ],
  "secondary": [],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Allongé, haltères au-dessus de la poitrine. Fléchis les coudes sans les écarter, puis étends."
 },
 {
  "id": "pompes-diamant",
  "name": "Pompes diamant",
  "primary": [
   "triceps"
  ],
  "secondary": [
   "chest",
   "frontDelts"
  ],
  "equipment": "Poids du corps",
  "category": "bras",
  "tip": "Mains rapprochées sous la poitrine, pouces et index en losange. Descends en gardant les coudes près du corps."
 },
 {
  "id": "kickback-triceps-poulie",
  "name": "Kickback triceps (poulie)",
  "primary": [
   "triceps"
  ],
  "secondary": [
   "rearDelts"
  ],
  "equipment": "Poulie",
  "category": "bras",
  "tip": "Buste penché, coude collé au corps. Étends l'avant-bras vers l'arrière et serre le triceps."
 },
 {
  "id": "curl-poignets-barre",
  "name": "Curl poignets (barre)",
  "primary": [
   "forearms"
  ],
  "secondary": [],
  "equipment": "Barre",
  "category": "bras",
  "tip": "Avant-bras posés sur un banc, paumes vers le haut. Fléchis les poignets à fond puis redescends lentement."
 },
 {
  "id": "curl-poignets-inverse-halteres",
  "name": "Curl poignets inversé (haltères)",
  "primary": [
   "forearms"
  ],
  "secondary": [],
  "equipment": "Haltères",
  "category": "bras",
  "tip": "Paumes vers le bas, avant-bras sur un banc. Relève les poignets, charge légère."
 },
 {
  "id": "suspension-a-la-barre-dead-hang",
  "name": "Suspension à la barre (dead hang)",
  "primary": [
   "forearms"
  ],
  "secondary": [
   "lats",
   "traps"
  ],
  "equipment": "Poids du corps",
  "category": "bras",
  "tip": "Suspendu bras tendus, épaules actives. Tiens le plus longtemps possible, sans balancer."
 },
 {
  "id": "pincement-de-disque-plate-pinch",
  "name": "Pincement de disque (plate pinch)",
  "primary": [
   "forearms"
  ],
  "secondary": [],
  "equipment": "Autre",
  "category": "bras",
  "tip": "Pince un ou deux disques lisses entre les doigts et le pouce. Tiens quelques secondes."
 },
 {
  "id": "crunch-machine",
  "name": "Crunch (machine)",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Machine",
  "category": "abdos",
  "tip": "Règle la charge, enroule le buste vers l'avant en soufflant. Ne pousse pas avec les bras."
 },
 {
  "id": "crunch-decline",
  "name": "Crunch décliné",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Banc décliné, pieds calés. Enroule le haut du dos, sans te lever complètement."
 },
 {
  "id": "sit-up",
  "name": "Sit-up",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Pieds calés, bras croisés. Monte le buste jusqu'à la verticale en gardant le dos arrondi, puis redescends lentement."
 },
 {
  "id": "releve-de-jambes-chaise-romaine",
  "name": "Relevé de jambes (chaise romaine)",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques",
   "forearms"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Dos plaqué, avant-bras sur les appuis. Monte les genoux en enroulant le bassin, sans balancer."
 },
 {
  "id": "releve-de-genoux-suspendu",
  "name": "Relevé de genoux suspendu",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques",
   "forearms"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Suspendu à la barre. Monte les genoux vers la poitrine en enroulant le bassin et redescends lentement."
 },
 {
  "id": "toes-to-bar",
  "name": "Toes to bar",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques",
   "forearms",
   "lats"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Suspendu, jambes tendues. Monte les pieds jusqu'à la barre avec les abdos, sans élan."
 },
 {
  "id": "crunch-inverse",
  "name": "Crunch inversé",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Allongé, jambes fléchies. Monte les genoux vers la poitrine en décollant le bassin, puis redescends lentement."
 },
 {
  "id": "v-up",
  "name": "V-up",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Allongé, bras et jambes tendus. Monte simultanément le buste et les jambes pour former un V."
 },
 {
  "id": "dead-bug",
  "name": "Dead bug",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Dos plaqué au sol, bras et genoux à 90°. Étends le bras droit et la jambe gauche, puis alterne, sans cambrer."
 },
 {
  "id": "hollow-hold",
  "name": "Hollow hold",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Allongé, lombaires plaquées. Lève épaules et jambes tendues et tiens la position en gardant le bas du dos au sol."
 },
 {
  "id": "crunch-velo",
  "name": "Crunch vélo",
  "primary": [
   "abs",
   "obliques"
  ],
  "secondary": [],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "Allongé, mains derrière la tête. Amène le coude vers le genou opposé en alternant, sans tirer sur la nuque."
 },
 {
  "id": "mountain-climbers",
  "name": "Mountain climbers",
  "primary": [
   "abs"
  ],
  "secondary": [
   "obliques",
   "quads",
   "frontDelts"
  ],
  "equipment": "Poids du corps",
  "category": "abdos",
  "tip": "En position de planche haute. Amène les genoux vers la poitrine en alternant rapidement, bassin stable."
 },
 {
  "id": "pallof-press",
  "name": "Pallof press",
  "primary": [
   "obliques"
  ],
  "secondary": [
   "abs",
   "frontDelts"
  ],
  "equipment": "Poulie",
  "category": "abdos",
  "tip": "Poulie à hauteur de poitrine, de profil. Pousse les mains devant toi et résiste à la rotation du buste."
 },
 {
  "id": "rotation-du-buste-machine",
  "name": "Rotation du buste (machine)",
  "primary": [
   "obliques"
  ],
  "secondary": [
   "abs"
  ],
  "equipment": "Machine",
  "category": "abdos",
  "tip": "Assis, bassin fixe. Tourne le buste d'un côté puis de l'autre, de façon contrôlée."
 },
 {
  "id": "bucheron-bas-haut-poulie",
  "name": "Bûcheron bas-haut (poulie)",
  "primary": [
   "obliques"
  ],
  "secondary": [
   "abs",
   "sideDelts"
  ],
  "equipment": "Poulie",
  "category": "abdos",
  "tip": "Poulie basse. Tire en diagonale vers le haut en pivotant le tronc, bras presque tendus."
 },
 {
  "id": "marche-de-la-valise-suitcase-carry",
  "name": "Marche de la valise (suitcase carry)",
  "primary": [
   "obliques"
  ],
  "secondary": [
   "forearms",
   "traps",
   "abs"
  ],
  "equipment": "Haltères",
  "category": "abdos",
  "tip": "Un haltère lourd d'un seul côté. Marche en gardant le buste droit, sans pencher du côté de la charge."
 },
 {
  "id": "squat-poids-du-corps",
  "name": "Squat (poids du corps)",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "adductors",
   "abs"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "Pieds largeur d'épaules, poitrine haute. Descends en poussant les genoux vers l'extérieur puis remonte."
 },
 {
  "id": "squat-smith",
  "name": "Squat (Smith)",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "adductors",
   "lowerBack"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Pieds légèrement devant la barre. Descends en gardant le buste droit, puis pousse sur les talons."
 },
 {
  "id": "squat-pendulaire",
  "name": "Squat pendulaire",
  "primary": [
   "quads"
  ],
  "secondary": [
   "glutes",
   "adductors"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Épaules sous les coussins. Descends profondément en gardant les talons ancrés."
 },
 {
  "id": "goblet-squat-kettlebell",
  "name": "Goblet squat (kettlebell)",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "adductors",
   "abs"
  ],
  "equipment": "Kettlebell",
  "category": "jambes",
  "tip": "Kettlebell tenu contre la poitrine. Descends entre les jambes, buste droit, coudes entre les genoux."
 },
 {
  "id": "presse-a-cuisses-pieds-hauts",
  "name": "Presse à cuisses (pieds hauts)",
  "primary": [
   "glutes",
   "hamstrings"
  ],
  "secondary": [
   "quads",
   "adductors"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Pieds hauts sur la plateforme. Descends profondément sans décoller le bassin et pousse sur les talons."
 },
 {
  "id": "presse-a-cuisses-une-jambe",
  "name": "Presse à cuisses (une jambe)",
  "primary": [
   "quads"
  ],
  "secondary": [
   "glutes",
   "hamstrings"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Un pied au centre de la plateforme. Descends à 90° sans que le bassin ne se décolle, puis pousse."
 },
 {
  "id": "step-up-halteres",
  "name": "Step-up (haltères)",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "calves"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Pied entier sur le banc. Monte en poussant sur la jambe d'appui, sans t'aider de la jambe arrière."
 },
 {
  "id": "fentes-arriere-halteres",
  "name": "Fentes arrière (haltères)",
  "primary": [
   "glutes",
   "quads"
  ],
  "secondary": [
   "hamstrings",
   "adductors"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Recule d'un grand pas, descends le genou arrière près du sol et pousse sur la jambe avant."
 },
 {
  "id": "fentes-smith",
  "name": "Fentes (Smith)",
  "primary": [
   "quads",
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "adductors"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Un pied devant, un derrière sous la barre. Descends à la verticale et pousse sur le talon avant."
 },
 {
  "id": "fentes-curtsy",
  "name": "Fentes curtsy",
  "primary": [
   "glutes",
   "adductors"
  ],
  "secondary": [
   "quads",
   "hamstrings"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Croise la jambe derrière en diagonale. Descends en gardant le buste droit puis remonte."
 },
 {
  "id": "leg-extension-une-jambe",
  "name": "Leg extension (une jambe)",
  "primary": [
   "quads"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Une jambe à la fois. Étends sans à-coup et contracte le quadriceps en haut."
 },
 {
  "id": "sissy-squat",
  "name": "Sissy squat",
  "primary": [
   "quads"
  ],
  "secondary": [
   "abs"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "Monte sur la pointe des pieds, genoux vers l'avant. Penche-toi en arrière en gardant le corps aligné, charge légère."
 },
 {
  "id": "chaise-murale-wall-sit",
  "name": "Chaise murale (wall sit)",
  "primary": [
   "quads"
  ],
  "secondary": [
   "glutes",
   "calves"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "Dos plaqué au mur, cuisses à l'horizontale. Tiens la position le plus longtemps possible."
 },
 {
  "id": "leg-curl-une-jambe",
  "name": "Leg curl (une jambe)",
  "primary": [
   "hamstrings"
  ],
  "secondary": [
   "calves"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Une jambe à la fois. Ramène le talon vers la fesse, puis redescends lentement."
 },
 {
  "id": "leg-curl-debout-machine",
  "name": "Leg curl debout (machine)",
  "primary": [
   "hamstrings"
  ],
  "secondary": [
   "calves"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Debout, bassin stable. Fléchis la jambe en ramenant le talon vers la fesse."
 },
 {
  "id": "souleve-de-terre-roumain-halteres",
  "name": "Soulevé de terre roumain (haltères)",
  "primary": [
   "hamstrings",
   "glutes"
  ],
  "secondary": [
   "lowerBack",
   "forearms"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Haltères devant les cuisses. Recule le bassin, dos plat, jusqu'à sentir l'étirement des ischio-jambiers."
 },
 {
  "id": "souleve-de-terre-roumain-smith",
  "name": "Soulevé de terre roumain (Smith)",
  "primary": [
   "hamstrings",
   "glutes"
  ],
  "secondary": [
   "lowerBack"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Barre guidée près des jambes. Recule le bassin, genoux souples, puis redresse-toi en contractant les fessiers."
 },
 {
  "id": "souleve-de-terre-unijambiste-haltere",
  "name": "Soulevé de terre unijambiste (haltère)",
  "primary": [
   "hamstrings",
   "glutes"
  ],
  "secondary": [
   "lowerBack",
   "abs"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Penche-toi en reculant la jambe libre, dos plat. Reviens en poussant sur le talon d'appui."
 },
 {
  "id": "pull-through-poulie",
  "name": "Pull-through (poulie)",
  "primary": [
   "glutes",
   "hamstrings"
  ],
  "secondary": [
   "lowerBack"
  ],
  "equipment": "Poulie",
  "category": "jambes",
  "tip": "Dos à la poulie basse, corde entre les jambes. Recule le bassin puis verrouille les hanches en serrant les fessiers."
 },
 {
  "id": "glute-ham-raise",
  "name": "Glute-ham raise",
  "primary": [
   "hamstrings"
  ],
  "secondary": [
   "glutes",
   "lowerBack",
   "calves"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Chevilles calées. Descends le buste sous contrôle puis remonte avec les ischio-jambiers et les fessiers."
 },
 {
  "id": "leg-curl-au-sol-sliders",
  "name": "Leg curl au sol (sliders)",
  "primary": [
   "hamstrings"
  ],
  "secondary": [
   "glutes",
   "calves"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "Allongé, talons sur des sliders. Soulève le bassin et glisse les talons vers les fesses."
 },
 {
  "id": "hip-thrust-machine",
  "name": "Hip thrust (machine)",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "adductors"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Dos sur le banc, charge sur les hanches. Pousse le bassin vers le haut et serre les fessiers en haut."
 },
 {
  "id": "hip-thrust-haltere",
  "name": "Hip thrust (haltère)",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "hamstrings"
  ],
  "equipment": "Haltères",
  "category": "jambes",
  "tip": "Haut du dos sur un banc, haltère sur les hanches. Pousse le bassin, menton rentré, et marque une pause en haut."
 },
 {
  "id": "hip-thrust-smith",
  "name": "Hip thrust (Smith)",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "adductors"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Barre guidée posée sur les hanches. Pousse en verrouillant le bassin en haut, sans cambrer."
 },
 {
  "id": "pont-fessier-a-une-jambe",
  "name": "Pont fessier à une jambe",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "hamstrings",
   "abs"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "Une jambe tendue, l'autre pied au sol. Monte le bassin en gardant les hanches alignées."
 },
 {
  "id": "abduction-poulie",
  "name": "Abduction (poulie)",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poulie",
  "category": "jambes",
  "tip": "Sangle à la cheville. Écarte la jambe sur le côté sans pencher le buste."
 },
 {
  "id": "kickback-fessiers-machine",
  "name": "Kickback fessiers (machine)",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "hamstrings"
  ],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Appui sur la machine. Pousse la jambe vers l'arrière et serre les fessiers sans cambrer."
 },
 {
  "id": "fire-hydrant",
  "name": "Fire hydrant",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "obliques"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "À quatre pattes. Lève le genou sur le côté en gardant le bassin stable."
 },
 {
  "id": "clamshell",
  "name": "Clamshell",
  "primary": [
   "glutes"
  ],
  "secondary": [],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "Allongé sur le côté, genoux fléchis. Ouvre le genou du haut sans bouger le bassin."
 },
 {
  "id": "donkey-kick",
  "name": "Donkey kick",
  "primary": [
   "glutes"
  ],
  "secondary": [
   "hamstrings"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "À quatre pattes. Envoie le talon vers le plafond en gardant le dos plat."
 },
 {
  "id": "kettlebell-swing",
  "name": "Kettlebell swing",
  "primary": [
   "glutes",
   "hamstrings"
  ],
  "secondary": [
   "lowerBack",
   "abs",
   "forearms",
   "frontDelts"
  ],
  "equipment": "Kettlebell",
  "category": "jambes",
  "tip": "Charnière de hanche, dos plat. Propulse le kettlebell avec les hanches, bras détendus."
 },
 {
  "id": "planche-copenhague",
  "name": "Planche Copenhague",
  "primary": [
   "adductors"
  ],
  "secondary": [
   "obliques",
   "abs"
  ],
  "equipment": "Poids du corps",
  "category": "jambes",
  "tip": "Planche latérale, pied du haut posé sur un banc. Soulève le bassin et tiens la position."
 },
 {
  "id": "mollets-donkey",
  "name": "Mollets donkey",
  "primary": [
   "calves"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Buste penché, charge sur le bassin. Monte haut sur la pointe des pieds et étire en bas."
 },
 {
  "id": "mollets-smith",
  "name": "Mollets (Smith)",
  "primary": [
   "calves"
  ],
  "secondary": [],
  "equipment": "Machine",
  "category": "jambes",
  "tip": "Barre guidée sur les trapèzes, pointes de pieds sur une cale. Monte haut, marque une pause, descends lentement."
 }
];
