import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import portrait from "@/assets/Surya1.jpg";
import { Section } from "@/components/site/Section";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { AITopology } from "@/components/site/AITopology";
import { MobileTopologyFragment } from "@/components/site/MobileTopologyFragment";
import { projects } from "@/lib/projects";
import { skillGroups, experience } from "@/lib/skills";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { smoothScrollToId } from "@/lib/smooth-scroll";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = projects.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-24 md:pt-28 md:pb-44">
        <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
        <div className="container-page max-w-[1360px] relative">
          <div className="mt-8 grid gap-12 md:grid-cols-[minmax(0,1.1fr)_1fr] md:items-center md:gap-16 lg:gap-20">
            <div>
              <Reveal delay={40} className="mb-6">
                <div className="inline-flex w-fit max-w-full min-h-9 h-auto items-center gap-2.5 px-0 md:px-0 md:w-auto md:whitespace-nowrap">
                  <span
                    className="availability-breathe h-2.5 w-2.5 shrink-0 rounded-full bg-foreground"
                    aria-hidden="true"
                  />
                  <span className="font-dot text-[0.875rem] md:text-[0.9375rem] font-medium uppercase tracking-[0.18em] text-foreground">
                    OPEN TO FULL-TIME • ML ENGINEER • ASSOCIATE DATA SCIENTIST • AI ENGINEER
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display text-[13.3vw] font-light leading-[0.95] tracking-[-0.04em] sm:text-[10.45vw] md:text-[7.125rem] lg:text-[9.025rem]">
                  Hi. <span className="text-subtle">I'm</span> <br className="hidden md:block" />
                  Surya<span className="animate-blink text-foreground">_</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-10 max-w-2xl text-justify text-[1.06875rem] sm:text-[1.1875rem] md:text-[1.425rem] md:leading-relaxed text-white/[0.65] lg:text-left">
                  <span className="text-white/[0.65]">I build </span>
                  <span className="text-white">functional AI systems</span>
                  <span className="text-white/[0.65]"> from custom attention models to </span>
                  <span className="text-white">full stack computer vision pipelines</span>
                  <span className="text-white/[0.65]">. My work sits where </span>
                  <span className="text-white">machine learning</span>
                  <span className="text-white/[0.65]"> intersects with </span>
                  <span className="text-white">end to end software engineering</span>
                  <span className="text-white/[0.65]">, driven by a strict bias for </span>
                  <span className="text-white">latency, clarity, and craft</span>
                  <span className="text-white/[0.65]">.</span>
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollToId("projects");
                    }}
                    className="btn-base btn-primary text-[0.96rem] px-[1.44rem] h-[2.88rem] gap-[0.6rem] transform hover:scale-[1.02] transition-transform duration-300"
                  >
                    View projects <ArrowUpRight className="h-5 w-5" />
                  </a>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-base btn-ghost md:hidden text-[0.96rem] px-[1.44rem] h-[2.88rem] gap-[0.6rem]"
                  >
                    <Linkedin className="h-5 w-5" /> LinkedIn
                  </a>
                  <a
                    href={site.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-base btn-ghost md:hidden text-[0.96rem] px-[1.44rem] h-[2.88rem] gap-[0.6rem]"
                  >
                    <Download className="h-5 w-5" /> Download resume
                  </a>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-base btn-ghost md:hidden text-[0.96rem] px-[1.44rem] h-[2.88rem] gap-[0.6rem]"
                  >
                    <Github className="h-5 w-5" /> GitHub
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="hidden md:block">
              <div className="relative w-full h-full min-h-[30rem] md:min-h-[40rem] lg:min-h-[43.75rem]">
                <AITopology />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Mobile-only topology fragment — a continuation of the desktop AI network */}
        <div
          className="pointer-events-none absolute -right-5 top-12 h-52 w-80 opacity-[0.14] md:hidden"
          aria-hidden="true"
        >
          <MobileTopologyFragment />
        </div>
      </section>

      {/* ABOUT */}
      <Section
        id="about"
        eyebrow="// 01 · ABOUT"
        title={
          <>
            Engineering first. Design aware.
            <br />
            Curious by default.
          </>
        }
      >
        {/* Mobile + Desktop: preserve existing layout */}
        <div className="grid gap-12 md:hidden lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <Reveal className="h-full">
            <div className="relative h-full">
              <div className="card-surface h-full overflow-hidden p-0">
                <img
                  src={portrait}
                  alt="Portrait of P S Suryanarayanan"
                  className="h-full w-full scale-[0.95] object-cover grayscale transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="flex h-full flex-col justify-between space-y-6 text-justify text-lg text-secondary md:text-xl md:leading-relaxed">
              <p>
                I got into engineering the same way most people get into anything worth doing:
                curiosity that outgrew the tutorials. Somewhere between building small tools and
                breaking large ones, I realised the interesting work lives at the seam between a
                research idea and a product someone actually opens on a Tuesday.
              </p>
              <p>
                Since then I've worked across <span className="text-foreground">deep learning</span>
                , <span className="text-foreground">computer vision</span>, and{" "}
                <span className="text-foreground">full stack Python</span> often in the same
                project. AgroScan started as a leaf classifier and became a decision-support tool.
                An attendance system for a refinery had to survive lighting, latency, and zero
                training budget. A movie tracker turned into a study in unifying four external APIs
                behind one clean model.
              </p>
              <p className="text-foreground">
                I'm interested in intelligent systems for the long haul: perception, language, and
                the boring but important engineering that makes them ship. I want to work with
                people who care about the last ten percent as much as the first ninety.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-0 sm:flex sm:items-start sm:justify-between sm:gap-0">
                {[
                  { n: 4, l: "Projects Shipped", suffix: "" },
                  { n: 3, l: "Industry Internships", suffix: "" },
                  { n: 100, l: "Development Hours", suffix: "+" },
                  { n: "∞", l: "Curiosity", suffix: "" },
                ].map((s) => (
                  <div key={s.l} className="border-t border-border pt-0 text-center">
                    <div
                      className={cn(
                        "font-dot justify-center text-foreground",
                        s.l === "Curiosity"
                          ? "flex items-center -mt-2 text-5xl md:text-6xl"
                          : "flex items-center text-4xl md:text-5xl",
                      )}
                    >
                      <AnimatedCounter value={s.n} suffix={s.suffix} />
                    </div>
                    <div className="mt-2 font-dot text-[0.8125rem] uppercase tracking-[0.12em] text-subtle">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Tablet only: editorial layout */}
        {/* Tablet only: editorial float-wrap layout */}
        <div className="hidden md:block lg:hidden">
          <Reveal>
            <div className="relative float-left mr-10 mb-10 w-[45%] min-w-[260px] max-w-[300px]">
              <div className="card-surface aspect-[4/5] overflow-hidden p-0">
                <img
                  src={portrait}
                  alt="Portrait of P S Suryanarayanan"
                  className="h-full w-full scale-[0.95] object-cover grayscale transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-6 text-justify text-lg text-secondary md:text-xl md:leading-relaxed">
              <p>
                I got into engineering the same way most people get into anything worth doing:
                curiosity that outgrew the tutorials. Somewhere between building small tools and
                breaking large ones, I realised the interesting work lives at the seam between a
                research idea and a product someone actually opens on a Tuesday.
              </p>
              <p>
                Since then I've worked across <span className="text-foreground">deep learning</span>
                , <span className="text-foreground">computer vision</span>, and{" "}
                <span className="text-foreground">full stack Python</span> often in the same
                project. AgroScan started as a leaf classifier and became a decision-support tool.
                An attendance system for a refinery had to survive lighting, latency, and zero
                training budget. A movie tracker turned into a study in unifying four external APIs
                behind one clean model.
              </p>
              <p className="clear-left text-foreground">
                I'm interested in intelligent systems for the long haul: perception, language, and
                the boring but important engineering that makes them ship. I want to work with
                people who care about the last ten percent as much as the first ninety.
              </p>

              <div className="clear-left grid grid-cols-2 gap-4 pt-6 sm:flex sm:items-start sm:justify-between sm:gap-0">
                {[
                  { n: 4, l: "Projects Shipped", suffix: "" },
                  { n: 3, l: "Industry Internships", suffix: "" },
                  { n: 100, l: "Development Hours", suffix: "+" },
                  { n: "∞", l: "Curiosity", suffix: "" },
                ].map((s) => (
                  <div key={s.l} className="border-t border-border pt-6 text-center">
                    <div
                      className={cn(
                        "font-dot justify-center text-foreground",
                        s.l === "Curiosity"
                          ? "flex items-center -mt-2 text-5xl md:text-6xl"
                          : "flex items-center text-4xl md:text-5xl",
                      )}
                    >
                      <AnimatedCounter value={s.n} suffix={s.suffix} />
                    </div>
                    <div className="mt-2 font-dot text-[0.8125rem] uppercase tracking-[0.12em] text-subtle">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section
        id="projects"
        eyebrow="// 02 · SELECTED WORK"
        title={<>Systems I've built.</>}
        description="A small set of the things I've shipped. Each opens a full engineering case study."
      >
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section
        id="experience"
        eyebrow="// 03 · EXPERIENCE"
        title={<>A timeline of the work.</>}
        description="Internships where I built, shipped, and learned by solving real-world engineering problems."
      >
        <div className="border-t border-border/70 pt-12 md:pt-16">
          <ol className="relative">
            <span
              className="pointer-events-none absolute left-[9px] top-2.5 bottom-2.5 w-px bg-border md:left-[10px]"
              aria-hidden
            />
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i * 80} className="mb-28 last:mb-0 md:mb-[96px]">
                <li className="group relative pl-12 md:pl-16">
                  <span
                    className="absolute left-0 top-1.5 grid h-5 w-5 place-items-center rounded-full border border-border bg-background transition-colors duration-200 group-hover:border-foreground md:h-[1.375rem] md:w-[1.375rem]"
                    aria-hidden
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/70 transition-colors duration-200 group-hover:bg-foreground" />
                  </span>

                  <div className="grid gap-10 lg:grid-cols-[1fr_220px] lg:gap-12">
                    <div>
                      <p className="font-dot text-sm font-medium uppercase tracking-widest text-white/80">
                        {e.period}
                      </p>
                      <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.01em] text-foreground md:text-4xl">
                        {e.role}
                      </h3>
                      <p className="mt-2 text-lg text-secondary md:text-xl">
                        {e.company} <span className="text-subtle">· {e.project}</span>
                      </p>
                      <ul className="mt-8 space-y-5 text-lg text-secondary transition-colors duration-200 group-hover:text-foreground/90 md:text-xl md:leading-relaxed">
                        {e.bullets.map((b) => (
                          <li key={b} className="group flex items-start gap-4 leading-relaxed">
                            <span
                              className="relative mt-[0.65em] flex h-1 w-1 shrink-0"
                              aria-hidden
                            >
                              <span className="h-1 w-1 rounded-full bg-white/[0.55] transition-colors duration-200 group-hover:bg-white" />
                              <span className="absolute left-full top-1/2 h-px w-0 -translate-y-1/2 bg-white/40 transition-all duration-200 ease-out group-hover:w-3" />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      {e.stack && (
                        <ul className="mt-8 flex flex-wrap gap-1.5">
                          {e.stack.map((s) => (
                            <li
                              key={s}
                              className="rounded-full border border-border px-2.5 py-1 font-dot text-sm text-secondary transition-colors hover:border-foreground hover:text-foreground"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {e.metrics && (
                      <div className="border-t border-border/70 pt-8 text-center lg:content-center lg:border-l lg:border-border/70 lg:pl-12 lg:pt-0 lg:text-right lg:transition-colors lg:duration-200 lg:group-hover:border-border">
                        <div className="grid grid-cols-3 gap-6 lg:grid-cols-1 lg:gap-12">
                          {e.metrics.map((m) => (
                            <div key={m.label} className="flex flex-col items-center lg:items-end">
                              <div
                                className={cn(
                                  "font-display font-light leading-none tracking-[-0.02em] text-foreground md:text-5xl",
                                  m.label === "Export formats"
                                    ? "text-3xl md:text-4xl whitespace-nowrap"
                                    : "text-4xl md:text-5xl",
                                )}
                              >
                                {m.value}
                              </div>
                              <div className="mt-3 font-dot text-[0.8125rem] uppercase tracking-widest text-subtle">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="// 04 · STACK" title={<>Tools I reach for.</>}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 40}>
              <div className="card-surface h-full p-9 min-h-[280px]">
                <h3 className="font-display text-xl font-medium">{g.label}</h3>
                <p className="mt-1 text-sm text-subtle">{g.caption}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s.name}
                      title={[s.years, s.projects ? `${s.projects} projects` : null, s.primary]
                        .filter(Boolean)
                        .join(" · ")}
                      className="rounded-full border border-border px-3.5 py-2 font-dot text-sm text-secondary transition-colors hover:border-foreground hover:text-foreground"
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* LATEST INSIGHT */}
    </>
  );
}
