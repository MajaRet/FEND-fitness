import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import CountdownCircle from './CountdownCircle';

const TimedExercise = ({ className, seconds = 4 }) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds || 0);
  const [timeUp, setTimeUp] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setInterval(() => {
        console.log('Fire!');
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
        progressRef.current.style =
          'transition: stroke-dashoffset 1s ease-in-out;';
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
    setTimeUp(true);
  }, [secondsLeft]);

  return (
    <div className={className}>
      <CountdownCircle
        ref={progressRef}
        seconds={seconds}
        secondsLeft={secondsLeft}
      />
      {timeUp ? <p>Zeit abgelaufen!</p> : `${secondsLeft}s`}
    </div>
  );
};

export default styled(TimedExercise)``;
