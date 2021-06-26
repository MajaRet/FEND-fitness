import React from 'react';

import CornerButton from './CornerButton';
import { ReactComponent as CloseIcon } from './../../../../img/svg/close.svg';

/**
 * A button shaped like a closing x. Positioned in the upper right corner
 * of the page by default.
 */
const CloseButton = <CornerButton children={<CloseIcon />} />;

export default CloseButton;
