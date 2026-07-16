import { createFileRoute } from "@tanstack/react-router";
import { Copy, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

const EMAIL = "rianfo7@yahoo.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rian" },
      { name: "description", content: "Get in touch with Rian for collaboration, freelance, or full-time opportunities." },
      { property: "og:title", content: "Contact — Rian" },
      { property: "og:description", content: "Get in touch with Rian." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    toast.success("Email copied");
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Contact</span>
        <h1 className="mt-2 font-display text-5xl font-bold md:text-6xl">Let's talk.</h1>
        <p className="mt-4 text-muted-foreground">
          Reach out via email or connect on social. I usually reply within a day.
        </p>

        <div className="mt-12 space-y-3">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted p-3"><Mail className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                <a href={`mailto:${EMAIL}`} className="font-medium hover:underline">{EMAIL}</a>
              </div>
            </div>
            <Button variant="outline" onClick={copy} className="rounded-full">
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
          </div>

          <a
            href="https://github.com/rianfo7"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/30"
          >
            <div className="rounded-full bg-muted p-3"><Github className="h-5 w-5" /></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">GitHub</p>
              <p className="font-medium">github.com/rianfo7</p>
            </div>
          </a>

          <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border bg-card/40 p-6">
            <div className="rounded-full bg-muted p-3"><Linkedin className="h-5 w-5 text-muted-foreground" /></div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">LinkedIn</p>
              <p className="font-medium text-muted-foreground">Coming soon — under construction</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
