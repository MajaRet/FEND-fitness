export type ExerciseType = 'exerciseWithDuration' | 'exerciseWithReps';

export interface Exercise {
  type: ExerciseType;
  duration?: number;
  reps?: number;
  title: string;
}
