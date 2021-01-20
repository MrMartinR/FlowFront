import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Grid, MenuItem } from '@material-ui/core'
/* eslint-disable no-restricted-imports*/
/**
 * Replace the form tag with the proper one
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

export const EditContactMethodForm = (props: any) => {
  const { selectedContact, edit } = props
  const { register, handleSubmit, errors } = useForm()
  const [type, setType] = React.useState(edit.kind)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }
  const onSubmit = (data: any) => {
    data['kind'] = type
    console.log('edit form', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction='column'>
        <TextField
          name='visibility'
          label='Visibility'
          variant='filled'
          value={edit.visibility}
        ></TextField>

        <TextField
          select
          name='kind'
          label='Type'
          value={type}
          onChange={handleChange}
          helperText='Please select contact type'
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
          defaultValue={edit.data}
        />

        <TextField
          name='notes'
          label='Notes'
          variant='filled'
          placeholder='Notes'
          inputRef={register}
          color='secondary'
          defaultValue={edit.notes}
        />
        <Button type='submit' variant='contained' color='secondary'>
          Submit
        </Button>
      </Grid>
    </form>
  )
}
export default EditContactMethodForm
