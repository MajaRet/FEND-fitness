import React from 'react';
import styled from 'styled-components';

import LoadingSpinner from './LoadingSpinner';

interface LoadingScreenProps {
  color?: string;
}

const StyledLoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;

  background-color: ${(props) => {
    return props.color || `rgb(${props.theme.backgroundPrimary})`;
  }};
`;

const LoadingScreen = (_: LoadingScreenProps) => {
  return (
    <StyledLoadingScreen>
      <LoadingSpinner />
    </StyledLoadingScreen>
  );
};

export default LoadingScreen;
