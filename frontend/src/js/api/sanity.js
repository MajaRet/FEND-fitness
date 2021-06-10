import sanityClient from '@sanity/client';
import { useState, useEffect, useCallback } from 'react';

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
const execute = (query, params, setLoading, setError, setData) => {
  client.fetch(query, params).then(
    (res) => {
      if (res) {
        setData(res);
        setLoading(false);
      } else {
        setData(null);
        setLoading(false);
        setError(true);
      }
    },
    () => {
      setData(null);
      setLoading(false);
      setError(true);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    execute(query, params, setLoading, setError, setData);
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
      execute(query, params, setLoading, setError, setData);
    },
    [query]
  );
  return [executeQuery, { loading, error, data }];
};
