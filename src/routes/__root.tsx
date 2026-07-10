import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { CustomCursor } from "@/components/site/CustomCursor";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div className="relative max-w-lg text-center">
        <p className="font-dot text-[13px] text-subtle">ERR // 0x0404</p>
        <h1 className="mt-6 font-display text-[9rem] font-light leading-none text-foreground">
          404
        </h1>
        <h2 className="mt-2 font-display text-2xl font-medium">Signal not found.</h2>
        <p className="mt-3 text-sm text-secondary">
          The page you're looking for has drifted out of range.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-base btn-primary">Return home</Link>
          <Link to="/" hash="projects" className="btn-base btn-ghost">Browse projects</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-dot text-[13px] text-subtle">ERR // RUNTIME</p>
        <h1 className="mt-4 font-display text-2xl font-medium text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-secondary">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-base btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-base btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "P S Suryanarayanan — Machine Learning & Computer Vision Engineer" },
      {
        name: "description",
        content:
          "Portfolio of P S Suryanarayanan — Machine Learning, Computer Vision, and Full Stack Engineer building intelligent software with Python, PyTorch, and modern web technologies.",
      },
      { name: "author", content: "P S Suryanarayanan" },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "P S Suryanarayanan — ML & Computer Vision Engineer" },
      {
        property: "og:description",
        content:
          "Building intelligent software using AI, Deep Learning, Computer Vision and Full Stack Development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&family=Silkscreen:wght@400;700&family=Noto+Sans+JP:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollProgress />
      <Nav />
      <CustomCursor />
      <main className="min-h-dvh">
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
