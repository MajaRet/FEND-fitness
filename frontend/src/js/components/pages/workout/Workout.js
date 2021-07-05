import React, { Fragment, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import StartedWorkout from './StartedWorkout';
import WorkoutOverview from './WorkoutOverview';
import LoadingScreen from '../../elements/loading/LoadingScreen';
import BackButton from './../../elements/buttons/BackButton';

const Workout = ({ day, workoutId, closeWorkout }) => {
  const query = gql`
  query {
    Workout(id: "${workoutId}") {
      title
      categories
      calories
      duration
      exercises {
        __typename
        ... on ExerciseWithReps {
           reps
           exercise {
            title
            }
         }
        ... on ExerciseWithDuration {
          duration
          exercise {
             title
           }
        }
       }
    }
}`;
  const { error, loading, data } = useQuery(query);
  if (error) console.log(error);
  const workout = data?.Workout;
  const [workoutStarted, setWorkoutStarted] = useState(false);
  // TODO take completion status from the workout
  const [completedExercises, setCompletedExercises] = useState([]);
  const [allDone, setAllDone] = useState(false);

  const completeCurrentExercise = (completed) => {
    const newCompleted = [...completedExercises];
    newCompleted[currentExercise] = completed;
    setCompletedExercises(newCompleted);

    // If we complete an exercise, move on to the next.
    if (completed) {
      setCurrentExercise((currEx) =>
        Math.min(currEx + 1, workout.exercises.length - 1)
      );
    }
  };
  const getFirstIncompleteExercise = () => {
    return Math.max(
      0,
      completedExercises.findIndex((b) => !b)
    );
  };

  // Note: As of now, the initial value will always be 0 because the
  // completedExercises array is initialized with only false values.
  const [currentExercise, setCurrentExercise] = useState(
    getFirstIncompleteExercise()
  );

  // Whenever an exercise is completed, check if the workout is completely done.
  useEffect(() => {
    if (completedExercises.length > 0 && completedExercises.every((b) => b)) {
      setAllDone(true);
    }
  }, [completedExercises]);

  useEffect(() => {
    if (data) {
      setCompletedExercises((complEx) =>
        complEx.length === 0
          ? Array(data.Workout.exercises.length).fill(false)
          : complEx
      );
    }
  }, [data]);

  if (loading) {
    return (
      <Fragment>
        <BackButton onClick={closeWorkout} />
        <LoadingScreen />
      </Fragment>
    );
  } else if (data) {
    return (
      <Fragment>
        {workoutStarted && !allDone ? (
          <StartedWorkout
            exercise={workout.exercises[currentExercise]}
            exerciseIndex={currentExercise}
            isFirst={currentExercise === 0}
            isLast={currentExercise === workout.exercises.length - 1}
            setExerciseCompleted={(completed) => {
              completeCurrentExercise(completed);
            }}
            stopWorkout={() => {
              setWorkoutStarted(false);
              setCurrentExercise(getFirstIncompleteExercise());
            }}
            progress={(delta) => {
              const i = currentExercise + delta;
              if (i >= 0 && i < workout.exercises.length) {
                setCurrentExercise(i);
              }
            }}
            completedExercises={completedExercises}
          />
        ) : (
          <WorkoutOverview
            workout={workout}
            day={day}
            completedExercises={completedExercises}
            startWorkout={() => {
              setWorkoutStarted(true);
            }}
            closeWorkout={closeWorkout}
            allDone={allDone}
          />
        )}
      </Fragment>
    );
  }
  return <div>Fehler!</div>;
};

export default Workout;
