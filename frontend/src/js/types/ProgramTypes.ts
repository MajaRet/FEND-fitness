import { ReducedWorkout as Workout } from './WorkoutTypes';

export type Difficulty = 'beginner' | 'intermediate' | 'hard';

export interface CurrentWorkout {
  completedToday: boolean;
  lastCompletedDate: string;
  day: number;
}

export interface WorkoutWithDay {
  day: number;
  workout: Workout;
}

export interface Program {
  _id: string;
  isActive: boolean;
  isCompleted: boolean;
  currentWorkout: null | CurrentWorkout;
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
