import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../globalStyles';
import theme from '../Theme';

import Dashboard from './dashboard/Dashboard';

const StyledApp = styled.div`
  padding: 25px 17px;
  min-height: 100vh;
`;

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <StyledApp>
            <Route path="/" exact>
              <Dashboard user={dummyUser} />
            </Route>
          </StyledApp>
        </Fragment>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const dummyUser = { name: 'Schneewittchen' };

export default App;
