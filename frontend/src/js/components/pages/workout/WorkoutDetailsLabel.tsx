import React from 'react';

import { ReducedWorkout as Workout } from '../../../types/WorkoutTypes';

import Label from '../../elements/labels/Label';
import display from '../../../util/naming';

interface WorkoutDetailsLabelProps {
  workout: Workout;
  className?: string;
}

const WorkoutDetailsLabel = ({
  workout,
  className,
}: WorkoutDetailsLabelProps) => {
  const workoutCategories = workout.categories
    .map((cat) => display(cat))
    .join('/');
  return (
    <Label className={className}>
      {workout.calories} kcal &bull; {workout.duration} Min. &bull;{' '}
      {workoutCategories}
    </Label>
  );
};

export default WorkoutDetailsLabel;
