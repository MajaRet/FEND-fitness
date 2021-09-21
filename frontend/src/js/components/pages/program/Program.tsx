import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

import { useGet, useLazyPost } from '../../../api/request';

import WorkoutList from './WorkoutList';
import ProgramHeader from './ProgramHeader';
import ProgramChart from './ProgramChart';
import ProgramDescription from './ProgramDescription';
import CloseLink from '../../elements/links/CloseLink';
import Button from '../../elements/buttons/Button';
import LoadingScreen from '../../elements/loading/LoadingScreen';
import { Program as ProgramType } from '../../../types/ProgramTypes';
import { Helmet } from 'react-helmet';

const Program = () => {
  const { programSlug } = useParams<{ programSlug: string }>();
  const [makePostRequest] = useLazyPost(`/api/programs/${programSlug}`);

  //   const query = `*[_type == "user" && name == $userName] {
  //    "program": *[_type == "program" && slug.current == $slug]{
  //       _id,
  //       "isActive": ^.activeProgram.ActiveProgram._ref == _id,
  //       "isCompleted": count(*[^._id in (^.^.completedPrograms[]._ref)]) > 0,
  //       "currentWorkout": *[_type == "user" && name == $userName && activeProgram.ActiveProgram._ref == ^._id] {
  //         "completedToday": activeProgram.dateOfLastWorkoutCompletion >= $today,
  //         "lastCompletedDate": activeProgram.dateOfLastWorkoutCompletion,
  //         "day": select(
  //           activeProgram.day == 1 => 1,
  //           activeProgram.dateOfLastWorkoutCompletion >= $today => activeProgram.day - 1,
  //           activeProgram.dateOfLastWorkoutCompletion < $today => activeProgram.day,
  //         )
  //       }[0],
  //     title,
  //     duration,
  //     difficulty,
  //     focus,
  //     description,
  //     "workouts": workouts[]{
  //       day,
  //       "workout": Workout-> {
  //         title,
  //         categories,
  //         calories,
  //         duration
  //       }
  //     }
  //   }[0]
  // }[0]`;

  const { data, loading } = useGet<ProgramType>(`/api/programs/${programSlug}`);

  const program = data;
  const currentDay = program?.currentDay || 1;

  return (
    <StyledProgram>
      <Helmet>
        <title>Programmdetails | Fitness Web App</title>
        <meta name="description" content="Details eines Fitness-Programms" />
      </Helmet>
      <CloseLink to="/programs" />
      {loading ? (
        <LoadingScreen color="red" />
      ) : program ? (
        <Fragment>
          <ProgramHeader program={program} />
          <ProgramDescription description={program.description} />
          <ProgramChart
            categories={program.workouts.flatMap(
              ({ workout }) => workout.categories
            )}
          />
          <WorkoutList workouts={program.workouts} currentDay={currentDay} />
          <Button
            as={Link}
            onClick={() => {
              if (!program.isActive) {
                makePostRequest({ action: 'start' });
              }
            }}
            to={`${programSlug}/${currentDay}`}
            className="start-button"
          >
            jetzt starten
          </Button>
        </Fragment>
      ) : (
        'Fehler!'
      )}
    </StyledProgram>
  );
};

const StyledProgram = styled.div`
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

export default Program;
