import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useGet } from '../../../api/request';

import { ActiveProgram } from '../../../types/ProgramTypes';

import WorkoutInfo from './WorkoutInfo';
import { ReactComponent as WorkoutImage } from './../../../../img/svg/Programme large.svg';
import LabelLink from '../../elements/labels/LabelLink';
import LoadingSpinner from '../../elements/loading/LoadingSpinner';

// Utility function to generate a way to refer to the user. Randomized for
// variety.
const generateName = () => {
  const names = ['Sportskanone', 'Partner', 'Champion'];
  const randomNum = Math.floor(Math.random() * names.length);
  return names[randomNum];
};
const StyledWorkoutImage = styled(WorkoutImage)`
  margin: 10px 0;
  width: 100%;
`;

const StyledDashboard = styled.div`
  padding-top: 45px;
  padding-bottom: var(--nav-height);

  h1 {
    margin-bottom: 50px;
  }

  .subheader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const Dashboard = () => {
  const { error, loading, data } = useGet<ActiveProgram>(
    '/api/programs/current'
  );

  const currHours = new Date().getHours();
  // Generate a name only once, not on every render.
  const generatedName = useMemo(() => generateName(), []);
  const timeOfDay =
    currHours < 11 ? 'Morgen' : currHours < 17 ? 'Tag' : 'Abend';
  return (
    <StyledDashboard>
      <h1>
        Guten
        <br />
        {timeOfDay},
        <br />
        {generatedName}!
      </h1>
      <main>
        <div className="subheader">
          <h2>Dein aktuelles Workout</h2>
          {data ? (
            <LabelLink to={`/programs/${data.program.slug}`}>
              Trainingsplan
            </LabelLink>
          ) : null}
        </div>
        <StyledWorkoutImage />
        {loading ? (
          <LoadingSpinner />
        ) : data ? (
          <WorkoutInfo program={data} />
        ) : error ? (
          'Daten konnten nicht geladen werden.'
        ) : (
          'Kein Programm gestartet'
        )}
      </main>
    </StyledDashboard>
  );
};

export default styled(Dashboard)``;
