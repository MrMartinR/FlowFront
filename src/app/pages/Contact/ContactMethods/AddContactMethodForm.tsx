import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Grid, MenuItem } from '@material-ui/core'
/* eslint-disable no-restricted-imports*/
import * as contactMethodsActions from './state/contactMethodsActions'
import { useDispatch } from 'react-redux'

/**
 * @rev  Tyred to find the substitute for <form tag, when you replate it with the material UI,
 * send a message to Mohd and ask him to change the one he has in the Login
 */

const types = [
  {
    value: 'Twitter',
    label: 'Twitter',
  },
  {
    value: 'Facebook',
    label: 'Facebook',
  },
  {
    value: 'Instagram',
    label: 'Instagram',
  },
  {
    value: 'Linkedin',
    label: 'Linkedin',
  },
  {
    value: 'Youtube',
    label: 'Youtube',
  },
  {
    value: 'Pinterest',
    label: 'Pinterest',
  },
  {
    value: 'Trustpilot',
    label: 'Trustpilot',
  },
  {
    value: 'Email',
    label: 'Email',
  },
  {
    value: 'Web',
    label: 'Web',
  },
  {
    value: 'Phone',
    label: 'Phone',
  },
  {
    value: 'Address',
    label: 'Address',
  },
]

export const AddContactMethodForm = (props: any) => {
  const { selectedContact } = props
  const { register, handleSubmit, errors } = useForm()
  const [type, setType] = React.useState('Email')
  const [formData, setFormData] = React.useState([] as any)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }
  let MethodDispatch = useDispatch()
  useEffect(() => {
    var size = Object.keys(formData).length
    if (size > 0) {
      MethodDispatch(contactMethodsActions.createContactMethods(formData))
    }
  }, [MethodDispatch, formData])

  const onSubmit = (data: any) => {
    data['kind'] = type
    data['contact_id'] = selectedContact.id
    data['visibility'] = selectedContact.visibility
    setFormData(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column'>
        <TextField
          name='contact'
          label='Contact name'
          variant='filled'
          value={selectedContact.trade_name || selectedContact.name}
        ></TextField>
        <TextField
          name='visibility'
          label='Visibility'
          variant='filled'
          value={selectedContact.visibility}
        ></TextField>

        <TextField
          select
          name='kind'
          label='Type'
          value={type}
          onChange={handleChange}
          helperText='Please select contact type'
          inputRef={register}
          variant='filled'
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name='data'
          label='Data'
          variant='filled'
          inputRef={register}
        />

        <TextField
          name='notes'
          label='Notes'
          variant='filled'
          placeholder='Notes'
          inputRef={register}
          color='secondary'
        />
        <Button type='submit' variant='contained' color='secondary'>
          Submit
        </Button>
      </Grid>
    </form>
  )
}
export default AddContactMethodForm
