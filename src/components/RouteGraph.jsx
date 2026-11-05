import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { edges, nodes, search } from "../graph";
import { usePrefs } from "../prefs";

const FROM = 0; // UdeM
const KM_PER_UNIT = 0.045;

// mini: versión decorativa sin controles (tarjeta de UdeMaps).
export default function RouteGraph({ mini = false }) {
  const { t } = usePrefs();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [to, setTo] = useState(14); // El Poblado
  const [astar, setAstar] = useState(false);
  const [step, setStep] = useState(0);

  const { order, path, cost } = search(FROM, to, astar);
  const finished = step >= order.length;
  const visited = new Set(order.slice(0, step));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStep(order.length);
      return;
    }
    setStep(0);
    const id = setInterval(() => setStep((s) => (s >= order.length ? (clearInterval(id), s) : s + 1)), mini ? 140 : 110);
    return () => clearInterval(id);
  }, [to, astar, inView]); // eslint-disable-line react-hooks/exhaustive-deps

  const d = path.map((i, k) => `${k ? "L" : "M"}${nodes[i].x} ${nodes[i].y}`).join(" ");

  const svg = (
    <svg viewBox="0 0 420 300" className="w-full h-auto select-none" role="img"
      aria-label={t({ es: "Grafo de Medellín con la ruta más corta resaltada", en: "Graph of Medellín with the shortest route highlighted" })}>
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="var(--line)" strokeWidth={mini ? 1.5 : 1.2} />
      ))}
      {finished && (
        <motion.path key={`${to}-${astar}`} d={d} fill="none" stroke="var(--accent)" strokeWidth={mini ? 4 : 3.5}
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: "easeInOut" }} />
      )}
      {nodes.map((n, i) => {
        const isEnd = i === FROM || i === to;
        const onPath = finished && path.includes(i);
        const fill = isEnd || onPath ? "var(--accent)" : visited.has(i) ? "var(--visit)" : "var(--surface)";
        const label = n.name;
        return (
          <g key={n.name} onClick={mini || i === FROM ? undefined : () => setTo(i)}
            className={mini || i === FROM ? "" : "cursor-pointer group"}
            tabIndex={mini || i === FROM ? undefined : 0}
            role={mini || i === FROM ? undefined : "button"}
            aria-label={mini || i === FROM ? undefined : `${t({ es: "Ruta a", en: "Route to" })} ${label}`}
            onKeyDown={(e) => !mini && i !== FROM && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setTo(i))}>
            <circle cx={n.x} cy={n.y} r={14} fill="transparent" />
            <motion.circle cx={n.x} cy={n.y} r={isEnd ? 7 : 5} fill={fill} stroke={isEnd ? "var(--accent)" : "var(--ink-faint)"}
              strokeWidth={1.2} animate={{ scale: visited.has(i) && !finished && order[step - 1] === i ? 1.6 : 1 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }} className="transition-colors duration-200 group-hover:stroke-[var(--accent)]" />
            {!mini && (
              <text x={n.x > 330 ? n.x - 10 : n.x + 10} y={n.y + 4} textAnchor={n.x > 330 ? "end" : "start"} fontSize={isEnd ? 11 : 9.5} fontFamily="var(--font-mono)"
                fill={isEnd ? "var(--ink)" : "var(--ink-faint)"} fontWeight={isEnd ? 600 : 400}
                className="pointer-events-none group-hover:fill-[var(--ink)]">
                {label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );

  if (mini) return <div ref={ref}>{svg}</div>;

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-[0_1px_0_var(--line),0_24px_60px_-30px_rgb(0_0_0/0.35)]">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="label flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          {t({ es: "Demo en vivo · toca un barrio", en: "Live demo · tap a neighborhood" })}
        </span>
        <div className="flex rounded-full border border-line p-0.5 text-xs font-mono" role="group" aria-label={t({ es: "Algoritmo", en: "Algorithm" })}>
          {[["Dijkstra", false], ["A*", true]].map(([name, v]) => (
            <button key={name} onClick={() => setAstar(v)} aria-pressed={astar === v}
              className={`px-3 py-1 rounded-full transition-colors ${astar === v ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}>
              {name}
            </button>
          ))}
        </div>
      </div>
      {svg}
      <div className="grid grid-cols-3 gap-2 border-t border-line pt-3 font-mono text-xs">
        <Stat k={t({ es: "visitados", en: "visited" })} v={`${Math.min(step, order.length)}/${nodes.length}`} />
        <Stat k={t({ es: "distancia", en: "distance" })} v={finished ? `${(cost * KM_PER_UNIT).toFixed(1)} km` : "…"} />
        <Stat k={t({ es: "paradas", en: "stops" })} v={finished ? path.length : "…"} />
      </div>
      <p className="mt-3 text-xs text-ink-faint leading-relaxed">
        {t({
          es: "El mismo algoritmo que escribí a mano para UdeMaps. Cambia a A* y mira cómo visita menos barrios para llegar a la misma ruta.",
          en: "The same algorithm I hand-wrote for UdeMaps. Switch to A* and watch it visit fewer neighborhoods to reach the same route.",
        })}
      </p>
    </div>
  );
}

function Stat({ k, v }) {
  return (
    <div>
      <div className="text-ink-faint">{k}</div>
      <div className="text-ink text-sm tabular-nums">{v}</div>
    </div>
  );
}
