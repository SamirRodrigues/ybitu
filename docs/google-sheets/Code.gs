/**
 * Recebe os cadastros do formulário do site e grava na planilha onde este script está.
 * Passo a passo em README.md (mesma pasta).
 */

const SHEET_NAME = 'Interessados';
const HEADERS = ['Data e hora', 'Nome', 'E-mail', 'Perfil', 'Cidade/UF', 'Idioma', 'Página', 'Consentimento'];
const ROLES = {
  reader: 'Leitor(a) ou família',
  teacher: 'Professor(a)',
  institution: 'Escola ou instituição',
  researcher: 'Pesquisador(a)',
  other: 'Outro',
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Alerta por e-mail a cada cadastro. Deixe vazio para avisar o dono deste script (a conta que o implantou),
 * ou liste um ou mais e-mails separados por vírgula: 'a@exemplo.com, b@exemplo.com'.
 * Para desligar os alertas, use NOTIFY = false.
 */
const NOTIFY = true;
const NOTIFY_EMAILS = '';

function doGet() {
  return json_({ ok: true, service: 'ybitu-interessados' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let locked = false;
  try {
    locked = lock.tryLock(10000);
    if (!locked) return json_({ ok: false, error: 'busy' });

    const data = JSON.parse(e.postData.contents);
    const entry = validate_(data);
    if (!entry) return json_({ ok: false, error: 'invalid' });

    const isNew = save_(entry);
    notify_(entry, isNew); // nunca derruba o cadastro: se o e-mail falhar, a linha já está salva
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  } finally {
    if (locked) lock.releaseLock();
  }
}

function validate_(data) {
  const name = clean_(data.name, 120);
  const email = clean_(data.email, 200).toLowerCase();
  const city = clean_(data.city, 120);
  const page = clean_(data.page, 200);
  const lang = data.lang === 'es' ? 'es' : 'pt';

  if (!name || !EMAIL.test(email)) return null;
  if (data.consent !== true) return null;
  if (!Object.prototype.hasOwnProperty.call(ROLES, data.role)) return null;

  return { name, email, role: ROLES[data.role], city, lang, page };
}

function clean_(value, max) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, max);
}

function save_(entry) {
  const sheet = getSheet_();
  const now = new Date();
  const values = [now, entry.name, entry.email, entry.role, entry.city, entry.lang, entry.page, 'Sim'];

  // Mesmo e-mail de novo: atualiza a linha em vez de duplicar.
  const lastRow = sheet.getLastRow();
  let row = lastRow + 1;
  if (lastRow > 1) {
    const emails = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
    for (let i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).toLowerCase() === entry.email) {
        row = i + 2;
        break;
      }
    }
  }

  const range = sheet.getRange(row, 1, 1, HEADERS.length);
  // Colunas de texto puro: evita que "=..." digitado no formulário vire fórmula.
  sheet.getRange(row, 2, 1, HEADERS.length - 1).setNumberFormat('@');
  range.setValues([values]);
  sheet.getRange(row, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  return row === lastRow + 1; // true se for uma pessoa nova; false se o mesmo e-mail atualizou uma linha
}

/** Avisa por e-mail (texto puro) que alguém preencheu o formulário. */
function notify_(entry, isNew) {
  if (!NOTIFY) return;
  try {
    const to = recipients_();
    if (!to) return;
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const lines = [
      isNew ? 'Novo cadastro na pré-venda do livro Ybitu.' : 'Cadastro atualizado (o mesmo e-mail preencheu o formulário de novo).',
      '',
      'Nome: ' + entry.name,
      'E-mail: ' + entry.email,
      'Perfil: ' + entry.role,
      'Cidade/UF: ' + (entry.city || '(não informado)'),
      'Idioma: ' + entry.lang,
      'Página: ' + entry.page,
      '',
      'Planilha: ' + book.getUrl(),
    ];
    MailApp.sendEmail({
      to: to,
      subject: '[Ybitu] ' + (isNew ? 'Nova reserva' : 'Reserva atualizada') + ': ' + entry.name,
      body: lines.join('\n'),
      replyTo: entry.email, // "Responder" no seu e-mail já escreve para a pessoa
      name: 'Site Ybitu',
    });
  } catch (err) {
    console.error('Falha ao enviar o alerta: ' + err);
  }
}

function recipients_() {
  const list = NOTIFY_EMAILS.split(',').map(function (item) { return item.trim(); }).filter(function (item) { return EMAIL.test(item); });
  if (list.length) return list.join(',');
  return Session.getEffectiveUser().getEmail();
}

/**
 * Rode esta função UMA vez no editor (botão "Executar") depois de colar o código:
 * o Google pede a permissão de enviar e-mails e manda um alerta de teste.
 */
function testarAlerta() {
  notify_({ name: 'Teste do alerta', email: 'teste@exemplo.com', role: 'Outro', city: '', lang: 'pt', page: '/' }, true);
}

function getSheet_() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(object) {
  return ContentService.createTextOutput(JSON.stringify(object)).setMimeType(ContentService.MimeType.JSON);
}
