import { Product, Scent, StoreConfig } from "@/types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-jardim",
    name: "Jardim",
    subtitle: "Vela botânica esculpida em cera vegetal",
    price: 50.0,
    description: "Inspirada na delicadeza de um refúgio natural. Uma peça artística rica em relevos botânicos e folhagens que iluminam o ambiente com serenidade e afeto.",
    details: [
      "100% Cera Vegetal de Soja e Coco",
      "Pavio 100% algodão para queima limpa",
      "Trabalho artesanal com detalhes em alto relevo",
      "Aproximadamente 180g"
    ],
    imageUrl: "/products/jardim.jpg",
    category: "Coleção Escultural",
    available: true,
    featured: true,
  },
  {
    id: "prod-rosa",
    name: "Rosa",
    subtitle: "Escultura clássica com pétalas aveludadas",
    price: 50.0,
    description: "Uma verdadeira obra de arte em formato de rosa desabrochando. Transmite romantismo, requinte e ternura, transformando qualquer canto em um espaço poético.",
    details: [
      "Modelagem floral detalhada pétala por pétala",
      "Cera ecológica que não emite toxinas",
      "Perfeita para presentear e decorar",
      "Aproximadamente 160g"
    ],
    imageUrl: "/products/rosa.jpg",
    category: "Coleção Floral",
    available: true,
    featured: true,
  },
  {
    id: "prod-flor",
    name: "Flor",
    subtitle: "Delicadeza geométrica e charme botânico",
    price: 50.0,
    description: "Com traços suaves e desenho acolhedor, a vela Flor traz leveza e calma. Aquece o olhar e dissipa as tensões da rotina através de uma chama mansa e acolhedora.",
    details: [
      "Design floral contemporâneo e elegante",
      "Cera vegetal de textura suave ao toque",
      "Queima uniforme e harmoniosa",
      "Aproximadamente 170g"
    ],
    imageUrl: "/products/flor.jpg",
    category: "Coleção Floral",
    available: true,
    featured: false,
  },
  {
    id: "prod-vidro-pequeno",
    name: "Vidro pequeno",
    subtitle: "Aconchego intimista com tampa protetora",
    price: 25.0,
    description: "O tamanho perfeito para os seus rituais diários de autocuidado, leitura ou meditação. Vem em pote de vidro âmbar/transparente com tampa para conservar o perfume.",
    details: [
      "Recipiente de vidro reutilizável com tampa",
      "Ideal para lavabos, mesas de cabeceira e escritórios",
      "Duração de queima: aprox. 20 a 25 horas",
      "Peso líquido: 100g"
    ],
    imageUrl: "/products/pequeno.jpg",
    category: "Linha Potes de Vidro",
    available: true,
    featured: false,
  },
  {
    id: "prod-vidro-grande",
    name: "Vidro grande",
    subtitle: "Presença marcante e difusão envolvente",
    price: 35.0,
    description: "Para quem deseja preencher salas, quartos amplos e momentos especiais com uma atmosfera mágica e duradoura. Queima prolongada que abraça todo o lar.",
    details: [
      "Recipiente de vidro encorpado de alta resistência térmica",
      "Excelente raio de difusão aromática",
      "Duração de queima: aprox. 35 a 45 horas",
      "Peso líquido: 180g"
    ],
    imageUrl: "/products/grande.jpg",
    category: "Linha Potes de Vidro",
    available: true,
    featured: true,
  },
];

export const INITIAL_SCENTS: Scent[] = [
  {
    id: "scent-vanilla-sugar",
    name: "Vanilla Sugar",
    description: "Um abraço doce e envolvente. A baunilha e o caramelo encontram a delicadeza do jasmim e o toque frutado da framboesa, criando uma atmosfera confortável e acolhedora. Combina com: quartos, salas aconchegantes, tardes tranquilas e momentos de descanso.",
    tags: ["Adocicada", "Acolhedor", "Reconfortante"],
    available: true,
  },
  {
    id: "scent-confort-baby",
    name: "Confort Baby",
    description: "Um perfume delicado que remete ao carinho e ao conforto de roupas recém-lavadas. Combina notas suaves de pera, maçã, rosa, jasmim e lírio-do-vale. Combina com: quartos, ambientes delicados, momentos de tranquilidade e presentes cheios de ternura.",
    tags: ["Infantil", "Suave", "Delicado"],
    available: true,
  },
  {
    id: "scent-la-bomba",
    name: "La Bomba",
    description: "Vibrante, marcante e sofisticada. A pitaya encontra a exuberância da peônia vermelha e do frangipani, enquanto a baunilha e o patchouli acrescentam profundidade. Combina com: salas elegantes, encontros especiais, noites de celebração e ambientes cheios de personalidade.",
    tags: ["Oriental Floral", "Marcante", "Sofisticada"],
    available: true,
  },
  {
    id: "scent-sakura-lovers",
    name: "Sakura Lovers",
    description: "Uma fragrância romântica que combina a suavidade das flores de cerejeira com frutas vermelhas e um fundo cremoso de baunilha. Notas de cereja, cassis, rosa, violeta, framboesa, sândalo e baunilha. Combina com: quartos, momentos românticos, presentes delicados e ambientes acolhedores.",
    tags: ["Floral Frutada", "Romântica", "Adocicada"],
    available: true,
  },
  {
    id: "scent-bamboo-trouss",
    name: "Bamboo Trouss",
    description: "O frescor do limão e da bergamota encontra notas verdes, florais e aquáticas. Um perfume leve e revigorante que transmite a sensação de natureza e equilíbrio. Combina com: salas, escritórios, banheiros, espaços de meditação e ambientes minimalistas.",
    tags: ["Cítrica Herbal", "Aquática", "Revigorante"],
    available: true,
  },
  {
    id: "scent-white-jasmin",
    name: "White Jasmin",
    description: "Um buquê delicado de jasmim, frésia, rosa e lírio-do-vale, com uma abertura fresca de maçã e notas verdes. Elegante, suave e convidativo. Combina com: salas de estar, entradas da casa, momentos de recepção e ambientes sofisticados.",
    tags: ["Floral", "Elegante", "Fresco"],
    available: true,
  },
  {
    id: "scent-cereja-avela",
    name: "Cereja e Avelã",
    description: "Uma combinação irresistível de cereja, avelã e nuances de caramelo e baunilha. Doce, envolvente e cheia de personalidade. Combina com: salas aconchegantes, encontros a dois, noites especiais e dias mais frescos.",
    tags: ["Adocicada", "Envolvente", "Marcante"],
    available: true,
  },
  {
    id: "scent-ginger-bread",
    name: "Ginger Bread",
    description: "Um aroma que lembra biscoitos recém-assados, especiarias quentes e momentos especiais em família. Doce e acolhedor, com uma atmosfera de confeitaria artesanal. Combina com: cozinhas, salas, encontros familiares e celebrações de fim de ano.",
    tags: ["Gourmand Especiada", "Acolhedor", "Festivo"],
    available: true,
  },
  {
    id: "scent-cha-branco",
    name: "Chá Branco",
    description: "Uma fragrância discreta e refinada, inspirada na suavidade das folhas de chá. Ideal para quem aprecia ambientes perfumados com leveza e elegância. Combina com: escritórios, quartos, salas, ambientes minimalistas e momentos de leitura.",
    tags: ["Fresco", "Herbal", "Delicado"],
    available: true,
  },
  {
    id: "scent-flor-cerejeira",
    name: "Flor de Cerejeira",
    description: "Um perfume floral delicado que evoca a beleza da primavera, a serenidade e o romantismo das flores de cerejeira. Combina com: quartos, salas delicadas, momentos tranquilos e presentes românticos.",
    tags: ["Floral", "Romântica", "Serena"],
    available: true,
  },
  {
    id: "scent-pinho-siberiano",
    name: "Pinho Siberiano",
    description: "Inspirada no frescor dos pinheiros e na atmosfera das florestas, é uma opção para quem aprecia perfumes verdes e a sensação de natureza dentro de casa. Combina com: salas, casas de campo, ambientes rústicos e decoração natalina.",
    tags: ["Verde", "Conífero", "Amadeirado"],
    available: true,
  },
  {
    id: "scent-caramelate",
    name: "Caramelate",
    description: "O frescor das folhas verdes encontra a doçura suculenta do figo, envolvida por baunilha, sândalo e caramelo. Um perfume sofisticado e reconfortante. Combina com: salas de estar, encontros elegantes, noites aconchegantes e ambientes de personalidade.",
    tags: ["Frutado Gourmand", "Sofisticado", "Amadeirado"],
    available: true,
  },
  {
    id: "scent-peonia",
    name: "Peônia",
    description: "A delicadeza da peônia em flor se mistura à pera madura, ao pêssego aveludado e a um toque quente de âmbar. Um perfume suave, elegante e acolhedor. Combina com: quartos, salas sofisticadas, momentos de autocuidado e presentes especiais.",
    tags: ["Floral Frutado", "Elegante", "Suave"],
    available: true,
  },
  {
    id: "scent-champagne-toast",
    name: "Champagne Toast",
    description: "Uma fragrância alegre e sofisticada, com notas cítricas e frutadas, suavizadas pelo toque doce da baunilha. Um verdadeiro convite para celebrar. Combina com: encontros especiais, aniversários, momentos românticos, comemorações e presentes.",
    tags: ["Frutado Cítrico", "Adocicado", "Festivo"],
    available: true,
  },
];

export const INITIAL_CONFIG: StoreConfig = {
  storeName: "SELUMI",
  tagline: "Luz que acolhe",
  whatsappNumber: "5511999999999", // Editável livremente no Painel Admin
  welcomeMessage: "Olá! Gostaria de tirar uma dúvida sobre as velas da Selumi.",
  pixKey: "selumi.velas@exemplo.com.br",
  pixKeyType: "E-mail ou Chave Aleatória",
  isOpen: true,
  cityState: "Brasil",
  instagramUrl: "https://instagram.com",
};

export const ADMIN_CREDENTIALS = {
  username: "selumi",
  password: "111026",
};
