import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Grid, MenuItem, Collapse, IconButton } from '@material-ui/core'
import {Alert, AlertTitle} from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import * as contactMethodsActions from './state/ContactMethodsActions'
import { useDispatch } from 'react-redux'


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
  const { selectedContact, methodsState } = props
  const { register, handleSubmit } = useForm()
  const [type, setType] = React.useState('Email')
  const [formData, setFormData] = React.useState([] as any)
  const [res, setRes] = React.useState(null as any)
  const [open, setOpen] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }
  let MethodDispatch = useDispatch()
  useEffect(() => {
    var size = Object.keys(formData).length
    if (size > 0) {
      MethodDispatch(contactMethodsActions.createContactMethods(formData))
      setRes(methodsState.contactMethodsTable.success)
    }
    /* eslint-disable  react-hooks/exhaustive-deps*/
  }, [MethodDispatch, formData])

  const onSubmit = (data: any) => {
    data['kind'] = type
    data['contact_id'] = selectedContact.id
    data['visibility'] = selectedContact.visibility
    setFormData(data)
  }
 


  return (
    <>
    <>
    {res === true ?
    <Collapse in={open}>
    <Alert
    severity="success"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>Success</AlertTitle>
      Data saved
    </Alert>
  </Collapse>
  :res === false ?
  <Collapse in={open}>
        <Alert
        severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {methodsState.error}
        </Alert>
      </Collapse>
      :
      <></>
    }
      
    </>
    
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
    </>
  )
}
export default AddContactMethodForm
