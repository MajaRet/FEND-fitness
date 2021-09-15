import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import display from '../../../util/naming';
import { ActiveProgram } from '../../../types/ProgramTypes';

import Label from '../../elements/labels/Label';

interface WorkoutInfoProps {
  program: ActiveProgram;
}

const StyledWorkoutInfo = styled(Link).attrs((props: WorkoutInfoProps) => ({
  to: `/program/${props.program.program.slug}/${props.program.currentDay}`,
}))`
  display: flex;
  align-items: center;
  column-gap: 20px;

  .checkmark {
    width: 20px;
    height: 20px;
    path {
      stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    }
  }
`;

const WorkoutInfo = (props: WorkoutInfoProps) => {
  const { program } = props;
  const workout = program.currentWorkout;
  return (
    <StyledWorkoutInfo {...props}>
      <div className="info">
        <p>{workout.title}</p>
        <p>{program.program.title}</p>
        <Label>
          {workout.calories} kcal &bull; {workout.duration} Min. &bull;{' '}
          {workout.categories.map(display).join('/')}
        </Label>
      </div>
    </StyledWorkoutInfo>
  );
};

export default WorkoutInfo;
