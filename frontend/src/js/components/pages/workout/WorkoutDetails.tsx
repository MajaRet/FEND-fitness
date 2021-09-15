import React from 'react';
import styled from 'styled-components';

import { Workout } from '../../../types/WorkoutTypes';

import WorkoutDetailsLabel from './WorkoutDetailsLabel';

const StyledWorkoutDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
`;

interface WorkoutDetailsProps {
  workout: Workout;
  day: number;
}

const WorkoutDetails = ({ workout, day }: WorkoutDetailsProps) => {
  return (
    <StyledWorkoutDetails className="workout-details">
      <h1>Tag {day}</h1>
      <WorkoutDetailsLabel workout={workout} className="details" />
    </StyledWorkoutDetails>
  );
};

export default styled(WorkoutDetails)``;
