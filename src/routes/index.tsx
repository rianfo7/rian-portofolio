import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Copy, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site-layout";
import { projectsQuery } from "@/lib/projects";

const EMAIL = "rianfo7@yahoo.com";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: Home,
});

function Home() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const showcase = featured.length > 0 ? featured : projects.slice(0, 3);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    toast.success("Email copied to clipboard");
  };

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-available px-3.5 py-1.5 text-xs font-medium text-available-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
              </span>
              Available for Work
            </span>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Hi, I'm Rian.
              <br />
              <span className="text-muted-foreground">Building reliable systems &amp; automation.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              IT Operational &amp; Application Support at PT Honda Prospect Motor.
              AI &amp; Automation Enthusiast.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/contact">
                  <Mail className="mr-2 h-4 w-4" /> Contact Me
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6" onClick={copyEmail}>
                <Copy className="mr-2 h-4 w-4" /> Copy Email
              </Button>
            </div>
          </div>

          <div className="mx-auto">
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-border bg-muted md:h-60 md:w-60">
              <img
                src="/profile.jpg"
                alt="Rian Permadi"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="border-t border-border/60 bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Selected Work
              </span>
              <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Projects</h2>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {showcase.map((p) => (
              <Link
                key={p.id}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg"
              >
                <div className="mb-16 h-32 rounded-xl bg-gradient-to-br from-muted to-accent" />
                <div>
                  <span className="inline-block rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    {p.category || "Project"}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" />
          <h2 className="mt-6 font-display text-4xl font-bold md:text-5xl">Let's build something great.</h2>
          <p className="mt-4 text-muted-foreground">
            Open to collaborations, freelance, and full-time opportunities in IT support, automation, and AI.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/contact">Get in Touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
