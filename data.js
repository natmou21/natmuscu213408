/* Données générées à partir du catalogue d'exercices. */
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
  "tip": "Sur une marche, talons dans le vide. Monte haut, puis descends en étirant les mollets."
 }
];
