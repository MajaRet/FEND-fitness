import React from 'react';
import styled from 'styled-components';

import InfoBar from './InfoBar';

const ProgramHeader = ({ className, program }) => {
  return (
    <div className={className}>
      <h1>{program.title}</h1>
      <InfoBar
        type={program.type}
        duration={program.duration}
        difficulty={program.difficulty}
      />
    </div>
  );
};

export default styled(ProgramHeader)`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 80vh;

  text-align: center;

  background-image: ${(props) => props.theme.backgroundGradient};

  ${InfoBar} {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;
