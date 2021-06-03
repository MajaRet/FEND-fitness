import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CloseIcon } from './../../../img/svg/close.svg';

const CloseButton = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

export default styled(CloseButton)`
  padding: 0;
`;
