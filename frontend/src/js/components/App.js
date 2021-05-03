import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../globalStyles';
import theme from '../Theme';

import Dashboard from './dashboard/Dashboard';
import Navigation from './navigation/Navigation';
import Browse from './browse/Browse';

const StyledApp = styled.div`
  padding: 25px 17px;
  min-height: 100vh;

  background-color: ${(props) => props.theme.backgroundDefault};
`;

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <StyledApp>
            <Switch>
              <Route path="/browse" exact>
                <Browse />
              </Route>
              <Route path="/" exact>
                <Dashboard user={dummyUser} />
              </Route>
            </Switch>
            <Navigation />
          </StyledApp>
        </Fragment>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const dummyUser = { name: 'Schneewittchen' };

export default App;
