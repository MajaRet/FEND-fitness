import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';

import { ReactComponent as HomeIcon } from './../../../img/svg/home.svg';
import { ReactComponent as BrowseIcon } from './../../../img/svg/dumbbell.svg';
import { ReactComponent as ProfileIcon } from './../../../img/svg/profile.svg';

const Navigation = ({ className }) => {
  return (
    <nav className={className}>
      <NavItem linkText="Home" icon={HomeIcon} to="/" />{' '}
      <NavItem linkText="Browse" icon={BrowseIcon} to="/browse" />{' '}
      <NavItem linkText="Profil" icon={ProfileIcon} to="profile" />
    </nav>
  );
};

export default styled(Navigation)`
  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: space-between;

  padding: 10px 40px 2px 40px;
  width: 100vw;

  background-color: ${(props) => props.theme.backgroundPrimary};
`;
