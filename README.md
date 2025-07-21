# VIVID YELLOW

Astro + TypeScript + microCMSを使用した個人ブログサイトです。日記と技術発信を目的とした、黄色をベースにしたポップで明るいデザインのブログです。

## 🎨 デザインコンセプト

- **カラースキーム**: 黄色系（#FFD700, #FFF44F）をメインカラーとした明るい印象
- **レスポンシブデザイン**: モバイル、タブレット、デスクトップに対応
- **シンプル**: 見やすく親しみやすいレイアウト

## 🚀 技術スタック

- **フロントエンド**: Astro + TypeScript
- **CMS**: microCMS
- **スタイリング**: CSS（レスポンシブ対応）
- **デプロイ**: Cloudflare Pages（推奨）

## 📁 プロジェクト構成

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── lib/
│   │   └── microcms.ts        # microCMS API クライアント
│   ├── pages/
│   │   ├── index.astro        # 記事一覧（トップページ）
│   │   ├── posts/
│   │   │   └── [slug].astro   # 記事詳細ページ
│   │   └── tags/
│   │       ├── index.astro    # タグ一覧ページ
│   │       └── [tag].astro    # タグ別記事一覧ページ
│   └── types/
│       └── blog.ts            # TypeScript型定義
├── .env.example               # 環境変数のサンプル
├── astro.config.mjs
└── package.json
```

## 🔧 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を`.env`にコピーし、microCMSの設定を記入してください。

```bash
cp .env.example .env
```

`.env`ファイルを編集：

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

### 3. microCMSの設定

microCMSで以下のAPIを作成してください：

#### ブログ記事（posts）

```json
{
  "title": {
    "fieldId": "title",
    "displayName": "タイトル",
    "kind": "text",
    "required": true
  },
  "content": {
    "fieldId": "content",
    "displayName": "本文",
    "kind": "richEditor",
    "required": true
  },
  "tags": {
    "fieldId": "tags",
    "displayName": "タグ",
    "kind": "relation",
    "relationTarget": "tags",
    "isArray": true
  },
  "slug": {
    "fieldId": "slug",
    "displayName": "スラッグ",
    "kind": "text",
    "required": true
  }
}
```

#### タグ（tags）

```json
{
  "name": {
    "fieldId": "name",
    "displayName": "タグ名",
    "kind": "text",
    "required": true
  },
  "slug": {
    "fieldId": "slug",
    "displayName": "スラッグ",
    "kind": "text",
    "required": true
  }
}
```

## 🧞 コマンド

| コマンド | 動作 |
| :--- | :--- |
| `npm install` | 依存関係をインストール |
| `npm run dev` | 開発サーバーを起動（`localhost:4321`） |
| `npm run build` | 本番用ビルドを実行（`./dist/`に出力） |
| `npm run preview` | ビルド結果をローカルでプレビュー |
| `npm run astro ...` | Astro CLIコマンドを実行 |

## 🌐 デプロイ

### Cloudflare Pagesでのデプロイ

1. Cloudflare Pagesでプロジェクトを作成
2. 環境変数を設定：
   - `MICROCMS_SERVICE_DOMAIN`
   - `MICROCMS_API_KEY`
3. ビルドコマンド：`npm run build`
4. 出力ディレクトリ：`dist`

## 📝 機能

- ✅ 記事一覧表示（投稿日順）
- ✅ 記事詳細表示（Markdown対応）
- ✅ タグ機能（タグ一覧・タグ別記事一覧）
- ✅ レスポンシブデザイン
- ✅ SEO対応（meta情報設定）

## 🎯 今後の拡張予定

- RSS フィード
- 記事検索機能
- ダークモード対応
- コメント機能

## 📄 ライセンス

MIT
