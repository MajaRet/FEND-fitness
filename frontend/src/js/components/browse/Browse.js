import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import ProgramCard from './ProgramCard';
import Label from './../Label';
import FilterForm from './FilterForm';

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

// Right now, this just changes the constant array, but eventually
// it should write information back to the backend.
const persistFavorite = (id, b) => {
  programs.find((program) => id === program.id).favorite = b;
};

const Browse = ({ className }) => {
  const [programList, setProgramList] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [filter, setFilter] = useState({ filterTerm: '' });

  // A bottom marker element
  const lastElemRef = useRef();

  const loadPrograms = useCallback((entries, filter) => {
    if (entries[0].intersectionRatio > 0) {
      setProgramList((programList) => {
        // Won't work like that when we have a backend.
        // We also won't want to iterate through the whole list first.
        return programList.concat(
          programs
            .filter(
              (program) =>
                program.title
                  .toLowerCase()
                  .includes(filter.filterTerm.toLowerCase()) &&
                (!filter.startedIsChecked || program.status === 'started') &&
                (!filter.newIsChecked || program.isNew) &&
                (!filter.favoriteIsChecked || program.favorite)
            )
            .slice(programList.length, programList.length + programsToLoad)
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

  // The list of programs is reset if the filter options change.
  useEffect(() => {
    setProgramList([]);
    setAllLoaded(false);
  }, [filter]);

  useEffect(() => {
    if (!allLoaded) {
      // If the observer is already set, unregister it.
      observer?.unobserve(lastElemRef.current);
      observer = new IntersectionObserver(
        (entries) => {
          loadPrograms(entries, filter);
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
    // TODO Do I need to return a cleanup function for the observer?
  }, [loadPrograms, allLoaded, filter]);

  const programCards = programList.map((program, i) => {
    return (
      <ProgramCard
        key={i}
        program={program}
        setFavorite={(b) => {
          const newProg = { ...program, favorite: b };
          // Persist the favorite status by writing it back to the backend.
          persistFavorite(program.id, b);
          setProgramList((programList) => [
            ...programList.slice(0, i),
            newProg,
            ...programList.slice(i + 1),
          ]);
        }}
      />
    );
  });

  return (
    <div className={className}>
      <h2>Browse</h2>
      <FilterForm setFilter={setFilter} />
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
