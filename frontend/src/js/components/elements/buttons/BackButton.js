import React from 'react';
import styled from 'styled-components';

import CornerButton from './CornerButton';
import { ReactComponent as BackIcon } from './../../../../img/svg/back.svg';

const BackButton = ({ className, onClick }) => {
  return (
    <CornerButton className={className} onClick={onClick}>
      <BackIcon />
    </CornerButton>
  );
};

export default styled(BackButton)``;
