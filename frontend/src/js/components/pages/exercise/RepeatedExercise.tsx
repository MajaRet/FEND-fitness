import React, { Fragment } from 'react';
import Button from '../../elements/buttons/Button';

interface RepeatedExerciseProps {
  reps: number;
  title: string;
  completeExercise: () => void;
}
/**
 * A component rendering an exercise with repetitions and a button
 * to mark it as completed.
 */
const RepeatedExercise = ({
  reps,
  title,
  completeExercise,
}: RepeatedExerciseProps) => {
  return (
    <Fragment>
      <h1 className="task repeated">{reps} x</h1>
      <h1 className="title">{title}</h1>
      <Button className="done" onClick={completeExercise}>
        Fertig!
      </Button>
    </Fragment>
  );
};

export default RepeatedExercise;
