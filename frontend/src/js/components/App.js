import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../style/globalStyles';
import theme from '../style/Theme';
import { UserContext } from '../context';

import Dashboard from './pages/dashboard/Dashboard';
import Navigation from './navigation/Navigation';
import Browse from './pages/browse/Browse';
import Program from './pages/program/Program';
import Overlay from './util/Overlay';

const StyledApp = styled.div`
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  min-height: 100vh;

  background-color: ${(props) => `rgb(${props.theme.backgroundDefault})`};
`;

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider
          value={{
            name: 'Schneewittchen',
            id: 'eec09fe5-2cc7-493d-aeca-84cf08632892',
          }}
        >
          <Fragment>
            <GlobalStyle />
            <StyledApp>
              <Switch>
                <Route path="/" exact>
                  <Dashboard />
                </Route>
                <Route path="/browse" exact>
                  <Browse />
                </Route>
                <Route path="/program/:id">
                  <Browse />
                  <Overlay>
                    <Program />
                  </Overlay>
                </Route>
              </Switch>
              <Navigation />
            </StyledApp>
          </Fragment>
        </UserContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
