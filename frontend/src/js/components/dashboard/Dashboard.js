import React from 'react';
import styled from 'styled-components';

import WorkoutInfo from './WorkoutInfo';
import { ReactComponent as WorkoutImage } from './../../../img/svg/Programme large.svg';
import LabelLink from './../LabelLink';

const StyledWorkoutImage = styled(WorkoutImage)`
  margin: 10px 0;
  width: 100%;
`;

const StyledDashboard = styled.div`
  padding-top: 45px;

  h1 {
    margin-bottom: 50px;
  }

  .subheader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const Dashboard = (props) => {
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
        {props.user.name}
      </h1>
      <main>
        <div className="subheader">
          <h2>Dein Workout heute</h2>
          <LabelLink to="/">Trainingsplan</LabelLink>
        </div>
        <StyledWorkoutImage />
        <WorkoutInfo />
      </main>
    </StyledDashboard>
  );
};

export default Dashboard;
