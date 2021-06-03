import React from 'react';
import styled from 'styled-components';

import Label from './../labels/Label';

const WorkoutInfo = ({ className, workout }) => {
  return (
    <div className={className}>
      <p>{workout.title}</p>
      <p>{workout.program}</p>
      <Label>
        {workout.calories} kcal &bull; {workout.duration} Min. &bull;{' '}
        {workout.category}
      </Label>
    </div>
  );
};

// TODO make saner
WorkoutInfo.defaultProps = {
  className: '',
  workout: {
    title: 'Zwergweitwurf',
    program: 'Fit in 7 Wochen mit 7 Zwergen',
    calories: 0,
    duration: 0,
    category: 'Kraft',
  },
};

export default styled(WorkoutInfo)``;
