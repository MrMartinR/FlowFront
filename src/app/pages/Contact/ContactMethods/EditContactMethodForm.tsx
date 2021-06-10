import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  FormLabel,
  OutlinedInput,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core'
import * as contactsActions from './../state/contactsActions'
import { useDispatch } from 'react-redux'
import { types } from './AddContactMethodForm'
import { Alert } from '@material-ui/lab'

/* styles */
const useStyles = makeStyles({
  root: {
    width: '400px',
  },
  type: {
    width: '140px',
    marginBottom: '12px',
  },
})
/* types */
type EditContactMethodType = {
  kind: string
  data: string
}
export const EditContactMethodForm = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { edit, handleClose, handleOpen } = props
  const [formData, setFormData] = useState(null as any)
  const [params, SetParams] = useState('' as any)
  const [type, setType] = useState(edit.kind)
  const dispatch = useDispatch()
  const { register, handleSubmit, errors } = useForm()
  // funcion que prepara os datos do formulario para o envio
  const onSubmit = ({ kind, data }: EditContactMethodType) => {
    SetParams(edit.id)
    const form = {
      data,
      kind,
    }
    setFormData(form)
    handleClose()
  }
  // chamada a action updateContactMethods cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(contactsActions.updateContactMethods(formData, params))
    }
  }, [formData, dispatch, params])
  // funcion que se chama o elexir unha opcion no select
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <Card className={classes.root}>
          <Grid item xs={12}>
            <CardHeader title="Edit Contact Method" />
            <CardContent>
              {/* type */}
              <FormControl required fullWidth size="small">
                <FormLabel>Type</FormLabel>
                <TextField
                  value={type}
                  onChange={handleChange}
                  inputRef={register}
                  select
                  name="kind"
                  // label="Type"
                  variant="outlined"
                  size="small"
                  className={classes.type}
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {/* data */}
                <FormLabel>Data</FormLabel>
                <OutlinedInput
                  name="data"
                  label="Data"
                  autoComplete="off"
                  defaultValue={edit.data}
                  inputRef={register({ required: true, minLength: 3 })}
                />
                {errors.data && errors.data.type === 'required' && <Alert severity="error">Data is required</Alert>}
                {errors.data && errors.data.type === 'minLength' && (
                  <Alert severity="error">Data should be at-least 3 characters.</Alert>
                )}
              </FormControl>
            </CardContent>
          </Grid>

          <CardActions>
            <Grid container>
              <Grid item xs={3}>
                {/* delete */}
                <Button onClick={(e) => handleOpen(e, 'delete', edit)} color="secondary">
                  Delete
                </Button>
              </Grid>
              <Grid item xs={9}>
                <Grid container justify="flex-end">
                  {/* cancel */}
                  <Button id="cancel" onClick={handleClose}>
                    Cancel
                  </Button>
                  {/* save */}
                  <Button id="submit" type="submit">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </form>
  )
}
