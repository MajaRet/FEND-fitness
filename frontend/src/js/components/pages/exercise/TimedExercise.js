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

function countdown(tick, sound) {
  const timer = setInterval(() => {
    sound.play();
    tick((secondsLeft) => secondsLeft - 1);
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}

const countdownDuration = 3;

const TimedExercise = ({ duration, exercise, completeExercise }) => {
  const [countdownDone, setCountdownDone] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(countdownDuration);
  const [secondsLeft, setSecondsLeft] = useState(duration || 0);
  const [timeUp, setTimeUp] = useState(false);
  const progressRef = useRef(null);
  const countdownRef = useRef(null);

  useEffect(() => {
    if (countdownSeconds > 0) {
      if (countdownSeconds === 1) {
        return countdown(setCountdownSeconds, countdownEndAudio);
      }
      return countdown(setCountdownSeconds, countdownAudio);
    } else {
      setCountdownDone(true);
    }
  }, [countdownSeconds]);

  useEffect(() => {
    if (countdownDone) {
      if (secondsLeft > 0) {
        let sound;
        if (secondsLeft === 1) {
          sound = doneAudio;
        } else if (secondsLeft < 6) {
          sound = nearlyDoneAudio;
        } else {
          sound = tickAudio;
        }
        return countdown(setSecondsLeft, sound);
      } else {
        setTimeUp(true);
      }
    }
  }, [secondsLeft, countdownDone]);

  useEffect(() => {
    if (timeUp) {
      completeExercise();
    }
  }, [timeUp, completeExercise]);

  return (
    <Fragment>
      {countdownDone ? (
        <CountdownCircle
          key="timer"
          ref={progressRef}
          seconds={duration}
          secondsLeft={secondsLeft}
          className="task"
        />
      ) : (
        <Fragment>
          <CountdownCircle
            key="countdown"
            ref={countdownRef}
            showUnit={false}
            fillColor={countdownSeconds < 2 ? 'red' : 'blue'}
            seconds={countdownDuration}
            secondsLeft={countdownSeconds}
            className="task"
          />
        </Fragment>
      )}
      <h1 className="title">{exercise.title}</h1>
    </Fragment>
  );
};

export default TimedExercise;
