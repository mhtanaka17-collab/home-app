-- 不動産管理アプリ用の物件テーブル
-- Supabaseダッシュボードの SQL Editor でこのファイルの内容を実行してください。

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  name text not null,        -- 物件名
  rent integer not null,     -- 家賃（円）
  area text not null,        -- エリア名
  layout text not null,      -- 間取り（例: 1LDK）
  created_at timestamptz not null default now()
);

-- 自分の物件を検索しやすくするためのインデックス
create index if not exists properties_user_id_idx on public.properties (user_id);

-- 行単位のセキュリティ（RLS）を有効化
alter table public.properties enable row level security;

-- 自分が登録した物件のみ閲覧できる
create policy "自分の物件のみ閲覧可能"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 自分の物件としてのみ新規登録できる
create policy "自分の物件のみ登録可能"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
create policy "自分の物件のみ更新可能"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
create policy "自分の物件のみ削除可能"
  on public.properties
  for delete
  using (auth.uid() = user_id);
