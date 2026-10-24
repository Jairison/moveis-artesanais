/* ==========================================================================
   CATÁLOGO DE PRODUTOS — linha Tricô Náutico Alto Luxo
   Cadastre até 30 produtos. Fotos em assets/img/produtos/ (ideal: retrato 4:5,
   ex. 880×1100, peça centralizada). Medidas e cores são feitas sob medida.
   ========================================================================== */
window.CATEGORIAS = [
  { id: "conjuntos", nome: "Conjuntos", descricao: "Jantar e estar" },
  { id: "estar", nome: "Sofás e Poltronas", descricao: "Conforto trançado" },
  { id: "mesas", nome: "Mesas e Puffs", descricao: "Centro e apoio" },
];

window.PRODUTOS = [
  {
    codigo: "MB-01", nome: "Conjunto de Jantar Noir", categoria: "conjuntos",
    estrutura: "Alumínio", corda: "Tricô náutico preto, corda naval",
    acabamento: "Mesa redonda em madeira com centro giratório e almofadas impermeáveis",
    medidas: "Sob medida",
    descricao: "Quatro cadeiras com encosto curvo em tricô náutico que envolve o corpo, e mesa redonda em madeira com centro giratório. A estrutura em alumínio garante leveza e durabilidade na área externa.",
    destaque: true, imagem: "assets/img/produtos/conjunto-jantar.jpg",
  },
  {
    codigo: "MB-02", nome: "Conjunto Marinho", categoria: "conjuntos",
    estrutura: "Alumínio com pés em madeira", corda: "Tricô náutico azul-marinho, corda naval",
    acabamento: "Almofadas em tecido impermeável",
    medidas: "Sob medida",
    descricao: "Sofá de três lugares e duas poltronas com laterais vazadas em tricô náutico azul-marinho e pés em madeira. Almofadas impermeáveis prontas para o dia a dia da área externa.",
    destaque: false, imagem: "assets/img/produtos/conjunto-marinho.jpg",
  },
  {
    codigo: "MB-03", nome: "Poltrona Marinho", categoria: "estar",
    estrutura: "Alumínio com pés em madeira", corda: "Tricô náutico azul-marinho, corda naval",
    acabamento: "Almofadas em tecido impermeável",
    medidas: "Sob medida",
    descricao: "A poltrona do Conjunto Marinho, também vendida avulsa: laterais em trama vazada de corda naval, cantoneiras em madeira e almofadas impermeáveis.",
    destaque: false, imagem: "assets/img/produtos/poltrona-marinho.jpg",
  },
  {
    codigo: "MB-04", nome: "Sofá Orgânico Noir", categoria: "estar",
    estrutura: "Alumínio", corda: "Macramê em corda naval preta",
    acabamento: "Assento e almofadas em tecido impermeável",
    medidas: "Sob medida",
    descricao: "Desenhado para envolver: encosto curvo e formas orgânicas em macramê de corda naval. Transforma a área externa em um espaço de conforto e sofisticação.",
    destaque: true, imagem: "assets/img/produtos/sofa-organico.jpg",
  },
  {
    codigo: "MB-05", nome: "Puff Mesa Maré", categoria: "mesas",
    estrutura: "Base trançada com tampo em madeira", corda: "Trama artesanal branca e azul-marinho",
    acabamento: "Tampo em madeira envernizada com acabamento em corda",
    medidas: "Sob medida",
    descricao: "Mesa de centro em formato de puff, com tampo em réguas de madeira e trama bicolor feita à mão. Funciona como apoio e destaque em salas e varandas.",
    destaque: false, imagem: "assets/img/produtos/puff-mesa.jpg",
  },
];
