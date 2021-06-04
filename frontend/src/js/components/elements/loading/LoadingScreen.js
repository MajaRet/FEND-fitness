import styled from 'styled-components';
import React from 'react';

import LoadingSpinner from './LoadingSpinner';

const LoadingScreen = ({ className, color }) => {
  return (
    <div className={className}>
      <LoadingSpinner />
    </div>
  );
};

export default styled(LoadingScreen)`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;

  background-color: ${(props) => {
    return props.color || `rgb(${props.theme.backgroundPrimary})`;
  }};
`;
