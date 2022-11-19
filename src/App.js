import React from "react";
import Header from "./Components/Header/Header";
import GlobalStyles from "./styles/Global.styled";
import DsGridProvider from "./Components/deliveryServicesGrid/DsGridProvider";

const App = function () {
  return (
    <>
      <Header />
      <DsGridProvider />
      <GlobalStyles />
    </>
  );
};

export default App;
