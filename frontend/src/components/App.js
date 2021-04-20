import React, { Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../globalStyles';

import theme from '../Theme';

import Dashboard from './Dashboard';

const StyledApp = styled.div`
  min-height: 100vh;

  background-image: ${(props) => props.theme.backgroundGradient};
`;
const App = (props) => {
  console.log(props.theme);
  console.log(styled);
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <StyledApp>
          <h1>H1</h1>
          <h2>H2</h2>
          <h3>H3</h3>
          <p>Body</p>
          <Dashboard />
        </StyledApp>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
