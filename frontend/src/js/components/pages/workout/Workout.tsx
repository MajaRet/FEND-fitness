import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGet, useLazyPost } from '../../../api/request';
import { WorkoutWithCompletionStatus } from '../../../types/WorkoutTypes';

import StartedWorkout from './StartedWorkout';
import WorkoutOverview from './WorkoutOverview';
import LoadingScreen from '../../elements/loading/LoadingScreen';
import BackButton from '../../elements/buttons/BackButton';

const Workout = () => {
  // const query = `*[_type == "user" && name == $name] {
  //   "program": *[_type == "program" && slug.current == $programSlug] {
  //     _id,
  //     "completedExercises": select(
  //       ^.activeProgram.ActiveProgram._ref == _id => ^.activeProgram.completedExercises,
  //       true => [],
  //       ),
  //     "currentWorkout": workouts[day == $day] {
  //       "status": select(
  //         ^.^.activeProgram.ActiveProgram._ref == ^._id
  //         &&  ^.^.activeProgram.day > day => "done",
  //         ^.^.activeProgram.ActiveProgram._ref == ^._id
  //         && (
  //           day == 1
  //           || ^.^.activeProgram.dateOfLastWorkoutCompletion < $today
  //           )
  //         &&  ^.^.activeProgram.day == day
  //         || day == 1 => "current",
  //         true => "forbidden"
  //         ),
  //       "isLastWorkout": count(^.workouts) == $day,
  //       "workout": Workout-> {
  //         title,
  //         categories,
  //         duration,
  //         calories,
  //         "exercises": exercises[]{
  //           "type": _type,
  //           duration,
  //           reps,
  //           "title": exercise->.title
  //         }
  //       }
  //     }[0]
  //   }[0]
  //  }[0]`;

  const { programSlug, day } =
    useParams<{ programSlug: string; day: string }>();

  const { loading, data } = useGet<WorkoutWithCompletionStatus>(
    `/api/programs/${programSlug}/${day}`
  );

  const [updateProgramStatus] = useLazyPost(`/api/programs/current`);

  const workout = data;
  const programURL = `/programs/${programSlug}`;

  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  const [allDone, setAllDone] = useState(false);

  const setCurrentExerciseCompletion = (completed: boolean) => {
    // If we complete an exercise, move on to the next.
    const moveOn = () => {
      if (completed && workout) {
        setCurrentExercise((currEx) =>
          Math.min(currEx + 1, workout.exercises.length - 1)
        );
      }
    };

    // Either persist new completed exercise or the completion of the workout.
    const persistCompletion = () => {
      if (!workout) return;
      if (newCompleted.every((b) => b)) {
        // The whole program was completed
        if (workout.isLastWorkout) {
          updateProgramStatus({ action: 'completeProgram' });
          // The workout was completed
        } else {
          updateProgramStatus({ action: 'completeWorkout' });
        }
      }
      // An exercise in the workout was completed or reverted
      else {
        updateProgramStatus({
          action: 'updateCompletedExercises',
          completedExercises: newCompleted,
        });
      }
    };

    const newCompleted = [...completedExercises];
    newCompleted[currentExercise] = completed;
    setCompletedExercises(newCompleted);
    persistCompletion();
    moveOn();
  };

  const getFirstIncompleteExercise = () => {
    return Math.max(
      0,
      completedExercises.findIndex((b) => !b)
    );
  };

  // Note: As of now, the initial value will always be 0 because the
  // completedExercises array is initialized with only false values.
  const [currentExercise, setCurrentExercise] = useState<number>(
    getFirstIncompleteExercise()
  );

  // Whenever an exercise is completed, check if the workout is completely done.
  useEffect(() => {
    if (completedExercises.length > 0 && completedExercises.every((b) => b)) {
      setAllDone(true);
    }
  }, [completedExercises]);

  useEffect(() => {
    if (workout) {
      setCompletedExercises(workout.completedExercises);
      // Skip to the first incomplete exercise.
      setCurrentExercise(
        Math.max(
          0,
          workout.completedExercises.findIndex((b) => !b)
        )
      );
    }
  }, [data, workout]);

  if (loading) {
    return (
      <Fragment>
        <BackButton to={programURL} />
        <LoadingScreen />
      </Fragment>
    );
  } else if (workout) {
    return (
      <Fragment>
        {workoutStarted && !allDone ? (
          <StartedWorkout
            exercise={workout.exercises[currentExercise]}
            exerciseIndex={currentExercise}
            isFirst={currentExercise === 0}
            isLast={currentExercise === workout.exercises.length - 1}
            setExerciseCompletion={setCurrentExerciseCompletion}
            stopWorkout={() => {
              setWorkoutStarted(false);
              setCurrentExercise(getFirstIncompleteExercise());
            }}
            progress={(delta: number) => {
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
            day={parseInt(day, 10)}
            completedExercises={completedExercises}
            startWorkout={() => {
              setWorkoutStarted(true);
            }}
            programURL={programURL}
            allDone={allDone}
          />
        )}
      </Fragment>
    );
  }
  return <div>Fehler!</div>;
};

export default Workout;
