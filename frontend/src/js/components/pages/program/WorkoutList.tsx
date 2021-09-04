import { useState } from 'react';
import styled from 'styled-components';

import { WorkoutWithDay } from '../../../types/ProgramTypes';

import WorkoutListItem from './WorkoutListItem';
import LabelButton from '../../elements/labels/LabelButton';

const StyledWorkoutList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;

  .header {
    display: flex;
    justify-content: space-between;
  }
`;

interface WorkoutListProps {
  workouts: WorkoutWithDay[];
  currentDay: number;
}

const WorkoutList = ({ workouts, currentDay }: WorkoutListProps) => {
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
    return (
      <WorkoutListItem
        className={workout.day === currentDay ? 'current' : ''}
        key={workout.day}
        workout={workout}
      />
    );
  });

  return (
    <StyledWorkoutList>
      <div className="header">
        <h3>{workouts.length} Tage</h3>
        <LabelButton onClick={loadAll}>Alle anzeigen</LabelButton>
      </div>
      {renderedExercises}
    </StyledWorkoutList>
  );
};

export default WorkoutList;
