import styled from 'styled-components';
import { useContext } from 'react';

import { ThemeToggleContext } from '../../context';

import { ReactComponent as SunIcon } from './../../../img/svg/sun.svg';
import CapitalLabel from '../elements/labels/CapitalLabel';

const StyledDarkModeToggle = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 2px;

  svg {
    height: 20px;
    width: 20px;
    * {
      stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    }
  }
`;

const DarkModeToggle = () => {
  const { toggleTheme, theme } = useContext(ThemeToggleContext);
  return (
    <StyledDarkModeToggle
      className="dark-mode-toggle"
      aria-labelledby="dark-mode-toggle-label"
      onClick={toggleTheme}
    >
      <SunIcon />
      <CapitalLabel id="dark-mode-toggle-label">
        {theme === 'light' ? 'Nacht' : 'Tag'}
      </CapitalLabel>
    </StyledDarkModeToggle>
  );
};

export default DarkModeToggle;
