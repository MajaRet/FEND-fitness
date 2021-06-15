// Check if the most recently completed workout was completed today.
// In that case, we don't let the user complete the next workout until
// the next day.
// NOTE: This is checked on client side because of apparent bugs in GROQ
// Datetime matching.
export const getCurrentDay = (program) => {
  if (!program || !program.currentWorkout) {
    return 1;
  }

  const { day, lastCompletedDate } = program.currentWorkout;
  const today = new Date().toISOString().split('T')[0];
  const todaysWorkoutCompleted = lastCompletedDate.match(today);
  const currentDay = todaysWorkoutCompleted ? Math.max(1, day - 1) : day;
  return currentDay;
};
