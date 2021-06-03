import React from 'react';
import styled from 'styled-components';

import WorkoutItemVideo from './WorkoutItemStartButton';
import WorkoutItemInfo from './WorkoutItemInfo';

const WorkoutListItem = ({ className, workout }) => {
  return (
    <div className={className}>
      <WorkoutItemVideo />
      <WorkoutItemInfo workout={workout} />
    </div>
  );
};

export default styled(WorkoutListItem)`
  display: flex;

  border-radius: 5px;

  overflow: hidden;
`;
