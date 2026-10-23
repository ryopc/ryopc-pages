# ryopc pages — React + TypeScript + Vite

`ryopc pages` の公式サイトです。React + TypeScript + Vite で構築された、PC/スマートフォン対応のレスポンシブサイト。制作実績、サービス紹介、お問い合わせフォーム（formsubmit.co 連携）まで実装しています。

## 含まれるページ

- `/` — トップページ
- `/works` — 制作実績一覧
- `/works/:id` — 制作実績詳細（IDが不正な場合は404）
- `/services` — できること
- `/about` — プロジェクト紹介と運営元情報
- `/contact` — 入力、バリデーション、確認画面、送信完了
- 上記以外のパス — 404画面

クライアント側ルーティングには `BrowserRouter` を使用し、Cloudflare Pages 等の SPA 対応ホスティングで正常に動作します。

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

テストは問い合わせフォームの入力検証と制作実績データを対象にしています。`npm audit` は High/Critical の脆弱性があれば失敗します。

## デプロイ（Cloudflare Pages 推奨）

本プロジェクトは Cloudflare Pages へのデプロイを想定しています。

1. このリポジトリを GitHub に push します。
2. Cloudflare Dashboard → Pages → **Create a project** → **Connect to Git** でリポジトリを選択。
3. ビルド設定:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: （空欄、リポジトリルートの場合）
4. **Save and Deploy** で初回デプロイが実行されます。

カスタムドメインを使用する場合は、Cloudflare Pages の **Custom domains** から設定してください。`public/_redirects` に SPA フォールバック（`/* /index.html 200`）を設定済みです。

GitHub Pages 等のサブパス配下で運用する場合は、`vite.config.ts` の `base` を `./` に戻し、`src/main.tsx` を `HashRouter` に戻してください。

## 正式ロゴ

`public/images/ryopc-pages-logo.png` に、提供された正式ロゴ画像を配置しています。favicon はシンボルを簡略化した SVG を使用しています。

## お問い合わせフォーム

`/contact` にて実装しています。入力検証・確認画面・送信完了までのフローが動作します。

送信は [formsubmit.co](https://formsubmit.co/) を経由し、設定済みの `info@ryopc.org` へメールが届きます。スパム対策として `_captcha=false` としています（必要に応じて `true` に変更可能）。本番運用時はプライバシーポリシー等の表示を追加してください。

## 制作実績データ

`src/data/projects.ts` に配列として定義されています。実際の制作実績に差し替える際は、このファイルの `projects` 配列を書き換えるだけで反映されます。型定義 `Project` に従って以下のフィールドを指定してください。

```ts
type Project = {
  id: string;           // URL用の一意な識別子
  title: string;        // タイトル
  category: string;     // カテゴリ表示名
  description: string;  // 一覧カード用の短い説明
  summary: string;      // 詳細ページ用の概要
  tone: 'blue' | 'lavender' | 'mint' | 'peach'; // 見た目の色分け
  label: string;        // カード右上のラベル
  features: string[];   // 詳細ページのポイント一覧
  image?: string;       // 制作実績画像のパス (例: '/images/projects/ryopc-site.png')
};
```