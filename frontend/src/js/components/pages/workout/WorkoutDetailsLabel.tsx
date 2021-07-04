import { Workout } from '../../../types/ProgramTypes';

import Label from '../../elements/labels/Label';
import display from '../../../util/naming';

interface WorkoutDetailsLabelProps {
  workout: Workout;
}

const WorkoutDetailsLabel = ({ workout }: WorkoutDetailsLabelProps) => {
  const workoutCategories = workout.categories
    .map((cat) => display(cat))
    .join('/');
  return (
    <Label>
      {workout.calories} kcal &bull; {workout.duration} Min. &bull;{' '}
      {workoutCategories}
    </Label>
  );
};

export default WorkoutDetailsLabel;
