import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { TextField, Button, Grid, TextareaAutosize } from '@material-ui/core'
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import * as contactsActions from './state/contactsActions'
import Alert from '@material-ui/lab/Alert'
import store from './../../../redux/store'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 5,
    },
  })
)

export const IndividualForm = (props: any) => {
  const { kind, visibility, edit, selectedContact, country, setOpen } = props
  const { register, handleSubmit, errors } = useForm()
  const classes = useStyles()
  const [formData, setFormData] = useState({})

  const name = edit? selectedContact.attributes.name: '';
  const surname = edit? selectedContact.attributes.surname: '';
  const nick = edit? selectedContact.attributes.nick: '';
  const id_number = edit? selectedContact.attributes.id_number: '';
  const desc = edit? selectedContact.attributes.description: '';
  const [description, setDescription] = useState(desc);
  const handleChange = (e:any) => {
    setDescription(e.target.value);
  }
  const {
    auth: { user },
  } = store.getState()
  let userId:any;
  visibility==='Public'?userId=null:userId=user.id;
  const onSubmit = (data: any, e:any) => {
    data = {...data ,
      kind: kind,
      country_id: country,
      visibility: visibility,
      description: description,
    }
    if (userId!==null) {
      data = {
      ...data,
      user_id: userId,
      }
    }
    setFormData(data);
  }
  let ContactDispatch = useDispatch()
  useEffect(() => {
    (async function () {
      var size = Object.keys(formData).length
      if (size > 0) {
        await ContactDispatch(contactsActions.createContact(formData))
        setOpen(false)
      }
    })()
  }, [ContactDispatch, formData])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <TextField
          name="kind"
          label="Kind"
          disabled
          variant="filled"
          defaultValue={kind}
          inputRef={register}
          className={classes.root}
        />
        <TextField
          name="visibility"
          label="Select"
          variant="filled"
          disabled
          defaultValue={visibility}
          inputRef={register}
          className={classes.root}
        ></TextField>
        <TextField
          name="name"
          label="name"
          variant="outlined"
          defaultValue={ name }
          placeholder="Name"
          color="secondary"
          inputRef={register({ required: true, minLength: 3 })}
          className={classes.root}
        />
        <TextField
          name="surname"
          label="surname"
          variant="outlined"
          defaultValue={ surname }
          placeholder="Surname"
          color="secondary"
          inputRef={register({ required: false })}
          className={classes.root}
        />
        <TextField
          name="nick"
          label="nick"
          variant="outlined"
          defaultValue={ nick }
          placeholder="Nick"
          color="secondary"
          inputRef={register({ required: false })}
          className={classes.root}
        />
        <TextField
          name="id_number"
          label="id_number"
          variant="outlined"
          defaultValue={ id_number }
          placeholder="ID Number"
          color="secondary"
          inputRef={register({ required: false })}
          className={classes.root}
        />
        <TextareaAutosize
          name="description"
          rowsMin= { 5 }
          defaultValue={ description }
          placeholder="Description"
          color="secondary"
          onChange= { handleChange }
          className={classes.root}
        />
        {errors.name && <Alert severity="error">name is required</Alert>}
        {errors.name && errors.name.type === 'minLength' && (
          <Alert severity="error">Name should be at-least 3 characters.</Alert>
        )}

        <br />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
        <br />
      </Grid>
    </form>
  )
}
export default IndividualForm
