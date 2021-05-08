import React, { useState } from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';
import StartedWorkout from './StartedWorkout';
import WorkoutDetails from './WorkoutDetails';
import Label from './../labels/Label';
import LabelButton from './../labels/Label';

const getFirstExercise = (completedExercises) =>
  Math.max(
    0,
    completedExercises.findIndex((b) => b)
  );

// TODO: Pass program ID and workout ID (or day) instead and use a useQuery
// hook to get the workout data.
const Workout = ({ className, workout }) => {
  const [workoutStarted, setWorkoutStarted] = useState(false);
  // TODO take completion status from the workout
  const [completedExercises, setCompletedExercises] = useState(
    Array(workout.exercises.length).fill(false)
  );

  // Note: As of now, the initial value will always be 0 because the
  // completedExercises array is initialized with only false values.
  const [currentExercise, setCurrentExercise] = useState(
    getFirstExercise(completedExercises)
  );

  const completeExercise = (i, completed = true) => {
    const newCompleted = [...completedExercises];
    newCompleted[i] = completed;
    setCompletedExercises(newCompleted);
  };

  return (
    <div className={className}>
      {workoutStarted ? (
        <LabelButton
          onClick={() => {
            setWorkoutStarted(false);
            // Set the exercise to pick up from to the first incomplete one.
            setCurrentExercise(getFirstExercise(completedExercises));
          }}
        >
          beenden
        </LabelButton>
      ) : (
        <Label>{workout.title}</Label>
      )}
      <ProgressBar completedExercises={completedExercises} />
      {workoutStarted ? (
        <StartedWorkout
          exercise={workout.exercises[currentExercise]}
          isFirst={currentExercise === 0}
          isLast={currentExercise === workout.exercises.length - 1}
          completeExercise={() => {
            completeExercise(currentExercise);
          }}
          progress={(delta) => {
            const i = currentExercise + delta;
            if (i >= 0 && i < workout.exercises.length) {
              setCurrentExercise(i);
            }
          }}
        />
      ) : (
        <WorkoutDetails
          startWorkout={() => {
            setWorkoutStarted(true);
          }}
        />
      )}
    </div>
  );
};

export default styled(Workout)``;
