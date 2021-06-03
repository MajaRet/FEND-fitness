import React from 'react';
import styled from 'styled-components';

import InfoBarElem from './InfoBarElem';

const InfoBar = ({ className, type, difficulty, duration }) => {
  return (
    <div className={className}>
      <InfoBarElem text={type} />
      <InfoBarElem text={difficulty} />
      <InfoBarElem text={`${Math.round(duration / 7)} Wochen`} />
    </div>
  );
};

export default styled(InfoBar)`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
`;
