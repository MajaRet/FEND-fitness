import sanityClient from '@sanity/client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { nanoid } from 'nanoid';
import equal from 'deep-equal';

// NOTE: The write token is *not* secure as it will be exposed by React.
// But since this is a practice application, it doesn't matter much.
const client = sanityClient({
  projectId: 'eae3hj1s',
  dataset: 'production',
  apiVersion: '2021-06-09',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_WRITE_TOKEN,
});

/**
 * Helper function for the hooks that handles the actual fetching.
 *
 * @param {String} query        A GROQ query string.
 * @param {Object} params       An object with the query's parameters.
 * @param {Function} setLoading A callback function to set the loading state
 *                              inside a querying hook.
 * @param {Function} setError   A callback function to set the error state
 *                              inside a querying hook.
 * @param {Function} setData    A callback function to set the fetched data
 *                              inside a querying hook.
 */
async function executeFetch<FetchResult>(
  query: string,
  params: object,
  setLoading: (isLoading: boolean) => void,
  setError: (hasError: boolean) => void,
  setData: (data: FetchResult | null) => void
) {
  try {
    const data = await client.fetch(query, params);
    if (data) {
      setData(data);
      setLoading(false);
    } else {
      setData(null);
      setLoading(false);
      setError(true);
    }
  } catch (error) {
    setData(null);
    setLoading(false);
    setError(true);
    console.log(error);
  }
}

interface QueryState<FetchResult> {
  loading: boolean;
  error: boolean;
  data: FetchResult | null;
}

/**
 * A custom hook to execute a GROQ query immediately.
 *
 * @param {String} query  A GROQ query string.
 * @param {Object} params An object with the query's parameters.
 * @returns an object that indicates the fetching status (loading, error)
 * and carries the fetched data in its data property after it arrives.
 */
export function useQuery<FetchResult>(
  query: string,
  params: object | undefined
): QueryState<FetchResult> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<FetchResult | null>(null);

  const queryRef = useRef<object | null>(null);

  useEffect(() => {
    // Because params may have a different object identity even though the
    // parameters didn't truly change (for example because it is declared
    // as an object literal), we make sure that the query is only re-executed
    // when the parameters actually have different values by performing
    // a deep equality check with the previous parameter object.
    const newQuery = { query, ...params };
    if (!queryRef.current || !equal(queryRef.current, newQuery)) {
      queryRef.current = newQuery;
      executeFetch(query, params || {}, setLoading, setError, setData);
    }
  }, [params, query]);

  return { loading, error, data };
}

/**
 * A custom hook to execute a GROQ query manually.
 *
 * @param {String} query  A GROQ query string.
 * @param {Object} params An object with the query's parameters.
 * @returns a list consisting of a function to execute the query and an
 * object that indicates the fetching status (loading, error) and carries
 * the fetched data in its data property after it arrives.
 */
export function useLazyQuery<FetchResult>(
  query: string
): [(params: object | undefined) => void, QueryState<FetchResult>] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<FetchResult | null>(null);

  const executeQuery = useCallback(
    (params: object | undefined) => {
      setLoading(true);
      executeFetch(query, params || {}, setLoading, setError, setData);
    },
    [query]
  );
  return [executeQuery, { loading, error, data }];
}

/* Mutations */

/**
 * Adds a new reference to a list of references specific to a user, like
 * favorites or completed programs.
 * The list is treated as a set, so it will not contain duplicate values
 * and no order is guaranteed.
 *
 * @param {String} userId    The current user's id.
 * @param {String} fieldName The name of the field to add to. Should be a list.
 * @param {String} newRef    The reference pointing to the element to add.
 */
function addRefToUserSet(userId: string, fieldName: string, newRef: string) {
  client
    .patch(userId)
    .setIfMissing({ favorites: [] })
    .unset([`${fieldName}[_ref == "${newRef}"]`])
    .append(fieldName, [{ _type: 'reference', _ref: newRef, _key: nanoid() }])
    .commit()
    .catch((error) => console.log(error));
}

/**
 * Removes a reference from a list of references specific to a user, like
 * favorites or completed programs.
 *
 * @param {String} userId         The current user's id.
 * @param {String} fieldName      The name of the field to remove from.
 *                                Should be a list.
 * @param {String} refToDelete    The reference pointing to the element to
 *                                remove.
 */
function removeRefFromUserSet(
  userId: string,
  fieldName: string,
  refToDelete: string
) {
  client
    .patch(userId)
    .unset([`${fieldName}[_ref == "${refToDelete}"]`])
    .commit()
    .catch((error) => console.log(error));
}

/**
 * Sets a new active program on the given user and adds it
 * to the user's list of started programs if it isn't already
 * in there.
 *
 * @param {String} userId     The user's id.
 * @param {String} programRef The new active program's id.
 */
export function setActiveProgram(userId: string, programRef: string) {
  const today = new Date().toISOString();
  const activeProgram = {
    ActiveProgram: { _ref: programRef, _type: 'reference' },
    day: 1,
    dateOfLastWorkoutCompletion: today,
    completedExercises: [],
  };
  client
    .patch(userId)
    .set({ activeProgram })
    .setIfMissing({ startedPrograms: [] })
    .unset([`startedPrograms[_ref == "${programRef}"]`])
    .append('startedPrograms', [
      { _type: 'reference', _ref: programRef, _key: nanoid() },
    ])
    .commit()
    .catch((error) => console.log(error));
}

export function updateCompletedExercises(
  userId: string,
  newCompletedExercises: boolean[]
) {
  client
    .patch(userId)
    .set({ 'activeProgram.completedExercises': newCompletedExercises })
    .commit()
    .catch((error) => console.log(error));
}

export function completeCurrentWorkout(userId: string) {
  const today = new Date().toISOString();
  client
    .patch(userId)
    .inc({ 'activeProgram.day': 1 })
    .set({
      'activeProgram.dateOfLastWorkoutCompletion': today,
      'activeProgram.completedExercises': [],
    })
    .commit()
    .catch((error) => console.log(error));
}

export function completeActiveProgram(userId: string, programId: string) {
  client
    .patch(userId)
    .set({ activeProgram: {} })
    .setIfMissing({ completedPrograms: [] })
    .unset([`completedPrograms[_ref == "${programId}"]`])
    .append('completedPrograms', [
      { _type: 'reference', _ref: programId, _key: nanoid() },
    ])
    .commit()
    .catch((error) => console.log(error));
}
/**
 * Set a given program's favorite status.
 *
 * @param {String} userId    The current user's id.
 * @param {String} programId The program's id.
 * @param {Boolean} fav      A flag indicating what to set the favorite status
 *                           to.
 */
export function writeFavorite(
  userId: string,
  programId: string,
  isFavorite: boolean
) {
  if (isFavorite) {
    addRefToUserSet(userId, 'favorites', programId);
  } else {
    removeRefFromUserSet(userId, 'favorites', programId);
  }
}
