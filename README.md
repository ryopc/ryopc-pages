# ryopc pages — React + CI プロトタイプ

`ryopc pages` の正式ロゴを使用した、React + TypeScript + Vite の公式サイト用モックです。PC/スマートフォンのレスポンシブ表示、ページ間遷移、制作実績詳細、問い合わせフォームの入力検証・確認画面まで実装しています。

## 含まれるページ

- `/` — トップページ
- `/works` — 制作実績一覧
- `/works/:id` — 制作実績詳細（IDが不正な場合は404）
- `/services` — できること
- `/about` — プロジェクト紹介と運営元情報
- `/contact` — 入力、バリデーション、確認画面
- 上記以外のパス — 404画面

GitHub Pagesでもリロード時にページが消えないよう、クライアント側ルーティングには `HashRouter` を使用しています。

## ローカルで起動

必要環境：Node.js 22.12以降、npm。

```bash
npm install
npm run dev
```

ターミナルに表示されるローカルURL（通常は `http://localhost:5173`）をブラウザで開きます。

## チェックとビルド

```bash
npm run typecheck
npm test
npm audit --audit-level=high
npm run build
npm run preview
```

テストは問い合わせフォームの入力検証と制作実績データを対象にしています。`npm audit` はHigh/Criticalの脆弱性があればCIを失敗させます。

## GitHubへ置くとき

1. ZIPを展開し、フォルダの中身をGitHubリポジトリに追加します。
2. 初回に `npm install` を実行します。
3. 生成された `package-lock.json` をGitに追加してください。以降のCIは `npm ci` を使い、依存関係を再現可能にします。
4. GitHubの **Settings → Pages → Build and deployment** で **GitHub Actions** を選択します。
5. `main` ブランチへpushすると、CI実行後に `.github/workflows/deploy-pages.yml` が公開します。

Viteの `base` は `./` に設定済みで、リポジトリ名に依存しない相対アセットパスです。ルーティングURLは `/#/works` のようなハッシュ形式になります。

## 正式ロゴ

`public/images/ryopc-pages-logo.png` に、提供された正式ロゴ画像をそのまま配置しています。ロゴは描き直していません。faviconだけはシンボルを簡略化したSVGを使っています。

## お問い合わせフォームについて

入力検証と確認画面は動作しますが、送信先のAPIやメールサービスは接続していません。画面上にも明示しており、入力内容を送信・保存することはありません。本番公開時に問い合わせを受け付けるには、送信先、スパム対策、プライバシーに関する表示を別途実装してください。

## サンプル実績について

掲載している4件はデザインを確認するための制作イメージです。実案件のクライアント実績や受賞歴を表すものではありません。
