import React from 'react';
import styled from 'styled-components';

import CardHeader from './CardHeader';

const ProgramCard = ({ className, program, setFavorite }) => {
  return (
    <article className={className}>
      <CardHeader
        isNew={program.isNew}
        isFavorite={program.isFavorite}
        isCompleted={program.isCompleted}
        setFavorite={setFavorite}
      />
      <h2>{program.title}</h2>
    </article>
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
  // TODO Also add the 'active' color to the theme.
  background-color: ${(props) =>
    props.program.isActive
      ? 'rgb(var(--blue2))'
      : props.program.isCompleted
      ? `rgb(${props.theme.backgroundSecondary})`
      : `rgb(${props.theme.backgroundPrimary})`};

  ${CardHeader} {
    position: absolute;
    top: 12px;
  }
`;
