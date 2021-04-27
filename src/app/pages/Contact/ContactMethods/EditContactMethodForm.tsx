import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Grid, MenuItem } from '@material-ui/core'
import * as contactsActions from './../state/contactsActions'
import { useDispatch } from 'react-redux'
import { types } from './AddContactMethodForm'
import store from './../../../../redux/store'
 
export const EditContactMethodForm = (props: any) => {
  const { edit, setOpen } = props
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = React.useState([] as any)
  const [params, SetParams] = React.useState('' as any)
  const [type, setType] = React.useState(edit.kind)
  const {
    auth: { user },
  } = store.getState()
  let dispatch = useDispatch()
  useEffect(() => {
    
    (async function () {
      var size = Object.keys(formData).length
      if (size > 0) {
        await dispatch(contactsActions.updateContactMethods(formData, params))
        setOpen(false);
      }
    })()
  }, [formData])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }
  const onSubmit = (data: any, e: any) => {
    SetParams(edit.id);
    data = { 
      ...data, 
      kind: type, 
      updated_by: user.id}
    setFormData(data);
  }
  return (
    <>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column">
        <TextField
            select
            name="kind"
            label="Type"
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
            autoComplete= 'off'
            color="secondary"
            defaultValue={edit.data}
            inputRef={register} />
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Grid>
      </form>
    </>
  )
}
export default EditContactMethodForm