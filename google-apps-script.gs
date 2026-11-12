/**
 * Google Apps Script: stores RSVP + wishes from the wedding site into this Google Sheet.
 * Setup guide: see GOOGLE_SHEETS.md
 *
 * Reading the list (guests.html) requires the SAME GitHub token used for admin.html:
 * the script asks GitHub whether that token can push to the repo below.
 *
 * Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 * Copy the Web app URL into admin.html → "Kết nối Google Sheets".
 */
const GITHUB_REPO = 'longnhatnguyen/trongtien';

// true if the token has write access to the wedding repo (same rule as admin.html)
function canAdmin(token) {
  if (!token || token.length < 20) return false;
  const cache = CacheService.getScriptCache();
  const ck = 'ok_' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, token));
  if (cache.get(ck)) return true;
  const r = UrlFetchApp.fetch('https://api.github.com/repos/' + GITHUB_REPO, {
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' },
    muteHttpExceptions: true,
  });
  if (r.getResponseCode() !== 200) return false;
  const ok = !!(JSON.parse(r.getContentText()).permissions || {}).push;
  if (ok) cache.put(ck, '1', 600);
  return ok;
}

const SHEETS = {
  rsvp: { name: 'XacNhan', header: ['Thời gian', 'Tên', 'Tham dự', 'Phe', 'Số người'] },
  wish: { name: 'LoiChuc', header: ['Thời gian', 'Tên', 'Phe', 'Lời chúc'] },
};

function sheetFor(type) {
  const cfg = SHEETS[type];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(cfg.name);
  if (!sh) {
    sh = ss.insertSheet(cfg.name);
    sh.appendRow(cfg.header);
    sh.setFrozenRows(1);
  }
  return sh;
}

// Prevent spreadsheet formula injection and cap length
function clean(v, max) {
  let s = String(v == null ? '' : v).slice(0, max || 500);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const time = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'HH:mm:ss dd/MM/yyyy');
    if (d.type === 'rsvp') {
      sheetFor('rsvp').appendRow([
        time, clean(d.name, 120), d.attending === 'yes' ? 'Sẽ đến' : 'Bận',
        clean(d.side, 60), Math.max(1, Math.min(50, parseInt(d.guestCount, 10) || 1)),
      ]);
    } else if (d.type === 'wish') {
      sheetFor('wish').appendRow([time, clean(d.name, 120), clean(d.side, 60), clean(d.message, 2000)]);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  if (!e.parameter || !canAdmin(e.parameter.token)) return json({ ok: false, error: 'unauthorized' });
  const read = (type) => {
    const v = sheetFor(type).getDataRange().getValues();
    const head = v.shift() || [];
    return v.map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])));
  };
  return json({ ok: true, rsvp: read('rsvp'), wishes: read('wish') });
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
