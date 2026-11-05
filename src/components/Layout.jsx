import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router";
import { me, projects } from "../content";
import { usePrefs } from "../prefs";
import { Arrow, useCopyEmail } from "./ui";

const sections = [
  ["proyectos", { es: "Proyectos", en: "Work" }],
  ["habilidades", { es: "Habilidades", en: "Skills" }],
  ["trayectoria", { es: "Trayectoria", en: "Journey" }],
  ["contacto", { es: "Contacto", en: "Contact" }],
];

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const [palette, setPalette] = useState(false);

  // Al cambiar de ruta: ir al ancla si hay, o arriba.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // La sección puede no existir aún mientras termina la transición de página.
    let tries = 0;
    const id = setInterval(() => {
      const el = document.getElementById(hash.slice(1));
      if (el || ++tries > 20) {
        clearInterval(id);
        el?.scrollIntoView();
      }
    }, 50);
    return () => clearInterval(id);
  }, [pathname, hash]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="grain min-h-dvh flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] rounded-full bg-ink px-4 py-2 text-paper">
        Skip to content
      </a>
      <Header openPalette={() => setPalette(true)} />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <AnimatePresence>{palette && <Palette close={() => setPalette(false)} />}</AnimatePresence>
    </div>
  );
}

function Header({ openPalette }) {
  const { t, lang, theme, toggleLang, toggleTheme } = usePrefs();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <motion.div className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent" style={{ scaleX: progress }} />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5 font-display font-semibold tracking-tight">
          <Mark />
          <span>{me.short}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm" aria-label="Principal">
          {sections.map(([id, label]) => (
            <Link key={id} to={`/#${id}`} className="rounded-full px-3 py-1.5 text-ink-soft hover:text-ink hover:bg-surface transition-colors">
              {t(label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button onClick={openPalette} className="hidden lg:inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink-faint hover:text-ink hover:border-ink transition-colors">
            {t({ es: "Buscar", en: "Search" })} <kbd className="rounded border border-line px-1">Ctrl K</kbd>
          </button>
          <IconBtn onClick={toggleLang} label={t({ es: "Switch to English", en: "Cambiar a español" })}>
            <span className="font-mono text-xs font-medium">{lang === "es" ? "EN" : "ES"}</span>
          </IconBtn>
          <IconBtn onClick={toggleTheme} label={t({ es: "Cambiar tema", en: "Toggle theme" })}>
            <motion.svg key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              {theme === "dark" ? (
                <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
              ) : (
                <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10Z" />
              )}
            </motion.svg>
          </IconBtn>
          <a href={me.cv[lang]} download className="hidden sm:inline-flex rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-paper hover:bg-accent hover:text-accent-ink transition-colors">
            CV
          </a>
          <IconBtn onClick={() => setOpen((o) => !o)} label="Menu" className="md:hidden" aria-expanded={open}>
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </IconBtn>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-line bg-paper" aria-label="Móvil">
            <div className="flex flex-col px-4 py-3">
              {sections.map(([id, label]) => (
                <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)} className="py-3 font-display text-2xl border-b border-line last:border-0">
                  {t(label)}
                </Link>
              ))}
              <a href={me.cv[lang]} download className="mt-3 rounded-full bg-ink px-4 py-3 text-center text-paper font-medium">
                {t({ es: "Descargar CV", en: "Download CV" })}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-7 transition-transform duration-500 group-hover:rotate-[-8deg]" aria-hidden>
      <rect width="32" height="32" rx="8" fill="var(--ink)" />
      <path d="M9 22 L16 14 L23 10" stroke="var(--paper)" strokeWidth="2" fill="none" />
      <circle cx="9" cy="22" r="3" fill="var(--accent)" />
      <circle cx="23" cy="10" r="3" fill="var(--paper)" />
    </svg>
  );
}

function IconBtn({ children, label, className = "", ...rest }) {
  return (
    <button aria-label={label} title={label} className={`grid size-9 place-items-center rounded-full text-ink-soft hover:text-ink hover:bg-surface transition-colors ${className}`} {...rest}>
      {children}
    </button>
  );
}

function Footer() {
  const { t } = usePrefs();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 text-sm text-ink-faint">
        <p>
          © {new Date().getFullYear()} {me.name} · {t({ es: "Hecho a mano con React, Tailwind y React Router.", en: "Hand-built with React, Tailwind and React Router." })}
        </p>
        <div className="flex gap-4">
          <a className="hover:text-ink" href={me.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:text-ink" href={me.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-ink" href={`mailto:${me.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}

// Paleta de comandos (Ctrl/⌘ K): navegar, copiar correo, descargar CV, cambiar idioma o tema.
function Palette({ close }) {
  const { t, lang, toggleLang, toggleTheme } = usePrefs();
  const navigate = useNavigate();
  const [, copy] = useCopyEmail();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef(null);

  const actions = useMemo(() => [
    ...projects.map((p) => ({ label: p.name, hint: t(p.kind), run: () => navigate(`/proyectos/${p.slug}`) })),
    ...sections.map(([id, label]) => ({ label: t(label), hint: t({ es: "Sección", en: "Section" }), run: () => navigate(`/#${id}`) })),
    { label: t({ es: "Copiar correo", en: "Copy email" }), hint: me.email, run: copy },
    { label: t({ es: "Descargar CV (ES)", en: "Download CV (ES)" }), hint: "PDF", run: () => open(me.cv.es) },
    { label: t({ es: "Descargar CV (EN)", en: "Download CV (EN)" }), hint: "PDF", run: () => open(me.cv.en) },
    { label: "GitHub", hint: "MankX58", run: () => open(me.github) },
    { label: "LinkedIn", hint: me.name, run: () => open(me.linkedin) },
    { label: lang === "es" ? "Switch to English" : "Cambiar a español", hint: "ES / EN", run: toggleLang },
    { label: t({ es: "Cambiar tema", en: "Toggle theme" }), hint: t({ es: "Claro / oscuro", en: "Light / dark" }), run: toggleTheme },
  ], [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const list = actions.filter((a) => `${a.label} ${a.hint}`.toLowerCase().includes(q.toLowerCase()));
  const run = (a) => { a.run(); close(); };

  useEffect(() => {
    input.current?.focus();
  }, []);

  const onKey = (e) => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, list.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && list[sel]) run(list[sel]);
  };

  return (
    <motion.div className="fixed inset-0 z-[80] grid place-items-start justify-center bg-ink/30 px-4 pt-[15vh] backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close}>
      <motion.div role="dialog" aria-modal="true" aria-label={t({ es: "Buscar", en: "Search" })}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -12, scale: 0.98 }}
        onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }}
          placeholder={t({ es: "Ir a un proyecto, copiar correo, descargar CV…", en: "Jump to a project, copy email, download CV…" })}
          className="w-full border-b border-line bg-transparent px-5 py-4 outline-none placeholder:text-ink-faint" />
        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {list.map((a, i) => (
            <li key={a.label} role="option" aria-selected={i === sel}>
              <button onClick={() => run(a)} onMouseEnter={() => setSel(i)}
                className={`group flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm ${i === sel ? "bg-paper text-ink" : "text-ink-soft"}`}>
                <span>{a.label}</span>
                <span className="flex items-center gap-2 truncate font-mono text-xs text-ink-faint">{a.hint} {i === sel && <Arrow />}</span>
              </button>
            </li>
          ))}
          {!list.length && <li className="px-3 py-6 text-center text-sm text-ink-faint">{t({ es: "Nada por aquí.", en: "Nothing here." })}</li>}
        </ul>
      </motion.div>
    </motion.div>
  );
}
