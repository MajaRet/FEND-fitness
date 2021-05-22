import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

import WorkoutList from './WorkoutList';
import ProgramHeader from './ProgramHeader';
import ProgramChart from './ProgramChart';
import ProgramDescription from './ProgramDescription';
import CloseButton from '../../buttons/CloseButton';
import Button from '../../buttons/Button';
import Workout from '../workout/Workout';

const Program = ({ closeOverlay, className, programId }) => {
  const [workoutOpen, setWorkoutOpen] = useState(false);

  const query = gql`
    query GetProgram {
      Program(id: "${programId}") {
        title
        duration
        difficulty
        focus
        workouts {
          week
          Workout { 
            _id
            title
            categories
            calories
          }
        }
      }
    }
  `;

  /*
query GetPrograms($id: ID!) {
  Program(id: $id) {
    title
  }
}
*/
  const { error, data } = useQuery(query);

  if (data) {
    const program = data.Program;
    // TODO Don't just take the first workout, take the current one.
    if (workoutOpen)
      return (
        <Workout
          workoutId={program.workouts[0].Workout._id}
          closeWorkout={() => setWorkoutOpen(false)}
        />
      );

    return (
      <div className={className}>
        <CloseButton onClick={closeOverlay} />

        <Fragment>
          <ProgramHeader program={program} />
          <ProgramDescription program={program} />
          <ProgramChart
            categories={program.workouts.flatMap(
              ({ Workout }) => Workout.categories
            )}
          />
          <WorkoutList
            workouts={program.workouts}
            duration={program.duration}
          />
          <Button
            className="start-button"
            onClick={() => {
              setWorkoutOpen(true);
            }}
          >
            jetzt starten
          </Button>
        </Fragment>
      </div>
    );
  }

  // TODO remove
  if (error) {
    console.log(error);
  }

  return (
    <div className={className}>
      <CloseButton onClick={closeOverlay} />
      <p>Wird geladen...</p>
    </div>
  );
};

export default styled(Program)`
  > :not(.start-button) {
    padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  }

  ${CloseButton} {
    position: absolute;
    top: var(--standard-padding-vertical);
    right: var(--standard-padding-horizontal);

    z-index: 2;

    padding: 0;
  }

  .start-button {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 25px;
  }

  background-color: ${(props) => `rgb(${props.theme.backgroundPrimary})`};
`;
