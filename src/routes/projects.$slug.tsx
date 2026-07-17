import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { projectBySlugQuery } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(projectBySlugQuery(params.slug));
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Rian` },
          { name: "description", content: loaderData.description.slice(0, 155) },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description.slice(0, 155) },
        ]
      : [{ title: "Project — Rian" }],
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Project not found</h1>
        <Link to="/projects" className="mt-6 inline-block text-sm underline">Back to projects</Link>
      </div>
    </SiteLayout>
  ),
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: project } = useSuspenseQuery(projectBySlugQuery(slug));
  if (!project) return null;

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-24">
        <Link to="/projects" className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>

        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {project.category || "Project"}
        </span>
        <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl">{project.title}</h1>

        {project.image_url && (
          <img src={project.image_url} alt={project.title} className="mt-10 w-full rounded-2xl border border-border" />
        )}

        <div className="mt-10 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
          {project.description || "No description yet."}
        </div>

        {project.tech_stack.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Tech Stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech_stack.map((t) => (
                <span key={t} className="rounded-full border border-border px-3 py-1 text-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {(project.demo_url || project.repo_url) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-2.5 text-sm font-medium hover:bg-accent"
              >
                <Github className="h-4 w-4" /> Repository
              </a>
            )}
          </div>
        )}
      </article>
    </SiteLayout>
  );
}
