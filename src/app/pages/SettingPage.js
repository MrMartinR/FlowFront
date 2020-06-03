import React from "react";
import {useSubheader} from "../../_metronic/layout";

export const SettingPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("setting");

  return (<>Setting Page</>);
};
