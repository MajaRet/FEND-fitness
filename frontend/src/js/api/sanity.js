import sanityClient from '@sanity/client';
import { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';

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
async function executeFetch(query, params, setLoading, setError, setData) {
  try {
    // TODO Remove, just a check for overfetching
    console.log('%cATTENTION: Fetching', 'color: blue');
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

/**
 * A custom hook to execute a GROQ query immediately.
 *
 * @param {String} query  A GROQ query string.
 * @param {Object} params An object with the query's parameters.
 * @returns an object that indicates the fetching status (loading, error)
 * and carries the fetched data in its data property after it arrives.
 */
export const useQuery = (query, params) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    // TODO Remove
    console.log('%cATTENTION: useQuery', 'color: orange');
    executeFetch(query, params, setLoading, setError, setData);
  }, [params, query]);

  return { loading, error, data };
};

/**
 * A custom hook to execute a GROQ query manually.
 *
 * @param {String} query  A GROQ query string.
 * @param {Object} params An object with the query's parameters.
 * @returns a list consisting of a function to execute the query and an
 * object that indicates the fetching status (loading, error) and carries
 * the fetched data in its data property after it arrives.
 */
export const useLazyQuery = (query) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const executeQuery = useCallback(
    (params) => {
      setLoading(true);
      console.log('%cATTENTION: useLazyQuery executed', 'color: purple');
      executeFetch(query, params, setLoading, setError, setData);
    },
    [query]
  );
  return [executeQuery, { loading, error, data }];
};

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
export async function addToUserSet(userId, fieldName, newRef) {
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
export async function removeFromUserList(userId, fieldName, refToDelete) {
  client
    .patch(userId)
    .unset([`${fieldName}[_ref == "${refToDelete}"]`])
    .commit()
    .catch((error) => console.log(error));
}

/**
 * Sets a new active program on the given user.
 *
 * @param {String} userId     The user's id.
 * @param {String} programRef The new active program's id.
 */
export async function setActiveProgram(userId, programRef) {
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
export async function writeFavorite(userId, programId, fav) {
  if (fav) {
    addToUserSet(userId, 'favorites', programId);
  } else {
    removeFromUserList(userId, 'favorites', programId);
  }
}
