import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import { useLazyQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import { useLazyQuery } from '../../../api/sanity';

import ProgramCard from './ProgramCard';
import Label from './../../elements/labels/Label';
import FilterForm from './FilterForm';
import LoadingSpinner from './../../elements/loading/LoadingSpinner';

const getPrograms = `*[_type == "user" && name == "Schneewittchen"]{
  name,
  activeProgram,
  "favorites": favorites[]{_ref},
  "programs": *[_type == "program" 
  && ($keyword == "" || title match $keyword || description match $keyword)
  && ($minDuration == -1 || duration >= $minDuration)
  && ($maxDuration == -1 || duration <= $maxDuration)
  && (!$favorite || _id in ^.favorites[]._ref)
  && ($difficulty == "" || difficulty == $difficulty)] {
    title,
    slug,
    "favorite": count(*[^._id in (^.^.favorites[]._ref)]) > 0,
    "active": count(*[^._id == ^.^.activeProgram._ref]) > 0
  }[$offset ... $offset + 5]
}`;

let observer;

// Right now, this just changes the constant array, but eventually
// it should write information back to the backend.
const persistFavorite = (id, b) => {
  console.log('Favoriting not implemented yet.');
};

const Browse = ({ className }) => {
  const [programList, setProgramList] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [filter, setFilter] = useState({
    keyword: '',
    maxDuration: -1,
    minDuration: -1,
    favorite: false,
    difficulty: '',
  });
  const [loadPrograms, { error, loading, data }] = useLazyQuery(getPrograms);

  // A bottom marker element
  const lastElemRef = useRef();

  // set programList
  useEffect(() => {
    if (data) {
      const [{ programs }] = data;
      if (programs.length === 0) {
        setAllLoaded(true);
      }
      setProgramList((programList) => programList.concat(programs));
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
            // The end of the program list should be observed only once,
            // so unobserve it.
            observer.unobserve(entries[0].target);
            loadPrograms({
              offset: programList.length,
              ...filter,
            });
          }
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
      <Link key={i} to={`/program/${program.slug.current}`}>
        <ProgramCard
          program={program}
          setFavorite={(b) => {
            const newProg = { ...program, favorite: b };
            // Persist the favorite status by writing it back to the backend.
            persistFavorite(program._id, b);
            setProgramList((programList) => [
              ...programList.slice(0, i),
              newProg,
              ...programList.slice(i + 1),
            ]);
          }}
        />
      </Link>
    );
  });

  return (
    <div className={className}>
      <h2>Browse</h2>
      <FilterForm setFilter={setFilter} />
      {programCards}
      <Label ref={lastElemRef}>
        {loading ? (
          <LoadingSpinner />
        ) : programList.length === 0 ? (
          'Keine Programme verfügbar'
        ) : (
          'Keine weiteren Programme verfügbar'
        )}
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
