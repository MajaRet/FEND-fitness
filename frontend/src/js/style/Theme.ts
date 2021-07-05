import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundDefault: string;
    backgroundGradient: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    fontColorDefault: string;
    buttonColor: string;
    buttonTextColor: string;
  }
}

// To use a color, wrap it in rgb or rgba. This way, its
// opacity can be changed at will.
const theme: DefaultTheme = {
  backgroundDefault: '255, 255, 255',
  backgroundGradient: 'var(--gradient-dark-yellow-light-pink)',
  backgroundPrimary: 'var(--beige)',
  backgroundSecondary: 'var(--pistachio)',
  fontColorDefault: 'var(--dark-blue)',
  buttonColor: 'var(--dark-blue)',
  buttonTextColor: '255, 255, 255',
};

export default theme;
