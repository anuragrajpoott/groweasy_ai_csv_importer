import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    const root = document.documentElement;

    const resolvedTheme =
      theme === "system"
        ? getSystemTheme()
        : theme;

    root.classList.toggle(
      "dark",
      resolvedTheme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}