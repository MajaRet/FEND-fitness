import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import ProgramCard from './ProgramCard';
import LabelButton from './../LabelButton';

// TODO Replace hardcoded programs with actual programs from the backend.
const programs = [
  { id: 0, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 1, title: 'Großmutter, wieso hast du so große Muskeln?' },
  { id: 2, title: 'Frau Holles Bootcamp' },
  { id: 3, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 4, title: 'Großmutter, wieso hast du so große Muskeln?' },
  { id: 5, title: 'Frau Holles Bootcamp' },
  { id: 6, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 7, title: 'Großmutter, wieso hast du so große Muskeln?' },
  { id: 8, title: 'Frau Holles Bootcamp' },
  { id: 9, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 10, title: 'Großmutter, wieso hast du so große Muskeln?' },
  { id: 11, title: 'Frau Holles Bootcamp' },
];

const programsToLoad = 3;

const Browse = ({ className }) => {
  const [programList, setProgramList] = useState([]);

  const lastElemRef = useRef();

  console.log('rerender');
  console.log(programList);
  const loadPrograms = () => {
    console.log('Load...');
    console.log(programList);
    const newElems = programs.slice(
      programList.length,
      programList.length + programsToLoad
    );
    const newList = programList.concat(newElems);
    console.log(programList.length, programList.length + programsToLoad);
    console.log(newElems);
    console.log(newList);
    setProgramList(newList);
  };

  // do useRef trick to only do some stuff on first render

  useEffect(() => {
    console.log('Initial list:');
    console.log(programs.slice(0, programsToLoad));
    setProgramList(programs.slice(0, programsToLoad));
    const observer = new IntersectionObserver(loadPrograms, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    observer.observe(lastElemRef.current);
    // TODO I don't want to disable this, but I don't see another way
    // right now...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const programCards = programList.map((program, i) => {
    return <ProgramCard key={i} program={program} />;
  });

  return (
    <div className={className}>
      <h2>Browse</h2>
      <LabelButton>Filter</LabelButton>
      {programCards}
      <p ref={lastElemRef}>Load</p>
    </div>
  );
};

export default styled(Browse)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  padding: 75px 0;
`;
