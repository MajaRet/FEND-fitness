import React, { Fragment } from 'react';
import Button from '../../elements/buttons/Button';

const CompletedExercise = ({ exercise, repeatExercise }) => {
  return (
    <Fragment>
      <h1 className="task">
        Herzlichen Glückwunsch, die Übung ist abgeschlossen!
      </h1>
      <h1 className="title">{exercise.title}</h1>
      <Button className="done" onClick={repeatExercise}>
        Wiederholen
      </Button>
    </Fragment>
  );
};

export default CompletedExercise;
