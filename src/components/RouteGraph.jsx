import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { edges, nodes, search } from "../graph";
import { usePrefs } from "../prefs";

const FROM = 0; // UdeM
const KM_PER_UNIT = 0.045;

// Mapa estilo metro con Dijkstra / A* en vivo. mini: versión decorativa sin controles.
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
  const onPath = new Set(finished ? path : []);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStep(order.length);
      return;
    }
    setStep(0);
    const id = setInterval(() => setStep((s) => (s >= order.length ? (clearInterval(id), s) : s + 1)), mini ? 150 : 115);
    return () => clearInterval(id);
  }, [to, astar, inView]); // eslint-disable-line react-hooks/exhaustive-deps

  const d = path.map((i, k) => `${k ? "L" : "M"}${nodes[i].x} ${nodes[i].y}`).join(" ");
  const pick = (i) => !mini && i !== FROM && setTo(i);

  const svg = (
    <svg viewBox="0 0 420 300" className="h-auto w-full select-none" role="img"
      aria-label={t({ es: "Mapa de Medellín con la ruta más corta resaltada", en: "Map of Medellín with the shortest route highlighted" })}>
      {edges.map(([a, b]) => {
        const seen = visited.has(a) && visited.has(b);
        return (
          <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke={seen ? "var(--visit)" : "var(--line)"} strokeWidth={mini ? 4 : 3.5} strokeLinecap="round"
            className="transition-[stroke] duration-300" />
        );
      })}
      {finished && (
        <motion.path key={`${to}-${astar}`} d={d} fill="none" stroke="var(--accent)" strokeWidth={mini ? 7 : 6.5}
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }} />
      )}
      {nodes.map((n, i) => {
        const end = i === FROM || i === to;
        const lit = end || onPath.has(i);
        const clickable = !mini && i !== FROM;
        const left = n.x > 330;
        return (
          <g key={n.name} onClick={() => pick(i)} className={clickable ? "group cursor-pointer" : ""}
            tabIndex={clickable ? 0 : undefined} role={clickable ? "button" : undefined}
            aria-label={clickable ? `${t({ es: "Ruta a", en: "Route to" })} ${n.name}` : undefined}
            onKeyDown={(e) => clickable && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick(i))}>
            <circle cx={n.x} cy={n.y} r={18} fill="transparent" />
            <circle cx={n.x} cy={n.y} r={end ? 8 : 5.5} fill={end ? "var(--accent)" : "var(--surface)"}
              stroke={lit ? "var(--accent)" : visited.has(i) ? "var(--accent)" : "var(--ink-faint)"}
              strokeWidth={end ? 0 : 2.4} className="transition-[stroke] duration-200 group-hover:stroke-[var(--accent)]" />
            {end && <circle cx={n.x} cy={n.y} r={3} fill="var(--surface)" />}
            {!mini && (
              <text x={left ? n.x - 11 : n.x + 11} y={n.y + 4} textAnchor={left ? "end" : "start"}
                fontSize={end ? 11.5 : 10} fontWeight={end ? 700 : 500} style={{ fontStretch: "85%" }}
                fill={end || onPath.has(i) ? "var(--ink)" : "var(--ink-faint)"}
                className="pointer-events-none transition-[fill] group-hover:fill-[var(--ink)]">
                {n.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );

  if (mini) return <div ref={ref}>{svg}</div>;

  return (
    <figure ref={ref} className="rounded-[20px] border border-line bg-surface p-4 sm:p-6">
      <figcaption className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-semibold">{t({ es: "Toca un barrio para trazar la ruta", en: "Tap a neighborhood to draw the route" })}</span>
        <span className="flex rounded-full border border-line p-0.5 font-mono text-xs" role="group" aria-label={t({ es: "Algoritmo", en: "Algorithm" })}>
          {[["Dijkstra", false], ["A*", true]].map(([name, v]) => (
            <button key={name} onClick={() => setAstar(v)} aria-pressed={astar === v}
              className={`rounded-full px-4 py-2.5 transition-colors sm:px-3 sm:py-1 ${astar === v ? "bg-ink text-paper" : "text-ink-soft hover:text-ink"}`}>
              {name}
            </button>
          ))}
        </span>
      </figcaption>
      {svg}
      <dl className="mt-2 grid grid-cols-3 gap-2 border-t border-line pt-3">
        <Stat k={t({ es: "Barrios visitados", en: "Visited" })} v={`${Math.min(step, order.length)} / ${nodes.length}`} />
        <Stat k={t({ es: "Distancia", en: "Distance" })} v={finished ? `${(cost * KM_PER_UNIT).toFixed(1)} km` : "..."} />
        <Stat k={t({ es: "Paradas", en: "Stops" })} v={finished ? path.length : "..."} />
      </dl>
      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-faint">
        {t({
          es: "Es el algoritmo que escribí a mano para UdeMaps. Cambia a A* y mira cómo llega a la misma ruta visitando menos barrios.",
          en: "It's the algorithm I hand-wrote for UdeMaps. Switch to A* and watch it reach the same route visiting fewer neighborhoods.",
        })}
      </p>
    </figure>
  );
}

function Stat({ k, v }) {
  return (
    <div>
      <dt className="text-xs text-ink-faint">{k}</dt>
      <dd className="font-mono text-sm tabular-nums">{v}</dd>
    </div>
  );
}
