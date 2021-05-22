import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Circle } from './../../../../img/svg/circle.svg';
import { ReactComponent as CheckedCircle } from './../../../../img/svg/circleChecked.svg';

const ProgressBar = ({ className, completedExercises, currentExercise }) => {
  const progressBar = completedExercises
    .flatMap((completed, i) => [
      <hr key={`divider-${i}`} />,
      completed ? (
        <Circle key={`circle-${i}`} className="circle completed" />
      ) : (
        <Circle
          key={`circle-${i}`}
          className={`circle incomplete${
            i === currentExercise ? ' active' : ''
          }`}
        />
      ),
    ])
    .slice(1);
  return <div className={className}>{progressBar}</div>;
};

export default styled(ProgressBar)`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;

  .circle {
    width: 8%;
    height: auto;

    circle {
      stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    }

    &.completed {
      fill: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    }
  }

  .active circle {
    stroke: ${(props) => `rgba(${props.theme.fontColorDefault},0.4)`};
  }

  hr {
    display: inline-block;
    border-top: 5px dotted ${(props) => `rgb(${props.theme.fontColorDefault})`};
    border-bottom: none;
    width: ${({ completedExercises }) =>
      ((1 - 0.08 * completedExercises.length) /
        (completedExercises.length - 1)) *
      100}%;
  }
`;
