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
const visible = [
  {
    value: "Private",
    label: "Private",
  },
  {
    value: "Public",
    label: "Public",
  },
];
// add country later when the module is implemented
export const ContactAdd = (props: any) => {
  const classes = useStyles();
  const [kind, setKind] = React.useState("select" as any);

  const [visibility, setVisibility] = React.useState("Public");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value);
  };
  const handleClick = (e: any, value: any) => {
    if (value === "Company") {
      setKind(value);
    }
    if (value === "Individual") {
      setKind(value);
    }
  };

  const handleCompanySubmit = (event: any) => {
    let data = {
      kind: "null",
      visibility: "null",
      company_name: "null",
      trade_name: "null",
      legal_form: "null",
      id_number: "null",
      tags: "null",
      founded: "null",
      description: "null",
    } as any;
    data["kind"] = event.target.elements.kind.value || null;
    data["visibility"] = visibility;
    data["company_name"] = event.target.elements.company_name.value || null;
    data["trade_name"] = event.target.elements.trade_name.value || null;
    data["legal_form"] = event.target.elements.legal_form.value || null;
    data["id_number"] = event.target.elements.id_number.value || null;
    data["tags"] = event.target.elements.tags.value || null;
    data["founded"] = event.target.elements.founded.value || null;
    data["description"] = event.target.elements.description.value || null;

    console.log(data);
    event.preventDefault();
  };
  const handleIndividualSubmit = (event: any) => {
    let data = {
      kind: "null",
      visibility: "null",
      name: "null",
      surname: "null",
      nick: "null",
      id_number: "null",
      tags: "null",
      dob: "null",
      description: "null",
    } as any;
    data["kind"] = event.target.elements.kind.value || null;
    data["visibility"] = visibility;
    data["name"] = event.target.elements.name.value || null;
    data["surname"] = event.target.elements.surname.value || null;
    data["nick"] = event.target.elements.nick.value || null;
    data["id_number"] = event.target.elements.id_number.value || null;
    data["tags"] = event.target.elements.tags.value || null;
    data["dob"] = event.target.elements.dob.value || null;
    data["description"] = event.target.elements.description.value || null;

    console.log(data);
    event.preventDefault();
  };
  const company = (
    <form noValidate autoComplete="off" onSubmit={handleCompanySubmit}>
      <TextField
        name="kind"
        label="Kind"
        variant="filled"
        placeholder="Kind"
        value={kind}
      />
      <TextField
        name="visibility"
        select
        label="Select"
        value={visibility}
        onChange={handleChange}
        helperText="Is it public or private"
        placeholder="Visibility"
      >
        {visible.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
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
    <form noValidate autoComplete="off" onSubmit={handleIndividualSubmit}>
      <TextField
        name="kind"
        label="kind"
        variant="filled"
        placeholder="Kind"
        value={kind}
      />
      <TextField
        name="visibility"
        select
        label="Select"
        value={visibility}
        onChange={handleChange}
        helperText="Is it public or private"
        placeholder="Visibility"
      >
        {visible.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
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
      ) : kind === "Individual" ? (
        <div>{individual}</div>
      ) : (
        <div>
          <Button
            variant="contained"
            className={classes.primary}
            onClick={(e) => handleClick(e, "Company")}
          >
            Company
          </Button>
          <Button
            variant="contained"
            className={classes.primary}
            onClick={(e) => handleClick(e, "Individual")}
          >
            Individual
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactAdd;
