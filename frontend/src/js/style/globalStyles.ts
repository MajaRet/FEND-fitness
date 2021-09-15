import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --blue1: 72, 86, 223; // #4856DF;
    --blue2: 62, 193, 243; // #3EC1F3;
    --light-pink: 255, 183, 213; // #FFB7D5;
    --terracotta: 202, 115, 88; // #CA7358;
    --dark-yellow: 255, 190, 33; // #FFBE21;
    --beige: 245, 235, 221; // #F5EBDD;
    --dark-blue: 29, 42, 115; // #1D2A73;
    --cyan: 62, 243, 232; // #3EF3E8;
    --light-yellow: 245, 255, 160; // #F5FFA0;
    --dark-pink: 235, 66, 198; // #EB42C6;
    --light-grey: 243, 243, 243; // #F3F3F3;
    --brown1: 82, 47, 41; // #522F29;
    --brown2: 149, 100, 93; // #95645D;
    --brown3: 219, 175, 168; // #DBAFA8;
    --brown4: 237, 212, 208; // #EDD4D0;
    --pistachio: 210, 221, 208; // #D2DDD0;
    --flesh: 255, 177, 160; // #FFB1A0;

    --gradient-dark-blue-cyan: linear-gradient(to right, rgb(var(--dark-blue)),rgb(var(--cyan)));
    --gradient-light-yellow-cyan: linear-gradient(to right, rgb(var(--light-yellow)),rgb(var(--cyan)));
    --gradient-flesh-dark-pink: linear-gradient(to right, rgb(var(--flesh)), rgb(var(--dark-pink)));
    --gradient-dark-yellow-dark-pink: linear-gradient(to right, rgb(var(--dark-yellow)), rgb(var(--dark-pink)));
    --gradient-dark-yellow-light-pink: linear-gradient(to right, rgb(var(--dark-yellow)), rgb(var(--light-pink)));

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

    --tiny-text-size: 1rem;
    --tiny-text-height: 1.25rem;

    --normal-weight: 400;
    --heading-weight: 700;

    --standard-padding-horizontal: 17px;
    --standard-padding-vertical: 25px;

    --nav-height: 50px;
  }

  html {
    font-size: 62.5%;
  }

  body {
    box-sizing: border-box;

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;

    font-family:  var(--font-family);
    font-size: var(--body-text-size);
    line-height: var(--body-text-height);
    color: ${(props) => `rgb(${props.theme.fontColorDefault})`};
  }

  h1 {
    font-size: var(--h1-size);
    line-height: var(--h1-height);
    font-weight: var(--heading-weight);
  }

  h2 {
    font-size: var(--h2-size);
    line-height: var(--h2-height);
    font-weight: var(--heading-weight);
  }

  h3 {
    font-size: var(--h3-size);
    line-height: var(--h3-height);
    font-weight: var(--heading-weight);
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    width: fit-content;
    background: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
