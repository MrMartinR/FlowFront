import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Grid, TextField, Button, FormControl, FormLabel, CardHeader, MenuItem, OutlinedInput } from '@material-ui/core'
import * as contactsActions from './../state/contactsActions'
import { useDispatch } from 'react-redux'
import { Alert } from '@material-ui/lab'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { contactMethodTypes } from './../../../utils/types'
type AddContactMethodType = {
  data: string
}
export const AddContactMethodForm = (props: any) => {
  const { selectedContact, handleClose } = props
  const [type, setType] = useState('Address')
  const [formData, setFormData] = useState(null as any)
  const AddContactMethodSchema = Yup.object().shape({
    data: Yup.string()
    .required('Data is required')
    .min(3, 'Data should be at least 3 characters.')
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddContactMethodSchema),
  })
  
  // garda o tipo de contact method seleccionado na lista
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }
  // Prepara os datos para enviar e pecha o dialog
  const dispatch = useDispatch()
  const onSubmit = ({ data }: AddContactMethodType) => {
    const form = {
      data,
      kind: type,
      contact_id: selectedContact.id,
      visibility: selectedContact.attributes?.visibility,
    }
    setFormData(form)
    handleClose()
  }
  // Chama a action createCOntactMethod cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(contactsActions.createContactMethods(formData))
    }
  }, [formData, dispatch])

  /* render the content */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <CardHeader title="Add Contact Method" />
        <FormControl margin="normal">
          <FormLabel>Type</FormLabel>
          <TextField
            value={type}
            onChange={handleChange}
            select
            name="Type"
            variant="outlined"
            size="small"
          >
            {contactMethodTypes.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl margin="normal">
          <FormLabel>Data</FormLabel>
          <OutlinedInput
            name="data"
            multiline
            margin="dense"
            autoComplete="off"
            inputRef={register()}
          />
        </FormControl>
        {errors.data && <Alert severity="error">{errors.data.message}</Alert>}
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
