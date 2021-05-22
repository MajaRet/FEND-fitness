import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CircularProgressBar from './../CircularProgressBar';

const CountdownCircle = React.forwardRef(
  ({ className, seconds, secondsLeft }, ref) => {
    const [started, setStarted] = useState(false);

    // Used to immediately start the first transition.
    useEffect(() => {
      setStarted(true);
      ref.current.style = 'transition: stroke-dashoffset 1s ease-in-out;';
    }, [ref]);

    // TODO set it relative to window width or put media queries.
    const radius = 175;

    const progressOffset = started
      ? (1 - Math.max(secondsLeft - 1, 0) / seconds) * 2 * Math.PI * radius
      : 0;

    return (
      <CircularProgressBar
        className={className}
        ref={ref}
        radius={radius}
        progress={progressOffset}
        thickness={20}
        centerText={`${secondsLeft}s`}
        filledColor={(props) => `rgb(${props.theme.fontColorDefault})`}
        emptyColor={(props) => `rgba(${props.theme.fontColorDefault},0.3)`}
      />
    );
  }
);

export default styled(CountdownCircle)``;
