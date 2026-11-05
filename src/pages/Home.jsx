import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { certs, facts, me, principles, projects, skills, timeline } from "../content";
import { usePrefs } from "../prefs";
import RouteGraph from "../components/RouteGraph";
import { Arrow, Button, Chip, CopyEmail, CountUp, Reveal, SectionHead, Shot } from "../components/ui";

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

export default function Home() {
  return (
    <>
      <Hero />
      <Facts />
      <Work />
      <Skills />
      <Principles />
      <Journey />
      <Contact />
    </>
  );
}

const wrap = "mx-auto max-w-6xl px-4 sm:px-6";

function Hero() {
  const { t, lang } = usePrefs();
  const lines = t(me.headline);
  return (
    <section className={`${wrap} grid gap-12 pt-12 pb-16 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16`}>
      <div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3">
          <img src="/manuel.jpg" alt={me.name} width="56" height="56"
            className="size-14 rounded-2xl object-cover object-[50%_30%] ring-1 ring-line" />
          <div>
            <p className="font-medium">{me.name}</p>
            <p className="text-sm text-ink-soft">{t(me.role)} · {t(me.location)}</p>
          </div>
        </motion.div>

        <h1 key={lang} className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span className={`block ${i === lines.length - 1 ? "text-accent" : ""}`}
                initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">{t(me.intro)}</p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {t(me.status)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/#proyectos">{t({ es: "Ver proyectos", en: "See my work" })} <Arrow /></Button>
            <Button href={me.cv[lang]} variant="ghost" download>{t({ es: "Descargar CV", en: "Download CV" })}</Button>
          </div>
          <CopyEmail className="mt-5" />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30, rotate: 1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <RouteGraph />
      </motion.div>
    </section>
  );
}

function Facts() {
  const { t } = usePrefs();
  return (
    <section className="border-y border-line bg-surface">
      <div className={`${wrap} py-8`}>
        <p className="label mb-5">{t({ es: "Lo esencial en 30 segundos", en: "The essentials in 30 seconds" })}</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <dt className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <CountUp value={f.value} />
              </dt>
              <dd className="mt-1 text-sm text-ink-soft">{t(f.label)}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ExtLinks({ p, className = "" }) {
  const { t } = usePrefs();
  return (
    <div className={`relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm ${className}`}>
      <a href={p.live} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 font-medium hover:text-accent">
        {t({ es: "Ver en vivo", en: "Live site" })} <Arrow up />
      </a>
      <a href={p.repo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-ink-soft hover:text-ink">
        {t({ es: "Código", en: "Code" })} <Arrow up />
      </a>
    </div>
  );
}

function Visual({ p }) {
  if (p.image) return <Shot src={p.image} alt={`${p.name}`} className="transition-transform duration-500 group-hover:-translate-y-1" />;
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper p-4 transition-transform duration-500 group-hover:-translate-y-1">
      <RouteGraph mini />
    </div>
  );
}

function Work() {
  const { t } = usePrefs();
  const [lead, second, ...featured] = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="proyectos" className={`${wrap} py-24 sm:py-32`}>
      <SectionHead index="01" title={t({ es: "Proyectos", en: "Selected work" })}
        kicker={t({
          es: "Cada uno tiene demo pública, código abierto y un caso de estudio: el problema, lo que construí y por qué lo hice así.",
          en: "Each one has a public demo, open code and a case study: the problem, what I built and why I built it that way.",
        })} />

      <BigCard p={lead} label={t({ es: "Proyecto principal", en: "Flagship project" })} />
      <BigCard p={second} label={t({ es: "Segundo destacado", en: "Also featured" })} flip className="mt-6" />

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08} className="h-full">
            <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface p-5 transition-colors hover:border-ink-faint">
              <Visual p={p} />
              <p className="label mt-5">{p.year} · {t(p.kind)}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                <Link to={`/proyectos/${p.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">{p.name}</Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{t(p.tagline)}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.slice(0, 4).map((s) => <Chip key={s}>{s}</Chip>)}</div>
              <ExtLinks p={p} className="mt-5 border-t border-line pt-4" />
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="label mb-4">{t({ es: "Más casos de estudio", en: "More case studies" })}</p>
        <ul className="border-t border-line">
          {rest.map((p) => (
            <li key={p.slug} className="group relative grid gap-2 border-b border-line py-5 sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-6">
              <Link to={`/proyectos/${p.slug}`} className="font-display text-xl font-semibold after:absolute after:inset-0">
                <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                  {p.name}
                </span>
              </Link>
              <div>
                <p className="text-sm text-ink-soft">{t(p.tagline)}</p>
                <p className="mt-1 font-mono text-xs text-ink-faint">{p.stack.join(" · ")}</p>
              </div>
              <ExtLinks p={p} />
              {p.image && (
                <img src={p.image} alt="" aria-hidden loading="lazy"
                  className="pointer-events-none absolute right-48 top-1/2 hidden w-56 -translate-y-1/2 rotate-2 rounded-lg border border-line opacity-0 shadow-xl transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100 lg:block" />
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function BigCard({ p, label, flip = false, className = "" }) {
  const { t } = usePrefs();
  return (
    <Reveal className={className}>
      <article className={`group relative grid gap-8 rounded-3xl border border-line bg-surface p-5 sm:p-8 lg:items-center ${flip ? "lg:grid-cols-[1.25fr_1fr]" : "lg:grid-cols-[1fr_1.25fr]"}`}>
        <div className={flip ? "lg:order-2" : ""}>
          <p className="label text-accent!">{label} · {t(p.kind)}</p>
          <h3 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            <Link to={`/proyectos/${p.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">{p.name}</Link>
          </h3>
          <p className="mt-4 text-lg text-ink-soft text-pretty">{t(p.tagline)}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 border-y border-line py-4 sm:grid-cols-4">
            {p.metrics.map((m) => (
              <div key={m.value + m.label.es}>
                <dt className="font-display text-2xl font-semibold">{m.value}</dt>
                <dd className="text-xs text-ink-faint leading-tight">{t(m.label)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap gap-1.5">{p.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              {t({ es: "Leer caso de estudio", en: "Read case study" })} <Arrow />
            </span>
            <ExtLinks p={p} />
          </div>
        </div>
        <Visual p={p} />
      </article>
    </Reveal>
  );
}

function Skills() {
  const { t } = usePrefs();
  return (
    <section id="habilidades" className="border-y border-line bg-surface">
      <div className={`${wrap} py-24 sm:py-32`}>
        <SectionHead index="02" title={t({ es: "Habilidades, con pruebas", en: "Skills, with receipts" })}
          kicker={t({
            es: "Sin barras de porcentaje. Cada tecnología apunta al proyecto donde puedes verla funcionando.",
            en: "No percentage bars. Each technology points to the project where you can see it working.",
          })} />
        <div className="grid gap-10 lg:grid-cols-3">
          {skills.map((g, gi) => (
            <Reveal key={gi} delay={gi * 0.08}>
              <h3 className="label mb-3">{t(g.group)}</h3>
              <ul className="divide-y divide-line border-y border-line">
                {g.items.map(([name, refs]) => (
                  <li key={name} className="py-3">
                    <p className="font-medium">{name}</p>
                    <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                      {refs.map((slug) => (
                        <Link key={slug} to={`/proyectos/${slug}`} className="text-ink-faint hover:text-accent transition-colors">
                          ↳ {bySlug[slug].name}
                        </Link>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-soft">
          <span><b className="text-ink">{t({ es: "Idiomas", en: "Languages" })}:</b> {t({ es: "español (nativo), inglés B2", en: "Spanish (native), English B2" })}</span>
          <span><b className="text-ink">{t({ es: "Aprendiendo ahora", en: "Learning now" })}:</b> {t({ es: "testing con Jest y React Testing Library, AWS", en: "testing with Jest and React Testing Library, AWS" })}</span>
        </Reveal>
      </div>
    </section>
  );
}

function Principles() {
  const { t } = usePrefs();
  return (
    <section className={`${wrap} py-24 sm:py-32`}>
      <SectionHead index="03" title={t({ es: "Cómo trabajo", en: "How I work" })} />
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={i} delay={i * 0.08} className="bg-paper p-7">
            <span className="font-mono text-sm text-accent">0{i + 1}</span>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{t(p.title)}</h3>
            <p className="mt-3 text-ink-soft leading-relaxed">{t(p.body)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  const { t } = usePrefs();
  const [showCerts, setShowCerts] = useState(false);
  return (
    <section id="trayectoria" className={`${wrap} pb-24 sm:pb-32`}>
      <SectionHead index="04" title={t({ es: "Trayectoria", en: "Journey" })}
        kicker={t({ es: "Lo más reciente primero.", en: "Most recent first." })} />
      <ol className="relative ml-2 border-l border-line sm:ml-[8rem]">
        {timeline.map((e, i) => (
          <Reveal as="li" key={i} delay={i * 0.05} className="relative pb-10 pl-8 last:pb-0">
            <span className={`absolute -left-[5px] top-2 size-[9px] rounded-full ring-4 ring-paper ${e.highlight ? "bg-accent" : "bg-ink-faint"}`} />
            <p className="font-mono text-xs text-ink-faint sm:absolute sm:-left-[8rem] sm:top-1.5 sm:w-24 sm:text-right">{e.when}</p>
            <h3 className="mt-1 font-display text-xl font-semibold sm:mt-0">{t(e.title)}</h3>
            <p className="text-sm font-medium text-ink-soft">{t(e.org)}</p>
            <p className="mt-2 max-w-2xl text-ink-soft leading-relaxed">{t(e.body)}</p>
            {e.link?.startsWith("http") ? (
              <a href={e.link} target="_blank" rel="noreferrer" className="group mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {t({ es: "Verificar certificado", en: "Verify certificate" })} <Arrow up />
              </a>
            ) : e.link && (
              <Link to={e.link} className="group mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {t({ es: "Ver el caso", en: "See the case" })} <Arrow />
              </Link>
            )}
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-16 rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold">{t({ es: "Certificaciones", en: "Certifications" })}</h3>
            <p className="text-sm text-ink-soft">{certs.length} · {t({ es: "las que tienen enlace se pueden verificar con un clic", en: "linked ones can be verified in one click" })}</p>
          </div>
          <button onClick={() => setShowCerts((s) => !s)} aria-expanded={showCerts}
            className="rounded-full border border-line px-4 py-2 text-sm hover:border-ink transition-colors">
            {showCerts ? t({ es: "Ocultar", en: "Hide" }) : t({ es: "Ver todas", en: "Show all" })}
          </button>
        </div>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
          {(showCerts ? certs : certs.slice(0, 4)).map((c) => (
            <motion.li layout key={c.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-baseline justify-between gap-4 border-t border-line py-3">
              <div>
                <p className="font-medium leading-snug">{c.name}</p>
                <p className="text-sm text-ink-faint">{c.by}{c.year && ` · ${c.year}`}</p>
              </div>
              {c.url && (
                <a href={c.url} target="_blank" rel="noreferrer" className="group inline-flex shrink-0 items-center gap-1 font-mono text-xs text-accent">
                  {t({ es: "verificar", en: "verify" })} <Arrow up />
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Contact() {
  const { t, lang } = usePrefs();
  return (
    <section id="contacto" className="bg-ink text-paper">
      <div className={`${wrap} py-24 sm:py-32`}>
        <Reveal>
          <p className="label text-paper/60!">05 · {t({ es: "Contacto", en: "Contact" })}</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-balance">
            {t({ es: "¿Tienes un equipo donde pueda aportar?", en: "Got a team where I can contribute?" })}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/70">
            {t({
              es: "Busco una práctica o un primer rol junior en front-end. Hablo español e inglés, y puedo empezar con una prueba técnica cuando quieras.",
              en: "I'm looking for an internship or a first junior front-end role. I speak Spanish and English, and I'm happy to start with a technical test.",
            })}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          <a href={`mailto:${me.email}`} className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink hover:bg-paper hover:text-ink transition-colors">
            {t({ es: "Escribirme", en: "Email me" })} <Arrow />
          </a>
          {[["LinkedIn", me.linkedin], ["GitHub", me.github]].map(([n, h]) => (
            <a key={n} href={h} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3 hover:border-paper transition-colors">
              {n} <Arrow up />
            </a>
          ))}
          <a href={me.cv[lang]} download className="group inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3 hover:border-paper transition-colors">
            CV · PDF
          </a>
        </Reveal>
        <p className="mt-8 font-mono text-sm text-paper/60">{me.email}</p>
      </div>
    </section>
  );
}
