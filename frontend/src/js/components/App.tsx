import { Fragment, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../style/globalStyles';
import { lightTheme, darkTheme } from '../style/Theme';
import { UserContext, ThemeToggleContext } from '../context';

import Dashboard from './pages/dashboard/Dashboard';
import Navigation from './navigation/Navigation';
import Browse from './pages/browse/Browse';
import Program from './pages/program/Program';
import Workout from './pages/workout/Workout';
import Overlay from './util/Overlay';

const StyledApp = styled.div`
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  min-height: 100vh;

  background-color: ${(props) => `rgb(${props.theme.backgroundDefault})`};
`;

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleDarkMode = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ThemeToggleContext.Provider
          value={{
            toggleTheme: toggleDarkMode,
            theme: theme === lightTheme ? 'light' : 'dark',
          }}
        >
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
                  <Route path="/program/:programSlug/:day">
                    <Overlay>
                      <Workout />
                    </Overlay>
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
        </ThemeToggleContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
