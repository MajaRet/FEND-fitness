import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CountdownCircle = React.forwardRef(
  ({ className, seconds, secondsLeft }, ref) => {
    const [started, setStarted] = useState(false);

    // Used to immediately start the first transition.
    useEffect(() => {
      setStarted(true);
      ref.current.style = 'transition: stroke-dashoffset 1s ease-in-out;';
    }, [ref]);

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = started
      ? (1 - Math.max(secondsLeft - 1, 0) / seconds) * circumference
      : 0;
    return (
      <div className={className}>
        <svg width="200" height="200">
          <circle
            className="circle background"
            r={radius}
            strokeWidth="22"
            cx="100"
            cy="100"
          ></circle>
          <circle
            className="circle progress"
            r={radius}
            ref={ref}
            strokeWidth="22"
            cx="100"
            cy="100"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
          ></circle>
          <text
            className="seconds"
            x="50%"
            y="50%"
            textAnchor="middle"
            dy="10px"
          >
            {secondsLeft}s
          </text>
        </svg>
      </div>
    );
  }
);

export default styled(CountdownCircle)`
  position: relative;
  width: fit-content;
  height: fit-content;
  .circle {
    fill: none;

    &.background {
      stroke: red;
    }

    &.progress {
      stroke: blue;
    }
  }

  .seconds {
    font-size: var(--h1-size);
    fill: ${(props) => props.theme.fontColorDefault};
    font-weight: var(--heading-weight);
  }
`;
