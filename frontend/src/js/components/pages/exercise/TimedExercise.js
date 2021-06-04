import React, { Fragment, useState, useEffect, useRef } from 'react';

import CountdownCircle from './CountdownCircle';

import tickSound from './../../../../audio/tick.wav';
import doneSound from './../../../../audio/bell.wav';
import countdownSound from './../../../../audio/countdown.wav';
import countdownEndSound from './../../../../audio/countdown_end.wav';

const tickAudio = new Audio(tickSound);
const nearlyDoneAudio = new Audio(countdownEndSound);
const doneAudio = new Audio(doneSound);
const countdownAudio = new Audio(countdownSound);
const countdownEndAudio = new Audio(countdownEndSound);

function tick(advance, sound) {
  const timer = setInterval(() => {
    sound.play();
    advance((secondsLeft) => secondsLeft - 1);
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}

const TimedExercise = ({
  duration,
  exercise,
  completeExercise,
  countdown = 0,
}) => {
  const [countdownDone, setCountdownDone] = useState(countdown <= 0);
  const [countdownSeconds, setCountdownSeconds] = useState(countdown);
  const [secondsLeft, setSecondsLeft] = useState(duration || 0);
  const [timeUp, setTimeUp] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    if (countdownDone) return;
    if (countdownSeconds > 0) {
      let sound = countdownAudio;
      if (countdownSeconds === 1) {
        sound = countdownEndAudio;
      }
      return tick(setCountdownSeconds, sound);
    } else {
      setCountdownDone(true);
    }
  }, [countdownSeconds, countdownDone]);

  useEffect(() => {
    if (!countdownDone) return;
    if (secondsLeft > 0) {
      let sound;
      if (secondsLeft === 1) {
        sound = doneAudio;
      } else if (secondsLeft < 6) {
        sound = nearlyDoneAudio;
      } else {
        sound = tickAudio;
      }
      return tick(setSecondsLeft, sound);
    } else {
      setTimeUp(true);
    }
  }, [secondsLeft, countdownDone]);

  useEffect(() => {
    if (timeUp) {
      completeExercise();
    }
  }, [timeUp, completeExercise]);

  return (
    <Fragment>
      <CountdownCircle
        ref={progressRef}
        seconds={countdownDone ? duration : countdown}
        secondsLeft={countdownDone ? secondsLeft : countdownSeconds}
        unit={countdownDone ? 's' : ''}
        fillColor={(props) =>
          `rgba(${props.theme.fontColorDefault},${countdownDone ? '1' : '0.5'})`
        }
        emptyColor={(props) =>
          `rgba(${props.theme.fontColorDefault},${
            countdownDone ? '0.3' : '0.1'
          })`
        }
        className="task"
      />
      <h1 className="title">{exercise.title}</h1>
    </Fragment>
  );
};

export default TimedExercise;
