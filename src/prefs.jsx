import { createContext, useContext, useEffect, useState } from "react";

const Prefs = createContext(null);

function stored(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function PrefsProvider({ children }) {
  const [lang, setLang] = useState(() => stored("lang", navigator.language?.startsWith("es") ? "es" : "en"));
  const [theme, setTheme] = useState(() =>
    stored("theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    save("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    save("theme", theme);
  }, [theme]);

  // t() acepta un texto { es, en } o un string plano.
  const t = (value) => (value && typeof value === "object" && "es" in value ? value[lang] : value);

  return (
    <Prefs.Provider
      value={{
        lang,
        theme,
        t,
        toggleLang: () => setLang((l) => (l === "es" ? "en" : "es")),
        toggleTheme: () => setTheme((x) => (x === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </Prefs.Provider>
  );
}

export const usePrefs = () => useContext(Prefs);
