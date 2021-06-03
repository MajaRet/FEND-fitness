import React from 'react';
import styled from 'styled-components';

import { ReactComponent as PlayButton } from './../../../img/svg/large play.svg';

const WorkoutItemVideo = ({ className, src }) => {
  return (
    <button className={className}>
      <PlayButton />
    </button>
  );
};

export default styled(WorkoutItemVideo)`
  width: 25%;
`;
