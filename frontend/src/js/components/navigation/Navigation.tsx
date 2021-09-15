import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';
import DarkModeToggle from './DarkModeToggle';

import { ReactComponent as HomeIcon } from './../../../img/svg/home.svg';
import { ReactComponent as BrowseIcon } from './../../../img/svg/dumbbell.svg';

const StyledNavigation = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: space-between;

  padding: 10px 40px 2px 40px;
  width: 100vw;

  background-color: ${(props) => `rgb(${props.theme.backgroundPrimary})`};
`;

const Navigation = () => {
  return (
    <StyledNavigation>
      <NavItem linkText="Home" icon={HomeIcon} to="/" />
      <NavItem linkText="Programme" icon={BrowseIcon} to="/programs" />
      <DarkModeToggle />
    </StyledNavigation>
  );
};

export default styled(Navigation)``;
