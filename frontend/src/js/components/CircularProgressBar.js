import React from 'react';
import styled from 'styled-components';

const CircularProgressBar = React.forwardRef((props, ref) => {
  const { className, progress, radius, thickness, centerText } = props;

  const circumference = 2 * Math.PI * radius;

  return (
    <div className={className}>
      <svg width={(radius + thickness) * 2} height={(radius + thickness) * 2}>
        <circle
          className="circle background"
          r={radius}
          strokeWidth={thickness}
          cx="50%"
          cy="50%"
        ></circle>
        <circle
          className="circle progress"
          r={radius}
          ref={ref}
          strokeWidth={thickness}
          cx="50%"
          cy="50%"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        ></circle>
        <text className="text" x="50%" y="50%" textAnchor="middle" dy="10px">
          {centerText}
        </text>
      </svg>
    </div>
  );
});

export default styled(CircularProgressBar)`
  position: relative;
  width: fit-content;
  height: fit-content;

  .circle {
    fill: none;

    &.background {
      stroke: ${(props) => props.emptyColor || 'white'};
    }

    &.progress {
      stroke: ${(props) => props.filledColor || 'black'};
    }
  }

  .text {
    font-size: var(--h1-size);
    fill: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    font-weight: var(--heading-weight);
  }
`;
