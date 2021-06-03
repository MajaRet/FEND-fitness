import React from 'react';
import styled from 'styled-components';

const ProgramDiagram = ({ className, program }) => {
  return (
    <div className={className}>
      <h2>Diagramm-Platzhalter</h2>
    </div>
  );
};

export default styled(ProgramDiagram)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50vh;

  background-color: white;
`;
