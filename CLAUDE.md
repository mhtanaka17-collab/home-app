# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドラインです。

## プロジェクト概要

Supabase認証機能付きの不動産管理Webアプリ。React + Viteで構成する。

- メールアドレス＋パスワードで会員登録・ログインができる
- ログイン後は物件一覧画面（ダミーデータ）に遷移する
- 未ログイン時はログイン画面へリダイレクトする
- ログアウト機能を持つ

### 構成
- `src/supabaseClient.js` : Supabaseクライアントの初期化（接続情報は`.env`で管理）
- `src/contexts/AuthContext.jsx` : ログイン状態（セッション）をアプリ全体に共有するContext
- `src/components/ProtectedRoute.jsx` : 未ログイン時に`/login`へリダイレクトする保護ルート
- `src/pages/Login.jsx`, `src/pages/SignUp.jsx` : ログイン・会員登録フォーム
- `src/pages/Properties.jsx` : 物件一覧（カード形式、ダミーデータ）

### 環境変数（`.env`、`.gitignore`対象）
- `VITE_SUPABASE_URL` : SupabaseプロジェクトURL
- `VITE_SUPABASE_PUBLISHABLE_KEY` : Supabase Publishable Key

## Git運用ルール

- **コードに変更を加えたら、都度コミットしてGitHubにプッシュすること。** 変更を溜め込まず、意味のある単位（1機能・1修正など）ごとにコミットし、その都度リモート（origin）へプッシュする。
- コミットメッセージは変更内容が分かるように簡潔に書く。
- force push（`--force`）や履歴を書き換える操作は、明示的な指示がない限り行わない。
- リモートリポジトリ（GitHub）が未設定の場合は、先にユーザーへ設定を確認する。

## 開発コマンド

- `npm run dev` : 開発サーバーを起動
- `npm run build` : 本番ビルド
- `npm run lint` : Lint実行（oxlint）
