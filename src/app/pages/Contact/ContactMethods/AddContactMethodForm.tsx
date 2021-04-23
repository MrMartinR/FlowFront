import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Grid, MenuItem } from '@material-ui/core'
import * as contactsActions from './../state/contactsActions'
import { useDispatch } from 'react-redux'
import store from './../../../../redux/store'
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
  const { selectedContact, setOpen } = props
  const { register, handleSubmit } = useForm()
  const [type, setType] = React.useState('Address')
  const [formData, setFormData] = React.useState({})
  const {
    auth: { user },
  } = store.getState()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }

  let MethodDispatch = useDispatch()
  useEffect(() => {
    (async function () {
      var size = Object.keys(formData).length
      if (size > 0) {
        await MethodDispatch(contactsActions.createContactMethods(formData))
        setOpen(false)
      }
    })()
  }, [MethodDispatch, formData])

  const onSubmit = (data: {}, e: any) => {
    data = {...data ,
      kind: type,
      contact_id: selectedContact.id,
      created_by: user.id,
      visibility: selectedContact.attributes?.visibility,
      user_id: selectedContact.attributes?.user
    }
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
            color="secondary"
            inputRef={register} />

          <TextField
            name="notes"
            label="Notes"
            placeholder="Notes"
            inputRef={register}
            color="secondary"
          />
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Grid>
      </form>
    </>
  )
}
export default AddContactMethodForm