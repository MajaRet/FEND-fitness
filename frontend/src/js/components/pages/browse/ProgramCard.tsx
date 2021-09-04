import styled from 'styled-components';

import { BrowsedProgram } from '../../../types/BrowseTypes';

import CardHeader from './CardHeader';

interface ProgramCardProps {
  program: BrowsedProgram;
  setFavorite: (isFavorite: boolean) => void;
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
  const { program, setFavorite } = props;

  return (
    <StyledProgramCard {...props}>
      <CardHeader
        isNew={program.isNew}
        isFavorite={program.isFavorite}
        isCompleted={program.isCompleted}
        setFavorite={setFavorite}
      />
      <h2>{program.title}</h2>
    </StyledProgramCard>
  );
};

export default ProgramCard;
