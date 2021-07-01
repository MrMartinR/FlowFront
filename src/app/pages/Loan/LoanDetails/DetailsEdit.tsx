import { FormControl, FormLabel, TextField, Button, Grid, MenuItem } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as loansActions from './../state/loansActions'
import { installmentTypes, amortizationTypes } from '../../../utils/types'
export const DetailsEdit = (props: any) => {
  const { loanDetails, handleClose } = props
  const { register, handleSubmit } = useForm()
  const [params, SetParams] = useState('' as any)
  const [formData, setFormData] = useState(null as any)
  const [installment, setInstallment] = useState('')
  const [amortization, setAmortization] = useState('')
  const dispatch = useDispatch()
  // Funcion que prepara os datos do formulario para enviar
  const onSubmit = (data: any, e: any) => {
    SetParams(loanDetails.id)
    const form = {
      ...data,
      installment,
      amortization,
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
  // funcion que garda o installment seleccionado
  const handleInstallment = (e: any) => {
    setInstallment(e.target.value)
  }
  // funcion que garda o amortization seleccionado
  const handleAmortization = (e: any) => {
    setAmortization(e.target.value)
  }
 
  useEffect(() => {
    if (loanDetails !== null) {
      setAmortization(loanDetails.attributes.amortization)
      setInstallment(loanDetails.attributes.installment)
      
    }
  }, [loanDetails])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* amortization */}
      <FormControl fullWidth margin="dense">
          <FormLabel>Amortization</FormLabel>
          <TextField value={amortization} onChange={handleAmortization} select variant="outlined">
            {amortizationTypes.map((item: any) => (
              <MenuItem value={item.value} key={item.value}>
                {item.value}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        {/* installment */}
        {amortization !== 'Bullet' && (
          <FormControl fullWidth margin="dense">
            <FormLabel>Installment</FormLabel>
            <TextField value={installment} onChange={handleInstallment} select variant="outlined">
              {installmentTypes.map((item: any) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        )}
        {/* air */}
        <FormControl fullWidth margin="dense">
          <FormLabel>AIR</FormLabel>
          <TextField
            name="air"
            defaultValue={loanDetails.attributes.air}
            placeholder="Air"
            autoComplete="off"
            inputRef={register()}
          />
        </FormControl>
        {/* amount */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Amount</FormLabel>
          <TextField
            name="amount"
            defaultValue={loanDetails.attributes.amount}
            placeholder="Amount"
            autoComplete="off"
            inputRef={register()}
          />
        </FormControl>
        {/* internal code */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Internal Code</FormLabel>
          <TextField
            name="internal_code"
            defaultValue={loanDetails.attributes.internal_code}
            placeholder="Internal Code"
            autoComplete="off"
            inputRef={register()}
          />
        </FormControl>
        {/* date listed */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Date Listed</FormLabel>
          <TextField
            name="date_listed"
            type="date"
            defaultValue={loanDetails.attributes.date_listed}
            placeholder="Date Listed"
            autoComplete="off"
            inputRef={register()}
          />
        </FormControl>
        {/* date issued */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Date Issued</FormLabel>
          <TextField
            name="date_issued"
            type="date"
            defaultValue={loanDetails.attributes.date_issued}
            placeholder="Date Issued"
            autoComplete="off"
            inputRef={register()}
          />
        </FormControl>
        {/* date maturity */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Date Maturity</FormLabel>
          <TextField
            name="date_maturity"
            type="date"
            defaultValue={loanDetails.attributes.date_maturity}
            placeholder="Date Maturity"
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
