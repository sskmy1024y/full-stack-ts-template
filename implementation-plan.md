# Full-Stack TypeScript テンプレート実装計画

## プロジェクト概要

モノレポ構成のfull-stack TypeScriptテンプレートを作成し、サーバー・フロントエンド・モバイルアプリの3つのアプリケーションを効率的に開発できる環境を構築する。

## プロジェクト構造

```
full-stack-ts-template/
├── apps/
│   ├── server/                 # バックエンドAPI (Express + tRPC)
│   ├── frontend/               # フロントエンドアプリ (React)
│   └── mobile/                 # モバイルアプリ (React Native/Expo)
├── packages/
│   ├── shared-lib/             # 共通ライブラリ (型定義、ユーティリティ等)
│   ├── tsconfig/               # 共通TypeScript設定
│   ├── eslint-config/          # 共通ESLint設定
│   └── database/               # Prismaスキーマとマイグレーション
├── docker/
│   ├── docker-compose.yml      # データベース環境
│   └── postgres/
│       └── init.sql            # 初期データベース設定
├── package.json                # ワークスペース設定
└── README.md                   # セットアップガイド
```

## 技術スタック (最新バージョン固定)

### 共通
- **TypeScript**: 5.7.2
- **Node.js**: 22.12.0 LTS
- **Yarn**: 最新版 (workspaces利用)
- **ESLint**: 9.28.0 (flat config)

### バックエンド (apps/server)
- **Fastify**: 5.3.3
- **tRPC**: 11.x (最新)
- **Prisma**: 6.8.2
- **Zod**: 最新版 (バリデーション)
- **PostgreSQL**: 16 (Docker)

### フロントエンド (apps/frontend)
- **Next.js**: 15.x (App Router)
- **React**: 19.1.0
- **TanStack Query**: 最新版 (tRPCクライアント)
- **Tailwind CSS**: 最新版

### モバイル (apps/mobile)
- **React Native**: 最新版
- **Expo**: 最新版
- **tRPC**: フロントエンドと同様

### 共通パッケージ
- **shared-lib**: 型定義、バリデーションスキーマ、共通ユーティリティ
- **tsconfig**: 各アプリ用のTypeScript設定
- **eslint-config**: 統一されたlinting設定

## アーキテクチャ設計

### サーバーアーキテクチャ (DDD)

```
apps/server/src/
├── application/
│   ├── usecases/               # ユースケース層
│   └── services/               # アプリケーションサービス
├── domain/
│   ├── models/                 # ドメインモデル
│   ├── repositories/           # リポジトリインターフェース
│   └── services/               # ドメインサービス
├── infrastructure/
│   ├── database/               # Prismaリポジトリ実装
│   ├── fastify/                # Fastifyプラグイン・ルーター
│   ├── trpc/                   # tRPCルーター
│   └── config/                 # 設定ファイル
├── presentation/
│   └── dto/                    # データ転送オブジェクト
└── main.ts                     # Fastifyサーバーエントリーポイント
```

### tRPC統合
- Fastifyアダプターを使用してtype-safeなAPIルーターを定義
- Next.js App RouterでのSSR対応tRPCクライアント設定
- モバイルでも同じtRPCクライアントを使用
- Fastify WebSocketサポートによるSubscription利用

### データベース設計
- Prismaを使用したスキーマ駆動開発
- マイグレーション管理
- Docker Composeでローカル開発環境を提供

## 実装計画

### Phase 1: プロジェクト基盤構築
1. **ワークスペース設定**
   - ルートpackage.jsonでyarn workspaces設定
   - 各アプリケーション・パッケージの基本構造作成

2. **共通パッケージ実装**
   - tsconfig設定パッケージ
   - eslint-config設定パッケージ
   - shared-libの基本構造

3. **データベース環境**
   - Docker Compose設定
   - Prismaスキーマ初期設定
   - 基本的なユーザーモデル定義

### Phase 2: バックエンド実装
1. **Fastify + tRPCサーバー**
   - Fastifyサーバー設定
   - tRPC Fastifyアダプター設定
   - Prismaクライアント統合

2. **DDDアーキテクチャ実装**
   - ドメインモデル (User, Auth)
   - リポジトリパターン実装
   - ユースケース層実装

3. **認証機能**
   - JWT認証の基本実装
   - Fastifyプラグインでの認証チェック
   - tRPCミドルウェアでの認証統合

### Phase 3: フロントエンド実装
1. **Next.js App Routerアプリ**
   - Next.js 15プロジェクト設定
   - App Router設定
   - tRPCクライアント設定
   - Tailwind CSS設定

2. **基本画面実装**
   - ログイン・登録画面 (app/auth)
   - ダッシュボード画面 (app/dashboard)
   - Server Components + Client Componentsの適切な使い分け
   - type-safeなAPI呼び出し例

### Phase 4: モバイルアプリ実装
1. **React Native + Expoアプリ**
   - 基本的なプロジェクト設定
   - tRPCクライアント設定（フロントエンドと共通化）

2. **基本画面実装**
   - ログイン・登録画面
   - ダッシュボード画面

### Phase 5: 開発体験向上
1. **開発ツール整備**
   - 統一されたESLint設定
   - プリコミットフック (husky + lint-staged)
   - 各アプリのdev/build/testスクリプト

2. **CI/CD準備**
   - GitHub Actions設定例
   - Docker化準備

## 特徴・利点

### 開発効率
- **Type Safety**: フロントエンドからバックエンドまで完全な型安全性
- **Code Sharing**: 共通ライブラリによるコード再利用
- **Developer Experience**: 最新ツールによる快適な開発体験

### スケーラビリティ
- **Monorepo**: 複数アプリケーションの効率的な管理
- **DDD Architecture**: 複雑なビジネスロジックにも対応可能
- **Modern Stack**: 最新技術による将来性の確保

### 保守性
- **Consistent Tooling**: 統一されたlinting・フォーマット設定
- **Clear Architecture**: 明確な責務分離によるメンテナンス性
- **Documentation**: 充実したREADMEとコメント

## 今後の拡張可能性

- **認証プロバイダー**: OAuth (Google, GitHub等) 対応
- **リアルタイム機能**: WebSocket・Server-Sent Events
- **ファイルアップロード**: S3等のクラウドストレージ統合
- **テスト**: Jest・Playwright による自動化テスト
- **監視**: OpenTelemetry・Sentry統合
- **デプロイ**: Vercel・Railway等のプラットフォーム対応

## セットアップコマンド例

```bash
# 依存関係インストール
yarn install

# データベース起動
docker-compose up -d

# データベースマイグレーション
yarn workspace @template/database db:migrate

# 開発サーバー起動（並列）
yarn dev

# 各アプリ個別起動
yarn workspace @template/server dev
yarn workspace @template/frontend dev
yarn workspace @template/mobile dev
```

このテンプレートにより、モダンなfull-stack TypeScript開発を即座に開始できる環境を提供します。