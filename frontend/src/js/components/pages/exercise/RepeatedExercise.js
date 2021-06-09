import React, { Fragment } from 'react';
import Button from '../../elements/buttons/Button';

/**
 * A component rendering an exercise with repetitions and a button
 * to mark it as completed.
 *
 * @param {Number} reps               The number of times the exercise is
 *                                    repeated.
 * @param {Object} exercise           The exercise to be done.
 * @param {Function} completeExercise Callback function to mark the exercise as
 *                                    completed.
 */
const RepeatedExercise = ({ reps, exercise, completeExercise }) => {
  return (
    <Fragment>
      <h1 className="task repeated">{reps} x</h1>
      <h1 className="title">{exercise.title}</h1>
      <Button className="done" onClick={completeExercise}>
        Fertig!
      </Button>
    </Fragment>
  );
};

export default RepeatedExercise;
