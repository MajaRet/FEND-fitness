import React from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const WorkoutHeader = ({ className, completedExercises, children }) => {
  return (
    <div className={className}>
      {children}
      <ProgressBar completedExercises={completedExercises} />
    </div>
  );
};

export default styled(WorkoutHeader)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 35px;
`;
