import React from 'react';
import styled from 'styled-components';

import Label from '../../elements/labels/Label';

import { ReactComponent as HeartIcon } from './../../../../img/svg/heart.svg';
import display from '../../util/naming';

const WorkoutItemInfo = ({ className, workout }) => {
  // NOTE: The heart icon is not currently a button and doesn't do anything
  // when clicked.
  console.log(workout);
  const workoutCategories = workout.Workout.categories
    .map((cat) => display(cat))
    .join('/');
  return (
    <div className={className}>
      <p>Tag {workout.week}</p>
      <Label>
        {workout.Workout.calories} kcal &bull; {workout.Workout.duration} Min.
        &bull; {workoutCategories}
      </Label>
      <HeartIcon className="favorite" />
    </div>
  );
};

export default styled(WorkoutItemInfo)`
  flex-grow: 1;

  padding: 15px;

  background-color: ${(props) => `rgb(${props.theme.backgroundDefault})`};

  .favorite {
    margin-top: 30px;
  }
`;
