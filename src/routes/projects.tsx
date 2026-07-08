import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Section } from "@/components/site/Section";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects, projectCategories } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — P S Suryanarayanan" },
      {
        name: "description",
        content:
          "Selected engineering case studies across Machine Learning, Computer Vision, and Full Stack Development.",
      },
      { property: "og:title", content: "Projects — P S Suryanarayanan" },
      {
        property: "og:description",
        content: "Selected engineering case studies in ML, CV and full-stack.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const location = useLocation();
  const isIndex = location.pathname === "/projects" || location.pathname === "/projects/";

  if (!isIndex) {
    return <Outlet />;
  }

  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof projectCategories)[number]>("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const inCat = cat === "All" || p.tags.includes(cat);
      const needle = q.trim().toLowerCase();
      const inQ =
        !needle ||
        p.name.toLowerCase().includes(needle) ||
        p.tagline.toLowerCase().includes(needle) ||
        p.stack.some((s) => s.toLowerCase().includes(needle));
      return inCat && inQ;
    });
  }, [q, cat]);

  return (
    <>
      <section className="pt-36 md:pt-48">
        <div className="container-page">
          <p className="font-dot text-xs md:text-sm text-subtle">// INDEX · PROJECTS</p>
          <h1 className="mt-6 font-display text-6xl font-light leading-[0.95] tracking-tight md:text-8xl">
            Selected work.
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-secondary lg:max-w-5xl">
            Case studies from internships, research, and independent projects.
            Every card opens a full engineering breakdown.
          </p>
        </div>
      </section>

      <Section className="pt-20 md:pt-28">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-subtle" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects, stack, ideas…"
              aria-label="Search projects"
              className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-base text-foreground placeholder:text-subtle focus:border-foreground focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={[
                  "rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer",
                  c === "Research" && "order-3 md:order-5",
                  c === "Deep Learning" && "order-4 md:order-3",
                  c === "Web Development" && "order-5 md:order-4",
                  cat === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-secondary hover:border-foreground hover:text-foreground",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card-surface p-16 text-center">
            <p className="font-dot text-xs text-subtle">// NO MATCH</p>
            <h2 className="mt-4 font-display text-2xl">Nothing found.</h2>
            <p className="mt-2 text-sm text-secondary">
              Try a different keyword or clear the filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}