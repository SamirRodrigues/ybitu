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

- `public/images/capa.webp` (ou `.jpg`/`.png`): frente do livro, **quadrada** (o livro é em formato quadrado). Sem o arquivo, o site mostra uma capa tipográfica provisória.
- `public/images/autora.webp`: retrato da autora, na página do livro.
- `public/images/pesquisa/<id>.webp`: imagem de cada produção (`id` é o do `research.ts`, por exemplo `dissertacao.webp`).
- `public/images/pessoas/…`: fotos dos narradores (informe o caminho em `community.ts`).

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

## Publicar

O resultado de `npm run build` é uma pasta estática (`dist/`). Serve qualquer hospedagem estática
(Cloudflare Pages, Netlify, Vercel, GitHub Pages). Configure o domínio `ybituolivro.com.br` e a variável
`PUBLIC_LEADS_ENDPOINT` lá. O site já gera `sitemap-index.xml` e `robots.txt`.

## Antes de publicar

- [ ] Criar a planilha e o script, e definir `PUBLIC_LEADS_ENDPOINT` (sem isso nenhum cadastro é gravado).
- [ ] Preencher `contactEmail` em `src/config.ts`. A Política de Privacidade precisa de um canal para pedidos de exclusão.
- [ ] Revisar a Política de Privacidade com quem cuida da parte jurídica (texto-base, não é parecer).
- [ ] Mostrar os textos da página Comunidade aos narradores e à escola antes de publicar.
- [ ] Revisar o espanhol com uma pessoa nativa ou fluente.
- [ ] Trocar a capa provisória pela capa real (`public/images/capa.webp`) e incluir a foto da autora.
- [ ] Conferir a grafia do título: o site usa **Ybitu**, mas o texto do livro (PDF) está como "Ybytu".
- [ ] Imagem para compartilhamento em redes (`og:image`) ainda não existe.

## Design

A direção vem das ilustrações do livro: papel de aquarela, triângulos vermelhos e laranja nas bordas, e o
pincel azul do título. As imagens do livro **não** são usadas na íntegra: o site usa só a textura do papel e as
faixas de triângulos (gerados a partir de `design-src/triangulos.jpg` por `scripts/make-assets.py`) e recria o
resto com CSS.

- Cores: papel `#f1f1ee`, amarelo da capa `#f2bd30`, tijolo `#b8432a`, laranja `#f38902`, azul do título `#34509a`, céu `#aadbf5`, pedra `#b9ccd6`, capim `#54623b`.
- Fontes (instaladas no próprio site, sem pedir nada ao Google): Caveat Brush para títulos, Nunito para texto.
- Contraste conferido para todos os pares de texto e fundo; foco visível; respeita `prefers-reduced-motion`.
- O único movimento da página é a faixa de triângulos do topo se revelando uma vez ao abrir.
