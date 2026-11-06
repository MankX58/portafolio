import { usePrefs } from "../prefs";
import { Arrow, Button } from "../components/ui";

export default function NotFound() {
  const { t } = usePrefs();
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-32 sm:px-6">
      <p className="font-mono text-sm text-ink-faint">404</p>
      <h1 className="mt-4 font-wide text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-balance">
        {t({ es: "Dijkstra no encontró una ruta hasta aquí.", en: "Dijkstra couldn't find a route to here." })}
      </h1>
      <p className="mt-6 text-lg text-ink-soft">{t({ es: "Esta página no existe, pero el inicio sí.", en: "This page doesn't exist, but the home page does." })}</p>
      <Button to="/" className="mt-8">{t({ es: "Volver al inicio", en: "Back home" })} <Arrow /></Button>
    </section>
  );
}
