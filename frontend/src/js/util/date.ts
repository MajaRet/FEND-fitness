import { Program } from '../types/ProgramTypes';

// Check if the most recently completed workout was completed today.
// In that case, we don't let the user complete the next workout until
// the next day.
// NOTE: This is checked on client side because of apparent bugs in GROQ
// Datetime matching.
export const getCurrentDay = (program: Program | undefined): number => {
  if (!program || !program.currentWorkout) {
    return 1;
  }
  return program.currentWorkout.day;
};
