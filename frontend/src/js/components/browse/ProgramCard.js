import React from 'react';
import styled from 'styled-components';

import CardHeader from './CardHeader';

const ProgramCard = ({ className, program, setFavorite }) => {
  return (
    <div className={className}>
      <CardHeader
        isNew={program.isNew}
        isFavorite={program.favorite}
        setFavorite={setFavorite}
      />
      <h2>{program.title}</h2>
    </div>
  );
};

export default styled(ProgramCard)`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 215px;
  width: 100%;
  padding: 0 50px;
  border-radius: 5px;
  // TODO Also add the 'started' color to the theme.
  background-color: ${(props) =>
    props.program.status === 'started'
      ? 'var(--blue2)'
      : props.theme.backgroundPrimary};

  ${CardHeader} {
    position: absolute;
    top: 12px;
  }
`;
