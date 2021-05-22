import React from 'react';
import styled from 'styled-components';

import WorkoutHeader from './WorkoutHeader';
import RepeatedExercise from '../exercise/RepeatedExercise';
// import TimedExercise from '../exercise/TimedExercise';
import LabelButton from './../../elements/labels/LabelButton';

const StartedWorkout = ({
  className,
  exercise,
  isFirst,
  isLast,
  completeExercise,
  progress,
  completedExercises,
  stopWorkout,
  exerciseIndex,
}) => {
  return (
    <div className={className}>
      <WorkoutHeader
        completedExercises={completedExercises}
        currentExercise={exerciseIndex}
      >
        <LabelButton onClick={stopWorkout}>beenden</LabelButton>
      </WorkoutHeader>
      <button
        disabled={isFirst}
        onClick={() => {
          console.log('go left');
          progress(-1);
        }}
      >
        Left
      </button>
      <button
        disabled={isLast}
        onClick={() => {
          console.log('go right');
          progress(1);
        }}
      >
        Right
      </button>
      <p>Übung: {exercise.exercise.title}</p>
      {exercise.__typename === 'ExerciseWithReps' ? (
        <RepeatedExercise
          className="exercise"
          reps={exercise.reps}
          exercise={exercise.exercise}
          completeExercise={completeExercise}
        />
      ) : exercise.__typename === 'ExerciseWithDuration' ? (
        exercise.duration
      ) : (
        'Error'
      )}
    </div>
  );
};

export default styled(StartedWorkout)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  height: 100%;
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  background-color: ${(props) =>
    props.exercise.exercise.title === 'Pause'
      ? `rgb(${props.theme.backgroundPrimary})`
      : `rgb(${props.theme.backgroundSecondary})`};

  .exercise {
    flex-grow: 1;
  }
`;
