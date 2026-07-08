import { useEffect, useRef } from "react";

/**
 * CustomCursor — a topology-node style cursor.
 * 12px ring + 2px dot. Interpolated via rAF, GPU-accelerated.
 * Expands on interactive elements, ripples on click, hides for text/inputs.
 * Respects prefers-reduced-motion and coarse pointers.
 */

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="tab"]',
  "summary",
  "label",
  "select",
  "[data-cursor='interactive']",
  ".card-surface",
  ".btn-base",
].join(",");

const TEXT_SELECTOR = [
  "input",
  "textarea",
  "[contenteditable='true']",
  "code",
  "pre",
].join(",");

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // No custom cursor on touch / coarse pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current!;
    const dot = dotRef.current!;
    const root = rootRef.current!;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;
    let magnetX = 0;
    let magnetY = 0;
    let hoveredEl: Element | null = null;
    let visible = false;
    let raf = 0;

    document.documentElement.classList.add("has-custom-cursor");

    const setVisible = (v: boolean) => {
      if (visible === v) return;
      visible = v;
      root.style.opacity = v ? "1" : "0";
    };

    const setHovered = (el: Element | null) => {
      if (hoveredEl === el) return;
      hoveredEl = el;
      if (el) {
        root.setAttribute("data-hover", "true");
      } else {
        root.removeAttribute("data-hover");
        magnetX = 0;
        magnetY = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) {
        setHovered(null);
        root.removeAttribute("data-hidden");
        return;
      }

      // Text/input: restore native cursor
      if (el.closest(TEXT_SELECTOR)) {
        root.setAttribute("data-hidden", "true");
        setHovered(null);
        return;
      }
      root.removeAttribute("data-hidden");

      const interactive = el.closest(INTERACTIVE_SELECTOR);
      setHovered(interactive);

      if (interactive && !reduced) {
        const rect = (interactive as HTMLElement).getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Subtle magnetic attraction (max ~4px)
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const dist = Math.hypot(dx, dy) || 1;
        const strength = Math.min(4, dist * 0.08);
        magnetX = (dx / dist) * strength;
        magnetY = (dy / dist) * strength;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onDown = () => {
      root.setAttribute("data-down", "true");
      // Spawn ripple
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = `${curX}px`;
      ripple.style.top = `${curY}px`;
      document.body.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 280);
    };
    const onUp = () => root.removeAttribute("data-down");

    const tick = () => {
      // Ease factor; reduced motion → snap
      const ease = reduced ? 1 : 0.28;
      curX += (targetX + magnetX - curX) * ease;
      curY += (targetY + magnetY - curY) * ease;
      const tx = `translate3d(${curX}px, ${curY}px, 0)`;
      ring.style.transform = tx;
      dot.style.transform = tx;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}

export default CustomCursor;