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
  padding: 0;
`;
