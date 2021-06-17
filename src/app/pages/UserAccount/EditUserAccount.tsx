import { FormControlLabel } from '@material-ui/core'
import { Typography, Grid, TextField, Button, Switch } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as userAccountsActions from './state/userAccountsActions'
export const EditUserAccount = (props: any) => {
  const { handleClose, singleAccount, handleDelete } = props
  const [formData, setFormData] = useState(null as any)
  const { register, handleSubmit, errors } = useForm()
  const [ active, setActive ] = useState(singleAccount.attributes.active)
  const dispatch = useDispatch()
  // preparacion dos datos do formulario
  const onSubmit = (data: any, e: any) => {
    const form = {
      ...data,
      active,
    }
    setFormData(form)
    handleClose()
  }
  useEffect(() => {
      if (formData!==null) {
          dispatch(userAccountsActions.updateUserAccount(formData, singleAccount.id))
      }
  }, [dispatch, formData, singleAccount])
  const handleChange = (e: any) => {
      setActive(e.target.checked)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h4">Edit User Account</Typography>
        </Grid>
        <Grid item container>
        <Grid item xs={7}>
          <TextField
            name="name"
            label="name"
            variant="outlined"
            margin="normal"
            placeholder="Name"
            defaultValue={singleAccount.attributes.name}
            autoComplete="off"
            inputRef={register({ required: true, minLength: 3 })}
          />
          {errors.name && errors.name.type === 'required' && <Alert severity="error">Name is required</Alert>}
          {errors.name && errors.name.type === 'minLength' && (
            <Alert severity="error">Name should be at-least 3 characters.</Alert>
          )}
          </Grid>
          <Grid item xs={5}>
          <FormControlLabel
          label="Active"
        control={
          <Switch
            checked={active}
            onChange={handleChange}
            name="active"
            color="primary"
          />
        }
        
      />
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item xs={3}>
            {/* delete */}
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Grid container justify="flex-end">
              {/* cancel */}
              <Button onClick={handleClose}>Cancel</Button>
              {/* save */}
              <Button type="submit" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
