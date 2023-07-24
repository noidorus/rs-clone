import React, { useState, useEffect, createContext } from 'react';
import { ProviderProps, IThemeContext, Themes } from './types';

export const ThemeContext = createContext<IThemeContext>({
  theme: Themes.light,
  setTheme: () => {},
});

const ThemeProvider = ({ children }: ProviderProps) => {
  const [theme, setTheme] = useState<Themes>(getTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const getTheme = (): Themes => {
  const theme = `${window?.localStorage?.getItem('theme')}` as Themes;
  if (Object.values(Themes).includes(theme as Themes)) return theme;

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return Themes.light;

  return Themes.dark;
};

export default ThemeProvider;
export { Themes };
