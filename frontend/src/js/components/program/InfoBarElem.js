import React from 'react';
import styled from 'styled-components';

import CapitalLabel from './../labels/CapitalLabel';

const InfoBarElem = ({ className, text }) => {
  return (
    <div className={className}>
      <div className="circle"></div>
      <CapitalLabel>{text}</CapitalLabel>
    </div>
  );
};

export default styled(InfoBarElem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 4px;

  .circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;

    background-color: ${(props) => props.theme.backgroundPrimary};
  }
`;
