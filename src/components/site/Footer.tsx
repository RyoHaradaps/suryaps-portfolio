import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border scroll-mt-24">
      <div className="container-page py-20 md:py-28">
        <div className="grid grid-cols-2 gap-y-16 gap-x-12 md:px-8 lg:px-12 md:grid-cols-[2fr_1fr] md:gap-x-16 lg:gap-x-20">
          <div className="col-span-2 md:col-span-1 md:pl-8 lg:pl-20">
            <p className="font-dot text-[0.875rem] tracking-widest text-subtle">// BUILT WITH INTENT</p>
            <p className="mt-4 max-w-xl font-display text-[2rem] sm:text-[2.375rem] md:text-[2.75rem] leading-[1.15] font-medium text-foreground">
              Engineered with curiosity.
              <br />
              Designed with restraint.
            </p>
            <p className="mt-4 max-w-2xl text-[1rem] md:text-[1.125rem] leading-relaxed md:leading-[1.65] text-secondary">
              No template. No frameworks doing the thinking for me.
              <br />
              Every pixel decided on purpose.
            </p>
          </div>

          <div>
            <p className="font-dot text-[0.875rem] tracking-widest text-subtle">// ELSEWHERE</p>
            <ul className="mt-4 space-y-3 text-[1rem] md:text-[1.125rem]">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground"
                >
                  <Github className="h-[18px] w-[18px]" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground"
                >
                  <Linkedin className="h-[18px] w-[18px]" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground"
                >
                  <Mail className="h-[18px] w-[18px]" /> Email
                </a>
              </li>
              <li>
                <a
                  href="tel:+919023607811"
                  className="inline-flex items-center gap-2 text-secondary hover:text-foreground"
                >
                  <Phone className="h-[18px] w-[18px]" /> +91 9023607811
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[0.8125rem] text-subtle md:flex-row md:items-center">
          <span className="font-dot">
            © {new Date().getFullYear()} — P S SURYANARAYANAN · BENGALURU
          </span>
          <span className="font-dot self-end md:self-auto">v1.1 · SHIPPED WITH CARE</span>
        </div>
      </div>
    </footer>
  );
}
