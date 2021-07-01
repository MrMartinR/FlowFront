import { FormControl, FormLabel, TextField, Button, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as loansActions from './../state/loansActions'
export const DescriptionEdit = (props: any) => {
  const { loanDetails, handleClose } = props
  const { register, handleSubmit } = useForm()
  const [params, SetParams] = useState('' as any)
  const [formData, setFormData] = useState(null as any)
  const dispatch = useDispatch()
  // Funcion que prepara os datos do formulario para enviar
  const onSubmit = (data: any, e: any) => {
    SetParams(loanDetails.id)
    const form = {
      ...data,
    }
    setFormData(form)
    handleClose()
  }
  // chamada a accion de updateContact cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(loansActions.updateLoan(formData, params))
    }
  }, [formData, dispatch, params])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* description */}
      <FormControl fullWidth margin="dense">
        <FormLabel>Description</FormLabel>
        <TextField
          name="description"
          multiline
          defaultValue={loanDetails.attributes.description}
          placeholder="Description"
          autoComplete="off"
          inputRef={register()}
        />
      </FormControl>
      <Grid container justify="space-between">
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" color="primary">
          Save
        </Button>
      </Grid>
    </form>
  )
}
