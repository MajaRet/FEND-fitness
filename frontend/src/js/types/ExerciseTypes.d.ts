export type ExerciseType = 'exerciseWithDuration' | 'exerciseWithReps';

export interface Exercise {
  title: string;
}
export interface QuantifiedExercise {
  type: ExerciseType;
  quantity: number;
  exercise: Exercise;
}
