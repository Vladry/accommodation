import { useCallback, useEffect, useState } from 'react';
import api from '../lib/API';

export const useFetch = ({
  instant = true,
  initData = null,
  onCompleted = (data) => data,
  dataTransformer = (data) => data,
  onError = (err) => err,
  ...axios
}) => {
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);

  const fetcher = useCallback(
    (options) => {
      const fetchOptions = { ...axios, ...options };
      if (fetchOptions.paramsStringify) {
        fetchOptions.url = `${fetchOptions.url}?${JSON.stringify(
          fetchOptions.paramsStringify
        )}`;
      }

      setLoading(true);

      return api(fetchOptions)
        .then(dataTransformer)
        .then((res) => {
          setData(res);
          onCompleted(res, options);
          return res;
        })
        .catch(onError)
        .finally(() => {
          setLoading(false);
        });
    },
    // eslint-disable-next-line
    [onCompleted, dataTransformer]
  );

  useEffect(() => {
    if (instant) {
      fetcher(axios);
    }
    // eslint-disable-next-line
  }, []);

  return [
    {
      data,
      loading,
      modifyData: setData
    },
    fetcher
  ];
};