import React from 'react';
import styled from 'styled-components';
import FocusTrap from 'focus-trap-react';
import CloseButton from './buttons/CloseButton';

const Overlay = ({ setOpen, closeButton, children, className }) => {
  return (
    <FocusTrap>
      <div className={className}>
        {React.cloneElement(closeButton, {
          onClick: () => setOpen(false),
        })}
        {children}
      </div>
    </FocusTrap>
  );
};

Overlay.defaultProps = {
  open: true,
  closeButton: <CloseButton />,
};

const StyledOverlay = styled(Overlay)`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;

  width: 100vw;
  max-width: 100%;
  height: 100vh;

  overflow: scroll;

  // Default background color, usually overwritten by component styles
  background-color: white;
`;

export default StyledOverlay;
