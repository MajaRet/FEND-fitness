import React from 'react';
import styled from 'styled-components';

import WorkoutDetails from './WorkoutDetails';
import WorkoutHeader from './WorkoutHeader';
import Label from './../../elements/labels/Label';
import Button from './../../elements/buttons/Button';

const WorkoutOverview = ({
  className,
  workout,
  day,
  completedExercises,
  startWorkout,
}) => {
  return (
    <div className={className}>
      <WorkoutHeader completedExercises={completedExercises}>
        <Label>{workout.title}</Label>
      </WorkoutHeader>
      <WorkoutDetails workout={workout} day={day} />
      <Button onClick={startWorkout} className="start-button">
        los
      </Button>
    </div>
  );
};

export default styled(WorkoutOverview)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  height: 100%;
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  background-color: red;

  background-image: ${(props) => props.theme.backgroundGradient};

  ${WorkoutDetails} {
    flex-grow: 1;
  }

  .start-button {
    margin-bottom: 75px;
  }
`;
