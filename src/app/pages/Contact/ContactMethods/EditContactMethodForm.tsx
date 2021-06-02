import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Grid, MenuItem } from '@material-ui/core'
import * as contactsActions from './../state/contactsActions'
import { useDispatch } from 'react-redux'
import { types } from './AddContactMethodForm'
import store from './../../../../redux/store'

export const EditContactMethodForm = (props: any) => {
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column">
          <TextField
            select
            name="kind"
            label="Type"
            margin="normal"
            color="secondary"
            value={type}
            onChange={handleChange}
            inputRef={register}
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
            autoComplete="off"
            margin="normal"
            color="secondary"
            defaultValue={edit.data}
            inputRef={register}
          />
          <Grid container>
            <Button color="secondary" onClick={(e) => handleOpen(e, 'delete', edit)}>
              Delete
            </Button>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button id="submit" type="submit" variant="contained" color="secondary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
