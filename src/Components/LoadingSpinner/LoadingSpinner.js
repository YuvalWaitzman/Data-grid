import styled from "styled-components";
import React from "react";
import "antd/dist/antd.css";
import { Spin } from "antd";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10rem;
`;

const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spin tip="Loading..." />
  </SpinnerContainer>
);

export default LoadingSpinner;
