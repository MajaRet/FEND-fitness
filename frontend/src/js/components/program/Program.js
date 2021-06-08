import React from 'react';
import styled from 'styled-components';

import WorkoutList from './WorkoutList';
import ProgramHeader from './ProgramHeader';
import ProgramChart from './ProgramChart';
import ProgramDescription from './ProgramDescription';
import Button from './../buttons/Button';
import CloseButton from './../buttons/CloseButton';

const Program = ({ closeOverlay, className, program }) => {
  return (
    <div className={className}>
      <CloseButton onClick={closeOverlay} />
      <ProgramHeader program={program} />
      <ProgramDescription program={program} />
      <ProgramChart id={program.id} />
      <WorkoutList id={program.id} duration={program.duration} />
      <Button>jetzt starten</Button>
    </div>
  );
};

export default styled(Program)`
  background-color: ${(props) => props.theme.backgroundPrimary};

  > :not(${Button}) {
    padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  }

  ${CloseButton} {
    position: absolute;
    top: var(--standard-padding-vertical);
    right: var(--standard-padding-horizontal);

    z-index: 2;

    padding: 0;
  }

  ${Button} {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
