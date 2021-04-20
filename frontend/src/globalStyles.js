import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --blue1: #4856DF;
    --blue2: #3EC1F3;
    --light-pink: #FFB7D5;
    --terracotta: #CA7358;
    --dark-yellow: #FFBE21;
    --beige: #F5EBDD;
    --dark-blue: #1D2A73;
    --cyan: #3EF3E8;
    --light-yellow: #F5FFA0;
    --dark-pink: #EB42C6;
    --light-grey: #F3F3F3;
    --brown1: #522F29;
    --brown2: #95645D;
    --brown3: #DBAFA8;
    --brown4: #EDD4D0;
    --pistachio: #D2DDD0;
    --flesh: #FFB1A0;

    --gradient-dark-blue-cyan: linear-gradient(to right, var(--dark-blue),var(--cyan));
    --gradient-light-yellow-cyan: linear-gradient(to right, var(--light-yellow),var(--cyan));
    --gradient-flesh-dark-pink: linear-gradient(to right, var(--flesh), var(--dark-pink));
    --gradient-dark-yellow-dark-pink: linear-gradient(to right, var(--dark-yellow), var(--dark-pink));
    --gradient-dark-yellow-light-pink: linear-gradient(to right, var(--dark-yellow), var(--light-pink));

    --font-family: "Montserrat", Times, Serif;
    --h1-size: 3.6rem;
    --h1-height: 4.4rem;

    --h2-size: 2.4rem;
    --h2-height: 2.9rem;

    --h3-size: 1.8rem;
    --h3-height: 2.2rem;

    --body-text-size: 1.6rem;
    --body-text-height: 2.1rem;

    --small-text-size: 1.2rem;
    --small-text-height: 1.5rem;
  }

  html {
    font-size: 62.5%;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }

  * {
    font-family: var(--font-family);
    font-size: var(--body-text-size);
    line-height: var(--body-text-height);
    color: ${(props) => props.theme.fontColorDefault};
  }

  h1 {
    margin: 0;
    font-size: var(--h1-size);
    line-height: var(--h1-height);
  }

  h2 {
    margin: 0;
    font-size: var(--h2-size);
    line-height: var(--h2-height);
  }

  h3 {
    margin: 0;
    font-size: var(--h3-size);
    line-height: var(--h3-height);
  }
`;

export default GlobalStyle;
