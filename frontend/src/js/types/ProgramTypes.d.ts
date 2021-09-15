export type Difficulty = 'beginner' | 'intermediate' | 'hard';

export interface WorkoutWithDay {
  day: number;
  workout: Workout;
}

export interface Program {
  _id: string;
  slug: string;
  isActive: boolean;
  isCompleted: boolean;
  isNewProgram: boolean;
  isFavorite: boolean;
  currentDay?: number;
  title: string;
  duration: number;
  difficulty: Difficulty;
  focus: string;
  description: string;
  workouts: WorkoutWithDay[];
}

export interface ActiveProgram {
  currentWorkout: Workout;
  completedExercises: boolean[];
  program: Program;
  currentDay: number;
}
