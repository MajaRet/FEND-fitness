import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

import WorkoutList from './WorkoutList';
import ProgramHeader from './ProgramHeader';
import ProgramChart from './ProgramChart';
import ProgramDescription from './ProgramDescription';
import CloseLink from '../../elements/links/CloseLink';
import Button from '../../elements/buttons/Button';
import Workout from '../workout/Workout';

const Program = ({ className }) => {
  const [workoutOpen, setWorkoutOpen] = useState(false);
  const { id } = useParams();
  const query = gql`
    query GetProgram {
      Program(id: "${id}") {
        title
        duration
        difficulty
        focus
        workouts {
          day
          Workout { 
            _id
            title
            categories
            calories
            duration
          }
        }
      }
    }
  `;

  const { error, data } = useQuery(query);

  if (data) {
    const program = data.Program;
    // TODO Don't just take the first workout, take the current one.
    // Need support in the backend for that.
    const currentWorkout = program.workouts[0];
    if (workoutOpen)
      return (
        <Workout
          workoutId={currentWorkout.Workout._id}
          day={currentWorkout.day}
          closeWorkout={() => setWorkoutOpen(false)}
        />
      );

    return (
      <div className={className}>
        <CloseLink to="/browse" />

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
      <CloseLink to="/browse" />
      <p>Wird geladen...</p>
    </div>
  );
};

export default styled(Program)`
  > :not(.start-button) {
    padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  }

  ${CloseLink} {
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
