import React from 'react';
import styled from 'styled-components';

import WorkoutDetailsLabel from './WorkoutDetailsLabel';

const WorkoutDetails = ({ className, workout, day }) => {
  return (
    <div className={className}>
      <h1>Tag {day}</h1>
      <WorkoutDetailsLabel workout={workout} className="details" />
    </div>
  );
};

export default styled(WorkoutDetails)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
`;
