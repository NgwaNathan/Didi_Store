import type { Category, Product } from "@/lib/types";
import type { Locale } from "./config";

type ProductCopy = { description: string; highlights: string[] };

/**
 * French catalogue copy. Brand and model names are deliberately left untranslated
 * — real storefronts do not translate "Sony Alpha a7 IV".
 */
const productsFr: Record<string, ProductCopy> = {
  "p-001": {
    description:
      "Le Sony a7 IV excelle aussi bien en photo qu’en vidéo. Cet hybride avancé associe la définition et l’autofocus attendus par les photographes à un enregistrement 4K 60p robuste pour les vidéastes et les créateurs de contenu.",
    highlights: [
      "Capteur plein format Exmor R CMOS de 33 Mpx",
      "Jusqu’à 10 i/s, sensibilité ISO 100–51200",
      "Vidéo 4K 60p en 10 bits S-Cinetone",
      "Viseur électronique 3,68 Mpts à 120 i/s",
      "Écran tactile orientable 3 pouces de 1,03 Mpts",
    ],
  },
  "p-002": {
    description:
      "Capturez un son de qualité broadcast avec notre micro à condensateur phare. Conçu pour le podcast, la prise de voix et la voix off, il est livré avec une suspension antichoc et un filtre anti-pop pour enregistrer proprement dès le premier jour.",
    highlights: [
      "Capsule cardioïde à large membrane",
      "Réponse en fréquence 20 Hz – 20 kHz",
      "Suspension antichoc et filtre anti-pop inclus",
      "Sortie XLR à très faible bruit propre",
    ],
  },
  "p-003": {
    description:
      "Une montre connectée haut de gamme dotée d’un écran AMOLED toujours actif, de plusieurs jours d’autonomie et d’un suivi santé complet. Compatible Android et iOS, elle permet aussi de prendre vos appels au poignet.",
    highlights: [
      "Écran AMOLED 1,43 pouce toujours actif",
      "Suivi de la fréquence cardiaque, du SpO2 et du sommeil",
      "Jusqu’à 7 jours d’autonomie",
      "Étanchéité 5 ATM",
    ],
  },
  "p-004": {
    description:
      "Faites frire, rôtir et cuire au four avec jusqu’à 85 % de matière grasse en moins. Le panier de 5 L nourrit confortablement une famille de quatre personnes, et huit programmes numériques suppriment toute approximation en cuisine.",
    highlights: [
      "Panier antiadhésif de 5 L compatible lave-vaisselle",
      "8 programmes de cuisson en une touche",
      "Plage de température de 80 à 200 °C",
      "Arrêt automatique et poignée froide au toucher",
    ],
  },
  "p-005": {
    description:
      "Un panneau LED bicolore fiable pour les interviews, la photo de produit et les petits plateaux. Réglez la température de couleur du chaud à la lumière du jour sans gélatine, et variez l’intensité jusqu’à 0 % sans scintillement à l’image.",
    highlights: [
      "Puissance de 60 W, IRC supérieur à 96",
      "Réglage bicolore de 3200 K à 5600 K",
      "Variation de 0 à 100 % sans scintillement",
      "Volets coupe-flux et pied d’éclairage inclus",
    ],
  },
  "p-006": {
    description:
      "Réduction de bruit active hybride et transducteurs de 40 mm réglés pour une écoute équilibrée et non fatigante. Trente heures de lecture par charge, et dix minutes de recharge vous offrent cinq heures supplémentaires.",
    highlights: [
      "Réduction de bruit hybride avec mode transparence",
      "Transducteurs dynamiques de 40 mm",
      "30 h d’autonomie, charge rapide USB-C",
      "Bluetooth 5.3 avec appairage multipoint",
    ],
  },
  "p-007": {
    description:
      "Le zoom de référence pour les boîtiers à monture RF. Une ouverture constante à f/2,8 sur toute la plage et cinq stops de stabilisation le rendent aussi à l’aise en événementiel qu’en studio ou en extérieur.",
    highlights: [
      "Ouverture maximale constante de f/2,8",
      "Stabilisation optique de 5 stops",
      "Moteur autofocus Nano USM",
      "Construction série L tropicalisée",
    ],
  },
  "p-008": {
    description:
      "Un moteur de 1200 W et une lame six branches en acier inoxydable viennent à bout des fruits congelés, des fruits secs et des soupes chaudes sans broncher. Le bol de 1,8 L en Tritan résiste aux chocs et passe au lave-vaisselle.",
    highlights: [
      "Moteur cuivre de 1200 W",
      "Bol de 1,8 L en Tritan sans BPA",
      "Lame six branches en acier inoxydable",
      "Fonction pulse et 3 vitesses",
    ],
  },
  "p-009": {
    description:
      "Remplace quinze paires d’haltères par une simple molette. Tournez pour choisir votre charge, sortez l’haltère de son support et enchaînez votre série — idéal quand la place manque.",
    highlights: [
      "De 2 kg à 24 kg par haltère",
      "Sélection de la charge par molette",
      "Vendu par paire avec supports",
      "Poignée moletée antidérapante",
    ],
  },
  "p-010": {
    description:
      "Des jambes en fibre de carbone qui maintiennent ce trépied à 1,2 kg tout en supportant 8 kg de boîtier et d’objectif. Replié, il mesure 38 cm et se glisse dans la plupart des bagages cabine.",
    highlights: [
      "Jambes en fibre de carbone 10 plis",
      "1,2 kg pour une charge utile de 8 kg",
      "Se replie à 38 cm pour le voyage",
      "Rotule ball avec plateau Arca-Swiss",
    ],
  },
  "p-011": {
    description:
      "Un bracelet léger qui se fait oublier. Fréquence cardiaque en continu, analyse des phases de sommeil et quatorze modes sportifs, avec quinze jours d’autonomie entre deux charges.",
    highlights: [
      "15 jours d’autonomie",
      "Fréquence cardiaque continue et phases de sommeil",
      "14 modes sportifs",
      "Résistance à la poussière et à l’eau IP68",
    ],
  },
  "p-012": {
    description:
      "Deux boîtes à lumière de 60 x 60 cm avec pieds et ampoules équilibrées lumière du jour — un ensemble complet pour débuter en portrait, en photo de produit et en vidéo face caméra.",
    highlights: [
      "2 boîtes à lumière de 60 x 60 cm",
      "Ampoules 5500 K équilibrées lumière du jour",
      "Pieds d’éclairage réglables jusqu’à 2 m",
      "Sac de transport inclus",
    ],
  },
  "p-013": {
    description:
      "Un clavier mécanique fin au format 75 % qui se connecte à trois appareils en Bluetooth ou fonctionne en filaire en USB-C. Les switches remplaçables à chaud permettent d’en changer le toucher sans soudure.",
    highlights: [
      "Format 75 % à profil bas",
      "Switches optiques remplaçables à chaud",
      "Bluetooth 5.1, appairage de 3 appareils",
      "Touches Mac et Windows incluses",
    ],
  },
  "p-014": {
    description:
      "Un tapis en TPE de 6 mm, assez épais pour le travail au sol et assez adhérent pour tenir une posture même les mains moites. Il s’enroule avec la sangle fournie.",
    highlights: [
      "Amorti en TPE de 6 mm",
      "Surface antidérapante sur les deux faces",
      "Dimensions de 183 x 61 cm",
      "Sangle de transport incluse",
    ],
  },
  "p-015": {
    description:
      "Réussissez un vrai espresso à la maison grâce à une pompe 15 bars, un chauffage thermoblock et une buse vapeur pour le lait. Accepte le café moulu comme les dosettes ESE.",
    highlights: [
      "Pompe italienne 15 bars",
      "Buse vapeur professionnelle",
      "Réservoir d’eau amovible de 1,5 L",
      "Compatible café moulu et dosettes ESE",
    ],
  },
  "p-016": {
    description:
      "Étanche jusqu’à 10 m sans caisson, avec une stabilisation électronique qui garde des images fluides à vélo, en planche ou à la course. Deux batteries et un kit de fixation sont fournis.",
    highlights: [
      "Capture vidéo 4K à 60 i/s",
      "Stabilisation électronique EIS 3.0",
      "Étanche à 10 m sans caisson",
      "2 batteries et kit de fixation inclus",
    ],
  },
  "p-017": {
    description:
      "Une enceinte robuste de 30 W qui joue vingt heures durant et se moque de la pluie et de la poussière. Appairez-en deux pour une vraie séparation stéréo.",
    highlights: [
      "Puissance stéréo de 30 W",
      "20 heures d’autonomie",
      "Indice d’étanchéité IPX7",
      "Appairage stéréo True Wireless",
    ],
  },
  "p-018": {
    description:
      "Cinq bandes en latex, de légère à très forte, avec ancrage de porte, poignées et sangles de cheville — un équipement complet du corps qui tient dans un petit sac.",
    highlights: [
      "5 niveaux de résistance, de 5 à 35 kg",
      "Fabrication en latex naturel",
      "Ancrage de porte et sangles de cheville",
      "Poignées et sac de transport inclus",
    ],
  },
};

const categoriesFr: Record<string, { name: string; tagline: string }> = {
  photography: {
    name: "Photographie",
    tagline: "Appareils photo, objectifs et rigs pour créateurs",
  },
  electronics: {
    name: "Électronique",
    tagline: "Audio, informatique et technologie du quotidien",
  },
  "home-kitchen": {
    name: "Maison & Cuisine",
    tagline: "Des appareils qui simplifient la vie à la maison",
  },
  fitness: {
    name: "Sport",
    tagline: "S’entraîner chez soi avec le bon matériel",
  },
  lighting: {
    name: "Éclairage",
    tagline: "Éclairage de studio et lumière continue",
  },
  wearables: {
    name: "Objets connectés",
    tagline: "Montres connectées et bracelets d’activité",
  },
};

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === "en") return product;
  const copy = productsFr[product.id];
  return copy ? { ...product, description: copy.description, highlights: copy.highlights } : product;
}

export function localizeCategory(category: Category, locale: Locale): Category {
  if (locale === "en") return category;
  const copy = categoriesFr[category.id];
  return copy ? { ...category, name: copy.name, tagline: copy.tagline } : category;
}
