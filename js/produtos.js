/* ==========================================================================
   CATÁLOGO DE PRODUTOS — linha em tricô náutico
   Cadastre até 30 produtos. As ilustrações ficam em assets/img/produtos/
   (geradas por tools/gerar_ilustracoes.py). Para usar foto real, troque o
   campo "imagem" pelo caminho da foto (ex.: "assets/img/produtos/mb-c01.jpg").
   ========================================================================== */
window.CATEGORIAS = [
  { id: "cadeiras", nome: "Cadeiras", descricao: "A assinatura da casa" },
  { id: "poltronas", nome: "Poltronas", descricao: "Conforto trançado" },
  { id: "sofas", nome: "Sofás e Namoradeiras", descricao: "Para reunir" },
  { id: "mesas", nome: "Mesas", descricao: "Jantar, centro e apoio" },
  { id: "bancos", nome: "Banquetas e Puffs", descricao: "Balcão e apoio" },
  { id: "espreguicadeiras", nome: "Espreguiçadeiras", descricao: "Varanda e piscina" },
];

window.PRODUTOS = [
  // ---------------- CADEIRAS ----------------
  { codigo: "MB-C01", nome: "Cadeira Imperial", categoria: "cadeiras", madeira: "Freijó maciço", corda: "Tricô náutico natural", acabamento: "Verniz acetinado", medidas: "48 × 55 × 90 cm", descricao: "Encosto em arco e assento trançados à mão em corda náutica, ponto tricô. Encaixes tradicionais, sem parafusos aparentes.", destaque: true, imagem: "assets/img/produtos/mb-c01.svg" },
  { codigo: "MB-C02", nome: "Cadeira Dom", categoria: "cadeiras", madeira: "Nogueira", corda: "Tricô náutico preto", acabamento: "Óleo natural", medidas: "46 × 52 × 88 cm", descricao: "Linhas retas, travessa superior curvada e trama preta de corda náutica. Sóbria e marcante.", destaque: false, imagem: "assets/img/produtos/mb-c02.svg" },
  { codigo: "MB-C03", nome: "Cadeira Siciliana", categoria: "cadeiras", madeira: "Cumaru", corda: "Tricô náutico caramelo", acabamento: "Óleo e cera", medidas: "50 × 56 × 92 cm", descricao: "Encosto oval envolvente em corda caramelo e pés levemente abertos.", destaque: false, imagem: "assets/img/produtos/mb-c03.svg" },
  { codigo: "MB-C04", nome: "Cadeira Vittorio", categoria: "cadeiras", madeira: "Carvalho", corda: "Tricô náutico off-white", acabamento: "Verniz fosco", medidas: "54 × 55 × 88 cm", descricao: "Com braços em madeira maciça. Ideal para cabeceiras de mesa.", destaque: false, imagem: "assets/img/produtos/mb-c04.svg" },
  { codigo: "MB-C05", nome: "Cadeira Corleone", categoria: "cadeiras", madeira: "Madeira ebanizada", corda: "Tricô náutico natural", acabamento: "Laca fosca", medidas: "56 × 56 × 100 cm", descricao: "A peça que deu origem ao apelido \"o chefão das cadeiras\". Encosto alto, braços revestidos em corda e presença absoluta.", destaque: true, imagem: "assets/img/produtos/mb-c05.svg" },
  { codigo: "MB-C06", nome: "Cadeira Marinha", categoria: "cadeiras", madeira: "Freijó", corda: "Tricô náutico azul-marinho", acabamento: "Verniz natural", medidas: "48 × 54 × 90 cm", descricao: "Encosto em arco com corda azul-marinho, inspirada nos veleiros clássicos.", destaque: false, imagem: "assets/img/produtos/mb-c06.svg" },
  { codigo: "MB-C07", nome: "Cadeira Lumière", categoria: "cadeiras", madeira: "Carvalho", corda: "Tricô náutico areia", acabamento: "Verniz fosco", medidas: "46 × 53 × 86 cm", descricao: "Leve e delicada, com ponto tricô mais fechado e tom areia.", destaque: false, imagem: "assets/img/produtos/mb-c07.svg" },

  // ---------------- POLTRONAS ----------------
  { codigo: "MB-P01", nome: "Poltrona Padrino", categoria: "poltronas", madeira: "Nogueira", corda: "Tricô náutico caramelo", acabamento: "Almofada em linho cru", medidas: "78 × 82 × 82 cm", descricao: "Encosto concha e braços totalmente trançados em corda caramelo. Uma peça de colecionador.", destaque: true, imagem: "assets/img/produtos/mb-p01.svg" },
  { codigo: "MB-P02", nome: "Poltrona Aurora", categoria: "poltronas", madeira: "Freijó", corda: "Tricô náutico natural", acabamento: "Almofadas em linho", medidas: "76 × 80 × 82 cm", descricao: "Encosto curvo com almofada solta. Aconchego para salas de leitura e varandas.", destaque: false, imagem: "assets/img/produtos/mb-p02.svg" },
  { codigo: "MB-P03", nome: "Poltrona Varanda", categoria: "poltronas", madeira: "Cumaru", corda: "Tricô náutico verde-musgo", acabamento: "Óleo para área externa", medidas: "76 × 80 × 78 cm", descricao: "Corda náutica resistente ao sol e à umidade. Feita para áreas externas cobertas.", destaque: false, imagem: "assets/img/produtos/mb-p03.svg" },
  { codigo: "MB-P04", nome: "Poltrona Bergère", categoria: "poltronas", madeira: "Freijó", corda: "Tricô náutico preto", acabamento: "Almofadas em linho", medidas: "76 × 82 × 105 cm", descricao: "Releitura da bergère clássica com encosto alto trançado em corda preta.", destaque: false, imagem: "assets/img/produtos/mb-p04.svg" },
  { codigo: "MB-P05", nome: "Poltrona Concha", categoria: "poltronas", madeira: "Carvalho", corda: "Tricô náutico terracota", acabamento: "Verniz fosco", medidas: "76 × 78 × 80 cm", descricao: "Toda revestida em corda terracota, sem almofadas: o tricô é o protagonista.", destaque: false, imagem: "assets/img/produtos/mb-p05.svg" },

  // ---------------- SOFÁS ----------------
  { codigo: "MB-S01", nome: "Namoradeira Riviera", categoria: "sofas", madeira: "Freijó", corda: "Tricô náutico natural", acabamento: "Almofadas em linho", medidas: "140 × 82 × 82 cm", descricao: "Dois lugares com encosto e braços trançados à mão.", destaque: false, imagem: "assets/img/produtos/mb-s01.svg" },
  { codigo: "MB-S02", nome: "Sofá Atlântico", categoria: "sofas", madeira: "Nogueira", corda: "Tricô náutico caramelo", acabamento: "Almofadas em linho cru", medidas: "210 × 88 × 82 cm", descricao: "Três lugares, estrutura robusta e corda caramelo. O centro da varanda.", destaque: true, imagem: "assets/img/produtos/mb-s02.svg" },
  { codigo: "MB-S03", nome: "Sofá Enseada", categoria: "sofas", madeira: "Cumaru", corda: "Tricô náutico verde-musgo", acabamento: "Almofadas em sarja", medidas: "170 × 85 × 80 cm", descricao: "Encosto concha contínuo em corda verde-musgo. Ideal para áreas externas.", destaque: false, imagem: "assets/img/produtos/mb-s03.svg" },
  { codigo: "MB-S04", nome: "Sofá Ilha", categoria: "sofas", madeira: "Carvalho", corda: "Tricô náutico preto", acabamento: "Almofadas em linho", medidas: "210 × 88 × 84 cm", descricao: "Contraste entre a corda preta e o carvalho claro. Elegante e atemporal.", destaque: false, imagem: "assets/img/produtos/mb-s04.svg" },

  // ---------------- MESAS ----------------
  { codigo: "MB-M01", nome: "Mesa de Jantar Família", categoria: "mesas", madeira: "Freijó maciço", corda: "—", acabamento: "Verniz acetinado", medidas: "240 × 100 × 77 cm", descricao: "Tampo inteiriço de 4 cm. Par perfeito para as cadeiras em tricô náutico.", destaque: false, imagem: "assets/img/produtos/mb-m01.svg" },
  { codigo: "MB-M02", nome: "Mesa Redonda Orbe", categoria: "mesas", madeira: "Cumaru", corda: "Coluna em corda náutica natural", acabamento: "Óleo natural", medidas: "Ø 130 × 76 cm", descricao: "Coluna central revestida em corda náutica enrolada à mão. Acomoda 6 lugares.", destaque: true, imagem: "assets/img/produtos/mb-m02.svg" },
  { codigo: "MB-M03", nome: "Mesa Orgânica", categoria: "mesas", madeira: "Nogueira", corda: "—", acabamento: "Óleo e cera", medidas: "220 × 95 × 76 cm", descricao: "Tampo de cantos suavizados e veios aparentes. Cada peça é única.", destaque: false, imagem: "assets/img/produtos/mb-m03.svg" },
  { codigo: "MB-M04", nome: "Mesa de Centro Duna", categoria: "mesas", madeira: "Cumaru", corda: "Prateleira em tricô náutico caramelo", acabamento: "Cera de abelha", medidas: "110 × 60 × 38 cm", descricao: "Prateleira inferior trançada em corda náutica para revistas e mantas.", destaque: false, imagem: "assets/img/produtos/mb-m04.svg" },
  { codigo: "MB-M05", nome: "Mesa Lateral Pilar", categoria: "mesas", madeira: "Madeira ebanizada", corda: "Coluna em corda náutica preta", acabamento: "Laca fosca", medidas: "Ø 45 × 60 cm", descricao: "Coluna revestida em corda preta enrolada. Apoio elegante para poltronas.", destaque: false, imagem: "assets/img/produtos/mb-m05.svg" },
  { codigo: "MB-M06", nome: "Mesa Gourmet", categoria: "mesas", madeira: "Teca", corda: "—", acabamento: "Óleo alimentício", medidas: "200 × 90 × 77 cm", descricao: "Pés robustos e tampo espesso, resistente ao uso diário em áreas gourmet.", destaque: false, imagem: "assets/img/produtos/mb-m06.svg" },

  // ---------------- BANQUETAS E PUFFS ----------------
  { codigo: "MB-B01", nome: "Banqueta Alta Bistrô", categoria: "bancos", madeira: "Freijó", corda: "Tricô náutico natural", acabamento: "Verniz acetinado", medidas: "Ø 42 × 75 cm", descricao: "Assento redondo trançado em corda e apoio para os pés. Altura de bancada.", destaque: true, imagem: "assets/img/produtos/mb-b01.svg" },
  { codigo: "MB-B02", nome: "Banqueta com Encosto", categoria: "bancos", madeira: "Nogueira", corda: "Tricô náutico preto", acabamento: "Óleo natural", medidas: "Ø 42 × 105 cm", descricao: "Encosto baixo e assento em corda preta. Conforto para longas conversas no balcão.", destaque: false, imagem: "assets/img/produtos/mb-b02.svg" },
  { codigo: "MB-B03", nome: "Banqueta Média", categoria: "bancos", madeira: "Cumaru", corda: "Tricô náutico caramelo", acabamento: "Óleo natural", medidas: "Ø 40 × 55 cm", descricao: "Versão baixa da Bistrô, ideal para ilhas de cozinha e apoio.", destaque: false, imagem: "assets/img/produtos/mb-b03.svg" },
  { codigo: "MB-B04", nome: "Puff Tricô Redondo", categoria: "bancos", madeira: "Base oculta em madeira", corda: "Tricô náutico off-white", acabamento: "Corda náutica", medidas: "Ø 60 × 42 cm", descricao: "Totalmente revestido em tricô de corda grossa. Macio no toque, firme no uso.", destaque: false, imagem: "assets/img/produtos/mb-b04.svg" },
  { codigo: "MB-B05", nome: "Puff Tricô Quadrado", categoria: "bancos", madeira: "Base oculta em madeira", corda: "Tricô náutico grafite", acabamento: "Corda náutica", medidas: "55 × 55 × 42 cm", descricao: "Formato quadrado em corda grafite. Funciona como assento ou apoio.", destaque: false, imagem: "assets/img/produtos/mb-b05.svg" },

  // ---------------- ESPREGUIÇADEIRAS ----------------
  { codigo: "MB-E01", nome: "Espreguiçadeira Maré", categoria: "espreguicadeiras", madeira: "Teca", corda: "Tricô náutico natural", acabamento: "Óleo para área externa", medidas: "195 × 70 × 85 cm", descricao: "Trama contínua do encosto aos pés e travesseiro removível. Feita para a beira da piscina.", destaque: false, imagem: "assets/img/produtos/mb-e01.svg" },
  { codigo: "MB-E02", nome: "Chaise Porto", categoria: "espreguicadeiras", madeira: "Madeira ebanizada", corda: "Tricô náutico grafite", acabamento: "Verniz marítimo", medidas: "195 × 70 × 85 cm", descricao: "Estrutura escura e corda grafite: sofisticação para varandas e rooftops.", destaque: false, imagem: "assets/img/produtos/mb-e02.svg" },
  { codigo: "MB-E03", nome: "Espreguiçadeira Âncora", categoria: "espreguicadeiras", madeira: "Freijó", corda: "Tricô náutico azul-marinho", acabamento: "Verniz marítimo", medidas: "195 × 70 × 85 cm", descricao: "Corda azul-marinho e freijó claro. O clima de veleiro na sua área de lazer.", destaque: false, imagem: "assets/img/produtos/mb-e03.svg" },
];
