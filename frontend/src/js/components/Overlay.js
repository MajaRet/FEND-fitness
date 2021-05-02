import React, { useEffect } from 'react';
import styled from 'styled-components';
import FocusTrap from 'focus-trap-react';

const Overlay = ({ children, className }) => {
  // Prevent scrolling behind the overlay.
  useEffect(() => {
    const htmlStyle = document.querySelector('html').style;
    const overflowSetting = htmlStyle.overflowY;
    htmlStyle.overflowY = 'hidden';
    return () => {
      // Reset scroll settings
      htmlStyle.overflowY = overflowSetting;
    };
  }, []);

  return (
    <FocusTrap>
      <div className={className}>{children}</div>
    </FocusTrap>
  );
};

const StyledOverlay = styled(Overlay)`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;

  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;

  // Default background color, usually overwritten by component styles
  background-color: ${(props) => `rgb(${props.theme.backgroundDefault})`};
`;

export default StyledOverlay;
