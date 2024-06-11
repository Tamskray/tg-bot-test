import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch the data");
        }

        return response.json();
      })
      .then((data) => {
        data && setData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [url]);

  return { data, error };
};
