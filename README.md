# Ybitu e o poder de acordar memórias adormecidas

Site de divulgação e venda do livro infantil de Jucinara de Melo Silva, ilustrado por Pingo.
Endereço previsto: <https://ybituolivro.com.br>. Português e espanhol.

O site **não reproduz o texto do livro nem do artigo**. Eles serviram só de contexto.

## Páginas

| Português | Espanhol | O que tem |
| --- | --- | --- |
| `/` | `/es/` | Capa, ideias do livro, públicos (famílias e escolas), formulário de interessados |
| `/o-livro/` | `/es/el-libro/` | Sobre a obra, ficha, autora, onde comprar |
| `/pesquisa/` | `/es/investigacion/` | Produções científicas: imagem, resumo e link oficial |
| `/entrevistas/` | `/es/entrevistas/` | Dois vídeos e um áudio (espaços reservados até a edição terminar) |
| `/comunidade/` | `/es/comunidad/` | Catu, escola, narradores e equipe |
| `/privacidade/` | `/es/privacidad/` | Política de Privacidade (LGPD) |

O formulário aparece na home e no fim de cada página de conteúdo. Ele é o mesmo em todas e grava na mesma planilha.

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera a pasta dist/ (site estático)
npm run check    # confere tipos e textos faltando em algum idioma
```

## Onde editar

| Quero mudar | Arquivo |
| --- | --- |
| Textos de qualquer página (pt e es) | `src/content/copy.ts` |
| Produções científicas | `src/data/research.ts` |
| Entrevistas (vídeo e áudio) | `src/data/interviews.ts` |
| Narradores e equipe | `src/data/community.ts` |
| E-mail de contato, status de venda, link de compra | `src/config.ts` |
| Cores, fontes, espaçamentos | `src/styles/global.css` (variáveis no topo) |

Imagens opcionais, que o site usa assim que o arquivo existir (sem mexer em código):

- `public/images/capa.webp` (ou `.jpg`/`.png`): frente do livro, **quadrada** (o livro é em formato quadrado), 1000×1000. Opcional: `capa-640.webp`, versão menor para celulares. Sem o arquivo, o site mostra uma capa tipográfica provisória. A capa também vira a imagem de compartilhamento em redes (`og:image`).
- `public/images/autora.webp` e `public/images/ilustrador.webp`: retratos da autora e do ilustrador, na página do livro.
- `public/images/pesquisa/<id>.webp`: imagem de cada produção (`id` é o do `research.ts`, por exemplo `dissertacao.webp`).
- `public/images/pessoas/…`: fotos dos narradores (informe o caminho em `community.ts`).

Para publicar uma produção científica com PDF para baixar e referência ABNT, coloque o arquivo em
`public/downloads/` e preencha `download` e `citation` em `src/data/research.ts`. O build falha se o arquivo
não existir, para nunca publicar um link quebrado. Para recortar um capítulo de um e-book e gravar título e
autoria no PDF: `python3 scripts/prepare-pdf.py livro.pdf capitulo.pdf --first 42 --last 58 --title "…" --author "…"`
(as páginas são as do arquivo, não as impressas no livro; requer `pip install pypdf`).

Para publicar uma entrevista, preencha `media` em `src/data/interviews.ts`:

```ts
media: { type: 'youtube', id: 'ID_DO_VIDEO' }                       // carrega só no clique, sem cookies
media: { type: 'file', src: '/media/entrevista-1.mp4', captions: '/media/entrevista-1.pt.vtt', captionsLang: 'pt' }
```

Coloque arquivos próprios em `public/media/`. Legenda e transcrição (`transcriptUrl`) ajudam quem não ouve bem
e quem não entende o tupi falado; recomendo incluir.

Quando o livro for lançado: em `src/config.ts`, troque `book.status` para `'available'` e preencha `book.buyUrl`.
A página do livro passa a mostrar o botão de compra no lugar do formulário.

## Lista de interessados (Google Sheets)

O formulário envia os dados para um script do Google que grava em uma planilha. Passo a passo em
[`docs/google-sheets/README.md`](docs/google-sheets/README.md). Depois de criar, defina `PUBLIC_LEADS_ENDPOINT`
(veja `.env.example`) na hospedagem e publique de novo. Sem essa variável, o formulário avisa que o cadastro
não está disponível, em vez de fingir que gravou.

## Publicar no GitHub Pages

O site é estático e é publicado pelo workflow `.github/workflows/deploy.yml` a cada push na `main`
(ou manualmente em **Actions → Publicar no GitHub Pages → Run workflow**). Ele publica em `https://ybituolivro.com.br`.

**Uma vez só, no GitHub:**

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Pages → Custom domain:** `ybituolivro.com.br`. Quando o GitHub liberar, marque **Enforce HTTPS**.
3. Coloque o código na `main` (merge do branch de trabalho). O primeiro deploy sai sozinho.
4. Em **Settings → Secrets and variables → Actions → Variables**, cadastre `PUBLIC_LEADS_ENDPOINT` com a URL do
   Google Apps Script (veja `docs/google-sheets/README.md`) e rode o workflow de novo. Sem ela o formulário não grava.

**DNS do domínio (no painel onde ele foi registrado, por exemplo Registro.br):**

- registros `A` do domínio raiz (`ybituolivro.com.br`) para `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153` e `185.199.111.153`;
- registro `CNAME` de `www` para `samirrodrigues.github.io`.

(Confira os números atuais na documentação do GitHub Pages, "Managing a custom domain". A propagação pode levar
de minutos a algumas horas.)

**Testar sem o domínio:** o endereço provisório é `https://samirrodrigues.github.io/ybitu/`. Para publicar nele,
cadastre as variáveis `SITE_URL` = `https://samirrodrigues.github.io` e `BASE_PATH` = `/ybitu`.
Para testar localmente como ficaria: `SITE_URL=https://samirrodrigues.github.io BASE_PATH=/ybitu npm run build && npm run preview`
(no PowerShell: `$env:SITE_URL="https://samirrodrigues.github.io"; $env:BASE_PATH="/ybitu"; npm run build; npm run preview`).

Qualquer hospedagem estática também serve (Cloudflare Pages, Netlify, Vercel): a saída de `npm run build` é a pasta `dist/`.

## Antes de publicar

- [ ] Criar a planilha e o script, e definir `PUBLIC_LEADS_ENDPOINT` (variável do repositório; sem isso nenhum cadastro é gravado).
- [ ] Preencher `contactEmail` em `src/config.ts`. A Política de Privacidade precisa de um canal para pedidos de exclusão.
- [ ] Revisar a Política de Privacidade com quem cuida da parte jurídica (texto-base, não é parecer).
- [ ] Mostrar os textos da página Comunidade aos narradores e à escola antes de publicar.
- [ ] Revisar o espanhol com uma pessoa nativa ou fluente.
- [ ] Incluir as fotos da autora e do ilustrador (`public/images/autora.webp` e `ilustrador.webp`).
- [ ] Conferir a grafia do título: o site usa **Ybitu**, mas o texto do livro (PDF) está como "Ybytu".

## Design

A direção vem das ilustrações do livro: papel de aquarela, triângulos vermelhos e laranja nas bordas, e o
pincel azul do título. As imagens do livro **não** são usadas na íntegra: o site usa só a textura do papel e as
faixas de triângulos (gerados a partir de `design-src/triangulos.jpg` por `scripts/make-assets.py`) e recria o
resto com CSS.

- Cores: papel `#f1f1ee`, amarelo da capa `#f2bd30`, tijolo `#b8432a`, laranja `#f38902`, azul do título `#34509a`, céu `#aadbf5`, pedra `#b9ccd6`, capim `#54623b`.
- Fontes (instaladas no próprio site, sem pedir nada ao Google): Caveat Brush para títulos, Nunito para texto.
- Contraste conferido para todos os pares de texto e fundo; foco visível; respeita `prefers-reduced-motion`.
- O único movimento da página é a faixa de triângulos do topo se revelando uma vez ao abrir.
