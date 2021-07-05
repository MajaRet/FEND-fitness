import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartIcon } from './../../../../img/svg/heart.svg';
import { ReactComponent as Checkmark } from './../../../../img/svg/checkmark.svg';

const CardHeader = ({
  className,
  isNew,
  isCompleted,
  isFavorite,
  setFavorite,
}) => {
  return (
    <div className={className}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setFavorite(!isFavorite);
        }}
        aria-label={`Programm als Favorit markieren, aktuell ${
          isFavorite ? 'aktiv' : 'nicht aktiv'
        }`}
      >
        <HeartIcon className="heart" />
      </button>
      {isCompleted ? (
        <Checkmark className="checkmark" aria-label="abgeschlossen" />
      ) : isNew ? (
        <p>Neu</p>
      ) : null}
    </div>
  );
};

export default styled(CardHeader)`
  display: flex;
  justify-content: space-between;

  width: 90%;

  .heart path {
    stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    fill: ${(props) =>
      props.isFavorite ? `rgb(${props.theme.fontColorDefault})` : null};
  }

  .checkmark path {
    fill: none;
    stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
  }
`;
