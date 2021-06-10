import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import GlobalStyle from '../style/globalStyles';
import theme from '../style/Theme';
import { UserContext } from '../context';

import Dashboard from './pages/dashboard/Dashboard';
import Navigation from './navigation/Navigation';
import Browse from './pages/browse/Browse';
import Program from './pages/program/Program';
import Overlay from './util/Overlay';

const client = new ApolloClient({
  uri: 'https://eae3hj1s.api.sanity.io/v1/graphql/production/default',
  cache: new InMemoryCache(),
});

const StyledApp = styled.div`
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  min-height: 100vh;

  background-color: ${(props) => `rgb(${props.theme.backgroundDefault})`};
`;

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={{ name: 'Schneewittchen' }}>
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
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
