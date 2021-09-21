import React from 'react';
import styled, { keyframes } from 'styled-components';
import device from '../../../style/device';

// TODO Replace 'any'
interface CircularProgressBarProps {
  radius: number;
  progress: number;
  prevOffset: number;
  thickness: number;
  centerText: string;
  filledColor?: string | ((props: any) => string);
  emptyColor?: string | ((props: any) => string);
}

const animation = (props: CircularProgressBarProps) => keyframes`
    0% {
      stroke-dashoffset: ${props.prevOffset};
    }
    100% {
      stroke-dashoffset:  ${props.progress};};
    }
`;

const StyledCircularProgressBar = styled.div`
  position: relative;
  width: 75%;

  @media ${device.phoneLarge} {
    width: 50%;
  }

  @media ${device.tabletPortrait} {
    width: 30%;
  }

  @media ${device.tabletLandscape} {
    width: 25%;
  }

  @media ${device.desktop} {
    width: 20%;
  }

  @media ${device.desktopLarge} {
    width: 15%;
  }

  .circle {
    fill: none;

    &.background {
      stroke: ${(props) => props.emptyColor || 'white'};
    }

    &.progress {
      stroke: ${(props) => props.filledColor || 'black'};

      animation-name: ${animation};
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
    }
  }

  .text {
    font-size: calc(var(--h1-size) * 1.75);
    fill: ${(props) => props.filledColor || 'black'};
    font-weight: var(--heading-weight);
  }
`;

const CircularProgressBar = (props: CircularProgressBarProps) => {
  const { progress, radius, thickness, centerText } = props;
  const circumference = 2 * Math.PI * radius;
  return (
    <StyledCircularProgressBar {...props}>
      <svg
        viewBox={`0 0 ${(radius + thickness) * 2} ${(radius + thickness) * 2}`}
      >
        <circle
          className="circle background"
          r={radius}
          strokeWidth={thickness}
          cx="50%"
          cy="50%"
          style={{ transition: 'stroke 1s ease-in-out' }}
        ></circle>
        <circle
          className="circle progress"
          r={radius}
          strokeWidth={thickness}
          cx="50%"
          cy="50%"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          style={{ transition: 'stroke 1s ease-in-out' }}
        ></circle>
        <text
          className="text"
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="20px"
          style={{ transition: 'fill 1s ease-in-out' }}
        >
          {centerText}
        </text>
      </svg>
    </StyledCircularProgressBar>
  );
};

export default CircularProgressBar;
