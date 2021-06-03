import React from 'react';
import styled from 'styled-components';

import InfoBarElem from './InfoBarElem';
import display from '../../../util/naming';

const InfoBar = ({ className, type, difficulty, duration }) => {
  return (
    <div className={className}>
      <InfoBarElem text={display(type)} />
      <InfoBarElem text={display(difficulty)} />
      <InfoBarElem text={`${duration} Wochen`} />
    </div>
  );
};

export default styled(InfoBar)`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
`;
