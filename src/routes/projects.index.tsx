import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site-layout";
import { projectsQuery } from "@/lib/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Rian" },
      { name: "description", content: "Selected projects in IT support, automation, and AI." },
      { property: "og:title", content: "Projects — Rian" },
      { property: "og:description", content: "Selected projects in IT support, automation, and AI." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: ProjectsList,
});

function ProjectsList() {
  const { data: projects } = useSuspenseQuery(projectsQuery);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Portfolio</span>
        <h1 className="mt-2 font-display text-5xl font-bold md:text-6xl">All Projects</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          A collection of work spanning IT operations, automation, and AI experiments.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.id}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg"
            >
              <div className="mb-16 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-muted to-accent">
                {p.image_url && (
                  <img src={p.image_url} alt={p.title} className="h-full w-full object-cover" />
                )}
              </div>
              <div>
                <span className="inline-block rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  {p.category || "Project"}
                </span>
                <h2 className="mt-3 font-display text-xl font-semibold">{p.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
