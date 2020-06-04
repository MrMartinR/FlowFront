import React from "react";
import {useSubheader} from "../../_metronic/layout";

export const LendingPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Lending");

  return (<>Lending Page</>);
};
