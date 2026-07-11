function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function flash(el: HTMLElement) {
  el.classList.remove("arrival-flash");
  // force reflow so animation retriggers
  void el.offsetWidth;
  el.classList.add("arrival-flash");
  window.setTimeout(() => el.classList.remove("arrival-flash"), 400);
}

export function smoothScrollToId(id: string, updateUrl = true) {
  if (typeof window === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;
  const el: HTMLElement = target;

  const nav = document.querySelector("header");
  const navHeight = nav?.getBoundingClientRect().height ?? 72;

  // Visual alignment so section content starts at the desired position.
  const OPTICAL_OFFSET = 140;

  const targetY = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - navHeight + OPTICAL_OFFSET,
  );

  if (updateUrl) {
    const nextHash = `#${id}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
  }

  if (prefersReducedMotion()) {
    window.scrollTo(0, targetY);
    flash(el);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) {
    flash(el);
    return;
  }
  const duration = Math.min(800, Math.max(600, Math.abs(distance) * 0.6));
  const start = performance.now();
  const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  function step(now: number) {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * ease(t));
    if (t < 1) requestAnimationFrame(step);
    else flash(el);
  }
  requestAnimationFrame(step);
}
