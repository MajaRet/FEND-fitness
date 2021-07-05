import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
  updateCompletedExercises,
  completeCurrentWorkout,
  completeActiveProgram,
  useQuery,
} from '../../../api/sanity';
import { UserContext } from '../../../context';

import StartedWorkout from './StartedWorkout';
import WorkoutOverview from './WorkoutOverview';
import LoadingScreen from '../../elements/loading/LoadingScreen';
import BackButton from './../../elements/buttons/BackButton';

const Workout = () => {
  const query = `*[_type == "user" && name == $name] {
    "program": *[_type == "program" && slug.current == $programSlug] {
      _id,
      "completedExercises": select(
        ^.activeProgram.ActiveProgram._ref == _id => ^.activeProgram.completedExercises,
        true => [],
        ),
      "currentWorkout": workouts[day == $day] {
        "status": select(
          ^.^.activeProgram.ActiveProgram._ref == ^._id
          &&  ^.^.activeProgram.day > day => "done",
          ^.^.activeProgram.ActiveProgram._ref == ^._id
          && (
            day == 1
            || ^.^.activeProgram.dateOfLastWorkoutCompletion < $today
            )
          &&  ^.^.activeProgram.day == day => "current",
          true => "forbidden"
          ),
        "isLastWorkout": count(^.workouts) == $day,
        "workout": Workout-> {
          title,
          categories,
          description,
          duration,
          calories,
          "exercises": exercises[]{
            _type,
            duration,
            reps,
            exercise-> { title }
          }
        }
      }[0]
    }[0]
   }[0]`;

  const { programSlug, day } = useParams();
  const user = useContext(UserContext);

  const params = {
    name: user.name,
    programSlug,
    day: parseInt(day),
    today: new Date().toISOString().split('T')[0],
  };

  const { loading, data } = useQuery(query, params);

  const workout = data?.program?.currentWorkout?.workout;
  const programURL = `/program/${programSlug}`;
  console.log(data);

  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [allDone, setAllDone] = useState(false);

  const setCurrentExerciseCompletion = (completed) => {
    // If we complete an exercise, move on to the next.
    const moveOn = () => {
      if (completed) {
        setCurrentExercise((currEx) =>
          Math.min(currEx + 1, workout.exercises.length - 1)
        );
      }
    };

    // Either persist new completed exercise or the completion of the workout.
    const persistCompletion = () => {
      if (newCompleted.every((b) => b)) {
        if (data.program.currentWorkout.isLastWorkout) {
          completeActiveProgram(user.id, data.program._id);
        } else {
          completeCurrentWorkout(user.id);
        }
      } else {
        updateCompletedExercises(user.id, newCompleted);
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
      const complEx = data.program.completedExercises;
      setCompletedExercises(
        complEx && complEx.length > 0
          ? complEx
          : Array(workout.exercises.length).fill(
              data.program.currentWorkout.status === 'done'
            )
      );
      // Skip the already completed exercises.
      setCurrentExercise(
        Math.max(
          0,
          complEx.findIndex((b) => !b)
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
  } else if (data) {
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
            isStartable={data.program.currentWorkout.status === 'current'}
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
