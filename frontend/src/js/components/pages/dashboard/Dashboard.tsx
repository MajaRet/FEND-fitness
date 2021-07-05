import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../../context';
import { useQuery } from '../../../api/sanity';

import { DailyProgram } from '../../../types/ProgramTypes';

import WorkoutInfo from './WorkoutInfo';
import { ReactComponent as WorkoutImage } from './../../../../img/svg/Programme large.svg';
import LabelLink from '../../elements/labels/LabelLink';
import LoadingSpinner from '../../elements/loading/LoadingSpinner';

const StyledWorkoutImage = styled(WorkoutImage)`
  margin: 10px 0;
  width: 100%;
`;

const getDailyProgram = `*[_type == "user" && name == $userName] {
  "title": activeProgram.ActiveProgram->.title,
  "slug": activeProgram.ActiveProgram->.slug.current,
  "workout": activeProgram.ActiveProgram->.workouts[
    ^.activeProgram.day == 1 && day == 1
    || ^.activeProgram.dateOfLastWorkoutCompletion >= $today 
      && day == ^.activeProgram.day - 1
    || ^.activeProgram.dateOfLastWorkoutCompletion < $today 
      && day == ^.activeProgram.day 
  ] { 
    "done": day < ^.activeProgram.day,
    day, 
    "workout": Workout-> {
      title,
      duration,
      calories,
      categories
    }
  }[0]
}[0]`;

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
  const user = useContext(UserContext);
  const params = useMemo(
    () => ({
      userName: user.name,
      today: new Date().toISOString().split('T')[0],
    }),
    [user]
  );
  const { loading, data } = useQuery<DailyProgram>(getDailyProgram, params);

  const currHours = new Date().getHours();
  const timeOfDay =
    currHours < 11 ? 'Morgen' : currHours < 17 ? 'Tag' : 'Abend';
  return (
    <StyledDashboard>
      <h1>
        Guten
        <br />
        {timeOfDay},
        <br />
        {user.name}
      </h1>
      <main>
        <div className="subheader">
          <h2>Dein Workout heute</h2>
          <LabelLink to="/">Trainingsplan</LabelLink>
        </div>
        <StyledWorkoutImage />
        {loading ? (
          <LoadingSpinner />
        ) : data ? (
          data.title ? (
            <WorkoutInfo program={data} />
          ) : (
            'Kein Programm gestartet'
          )
        ) : (
          'Daten konnten nicht geladen werden.'
        )}
      </main>
    </StyledDashboard>
  );
};

export default styled(Dashboard)``;
