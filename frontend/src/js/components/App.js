import React, { Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../globalStyles';

import theme from '../Theme';

const StyledApp = styled.div`
  min-height: 100vh;
`;
const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <StyledApp>
          <h1>H1</h1>
          <h2>H2</h2>
          <h3>H3</h3>
          <p>Body</p>
        </StyledApp>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
