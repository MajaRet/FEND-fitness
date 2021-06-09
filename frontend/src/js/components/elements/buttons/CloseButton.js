import React from 'react';
import styled from 'styled-components';

import CornerButton from './CornerButton';
import { ReactComponent as CloseIcon } from './../../../../img/svg/close.svg';

/**
 * A button shaped like a closing x. Positioned in the upper right corner
 * of the page by default.
 */
const CloseButton = ({ className, onClick }) => {
  return (
    <CornerButton className={className} onClick={onClick}>
      <CloseIcon />
    </CornerButton>
  );
};

export default styled(CloseButton)``;
