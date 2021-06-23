import { Button, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as loansActions from './../state/loansActions'

export const LoanEdit = (props: any) => {
    const { loanDetails, handleClose, handleOpen } = props
    const [params, SetParams] = useState('' as any)
    const [formData, setFormData] = useState(null as any)
    const { register, handleSubmit, errors } = useForm()
    const dispatch = useDispatch()
    // Funcion que prepara os datos do formulario para enviar
  const onSubmit = (data: any, e: any) => {
    SetParams(loanDetails.id)
    setFormData(data)
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
            <Grid container justify="space-between">
          <Grid item>
            <Button onClick={(e) => handleOpen(e, 'delete')} color="secondary">
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
        </form>
    )
}
