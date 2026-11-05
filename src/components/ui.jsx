import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { Link } from "react-router";
import { me } from "../content";
import { usePrefs } from "../prefs";

export function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </M>
  );
}

export function SectionHead({ index, title, kicker }) {
  return (
    <Reveal className="mb-10 sm:mb-14 grid gap-3 sm:grid-cols-[8rem_1fr] items-baseline">
      <span className="label">{index}</span>
      <div>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">{title}</h2>
        {kicker && <p className="mt-3 max-w-2xl text-ink-soft text-pretty">{kicker}</p>}
      </div>
    </Reveal>
  );
}

export function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] text-ink-soft">
      {children}
    </span>
  );
}

const btn = {
  primary: "bg-ink text-paper hover:bg-accent hover:text-accent-ink",
  ghost: "border border-line text-ink hover:border-ink",
};

export function Button({ to, href, variant = "primary", children, className = "", ...rest }) {
  const cls = `group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${btn[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  return <a href={href} className={cls} {...rest}>{children}</a>;
}

export function Arrow({ className = "", up = false }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-3.5 transition-transform duration-200 ${up ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1"} ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      {up ? <path d="M5 11 11 5M6 5h5v5" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
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
  return (
    <button onClick={copy} className={`group inline-flex items-center gap-2 font-mono text-sm text-ink-soft hover:text-ink transition-colors ${className}`}>
      <span className="underline decoration-line underline-offset-4 group-hover:decoration-accent">{me.email}</span>
      <span className="relative inline-block min-w-16 text-left text-xs text-ink-faint" aria-live="polite">
        {copied ? <span className="text-accent">{t({ es: "¡copiado!", en: "copied!" })}</span> : t({ es: "copiar", en: "copy" })}
      </span>
    </button>
  );
}

export function Shot({ src, alt, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-paper ${className}`}>
      <div className="flex gap-1.5 border-b border-line px-3 py-2" aria-hidden>
        {[0, 1, 2].map((i) => <span key={i} className="size-2 rounded-full bg-line" />)}
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full aspect-[16/10] object-cover object-top" />
    </div>
  );
}
