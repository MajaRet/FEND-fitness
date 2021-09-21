import { useState, useEffect, useCallback, useRef } from 'react';
import equal from 'deep-equal';
import axios, { Method, AxiosResponse } from 'axios';

const apiURL = 'https://mighty-reef-82661.herokuapp.com';

const urlWithParamsToURL = (baseURL: string, params: object): string => {
  return `${baseURL}?${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
};

/**
 * Helper function for the hooks that handles the actual fetching.
 *
 * TODO: If the component that uses the fetching hook unmounts before
 * the request is resolved, this function will attempt to call state
 * setting functions on the unmounted component. Should find a fix for
 * that.
 */
async function executeFetch<FetchResult>(
  method: Method,
  url: string,
  data: object | undefined,
  setLoading: (isLoading: boolean) => void,
  setError: (hasError: boolean) => void,
  setSuccess: (wasSuccessful: boolean) => void,
  setData?: (data: FetchResult | null) => void
) {
  try {
    const fetchResult = (await axios({
      method,
      url: apiURL + url,
      data,
    })) as AxiosResponse<FetchResult>;
    if (fetchResult && fetchResult.status === 200) {
      if (setData) {
        setData(fetchResult.data);
      }
      setSuccess(true);
      setLoading(false);
    } else {
      setSuccess(false);
      setLoading(false);
      setError(true);
    }
  } catch (error) {
    setSuccess(false);
    setLoading(false);
    setError(true);
  }
}

interface QueryState<FetchResult> {
  loading: boolean;
  error: boolean;
  success: boolean;
  data?: FetchResult | null;
}

/**
 * A custom hook to get data from the API on demand.
 *
 * @param {string} endpoint  The API endpoint
 * @param {object} params    Optional query parameters as an object.
 *                           Will be encoded into the URL.
 */
export function useGet<FetchResult>(
  endpoint: string,
  urlParams?: object
): QueryState<FetchResult> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<FetchResult | null>(null);

  const queryRef = useRef<string>('');
  const url = urlParams ? urlWithParamsToURL(endpoint, urlParams) : endpoint;
  useEffect(() => {
    if (!queryRef.current || !equal(queryRef.current, url)) {
      queryRef.current = url;
      executeFetch(
        'GET',
        url,
        undefined,
        setLoading,
        setError,
        setSuccess,
        setData
      );
    }
  }, [endpoint, url]);

  return { loading, error, success, data };
}

/**
 * A custom hook to get data from the API on demand.
 *
 * @param {string} endpoint  The API endpoint
 */
export function useLazyGet<FetchResult>(
  endpoint: string
): [(params: object | undefined) => void, QueryState<FetchResult>] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<FetchResult | null>(null);

  const executeQuery = useCallback(
    (urlParams?: object) => {
      const url = urlParams
        ? urlWithParamsToURL(endpoint, urlParams)
        : endpoint;

      setLoading(true);
      executeFetch(
        'GET',
        url,
        undefined,
        setLoading,
        setError,
        setSuccess,
        setData
      );
    },
    [endpoint]
  );
  return [executeQuery, { loading, error, success, data }];
}

/**
 * A custom hook to get data from the API on demand.
 *
 * @param {string} endpoint  The API endpoint
 * @param {object} data      Optional payload data for the POST request
 */
export function usePost(endpoint: string, data?: object): QueryState<{}> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const queryRef = useRef<string>('');
  useEffect(() => {
    // Because params may have a different object identity even though the
    // parameters didn't truly change (for example because it is declared
    // as an object literal), we make sure that the query is only re-executed
    // when the parameters actually have different values by performing
    // a deep equality check with the previous parameter object.
    if (!queryRef.current || !equal(queryRef.current, data)) {
      queryRef.current = endpoint;
      executeFetch('POST', endpoint, data, setLoading, setError, setSuccess);
    }
  }, [endpoint, data]);

  return { loading, error, success };
}

/**
 * A custom hook to get data from the API on demand.
 * @param {String} endpoint The API endpoint.
 */
export function useLazyPost(
  endpoint: string
): [(params: object | undefined) => void, QueryState<{}>] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const executeQuery = useCallback(
    (params?: object) => {
      setLoading(true);
      executeFetch('POST', endpoint, params, setLoading, setError, setSuccess);
    },
    [endpoint]
  );
  return [executeQuery, { loading, error, success }];
}
