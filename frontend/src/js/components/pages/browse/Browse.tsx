import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useLazyGet } from '../../../api/request';
import { BrowsedProgram, Filter } from '../../../types/BrowseTypes';

import ProgramCard from './ProgramCard';
import Label from '../../elements/labels/Label';
import FilterForm from './FilterForm';
import LoadingSpinner from '../../elements/loading/LoadingSpinner';

const pageSize = 5;

let observer: IntersectionObserver;

const StyledBrowse = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  padding: 75px 0;
`;

const Browse = () => {
  const [programList, setProgramList] = useState<BrowsedProgram[]>([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [filter, setFilter] = useState<Filter>({});

  const [loadPrograms, { loading, data }] =
    useLazyGet<BrowsedProgram[]>('/api/programs');

  // A bottom marker element
  const lastElemRef = useRef(null);

  // update local program list whenever new data is fetched
  useEffect(() => {
    if (data) {
      const programs = data;
      if (programs.length < pageSize) {
        setAllLoaded(true);
      }
      setProgramList((prList) => prList.concat(programs));
    }
  }, [data]);

  // The list of programs is reset if the filter options change.
  useEffect(() => {
    setProgramList([]);
    setAllLoaded(false);
  }, [filter]);

  // Loading new elements if the bottom of the page is reached.
  useEffect(() => {
    const lastElem = lastElemRef.current;
    if (!lastElem) return;
    if (!allLoaded) {
      // If the observer is already set, unregister it.
      observer?.unobserve(lastElem);
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].intersectionRatio > 0) {
            // The end of the program list should be observed only once,
            // so unobserve it.
            observer.disconnect();
            loadPrograms({
              offset: programList.length,
              limit: pageSize,
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
      observer.disconnect();
    }
    // When the component is unmounted, we also disconnect the observer.
    return () => {
      observer?.disconnect();
    };
  }, [loadPrograms, allLoaded, filter, programList]);

  const programCards = programList.map((program, i) => {
    return (
      <Link key={program._id} to={`/programs/${program.slug}`}>
        <ProgramCard program={program} />
      </Link>
    );
  });

  return (
    <StyledBrowse>
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
    </StyledBrowse>
  );
};

export default Browse;
