import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Grid, TextField, Button, CardHeader, MenuItem } from '@material-ui/core'
import * as contactsActions from './../state/contactsActions'
import { useDispatch } from 'react-redux'
import store from './../../../../redux/store'

/* define the types */
export const types = [
  {
    value: 'Address',
    label: 'Address',
  },
  {
    value: 'Email',
    label: 'Email',
  },
  {
    value: 'Phone',
    label: 'Phone',
  },
  {
    value: 'Skype',
    label: 'Skype',
  },
  {
    value: 'Telegram',
    label: 'Telegram',
  },
  {
    value: 'Instagram',
    label: 'Instagram',
  },
  {
    value: 'FB Page',
    label: 'FB Page',
  },
  {
    value: 'FB Profile',
    label: 'FB Profile',
  },
  {
    value: 'FB Group',
    label: 'FB Group',
  },
  {
    value: 'LinkedIn',
    label: 'LinkedIn',
  },
  {
    value: 'Twitter',
    label: 'Twitter',
  },
  {
    value: 'Vimeo',
    label: 'Vimeo',
  },
  {
    value: 'YouTube',
    label: 'YouTube',
  },
  {
    value: 'Web',
    label: 'Web',
  },
  {
    value: 'Other',
    label: 'Other',
  },
]

export const AddContactMethodForm = (props: any) => {
  const { selectedContact, handleClose } = props
  const { register, handleSubmit } = useForm()
  const [type, setType] = useState('Address')
  const [formData, setFormData] = useState(null as any)
  const {
    auth: { user },
  } = store.getState()
  // garda o tipo de contact method seleccionado na lista
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }

  const dispatch = useDispatch()
  // Prepara os datos para enviar e pecha o dialog
  const onSubmit = (data: {}, e: any) => {
    e.preventDefault()
    data = {
      ...data,
      kind: type,
      contact_id: selectedContact.id,
      created_by: user.id,
      visibility: selectedContact.attributes?.visibility,
    }
    setFormData(data)
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
        <TextField
          select
          name="kind"
          label="Type"
          margin="normal"
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
          margin="normal"
          autoComplete="off"
          color="secondary"
          inputRef={register}
        />
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
