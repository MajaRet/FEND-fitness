import React from 'react';
import styled from 'styled-components';
import device from '../../../style/device';

import { ReactComponent as Circle } from './../../../../img/svg/circle.svg';
import { ReactComponent as CircleWithCheckmark } from './../../../../img/svg/circleChecked.svg';

const StyledProgressBar = styled.div<ProgressBarProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;

  width: 100%;

  @media ${device.phoneLarge} {
    width: 85%;
  }

  @media ${device.tabletPortrait} {
    width: 75%;
  }

  @media ${device.tabletLandscape} {
    width: 40%;
  }

  @media ${device.desktop} {
    width: 30%;
  }

  @media ${device.desktopLarge} {
    width: 20%;
  }

  .circle {
    width: 8%;
    height: auto;

    circle {
      stroke: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    }

    &.completed {
      circle {
        fill: ${(props) => `rgb(${props.theme.fontColorDefault})`};
      }
      path {
        stroke: ${(props) => `rgb(${props.theme.buttonTextColor})`};
      }
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

interface ProgressBarProps {
  completedExercises: boolean[];
  currentExercise?: number;
}

const ProgressBar = (props: ProgressBarProps) => {
  const { completedExercises, currentExercise } = props;

  const progressBar = completedExercises
    .flatMap((completed, i) => [
      <hr key={`divider-${i}`} />,
      completed ? (
        <CircleWithCheckmark key={`circle-${i}`} className="circle completed" />
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
  return <StyledProgressBar {...props}>{progressBar}</StyledProgressBar>;
};

export default ProgressBar;
