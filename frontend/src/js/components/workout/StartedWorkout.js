import React from 'react';
import styled from 'styled-components';

import Exercise from '../exercise/Exercise';

const StartedWorkout = ({
  className,
  exercise,
  isFirst,
  isLast,
  completeExercise,
  progress,
}) => {
  return (
    <div className={className}>
      <button disabled={isFirst} onClick={progress(-1)}>
        Left
      </button>
      <button disabled={isLast} onClick={progress(-1)}>
        Right
      </button>
      <p>{exercise.title}</p>
      <button onClick={completeExercise()}>Complete</button>
      <Exercise />
    </div>
  );
};

export default styled(StartedWorkout)``;
