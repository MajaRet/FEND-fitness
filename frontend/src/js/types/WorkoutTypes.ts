import { Exercise } from './ExerciseTypes';

export type WorkoutCompletionStatus = 'done' | 'current' | 'forbidden';

export interface ReducedWorkout {
  title: string;
  categories: string[];
  calories: number;
  duration: number;
}

export type WorkoutWithExercises = ReducedWorkout & {
  exercises: Exercise[];
};

export interface Workout {
  program: {
    _id: string;
    completedExercises: boolean[];
    currentWorkout: {
      status: WorkoutCompletionStatus;
      isLastWorkout: boolean;
      workout: WorkoutWithExercises;
    };
  };
}
