import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Project } from "@/lib/projects";

type ProjectInput = Omit<Project, "id" | "created_at" | "updated_at">;

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function ProjectForm({ initial, projectId }: { initial?: Project; projectId?: string }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<ProjectInput>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? "",
    tech_stack: initial?.tech_stack ?? [],
    image_url: initial?.image_url ?? "",
    demo_url: initial?.demo_url ?? "",
    repo_url: initial?.repo_url ?? "",
    featured: initial?.featured ?? false,
    sort_order: initial?.sort_order ?? 0,
  });
  const [techInput, setTechInput] = useState(initial?.tech_stack.join(", ") ?? "");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      tech_stack: techInput.split(",").map((s) => s.trim()).filter(Boolean),
      image_url: form.image_url || null,
      demo_url: form.demo_url || null,
      repo_url: form.repo_url || null,
    };
    const { error } = projectId
      ? await supabase.from("projects").update(payload).eq("id", projectId)
      : await supabase.from("projects").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(projectId ? "Updated" : "Created");
    qc.invalidateQueries({ queryKey: ["projects"] });
    navigate({ to: "/admin" });
  };

  const upd = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input required value={form.title} onChange={(e) => upd("title", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(e) => upd("slug", e.target.value)} placeholder="auto from title" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Category / Tag</Label>
        <Input value={form.category} onChange={(e) => upd("category", e.target.value)} placeholder="Automation" />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea rows={6} value={form.description} onChange={(e) => upd("description", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Tech Stack (comma-separated)</Label>
        <Input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="React, UiPath, Python" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input value={form.image_url ?? ""} onChange={(e) => upd("image_url", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Sort Order</Label>
          <Input type="number" value={form.sort_order} onChange={(e) => upd("sort_order", Number(e.target.value))} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Demo URL</Label>
          <Input value={form.demo_url ?? ""} onChange={(e) => upd("demo_url", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Repo URL</Label>
          <Input value={form.repo_url ?? ""} onChange={(e) => upd("repo_url", e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
        <Switch checked={form.featured} onCheckedChange={(v) => upd("featured", v)} />
        <div>
          <p className="text-sm font-medium">Featured</p>
          <p className="text-xs text-muted-foreground">Show on homepage.</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={busy} className="rounded-full">
          {busy ? "Saving..." : projectId ? "Update Project" : "Create Project"}
        </Button>
        <Button type="button" variant="outline" className="rounded-full" onClick={() => navigate({ to: "/admin" })}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
