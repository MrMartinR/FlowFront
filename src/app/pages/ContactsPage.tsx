import React from "react";
import { useSubheader } from "../../_metronic/layout";

export const ContactsPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Contacts");

  return <h1>Contacts Page</h1>;
};
