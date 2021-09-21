import React, { Fragment, useState, useEffect } from 'react';

import CountdownCircle from '../../elements/countdown/CountdownCircle';

import tickSound from '../../../../audio/tick.wav';
import doneSound from '../../../../audio/bell.wav';
import countdownSound from '../../../../audio/countdown.wav';
import countdownEndSound from '../../../../audio/countdown_end.wav';

const tickAudio = new Audio(tickSound);
const nearlyDoneAudio = new Audio(countdownEndSound);
const doneAudio = new Audio(doneSound);
const countdownAudio = new Audio(countdownSound);
const countdownEndAudio = new Audio(countdownEndSound);

function tick(
  advance: (setSecondsLeft: (secondsLeft: number) => number) => void,
  sound: HTMLAudioElement
) {
  const timer = setInterval(() => {
    sound.play();
    advance((secondsLeft) => secondsLeft - 1);
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}

interface TimedExerciseProps {
  duration: number;
  title: string;
  completeExercise: () => void;
  countdown?: number;
}

/**
 * A component rendering a timed exercise or a timed pause.
 * The exercise or pause is marked as completed once its timer runs out.
 *
 * @param {Number} duration           The duration of the exercise or pasue in
 *                                    seconds.
 * @param {Object} exercise           The exercise to be done.
 * @param {Function} completeExercise Callback function to mark the exercise as
 *                                    completed.
 * @param {Number} countdown          The number of seconds on a countdown
 *                                    that precedes the exercise timer. If 0
 *                                    or not given, no countdown will be shown.
 */
const TimedExercise = ({
  duration,
  title,
  completeExercise,
  countdown = 0,
}: TimedExerciseProps) => {
  const [countdownDone, setCountdownDone] = useState(countdown <= 0);
  const [countdownSeconds, setCountdownSeconds] = useState(countdown);
  const [secondsLeft, setSecondsLeft] = useState(duration || 0);
  const [timeUp, setTimeUp] = useState(false);

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
        time={countdownDone ? duration : countdown}
        timeLeft={countdownDone ? secondsLeft : countdownSeconds}
        unit={countdownDone ? 's' : ''}
        fillColor={(props) =>
          `rgba(${props.theme.fontColorDefault},${countdownDone ? '1' : '0.5'})`
        }
        emptyColor={(props) =>
          `rgba(${props.theme.fontColorDefault},${
            countdownDone ? '0.3' : '0.1'
          })`
        }
      />
      <h1 className="title">{title}</h1>
    </Fragment>
  );
};

export default TimedExercise;
