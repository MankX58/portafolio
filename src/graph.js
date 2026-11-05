// Mapa simplificado de Medellín para la demo del hero. Coordenadas en un viewBox de 400×300.
export const nodes = [
  ["UdeM", 58, 212],
  ["San Javier", 48, 140],
  ["Robledo", 92, 62],
  ["Castilla", 170, 38],
  ["Aranjuez", 250, 52],
  ["Manrique", 322, 64],
  ["Santa Elena", 382, 112],
  ["La América", 108, 145],
  ["Laureles", 160, 116],
  ["Estadio", 200, 150],
  ["Centro", 248, 118],
  ["Buenos Aires", 312, 140],
  ["Belén", 128, 198],
  ["Guayabal", 196, 222],
  ["El Poblado", 292, 206],
  ["Las Palmas", 362, 190],
  ["Itagüí", 176, 278],
  ["Envigado", 298, 272],
].map(([name, x, y]) => ({ name, x, y }));

const dist = (a, b) => Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y);

// Cada nodo se une con sus 3 vecinos más cercanos.
const pairs = new Set();
nodes.forEach((_, i) =>
  nodes
    .map((_, j) => j)
    .filter((j) => j !== i)
    .sort((a, b) => dist(i, a) - dist(i, b))
    .slice(0, 3)
    .forEach((j) => pairs.add(i < j ? `${i}-${j}` : `${j}-${i}`)),
);
export const edges = [...pairs].map((p) => p.split("-").map(Number));

const adj = nodes.map(() => []);
edges.forEach(([a, b]) => {
  adj[a].push(b);
  adj[b].push(a);
});

// Dijkstra (astar=false) o A* con heurística euclidiana. Devuelve el orden de visita y la ruta.
// ponytail: selección lineal O(n²), basta para 18 nodos; con miles usar un heap como en UdeMaps.
export function search(from, to, astar = false) {
  const g = nodes.map(() => Infinity);
  const prev = nodes.map(() => -1);
  const done = new Set();
  const order = [];
  const h = (i) => (astar ? dist(i, to) : 0);
  g[from] = 0;

  while (true) {
    let cur = -1;
    for (let i = 0; i < nodes.length; i++)
      if (!done.has(i) && g[i] < Infinity && (cur < 0 || g[i] + h(i) < g[cur] + h(cur))) cur = i;
    if (cur < 0) break;
    done.add(cur);
    order.push(cur);
    if (cur === to) break;
    for (const j of adj[cur]) {
      const w = g[cur] + dist(cur, j);
      if (w < g[j]) {
        g[j] = w;
        prev[j] = cur;
      }
    }
  }

  const path = [];
  for (let i = to; i !== -1; i = prev[i]) path.unshift(i);
  return { order, path: path[0] === from ? path : [], cost: g[to] };
}
