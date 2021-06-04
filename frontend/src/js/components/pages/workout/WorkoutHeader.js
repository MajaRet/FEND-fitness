import React from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const WorkoutHeader = ({
  className,
  completedExercises,
  currentExercise,
  children,
}) => {
  return (
    <div className={className}>
      {children}
      <ProgressBar
        completedExercises={completedExercises}
        currentExercise={currentExercise}
      />
    </div>
  );
};

export default styled(WorkoutHeader)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 35px;

  width: 100%;
`;
