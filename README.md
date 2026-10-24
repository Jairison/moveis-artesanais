# Marlon Brando | Móveis Artesanais — Site institucional

Site estático (HTML + CSS + JavaScript puro). Não precisa de instalação nem build:
basta enviar a pasta para qualquer hospedagem (Hostinger, Netlify, Vercel, GitHub Pages).

## Estrutura

```
index.html              página única (hero, história, categorias, catálogo, processo, projetos, Instagram, contato)
css/style.css           todo o visual (cores no topo, em :root)
js/config.js            WhatsApp, Instagram, e-mail, cidade e horário  ← EDITE AQUI
js/produtos.js          categorias e os 30 produtos do catálogo        ← EDITE AQUI
js/main.js              comportamento (filtros, modal, orçamento, etc.)
assets/img/produtos/    fotos dos produtos
assets/img/projetos/    fotos dos projetos entregues
robots.txt, sitemap.xml SEO
```

## Antes de publicar

1. **WhatsApp**: em `js/config.js`, troque `whatsapp` pelo número real (55 + DDD + número, só dígitos).
2. **Domínio**: substitua `https://www.marlonbrandoart.com.br/` pelo domínio real em `index.html`, `robots.txt` e `sitemap.xml`.
3. **Imagem de compartilhamento**: hoje usa `assets/img/hero.jpg`. O ideal é uma foto do ateliê em 1200×630.
4. **Textos**: revise história, linha do tempo, projetos e depoimentos em `index.html` (são exemplos).

## Imagens

| Onde aparece | Arquivo | Origem |
|---|---|---|
| Produtos | `assets/img/produtos/*.jpg` | Fotos do ateliê (recortes de `img-1..4.jpeg`) |
| Projetos | `assets/img/projetos/*.jpg` | Fotos do ateliê |
| Grade do Instagram | `assets/img/insta/1.jpg` … `6.jpg` | Fotos do ateliê |
| Topo do site | `assets/img/hero.jpg` | Foto do ateliê |
| Nossa história, Processo | `historia.jpg`, `processo.jpg` | Foto CC0 de ambiente (`CREDITOS.txt`) |

### Adicionando um produto

Coloque a foto em `assets/img/produtos/` (ideal: **retrato 4:5**, ex. 880×1100, peça centralizada
com folga nas bordas, JPG até 200 KB) e adicione o produto em `js/produtos.js`:

```js
{ codigo: "MB-06", nome: "Nome da peça", categoria: "estar", estrutura: "Alumínio",
  corda: "Tricô náutico ...", acabamento: "...", medidas: "Sob medida",
  descricao: "...", destaque: false, imagem: "assets/img/produtos/nome-da-peca.jpg" }
```

Fotos tiradas de posts do Instagram devem ser recortadas para mostrar só a peça,
sem o logo e o texto do post.


## Instagram

- Os links do perfil já estão no menu, na seção Instagram e no rodapé.
- Para mostrar posts reais, cole os links em `instagramPosts` (em `js/config.js`):
  ```js
  instagramPosts: ["https://www.instagram.com/p/XXXX/", "https://www.instagram.com/p/YYYY/"]
  ```

## Orçamento por produto

Cada produto tem botão **Solicitar orçamento** que abre o WhatsApp com a mensagem pronta
(nome, código, estrutura, revestimento e medidas). Também é possível compartilhar um produto direto:
`seusite.com.br/#p-MB-01`.
