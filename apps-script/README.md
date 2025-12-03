Apps Script サンプル

このフォルダには、Google Apps Script (Web App) に貼り付けて使えるサンプルコードを置いています。

手順
1. Google スプレッドシートを作成し、1行目にヘッダを入れる（例: id, where, situation, kind, thought, createdAt）。
2. script.google.com で新規プロジェクトを作成し、`Code.gs` の内容を貼り付ける。
3. 「プロジェクトのプロパティ」→「スクリプトのプロパティ」に以下を追加する：
   - `SHEET_ID` : スプレッドシートの ID（URL の `/d/` と `/edit` の間の文字列）
   - （任意）`SHEET_TOKEN` : 簡易トークン（クライアント側から送る場合にのみチェックされます）
4. デプロイ → 新しいデプロイ → 種類: Web アプリ
   - 実行ユーザー: 自分
   - アクセス: Anyone（匿名でもアクセス可）  ※ 簡易動作確認用。運用で使う場合はセキュリティを検討してください。
5. 発行された Web App URL をコピーして、ローカルの `.env` の `VITE_SHEETS_ENDPOINT` に貼る。

クライアント側（`FormCard.tsx`）では、payload に `token` を含めることで Apps Script 側のトークンチェックに対応できます。`env.example` を参考にしてください。

注意
- Apps Script の実行制限・スロットリングに注意（大量書き込みには向きません）。
- `SHEET_TOKEN` は簡易トークンであり完全な防御にはなりません。スパム対策や高セキュリティが必要な場合は OAuth やサーバープロキシの導入を検討してください。
