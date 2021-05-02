import React from 'react';
import styled from 'styled-components';

import Label from './../labels/Label';

import { ReactComponent as HeartIcon } from './../../../img/svg/heart.svg';

const WorkoutItemInfo = ({ className, workout }) => {
  // NOTE: The heart icon is not currently a button and doesn't do anything
  // when clicked.
  return (
    <div className={className}>
      <p>Tag {workout.day}</p>
      <Label>
        {workout.calories} kcal &bull; {workout.duration} Min. &bull;{' '}
        {workout.category}
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
