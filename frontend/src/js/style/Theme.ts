import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    backgroundDefault: string;
    backgroundGradient: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    highlightColor1: string;
    fontColorDefault: string;
    buttonColor: string;
    buttonTextColor: string;
  }
}

// To use a color, wrap it in rgb or rgba. This way, its
// opacity can be changed at will.
export const lightTheme: DefaultTheme = {
  name: 'light',
  backgroundDefault: '255, 255, 255',
  backgroundGradient: 'var(--gradient-dark-yellow-light-pink)',
  backgroundPrimary: 'var(--beige)',
  backgroundSecondary: 'var(--pistachio)',
  highlightColor1: 'var(--blue2)',
  fontColorDefault: 'var(--dark-blue)',
  buttonColor: 'var(--dark-blue)',
  buttonTextColor: '255, 255, 255',
};

export const darkTheme: DefaultTheme = {
  name: 'dark',
  backgroundDefault: '30,30,40',
  backgroundGradient:
    'linear-gradient(to right, rgb(100,100,140), rgb(50,50,90))',
  backgroundPrimary: '50,50,72',
  backgroundSecondary: '80,80,100',
  highlightColor1: '80,80,150',
  fontColorDefault: '200,180,230',
  buttonColor: '200,160,210',
  buttonTextColor: '30,40,14',
};

const theme = lightTheme;
export default theme;
