import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { TextField, Button, Grid } from '@material-ui/core'
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import * as contactsActions from './state/contactsActions'
import Alert from '@material-ui/lab/Alert'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 5,
    },
  })
)

export const IndividualForm = (props: any) => {
  const { kind, visibility, country, handleClose } = props
  const classes = useStyles()
  const [formData, setFormData] = useState(null as any)
  const AddContactSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name should be at least 3 characters.')
      .max(50, 'Name should be less than 50 characters'),
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddContactSchema),
  })
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
        <TextField name="kind" label="Kind" disabled value={kind} variant="filled" className={classes.root} />
        <TextField
          name="visibility"
          label="Select"
          variant="filled"
          value={visibility}
          disabled
          className={classes.root}
        ></TextField>
        <TextField
          name="name"
          label="name"
          variant="outlined"
          placeholder="Name"
          autoComplete="off"
          inputRef={register()}
          className={classes.root}
        />
        {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
        <Button type="submit" color="primary">
          Save
        </Button>
      </Grid>
    </form>
  )
}
