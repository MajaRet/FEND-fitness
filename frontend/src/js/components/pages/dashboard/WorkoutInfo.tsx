import { Link } from 'react-router-dom';
import styled from 'styled-components';

import display from '../../../util/naming';
import { DailyProgram } from '../../../types/ProgramTypes';

import Label from '../../elements/labels/Label';
import { ReactComponent as Checkmark } from '../../../../img/svg/checkmark.svg';

interface WorkoutInfoProps {
  program: DailyProgram;
}

const StyledWorkoutInfo = styled(Link).attrs((props: WorkoutInfoProps) => ({
  to: `/program/${props.program.slug}/${props.program.workout.day}`,
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
  const workout = program.workout.workout;
  return (
    <StyledWorkoutInfo {...props}>
      <div className="info">
        <p>{workout.title}</p>
        <p>{program.title}</p>
        <Label>
          {workout.calories} kcal &bull; {workout.duration} Min. &bull;{' '}
          {workout.categories.map(display).join('/')}
        </Label>
      </div>
      {program.workout.done ? <Checkmark className="checkmark" /> : null}
    </StyledWorkoutInfo>
  );
};

export default WorkoutInfo;
