import React, { Fragment } from 'react';
import Button from '../../elements/buttons/Button';

const CompletedExercise = ({ exercise, repeatExercise }) => {
  return (
    <Fragment>
      <h1 className="task">
        Herzlichen Glückwunsch, die Übung ist abgeschlossen!
      </h1>
      <div className="title">
        <h1>{exercise.exercise.title}</h1>
        <h2 className="subtitle">
          {exercise.__typename === 'ExerciseWithReps'
            ? `${exercise.reps}x`
            : `${exercise.duration} Sekunden`}
        </h2>
      </div>
      <Button className="done" onClick={repeatExercise}>
        Wiederholen
      </Button>
    </Fragment>
  );
};

export default CompletedExercise;
