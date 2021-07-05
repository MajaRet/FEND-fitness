import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import FocusTrap from 'focus-trap-react';

const StyledOverlay = styled.div`
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

const Overlay: FunctionComponent = ({ children }) => {
  // Prevent scrolling behind the overlay.
  useEffect(() => {
    const htmlStyle = document.querySelector('html')?.style;
    if (!htmlStyle) return;

    const overflowSetting = htmlStyle.overflowY;
    htmlStyle.overflowY = 'hidden';
    return () => {
      // Reset scroll settings
      htmlStyle.overflowY = overflowSetting;
    };
  }, []);

  return (
    <FocusTrap>
      <StyledOverlay>{children}</StyledOverlay>
    </FocusTrap>
  );
};

export default Overlay;
