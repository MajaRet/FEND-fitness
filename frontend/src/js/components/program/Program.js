import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

import WorkoutList from './WorkoutList';
import ProgramHeader from './ProgramHeader';
import ProgramChart from './ProgramChart';
import ProgramDescription from './ProgramDescription';
import CloseButton from './../buttons/CloseButton';

const Program = ({ closeOverlay, className, programId }) => {
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
  > * {
    padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  }

  ${CloseButton} {
    position: absolute;
    top: var(--standard-padding-vertical);
    right: var(--standard-padding-horizontal);

    z-index: 2;

    padding: 0;
  }

  background-color: ${(props) => `rgb(${props.theme.backgroundPrimary})`};
`;
