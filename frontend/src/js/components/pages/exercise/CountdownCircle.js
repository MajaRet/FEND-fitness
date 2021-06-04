import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CircularProgressBar from './../../elements/CircularProgressBar';

const CountdownCircle = React.forwardRef(
  (
    { className, seconds, secondsLeft, showUnit = true, fillColor, emptyColor },
    ref
  ) => {
    const [started, setStarted] = useState(false);

    // Used to immediately start the first transition.
    useEffect(() => {
      const sync = ref.current;
      console.log(
        'The node "before" started is set to true (mutated before it gets logged):'
      );
      console.log(sync);
      console.log(
        "To show that it got mutated, here's just the offset of that same object:"
      );
      console.log(sync.getAttribute('stroke-dashoffset'));
      console.log(
        "In Chrome, these can be different. In Firefox, they're both always 0 because logging is synchronous there."
      );
      // TODO: There appears to be a race condition between setting the state and the
      // initial render... (or DOM insertion)? At least it seems to work properly when I
      // delay the state update, but that's obviously not a good solution...
      console.log('Set started to true');
      setInterval(() => setStarted(true), 100);
    }, [ref]);

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
        centerText={`${secondsLeft}${showUnit ? 's' : ''}`}
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
