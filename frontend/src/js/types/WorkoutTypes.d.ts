export type WorkoutCompletionStatus = 'done' | 'current' | 'forbidden';

export interface ReducedWorkout {
  title: string;
  categories: string[];
  calories: number;
  duration: number;
}

export interface Workout extends ReducedWorkout {
  exercises: Exercise[];
}

export interface WorkoutWithCompletionStatus extends Workout {
  completedExercises: boolean[];
  isLastWorkout: boolean;
}
