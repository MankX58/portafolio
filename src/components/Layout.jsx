import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router";
import { me, projects } from "../content";
import { usePrefs } from "../prefs";
import { List, MagnifyingGlass, Moon, Sun, X } from "@phosphor-icons/react";
import { Arrow, useCopyEmail } from "./ui";

const sections = [
  ["proyectos", { es: "Proyectos", en: "Work" }],
  ["habilidades", { es: "Habilidades", en: "Skills" }],
  ["sobre-mi", { es: "Sobre mí", en: "About" }],
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
  const { t, lang } = usePrefs();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <motion.div className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent" style={{ scaleX: progress }} />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 py-2 font-wide font-bold tracking-tight">
          <Mark />
          <span className="truncate">{me.short}</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm lg:flex" aria-label="Principal">
          {sections.map(([id, label]) => (
            <Link key={id} to={`/#${id}`} className="rounded-full px-3 py-1.5 text-ink-soft hover:text-ink hover:bg-surface transition-colors">
              {t(label)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <button onClick={openPalette} aria-label={t({ es: "Buscar", en: "Search" })} className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs text-ink-faint ring-1 ring-line transition-colors hover:text-ink hover:ring-ink lg:inline-flex">
            <MagnifyingGlass className="size-3.5" aria-hidden /> <kbd className="font-mono">Ctrl K</kbd>
          </button>
          <div className="hidden items-center gap-1 sm:flex"><Toggles /></div>
          <a href={me.cv[lang]} download className="hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-accent hover:text-accent-ink sm:inline-flex">
            {t({ es: "Descargar CV", en: "Download CV" })}
          </a>
          <IconBtn onClick={() => setOpen((o) => !o)} label="Menu" className="lg:hidden" aria-expanded={open}>
            {open ? <X className="size-[18px]" aria-hidden /> : <List className="size-[18px]" aria-hidden />}
          </IconBtn>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden" aria-label="Móvil">
            <div className="flex flex-col px-4 py-3">
              {sections.map(([id, label]) => (
                <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)} className="border-b border-line py-3 font-wide text-2xl font-bold last:border-0">
                  {t(label)}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-2">
                <a href={me.cv[lang]} download className="flex-1 rounded-full bg-ink px-4 py-3 text-center text-paper font-medium">
                  {t({ es: "Descargar CV", en: "Download CV" })}
                </a>
                <div className="flex items-center gap-1 sm:hidden"><Toggles /></div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Toggles() {
  const { t, lang, theme, toggleLang, toggleTheme } = usePrefs();
  return (
    <>
      <IconBtn onClick={toggleLang} label={t({ es: "Switch to English", en: "Cambiar a español" })}>
        <span className="font-mono text-xs font-medium">{lang === "es" ? "EN" : "ES"}</span>
      </IconBtn>
      <IconBtn onClick={toggleTheme} label={t({ es: "Cambiar tema", en: "Toggle theme" })}>
        <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} className="grid">
          {theme === "dark" ? <Sun className="size-[18px]" aria-hidden /> : <Moon className="size-[18px]" aria-hidden />}
        </motion.span>
      </IconBtn>
    </>
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
    <button aria-label={label} title={label} className={`grid size-11 place-items-center rounded-full sm:size-10 text-ink-soft hover:text-ink hover:bg-surface transition-colors ${className}`} {...rest}>
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
          © {new Date().getFullYear()} {me.name} · {t({ es: "Diseñado y programado por mí con React, Tailwind y React Router.", en: "Designed and coded by me with React, Tailwind and React Router." })}
        </p>
        <div className="flex gap-6">
          <a className="py-2.5 hover:text-ink" href={me.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="py-2.5 hover:text-ink" href={me.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="py-2.5 hover:text-ink" href={`mailto:${me.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}

// Paleta de comandos (Ctrl/Cmd K): navegar, copiar correo, descargar CV, cambiar idioma o tema.
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
          placeholder={t({ es: "Ir a un proyecto, copiar correo, descargar CV", en: "Jump to a project, copy email, download CV" })}
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
