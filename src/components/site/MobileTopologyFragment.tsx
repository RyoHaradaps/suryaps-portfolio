import { useMemo } from "react";

/**
 * MobileTopologyFragment — a quiet, cropped continuation of the desktop AI network.
 * Mobile-only. Pure SVG. No labels. Low opacity. Pointer-events disabled.
 */

type NodeDef = {
  id: string;
  x: number;
  y: number;
  r: number;
};

type Edge = [string, string];

const NODES: NodeDef[] = [
  { id: "ml", x: 45, y: 20, r: 2.2 },
  { id: "dl", x: 60, y: 15, r: 1.6 },
  { id: "py", x: 25, y: 40, r: 1.6 },
  { id: "ds", x: 50, y: 50, r: 1.6 },
  { id: "fs", x: 70, y: 60, r: 1.5 },
  { id: "cv", x: 85, y: 30, r: 1.4 },
  { id: "ai", x: 100, y: 20, r: 1.3 },
  { id: "deploy", x: 90, y: 75, r: 1.3 },
];

const EDGES: Edge[] = [
  ["ml", "dl"],
  ["ml", "py"],
  ["ml", "ds"],
  ["dl", "cv"],
  ["cv", "ai"],
  ["ds", "deploy"],
  ["py", "fs"],
  ["fs", "deploy"],
  ["dl", "ds"],
];

export function MobileTopologyFragment() {
  const posById = useMemo(() => {
    const map: Record<string, NodeDef> = {};
    for (const n of NODES) map[n.id] = n;
    return map;
  }, []);

  return (
    <svg
      viewBox="0 0 80 80"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      overflow="visible"
      aria-hidden="true"
    >
      <g className="topology-float">
        {/* Edges */}
        <g>
          {EDGES.map(([a, b], i) => {
            const p1 = posById[a];
            const p2 = posById[b];
            if (!p1 || !p2) return null;
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#ffffff"
                strokeWidth={0.14}
                opacity={0.6}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {NODES.map((n) => (
            <circle key={n.id} cx={n.x} cy={n.y} r={n.r} fill="#ffffff" opacity={0.8} />
          ))}
        </g>
      </g>
    </svg>
  );
}

export default MobileTopologyFragment;
