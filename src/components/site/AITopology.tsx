import { useEffect, useMemo, useRef, useState } from "react";

/**
 * AITopology — a quiet, living knowledge graph for the hero.
 * Pure SVG + rAF. Monochrome. Subtle float + traveling particles.
 */

type NodeDef = {
  id: string;
  label: string;
  x: number; // 0..100 (viewBox units)
  y: number;
  r?: number;
  tier?: 0 | 1 | 2; // 0 = core, 1 = domain, 2 = tool
};

type Edge = [string, string];

// Layout tuned to a 100 x 120 viewBox (portrait-ish, fills right column)
const NODES: NodeDef[] = [
  // Core
  { id: "ml", label: "Machine Learning", x: 60, y: 60, r: 2.6, tier: 0 },

  // Core pillars (glow + white text like ML)
  { id: "cv", label: "Computer Vision", x: 31.2, y: 48, r: 2, tier: 0 },
  { id: "dl", label: "Deep Learning", x: 88.8, y: 42, r: 2, tier: 0 },
  { id: "ai", label: "Artificial Intelligence", x: 60, y: 24, r: 2, tier: 0 },
  { id: "ds", label: "Data Science", x: 60, y: 96, r: 2, tier: 0 },
  { id: "fs", label: "Full Stack", x: 26.4, y: 84, r: 2, tier: 1 },

  // Tools — CV cluster (left)
  { id: "opencv", label: "OpenCV", x: 14.4, y: 32, tier: 2 },
  { id: "mediapipe", label: "MediaPipe", x: 12.0, y: 52, tier: 2 },
  { id: "lbph", label: "LBPH", x: 7.2, y: 35, tier: 2 },

  // Tools — DL cluster (right)
  { id: "pytorch", label: "PyTorch", x: 105.6, y: 32, tier: 2 },
  { id: "tensorflow", label: "TensorFlow", x: 110.4, y: 48, tier: 2 },
  { id: "attention", label: "Attention", x: 98.4, y: 20, tier: 2 },
  { id: "lstm", label: "LSTM", x: 112.8, y: 22, tier: 2 },
  { id: "bilstm", label: "BiLSTM", x: 115.2, y: 34, tier: 2 },
  { id: "temporal", label: "Temporal Attn", x: 103.2, y: 12, tier: 2 },

  // Tools — DS / ML shared
  { id: "python", label: "Python", x: 60, y: 46, tier: 2 },
  { id: "numpy", label: "NumPy", x: 40.8, y: 30, tier: 2 },
  { id: "sklearn", label: "Scikit-Learn", x: 79.2, y: 30, tier: 2 },
  { id: "streamlit", label: "Streamlit", x: 48.0, y: 12, tier: 2 },

  // Full-stack cluster (bottom-left)
  { id: "django", label: "Django", x: 36.0, y: 95, tier: 2 },
  { id: "rest", label: "REST APIs", x: 16.8, y: 96, tier: 2 },
  { id: "sqlite", label: "SQLite", x: 9.6, y: 74, tier: 2 },
  { id: "mysql", label: "MySQL", x: 26.4, y: 108, tier: 2 },
  { id: "bootstrap", label: "Bootstrap", x: 45.6, y: 108, tier: 2 },
  { id: "tailwind", label: "Tailwind", x: 55.2, y: 82, tier: 2 },
  { id: "tkinter", label: "Tkinter", x: 9.6, y: 100, tier: 2 },
  { id: "reportlab", label: "ReportLab", x: 4.8, y: 88, tier: 2 },

  // Data / infra (bottom-right)
  { id: "git", label: "Git", x: 86.4, y: 96, tier: 2 },
  { id: "github", label: "GitHub", x: 100.8, y: 88, tier: 2 },
  { id: "wsl", label: "WSL2", x: 108.0, y: 102, tier: 2 },

  // Projects (hover targets)
  { id: "agroscan", label: "AgroScan", x: 81.6, y: 62, r: 1.8, tier: 1 },
  { id: "movielist", label: "MyMovieList", x: 38.4, y: 66, r: 1.8, tier: 1 },
  { id: "attendance", label: "Attendance", x: 12.0, y: 62, r: 1.8, tier: 1 },
  { id: "sign", label: "Sign Language", x: 88.8, y: 78, r: 1.8, tier: 1 },
];

const EDGES: Edge[] = [
  // Core to domains
  ["ml", "cv"],
  ["ml", "dl"],
  ["ml", "ai"],
  ["ml", "ds"],
  ["ml", "fs"],
  ["ml", "python"],
  ["ai", "ml"],
  ["ai", "dl"],
  ["dl", "cv"],

  // CV cluster
  ["cv", "opencv"],
  ["cv", "mediapipe"],
  ["opencv", "lbph"],
  ["opencv", "mediapipe"],

  // DL cluster
  ["dl", "pytorch"],
  ["dl", "tensorflow"],
  ["dl", "attention"],
  ["attention", "temporal"],
  ["dl", "lstm"],
  ["lstm", "bilstm"],
  ["bilstm", "temporal"],

  // DS
  ["ds", "python"],
  ["ds", "numpy"],
  ["ds", "sklearn"],
  ["ds", "streamlit"],
  ["python", "numpy"],
  ["python", "sklearn"],
  ["python", "pytorch"],
  ["python", "opencv"],
  ["python", "django"],

  // Full stack
  ["fs", "django"],
  ["fs", "rest"],
  ["fs", "sqlite"],
  ["fs", "mysql"],
  ["fs", "bootstrap"],
  ["fs", "tailwind"],
  ["fs", "tkinter"],
  ["fs", "reportlab"],
  ["django", "rest"],
  ["django", "sqlite"],
  ["django", "bootstrap"],

  // Infra
  ["fs", "git"],
  ["git", "github"],
  ["ml", "wsl"],

  // Projects
  ["agroscan", "pytorch"],
  ["agroscan", "opencv"],
  ["agroscan", "numpy"],
  ["agroscan", "attention"],
  ["agroscan", "streamlit"],
  ["agroscan", "cv"],
  ["agroscan", "dl"],

  ["movielist", "django"],
  ["movielist", "rest"],
  ["movielist", "sqlite"],
  ["movielist", "bootstrap"],
  ["movielist", "tailwind"],
  ["movielist", "fs"],

  ["attendance", "opencv"],
  ["attendance", "lbph"],
  ["attendance", "mediapipe"],
  ["attendance", "tkinter"],
  ["attendance", "mysql"],
  ["attendance", "reportlab"],
  ["attendance", "cv"],

  ["sign", "mediapipe"],
  ["sign", "bilstm"],
  ["sign", "temporal"],
  ["sign", "python"],
  ["sign", "cv"],
  ["sign", "dl"],
];

// Adjacency for hover highlight
const ADJ: Record<string, Set<string>> = (() => {
  const m: Record<string, Set<string>> = {};
  for (const n of NODES) m[n.id] = new Set();
  for (const [a, b] of EDGES) {
    m[a].add(b);
    m[b].add(a);
  }
  return m;
})();

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AITopology() {
  const [hover, setHover] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = prefersReducedMotion();
    startRef.current = performance.now();
    const loop = (t: number) => {
      setTick(t - startRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Precompute per-node phase so float feels organic
  const phases = useMemo(
    () =>
      NODES.map((_, i) => ({
        px: Math.random() * Math.PI * 2,
        py: Math.random() * Math.PI * 2,
        sx: 0.6 + Math.random() * 0.6,
        sy: 0.6 + Math.random() * 0.6,
      })),
    [],
  );

  // Positions with subtle sine motion (max ~1 viewBox unit ≈ few px)
  const t = reduced.current ? 0 : tick / 1000;
  const positions = NODES.map((n, i) => {
    const p = phases[i];
    const dx = Math.sin(t * 0.4 * p.sx + p.px) * 0.5;
    const dy = Math.cos(t * 0.35 * p.sy + p.py) * 0.5;
    return { ...n, cx: n.x + dx, cy: n.y + dy };
  });
  const posById: Record<string, { cx: number; cy: number; r?: number; tier?: number }> = {};
  for (const p of positions) posById[p.id] = p;

  const active = hover ? new Set<string>([hover, ...Array.from(ADJ[hover] ?? [])]) : null;

  // Traveling particles — pick a subset of edges, animate along
  const particleEdges = useMemo(() => {
    // Deterministic subset for calm feel
    const picks = [
      ["ml", "cv"],
      ["ml", "dl"],
      ["ml", "python"],
      ["dl", "pytorch"],
      ["cv", "opencv"],
      ["fs", "django"],
      ["python", "numpy"],
      ["attention", "temporal"],
      ["git", "github"],
    ];
    return picks.map(([a, b], i) => ({ a, b, offset: i / picks.length }));
  }, []);

  return (
    <div className="relative w-full h-full min-h-[480px] md:min-h-[640px] lg:min-h-[700px]">
      <svg
        viewBox="0 0 120 120"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Interactive knowledge graph of AI, computer vision, and engineering tools"
        onPointerMove={(e) => {
          if (reduced.current) return;
          const svg = e.currentTarget as SVGSVGElement;
          const rect = svg.getBoundingClientRect();
          // Map pixel → viewBox (120 × 120 with xMidYMid meet)
          const scale = Math.min(rect.width / 120, rect.height / 120);
          const offsetX = (rect.width - 120 * scale) / 2;
          const offsetY = (rect.height - 120 * scale) / 2;
          const vx = (e.clientX - rect.left - offsetX) / scale;
          const vy = (e.clientY - rect.top - offsetY) / scale;
          let nearestId: string | null = null;
          let nearestDist = Infinity;
          for (const p of positions) {
            const dx = p.cx - vx;
            const dy = p.cy - vy;
            const d = dx * dx + dy * dy;
            if (d < nearestDist) {
              nearestDist = d;
              nearestId = p.id;
            }
          }
          // Only activate within a small local radius (~8 viewBox units)
          if (nearestId && nearestDist <= 64) setHover(nearestId);
          else setHover(null);
        }}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Edges */}
        <g>
          {EDGES.map(([a, b], i) => {
            const p1 = posById[a];
            const p2 = posById[b];
            if (!p1 || !p2) return null;
            const isActive = active ? active.has(a) && active.has(b) : false;
            const dimmed = active && !isActive;
            const stroke = isActive ? "#8a8a8a" : "#2a2a2a";
            const opacity = dimmed ? 0.15 : isActive ? 0.9 : 0.55;
            return (
              <line
                key={i}
                x1={p1.cx}
                y1={p1.cy}
                x2={p2.cx}
                y2={p2.cy}
                stroke={stroke}
                strokeWidth={isActive ? 0.22 : 0.14}
                opacity={opacity}
                style={{ transition: "stroke 400ms, opacity 400ms, stroke-width 400ms" }}
              />
            );
          })}
        </g>

        {/* Traveling particles along a subset of edges */}
        <g>
          {particleEdges.map(({ a, b, offset }, i) => {
            const p1 = posById[a];
            const p2 = posById[b];
            if (!p1 || !p2) return null;
            const period = 6; // seconds
            const u = (((t / period + offset) % 1) + 1) % 1;
            const x = p1.cx + (p2.cx - p1.cx) * u;
            const y = p1.cy + (p2.cy - p1.cy) * u;
            const fade = Math.sin(u * Math.PI); // in/out
            return <circle key={i} cx={x} cy={y} r={0.35} fill="#ffffff" opacity={0.65 * fade} />;
          })}
        </g>

        {/* Nodes */}
        <g>
          {positions.map((n) => {
            const isHover = hover === n.id;
            const isActive = active ? active.has(n.id) : false;
            const dimmed = active && !isActive;
            const baseR = n.r ?? 1.3;
            const r = isActive ? baseR * 1.25 : baseR;
            const fill = n.tier === 0 ? "#ffffff" : isActive ? "#ffffff" : "#e5e5e5";
            const opacity = dimmed ? 0.25 : 1;
            const pulse = n.tier === 0 ? 0.4 + 0.15 * Math.sin(t * 1.6) : 0;
            return (
              <g
                key={n.id}
                opacity={opacity}
                style={{ transition: "opacity 400ms" }}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover((h) => (h === n.id ? null : h))}
              >
                {n.tier === 0 && <circle cx={n.cx} cy={n.cy} r={8 + pulse * 2} fill="url(#coreGlow)" />}
                <circle cx={n.cx} cy={n.cy} r={r} fill={fill} style={{ transition: "r 400ms, fill 400ms" }} />
                {(n.tier !== 2 || isActive || !active) && (
                  <text
                    x={n.cx + (n.x > 70 ? 2.5 : n.x < 50 ? -2.5 : 0)}
                    y={n.cy - (n.r ? n.r + 1.2 : 2)}
                    textAnchor={n.x > 70 ? "start" : n.x < 50 ? "end" : "middle"}
                    fill={isActive || n.tier === 0 ? "#ffffff" : "#8a8a8a"}
                    fontSize={n.tier === 0 ? 3.0 : n.tier === 1 ? 2.5 : 2.1}
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    letterSpacing="0.08"
                    style={{ transition: "fill 400ms, opacity 400ms" }}
                    opacity={dimmed ? 0 : n.tier === 2 && !isActive ? 0.55 : 1}
                  >
                    {n.label}
                  </text>
                )}
                {/* Hit target */}
                <circle cx={n.cx} cy={n.cy} r={Math.max(r + 2, 3)} fill="transparent" style={{ cursor: "pointer" }} />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend / caption */}
      <div className="pointer-events-none absolute bottom-2 right-2 font-dot text-[10px] tracking-widest text-subtle">
        {hover ? `→ ${NODES.find((n) => n.id === hover)?.label.toUpperCase()}` : "TOPOLOGY · LIVE"}
      </div>
    </div>
  );
}

export default AITopology;
