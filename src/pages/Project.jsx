import { useEffect } from "react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { me, projects } from "../content";
import { usePrefs } from "../prefs";
import RouteGraph from "../components/RouteGraph";
import { Arrow, Button, Chip, Reveal, Shot } from "../components/ui";
import NotFound from "./NotFound";

export default function Project() {
  const { slug } = useParams();
  const { t } = usePrefs();
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];

  useEffect(() => {
    if (p) document.title = `${p.name} | ${me.short}`;
    return () => void (document.title = `${me.short} | Front-end Developer`);
  }, [p]);

  if (!p) return <NotFound />;
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-24">
      <Link to="/#proyectos" className="group inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
        <Arrow className="rotate-180" /> {t({ es: "Todos los proyectos", en: "All projects" })}
      </Link>

      <header className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-accent">{t(p.kind)}, {p.year}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-wide text-[clamp(2.8rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
            {p.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-soft text-pretty">{t(p.tagline)}</motion.p>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3 lg:justify-end">
          <Button href={p.live} target="_blank" rel="noreferrer">{t({ es: "Ver en vivo", en: "Live site" })} <Arrow up /></Button>
          <Button href={p.repo} target="_blank" rel="noreferrer" variant="ghost">{t({ es: "Código en GitHub", en: "Code on GitHub" })} <Arrow up /></Button>
        </motion.div>
      </header>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mt-12">
        {p.image ? <Shot src={p.image} alt={`${p.name}: ${t({ es: "pantalla principal", en: "main screen" })}`} /> : (
          <div className="mx-auto max-w-2xl"><RouteGraph /></div>
        )}
      </motion.div>

      {p.metrics && (
        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-4">
          {p.metrics.map((m, k) => (
            <Reveal key={k} delay={k * 0.06}>
              <dt className="font-wide text-4xl font-extrabold tracking-[-0.03em]">{m.value}</dt>
              <dd className="mt-1 text-sm text-ink-soft">{t(m.label)}</dd>
            </Reveal>
          ))}
        </dl>
      )}

      <div className="mt-16 grid gap-14 lg:grid-cols-[14rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-sm font-bold">{t({ es: "Tecnologías", en: "Tech stack" })}</p>
          <div className="flex flex-wrap gap-1.5">{p.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
        </aside>

        <div className="max-w-3xl space-y-16">
          {p.problem && (
            <Block title={t({ es: "El problema", en: "The problem" })}>
              <p className="text-lg leading-relaxed text-ink-soft">{t(p.problem)}</p>
            </Block>
          )}

          {p.built && (
            <Block title={t({ es: "Lo que construí", en: "What I built" })}>
              <ul className="space-y-3">
                {t(p.built).map((b) => (
                  <li key={b} className="flex gap-4 text-lg leading-relaxed text-ink-soft">
                    <span className="mt-[0.7em] h-[3px] w-4 shrink-0 rounded-full bg-accent" aria-hidden />{b}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {p.decisions && (
            <Block title={t({ es: "Decisiones técnicas", en: "Technical decisions" })}>
              <ol className="relative ml-2">
                <span className="absolute left-0 top-2 bottom-2 w-1 -translate-x-1/2 rounded-full bg-accent" aria-hidden />
                {t(p.decisions).map(([title, why], k) => (
                  <Reveal as="li" key={title} delay={k * 0.05} className="relative pb-8 pl-8 last:pb-0">
                    <span className="absolute left-0 top-1.5 size-4 -translate-x-1/2 rounded-full border-[3px] border-accent bg-paper" aria-hidden />
                    <p className="text-lg font-bold">{title}</p>
                    <p className="mt-1.5 leading-relaxed text-ink-soft">{why}</p>
                  </Reveal>
                ))}
              </ol>
            </Block>
          )}

          {p.gallery && (
            <Block title={t({ es: "Más pantallas", en: "More screens" })}>
              <div className="grid gap-4">
                {p.gallery.map((src) => <Shot key={src} src={src} alt={p.name} />)}
              </div>
            </Block>
          )}
        </div>
      </div>

      <Link to={`/proyectos/${next.slug}`} className="group mt-24 flex items-end justify-between gap-6 border-t border-line pt-8">
        <div>
          <p className="text-sm font-semibold text-ink-faint">{t({ es: "Siguiente proyecto", en: "Next project" })}</p>
          <p className="mt-2 font-wide text-4xl font-extrabold tracking-[-0.04em] transition-colors group-hover:text-accent sm:text-6xl">{next.name}</p>
        </div>
        <Arrow className="mb-2 size-8 shrink-0" />
      </Link>
    </article>
  );
}

function Block({ title, children }) {
  return (
    <Reveal as="section">
      <h2 className="mb-6 font-wide text-3xl font-extrabold tracking-[-0.03em]">{title}</h2>
      {children}
    </Reveal>
  );
}
