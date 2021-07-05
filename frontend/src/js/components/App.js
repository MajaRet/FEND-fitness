import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import GlobalStyle from '../globalStyles';
import theme from '../Theme';

import Dashboard from './dashboard/Dashboard';
import Navigation from './navigation/Navigation';
import Browse from './browse/Browse';

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
          <Fragment>
            <GlobalStyle />
            <StyledApp>
              <Switch>
                <Route path="/" exact>
                  <Dashboard user={dummyUser} />
                </Route>
                <Route path="/browse" exact>
                  <Browse />
                </Route>
              </Switch>
              <Navigation />
            </StyledApp>
          </Fragment>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

const dummyUser = { name: 'Schneewittchen' };

export default App;
