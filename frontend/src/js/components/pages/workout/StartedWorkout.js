import React from 'react';
import styled from 'styled-components';

import Exercise from '../exercise/Exercise';
import LabelButton from './../../elements/labels/LabelButton';

/* 
            <LabelButton
              onClick={() => {
                setWorkoutStarted(false);
                // Set the exercise to pick up from to the first incomplete one.
                setCurrentExercise(getFirstExercise(completedExercises));
              }}
            >
              beenden
            </LabelButton>
*/
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
