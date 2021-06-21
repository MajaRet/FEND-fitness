import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

import { useQuery, setActiveProgram } from '../../../api/sanity';
import { UserContext } from '../../../context';
import { getCurrentDay } from '../../../util/date';

import WorkoutList from './WorkoutList';
import ProgramHeader from './ProgramHeader';
import ProgramChart from './ProgramChart';
import ProgramDescription from './ProgramDescription';
import CloseButton from '../../elements/buttons/CloseButton';
import Button from '../../elements/buttons/Button';
import LoadingScreen from './../../elements/loading/LoadingScreen';

/**
 * Write information about the start of a new program to the backend.
 */
const persistNewActiveProgram = (userId, program) => {
  setActiveProgram(userId, program);
};

const Program = ({ className }) => {
  const { id } = useParams();
  const user = useContext(UserContext);

  const query = `*[_type == "user" && name == $userName] {
   "program": *[_type == "program" && slug.current == $slug]{
      _id,
      "isActive": ^.activeProgram.ActiveProgram._ref == _id,
      "isCompleted": count(*[^._id in (^.^.completedPrograms[]._ref)]) > 0,
      "currentWorkout": *[_type == "user" && name == $userName && activeProgram.ActiveProgram._ref == ^._id] {
        "completedToday": activeProgram.dateOfLastWorkoutCompletion >= $today,
        "lastCompletedDate": activeProgram.dateOfLastWorkoutCompletion,
        "day": select(
          activeProgram.day == 1 => 1,
          activeProgram.dateOfLastWorkoutCompletion >= $today => activeProgram.day - 1,
          activeProgram.dateOfLastWorkoutCompletion < $today => activeProgram.day,
        )
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
  }[0]
}[0]`;

  const params = {
    slug: id,
    userName: user.name,
    today: new Date().toISOString().split('T')[0],
  };

  const { data, loading } = useQuery(query, params);

  const program = data?.program;
  const currentDay = getCurrentDay(program);

  return (
    <div className={className}>
      <CloseButton as={Link} to="/browse" />
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
            currentDay={currentDay}
          />
          <Button
            as={Link}
            onClick={() => {
              if (!program.isActive) {
                persistNewActiveProgram(user.id, program._id);
              }
            }}
            to={`${id}/${currentDay}`}
            className="start-button"
          >
            jetzt starten
          </Button>
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
