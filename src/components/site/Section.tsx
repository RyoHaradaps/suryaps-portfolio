import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`container-page py-28 md:py-40 lg:py-44 ${className}`}>
      {(eyebrow || title || description || action) && (
        <header className="mb-4 flex flex-col gap-4 md:mb-6">
          {eyebrow && <p className="font-dot text-xs md:text-sm text-subtle">{eyebrow}</p>}
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:grid-rows-[auto_auto] md:items-start">
            {title && (
              <h2 className="font-display text-4xl font-light tracking-tight md:col-start-1 md:row-start-1 md:text-6xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-lg text-secondary md:col-span-2 md:row-start-2 md:max-w-none md:text-xl lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:whitespace-nowrap">
                {description}
              </p>
            )}
            {action && (
              <div className="shrink-0 md:col-start-2 md:row-start-1 lg:col-start-2 lg:row-start-1">
                {action}
              </div>
            )}
          </div>
        </header>
      )}
      {children}
    </section>
  );
}
