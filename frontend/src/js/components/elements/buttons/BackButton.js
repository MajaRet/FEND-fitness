import React from 'react';
import styled from 'styled-components';

import { ReactComponent as BackIcon } from './../../../../img/svg/back.svg';

const BackButton = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <BackIcon />
    </button>
  );
};

export default styled(BackButton)`
  position: absolute;
  top: var(--standard-padding-vertical);
  right: var(--standard-padding-horizontal);

  z-index: 2;

  padding: 0 !important;
`;
