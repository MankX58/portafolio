import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Link } from "react-router";
import { Graph } from "@phosphor-icons/react";
import { certs, facts, me, principles, projects, skills, timeline } from "../content";
import { usePrefs } from "../prefs";
import RouteGraph from "../components/RouteGraph";
import { Arrow, Button, Chip, CopyEmail, CountUp, Reveal, SectionHead, Shot } from "../components/ui";

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
const wrap = "mx-auto max-w-6xl px-4 sm:px-6";
const ease = [0.16, 1, 0.3, 1];

export default function Home() {
  return (
    <>
      <Hero />
      <Facts />
      <Work />
      <Skills />
      <About />
      <Journey />
      <Contact />
    </>
  );
}

function Hero() {
  const { t, lang } = usePrefs();
  const lines = t(me.headline);
  return (
    <section className={`${wrap} grid grid-cols-1 gap-12 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12 lg:pt-20`}>
      <div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4">
          <img src="/manuel.jpg" alt={me.name} width="64" height="64"
            className="size-16 rounded-2xl object-cover object-[50%_28%] ring-1 ring-line" />
          <div className="text-sm leading-snug">
            <p className="font-semibold">{me.name}</p>
            <p className="text-ink-soft">{t(me.role)}, {t(me.location)}</p>
            <p className="mt-1 inline-flex items-center gap-2 text-ink-soft">
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {t(me.status)}
            </p>
          </div>
        </motion.div>

        <h1 key={lang} className="mt-10 font-wide text-[clamp(2.4rem,4.4vw,3.9rem)] font-extrabold leading-[1] tracking-[-0.04em]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em] lg:whitespace-nowrap">
              <motion.span className={`block ${i === lines.length - 1 ? "text-accent" : ""}`}
                initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease }}>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft text-pretty">{t(me.intro)}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/#proyectos">{t({ es: "Ver proyectos", en: "See my work" })} <Arrow /></Button>
            <Button href={me.cv[lang]} variant="ghost" download>{t({ es: "Descargar CV", en: "Download CV" })}</Button>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease }}>
        <RouteGraph />
      </motion.div>
    </section>
  );
}

function Facts() {
  const { t } = usePrefs();
  return (
    <section className="border-y border-line bg-surface">
      <dl className={`${wrap} grid grid-cols-2 md:grid-cols-4`}>
        {facts.map((f, i) => (
          <Reveal key={i} delay={i * 0.06}
            className={`py-8 pr-4 md:px-6 md:first:pl-0 ${i % 2 ? "pl-4 md:pl-6" : ""} ${i > 0 ? "md:border-l md:border-line" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""}`}>
            <dt className="font-wide text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
              <CountUp value={f.value} />
            </dt>
            <dd className="mt-2 text-sm text-ink-soft">{t(f.label)}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

function ExtLinks({ p, className = "" }) {
  const { t } = usePrefs();
  return (
    <div className={`relative z-10 flex flex-wrap items-center gap-x-5 text-sm ${className}`}>
      <a href={p.live} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 py-2.5 font-semibold hover:text-accent">
        {t({ es: "Ver en vivo", en: "Live site" })} <Arrow up />
      </a>
      <a href={p.repo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 py-2.5 text-ink-soft hover:text-ink">
        {t({ es: "Código", en: "Code" })} <Arrow up />
      </a>
    </div>
  );
}

function CaseLink({ p, children, className = "" }) {
  return (
    <Link to={`/proyectos/${p.slug}`} className={`after:absolute after:inset-0 after:rounded-[inherit] ${className}`}>{children}</Link>
  );
}

function BigCard({ p, label, flip = false }) {
  const { t } = usePrefs();
  return (
    <Reveal>
      <article className={`group relative grid gap-5 rounded-[20px] border border-line bg-surface p-4 sm:gap-8 transition-[border-color] duration-300 hover:border-ink-faint sm:p-8 lg:items-center ${flip ? "lg:grid-cols-[1.2fr_1fr]" : "lg:grid-cols-[1fr_1.2fr]"}`}>
        <div className={flip ? "lg:order-2" : ""}>
          <p className="text-sm font-semibold text-accent">{label}</p>
          <h3 className="mt-1 font-wide text-3xl font-extrabold tracking-[-0.035em] sm:mt-2 sm:text-5xl">
            <CaseLink p={p}>{p.name}</CaseLink>
          </h3>
          <p className="mt-1 text-sm text-ink-faint">{t(p.kind)}</p>
          <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-soft text-pretty sm:mt-5 sm:text-lg">{t(p.tagline)}</p>
          <dl className="mt-4 grid sm:mt-6 grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            {p.metrics.map((m, k) => (
              <div key={m.value + m.label.es} className={k > 1 ? "hidden sm:block" : ""}>
                <dt className="font-wide text-2xl font-bold tracking-tight">{m.value}</dt>
                <dd className="mt-0.5 text-xs leading-snug text-ink-faint">{t(m.label)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-6">{p.stack.slice(0, 6).map((s, k) => <Chip key={s} className={k > 3 ? "hidden sm:inline-flex" : ""}>{s}</Chip>)}</div>
          <div className="mt-4 flex sm:mt-7 flex-wrap items-center gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              {t({ es: "Leer caso de estudio", en: "Read case study" })} <Arrow />
            </span>
            <ExtLinks p={p} />
          </div>
        </div>
        <div className="overflow-hidden rounded-xl">
          <Shot src={p.image} alt={p.name} className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]" />
        </div>
      </article>
    </Reveal>
  );
}

function Work() {
  const { t } = usePrefs();
  const featured = projects.filter((p) => p.featured);
  const [lead, second] = featured;
  const udemaps = bySlug.udemaps;
  const side = featured.filter((p) => ![lead, second, udemaps].includes(p));
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="proyectos" className={`${wrap} py-16 sm:py-32`}>
      <SectionHead title={t({ es: "Proyectos que alguien usa", en: "Projects someone uses" })}
        kicker={t({
          es: "Todos tienen demo pública, código abierto y un caso de estudio con el problema, lo que construí y por qué.",
          en: "All of them have a public demo, open code and a case study with the problem, what I built and why.",
        })} />

      <div className="grid gap-4 sm:gap-6">
        <BigCard p={lead} label={t({ es: "En producción para un negocio real", en: "In production for a real business" })} />
        <BigCard p={second} label={t({ es: "Mi producto: lo uso todos los días", en: "My own product: I use it daily" })} flip />
      </div>

      {/* Bento: UdeMaps alto con su mapa, los otros dos apilados. */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="h-full">
          <article className="group relative flex h-full flex-col rounded-[20px] border border-line bg-surface p-5 transition-[border-color] duration-300 hover:border-ink-faint sm:p-8">
            <div className="hidden rounded-xl bg-paper p-3 ring-1 ring-line sm:block"><RouteGraph mini /></div>
            <p className="sm:mt-6 text-sm text-ink-faint">{t(udemaps.kind)}</p>
            <h3 className="mt-1 font-wide text-3xl font-extrabold tracking-[-0.03em]"><CaseLink p={udemaps}>{udemaps.name}</CaseLink></h3>
            <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{t(udemaps.tagline)}</p>
            <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">{udemaps.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
            <ExtLinks p={udemaps} className="mt-6" />
          </article>
        </Reveal>
        <div className="grid gap-4 sm:gap-6 lg:grid-rows-2">
          {side.map((p, i) => (
            <Reveal key={p.slug} delay={0.08 * (i + 1)} className="h-full">
              <article className="group relative grid h-full grid-cols-[6.5rem_1fr] items-start gap-4 rounded-[20px] border border-line bg-surface p-4 transition-[border-color] duration-300 hover:border-ink-faint sm:grid-cols-[0.9fr_1fr] sm:items-center sm:gap-5 sm:p-6">
                <div className="overflow-hidden rounded-xl">
                  <Shot src={p.thumb ?? p.image} alt={p.name} className="transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div>
                  <p className="text-sm text-ink-faint">{t(p.kind)}</p>
                  <h3 className="mt-1 font-wide text-2xl font-extrabold tracking-[-0.03em]"><CaseLink p={p}>{p.name}</CaseLink></h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:mt-2">{t(p.tagline)}</p>
                  <ExtLinks p={p} className="sm:mt-4" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-12 sm:mt-16">
        <h3 className="mb-2 font-wide text-xl font-bold">{t({ es: "Más casos de estudio", en: "More case studies" })}</h3>
        <ul>
          {rest.map((p) => (
            <li key={p.slug} className="group relative grid gap-1 border-b border-line py-4 sm:grid-cols-[14rem_1fr_auto] sm:items-center sm:gap-8">
              <CaseLink p={p} className="font-wide text-xl font-extrabold sm:text-2xl tracking-[-0.03em] transition-colors group-hover:text-accent">{p.name}</CaseLink>
              <div>
                <p className="text-ink-soft">{t(p.tagline)}</p>
                <p className="mt-1 hidden font-mono text-xs text-ink-faint sm:block">{p.stack.join(", ")}</p>
              </div>
              <ExtLinks p={p} />
              {p.image && (
                <img src={p.image} alt="" aria-hidden loading="lazy"
                  className="pointer-events-none absolute right-52 top-1/2 hidden w-60 -translate-y-1/2 rotate-3 rounded-lg opacity-0 shadow-[0_20px_40px_-20px_rgb(20_20_30/0.45)] ring-1 ring-line transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100 xl:block" />
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

// Explorador: eliges una tecnología y se iluminan los proyectos donde se puede comprobar.
// En móvil los resultados se abren justo debajo del grupo tocado; en PC van en la columna derecha.
function Skills() {
  const { t } = usePrefs();
  const all = skills.flatMap((g) => g.items);
  const [active, setActive] = useState(all[0][0]);
  const refs = all.find(([name]) => name === active)[1];

  return (
    <section id="habilidades" className="border-y border-line bg-surface">
      <div className={`${wrap} py-16 sm:py-32`}>
        <SectionHead title={t({ es: "Habilidades, con pruebas", en: "Skills, with receipts" })}
          kicker={t({
            es: `${all.length} tecnologías. Elige una y mira en qué proyectos la usé.`,
            en: `${all.length} technologies. Pick one and see which projects use it.`,
          })} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <Reveal className="space-y-6 sm:space-y-8">
            {skills.map((g) => (
              <div key={g.group.es}>
                <h3 className="mb-2.5 text-sm font-bold sm:mb-3">{t(g.group)}</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2" role="group" aria-label={t(g.group)}>
                  {g.items.map(([name, used]) => {
                    const on = name === active;
                    return (
                      <button key={name} onClick={() => setActive(name)} aria-pressed={on}
                        className={`group inline-flex items-center gap-1.5 rounded-full py-2 pl-3.5 pr-1.5 text-[13px] font-semibold sm:gap-2 sm:pl-4 sm:pr-2 sm:text-sm transition-[background-color,color,box-shadow] duration-200 active:scale-[0.98] ${on ? "bg-accent text-accent-ink" : "bg-paper text-ink ring-1 ring-line hover:ring-ink-faint"}`}>
                        {name}
                        <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1 font-mono text-[11px] sm:h-6 sm:min-w-6 sm:px-1.5 sm:text-xs ${on ? "bg-accent-ink/15" : "bg-surface text-ink-faint ring-1 ring-line"}`}>
                          {used.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {g.items.some(([name]) => name === active) && (
                  <motion.div key={active} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                    className="mt-3 rounded-2xl bg-paper p-3 ring-1 ring-accent/50 lg:hidden">
                    <SkillMatches active={active} refs={refs} compact />
                  </motion.div>
                )}
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <SkillMatches active={active} refs={refs} />
          </Reveal>
        </div>
        <div className="mt-10 space-y-2 border-t border-line pt-6 text-sm text-ink-soft">
          <p><span className="font-semibold text-ink">{t({ es: "Idiomas", en: "Languages" })}:</span> {t({ es: "español nativo, inglés B2", en: "Spanish (native), English B2" })}</p>
          <p><span className="font-semibold text-ink">{t({ es: "Aprendiendo ahora", en: "Learning now" })}:</span> {t({ es: "testing con Jest y React Testing Library, AWS", en: "testing with Jest and React Testing Library, AWS" })}</p>
        </div>
      </div>
    </section>
  );
}

// compact: panel móvil, solo los proyectos que usan la tecnología. Sin compact: todos, atenuando los que no.
function SkillMatches({ active, refs, compact = false }) {
  const { t } = usePrefs();
  const list = compact ? projects.filter((p) => refs.includes(p.slug)) : projects;
  return (
    <>
      <p className={compact ? "mb-2 px-1 text-sm text-ink-soft" : "mb-4 text-ink-soft"} aria-live="polite">
        <span className={`font-extrabold text-ink ${compact ? "" : "font-wide text-2xl"}`}>{active}</span>
        <span className="ml-2">
          {t({ es: `en ${refs.length} de ${projects.length} proyectos`, en: `in ${refs.length} of ${projects.length} projects` })}
        </span>
      </p>
      <ul className={`grid grid-cols-1 ${compact ? "gap-1" : "gap-2"}`}>
        {list.map((p) => {
          const on = refs.includes(p.slug);
          return (
            <motion.li key={p.slug} layout={!compact} animate={{ opacity: on ? 1 : 0.38 }} transition={{ duration: 0.25 }}>
              <Link to={`/proyectos/${p.slug}`} tabIndex={on ? 0 : -1}
                className={`group flex items-center rounded-xl transition-[background-color,box-shadow] duration-200 ${compact ? "gap-3 p-1.5 pr-2 hover:bg-surface" : `gap-4 p-2 pr-4 ${on ? "bg-paper ring-1 ring-accent/60 hover:ring-accent" : "grayscale"}`}`}>
                {p.thumb ?? p.image ? (
                  <img src={p.thumb ?? p.image} alt="" loading="lazy" className={`shrink-0 rounded-lg object-cover object-top ring-1 ring-line ${compact ? "h-10 w-16" : "h-12 w-20"}`} />
                ) : (
                  <span className={`grid shrink-0 place-items-center rounded-lg bg-accent/10 ring-1 ring-line ${compact ? "h-10 w-16" : "h-12 w-20"}`}><Graph className="size-6 text-accent" aria-hidden /></span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{p.name}</span>
                  <span className="block truncate text-sm text-ink-faint">{t(p.kind)}</span>
                </span>
                {on && <Arrow className="shrink-0 text-accent" />}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}

function About() {
  const { t } = usePrefs();
  return (
    <section id="sobre-mi" className={`${wrap} grid grid-cols-1 gap-12 py-24 sm:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20`}>
      <Reveal className="lg:sticky lg:top-24 lg:self-start">
        <img src="/manuel.jpg" alt={me.name} loading="lazy"
          className="aspect-[4/5] w-full max-w-md rounded-[20px] object-cover object-[50%_25%] ring-1 ring-line" />
        <p className="mt-4 text-sm text-ink-faint">{t(me.offscreen)}</p>
      </Reveal>
      <div>
        <SectionHead title={t({ es: "Aprendo construyendo y enseñando", en: "I learn by building and teaching" })} className="mb-8 sm:mb-8" />
        <Reveal className="space-y-5 text-lg leading-relaxed text-ink-soft">
          {t(me.about).map((para) => <p key={para} className="max-w-[60ch] text-pretty">{para}</p>)}
        </Reveal>
        <div className="mt-12 grid gap-8">
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 0.06} className="grid gap-2 border-l-[3px] border-accent pl-5">
              <h3 className="font-wide text-xl font-bold tracking-tight">{t(p.title)}</h3>
              <p className="max-w-[58ch] leading-relaxed text-ink-soft">{t(p.body)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trayectoria como línea de metro: se dibuja a medida que bajas.
function Journey() {
  const { t } = usePrefs();
  const [showCerts, setShowCerts] = useState(false);
  const line = useRef(null);
  const { scrollYProgress } = useScroll({ target: line, offset: ["start 75%", "end 60%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="trayectoria" className="border-t border-line bg-surface">
      <div className={`${wrap} py-24 sm:py-32`}>
        <SectionHead title={t({ es: "Trayectoria", en: "Journey" })} kicker={t({ es: "De la estación más reciente a la primera.", en: "From the latest station back to the first." })} />

        <ol ref={line} className="relative ml-1.5 sm:ml-[9.5rem]">
          <span className="absolute left-0 top-2 bottom-2 w-[6px] -translate-x-1/2 rounded-full bg-line" aria-hidden />
          <motion.span className="absolute left-0 top-2 bottom-2 w-[6px] -translate-x-1/2 origin-top rounded-full bg-accent" style={{ scaleY: grow }} aria-hidden />
          {timeline.map((e, i) => (
            <Reveal as="li" key={i} delay={0.04 * i} className="relative pb-12 pl-9 last:pb-0">
              <span className={`absolute left-0 top-1.5 -translate-x-1/2 rounded-full border-[3.5px] border-accent ${e.highlight ? "size-6 bg-accent ring-4 ring-surface" : "size-5 bg-surface"}`} aria-hidden />
              <p className="font-mono text-xs text-ink-faint sm:absolute sm:-left-[9.5rem] sm:top-2 sm:w-28 sm:text-right">{t(e.when)}</p>
              <h3 className="mt-1 font-wide text-xl font-bold tracking-tight sm:mt-0">{t(e.title)}</h3>
              <p className="text-sm font-semibold text-ink-soft">{t(e.org)}</p>
              <p className="mt-2 max-w-[62ch] leading-relaxed text-ink-soft">{t(e.body)}</p>
              {e.link?.startsWith("http") ? (
                <a href={e.link} target="_blank" rel="noreferrer" className="group mt-1 inline-flex items-center gap-1.5 py-2.5 text-sm font-semibold text-accent">
                  {t({ es: "Verificar certificado", en: "Verify certificate" })} <Arrow up />
                </a>
              ) : e.link && (
                <Link to={e.link} className="group mt-1 inline-flex items-center gap-1.5 py-2.5 text-sm font-semibold text-accent">
                  {t({ es: "Ver el caso", en: "See the case" })} <Arrow />
                </Link>
              )}
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-wide text-2xl font-bold tracking-tight">{t({ es: "Certificaciones", en: "Certifications" })}</h3>
              <p className="mt-1 text-sm text-ink-soft">{t({ es: "Las que tienen enlace se pueden verificar con un clic.", en: "Linked ones can be verified in one click." })}</p>
            </div>
            <button onClick={() => setShowCerts((s) => !s)} aria-expanded={showCerts}
              className="rounded-full px-4 py-2.5 text-sm font-semibold ring-1 ring-line transition-colors hover:ring-ink active:scale-[0.98]">
              {showCerts ? t({ es: "Ver menos", en: "Show less" }) : t({ es: `Ver las ${certs.length}`, en: `Show all ${certs.length}` })}
            </button>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {(showCerts ? certs : certs.slice(0, 4)).map((c) => (
              <motion.li layout key={c.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between gap-4 rounded-xl bg-paper p-4 ring-1 ring-line">
                <div>
                  <p className="font-semibold leading-snug">{c.name}</p>
                  <p className="mt-0.5 text-sm text-ink-faint">{c.by}{c.year && `, ${c.year}`}</p>
                </div>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noreferrer" className="group -my-2 inline-flex shrink-0 items-center gap-1 py-2.5 text-sm font-semibold text-accent">
                    {t({ es: "Verificar", en: "Verify" })} <Arrow up />
                  </a>
                )}
              </motion.li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const { t, lang } = usePrefs();
  return (
    <section id="contacto" className={`${wrap} py-24 sm:py-36`}>
      <Reveal>
        <div className="flex items-center gap-0" aria-hidden>
          <motion.span className="h-1.5 w-24 origin-left rounded-full bg-accent sm:w-40" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} />
          <span className="size-6 rounded-full border-[3.5px] border-accent bg-paper" />
        </div>
        <h2 className="mt-8 max-w-4xl font-wide text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-balance">
          {t({ es: "¿Tienes un equipo donde pueda aportar?", en: "Got a team where I can contribute?" })}
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
          {t({
            es: "Busco una práctica o un primer rol junior en front-end. Hablo español e inglés, y me encantaría empezar con una prueba técnica.",
            en: "I'm looking for an internship or a first junior front-end role. I speak Spanish and English, and I'd love to start with a technical test.",
          })}
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
        <Button href={`mailto:${me.email}`} variant="accent">{t({ es: "Escribirme", en: "Email me" })} <Arrow /></Button>
        <Button href={me.cv[lang]} variant="ghost" download>{t({ es: "Descargar CV", en: "Download CV" })}</Button>
        <Button href={me.linkedin} variant="ghost" target="_blank" rel="noreferrer">LinkedIn <Arrow up /></Button>
        <Button href={me.github} variant="ghost" target="_blank" rel="noreferrer">GitHub <Arrow up /></Button>
      </Reveal>
      <CopyEmail className="mt-6 py-2.5 text-ink-soft hover:text-ink" />
    </section>
  );
}
