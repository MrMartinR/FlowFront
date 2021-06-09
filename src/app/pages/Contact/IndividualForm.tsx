import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { TextField, Button, Grid } from '@material-ui/core'
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import * as contactsActions from './state/contactsActions'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 5,
    },
  })
)

export const IndividualForm = (props: any) => {
  const { kind, visibility, country, handleClose } = props
  const { register, handleSubmit, errors } = useForm()
  const classes = useStyles()
  const [formData, setFormData] = useState(null as any)
  // preparacion dos datos do formulario
  const onSubmit = (data: any, e: any) => {
    data = {
      ...data,
      kind: kind,
      country_id: country,
      visibility: visibility,
    }
    setFormData(data)
    handleClose()
  }
  const dispatch = useDispatch()
  // chamda a action createContact cando os datos do formulario estan listos
  useEffect(() => {
    if (formData !== null) {
      dispatch(contactsActions.createContact(formData))
    }
  }, [dispatch, formData])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <TextField
          name="kind"
          label="Kind"
          disabled
          value={kind}
          variant="filled"
          inputRef={register}
          className={classes.root}
        />
        <TextField
          name="visibility"
          label="Select"
          variant="filled"
          value={visibility}
          disabled
          inputRef={register}
          className={classes.root}
        ></TextField>
        <TextField
          name="name"
          label="name"
          variant="outlined"
          placeholder="Name"
          autoComplete="off"
          inputRef={register({ required: true, minLength: 3 })}
          className={classes.root}
        />
          {errors.name && errors.name.type === 'required' && <Alert severity="error">Name is required</Alert>}
          {errors.name && errors.name.type === 'minLength' && (
            <Alert severity="error">Name should be at-least 3 characters.</Alert>
          )}
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Grid>
    </form>
  )
}
