import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { TextField, Button, Grid } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core'
import * as contactsActions from './state/contactsActions'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 5,
    },
  })
)

export const CompanyForm = (props: any) => {
  const { kind, visibility, country, handleClose } = props
  const { register, handleSubmit, errors } = useForm()
  const [formData, setFormData] = useState(null as any)
  // funcion que prepara os datos para facer a peticion e pecha o dialog
  const onSubmit = (data: any, e: any) => {
    data = { ...data, kind: kind, country_id: country, visibility: visibility }
    setFormData(data)
    handleClose()
  }
  const dispatch = useDispatch()
  // peticion cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(contactsActions.createContact(formData))
    }
  }, [dispatch, formData])
  const classes = useStyles()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <TextField
          name="kind"
          label="Kind"
          disabled
          variant="filled"
          value={kind}
          inputRef={register}
          className={classes.root}
        />
        <TextField
          name="visibility"
          label="Select"
          variant="filled"
          disabled
          value={visibility}
          inputRef={register}
          className={classes.root}
        ></TextField>

        <TextField
          name="trade_name"
          label="Trade name"
          variant="outlined"
          placeholder="Trade name"
          autoComplete="off"
          inputRef={register({ required: true, minLength: 3 })}
          className={classes.root}
        />
        {errors.trade_name && errors.trade_name.type === 'required' && (
          <Alert severity="error">Trade name is required</Alert>
        )}
        {errors.trade_name && errors.trade_name.type === 'minLength' && (
          <Alert severity="error">Trade name should be at-least 3 characters.</Alert>
        )}
        <Button type="submit" color='primary'>
          Save
        </Button>
      </Grid>
    </form>
  )
}
