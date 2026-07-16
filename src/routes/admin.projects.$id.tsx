import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProjectForm } from "@/components/project-form";
import type { Project } from "@/lib/projects";

export const Route = createFileRoute("/admin/projects/$id")({
  component: EditProject,
});

function EditProject() {
  const { id } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
      if (error) throw error;
      return data as Project;
    },
  });

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Edit Project</h1>
      {isLoading || !data ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <ProjectForm initial={data} projectId={data.id} />
      )}
    </div>
  );
}
