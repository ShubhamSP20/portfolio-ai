-- ============================================================
-- Portfolio Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ─────────────────────────────────────────
-- 1. CONTACT MESSAGES
-- Stores submissions from the contact form
-- ─────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Row-Level Security: anyone can INSERT, only authenticated users can SELECT/UPDATE/DELETE
alter table public.contact_messages enable row level security;

create policy "Allow anonymous insert" on public.contact_messages
  for insert to anon with check (true);

create policy "Allow authenticated read" on public.contact_messages
  for select to authenticated using (true);

create policy "Allow authenticated update" on public.contact_messages
  for update to authenticated using (true);

create policy "Allow authenticated delete" on public.contact_messages
  for delete to authenticated using (true);

-- ─────────────────────────────────────────
-- 2. PROJECTS
-- Stores portfolio project cards (editable from Supabase dashboard)
-- ─────────────────────────────────────────
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  tech        text[] not null default '{}',
  color       text not null default '#00f5ff',
  icon        text not null default '🚀',
  category    text not null default 'Web',
  stars       integer not null default 0,
  forks       integer not null default 0,
  live_url    text,
  github_url  text,
  featured    boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- RLS: publicly readable, only authenticated users can write
alter table public.projects enable row level security;

create policy "Allow public read" on public.projects
  for select to anon using (true);

create policy "Allow authenticated write" on public.projects
  for all to authenticated using (true);

-- ─────────────────────────────────────────
-- 3. PAGE VIEWS
-- Tracks total portfolio visits (for the live counter)
-- ─────────────────────────────────────────
create table if not exists public.page_views (
  id          bigint primary key generated always as identity,
  count       bigint not null default 0
);

-- RLS: publicly readable and updatable (for the increment function)
alter table public.page_views enable row level security;

create policy "Allow public read" on public.page_views
  for select to anon using (true);

-- Insert the initial counter row
insert into public.page_views (count) values (0)
  on conflict do nothing;

-- ─────────────────────────────────────────
-- 4. FUNCTION: increment_page_views
-- Atomically bumps the counter and returns the new value
-- ─────────────────────────────────────────
create or replace function public.increment_page_views()
returns bigint
language plpgsql
security definer
as $$
declare
  new_count bigint;
begin
  update public.page_views
  set count = count + 1
  where id = 1
  returning count into new_count;
  return new_count;
end;
$$;

-- ─────────────────────────────────────────
-- 5. SEED: default project data
-- ─────────────────────────────────────────
insert into public.projects
  (title, description, tech, color, icon, category, stars, forks, featured, sort_order)
values
  (
    'Neural Dashboard',
    'AI-powered analytics platform with real-time data visualization and ML predictions.',
    array['React','Python','TensorFlow','D3.js'],
    '#00f5ff', '🧠', 'AI/ML', 124, 32, true, 1
  ),
  (
    'CryptoVerse',
    'Real-time cryptocurrency tracking app with 3D price charts and portfolio management.',
    array['Next.js','Three.js','WebSocket','MongoDB'],
    '#bf00ff', '₿', 'Web3', 89, 21, true, 2
  ),
  (
    'DevCollab',
    'Real-time collaborative code editor with AI-powered suggestions and live preview.',
    array['React','Node.js','Socket.io','PostgreSQL'],
    '#00ff88', '👥', 'SaaS', 203, 58, true, 3
  ),
  (
    'PixelForge',
    'Browser-based 3D game engine with visual scripting and WebGL rendering pipeline.',
    array['TypeScript','WebGL','Three.js','Rust'],
    '#ff6b35', '🎮', 'GameDev', 156, 44, false, 4
  ),
  (
    'CloudSync API',
    'Microservices architecture with auto-scaling, distributed caching and REST/GraphQL.',
    array['Node.js','Docker','Redis','GraphQL'],
    '#ffcc00', '☁️', 'Backend', 312, 87, false, 5
  ),
  (
    'SmartChat',
    'Conversational AI chatbot with context-awareness and multi-language support.',
    array['Python','FastAPI','LangChain','React'],
    '#ff3e7a', '💬', 'AI/ML', 445, 119, false, 6
  );
