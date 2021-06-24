import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { TextField, Button, Grid } from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core'
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
export const CompanyForm = (props: any) => {
  const { kind, visibility, country, handleClose } = props
  const [formData, setFormData] = useState(null as any)
  const AddContactSchema = Yup.object().shape({
    trade_name: Yup.string()
      .required('Trade name is required')
      .min(3, 'Trade name should be at least 3 characters.')
      .max(50, 'Trade name should be less than 50 characters'),
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddContactSchema),
  })
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
        <TextField name="kind" label="Kind" disabled variant="filled" value={kind} className={classes.root} />
        <TextField
          name="visibility"
          label="Select"
          variant="filled"
          disabled
          value={visibility}
          className={classes.root}
        ></TextField>

        <TextField
          name="trade_name"
          label="Trade name"
          variant="outlined"
          placeholder="Trade name"
          autoComplete="off"
          inputRef={register()}
          className={classes.root}
        />
        {errors.trade_name && <Alert severity="error">{errors.trade_name.message}</Alert>}
        <Button type="submit" color="primary">
          Save
        </Button>
      </Grid>
    </form>
  )
}
