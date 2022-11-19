import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styled from "styled-components";
import DsGrid from "./DsGrid";
import useFetch from "../../hooks/useFetch";
import { createRows } from "./gridHelper";

const DsGridProviderContainer = styled.div``;

const Error = styled.h1`
  line-height: 200px;
  margin-top: -100px;
  position: absolute;
  text-align: center;
  top: 50%;
  width: 100%;
`;

const DsGridProvider = () => {
  const [rowsData, setRowsData] = useState([]);
  const { data, isLoading, isError } = useFetch(
    "https://exam1-6a572-default-rtdb.firebaseio.com/.json"
  );

  useEffect(() => {
    if (data.length > 0) {
      let gridRows = createRows(data);
      setRowsData(gridRows);
    }
  }, [data]);

  return (
    <DsGridProviderContainer>
      {!isError ? (
        <>
          {isLoading && <LoadingSpinner />}
          {rowsData.length > 0 && !isLoading && <DsGrid rowsData={rowsData} />}
        </>
      ) : (
        <Error>Failed to load the data</Error>
      )}
    </DsGridProviderContainer>
  );
};

export default DsGridProvider;
