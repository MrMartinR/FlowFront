import React from "react";
import {useSubheader} from "../../_metronic/layout";

export const AccountsPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Accounts");

  return (<>Accounts Page</>);
};
