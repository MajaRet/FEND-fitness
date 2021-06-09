import sanityClient from '@sanity/client';
import { useState, useEffect } from 'react';

const client = sanityClient({
  projectId: 'eae3hj1s',
  dataset: 'production',
  apiVersion: '2021-06-09',
  useCdn: true,
});

/**
 * Helper function for the hooks that handles the actual fetching.
 * @param {String} query           A GROQ query string.
 * @param {Object} params          An object with the query's parameters.
 * @param {Function} setFetchState A callback function to set the state inside
 *                                 the hooks.
 */
const execute = (query, params, setFetchState) => {
  client.fetch(query, params).then(
    (res) => {
      if (res) {
        setFetchState({ data: res });
      } else {
        setFetchState({ error: true });
      }
    },
    () => {
      setFetchState({ error: true });
    }
  );
};

/**
 * A custom hook to execute a GROQ query immediately.
 *
 * @param {String} query  A GROQ query string.
 * @param {Object} params An object with the query's parameters.
 * @returns an object that indicates the fetching status (loading, error)
 * and carries the fetched data in its data property after it arrives.
 */
export const useQuery = (query, params) => {
  const [fetchState, setFetchState] = useState({ loading: true });

  useEffect(() => {
    execute(query, params, setFetchState);
  }, [params, query]);

  return fetchState;
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
export const useLazyQuery = (query, params) => {
  const [fetchState, setFetchState] = useState({ loading: true });

  const executeQuery = () => {
    execute(query, params, setFetchState);
  };
  return [executeQuery, fetchState];
};
