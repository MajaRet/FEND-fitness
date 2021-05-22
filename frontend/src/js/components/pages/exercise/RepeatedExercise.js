import React from 'react';
import styled from 'styled-components';

const RepeatedExercise = ({ className, reps, exercise, completeExercise }) => {
  return (
    <div className={className}>
      {exercise.title}, {reps} Mal
      <button onClick={completeExercise}>Fertig!</button>
    </div>
  );
};

export default styled(RepeatedExercise)``;
