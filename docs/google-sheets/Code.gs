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

    save_(entry);
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
