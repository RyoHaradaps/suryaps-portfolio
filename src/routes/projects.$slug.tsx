import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { getProject, projectNav, relatedProjects, type Project } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.name} — Case Study · P S Suryanarayanan` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.name} — Case Study` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="container-page pt-40 pb-24">
      <p className="font-dot text-[13px] text-subtle">// 0x0404</p>
      <h1 className="mt-6 font-display text-5xl font-light">Project not found.</h1>
      <Link to="/projects" className="btn-base btn-primary mt-8">
        Back to projects
      </Link>
    </div>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const { prev, next } = projectNav(project.slug);
  const related = relatedProjects(project.slug, 2);

  return (
    <>
      {/* HERO */}
      <section className="pt-36 md:pt-48">
        <div className="container-page">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-base text-secondary hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <div className="mt-12 flex items-center justify-between font-dot text-[13px] md:text-sm text-subtle">
            <span>CASE · {project.index}</span>
            <span>
              {project.year} · {project.category.toUpperCase()} · {project.status.toUpperCase()}
            </span>
          </div>
          <Reveal>
            <h1 className="mt-6 font-display text-6xl font-light leading-[0.95] tracking-tight md:text-8xl">
              {project.name}
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-secondary md:text-2xl md:leading-relaxed">{project.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-3.5 py-2 text-sm text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} GitHub Repository`}
                  className="btn-base btn-primary"
                >
                  <Github className="h-4 w-4" /> View source
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-base btn-ghost"
                >
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              )}
            </div>

            <div className="mt-20 card-surface grid gap-8 p-10 md:grid-cols-4 md:p-14">
              <Meta label="Role" value={project.role} />
              <Meta label="Year" value={project.year} />
              <Meta label="Status" value={project.status} />
              <Meta label="Difficulty" value={project.difficulty} />
            </div>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="// 01 · OVERVIEW" title={<>What it is.</>}>
        <p className="max-w-3xl text-lg text-secondary md:text-xl">{project.summary}</p>
      </Section>

      <Section eyebrow="// 02 · PROBLEM" title={<>Why it exists.</>}>
        <p className="max-w-3xl text-lg text-secondary md:text-xl">{project.problem}</p>
        <div className="mt-10">
          <p className="font-dot text-sm text-subtle">OBJECTIVES</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {project.objectives.map((o, i) => (
              <li key={o} className="card-surface p-8">
                <div className="font-dot text-[13px] md:text-sm text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-3 text-base text-foreground md:text-lg">{o}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="// 03 · ARCHITECTURE" title={<>How it works.</>}>
        <div className="card-surface p-10 md:p-12">
          <p className="font-mono text-base text-secondary md:text-lg">{project.architecture}</p>
        </div>
        <div className="mt-10">
          <p className="font-dot text-sm text-subtle">WORKFLOW</p>
          <ol className="mt-4 grid gap-3 md:grid-cols-5">
            {project.workflow.map((w, i) => (
              <li key={w} className="card-surface flex flex-col gap-3.5 p-6">
                <span className="font-dot text-[13px] md:text-sm text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base text-foreground">{w}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow="// 04 · IMPLEMENTATION" title={<>Under the hood.</>}>
        <p className="max-w-3xl text-lg text-secondary md:text-xl">{project.implementation}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {project.dataset && (
            <div className="card-surface p-8">
              <p className="font-dot text-sm text-subtle">DATASET</p>
              <p className="mt-3 text-foreground text-base md:text-lg">{project.dataset}</p>
            </div>
          )}
          {project.model && (
            <div className="card-surface p-8">
              <p className="font-dot text-sm text-subtle">MODEL</p>
              <p className="mt-3 text-foreground text-base md:text-lg">{project.model}</p>
            </div>
          )}
        </div>
      </Section>

      <Section eyebrow="// 05 · CHALLENGES & SOLUTIONS">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-surface p-10">
            <p className="font-dot text-sm text-subtle">CHALLENGES</p>
            <ul className="mt-5 space-y-3 text-base md:text-lg">
              {project.challenges.map((c) => (
                <li key={c} className="flex gap-3 text-secondary">
                  <span className="mt-2 h-px w-4 shrink-0 bg-border" /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-10">
            <p className="font-dot text-sm text-subtle">SOLUTIONS</p>
            <ul className="mt-5 space-y-3 text-base md:text-lg">
              {project.solutions.map((s) => (
                <li key={s} className="flex gap-3 text-foreground">
                  <span className="mt-2 h-px w-4 shrink-0 bg-foreground" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {project.decisions && project.decisions.length > 0 && (
        <Section eyebrow="// 06 · ENGINEERING DECISIONS" title={<>Why, not just what.</>}>
          <div className="grid gap-6 md:grid-cols-2">
            {project.decisions.map((d) => (
              <div key={d.title} className="card-surface p-10">
                <h3 className="font-display text-2xl">{d.title}</h3>
                <p className="mt-3 text-base text-secondary md:text-lg">{d.body}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {project.tradeoffs && project.tradeoffs.length > 0 && (
        <Section eyebrow="// 07 · TRADE-OFFS">
          <div className="grid gap-6 md:grid-cols-2">
            {project.tradeoffs.map((t) => (
              <div key={t.title} className="card-surface p-10">
                <p className="font-dot text-sm text-subtle">TRADE-OFF</p>
                <h3 className="mt-3 font-display text-2xl">{t.title}</h3>
                <p className="mt-3 text-base text-secondary md:text-lg">{t.body}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="// 08 · RESULTS" title={<>Outcome.</>}>
        <ul className="grid gap-4 md:grid-cols-3">
          {project.results.map((r, i) => (
            <li key={r} className="card-surface p-8">
              <div className="font-dot text-3xl">{String(i + 1).padStart(2, "0")}</div>
              <p className="mt-4 text-base text-foreground md:text-lg">{r}</p>
            </li>
          ))}
        </ul>
      </Section>

      {project.lessons && project.lessons.length > 0 && (
        <Section eyebrow="// 09 · LESSONS LEARNED">
          <ul className="space-y-4 max-w-3xl">
            {project.lessons.map((l) => (
              <li key={l} className="flex gap-4 text-xl text-secondary md:text-2xl md:leading-relaxed">
                <span className="mt-3 h-px w-6 shrink-0 bg-foreground" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section eyebrow="// 10 · WHAT'S NEXT" title={<>Future improvements.</>}>
        <ul className="space-y-2 text-xl text-secondary md:text-2xl md:leading-relaxed">
          {project.future.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="mt-3 h-px w-6 shrink-0 bg-border" /> {f}
            </li>
          ))}
        </ul>
      </Section>

      {project.relatedReading && project.relatedReading.length > 0 && (
        <Section eyebrow="// 11 · RELATED READING">
          <ul className="grid gap-3 md:grid-cols-2">
            {project.relatedReading.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card-surface group flex items-center justify-between p-8"
                >
                  <span className="text-base text-foreground">{r.label}</span>
                  <ArrowUpRight className="h-5 w-5 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {related.length > 0 && (
        <Section eyebrow="// 12 · RELATED PROJECTS">
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="card-surface group p-10"
              >
                <p className="font-dot text-[13px] tracking-widest text-subtle">
                  {p.category.toUpperCase()} · {p.status.toUpperCase()}
                </p>
                <h3 className="mt-4 font-display text-3xl">{p.name}</h3>
                <p className="mt-2 text-base text-secondary">{p.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-base text-foreground">
                  Read case study
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section className="pb-32">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/projects/$slug"
            params={{ slug: prev.slug }}
            className="card-surface group p-10"
          >
            <div className="flex items-center gap-2 text-sm text-subtle">
              <ArrowLeft className="h-4 w-4" /> Previous
            </div>
            <div className="mt-4 font-display text-3xl">{prev.name}</div>
            <div className="mt-1 text-base text-secondary">{prev.tagline}</div>
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="card-surface group p-10 md:text-right"
          >
            <div className="flex items-center gap-2 text-sm text-subtle md:justify-end">
              Next <ArrowRight className="h-4 w-4" />
            </div>
            <div className="mt-4 font-display text-3xl">{next.name}</div>
            <div className="mt-1 text-base text-secondary">{next.tagline}</div>
          </Link>
        </div>
        <div className="mt-12 text-center">
          <Link to="/projects" className="btn-base btn-ghost">
            All projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-dot text-sm text-subtle">{label.toUpperCase()}</p>
      <p className="mt-3 text-lg text-foreground md:text-xl">{value}</p>
    </div>
  );
}