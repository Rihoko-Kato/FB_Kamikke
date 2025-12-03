// Apps Script サンプル: POST を受けてスプレッドシートに保存する。
// セキュリティ用に payload.token を Script Properties の SHEET_TOKEN と比較する簡易トークン検証を行います。
// 手順:
// 1) スプレッドシートを用意し、1行目にヘッダを入れる (例: id, where, situation, kind, thought, createdAt)
// 2) このスクリプトを script.google.com に貼り付け、メニューの「プロジェクトのプロパティ」-> スクリプトのプロパティに
//    鍵: SHEET_ID 値: (スプレッドシートID)
//    鍵: SHEET_TOKEN 値: (任意の秘密トークン)
// 3) デプロイ -> 新しいデプロイ -> 種類: Web アプリ -> 実行ユーザー: 自分, アクセス: Anyone にしてデプロイ

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents ? e.postData.contents : '{}';
    const payload = JSON.parse(raw);

    // トークンチェック（任意）
    const expectedToken = PropertiesService.getScriptProperties().getProperty('SHEET_TOKEN') || '';
    const incomingToken = payload.token || '';
    if (expectedToken && incomingToken !== expectedToken) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'invalid token' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
    if (!sheetId) throw new Error('SHEET_ID is not set in Script Properties');

    const ss = SpreadsheetApp.openById(sheetId);
    const sheet = ss.getSheets()[0];

    const id = payload.id || new Date().getTime();
    const where = payload.where || '';
    const situation = payload.situation || '';
    const kind = payload.kind || '';
    const thought = payload.thought || '';
    const createdAt = payload.createdAt || new Date().toISOString();

    // appendRow で下に追加
    sheet.appendRow([id, where, situation, kind, thought, createdAt]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET リクエスト用の簡易ヘルスチェックレスポンスを追加
function doGet(e) {
  try {
    Logger.log('doGet called with params: %s', JSON.stringify(e && e.parameter ? e.parameter : {}));
    const payload = { status: 'ok', message: 'WebApp is running. Use POST to submit data.' };
    return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log('doGet error: %s', String(err));
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
