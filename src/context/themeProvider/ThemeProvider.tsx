import React, { ReactNode, useState } from 'react';

interface ThemeProviderProps {
  children?: ReactNode;
}

export enum Themes {
  dark = 'dark',
  light = 'light',
}

export interface ThemeContextProps {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: Themes.light,
  setTheme: () => {},
});

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Themes>(getTheme);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

const getTheme = (): Themes => {
  const theme = `${window?.localStorage?.getItem('theme')}` as Themes;
  if (Object.values(Themes).includes(theme as Themes)) return theme;

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return Themes.light;

  return Themes.dark;
};
