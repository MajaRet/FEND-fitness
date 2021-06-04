import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CircularProgressBar from './../../elements/CircularProgressBar';

const CountdownCircle = React.forwardRef(
  ({ className, seconds, secondsLeft }, ref) => {
    const [started, setStarted] = useState(false);

    // Used to immediately start the first transition.
    useEffect(() => {
      const sync = ref.current;
      console.log('Synchronous, hopefully:');
      console.log(sync);
      console.log('Maybe asynchronous?:');
      console.log(ref.current);
      console.log(ref.current.getAttribute('stroke-dasharray'));
      // TODO: There appears to be a race condition between setting the state and the
      // initial render... (or DOM insertion)? At least it seems to work properly when I
      // delay the state update, but that's obviously not a good solution...
      if (sync.getAttribute('stroke-dashoffset') == 0) {
        console.log('Set started to true');
        setInterval(() => setStarted(true), 100);
      }
    }, [ref]);

    const radius = 175;

    const progressOffset = started
      ? (1 - Math.max(secondsLeft - 1, 0) / seconds) * 2 * Math.PI * radius
      : 0;
    console.log(`progressOffset is ${progressOffset}`);

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

export default styled(CountdownCircle)`
  height: fit-content;
`;
