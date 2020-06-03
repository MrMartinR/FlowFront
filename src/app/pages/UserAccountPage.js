import React from "react";
import {useSubheader} from "../../_metronic/layout";

export const UserAccountPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("User Account");

  return (<>User Account Page</>);
};
