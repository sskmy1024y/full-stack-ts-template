# Full-Stack TypeScript Template

モノレポ構成のfull-stack TypeScriptテンプレート。Fastify + tRPC + Next.js + React Native/Expoによる型安全な開発環境を提供します。

## 🚀 技術スタック

### 共通
- **TypeScript**: 5.7.2
- **Node.js**: 22.12.0 LTS
- **Yarn Workspaces**: モノレポ管理
- **ESLint**: 9.17.0 (flat config)

### バックエンド
- **Fastify**: 5.3.3 (高性能Webフレームワーク)
- **tRPC**: 11.x (型安全API)
- **Prisma**: 6.8.2 (ORM)
- **PostgreSQL**: 16 (データベース)
- **Zod**: バリデーション

### フロントエンド
- **Next.js**: 15.x (App Router)
- **React**: 19.1.0
- **TanStack Query**: データフェッチング
- **Tailwind CSS**: スタイリング

### モバイル
- **React Native**: 最新版
- **Expo**: 最新版
- **tRPC**: フロントエンドと共通

## 📁 プロジェクト構造

```
full-stack-ts-template/
├── apps/
│   ├── server/                 # バックエンドAPI (Fastify + tRPC)
│   ├── frontend/               # フロントエンドアプリ (Next.js)
│   └── mobile/                 # モバイルアプリ (React Native/Expo)
├── packages/
│   ├── shared-lib/             # 共通ライブラリ (型定義、ユーティリティ等)
│   ├── tsconfig/               # 共通TypeScript設定
│   ├── eslint-config/          # 共通ESLint設定
│   └── database/               # Prismaスキーマとマイグレーション
├── docker-compose.yml          # データベース環境
└── package.json                # ワークスペース設定
```

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
yarn install
```

### 2. 環境変数の設定

```bash
cp .env.example .env
```

必要に応じて `.env` ファイルの値を編集してください。

### 3. データベースの起動

```bash
docker-compose up -d
```

### 4. データベースの初期化

```bash
# Prisma クライアント生成
yarn db:generate

# マイグレーション実行
yarn db:migrate

# シードデータ投入 (オプション)
yarn workspace @template/database db:seed
```

### 5. 開発サーバーの起動

```bash
# 全アプリケーションを並列起動
yarn dev

# または個別起動
yarn workspace @template/server dev      # バックエンド (port 3001)
yarn workspace @template/frontend dev    # フロントエンド (port 3000)
yarn workspace @template/mobile dev      # モバイル
```

## 📱 アプリケーション

### バックエンド (apps/server)
- **URL**: http://localhost:3001
- **tRPC Playground**: http://localhost:3001/trpc-playground
- **DDD アーキテクチャ**: Domain, Application, Infrastructure, Presentation層

### フロントエンド (apps/frontend)
- **URL**: http://localhost:3000
- **Next.js App Router**: Server Components + Client Components
- **型安全なAPI呼び出し**: tRPCクライアント

### モバイル (apps/mobile)
- **Expo Dev Tools**: 開発サーバー起動後に表示されるURL
- **プラットフォーム**: iOS, Android, Web対応

## 🔧 開発コマンド

```bash
# 開発
yarn dev                    # 全アプリケーション並列起動
yarn workspace <name> dev   # 個別アプリケーション起動

# ビルド
yarn build                  # 全プロジェクトビルド
yarn workspace <name> build # 個別プロジェクトビルド

# リント・型チェック
yarn lint                   # 全プロジェクトlint
yarn type-check            # 全プロジェクト型チェック

# データベース
yarn db:generate           # Prisma クライアント生成
yarn db:migrate            # マイグレーション実行
yarn db:studio             # Prisma Studio起動
yarn db:reset              # データベースリセット

# クリーンアップ
yarn clean                 # ビルド成果物削除
```

## 🏗️ アーキテクチャ

### サーバーアーキテクチャ (DDD)
```
apps/server/src/
├── application/     # ユースケース・アプリケーションサービス
├── domain/          # ドメインモデル・リポジトリインターフェース
├── infrastructure/  # 外部システム統合・Prisma実装
├── presentation/    # DTO・コントローラー
└── main.ts         # エントリーポイント
```

### 型安全性
- フロントエンドからバックエンドまで完全な型安全性
- tRPCによるAPI型推論
- Zodによるバリデーション
- 共通ライブラリによる型定義共有

## 🔐 認証

基本的なJWT認証システムを実装済み：
- ユーザー登録・ログイン
- JWTトークンベース認証
- パスワードハッシュ化

## 🧪 テスト

```bash
# テストの実行 (実装予定)
yarn test
yarn workspace <name> test
```

## 🚀 デプロイ

### 本番環境変数
本番環境では以下の環境変数を適切に設定してください：
- `DATABASE_URL`: 本番データベースURL
- `JWT_SECRET`: 強力なJWTシークレット
- `NODE_ENV`: "production"

### プラットフォーム例
- **Vercel**: フロントエンド
- **Railway/Render**: バックエンド
- **Expo EAS**: モバイルアプリ

## 📝 今後の拡張

- [ ] 自動テスト (Jest, Playwright)
- [ ] OAuth認証 (Google, GitHub)
- [ ] リアルタイム機能 (WebSocket)
- [ ] ファイルアップロード
- [ ] CI/CD (GitHub Actions)
- [ ] 監視・ロギング

## 🤝 コントリビューション

1. フォークする
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. コミット (`git commit -m 'Add amazing feature'`)
4. プッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📄 ライセンス

MIT License