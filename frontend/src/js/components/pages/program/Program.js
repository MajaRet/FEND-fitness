import React, { Fragment, useMemo, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useQuery } from '../../../api/sanity';
import { UserContext } from '../../../context';
import { getCurrentDay } from '../../../util/date';

import WorkoutList from './WorkoutList';
import ProgramHeader from './ProgramHeader';
import ProgramChart from './ProgramChart';
import ProgramDescription from './ProgramDescription';
import CloseLink from '../../elements/links/CloseLink';
import ButtonLink from '../../elements/links/ButtonLink';
import LoadingScreen from './../../elements/loading/LoadingScreen';

const Program = ({ className }) => {
  const { id } = useParams();
  const user = useContext(UserContext);

  const query = `*[_type == "program" && slug.current == $slug]{
      "currentWorkout": *[_type == "user" && name == $userName && activeProgram.ActiveProgram._ref == ^._id] {
        "lastCompletedDate": activeProgram.dateOfLastWorkoutCompletion,
        "day": activeProgram.day
      }[0],
      title,
    duration,
    difficulty,
    focus,
    description,
    "workouts": workouts[]{ 
      day,
      "workout": Workout-> {
        title,
        categories,
        calories,
        duration
      }
    }
  }[0]`;
  const params = useMemo(() => {
    return {
      slug: id,
      userName: user.name,
    };
  }, [id, user]);

  const { data, loading } = useQuery(query, params);

  const program = data;
  const currentDay = program ? getCurrentDay(program.currentWorkout) : null;

  return (
    <div className={className}>
      <CloseLink to="/browse" />
      {loading ? (
        <LoadingScreen />
      ) : program ? (
        <Fragment>
          <ProgramHeader program={program} />
          <ProgramDescription description={program.description} />
          <ProgramChart
            categories={program.workouts.flatMap(
              ({ workout }) => workout.categories
            )}
          />
          <WorkoutList
            workouts={program.workouts}
            duration={program.duration}
          />
          <ButtonLink to={`${id}/${currentDay}`} className="start-button">
            jetzt starten
          </ButtonLink>
        </Fragment>
      ) : (
        'Fehler!'
      )}
    </div>
  );
};

export default styled(Program)`
  min-height: 100vh;

  > :not(.start-button) {
    padding: var(--standard-padding-vertical) var(--standard-padding-horizontal);
  }

  .start-button {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 25px;
  }

  background-color: ${(props) => `rgb(${props.theme.backgroundPrimary})`};
`;
