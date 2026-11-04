/* =========================================================
   CONFIGURAÇÃO — altere aqui
   ========================================================= */
const WHATSAPP = '5511987654321'; // DDI + DDD + número, só dígitos
const TAXA_ENTREGA = 6.00;
const FRETE_GRATIS_A_PARTIR = 80.00;

/* =========================================================
   CARDÁPIO
   ========================================================= */
const CATEGORIAS = [
  { id: 'marmitas',   nome: 'Marmitas' },
  { id: 'executivos', nome: 'Pratos executivos' },
  { id: 'porcoes',    nome: 'Porções' },
  { id: 'bebidas',    nome: 'Bebidas' },
  { id: 'sobremesas', nome: 'Sobremesas' }
];

const MENU = [
  // MARMITAS
  { id: 1,  cat:'marmitas', nome:'Marmita P', desc:'Arroz, feijão, 1 mistura, salada e farofa', preco:22.00, emoji:'🍱' },
  { id: 2,  cat:'marmitas', nome:'Marmita M', desc:'Arroz, feijão, 2 misturas, salada e farofa', preco:28.00, emoji:'🍛', tag:'Mais pedida', destaque:true },
  { id: 3,  cat:'marmitas', nome:'Marmita G', desc:'Arroz, feijão, 3 misturas, 2 acompanhamentos', preco:34.00, emoji:'🍲' },
  { id: 4,  cat:'marmitas', nome:'Marmita Fit', desc:'Arroz integral, frango grelhado e legumes no vapor', preco:30.00, emoji:'🥗', tag:'Saudável' },
  { id: 5,  cat:'marmitas', nome:'Marmita Vegana', desc:'Arroz, feijão, grão-de-bico temperado e legumes assados', preco:26.00, emoji:'🥦' },

  // EXECUTIVOS
  { id: 6,  cat:'executivos', nome:'Feijoada Completa', desc:'Feijoada, arroz, couve refogada, farofa e laranja', preco:39.00, emoji:'🫘', tag:'Sábado', destaque:true },
  { id: 7,  cat:'executivos', nome:'Bife à Parmegiana', desc:'Bife empanado, molho de tomate, queijo, arroz e fritas', preco:42.00, emoji:'🥩' },
  { id: 8,  cat:'executivos', nome:'Strogonoff de Frango', desc:'Frango cremoso, arroz branco e batata palha', preco:34.00, emoji:'🍄' },
  { id: 9,  cat:'executivos', nome:'Costelinha com Mandioca', desc:'Costelinha cozida lentamente, mandioca e arroz', preco:44.00, emoji:'🍖' },
  { id: 10, cat:'executivos', nome:'Frango à Passarinho', desc:'Frango frito crocante, arroz, feijão e salada', preco:36.00, emoji:'🍗' },

  // PORÇÕES
  { id: 11, cat:'porcoes', nome:'Batata Frita', desc:'Porção individual, crocante e sequinha', preco:18.00, emoji:'🍟' },
  { id: 12, cat:'porcoes', nome:'Frango à Passarinho (porção)', desc:'Serve 2 pessoas, com alho e limão', preco:32.00, emoji:'🍗' },
  { id: 13, cat:'porcoes', nome:'Bolinho de Bacalhau', desc:'8 unidades com aioli de limão', preco:26.00, emoji:'🐟' },
  { id: 14, cat:'porcoes', nome:'Pastel de Carne', desc:'6 unidades fritas na hora', preco:20.00, emoji:'🥟' },

  // BEBIDAS
  { id: 15, cat:'bebidas', nome:'Refrigerante Lata', desc:'Coca-Cola, Guaraná ou Fanta — 350ml', preco:6.00, emoji:'🥤' },
  { id: 16, cat:'bebidas', nome:'Suco Natural 500ml', desc:'Laranja, limão ou maracujá, feito na hora', preco:9.00, emoji:'🧃' },
  { id: 17, cat:'bebidas', nome:'Água Mineral 500ml', desc:'Com ou sem gás', preco:4.00, emoji:'💧' },
  { id: 18, cat:'bebidas', nome:'Cerveja Long Neck', desc:'Gelada, 355ml', preco:10.00, emoji:'🍺' },

  // SOBREMESAS
  { id: 19, cat:'sobremesas', nome:'Pudim de Leite', desc:'Fatia generosa com calda de caramelo', preco:8.00, emoji:'🍮', destaque:true },
  { id: 20, cat:'sobremesas', nome:'Bolo de Cenoura', desc:'Fatia com cobertura de chocolate', preco:9.00, emoji:'🍰' },
  { id: 21, cat:'sobremesas', nome:'Brigadeiro Gourmet', desc:'Unidade, chocolate belga', preco:5.00, emoji:'🍫' },
  { id: 22, cat:'sobremesas', nome:'Açaí 300ml', desc:'Com granola e banana', preco:16.00, emoji:'🫐' }
];
