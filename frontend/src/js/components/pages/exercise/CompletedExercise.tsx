import { Fragment } from 'react';
import Button from '../../elements/buttons/Button';

import { Exercise } from '../../../types/ExerciseTypes';

interface CompletedExerciseProps {
  exercise: Exercise;
  repeatExercise: () => void;
}

const CompletedExercise = ({
  exercise,
  repeatExercise,
}: CompletedExerciseProps) => {
  return (
    <Fragment>
      <h1 className="task">
        Herzlichen Glückwunsch, die Übung ist abgeschlossen!
      </h1>
      <div className="title">
        <h1>{exercise.title}</h1>
        <h2 className="subtitle">
          {exercise.type === 'exerciseWithReps'
            ? `${exercise.reps} x`
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
