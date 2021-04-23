import React from 'react';
import styled from 'styled-components';

import WorkoutList from './WorkoutList';
import ProgramHeader from './ProgramHeader';
import ProgramChart from './ProgramChart';
import ProgramDescription from './ProgramDescription';
import CloseButton from './../buttons/CloseButton';

// Thingie: We need the workout categories for the chart.
// So do we query the workouts? Just the categories, but
// still the workouts. And then the WorkoutList queries the
// full workouts, but only partially at first.
// I guess that's how it has to work.
// Actually, we could also just query in the Chart component
// so we only do it when the overlay is opened, not for
// every program in the list.
// No need for lazy/manual queries there, just useQuery with
// the program id. And we also only need the program id.
// But for now, I'll put in test workouts again.
const Program = ({ closeOverlay, className, program }) => {
  return (
    <div className={className}>
      <CloseButton onClick={closeOverlay} />
      <ProgramHeader program={program} />
      <ProgramDescription program={program} />
      <ProgramChart id={program.id} />
      <WorkoutList id={program.id} duration={program.duration} />
    </div>
  );
};

export default styled(Program)`
  > * {
    padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  }

  ${CloseButton} {
    position: absolute;
    top: var(--standard-padding-vertical);
    right: var(--standard-padding-horizontal);

    z-index: 2;

    padding: 0;
  }

  background-color: ${(props) => props.theme.backgroundPrimary};
`;
