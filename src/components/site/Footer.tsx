import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border scroll-mt-24">
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-2 gap-12 md:pl-8 lg:pl-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <p className="font-dot text-xs text-subtle">// BUILT WITH INTENT</p>
            <p className="mt-4 max-w-md font-display text-xl font-light leading-snug text-foreground md:text-2xl">
              Engineered with curiosity.
              <br />
              Designed with restraint.
            </p>
            <p className="mt-4 max-w-md text-sm text-secondary">
              No template. No frameworks doing the thinking for me. Every pixel decided on purpose.
            </p>
          </div>

          <div className="md:pl-6 lg:pl-8">

            <p className="font-dot text-xs text-subtle">// NAVIGATE</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-secondary hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-secondary hover:text-foreground">
                  Projects
                </Link>
              </li>
            </ul>

          </div>

          <div>
            <p className="font-dot text-xs text-subtle">// ELSEWHERE</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-subtle md:flex-row md:items-center">
          <span className="font-dot">© {new Date().getFullYear()} — P S SURYANARAYANAN · BENGALURU</span>
          <span className="font-dot self-end md:self-auto">v1.1 · SHIPPED WITH CARE</span>
        </div>
      </div>
    </footer>
  );
}