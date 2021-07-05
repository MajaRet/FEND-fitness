import styled from 'styled-components';

import { Exercise } from '../../../types/ExerciseTypes';

import WorkoutHeader from './WorkoutHeader';
import RepeatedExercise from '../exercise/RepeatedExercise';
import TimedExercise from '../exercise/TimedExercise';
import LabelButton from '../../elements/labels/LabelButton';
import { ColoredTextButton as TextButton } from '../../elements/buttons/ColoredTextButton';
import CompletedExercise from '../exercise/CompletedExercise';

const isPause = (exerciseTitle: string) => exerciseTitle === 'Pause';

const StyledStartedWorkout = styled('div')<StartedWorkoutProps>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  background-color: ${(props) =>
    isPause(props.exercise.title)
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

interface StartedWorkoutProps {
  exercise: Exercise;
  isFirst: boolean;
  isLast: boolean;
  setExerciseCompletion: (isCompleted: boolean) => void;
  progress: (delta: number) => void;
  completedExercises: boolean[];
  stopWorkout: () => void;
  exerciseIndex: number;
}

const StartedWorkout = (props: StartedWorkoutProps) => {
  const {
    exercise,
    isFirst,
    isLast,
    setExerciseCompletion,
    progress,
    completedExercises,
    stopWorkout,
    exerciseIndex,
  } = props;
  console.log(exercise);
  return (
    <StyledStartedWorkout {...props}>
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
          repeatExercise={() => setExerciseCompletion(false)}
        />
      ) : exercise.type === 'exerciseWithReps' && exercise.reps ? (
        <RepeatedExercise
          reps={exercise.reps}
          title={exercise.title}
          completeExercise={() => setExerciseCompletion(true)}
        />
      ) : exercise.type === 'exerciseWithDuration' && exercise.duration ? (
        <TimedExercise
          duration={exercise.duration}
          title={exercise.title}
          countdown={isPause(exercise.title) ? 0 : 3}
          completeExercise={() => setExerciseCompletion(true)}
          // Key used to force new rendering of an exercise following
          // another timed exercise.
          key={exerciseIndex}
        />
      ) : (
        'Error'
      )}
    </StyledStartedWorkout>
  );
};

export default StartedWorkout;
