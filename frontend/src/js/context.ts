import { createContext } from 'react';

export interface UserType {
  id: string;
  name: string;
}

export interface ThemeToggleType {
  toggleTheme: () => void;
  theme: string;
}

// This context makes it possible to access the current user
// from anywhere in the app.
export const UserContext = createContext<UserType>({
  id: '',
  name: 'DefaultUser',
});

// This context makes it possible to change between light and dark theme
// from anywhere in the app.
export const ThemeToggleContext = createContext<ThemeToggleType>({
  toggleTheme: () => {},
  theme: 'light',
});
