import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ className, numberOfExercises, completedExercises }) => {
  return (
    <div className={className}>
      ProgressBar, {numberOfExercises}, {completedExercises}
    </div>
  );
};

export default styled(ProgressBar)``;
