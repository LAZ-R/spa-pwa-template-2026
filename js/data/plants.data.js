/* 
| id     | Nom scientifique                   | Nom commun officiel         | Nom romancé / simplifié | Résumé visuel                                                              |
| ------ | ---------------------------------- | --------------------------- | ----------------------- | -------------------------------------------------------------------------- |
| **1**  | — (graminées diverses)             | Herbe commune               | Herbe                   | Tapis vert simple, fines tiges, aucune singularité visuelle.               |
| **2**  | *Veronica officinalis*             | Véronique officinale        | Petite Véronique        | Feuilles ovales, petites fleurs bleu pâle, allure douce.                   |
| **3**  | *Lamium purpureum*                 | Lamier pourpre              | Lamier pourpre          | Feuilles vert-violacé, fleurs rose-pourpre, contraste discret.             |
| **4**  | *Dryopteris filix-mas*             | Fougère mâle                | Fougère                 | Grandes frondes divisées, silhouette classique et reconnaissable.          |
| **5**  | *Heuchera sanguinea*               | Heuchère sanguine / pourpre | Heuchère sanguine       | Feuilles gaufrées rouge/pourpre, relief marqué, premier « effet couleur ». |
| **6**  | *Hosta* spp.                       | Hosta                       | Hosta panaché           | Feuilles larges, panachures blanc/vert/bleuté, port arrondi.               |
| **7**  | *Athyrium niponicum* var. *pictum* | Fougère peinte du Japon     | Fougère arc-en-ciel     | Reflets argentés, violacés, olive ; texture très graphique.                |
| **8**  | *Monstera deliciosa*               | Monstera                    | Monstera                | Grandes feuilles découpées, silhouette iconique tropicale.                 |
| **9**  | *Clusia rosea*                     | Clusia / Plante-autographe  | Clusia                  | Feuilles épaisses elliptiques, très lustrées, port compact et dense.       |
| **10** | *Calathea orbifolia*               | Calathée orbifolia          | Calathea argentée       | Feuilles rondes rayées vert/argent, effet graphique naturel.               |
| **11** | *Stromanthe sanguinea* ‘Triostar’  | Stromanthe triostar         | Stromanthe tricolore    | Feuilles longues vert/blanc/rose, revers rose vif, panache spectaculaire.  |
| **12** | *Anthurium clarinervium*           | Anthurium clarinervium      | Anthurium velours       | Feuilles en cœur, vert sombre velouté, nervures blanches contrastées.      |
| **13** | *Schefflera arboricola*            | Scheffléra ombrelle         | Ombrelle tropicale      | Feuilles palmées en étoile, port arbustif léger.                           |
| **14** | *Hibiscus rosa-sinensis*           | Hibiscus tropical           | Hibiscus                | Grandes fleurs rouges/orange/jaunes, arbuste dense et lumineux.            |
| **15** | *Dracaena fragrans*                | Dragonnier parfumé          | Dragonnier panaché      | Feuilles longues rubanées, panachures jaune/vert, port vertical.           |
| **16** | *Ficus lyrata*                     | Figuier lyre                | Figuier lyre            | Feuilles immenses en forme de lyre, allure majestueuse, « boss final ».    |
*/

export const PLANTS = [
  {
    id: 1,
    name: 'Herbe',
    price: 100,
    reputation_boost: .50,
    time_to_unlock: 0,
  },
  {
    id: 2,
    name: 'Petite Véronique',
    price: 150,
    reputation_boost: .75,
    time_to_unlock: 0,
  },
  {
    id: 3,
    name: 'Lamier pourpre',
    price: 200,
    reputation_boost: 1.00,
    time_to_unlock: 0,
  },
  {
    id: 4,
    name: 'Fougère',
    price: 250,
    reputation_boost: 1.25,
    time_to_unlock: 0,
  },
  {
    id: 5,
    name: 'Heuchère sanguine',
    price: 300,
    reputation_boost: 1.50,
    time_to_unlock: 600,
  },
  {
    id: 6,
    name: 'Hosta panaché',
    price: 350,
    reputation_boost: 1.75,
    time_to_unlock: 1200,
  },
  {
    id: 7,
    name: 'Fougère arc-en-ciel',
    price: 400,
    reputation_boost: 2.00,
    time_to_unlock: 1800,
  },
  {
    id: 8,
    name: 'Monstera',
    price: 500,
    reputation_boost: 2.50,
    time_to_unlock: 2400,
  },

  {
    id: 9,
    name: 'Clusia',
    price: 600,
    reputation_boost: 3.00,
    time_to_unlock: 3000,
  },
  {
    id: 10,
    name: 'Calathea argentée',
    price: 700,
    reputation_boost: 3.50,
    time_to_unlock: 3600,
  },
  {
    id: 11,
    name: 'Stromanthe tricolore',
    price: 800,
    reputation_boost: 4.00,
    time_to_unlock: 4200,
  },
  {
    id: 12,
    name: 'Anthurium velours',
    price: 900,
    reputation_boost: 4.50,
    time_to_unlock: 4800,
  },
  {
    id: 13,
    name: 'Scheffléra ombrelle',
    price: 1000,
    reputation_boost: 5.00,
    time_to_unlock: 5400,
  },
  {
    id: 14,
    name: 'Hibiscus',
    price: 1125,
    reputation_boost: 5.50,
    time_to_unlock: 6000,
  },
  {
    id: 15,
    name: 'Dragonnier panaché',
    price: 1250,
    reputation_boost: 6.25,
    time_to_unlock: 6600,
  },
  {
    id: 16,
    name: 'Ficus lyre',
    price: 1500,
    reputation_boost: 7.50,
    time_to_unlock: 7200,
  },
];