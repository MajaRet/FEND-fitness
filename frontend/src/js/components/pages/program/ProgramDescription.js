import React from 'react';
import styled from 'styled-components';

const ProgramDescription = ({ className, description }) => {
  return (
    <p className={className}>{description || `Keine Beschreibung verfügbar`}</p>
  );
};

export default styled(ProgramDescription)`
  padding: 10px 10px;
`;
