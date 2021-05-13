import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { TextField, Button, Grid } from '@material-ui/core'
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
  const { kind, visibility, country, setOpen } = props
  const { register, handleSubmit, errors } = useForm()
  const classes = useStyles()
  const [formData, setFormData] = useState({})
  // const {
  //   auth: { user },
  // } = store.getState()
  // let userId:any;
  // visibility==='Public'?userId=null:userId=user.id;
  const onSubmit = (data: any, e:any) => {
    data = {
      ...data ,
      kind: kind,
      country_id: country,
      visibility: visibility,
    }
    // if (userId!==null) {
    //   data = {
    //   ...data,
    //   user_id: userId,
    //   }
    // }
    setFormData(data);
    setOpen(false);
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
  }, [ContactDispatch, formData, setOpen])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <TextField
          name="kind"
          label="Kind"
          disabled
          value = { kind }
          variant="filled"
          inputRef={register}
          className={classes.root}
        />
        <TextField
          name="visibility"
          label="Select"
          variant="filled"
          value = { visibility }
          disabled
          inputRef={register}
          className={classes.root}
        ></TextField>
        <TextField
          name="name"
          label="name"
          variant="outlined"
          placeholder="Name"
          color="secondary"
          autoComplete= 'off'
          inputRef={register({ required: true, minLength: 3 })}
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
