import React from "react";
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { TextField, Button, MenuItem } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
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
  const {kind, visibility} = props
  const classes = useStyles();
  const company = (
    <form noValidate autoComplete="off" >
      <TextField
        name="kind"
        label="Kind"
        variant="filled"
        placeholder="Kind"
        value={kind}
      />
      <TextField
        name="visibility"
        label="Select"
        value={visibility}
        helperText="Is it public or private"
        placeholder="Visibility"
      >
      </TextField>
      <TextField
        name="company_name"
        label="Company name"
        variant="filled"
        placeholder="Company name"
      />
      <TextField
        name="trade_name"
        label="Trade name"
        variant="filled"
        placeholder="Trade name"
      />
      <TextField
        name="legal_form"
        label="Legal form"
        variant="filled"
        placeholder="Legal form"
      />
      <TextField
        name="id_number"
        label="Id number"
        variant="filled"
        placeholder="Id number"
      />
      <TextField name="tags" label="Tags" variant="filled" placeholder="Tags" />
      <TextField
        name="founded"
        label="Founded"
        variant="filled"
        placeholder="Founded"
      />
      <TextField
        name="description"
        label="Description"
        variant="filled"
        placeholder="Description"
      />
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
  const individual = (
    <form noValidate autoComplete="off">
      <TextField
        name="kind"
        label="kind"
        variant="filled"
        placeholder="Kind"
        value={kind}
      />
      <TextField
        name="visibility"
        label="Select"
        value={visibility}
        helperText="Is it public or private"
        placeholder="Visibility"
      >
      </TextField>
      <TextField name="name" label="Name" variant="filled" placeholder="Name" />
      <TextField
        name="surname"
        label="Surname"
        variant="filled"
        placeholder="Surname"
      />
      <TextField
        name="id_number"
        label="Id number"
        variant="filled"
        placeholder="Id number"
      />
      <TextField
        name="description"
        label="Description"
        variant="filled"
        placeholder="Description"
      />
      <TextField name="tags" label="Tags" variant="filled" placeholder="Tags" />
      <TextField name="nick" label="Nick" variant="filled" placeholder="Nick" />
      <TextField
        name="dob"
        label="DOB"
        variant="filled"
        placeholder="Date of birth"
      />
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
  return (
    <div>
      {kind === "Company" ? (
        <div>{company}</div>
      ) : (
        <div>{individual}</div>
      ) }
    </div>
  );
};

export default ContactAdd;
