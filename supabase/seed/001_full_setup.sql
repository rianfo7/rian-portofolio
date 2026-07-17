-- ============================================================
--  RIAN PORTFOLIO — Supabase Setup (RUN THIS IN SQL EDITOR)
--  Copy semua isi file ini, paste ke Supabase Dashboard
--  → SQL Editor → Run.
-- ============================================================

-- 1. Roles enum + user_roles table (untuk admin panel Lovable)
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  demo_url TEXT,
  repo_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON public.projects FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Seed: FamilyKas (project asli) + 4 placeholder menyusul
INSERT INTO public.projects (title, slug, description, category, tech_stack, featured, sort_order) VALUES
  ('FamilyKas', 'familykas', 'Aplikasi keuangan personal untuk memantau arus kas keluarga dengan dashboard visual, tracking per kategori, ringkasan otomatis, dan spending insight.', 'Web Tool', ARRAY['React','TypeScript','Supabase','Chart.js'], true, 1),
  ('Project Two', 'project-two', 'Menyusul — siapkan cover image.', 'AI', ARRAY['OpenAI','n8n'], false, 2),
  ('Project Three', 'project-three', 'Menyusul — siapkan cover image.', 'Monitoring', ARRAY['Grafana','SQL'], false, 3),
  ('Project Four', 'project-four', 'Menyusul — siapkan cover image.', 'Cybersecurity', ARRAY['ISO 27001'], false, 4),
  ('Project Five', 'project-five', 'Menyusul — siapkan cover image.', 'Web', ARRAY['React','TypeScript'], false, 5);

-- 4. Bootstrap admin (biar user pertama yg daftar jadi admin)
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_bootstrap_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();
