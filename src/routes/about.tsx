import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rian" },
      { name: "description", content: "About Rian: IT Operational & Application Support, AI & Automation Enthusiast." },
      { property: "og:title", content: "About — Rian" },
      { property: "og:description", content: "IT Operational & Application Support, focused on business app monitoring, UiPath automation, and cybersecurity documentation." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">About</span>
        <h1 className="mt-2 font-display text-5xl font-bold md:text-6xl">Behind the work.</h1>

        <div className="mt-10 flex flex-col items-start gap-12 md:flex-row md:gap-16">
          <div className="h-56 w-56 shrink-0 overflow-hidden rounded-2xl border-4 border-border bg-muted">
            <img src="/images/profile.jpg" alt="Rian Permadi" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              I'm <span className="font-semibold text-foreground">Rian Permadi</span>, an IT Operational &amp; Application Support
              specialist in the automotive industry at PT Honda Prospect Motor. My day-to-day focuses on monitoring
              business-critical applications, keeping them reliable for internal users across production and back-office
              operations.
            </p>
            <p>
              Outside work, my passion lies in <span className="text-foreground">AI &amp; Automation</span>: building small
              tools/apps, experimenting with LLM workflows, and finding practical ways for automation to reduce toil. And the tools/apps that I created are mostly aimed at solving everyday problems. 
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <h2 className="font-display text-2xl font-bold">More About Me</h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { k: "Focus", v: "Operation & Application support, monitoring & automation" },
              { k: "AI Tools", v: "Claude, ChatGPT, Gemini" },
              { k: "Interests", v: "AI, LLM workflows, vibecodes" },
              { k: "Industry", v: "Automotive / Manufacturing" },
            ].map((i) => (
              <div key={i.k} className="rounded-xl border border-border bg-card p-5">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">{i.k}</dt>
                <dd className="mt-1 font-medium">{i.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SiteLayout>
  );
}
