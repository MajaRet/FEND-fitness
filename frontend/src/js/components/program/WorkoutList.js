import React, { useState } from 'react';
import styled from 'styled-components';

import WorkoutListItem from './WorkoutListItem';
import LabelButton from './../labels/LabelButton';

const WorkoutList = ({ className, workouts }) => {
  const [displayedWorkouts, setDisplayedWorkouts] = useState(
    workouts.slice(0, 3)
  );
  const [allLoaded, setAllLoaded] = useState(false);

  const loadAll = () => {
    if (!allLoaded) {
      setDisplayedWorkouts(workouts);
      setAllLoaded(true);
    }
  };

  const renderedExercises = displayedWorkouts.map((workout) => {
    return <WorkoutListItem key={workout.week} workout={workout} />;
  });

  return (
    <div className={className}>
      <div className="header">
        <h3>{workouts.length} Tage</h3>
        <LabelButton onClick={loadAll}>Alle anzeigen</LabelButton>
      </div>
      {renderedExercises}
    </div>
  );
};

export default styled(WorkoutList)`
  display: flex;
  flex-direction: column;
  row-gap: 14px;

  .header {
    display: flex;
    justify-content: space-between;
  }
`;
