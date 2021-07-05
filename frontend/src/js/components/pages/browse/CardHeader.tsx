import styled from 'styled-components';
import { ReactComponent as HeartIcon } from './../../../../img/svg/heart.svg';
import { ReactComponent as Checkmark } from './../../../../img/svg/checkmark.svg';

interface CardHeaderProps {
  isNew: boolean;
  isCompleted: boolean;
  isFavorite: boolean;
  setFavorite: (isFavorite: boolean) => void;
}

const StyledCardHeader = styled.div<CardHeaderProps>`
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

const CardHeader = (props: CardHeaderProps) => {
  const { isNew, isCompleted, isFavorite, setFavorite } = props;
  return (
    <StyledCardHeader className="header" {...props}>
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
    </StyledCardHeader>
  );
};

export default CardHeader;
