import React, { Fragment } from 'react';
import Button from '../../elements/buttons/Button';

const RepeatedExercise = ({ className, reps, exercise, completeExercise }) => {
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
