import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartIcon } from './../../../img/svg/heart.svg';

const CardHeader = ({ className, isNew }) => {
  // The heart icon button does not currently do anything.
  // TODO: Give it functionality.
  return (
    <div className={className}>
      <button>
        <HeartIcon />
      </button>
      {isNew ? <p>Neu</p> : null}
    </div>
  );
};

export default styled(CardHeader)`
  display: flex;
  justify-content: space-between;

  width: 90%;
`;
