import React from 'react';
import styled from 'styled-components';

import Label from '../../elements/labels/Label';
import display from '../../../util/naming';

const WorkoutDetailsLabel = ({ className, workout }) => {
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

export default styled(WorkoutDetailsLabel)``;
