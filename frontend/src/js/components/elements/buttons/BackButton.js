import React from 'react';
import styled from 'styled-components';

import CornerButton from './CornerButton';
import { ReactComponent as BackIcon } from './../../../../img/svg/back.svg';

/**
 * A button shaped like a 'back' arrow. Positioned in the upper right corner
 * of the page by default.
 */
const BackButton = ({ className, onClick }) => {
  return (
    <CornerButton className={className} onClick={onClick}>
      <BackIcon />
    </CornerButton>
  );
};

export default styled(BackButton)``;
