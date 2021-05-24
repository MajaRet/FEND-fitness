import React, { Fragment, useState, useEffect, useRef } from 'react';

import CountdownCircle from './CountdownCircle';

const TimedExercise = ({ className, duration, exercise, completeExercise }) => {
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
    console.log('Check if time up');
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
/*
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .title {
  }

  .countdown {
    transform: translateY(-50%);
  }
  */
