import styled from 'styled-components';

import { WorkoutWithDay } from '../../../types/ProgramTypes';

import WorkoutItemImage from './WorkoutItemImage';
import WorkoutItemInfo from './WorkoutItemInfo';

const StyledWorkoutListItem = styled.div`
  display: flex;

  border-radius: 5px;

  overflow: hidden;

  &.current .workout-info {
    background-color: ${(props) => `rgb(${props.theme.backgroundSecondary})`};
  }
`;

interface WorkoutListItemProps {
  className: string;
  workout: WorkoutWithDay;
}

const WorkoutListItem = ({ className, workout }: WorkoutListItemProps) => {
  return (
    <StyledWorkoutListItem className={className}>
      <WorkoutItemImage />
      <WorkoutItemInfo workout={workout} />
    </StyledWorkoutListItem>
  );
};

export default WorkoutListItem;
