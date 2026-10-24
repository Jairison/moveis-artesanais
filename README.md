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

| Onde aparece | Arquivo | Tipo |
|---|---|---|
| Produtos (30) | `assets/img/produtos/mb-*.svg` | Ilustração em tricô náutico |
| Projetos entregues | `assets/img/projetos/*.svg` | Ilustração de ambiente |
| Grade do Instagram | `assets/img/insta/trama-*.svg` + produtos | Ilustração |
| Topo, Nossa história, Processo | `assets/img/hero.jpg`, `historia.jpg`, `processo.jpg` | Foto CC0 provisória (`CREDITOS.txt`) |

### Ilustrações em tricô náutico

As ilustrações são geradas por `tools/gerar_ilustracoes.py` (Python 3, sem dependências).
Para mudar a cor da corda ou da madeira de uma peça, edite a lista `PRODUTOS` no início do
script e rode:

```
python tools/gerar_ilustracoes.py
```

Cores de corda disponíveis: natural, caramelo, preto, grafite, offwhite, musgo, terracota,
marinho, areia. Madeiras: freijo, nogueira, cumaru, carvalho, ebano, teca.

### Trocando por fotos reais

Coloque a foto em `assets/img/produtos/` (ideal: **retrato 4:5**, ex. 880×1100, peça centralizada
com folga nas bordas, JPG até 200 KB) e troque o caminho no produto em `js/produtos.js`:

```js
{ codigo: "MB-C01", nome: "Cadeira Imperial", ..., imagem: "assets/img/produtos/mb-c01.jpg" }
```


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
