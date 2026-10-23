/* ==========================================================================
   Marlon Brando | Móveis Artesanais — comportamento do site
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG;
  var CATS = window.CATEGORIAS;
  var PRODUTOS = window.PRODUTOS.slice(0, 30); // limite do catálogo
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Ilustrações em traço (usadas quando não há foto) ---------- */
  function slats(x1, x2, y1, y2, step) {
    var d = "";
    for (var x = x1; x <= x2; x += step) d += "M" + x + " " + y1 + "L" + x + " " + y2;
    return d;
  }
  var ART = {
    cadeiras:
      "M60 22L60 112M140 22L140 112M60 26Q100 10 140 26M60 50Q100 40 140 50M60 72Q100 64 140 72" +
      "M44 112L156 112L162 126L38 126Z M48 126L42 190M152 126L158 190M70 126L73 178M130 126L127 178M46 162L154 162",
    poltronas:
      "M55 42Q100 18 145 42L145 110L55 110Z M33 84Q33 70 47 70L55 70L55 142L33 142Z M167 84Q167 70 153 70L145 70L145 142L167 142Z" +
      "M55 110L145 110L145 142L55 142Z M28 142L172 142L172 154L28 154Z M40 154L35 188M160 154L165 188M100 30L100 104",
    mesas:
      "M16 84L184 84L184 96L16 96Z M36 96L26 184M58 96L68 184M164 96L174 184M142 96L132 184M47 144L153 144" +
      "M92 84Q85 64 96 54L104 54Q115 64 108 84M100 54Q96 32 82 22M100 54Q108 36 120 28M100 54Q100 40 104 18",
    bancos:
      "M60 50Q100 38 140 50Q100 62 60 50Z M60 50L60 58Q100 72 140 58L140 50" +
      "M68 63L50 186M132 63L150 186M90 69L86 178M110 69L114 178M56 140L144 140",
    aparadores:
      "M18 74L182 74L182 142L18 142Z M100 74L100 142" + slats(28, 92, 80, 136, 8) + slats(108, 172, 80, 136, 8) +
      "M32 142L26 182M168 142L174 182M60 74L60 44M46 44L74 44L67 24L53 24Z M138 74Q128 60 136 48L146 48Q154 60 144 74",
    estantes:
      "M38 14L162 14L162 186L38 186Z M38 56L162 56M38 98L162 98M38 140L162 140M104 14L104 56M120 98L120 140" +
      "M48 56L48 30L56 30L56 56M58 56L58 34L66 34L66 56M68 56L74 32L81 34L76 56M136 98Q124 86 132 70L142 70Q150 86 138 98" +
      "M50 140L50 112L58 112L58 140M60 140L60 108L68 108L68 140M70 140L70 116L78 116L78 140M130 140L130 118L150 118L150 140" +
      "M60 186L60 158L140 158L140 186",
  };
  var TONES = {
    cadeiras: "#e9d8c4", poltronas: "#e2cdb5", mesas: "#efe2d2",
    bancos: "#e6d3bd", aparadores: "#ddc6ac", estantes: "#ece0d0",
  };

  function svgArt(cat, stroke) {
    return '<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="' + (stroke || 1.4) +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (ART[cat] || ART.cadeiras) + '"/></svg>';
  }
  function placeholder(cat, tone) {
    return '<div class="ph" style="--tone:' + (tone || TONES[cat] || "#e9d8c4") + '">' +
      '<div class="ph__art">' + svgArt(cat) + '</div><span class="ph__mark">MB</span></div>';
  }
  function media(p) {
    if (!p.imagem) return placeholder(p.categoria);
    return '<img src="' + p.imagem + '" alt="' + esc(p.nome) + ' — ' + esc(p.madeira) +
      '" loading="lazy" decoding="async" data-cat="' + p.categoria + '">';
  }
  // Se a foto falhar, volta para a ilustração
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (img.tagName === "IMG" && img.dataset.cat) img.outerHTML = placeholder(img.dataset.cat);
  }, true);

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function catNome(id) {
    var c = CATS.filter(function (x) { return x.id === id; })[0];
    return c ? c.nome : "";
  }

  /* ---------- WhatsApp e Instagram ---------- */
  function whatsUrl(msg) {
    return "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(msg || CFG.mensagemPadrao);
  }
  function msgProduto(p) {
    return "Olá, Marlon Brando! Gostaria de um orçamento da peça:\n\n" +
      "• " + p.nome + " (cód. " + p.codigo + ")\n" +
      "• Madeira: " + p.madeira + "\n" +
      "• Medidas: " + p.medidas + "\n\nVi no site.";
  }
  var instaUrl = "https://www.instagram.com/" + CFG.instagramUsuario + "/";

  $$(".js-whats").forEach(function (a) {
    a.href = whatsUrl(a.dataset.msg);
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$(".js-insta").forEach(function (a) { a.href = instaUrl; });

  /* ---------- Cabeçalho e menu ---------- */
  var header = $(".header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 30); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $("#menuToggle");
  var nav = $("#nav");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("no-scroll", open);
  }
  toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ---------- Hero ---------- */
  $("#heroArt").innerHTML = svgArt("cadeiras", 1.1);

  /* ---------- Categorias ---------- */
  function contar(id) { return PRODUTOS.filter(function (p) { return p.categoria === id; }).length; }

  $("#cats").innerHTML = CATS.map(function (c) {
    var n = contar(c.id);
    return '<button class="cat reveal" data-cat="' + c.id + '" aria-label="Ver ' + esc(c.nome) + '">' +
      '<div class="cat__art">' + svgArt(c.id) + '</div>' +
      '<div class="cat__info"><div><span class="cat__name">' + esc(c.nome) + '</span>' +
      '<span class="cat__desc">' + esc(c.descricao) + '</span></div>' +
      '<span class="cat__count">' + n + (n === 1 ? " peça" : " peças") + '</span></div></button>';
  }).join("");

  $$(".cat").forEach(function (b) {
    b.addEventListener("click", function () {
      filtrar(b.dataset.cat);
      $("#catalogo").scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- Catálogo ---------- */
  var filtersEl = $("#filters");
  var gridEl = $("#grid");

  filtersEl.innerHTML =
    '<button class="filter is-active" role="tab" aria-selected="true" data-filter="todos">Todos<sup>' + PRODUTOS.length + '</sup></button>' +
    CATS.map(function (c) {
      return '<button class="filter" role="tab" aria-selected="false" data-filter="' + c.id + '">' +
        esc(c.nome) + '<sup>' + contar(c.id) + '</sup></button>';
    }).join("");

  filtersEl.addEventListener("click", function (e) {
    var b = e.target.closest(".filter");
    if (b) filtrar(b.dataset.filter);
  });

  function filtrar(cat) {
    $$(".filter", filtersEl).forEach(function (b) {
      var on = b.dataset.filter === cat;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", String(on));
    });
    var lista = cat === "todos" ? PRODUTOS : PRODUTOS.filter(function (p) { return p.categoria === cat; });
    gridEl.innerHTML = lista.map(card).join("");
  }

  function card(p, i) {
    return '<article class="card" style="animation-delay:' + Math.min(i * 50, 500) + 'ms">' +
      '<button class="card__media" data-open="' + p.codigo + '" aria-label="Ver detalhes de ' + esc(p.nome) + '">' +
      (p.destaque ? '<span class="card__badge">Assinatura</span>' : "") +
      media(p) + '<span class="card__view">Ver detalhes</span></button>' +
      '<div class="card__body"><span class="card__code">' + p.codigo + " · " + esc(catNome(p.categoria)) + '</span>' +
      '<h3 class="card__title">' + esc(p.nome) + '</h3>' +
      '<p class="card__meta">' + esc(p.madeira) + " · " + esc(p.medidas) + '</p>' +
      '<a class="card__quote" href="' + whatsUrl(msgProduto(p)) + '" target="_blank" rel="noopener">' +
      '<svg class="icon" aria-hidden="true"><use href="#i-whats"/></svg>Solicitar orçamento</a></div></article>';
  }

  gridEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-open]");
    if (b) abrirModal(b.dataset.open, b);
  });

  filtrar("todos");

  /* ---------- Modal do produto ---------- */
  var modal = $("#modal");
  var ultimoFoco = null;

  function abrirModal(codigo, origem) {
    var p = PRODUTOS.filter(function (x) { return x.codigo === codigo; })[0];
    if (!p) return;
    ultimoFoco = origem || document.activeElement;
    $("#modalMedia").innerHTML = media(p);
    $("#modalCode").textContent = p.codigo + " · " + catNome(p.categoria);
    $("#modalTitle").textContent = p.nome;
    $("#modalDesc").textContent = p.descricao;
    $("#modalSpecs").innerHTML = [["Madeira", p.madeira], ["Acabamento", p.acabamento], ["Medidas (L × P × A)", p.medidas]]
      .map(function (s) { return "<div><dt>" + s[0] + "</dt><dd>" + esc(s[1]) + "</dd></div>"; }).join("");
    $("#modalQuote").href = whatsUrl(msgProduto(p));
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    history.replaceState(null, "", "#p-" + p.codigo);
    $(".modal__close", modal).focus();
  }
  function fecharModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    history.replaceState(null, "", location.pathname + location.search);
    if (ultimoFoco) ultimoFoco.focus();
  }
  modal.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) fecharModal(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { fecharModal(); setMenu(false); }
    // Mantém o foco do teclado dentro do modal
    if (e.key === "Tab" && !modal.hidden) {
      var f = $$("button, a[href]", modal);
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // Link direto para um produto: site.com/#p-MB-C01
  if (/^#p-/.test(location.hash)) abrirModal(location.hash.slice(3));

  /* ---------- Projetos (ilustração quando não há foto) ---------- */
  $$(".project__media[data-art]").forEach(function (el) {
    if (!el.querySelector("img")) el.innerHTML = placeholder(el.dataset.art, el.style.getPropertyValue("--tone"));
  });

  /* ---------- Instagram ---------- */
  var instaEl = $("#insta");
  if (CFG.instagramPosts && CFG.instagramPosts.length) {
    instaEl.classList.add("insta--embeds");
    instaEl.innerHTML = CFG.instagramPosts.slice(0, 6).map(function (url) {
      return '<blockquote class="instagram-media" data-instgrm-permalink="' + esc(url) +
        '" data-instgrm-version="14"><a href="' + esc(url) + '" target="_blank" rel="noopener">Ver no Instagram</a></blockquote>';
    }).join("");
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(s);
  } else {
    var ordem = ["cadeiras", "mesas", "poltronas", "aparadores", "bancos", "estantes"];
    var tons = ["#e9d8c4", "#5e4634", "#efe2d2", "#8b6a4c", "#e2cdb5", "#2a221c"];
    instaEl.innerHTML = ordem.map(function (c, i) {
      var escuro = i % 2 === 1;
      return '<a class="insta__item reveal" href="' + instaUrl + '" target="_blank" rel="noopener" aria-label="Ver no Instagram"' +
        (escuro ? ' style="color:#f6efe6"' : "") + '>' +
        placeholder(c, tons[i]).replace('class="ph__art"', 'class="ph__art"' + (escuro ? ' style="color:#f6efe6;opacity:.6"' : "")) +
        "</a>";
    }).join("");
  }

  /* ---------- Formulário → WhatsApp ---------- */
  var sel = $("#interesse");
  sel.innerHTML += CATS.map(function (c) { return '<option value="' + esc(c.nome) + '">' + esc(c.nome) + "</option>"; }).join("") +
    '<option value="Projeto sob medida">Projeto sob medida</option>';

  $("#quoteForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var nome = f.nome.value.trim();
    if (!nome) { f.nome.classList.add("is-invalid"); f.nome.focus(); return; }
    f.nome.classList.remove("is-invalid");
    var msg = "Olá, Marlon Brando! Meu nome é " + nome + ".";
    if (f.interesse.value) msg += "\nTenho interesse em: " + f.interesse.value + ".";
    if (f.mensagem.value.trim()) msg += "\n\n" + f.mensagem.value.trim();
    window.open(whatsUrl(msg), "_blank", "noopener");
  });

  /* ---------- Rodapé ---------- */
  $("#ano").textContent = new Date().getFullYear();
  $("#footerEmail").textContent = CFG.email;
  $("#footerEmail").href = "mailto:" + CFG.email;
  $("#footerCidade").textContent = CFG.cidade;
  $("#footerHorario").textContent = CFG.horario;

  /* ---------- SEO: catálogo como dados estruturados ---------- */
  var ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo Marlon Brando Móveis Artesanais",
    itemListElement: PRODUTOS.map(function (p, i) {
      return {
        "@type": "ListItem", position: i + 1,
        item: {
          "@type": "Product", name: p.nome, sku: p.codigo, description: p.descricao,
          category: catNome(p.categoria), material: p.madeira,
          brand: { "@type": "Brand", name: "Marlon Brando" },
        },
      };
    }),
  });
  document.head.appendChild(ld);

  /* ---------- Revelar ao rolar ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
