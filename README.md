# Garden Portfolio

Next.js で実装した、家庭菜園の記録を管理する Web アプリです。

本教材 **web-sec-playground-2** を参考に、Supabase を利用したセッションベース認証と、認可付きの投稿管理機能を実装しました。

## リンク
- 

---

# 1. この課題で実装したこと

## 採用した認証方式

- セッションベース認証
- Supabase Auth を利用したメールアドレス + パスワード認証
- Next.js App Router と `@supabase/ssr` によるサーバーサイドセッション管理

## 教材に追加した認証・認可機能

- ログイン状態に応じたヘッダー表示の切り替え
  - 未ログイン時：Login / Sign Up
  - ログイン時：プロフィール名・Logout・Admin リンク
- ロールベース認可
  - ADMIN のみ家庭菜園ログを新規作成可能
- プロフィール編集機能
  - 表示名
  - 自己紹介
- ログイン必須制御
- Server Action 側での権限チェック
- Supabase Auth と Prisma の UserProfile 自動同期

---

# 2. アプリ概要

Garden Portfolio は、家庭菜園の記録を投稿・閲覧できる Web アプリです。

## 主な機能

- 投稿一覧表示
- 投稿詳細表示
- 画像を Supabase Storage に保存
- 投稿者情報の表示
- 管理者のみ新規投稿可能
- プロフィール編集

---

# 3. 画面一覧

- ホーム
- 新規登録
- ログイン
- 家庭菜園一覧
- 家庭菜園詳細
- 管理画面
- 新規投稿
- プロフィール編集

---

# 4. セキュリティ設計

## 認証

- Supabase Auth を採用
- パスワードはアプリ側で保持しない
- セッション管理は `@supabase/ssr`

## 認可

- ADMIN のみ投稿作成可能
- ログインユーザーのみプロフィール編集可能
- Server Action 側でも `requireAdmin()` により権限を再確認

## セッション管理

用途ごとに Supabase クライアントを分離しています。

|場所|役割|
|---|---|
|Server Component|読み取り専用セッション|
|Route Handler|ログイン・ログアウト・セッション更新|

## 画像アップロード

- Supabase Storage に保存
- Public URL を利用して表示
- Next.js 側で画像ホストを限定

## データベース設計

Prisma を利用してデータを管理しています。

### UserProfile

- Supabase Auth と連携
- 表示名
- 自己紹介
- ロール管理

### GardenLog

- タイトル
- 本文
- 画像
- 投稿者(UserProfile)とリレーション

投稿者情報はサーバー側で取得し、クライアントから送信された情報は信用しない設計にしています。

---

# 5. 工夫した点

- 認証状態に応じてヘッダー表示を変更
- 投稿作成を ADMIN のみに限定し権限境界を明確化
- プロフィール編集を独立させ保守性を向上
- 認証 Callback で Supabase の Session と Prisma の UserProfile を同期
- 外部画像は Supabase Storage のみ許可
- Server Action・Route Handler・Server Component を役割ごとに分離

---

# 6. 使用技術

|カテゴリ|技術|
|---|---|
|Framework|Next.js 15|
|Language|TypeScript|
|UI|React 19|
|CSS|Tailwind CSS|
|Database|Prisma|
|Authentication|Supabase Auth|
|Storage|Supabase Storage|
|SSR|@supabase/ssr|
|Lint|ESLint|

---

# 7. 主要機能

## 認証

- 新規登録
- ログイン
- ログアウト
- セッション管理
- UserProfile 自動同期

## 認可

- ADMIN のみ投稿作成
- プロフィール編集
- 権限に応じたナビゲーション表示

## 投稿機能

- 家庭菜園ログ作成
- 投稿一覧表示
- 投稿詳細表示
- 画像添付
- ログイン必須制御

---

# 8. 今後の改善候補

- 監査ログ機能
- CSP・セキュリティヘッダー強化
- Storage の画像削除連携
- 投稿編集・削除機能
- エラーメッセージの UI 改善
- アクセシビリティ向上

---

# 9. 参考

- web-sec-playground-2
- Next.js
- Supabase
- Prisma
- React