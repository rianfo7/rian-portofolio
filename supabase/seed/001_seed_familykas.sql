-- Seed 1 project: FamilyKas
-- Jalankan di Supabase SQL Editor (atau lewat migration).
-- 4 project lain menyusul setelah cover image disiapkan.

INSERT INTO public.projects (
  id,
  title,
  slug,
  description,
  category,
  tech_stack,
  image_url,
  demo_url,
  repo_url,
  featured,
  sort_order
) VALUES (
  gen_random_uuid(),
  'FamilyKas',
  'familykas',
  'Aplikasi keuangan personal untuk memantau arus kas keluarga dengan dashboard visual, tracking per kategori, ringkasan otomatis, dan spending insight.',
  'Web Tool',
  ARRAY['React', 'TypeScript', 'Supabase', 'Chart.js'],
  NULL,  -- isi nanti: URL cover image (butuh upload ke storage/bucket)
  'https://familykas.vercel.app/',
  NULL,  -- isi kalau ada repo GitHub
  true,  -- tampil di homepage featured
  1
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tech_stack = EXCLUDED.tech_stack,
  demo_url = EXCLUDED.demo_url,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order;
