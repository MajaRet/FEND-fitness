import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import display from '../../../util/naming';

import Label from './../../elements/labels/Label';
import { ReactComponent as Checkmark } from '../../../../img/svg/checkmark.svg';

const WorkoutInfo = ({ className, program }) => {
  console.log(program);
  const workout = program.workout.Workout;
  return (
    <Link
      to={`/program/${program.slug}/${program.workout.day}`}
      className={className}
    >
      {' '}
      <div className="info">
        <p>{workout.title}</p>
        <p>{program.title}</p>
        <Label>
          {workout.calories} kcal &bull; {workout.duration} Min. &bull;{' '}
          {workout.categories.map(display).join('/')}
        </Label>
      </div>
      {program.workout.done ? <Checkmark className="checkmark" /> : null}
    </Link>
  );
};

// TODO make saner
WorkoutInfo.defaultProps = {
  className: '',
  workout: {
    title: 'Zwergweitwurf',
    program: 'Keines',
    calories: 0,
    duration: 0,
    category: 'Kraft',
  },
};

export default styled(WorkoutInfo)`
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
