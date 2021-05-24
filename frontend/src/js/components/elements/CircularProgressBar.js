import React from 'react';
import styled from 'styled-components';

const CircularProgressBar = React.forwardRef((props, ref) => {
  const { className, progress, radius, thickness, centerText } = props;

  const circumference = 2 * Math.PI * radius;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${(radius + thickness) * 2} ${(radius + thickness) * 2}`}
      >
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
        <text className="text" x="50%" y="50%" textAnchor="middle" dy="20px">
          {centerText}
        </text>
      </svg>
    </div>
  );
});

export default styled(CircularProgressBar)`
  position: relative;
  width: 100%;
  height: 500px;

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
    font-size: calc(var(--h1-size) * 2);
    fill: ${(props) => `rgb(${props.theme.fontColorDefault})`};
    font-weight: var(--heading-weight);
  }
`;
