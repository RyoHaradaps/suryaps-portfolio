import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1400,
}: {
  value: number | string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const numeric = typeof value === "number" ? value : Number(value);
  const isNumber = Number.isFinite(numeric);
  const [display, setDisplay] = useState<string>(
    isNumber ? "0" : String(value),
  );

  useEffect(() => {
    if (!isNumber) return;
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(numeric * eased);
        setDisplay(String(current).padStart(String(numeric).length, "0"));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [numeric, duration, isNumber]);

  return (
    <span ref={ref} className="font-dot tabular-nums">
      {display}
      {suffix}
    </span>
  );
}