import { Github, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Rian. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span className="mr-2 text-xs uppercase tracking-widest text-muted-foreground">Follow Me</span>
          <a
            href="https://github.com/rianfo7"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rian-permadi-825a24395"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
