import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useLazyQuery, writeFavorite } from '../../../api/sanity';
import { UserContext } from '../../../context';

import ProgramCard from './ProgramCard';
import Label from './../../elements/labels/Label';
import FilterForm from './FilterForm';
import LoadingSpinner from './../../elements/loading/LoadingSpinner';

const pageSize = 5;
const getPrograms = `*[_type == "user" && name == $userName]{
  name,
  activeProgram,
  "favorites": favorites[]{_ref},
  "programs": *[_type == "program" 
  && ($keyword == "" || title match $keyword || description match $keyword)
  && ($minDuration == -1 || duration >= $minDuration)
  && ($maxDuration == -1 || duration <= $maxDuration)
  && (!$favorite || _id in ^.favorites[]._ref)
  && ($difficulty == "none" || $difficulty == "all" || $difficulty == "" || difficulty == $difficulty)] {
    _id,
    title,
    slug,
    "isFavorite": count(*[^._id in (^.^.favorites[]._ref)]) > 0,
    "isActive": _id == ^.activeProgram.ActiveProgram._ref,
    "isNew": count(*[^._id in ^.^.startedPrograms[]._ref]) == 0,
    "isCompleted": count(*[^._id in (^.^.completedPrograms[]._ref)]) > 0
  }[$offset ... $offset + 5]
}`;

let observer;

/**
 * Persist a new favorite status in the backend.
 *
 * @param {String} userId The currently logged-in user's id.
 * @param {String} id     The id of the program to be favorited.
 * @param {Boolean} b     A flag indicating whether to favorite or unfavorite.
 */
const persistFavorite = (userId, id, b) => {
  writeFavorite(userId, id, b);
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

  const user = useContext(UserContext);
  const [loadPrograms, { loading, data }] = useLazyQuery(getPrograms);

  // A bottom marker element
  const lastElemRef = useRef();

  // set programList
  useEffect(() => {
    if (data) {
      const [{ programs }] = data;
      if (programs.length < pageSize) {
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

  // Loading new elements if the bottom of the page is reached.
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
              userName: user.name,
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
    return () => {
      console.log('Unmount!');
      observer?.unobserve(lastElem);
    };
  }, [loadPrograms, allLoaded, filter, programList, user]);

  const programCards = programList.map((program, i) => {
    return (
      <Link key={i} to={`/program/${program.slug.current}`}>
        <ProgramCard
          program={program}
          setFavorite={(b) => {
            const newProg = { ...program, isFavorite: b };
            // Persist the favorite status by writing it to the backend.
            persistFavorite(user.id, program._id, b);
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
