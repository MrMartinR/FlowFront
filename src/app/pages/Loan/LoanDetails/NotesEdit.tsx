import { FormControl, FormLabel, TextField, Button, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as loansActions from './../state/loansActions'
export const NotesEdit = (props: any) => {
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
      {/* notes */}
      <FormControl fullWidth margin="dense">
        <FormLabel>Notes</FormLabel>
        <TextField
          name="notes"
          multiline
          defaultValue={loanDetails.attributes.notes}
          placeholder="Notes"
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
