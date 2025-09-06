import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type Lang = "en" | "hi";

type Dictionary = Record<string, { en: string; hi: string }>;

const dict: Dictionary = {
  appTitle: { en: "Smart Tourist Safety", hi: "स्मार्ट टूरिस्ट सेफ्टी" },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  tourists: { en: "Tourists", hi: "पर्यटक" },
  alerts: { en: "Alerts", hi: "अलर्ट" },
  reports: { en: "Reports", hi: "रिपोर्ट्स" },
  login: { en: "Login", hi: "लॉगिन" },
  search: { en: "Search...", hi: "खोजें..." },
  activeAlerts: { en: "Active Alerts", hi: "सक्रिय अलर्ट" },
  acknowledge: { en: "Acknowledge", hi: "स्वीकारें" },
  dispatchPolice: { en: "Dispatch Police", hi: "पुलिस भेजें" },
  recentAlerts: { en: "Recent Alerts", hi: "हालिया अलर्ट" },
  language: { en: "EN", hi: "हिं" },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key) => dict[key]?.[lang] ?? key,
    }),
    [lang],
  );
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
