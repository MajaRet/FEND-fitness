import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Circle } from './../../../../img/svg/circle.svg';
import { ReactComponent as CheckedCircle } from './../../../../img/svg/circleChecked.svg';

const ProgressBar = ({ className, completedExercises }) => {
  const progressBar = completedExercises
    .flatMap((completed, i) => [
      <hr key={`divider-${i}`} />,
      completed ? (
        <CheckedCircle key={`circle-${i}`} className="circle completed" />
      ) : (
        <Circle key={`circle-${i}`} className="circle incomplete" />
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
