import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLazyQuery, gql } from '@apollo/client';

import ProgramCard from './ProgramCard';
import Label from './../labels/Label';
import FilterForm from './FilterForm';
/*
const loadProgramsQuery = gql`
  query LoadPrograms($offset: Int) {
    allProgram(limit: 3, offset: $offset) {
      title
    }
  }
`;
*/
const loadProgramsQuery = gql`
  query LoadPrograms($offset: Int!, $where: ProgramFilter) {
    allProgram(limit: 5, offset: $offset, where: $where) {
      title
      _id
    }
  }
`;

let observer;

// Right now, this just changes the constant array, but eventually
// it should write information back to the backend.
const persistFavorite = (id, b) => {
  console.log('Favoriting not implemented yet.');
  // programs.find((program) => id === program.id).favorite = b;
};

const Browse = ({ className }) => {
  const [programList, setProgramList] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [filter, setFilter] = useState({});
  const [loadPrograms, { error, data }] = useLazyQuery(loadProgramsQuery);

  // A bottom marker element
  const lastElemRef = useRef();

  // set programList
  useEffect(() => {
    if (data) {
      if (data.allProgram.length === 0) {
        setAllLoaded(true);
      }
      setProgramList((programList) => programList.concat(data.allProgram));
    }
  }, [data]);

  // The list of programs is reset if the filter options change.
  useEffect(() => {
    setProgramList([]);
    setAllLoaded(false);
  }, [filter]);

  useEffect(() => {
    const lastElem = lastElemRef.current;
    if (!allLoaded) {
      // If the observer is already set, unregister it.
      observer?.unobserve(lastElem);
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].intersectionRatio > 0) {
            loadPrograms({
              variables: {
                offset: programList.length,
                where: { ...filter },
              },
            });
          }
          //loadPrograms(entries, filter);
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 1.0,
        }
      );
      observer.observe(lastElem);
    } else {
      // Since all programs have been loaded, the observer is removed.
      observer.unobserve(lastElem);
    }
    return () => observer?.unobserve(lastElem);
  }, [loadPrograms, allLoaded, filter, programList]);

  const programCards = programList.map((program, i) => {
    return (
      <ProgramCard
        key={i}
        program={program}
        setFavorite={(b) => {
          const newProg = { ...program, favorite: b };
          // Persist the favorite status by writing it back to the "backend".
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

  // TODO remove
  if (error) {
    console.log(error);
  }

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
