import React from 'react';
import styled from 'styled-components';

import { WorkoutWithDay } from '../../../types/ProgramTypes';

import WorkoutDetailsLabel from '../workout/WorkoutDetailsLabel';
import { ReactComponent as HeartIcon } from './../../../../img/svg/heart.svg';

const StyledWorkoutItemInfo = styled.div`
  flex-grow: 1;

  padding: 15px;

  background-color: ${(props) => `rgb(${props.theme.backgroundDefault})`};

  .favorite {
    margin-top: 30px;
    path {
      stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    }
  }
`;

interface WorkoutItemInfoProps {
  workout: WorkoutWithDay;
}

const WorkoutItemInfo = ({ workout }: WorkoutItemInfoProps) => {
  // NOTE: The heart icon is not currently a button and doesn't do anything
  // when clicked.

  return (
    <StyledWorkoutItemInfo className="workout-info">
      <p>Tag {workout.day}</p>
      <WorkoutDetailsLabel workout={workout.workout} />
      <HeartIcon className="favorite" />
    </StyledWorkoutItemInfo>
  );
};

export default WorkoutItemInfo;
