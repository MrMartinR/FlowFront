import React from "react";
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { TextField, Button, MenuItem } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import CompanyForm from "./CompanyForm";
import IndividualForm from "./IndividualForm";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    primary: {
      backgroundColor: blue[500],
      margin: 15,
    },
    success: {
      backgroundColor: green[500],
    },
  })
);

// add country later when the module is implemented
export const ContactAdd = (props: any) => {
  const { kind, visibility } = props;
  const classes = useStyles();
  const company = <CompanyForm kind={kind} visibility={visibility} />;

  const individual = <IndividualForm kind={kind} visibility={visibility} />;
  return (
    <div>
      {kind === "Company" ? <div>{company}</div> : <div>{individual}</div>}
    </div>
  );
};

export default ContactAdd;
