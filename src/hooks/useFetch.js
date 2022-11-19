import React, { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async function (url) {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const dataToJson = await response.json();
      setData(dataToJson);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return {
    isLoading,
    data,
    isError,
  };
};

export default useFetch;
