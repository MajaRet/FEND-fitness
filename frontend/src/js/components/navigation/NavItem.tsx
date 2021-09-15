import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import CapitalLabel from '../elements/labels/CapitalLabel';

interface NavItemProps {
  linkText: string;
  icon: React.FC;
  to: string;
}

const StyledNavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 2px;

  svg * {
    stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
  }
`;

const NavItem = (props: NavItemProps) => {
  const { linkText, icon, to } = props;
  const Icon = icon;
  return (
    <StyledNavItem to={to} exact aria-labelledby={`label-${linkText}`}>
      <Icon />
      <CapitalLabel id={`label-${linkText}`}>{linkText}</CapitalLabel>
    </StyledNavItem>
  );
};

export default NavItem;
