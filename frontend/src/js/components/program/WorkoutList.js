import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import WorkoutListItem from './WorkoutListItem';
import LabelButton from './../labels/LabelButton';

const testWorkouts = [
  {
    id: 0,
    exercises: [],
    category: 'Krafttraining',
    day: 1,
    duration: 26,
    calories: 100,
  },
  {
    id: 1,
    exercises: [],
    category: 'Koordination',
    day: 2,
    duration: 20,
    calories: 60,
  },
  {
    id: 2,
    exercises: [],
    category: 'Beweglichkeit',
    day: 3,
    duration: 20,
    calories: 60,
  },
  {
    id: 3,
    exercises: [],
    category: 'Kardio',
    day: 4,
    duration: 20,
    calories: 60,
  },
  {
    id: 4,
    exercises: [],
    category: 'Krafttraining',
    day: 5,
    duration: 20,
    calories: 60,
  },
];

const WorkoutList = ({ className, duration, id }) => {
  const [workouts, setWorkouts] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  const loadAll = () => {
    // We would send a query here (using the given id to select the correct program)
    // and update the state once the result arrives.
    // For now, we just use a constant workout list that's the same for all programs.
    if (!allLoaded) {
      const allWorkouts = [...testWorkouts];
      setWorkouts(allWorkouts);
      setAllLoaded(true);
    }
  };

  // Initially, we load three workouts.
  useEffect(() => {
    const initialWorkouts = testWorkouts.slice(
      0,
      3
    ); /* normally, query result */
    setWorkouts(initialWorkouts);
  }, []);

  const renderedExercises = workouts?.map((workout) => {
    return <WorkoutListItem key={workout.id} workout={workout} />;
  });
  return (
    <div className={className}>
      <div className="header">
        <h3>{duration} Tage</h3>
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
