import { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useLazyQuery, writeFavorite } from '../../../api/sanity';
import { UserContext } from '../../../context';
import { BrowseList, BrowsedProgram, Filter } from '../../../types/BrowseTypes';

import ProgramCard from './ProgramCard';
import Label from '../../elements/labels/Label';
import FilterForm from './FilterForm';
import LoadingSpinner from '../../elements/loading/LoadingSpinner';

const pageSize = 5;

const getPrograms = `*[_type == "user" && name == $userName]{
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
}[0]`;

let observer: IntersectionObserver;

/**
 * Persist a new favorite status in the backend.
 *
 * @param {String} userId The currently logged-in user's id.
 * @param {String} id     The id of the program to be favorited.
 * @param {Boolean} b     A flag indicating whether to favorite or unfavorite.
 */
const persistFavorite = (
  userId: string,
  programId: string,
  isFavorite: boolean
) => {
  writeFavorite(userId, programId, isFavorite);
};

const StyledBrowse = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  padding: 75px 0;
`;

const Browse = () => {
  const [programList, setProgramList] = useState<BrowsedProgram[]>([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [filter, setFilter] = useState<Filter>({
    keyword: '',
    maxDuration: -1,
    minDuration: -1,
    favorite: false,
    difficulty: '',
  });

  const user = useContext(UserContext);
  const [loadPrograms, { loading, data }] =
    useLazyQuery<BrowseList>(getPrograms);

  // A bottom marker element
  const lastElemRef = useRef(null);

  // set programList
  useEffect(() => {
    if (data) {
      const { programs } = data;
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
      observer.disconnect();
    }
    return () => {
      observer?.disconnect();
    };
  }, [loadPrograms, allLoaded, filter, programList, user]);

  const programCards = programList.map((program, i) => {
    const handleFavoriting = (isFavorite: boolean) => {
      const newProg = { ...program, isFavorite };
      // Persist the favorite status by writing it to the backend.
      persistFavorite(user.id, program._id, isFavorite);
      setProgramList((programList) => [
        ...programList.slice(0, i),
        newProg,
        ...programList.slice(i + 1),
      ]);
    };
    return (
      <Link key={program._id} to={`/program/${program.slug.current}`}>
        <ProgramCard program={program} setFavorite={handleFavoriting} />
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
