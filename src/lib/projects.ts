import { supabase } from "@/integrations/supabase/client";
import { queryOptions } from "@tanstack/react-query";

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tech_stack: string[];
  image_url: string | null;
  demo_url: string | null;
  repo_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export async function fetchAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as Project | null;
}

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: fetchAllProjects,
});

export const projectBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["projects", slug],
    queryFn: () => fetchProjectBySlug(slug),
  });
