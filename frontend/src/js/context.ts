/* tslint:disable:no-empty */
import { createContext } from 'react';

export interface ThemeToggleType {
  toggleTheme: () => void;
  theme: string;
}

// This context makes it possible to change between light and dark theme
// from anywhere in the app.
export const ThemeToggleContext = createContext<ThemeToggleType>({
  toggleTheme: () => {},
  theme: 'light',
});
