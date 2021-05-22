import React, { Fragment, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import StartedWorkout from './StartedWorkout';
import WorkoutOverview from './WorkoutOverview';

const getFirstExercise = (completedExercises) =>
  Math.max(
    0,
    completedExercises.findIndex((b) => b)
  );

const Workout = ({ day, workoutId }) => {
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
  const { error, data } = useQuery(query);
  if (error) console.log(error);
  const workout = data?.Workout;
  const [workoutStarted, setWorkoutStarted] = useState(false);
  // TODO take completion status from the workout
  const [completedExercises, setCompletedExercises] = useState([]);

  useEffect(() => {
    if (data) {
      setCompletedExercises((complEx) =>
        complEx.length === 0
          ? Array(data.Workout.exercises.length).fill(false)
          : complEx
      );
    }
  }, [data]);

  // Note: As of now, the initial value will always be 0 because the
  // completedExercises array is initialized with only false values.
  const [currentExercise, setCurrentExercise] = useState(
    getFirstExercise(completedExercises)
  );

  const completeCurrentExercise = (completed = true) => {
    const newCompleted = [...completedExercises];
    newCompleted[currentExercise] = completed;
    setCompletedExercises(newCompleted);
  };

  if (data) {
    return (
      <Fragment>
        {workoutStarted ? (
          <StartedWorkout
            exercise={workout.exercises[currentExercise]}
            isFirst={currentExercise === 0}
            isLast={currentExercise === workout.exercises.length - 1}
            completeExercise={() => {
              completeCurrentExercise();
            }}
            progress={(delta) => {
              const i = currentExercise + delta;
              if (i >= 0 && i < workout.exercises.length) {
                setCurrentExercise(i);
              }
            }}
          />
        ) : (
          <WorkoutOverview
            workout={workout}
            day={day}
            completedExercises={completedExercises}
            startWorkout={() => {
              setWorkoutStarted(true);
            }}
          />
        )}
      </Fragment>
    );
  }
  return <div>Loading...</div>;
};

export default Workout;
