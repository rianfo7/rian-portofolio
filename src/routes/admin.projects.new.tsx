import { createFileRoute } from "@tanstack/react-router";
import { ProjectForm } from "@/components/project-form";

export const Route = createFileRoute("/admin/projects/new")({
  component: NewProject,
});

function NewProject() {
  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">New Project</h1>
      <ProjectForm />
    </div>
  );
}
