import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { WorkoutWithExercises as Workout } from '../../../types/WorkoutTypes';

import WorkoutDetails from './WorkoutDetails';
import WorkoutHeader from './WorkoutHeader';
import Label from '../../elements/labels/Label';
import Button from '../../elements/buttons/Button';
import BackButton from '../../elements/buttons/BackButton';

const StyledWorkoutOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  height: 100%;
  padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);

  background-image: ${(props) => props.theme.backgroundGradient};

  .workout-details {
    flex-grow: 1;
  }

  .start-button {
    margin-bottom: 75px;
  }

  .text-done {
    text-align: center;
    margin-bottom: 75px;
  }
`;

interface WorkoutOverviewProps {
  workout: Workout;
  day: number;
  completedExercises: boolean[];
  startWorkout: () => void;
  programURL: string;
  allDone: boolean;
  isStartable: boolean;
}

const WorkoutOverview = ({
  workout,
  day,
  completedExercises,
  startWorkout,
  programURL,
  allDone,
  isStartable,
}: WorkoutOverviewProps) => {
  return (
    <StyledWorkoutOverview>
      <BackButton as={Link} to={programURL} />
      <WorkoutHeader completedExercises={completedExercises}>
        <Label>{workout.title}</Label>
      </WorkoutHeader>
      <WorkoutDetails workout={workout} day={day} />
      {allDone ? (
        <h2 className="text-done">
          Herzlichen Glückwunsch, das Workout ist abgeschlossen!
        </h2>
      ) : isStartable ? (
        <Button onClick={startWorkout} className="start-button">
          los
        </Button>
      ) : null}
    </StyledWorkoutOverview>
  );
};

export default WorkoutOverview;
