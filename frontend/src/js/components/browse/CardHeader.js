import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartIcon } from './../../../img/svg/heart.svg';

const CardHeader = ({ className, isNew, isFavorite, setFavorite }) => {
  return (
    <div className={className}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setFavorite(!isFavorite);
        }}
      >
        <HeartIcon />
      </button>
      {isNew ? <p>Neu</p> : null}
    </div>
  );
};

export default styled(CardHeader)`
  display: flex;
  justify-content: space-between;

  width: 90%;

  svg path {
    fill: ${(props) =>
      props.isFavorite ? `rgb(${props.theme.fontColorDefault})` : null};
  }
`;
