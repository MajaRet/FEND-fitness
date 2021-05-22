import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import Overlay from '../../util/Overlay';
import CardHeader from './CardHeader';
import Program from '../program/Program';

const ProgramCard = ({ className, program, setFavorite }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Fragment>
      {detailsOpen ? (
        <Overlay setOpen={setDetailsOpen}>
          <Program
            programId={program._id}
            closeOverlay={() => setDetailsOpen(false)}
          />
        </Overlay>
      ) : null}
      <div
        className={className}
        onClick={() => {
          return setDetailsOpen(true);
        }}
      >
        <CardHeader
          isNew={program.isNew}
          isFavorite={program.favorite}
          setFavorite={setFavorite}
        />
        <h2>{program.title}</h2>
      </div>
    </Fragment>
  );
};

export default styled(ProgramCard)`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 215px;
  width: 100%;
  padding: 0 50px;
  border-radius: 5px;
  // TODO Also add the 'started' color to the theme.
  background-color: ${(props) =>
    props.program.status === 'started'
      ? 'rgb(var(--blue2))'
      : props.program.status === 'completed'
      ? `rgb(${props.theme.backgroundSecondary})`
      : `rgb(${props.theme.backgroundPrimary})`};

  ${CardHeader} {
    position: absolute;
    top: 12px;
  }
`;
