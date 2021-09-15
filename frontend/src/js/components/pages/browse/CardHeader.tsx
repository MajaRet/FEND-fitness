import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartIcon } from './../../../../img/svg/heart.svg';
import { ReactComponent as Checkmark } from './../../../../img/svg/checkmark.svg';
import { BrowsedProgram } from '../../../types/BrowseTypes';
import { useLazyPost } from '../../../api/request';

interface CardHeaderProps {
  program: BrowsedProgram;
}

const StyledCardHeader = styled.div<CardHeaderProps>`
  display: flex;
  justify-content: space-between;

  width: 90%;

  .heart {
    path {
      stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    }

    &.filled path {
      fill: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    }
  }

  .checkmark path {
    fill: none;
    stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
  }
`;

const CardHeader = (props: CardHeaderProps) => {
  const { isNewProgram, isCompleted, slug } = props.program;
  const [isFavorite, setFavorite] = useState(props.program.isFavorite);
  const [persistFavorite] = useLazyPost(`/api/programs/${slug}`);

  return (
    <StyledCardHeader className="header" {...props}>
      <button
        onClick={(e) => {
          e.preventDefault();
          persistFavorite({ action: 'favorite', isFavorite: !isFavorite });
          setFavorite(!isFavorite);
        }}
        aria-label={`Programm als Favorit markieren, aktuell ${
          isFavorite ? 'aktiv' : 'nicht aktiv'
        }`}
      >
        <HeartIcon className={`heart${isFavorite ? ' filled' : ''}`} />
      </button>
      {isCompleted ? (
        <Checkmark className="checkmark" aria-label="abgeschlossen" />
      ) : isNewProgram ? (
        <p>Neu</p>
      ) : null}
    </StyledCardHeader>
  );
};

export default CardHeader;
