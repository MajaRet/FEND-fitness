import React, { Fragment, useState, useMemo, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useQuery } from '../../../api/sanity';
import { UserContext } from '../../../context';

import WorkoutList from './WorkoutList';
import ProgramHeader from './ProgramHeader';
import ProgramChart from './ProgramChart';
import ProgramDescription from './ProgramDescription';
import CloseLink from '../../elements/links/CloseLink';
import Button from '../../elements/buttons/Button';
import Workout from '../workout/Workout';
import LoadingScreen from './../../elements/loading/LoadingScreen';

const Program = ({ className }) => {
  const [workoutOpen, setWorkoutOpen] = useState(false);
  const { id } = useParams();
  const user = useContext(UserContext);

  const query = `*[_type == "program" && slug.current == $slug]{
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
  }`;
  const params = useMemo(() => {
    return { slug: id };
  }, [id]);
  /*
  const query = `*[_type == "program" && slug.current == $slug]{
    title,
    duration,
    difficulty,
    focus,
    description,
    "workouts": workouts {
      day,
      "workout": Workout { 
        _id,
        title,
        categories,
        calories,
        duration
      }
    }`;
  const params = { slug: id };
  */

  /*
  const query = gql`
    query GetProgram {
      allProgram(where: {slug: {current: {eq: "${id}"} }}) {
        title
        duration
        difficulty
        focus
        description
        workouts { 
          day
          Workout { 
            _id
            title
            categories
            calories
            duration
          }
        }
      }
    }
  `;
*/
  const { data, loading } = useQuery(query, params);

  let program;
  if (data) {
    [program] = data;
    // TODO Don't just take the first workout, take the current one.
    // Need support in the backend for that.
    // const currentWorkout = program.workouts[0];
    if (workoutOpen)
      return <Workout closeWorkout={() => setWorkoutOpen(false)} />;
  }
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
          <Button
            className="start-button"
            onClick={() => {
              setWorkoutOpen(true);
            }}
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
