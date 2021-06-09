import React from 'react';
import styled from 'styled-components';

import WorkoutHeader from './WorkoutHeader';
import RepeatedExercise from '../exercise/RepeatedExercise';
import TimedExercise from '../exercise/TimedExercise';
import LabelButton from './../../elements/labels/LabelButton';
import TextButton from './../../elements/buttons/ColoredTextButton';
import CompletedExercise from '../exercise/CompletedExercise';

const isPause = (exercise) => exercise.title === 'Pause';

const StartedWorkout = ({
  className,
  exercise,
  isFirst,
  isLast,
  setExerciseCompleted,
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
        className="header"
      >
        <LabelButton onClick={stopWorkout}>beenden</LabelButton>
      </WorkoutHeader>
      <TextButton
        className="skip-button left"
        disabled={isFirst}
        size={80}
        onClick={() => {
          progress(-1);
        }}
      >
        &lsaquo;
      </TextButton>
      <TextButton
        className="skip-button right"
        disabled={isLast}
        size={80}
        onClick={() => {
          progress(1);
        }}
      >
        &rsaquo;
      </TextButton>
      {completedExercises[exerciseIndex] ? (
        <CompletedExercise
          exercise={exercise}
          repeatExercise={() => setExerciseCompleted(false)}
        />
      ) : exercise.__typename === 'ExerciseWithReps' ? (
        <RepeatedExercise
          reps={exercise.reps}
          exercise={exercise.exercise}
          completeExercise={() => setExerciseCompleted(true)}
        />
      ) : exercise.__typename === 'ExerciseWithDuration' ? (
        <TimedExercise
          className="exercise timed"
          duration={exercise.duration}
          exercise={exercise.exercise}
          countdown={isPause(exercise.exercise) ? 0 : 3}
          completeExercise={() => setExerciseCompleted(true)}
          // Key used to force rerendering of the exercise
          key={exerciseIndex}
        />
      ) : (
        'Error'
      )}
    </div>
  );
};

export default styled(StartedWorkout)`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  background-color: ${(props) =>
    isPause(props.exercise.exercise)
      ? `rgb(${props.theme.backgroundPrimary})`
      : `rgb(${props.theme.backgroundSecondary})`};

  .title,
  .header {
    height: 23%;
  }

  .title,
  .subtitle {
    text-align: center;
  }

  .task {
    flex-grow: 1;

    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    &.repeated {
      font-size: 6.4rem;
    }
  }

  .skip-button {
    position: absolute;
    top: 48%;

    &.left {
      left: 5%;
    }

    &.right {
      right: 5%;
    }
  }

  .done {
    position: absolute;
    bottom: 5%;
  }
`;
