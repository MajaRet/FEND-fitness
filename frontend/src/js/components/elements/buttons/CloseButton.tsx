import React from 'react';

import { CornerButton } from './CornerButton';
import { ReactComponent as CloseIcon } from './../../../../img/svg/close.svg';

/**
 * A button shaped like a closing x. Positioned in the upper right corner
 * of the page by default.
 */
const CloseButton = (props: any) => (
  <CornerButton {...props}>
    <CloseIcon />
  </CornerButton>
);

export default CloseButton;
