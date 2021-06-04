import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CircularProgressBar from './CircularProgressBar';

const CountdownCircle = React.forwardRef(
  ({ className, time, timeLeft, unit, fillColor, emptyColor }, ref) => {
    const [started, setStarted] = useState(false);

    // Used to immediately start the first transition.
    useEffect(() => {
      setStarted(true);
    }, [ref]);

    const radius = 175;

    const progressOffset = started
      ? (1 - Math.max(timeLeft - 1, 0) / time) * 2 * Math.PI * radius
      : 0;

    return (
      <CircularProgressBar
        className={className}
        ref={ref}
        radius={radius}
        progress={progressOffset}
        thickness={20}
        centerText={`${timeLeft}${unit}`}
        filledColor={(props) =>
          fillColor || `rgb(${props.theme.fontColorDefault})`
        }
        emptyColor={(props) =>
          emptyColor || `rgba(${props.theme.fontColorDefault},0.3)`
        }
      />
    );
  }
);

export default styled(CountdownCircle)`
  height: fit-content;
`;
