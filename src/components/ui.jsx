import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Check, Copy } from "@phosphor-icons/react";
import { me } from "../content";
import { usePrefs } from "../prefs";

const ease = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </M>
  );
}

// Titular de sección: sin etiquetas numeradas, solo el mensaje.
export function SectionHead({ title, kicker, className = "" }) {
  return (
    <Reveal className={`mb-10 max-w-3xl sm:mb-14 ${className}`}>
      <h2 className="font-wide text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl">{title}</h2>
      {kicker && <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-soft text-pretty">{kicker}</p>}
    </Reveal>
  );
}

export function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-paper px-2.5 py-1 font-mono text-[0.7rem] text-ink-soft ring-1 ring-line">
      {children}
    </span>
  );
}

const btn = {
  primary: "bg-ink text-paper hover:bg-accent hover:text-accent-ink",
  accent: "bg-accent text-accent-ink hover:bg-ink hover:text-paper",
  ghost: "ring-1 ring-line text-ink hover:ring-ink",
};

export function Button({ to, href, variant = "primary", children, className = "", ...rest }) {
  const cls = `group inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition-[color,background-color,box-shadow,transform] duration-300 active:scale-[0.98] ${btn[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <a href={href} className={cls} {...rest}>{children}</a>;
}

export function Arrow({ className = "", up = false }) {
  const Icon = up ? ArrowUpRight : ArrowRight;
  return (
    <Icon weight="bold" aria-hidden
      className={`size-4 transition-transform duration-300 ${up ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1"} ${className}`} />
  );
}

export function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(typeof value === "number" ? 0 : value);
  useEffect(() => {
    if (!inView || typeof value !== "number") return;
    const from = value > 1000 ? value - 20 : 0;
    const c = animate(from, value, { duration: 1.2, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref} className="tabular-nums">{n}</span>;
}

export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(me.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${me.email}`;
    }
  };
  return [copied, copy];
}

export function CopyEmail({ className = "" }) {
  const { t } = usePrefs();
  const [copied, copy] = useCopyEmail();
  const Icon = copied ? Check : Copy;
  return (
    <button onClick={copy} className={`group inline-flex items-center gap-2 font-mono text-sm transition-colors ${className}`}>
      <span className="underline decoration-current/30 underline-offset-4 group-hover:decoration-current">{me.email}</span>
      <Icon className="size-4 opacity-70" aria-hidden />
      <span className="sr-only" aria-live="polite">{copied ? t({ es: "Correo copiado", en: "Email copied" }) : ""}</span>
    </button>
  );
}

// Captura real de un proyecto, sin marco de navegador falso.
export function Shot({ src, alt, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-paper ring-1 ring-line ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}
