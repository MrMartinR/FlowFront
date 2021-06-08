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
import store from './../../../../redux/store'

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

export const EditContactMethodForm = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { edit, handleClose, handleOpen } = props
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState(null as any)
  const [params, SetParams] = useState('' as any)
  const [type, setType] = useState(edit.kind)
  const {
    auth: { user },
  } = store.getState()
  const dispatch = useDispatch()
  // funcion que prepara os datos do formulario para o envio
  const onSubmit = (data: any, e: any) => {
    SetParams(edit.id)
    data = {
      ...data,
      kind: type,
      updated_by: user.id,
    }
    setFormData(data)
    handleClose()
  }
  // chamada a action updateContactMethods cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(contactsActions.updateContactMethods(formData, params))
    }
  }, [formData, dispatch, params])
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
                  name="type"
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
                  multiline
                  name="data"
                  // label="Data"
                  autoComplete="off"
                  defaultValue={edit.data}
                  inputRef={register}
                />
              </FormControl>
            </CardContent>
          </Grid>

          <CardActions>
            <Grid container>
              <Grid item xs={3}>
                {/* delete */}
                <Button color="secondary" onClick={(e) => handleOpen(e, 'delete', edit)}>
                  Delete
                </Button>
              </Grid>
              <Grid item xs={9}>
                <Grid container justify='flex-end'>
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
