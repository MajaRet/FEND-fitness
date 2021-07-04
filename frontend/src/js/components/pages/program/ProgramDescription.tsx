import styled from 'styled-components';

const StyledProgramDescription = styled.p`
  padding: 10px 10px;
`;

interface ProgramDescriptionProps {
  description?: string;
}

const ProgramDescription = ({ description }: ProgramDescriptionProps) => {
  return (
    <StyledProgramDescription>
      {description || `Keine Beschreibung verfügbar`}
    </StyledProgramDescription>
  );
};

export default ProgramDescription;
