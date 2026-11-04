import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "ar";

type LangContextValue = {
  lang: Language;
  dir: "ltr" | "rtl";
  setLang: (lang: Language) => void;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const value = useMemo<LangContextValue>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, toggleLang: () => setLang((current) => current === "en" ? "ar" : "en") }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used inside LangProvider");
  return context;
}