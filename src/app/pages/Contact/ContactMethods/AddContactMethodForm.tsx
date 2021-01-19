import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid, MenuItem } from "@material-ui/core";
/* eslint-disable no-restricted-imports*/
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 5,
    },
    
  })
);
const types = [
  {
    value: 'Twitter',
    label: 'Twitter',
  },
  {
    value: 'Facebook',
    label: 'Facebook',
  },
  {
    value: 'Instagram',
    label: 'Instagram',
  },
  {
    value: 'Linkedin',
    label: 'Linkedin',
  },
  {
    value: 'Youtube',
    label: 'Youtube',
  },
  {
    value: 'Pinterest',
    label: 'Pinterest',
  },
  {
    value: 'Trustpilot',
    label: 'Trustpilot',
  },
  {
    value: 'Email',
    label: 'Email',
  },
  {
    value: 'Web',
    label: 'Web',
  },
  {
    value: 'Phone',
    label: 'Phone',
  },
  {
    value: 'Address',
    label: 'Address',
  },
];

export const AddContactMethodForm = (props: any) => {
  const {selectedContact} = props
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const [type, setType] = React.useState('Email');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
  const onSubmit = (data: any) => {
    data["kind"] = type
    data["contact_id"] = selectedContact.id
    console.log("add form",data);
  }
  
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" >
      <TextField
          name="contact"
          label="Contact name"
          variant="filled"
          value={selectedContact.trade_name || selectedContact.name }
          className={classes.root}
        ></TextField>
        <TextField
          name="visibility"
          label="Visibility"
          variant="filled"
          value={selectedContact.visibility}
          className={classes.root}
        ></TextField>

      <TextField
          select
          name="kind"
          label="Type"
          value={type}
          onChange={handleChange}
          helperText="Please select contact type"
          inputRef={register}
          variant="filled"
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="data"
          label="Data"
          variant="filled"
          inputRef={register}
          className={classes.root}
        />
       
        <TextField
          name="notes"
          label="Notes"
          variant="filled"
          placeholder="Notes"
          inputRef={register}
          color="secondary"
          className={classes.root}
        />
        <br />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
        <br />
      </Grid>
    </form>
  );
};
export default AddContactMethodForm;
