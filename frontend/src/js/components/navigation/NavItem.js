import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import CapitalLabel from './../CapitalLabel';

const NavItem = ({ className, linkText = '', icon, to = '/' }) => {
  const Icon = icon;
  return (
    <NavLink to={to} exact className={className}>
      <Icon />
      <CapitalLabel>{linkText}</CapitalLabel>
    </NavLink>
  );
};

export default styled(NavItem)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 2px;
`;
