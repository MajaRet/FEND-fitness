import styled from 'styled-components';

import { ReactComponent as PlayButton } from './../../../../img/svg/large play.svg';

const StyledWorkoutItemImage = styled.button`
  width: 25%;
`;

const WorkoutItemImage = () => {
  return (
    <StyledWorkoutItemImage>
      <PlayButton />
    </StyledWorkoutItemImage>
  );
};

export default WorkoutItemImage;
