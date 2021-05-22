import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as CloseIcon } from './../../../../img/svg/close.svg';

const CloseLink = ({ className, to }) => {
  return (
    <Link className={className} to={to}>
      <CloseIcon />
    </Link>
  );
};

export default styled(CloseLink)``;
