# 個人ブログ開発仕様書

## プロジェクト概要

### 目的

日記と技術発信を行うための個人ブログサイトの構築

### 想定読者

- 自分
- 友人
- 同業者（エンジニア）

### 更新頻度

週 1 回程度

## 技術仕様

### フロントエンド

- **フレームワーク**: Astro
- **言語**: TypeScript
- **スタイリング**: CSS（レスポンシブデザイン対応）

### CMS

- **microCMS**を使用
- 記事の投稿・編集・削除機能
- タグ管理機能

### デプロイメント

- **Cloudflare Pages**でホスティング
- 独自ドメインを設定

### 環境変数

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

## 機能要件

### 必須機能

#### 1. 記事一覧ページ（トップページ）

- **パス**: `/`
- **表示項目**:
  - 記事タイトル
  - 投稿日付
  - タグ（複数可）
- **機能**:
  - 記事を投稿日順（新しい順）で表示
  - 各記事への詳細ページリンク
  - タグクリックでフィルタ機能

#### 2. 記事詳細ページ

- **パス**: `/posts/[slug]`
- **表示項目**:
  - 記事タイトル
  - 投稿日付
  - 記事本文（Markdown 対応）
  - タグ一覧
- **機能**:
  - タグクリックでタグページへ遷移
  - 一覧ページへの戻るリンク

#### 3. タグ機能

- **タグ一覧ページ**: `/tags`
  - 全タグの一覧表示
  - 各タグの記事数表示
- **タグ別記事一覧ページ**: `/tags/[tag]`
  - 特定タグが付いた記事のみ表示
  - 記事一覧と同じレイアウト

## デザイン要件

### カラースキーム

- **メインカラー**: 黄色系（#FFD700, #FFF44F など）
- **アクセントカラー**: 黄色の補色や類似色
- **テキストカラー**: ダークグレー（#333333）
- **背景色**: ホワイト、薄い黄色

### デザインコンセプト

- ポップで明るい印象
- シンプルで見やすいレイアウト
- 親しみやすさを重視

### レスポンシブデザイン

- **ブレークポイント**:
  - モバイル: ~768px
  - タブレット: 768px~1024px
  - デスクトップ: 1024px~

## microCMS 設定

### コンテンツモデル

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

## ページ構成

```
/
├── index.astro           # 記事一覧（トップページ）
├── posts/
│   └── [slug].astro     # 記事詳細ページ
└── tags/
    ├── index.astro      # タグ一覧ページ
    └── [tag].astro      # タグ別記事一覧ページ
```

## 必要なライブラリ・パッケージ

```json
{
  "dependencies": {
    "astro": "^latest",
    "@astrojs/typescript": "^latest",
    "microcms-js-sdk": "^latest"
  }
}
```

## 実装時の注意事項

1. **SEO 対応**

   - 各ページに適切な meta 情報を設定
   - 構造化データの実装を検討

2. **パフォーマンス**

   - 画像の最適化
   - 静的生成の活用

3. **アクセシビリティ**

   - セマンティックな HTML
   - 適切な alt 属性の設定

4. **エラーハンドリング**
   - microCMS API エラー時の対応
   - 404 ページの実装

## 開発・デプロイフロー

1. ローカル開発環境でのテスト
2. microCMS 設定とコンテンツ作成
3. Cloudflare Pages でのデプロイ
4. 独自ドメインの設定

## 今後の拡張予定（オプション）

- RSS フィード
- 記事検索機能
- ダークモード対応
- コメント機能（将来的に）
