# Gallery DB Reset Guide

## Overview
- This project uses Supabase Postgres for gallery data.
- The current app does not use Supabase Auth for admin login.
- Admin access in the app is handled by local session credentials, and DB writes are performed with the server-side `service_role` key.

## Current Program Schema
The current implementation expects only these DB tables:
- `public.galleries`
- `public.gallery_images`

Legacy `public.users` is not required by the current program and is removed by the reset SQL.

## Reset SQL
Run [`supabase/sql/001_gallery_setup.sql`](/c:/Users/okkim/Documents/GitHub/geumcheon-fc/geumcheon-fc/supabase/sql/001_gallery_setup.sql).

This SQL:
- deletes existing gallery-related tables
- recreates the gallery schema from scratch
- recreates public read policies
- recreates `service_role` write policies

## Warning
- Existing gallery data will be deleted.
- Run this only when you intend to reset the gallery schema.

## Environment Variables
Set `.env.local` like this:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_GALLERY_BUCKET=gallery
ADMIN_LOGIN_ID=gcadmin@local.dev
ADMIN_LOGIN_PASSWORD=8888
ADMIN_SESSION_SECRET=change-this-session-secret
```

## Tables

### public.galleries
- `id uuid primary key`
- `title text not null`
- `slug text not null unique`
- `description text`
- `category gallery_category not null`
- `thumbnail_image_id uuid null`
- `status gallery_post_status not null default 'draft'`
- `is_public boolean not null default false`
- `is_deleted boolean not null default false`
- `published_at timestamptz null`
- `created_at timestamptz not null`
- `updated_at timestamptz not null`

### public.gallery_images
- `id uuid primary key`
- `gallery_id uuid not null`
- `image_url text not null`
- `sort_order integer not null default 0`
- `is_thumbnail boolean not null default false`
- `created_at timestamptz not null`

## Execution Order
1. Open Supabase SQL Editor.
2. Run [`supabase/sql/001_gallery_setup.sql`](/c:/Users/okkim/Documents/GitHub/geumcheon-fc/geumcheon-fc/supabase/sql/001_gallery_setup.sql).
3. In Supabase Storage UI, create a public bucket named `gallery`.
4. Restart the Next.js dev server.
5. Check `/gallery`.
6. Check `/admin/login`.

## Admin Login
- ID: `gcadmin@local.dev`
- Password: `8888`
