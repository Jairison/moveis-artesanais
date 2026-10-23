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

## Fotos provisórias

As fotos atuais são **provisórias**, todas em domínio público / CC0 (uso comercial livre):
peças do acervo aberto do Cleveland Museum of Art e fotos de ateliê do StockSnap e do WordPress
Photo Directory. A lista completa está em `assets/img/CREDITOS.txt`.
**Elas não são peças do ateliê** — troque pelas fotos reais assim que possível.

| Onde aparece | Arquivo |
|---|---|
| Topo do site | `assets/img/hero.jpg` |
| Nossa história | `assets/img/historia.jpg` |
| Fundo do "Processo" | `assets/img/processo.jpg` |
| Projetos entregues | `assets/img/projetos/*.jpg` |
| Grade do Instagram | `assets/img/insta/1.jpg` … `6.jpg` |
| Produtos | `assets/img/produtos/mb-c01.jpg` … (nome = código do produto) |

Para trocar, basta salvar a foto nova com o **mesmo nome de arquivo**.

## Fotos dos produtos

Coloque a foto em `assets/img/produtos/` (ideal: **retrato 4:5**, ex. 880×1100, peça centralizada com
folga nas bordas, fundo neutro, JPG até 200 KB)
e informe o caminho no produto:

```js
{ codigo: "MB-C01", nome: "Cadeira Imperial", ..., imagem: "assets/img/produtos/cadeira-imperial.jpg" }
```

Sem foto, o site mostra automaticamente uma ilustração em traço da categoria.



## Instagram

- Os links do perfil já estão no menu, na seção Instagram e no rodapé.
- Para mostrar posts reais, cole os links em `instagramPosts` (em `js/config.js`):
  ```js
  instagramPosts: ["https://www.instagram.com/p/XXXX/", "https://www.instagram.com/p/YYYY/"]
  ```

## Orçamento por produto

Cada produto tem botão **Solicitar orçamento** que abre o WhatsApp com a mensagem pronta
(nome, código, madeira e medidas). Também é possível compartilhar um produto direto:
`seusite.com.br/#p-MB-C01`.
