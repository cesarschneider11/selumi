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
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=900&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1572726729437-3732efc1ec0a?auto=format&fit=crop&w=900&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=900&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=900&q=80",
    category: "Linha Potes de Vidro",
    available: true,
    featured: true,
  },
];

export const INITIAL_SCENTS: Scent[] = [
  {
    id: "scent-baunilha",
    name: "Baunilha Real & Fava Tonka",
    description: "Notas doces, amendoadas e aconchegantes. Traz sensação de afeto, acolhimento e doces memórias de infância.",
    tags: ["Doce", "Reconfortante", "Acolhedor"],
    available: true,
  },
  {
    id: "scent-lavanda",
    name: "Lavanda Francesa & Camomila",
    description: "Aroma floral calmante e sereno. Desacelera os pensamentos, alivia o estresse e prepara o ambiente para um sono restaurador.",
    tags: ["Floral", "Relaxante", "Sereno"],
    available: true,
  },
  {
    id: "scent-cerejeira",
    name: "Flor de Cerejeira & Pêssego",
    description: "Delicada explosão floral frutada. Um perfume feminino, luminoso e sofisticado que evoca a beleza da primavera.",
    tags: ["Floral Frutado", "Elegante", "Fresco"],
    available: true,
  },
  {
    id: "scent-capim-limao",
    name: "Capim Limão & Alecrim",
    description: "Frescor cítrico e notas herbais revigorantes. Promove clareza mental, renovação de energias e sensação de limpeza.",
    tags: ["Cítrico Herbal", "Revigorante", "Limpidez"],
    available: true,
  },
  {
    id: "scent-canela",
    name: "Canela & Especiarias Quentes",
    description: "Calor aromático envolvente com canela, noz-moscada e cravo. Cria uma atmosfera de aconchego incomparável para dias frescos.",
    tags: ["Especiado", "Quente", "Marcante"],
    available: true,
  },
  {
    id: "scent-madeira",
    name: "Madeira Nobre & Âmbar",
    description: "Notas amadeiradas sofisticadas com toque aveludado de âmbar. Intimista, requintado e profundamente reconfortante.",
    tags: ["Amadeirado", "Sofisticado", "Noturno"],
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
