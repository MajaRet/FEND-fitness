import React, { Fragment, useState, useEffect, useRef } from 'react';

import CountdownCircle from './CountdownCircle';

const TimedExercise = ({ duration, exercise, completeExercise }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration || 0);
  const [timeUp, setTimeUp] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setInterval(() => {
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

  useEffect(() => {
    if (timeUp) {
      completeExercise();
    }
  }, [timeUp, completeExercise]);

  return (
    <Fragment>
      <CountdownCircle
        ref={progressRef}
        seconds={duration}
        secondsLeft={secondsLeft}
        className="task"
      />
      <h1 className="title">{exercise.title}</h1>
    </Fragment>
  );
};

export default TimedExercise;
