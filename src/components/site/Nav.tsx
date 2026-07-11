import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Download, Github, Linkedin, Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import ensoAsset from "@/assets/enso.png";
import { smoothScrollToId } from "@/lib/smooth-scroll";

const SECTION_IDS = ["about", "projects", "experience", "skills", "contact"];

function getSegmentedPattern(hash: string): string {
  const len = hash.length;
  let w = 14;
  let cap = 8;
  if (len < 6) {
    // e.g. "about"
    w = 10;
    cap = 6;
  } else if (len > 9) {
    // e.g. "experience"
    w = 18;
    cap = 10;
  }
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='2'%3E%3Crect x='0' y='0' width='${cap}' height='2' rx='1' fill='white'/%3E%3C/svg%3E")`;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [delayedActiveId, setDelayedActiveId] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedActiveId(activeId);
    }, 120);
    return () => clearTimeout(timer);
  }, [activeId]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    const handleScroll = () => {
      setIsScrolling(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsScrolling(false);
      }, 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Scrollspy: highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") {
      setActiveId(null);
      return;
    }
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        setActiveId(bestId);
      },
      { rootMargin: "-82px 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Handle in-page anchor arrivals (initial load + back/forward).
  useEffect(() => {
    if (pathname !== "/") return;
    const scrollFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      // Wait a frame so the DOM is laid out.
      requestAnimationFrame(() => smoothScrollToId(hash, false));
    };
    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);
    return () => window.removeEventListener("hashchange", scrollFromHash);
  }, [pathname]);

  const goToSection = useCallback(
    (hash: string) => {
      if (pathname === "/") {
        smoothScrollToId(hash);
      } else {
        void navigate({ to: "/", hash });
      }
    },
    [pathname, navigate],
  );

  return (
    <header
      style={
        {
          "--capsule-duration": isScrolling ? "1.8s" : "2.2s",
        } as React.CSSProperties
      }
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between">
        <Link to="/" className="group flex items-center gap-2" aria-label="Portfolio home">
          <img
            src={ensoAsset}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 select-none"
            draggable={false}
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[0.9375rem] font-semibold tracking-[0.35em] text-foreground">
              PORTFOLIO
            </span>
            <span className="mt-[4px] font-jp text-[0.875rem] font-medium tracking-[0.18em] text-foreground/85">
              作品集
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-3.5 md:flex md:mx-[2.5rem]">
          {nav.map((item) => {
            const isActive = pathname === "/" && delayedActiveId === item.hash;
            return (
              <a
                key={item.hash}
                href={`/#${item.hash}`}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(item.hash);
                }}
                data-active={isActive ? "true" : undefined}
                className={[
                  "group relative rounded-full px-3.5 py-1.5 text-[0.9375rem] font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-foreground/90",
                ].join(" ")}
              >
                {item.label}
                <span
                  style={
                    isActive
                      ? ({
                          backgroundImage: getSegmentedPattern(item.hash),
                          backgroundRepeat: "repeat-x",
                        } as React.CSSProperties)
                      : undefined
                  }
                  className={[
                    "pointer-events-none absolute inset-x-3.5 -bottom-0.5 origin-left transition-all duration-300",
                    isActive
                      ? "h-[2px] opacity-[0.92] scale-x-100 active-signal-line"
                      : "h-px bg-foreground scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100",
                  ].join(" ")}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-full border border-border px-[1.25rem] text-[0.8125rem] text-subtle transition-colors hover:border-foreground hover:text-foreground md:inline-flex"
          >
            <Download className="h-4 w-4" />
            <span className="font-dot tracking-widest">RESUME</span>
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-10 w-10 place-items-center rounded-full border border-border text-secondary transition-colors hover:border-foreground hover:text-foreground md:grid"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden h-10 w-10 place-items-center rounded-full border border-border text-secondary transition-colors hover:border-foreground hover:text-foreground md:grid"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => {
              const isActive = pathname === "/" && activeId === item.hash;
              return (
                <a
                  key={item.hash}
                  href={`/#${item.hash}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    goToSection(item.hash);
                  }}
                  className={[
                    "rounded-lg px-3 py-2.5 text-sm hover:bg-card hover:text-foreground",
                    isActive ? "text-foreground bg-card" : "text-secondary",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="mt-2 flex gap-2">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-ghost flex-1"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-ghost flex-1"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
