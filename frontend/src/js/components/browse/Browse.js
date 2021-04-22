import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import ProgramCard from './ProgramCard';
import LabelButton from './../LabelButton';
import Label from './../Label';

// TODO Replace hardcoded programs with actual programs from the backend.
const programs = [
  { id: 0, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 1, title: 'Großmutter, wieso hast du so große Muskeln?' },
  { id: 2, title: 'Frau Holles Bootcamp' },
  { id: 3, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 4, title: 'Großmutter, wieso hast du so große Muskeln?', isNew: true },
  { id: 5, title: 'Frau Holles Bootcamp', isNew: true },
  { id: 6, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 7, title: 'Großmutter, wieso hast du so große Muskeln?', isNew: true },
  { id: 8, title: 'Frau Holles Bootcamp', isNew: true },
  { id: 9, title: 'Fit in 7 Tagen mit 7 Zwergen' },
  { id: 10, title: 'Großmutter, wieso hast du so große Muskeln?', isNew: true },
  { id: 11, title: 'Frau Holles Bootcamp', isNew: true },
  { id: 12, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 13, title: 'Großmutter, wieso hast du so große Muskeln?' },
  { id: 14, title: 'Frau Holles Bootcamp' },
  { id: 15, title: 'Fit in 7 Tagen mit 7 Zwergen' },
  { id: 16, title: 'Großmutter, wieso hast du so große Muskeln?' },
  { id: 17, title: 'Frau Holles Bootcamp' },
  { id: 18, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 19, title: 'Großmutter, wieso hast du so große Muskeln?' },
  { id: 20, title: 'Frau Holles Bootcamp' },
  { id: 21, title: 'Fit in 7 Tagen mit 7 Zwergen', status: 'started' },
  { id: 22, title: 'Großmutter, wieso hast du so große Muskeln?' },
  { id: 23, title: 'Frau Holles Bootcamp' },
];

const programsToLoad = 3;
let observer;

const Browse = ({ className }) => {
  const [programList, setProgramList] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  // A bottom marker element
  const lastElemRef = useRef();

  const loadPrograms = useCallback((entries) => {
    if (entries[0].intersectionRatio > 0) {
      setProgramList((programList) => {
        // Won't work like that when we have a backend.
        // We also won't want to iterate through the whole list first.
        return programList.concat(
          programs.slice(
            programList.length,
            programList.length + programsToLoad
          )
        );
      });
    }
  }, []);

  // TODO doesn't work with a filter term, but it has to be
  // changed anyway when the backend arrives.
  useEffect(() => {
    if (programList.length === programs.length) {
      setAllLoaded(true);
    }
  }, [programList]);

  useEffect(() => {
    if (!allLoaded) {
      // If the observer is already set, unregister it.
      observer?.unobserve(lastElemRef.current);
      observer = new IntersectionObserver(
        (entries) => {
          loadPrograms(entries);
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 1.0,
        }
      );
      observer.observe(lastElemRef.current);
    } else {
      // Since all programs have been loaded, the observer is removed.
      observer.unobserve(lastElemRef.current);
    }
  }, [loadPrograms, allLoaded]);

  const programCards = programList.map((program, i) => {
    return <ProgramCard key={i} program={program} />;
  });

  return (
    <div className={className}>
      <h2>Browse</h2>
      <LabelButton>Filter</LabelButton>
      {programCards}
      <Label ref={lastElemRef}>
        {programList.length === 0
          ? 'Keine Programme verfügbar'
          : 'Keine weiteren Programme verfügbar'}
      </Label>
    </div>
  );
};

export default styled(Browse)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  padding: 75px 0;
`;
