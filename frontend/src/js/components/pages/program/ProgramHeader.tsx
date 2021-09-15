import React from 'react';
import styled from 'styled-components';

import InfoBar from './InfoBar';
import { ReactComponent as Checkmark } from '../../../../img/svg/checkmark.svg';

import { Program } from '../../../types/ProgramTypes';

const StyledProgramHeader = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 80vh;

  text-align: center;

  background-image: ${(props) => props.theme.backgroundGradient};

  .info-bar {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .title {
    display: inline;
  }

  .checkmark {
    path {
      stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    }
    height: 30px;
    width: 30px;
    margin-left: 10px;
  }
`;

interface ProgramHeaderProps {
  program: Program;
}

const ProgramHeader = ({ program }: ProgramHeaderProps) => {
  return (
    <StyledProgramHeader>
      <h1 className="title">
        {program.title}
        {program.isCompleted ? (
          <Checkmark className="checkmark" aria-label="abgeschlossen" />
        ) : null}
      </h1>
      <InfoBar
        type={program.focus}
        duration={program.duration}
        difficulty={program.difficulty}
      />
    </StyledProgramHeader>
  );
};

export default ProgramHeader;
