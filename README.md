# Portafolio · Manuel Gutiérrez

Portafolio personal hecho a mano con **React 19, Tailwind CSS 4, React Router 7 y Motion**.

- Demo interactiva en el hero: Dijkstra vs A* sobre un mapa simplificado de Medellín ([src/graph.js](src/graph.js)).
- Bilingüe ES/EN, tema claro/oscuro, paleta de comandos (`Ctrl K`), respeta `prefers-reduced-motion`.
- Casos de estudio por proyecto en `/proyectos/:slug`. Todo el contenido vive en [src/content.js](src/content.js).

```bash
npm install
npm run dev               # http://localhost:5173
npm run build             # dist/
node src/graph.check.mjs  # verifica que A* y Dijkstra den el mismo costo
```

Despliegue: Vercel detecta Vite; `vercel.json` redirige las rutas al `index.html`.
