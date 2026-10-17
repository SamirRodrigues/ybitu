# Lista de interessados no Google Sheets

O formulário do site envia os cadastros para um pequeno script do Google (Apps Script) que grava cada
pessoa em uma planilha. A planilha é o "banco de dados": você abre, filtra e baixa como Excel quando quiser.

## Criar (uma vez só, uns 5 minutos)

1. Crie uma planilha nova no Google Sheets, com a conta que vai administrar a lista. Nome sugerido: `Ybitu - interessados`.
2. Na planilha: **Extensões → Apps Script**.
3. Apague o código que aparece e cole o conteúdo de [`Code.gs`](./Code.gs). Salve.
4. **Implantar → Nova implantação → Tipo: App da Web**.
   - **Executar como:** Eu (a sua conta)
   - **Quem pode acessar:** Qualquer pessoa
5. Autorize quando o Google pedir e copie a **URL do app da Web** (termina em `/exec`).
6. No projeto do site, defina a URL na variável de ambiente `PUBLIC_LEADS_ENDPOINT`:
   - local: copie `.env.example` para `.env` e cole a URL;
   - na hospedagem (Vercel, Netlify, Cloudflare Pages…): cadastre a mesma variável nas configurações e publique de novo.
7. Teste: abra o site, preencha o formulário e confira se apareceu uma linha na aba `Interessados`.

Teste pelo terminal, sem abrir o site:

```bash
curl -L -X POST "COLE_A_URL_AQUI" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{"name":"Teste","email":"teste@exemplo.com","role":"reader","city":"","consent":true,"lang":"pt","page":"/"}'
# resposta esperada: {"ok":true}
```

## Usar a lista

- Cada pessoa vira uma linha. Se a mesma pessoa se cadastrar de novo com o mesmo e-mail, a linha é atualizada.
- **Baixar em Excel:** Arquivo → Fazer download → Microsoft Excel (.xlsx).
- **Abrir direto no Excel:** em Dados → Obter dados → Da Web, usando o link de publicação da planilha, se preferir manter o Excel sincronizado.
- Quem se cadastra marca que aceita receber avisos; guarde a coluna `Consentimento` e atenda pedidos de exclusão (veja a Política de Privacidade do site).

## Se alterar o script

Depois de editar `Code.gs`, use **Implantar → Gerenciar implantações → Editar → Nova versão**. A URL continua a mesma.

## Limites e cuidados

- A URL do script é pública (qualquer pessoa pode mandar um cadastro). O site tem um campo-isca anti-robô e o script
  valida e-mail, consentimento e perfil, mas não é uma proteção forte. Se aparecer lixo na planilha, o próximo passo é
  trocar por um serviço com verificação (Cloudflare Turnstile) ou por um banco de dados.
- Cotas do Google: contas pessoais aguentam milhares de cadastros por dia, mais do que o necessário aqui.
- Não coloque a planilha em pasta compartilhada com pessoas que não devam ver os e-mails.
