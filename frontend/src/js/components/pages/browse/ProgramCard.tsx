import React from 'react';
import styled from 'styled-components';

import { BrowsedProgram } from '../../../types/BrowseTypes';

import CardHeader from './CardHeader';

interface ProgramCardProps {
  program: BrowsedProgram;
}

const StyledProgramCard = styled.article<ProgramCardProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 215px;
  width: 100%;
  padding: 0 50px;
  border-radius: 5px;
  // TODO Also add the 'active' color to the theme.
  background-color: ${(props) =>
    props.program.isActive
      ? `rgb(${props.theme.highlightColor1})`
      : props.program.isCompleted
      ? `rgb(${props.theme.backgroundSecondary})`
      : `rgb(${props.theme.backgroundPrimary})`};

  .header {
    position: absolute;
    top: 12px;
  }
`;

const ProgramCard = (props: ProgramCardProps) => {
  const { program } = props;

  return (
    <StyledProgramCard {...props}>
      <CardHeader program={program} />
      <h2>{program.title}</h2>
    </StyledProgramCard>
  );
};

export default ProgramCard;
