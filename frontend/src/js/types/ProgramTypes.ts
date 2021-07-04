export type Difficulty = 'beginner' | 'intermediate' | 'hard';

export interface CurrentWorkout {
  completedToday: boolean;
  lastCompletedDate: string;
  day: number;
}

export interface Workout {
  title: string;
  categories: string[];
  calories: number;
  duration: number;
}

export interface WorkoutWithDay {
  day: number;
  workout: Workout;
}

export interface Program {
  _id: string;
  isActive: boolean;
  isCompleted: boolean;
  currentWorkout: CurrentWorkout;
  title: string;
  duration: number;
  difficulty: Difficulty;
  focus: string;
  description: string;
  workouts: WorkoutWithDay[];
}

export interface DailyProgram {
  title: string;
  slug: string;
  workout: WorkoutWithDay & {
    done: boolean;
  };
}

export interface ProgramWrapper {
  program: Program;
}
