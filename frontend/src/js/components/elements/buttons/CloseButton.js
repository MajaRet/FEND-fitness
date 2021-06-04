import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from './../../../../img/svg/close.svg';

const CloseButton = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

export default styled(CloseButton)`
  position: absolute;
  top: var(--standard-padding-vertical);
  right: var(--standard-padding-horizontal);

  z-index: 2;

  padding: 0 !important;

  cursor: pointer;
`;
