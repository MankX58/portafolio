// node src/graph.check.mjs — A* debe dar el mismo costo que Dijkstra y nunca visitar más nodos.
import assert from "node:assert";
import { nodes, search } from "./graph.js";

for (let a = 0; a < nodes.length; a++)
  for (let b = 0; b < nodes.length; b++) {
    const d = search(a, b);
    const s = search(a, b, true);
    assert.ok(d.path.length, `sin ruta ${a}->${b}`);
    assert.ok(Math.abs(d.cost - s.cost) < 1e-9, `costo distinto ${a}->${b}`);
    assert.ok(s.order.length <= d.order.length, `A* visitó más ${a}->${b}`);
  }
console.log("ok", nodes.length, "nodos");
