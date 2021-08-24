import { FormControl, FormLabel, Button, TextField, Grid } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as loansActions from '../state/loansActions'
export const SecurityEdit = (props: any) => {
  const { loanDetails, handleClose } = props
  const { register, handleSubmit } = useForm()
  const [params, SetParams] = useState('' as any)
  const [formData, setFormData] = useState(null as any)
  const [security, setSecurity] = useState([] as any)
  const dispatch = useDispatch()
  // Funcion que prepara os datos do formulario para enviar
  const onSubmit = (data: any, e: any) => {
    SetParams(loanDetails.id)
    const form = {
      ...data,
      protection_scheme: security,
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
  // funcion que garda os datos do togglebutton
  const handleSecurity = (event: React.MouseEvent<HTMLElement>, newSecurity: string[]) => {
    setSecurity(newSecurity)
  }
  useEffect(() => {
    if (loanDetails !== null) {
      setSecurity(loanDetails.attributes?.protection_scheme)
    }
  }, [loanDetails])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* protection scheme */}
      <FormControl fullWidth margin="dense">
        <FormLabel>Protection Scheme</FormLabel>
        <ToggleButtonGroup value={security} size="small" onChange={handleSecurity}>
          <ToggleButton value="BuyBack">BuyBack</ToggleButton>
          <ToggleButton value="Personal Guarantee">Personal Guarantee</ToggleButton>
          <ToggleButton value="Collateral">Collateral</ToggleButton>
          <ToggleButton value="Provision Fund">Provision Fund</ToggleButton>
        </ToggleButtonGroup>
      </FormControl>
      {/* security details */}
      <FormControl fullWidth margin="dense">
        <FormLabel>Security Details</FormLabel>
        <TextField
          name="security_details"
          defaultValue={loanDetails.attributes.security_details}
          placeholder="Security Details"
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
