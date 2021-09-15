import React, { FC } from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const StyledWorkoutHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 35px;

  width: 100%;
`;

interface WorkoutHeaderProps {
  completedExercises: boolean[];
  currentExercise?: number;
  className?: string;
}

const WorkoutHeader: FC<WorkoutHeaderProps> = ({
  completedExercises,
  currentExercise,
  children,
  className,
}) => {
  return (
    <StyledWorkoutHeader className={className}>
      {children}
      <ProgressBar
        completedExercises={completedExercises}
        currentExercise={currentExercise}
      />
    </StyledWorkoutHeader>
  );
};

export default WorkoutHeader;
