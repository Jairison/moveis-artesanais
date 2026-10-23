/* ==========================================================================
   CATÁLOGO DE PRODUTOS
   Cadastre até 30 produtos. Para adicionar foto, coloque o arquivo em
   assets/img/produtos/ e informe o caminho no campo "imagem".
   Sem foto, o site exibe uma ilustração elegante da categoria.
   ========================================================================== */
window.CATEGORIAS = [
  { id: "cadeiras", nome: "Cadeiras", descricao: "A assinatura da casa" },
  { id: "poltronas", nome: "Poltronas", descricao: "Conforto esculpido" },
  { id: "mesas", nome: "Mesas", descricao: "Jantar e centro" },
  { id: "bancos", nome: "Bancos e Banquetas", descricao: "Balcão e apoio" },
  { id: "aparadores", nome: "Aparadores", descricao: "Buffets e consoles" },
  { id: "estantes", nome: "Estantes e Nichos", descricao: "Arte para expor" },
];

window.PRODUTOS = [
  // ---------------- CADEIRAS ----------------
  { codigo: "MB-C01", nome: "Cadeira Imperial", categoria: "cadeiras", madeira: "Freijó maciço", acabamento: "Verniz acetinado", medidas: "48 × 55 × 92 cm", descricao: "Encosto em curva contínua e assento estofado em linho. Encaixes tradicionais, sem parafusos aparentes.", destaque: true, imagem: "assets/img/produtos/mb-c01.jpg" },
  { codigo: "MB-C02", nome: "Cadeira Dom", categoria: "cadeiras", madeira: "Cumaru", acabamento: "Óleo natural", medidas: "46 × 52 × 88 cm", descricao: "Linhas retas e estrutura robusta. Assento em palhinha indiana trançada à mão.", destaque: true, imagem: "assets/img/produtos/mb-c02.jpg" },
  { codigo: "MB-C03", nome: "Cadeira Siciliana", categoria: "cadeiras", madeira: "Nogueira", acabamento: "Laca fosca", medidas: "50 × 56 × 95 cm", descricao: "Encosto vazado com ripas torneadas. Inspiração clássica com ergonomia contemporânea.", destaque: false, imagem: "assets/img/produtos/mb-c03.jpg" },
  { codigo: "MB-C04", nome: "Cadeira Vittorio", categoria: "cadeiras", madeira: "Jequitibá", acabamento: "Verniz fosco", medidas: "47 × 54 × 84 cm", descricao: "Braços orgânicos e encosto envolvente. Ideal para cabeceiras de mesa.", destaque: false, imagem: "assets/img/produtos/mb-c04.jpg" },
  { codigo: "MB-C05", nome: "Cadeira Corleone", categoria: "cadeiras", madeira: "Freijó", acabamento: "Óleo e cera", medidas: "49 × 55 × 90 cm", descricao: "A peça que deu origem ao apelido \"o chefão das cadeiras\". Presença e conforto absolutos.", destaque: true, imagem: "assets/img/produtos/mb-c05.jpg" },
  { codigo: "MB-C06", nome: "Cadeira Tramada", categoria: "cadeiras", madeira: "Tauari", acabamento: "Verniz natural", medidas: "45 × 50 × 82 cm", descricao: "Encosto e assento em palhinha trançada à mão, com braços em madeira maciça.", destaque: false, imagem: "assets/img/produtos/mb-c06.jpg" },
  { codigo: "MB-C07", nome: "Cadeira Lumière", categoria: "cadeiras", madeira: "Carvalho", acabamento: "Laca off-white", medidas: "46 × 53 × 86 cm", descricao: "Delicada e leve, com pés afunilados e estofado removível.", destaque: false, imagem: "assets/img/produtos/mb-c07.jpg" },

  // ---------------- POLTRONAS ----------------
  { codigo: "MB-P01", nome: "Poltrona Padrino", categoria: "poltronas", madeira: "Freijó maciço", acabamento: "Couro natural", medidas: "78 × 82 × 80 cm", descricao: "Estrutura torneada à mão e estofado em couro legítimo. Uma peça de colecionador.", destaque: true, imagem: "assets/img/produtos/mb-p01.jpg" },
  { codigo: "MB-P02", nome: "Poltrona Aurora", categoria: "poltronas", madeira: "Nogueira", acabamento: "Linho bouclé", medidas: "72 × 78 × 76 cm", descricao: "Base curva e almofadas soltas em bouclé. Aconchego para salas de leitura.", destaque: false, imagem: "assets/img/produtos/mb-p02.jpg" },
  { codigo: "MB-P03", nome: "Poltrona Varanda", categoria: "poltronas", madeira: "Cumaru", acabamento: "Óleo para área externa", medidas: "70 × 85 × 78 cm", descricao: "Encosto reclinado e assento em corda. Resistente a áreas externas cobertas.", destaque: false, imagem: "assets/img/produtos/mb-p03.jpg" },
  { codigo: "MB-P04", nome: "Poltrona Bergère", categoria: "poltronas", madeira: "Freijó", acabamento: "Veludo", medidas: "74 × 80 × 98 cm", descricao: "Releitura da bergère clássica com encosto alto e braços estofados.", destaque: false, imagem: "assets/img/produtos/mb-p04.jpg" },
  { codigo: "MB-P05", nome: "Poltrona Giro", categoria: "poltronas", madeira: "Carvalho", acabamento: "Couro caramelo", medidas: "76 × 76 × 74 cm", descricao: "Estrutura reta em madeira maciça e estofado firme. Sóbria e imponente.", destaque: false, imagem: "assets/img/produtos/mb-p05.jpg" },

  // ---------------- MESAS ----------------
  { codigo: "MB-M01", nome: "Mesa de Jantar Família", categoria: "mesas", madeira: "Peroba-rosa de demolição", acabamento: "Verniz acetinado", medidas: "240 × 100 × 77 cm", descricao: "Tampo inteiriço de 6 cm e pés em cavalete. Para reunir gerações.", destaque: true, imagem: "assets/img/produtos/mb-m01.jpg" },
  { codigo: "MB-M02", nome: "Mesa Redonda Orbe", categoria: "mesas", madeira: "Freijó", acabamento: "Óleo natural", medidas: "Ø 130 × 76 cm", descricao: "Base escultural em lâminas radiais. Acomoda 6 lugares com conforto.", destaque: false, imagem: "assets/img/produtos/mb-m02.jpg" },
  { codigo: "MB-M03", nome: "Mesa Orgânica", categoria: "mesas", madeira: "Pequi", acabamento: "Resina e óleo", medidas: "220 × 95 × 76 cm", descricao: "Bordas naturais da tora preservadas. Cada tampo é único.", destaque: true, imagem: "assets/img/produtos/mb-m03.jpg" },
  { codigo: "MB-M04", nome: "Mesa de Centro Duna", categoria: "mesas", madeira: "Cumaru", acabamento: "Cera de abelha", medidas: "110 × 60 × 35 cm", descricao: "Formato orgânico com cantos suaves e base recuada.", destaque: false, imagem: "assets/img/produtos/mb-m04.jpg" },
  { codigo: "MB-M05", nome: "Mesa Lateral Pilar", categoria: "mesas", madeira: "Nogueira", acabamento: "Verniz fosco", medidas: "Ø 45 × 55 cm", descricao: "Coluna torneada em peça única. Apoio elegante para poltronas.", destaque: false, imagem: "assets/img/produtos/mb-m05.jpg" },
  { codigo: "MB-M06", nome: "Mesa Gourmet", categoria: "mesas", madeira: "Jatobá", acabamento: "Óleo alimentício", medidas: "200 × 90 × 77 cm", descricao: "Robusta e resistente ao uso diário em áreas gourmet.", destaque: false, imagem: "assets/img/produtos/mb-m06.jpg" },

  // ---------------- BANCOS ----------------
  { codigo: "MB-B01", nome: "Banqueta Alta Bistrô", categoria: "bancos", madeira: "Freijó", acabamento: "Verniz acetinado", medidas: "42 × 45 × 100 cm", descricao: "Apoio para os pés em metal escovado e assento ergonômico.", destaque: false, imagem: "assets/img/produtos/mb-b01.jpg" },
  { codigo: "MB-B02", nome: "Banco Namoradeira", categoria: "bancos", madeira: "Cumaru", acabamento: "Óleo natural", medidas: "130 × 50 × 85 cm", descricao: "Banco com encosto para dois, perfeito para varandas e halls.", destaque: false, imagem: "assets/img/produtos/mb-b02.jpg" },
  { codigo: "MB-B03", nome: "Banco Tora", categoria: "bancos", madeira: "Pequi", acabamento: "Cera natural", medidas: "180 × 40 × 45 cm", descricao: "Peça maciça com bordas naturais. Escultura funcional.", destaque: false, imagem: "assets/img/produtos/mb-b03.jpg" },
  { codigo: "MB-B04", nome: "Banqueta Selim", categoria: "bancos", madeira: "Nogueira", acabamento: "Couro", medidas: "40 × 40 × 75 cm", descricao: "Assento côncavo estofado em couro, altura de bancada.", destaque: false, imagem: "assets/img/produtos/mb-b04.jpg" },
  { codigo: "MB-B05", nome: "Pufe Tramado", categoria: "bancos", madeira: "Tauari", acabamento: "Linho cru", medidas: "50 × 50 × 42 cm", descricao: "Pufe quadrado estofado, com pés torneados e travessas em X.", destaque: false, imagem: "assets/img/produtos/mb-b05.jpg" },

  // ---------------- APARADORES ----------------
  { codigo: "MB-A01", nome: "Aparador Ripado", categoria: "aparadores", madeira: "Freijó", acabamento: "Verniz fosco", medidas: "180 × 45 × 80 cm", descricao: "Portas ripadas com abertura por toque e interior em laca.", destaque: true, imagem: "assets/img/produtos/mb-a01.jpg" },
  { codigo: "MB-A02", nome: "Buffet Clássico", categoria: "aparadores", madeira: "Nogueira", acabamento: "Laca e madeira", medidas: "200 × 50 × 85 cm", descricao: "Quatro portas e duas gavetas com corrediças ocultas.", destaque: false, imagem: "assets/img/produtos/mb-a02.jpg" },
  { codigo: "MB-A03", nome: "Console Hall", categoria: "aparadores", madeira: "Cumaru", acabamento: "Óleo natural", medidas: "120 × 35 × 82 cm", descricao: "Leve e esguio, ideal para entradas e corredores.", destaque: false, imagem: "assets/img/produtos/mb-a03.jpg" },
  { codigo: "MB-A04", nome: "Aparador Palhinha", categoria: "aparadores", madeira: "Freijó", acabamento: "Palhinha indiana", medidas: "160 × 42 × 78 cm", descricao: "Portas com palhinha natural e pés palito torneados.", destaque: false, imagem: "assets/img/produtos/mb-a04.jpg" },

  // ---------------- ESTANTES ----------------
  { codigo: "MB-E01", nome: "Estante Biblioteca", categoria: "estantes", madeira: "Freijó", acabamento: "Verniz acetinado", medidas: "220 × 40 × 240 cm", descricao: "Sob medida, com escada deslizante opcional.", destaque: false, imagem: "assets/img/produtos/mb-e01.jpg" },
  { codigo: "MB-E02", nome: "Nicho Geométrico", categoria: "estantes", madeira: "Nogueira", acabamento: "Óleo natural", medidas: "120 × 25 × 120 cm", descricao: "Composição modular de nichos para objetos de arte.", destaque: false, imagem: "assets/img/produtos/mb-e02.jpg" },
  { codigo: "MB-E03", nome: "Cristaleira Vitrine", categoria: "estantes", madeira: "Freijó", acabamento: "Vidro e laca", medidas: "90 × 40 × 190 cm", descricao: "Portas de vidro com molduras finas e iluminação interna em LED.", destaque: false, imagem: "assets/img/produtos/mb-e03.jpg" },
];
