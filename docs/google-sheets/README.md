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

Teste pelo terminal, sem abrir o site. O teste grava uma linha de verdade na planilha ("Teste"); apague-a depois.

**Windows (PowerShell).** No PowerShell, `curl` é um apelido de outro comando e não aceita as opções abaixo; use este:

```powershell
$url  = "COLE_A_URL_AQUI"
$body = '{"name":"Teste","email":"teste@exemplo.com","role":"reader","city":"","consent":true,"lang":"pt","page":"/"}'
Invoke-RestMethod -Method Post -Uri $url -ContentType "text/plain;charset=utf-8" -Body $body
# resposta esperada: ok : True
```

**Mac e Linux:**

```bash
curl -L -X POST "COLE_A_URL_AQUI" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{"name":"Teste","email":"teste@exemplo.com","role":"reader","city":"","consent":true,"lang":"pt","page":"/"}'
# resposta esperada: {"ok":true}
```

Troque `COLE_A_URL_AQUI` pela URL do app da Web (a que termina em `/exec`), mantendo as aspas.

## Alerta por e-mail a cada cadastro

O `Code.gs` envia um e-mail para você sempre que o formulário é preenchido, com nome, e-mail, perfil, cidade e o
link da planilha. Ao clicar em "Responder" no e-mail, a resposta já vai para a pessoa que se cadastrou.

**Para ativar (uma vez, depois de colar o `Code.gs` novo):**

1. No editor do Apps Script, escolha a função **`testarAlerta`** na lista ao lado do botão **Executar** e clique em **Executar**.
2. O Google pede permissão para enviar e-mails. Clique em **Revisar permissões**, escolha sua conta e, se aparecer
   "app não verificado", vá em **Avançado → Acessar (não seguro)** e **Permitir**. É o seu próprio script.
3. Confira a caixa de entrada (e o spam): deve chegar o e-mail "[Ybitu] Nova reserva: Teste do alerta".
4. **Atualize a implantação** (sem isso o site continua usando a versão antiga): **Implantar → Gerenciar implantações →
   lápis (Editar) → Versão: Nova versão → Implantar**. A URL continua a mesma.

**Opções no topo do `Code.gs`:**

- `NOTIFY_EMAILS`: vazio avisa a conta dona do script. Para avisar outras pessoas: `'a@exemplo.com, b@exemplo.com'`.
- `NOTIFY = false` desliga os alertas.

**Limites:** contas Gmail comuns enviam até cerca de 100 e-mails por dia pelo Apps Script; contas Google Workspace, mais.
Se o limite estourar, o cadastro continua sendo gravado, só o e-mail deixa de ser enviado. Se a mesma pessoa preencher
o formulário de novo com o mesmo e-mail, a linha é atualizada e o alerta diz "Reserva atualizada".

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
