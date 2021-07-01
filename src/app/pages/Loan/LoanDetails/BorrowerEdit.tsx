import { FormControl, FormLabel, TextField, MenuItem, Button, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as loansActions from './../state/loansActions'
export const BorrowerEdit = (props: any) => {
  const { loanDetails, handleClose } = props
  const { register, handleSubmit } = useForm()
  const [borrower_type, setBorrowerType] = useState('')
  const [category, setCategory] = useState('')
  const [params, SetParams] = useState('' as any)
  const [formData, setFormData] = useState(null as any)
  const dispatch = useDispatch()
  // Funcion que prepara os datos do formulario para enviar
  const onSubmit = (data: any, e: any) => {
    SetParams(loanDetails.id)
    if (borrower_type !== 'Consumer') data.dti_rating = null
    const form = {
      ...data,
      borrower_type,
      category,
    }
    setFormData(form)
    handleClose()
  }
  // funcion que garda o borrower_type seleccionado
  const handleBorrower = (e: any) => {
    setBorrowerType(e.target.value)
  }
  // funcion que garda o category seleccionado
  const handleCategory = (e: any) => {
    setCategory(e.target.value)
  }
  useEffect(() => {
    if (loanDetails !== null) {
      setBorrowerType(loanDetails.attributes.borrower_type)
      setCategory(loanDetails.attributes.category)
    }
  }, [loanDetails])

  // chamada a accion de updateContact cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(loansActions.updateLoan(formData, params))
    }
  }, [formData, dispatch, params])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* borrower */}
      <FormControl fullWidth margin="dense">
        <FormLabel>Borrower</FormLabel>
        <TextField
          name="borrower"
          defaultValue={loanDetails.attributes.borrower}
          placeholder="Borrower"
          autoComplete="off"
          inputRef={register()}
        />
      </FormControl>
      {/* borrower type */}
      <FormControl fullWidth margin="dense">
        <FormLabel>Borrower type</FormLabel>
        <TextField select variant="outlined" value={borrower_type} onChange={handleBorrower}>
          {loanDetails.attributes.originator.customer_category.map((b: any) => (
            <MenuItem value={b} key={b}>
              {b}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      {/* category */}
      <FormControl fullWidth margin="dense">
        <FormLabel>Category</FormLabel>
        <TextField select variant="outlined" value={category} onChange={handleCategory}>
          {borrower_type === 'Business'
            ? loanDetails.attributes.originator.product_category_business.map((item: any) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))
            : loanDetails.attributes.originator.product_category_consumer.map((item: any) => (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              ))}
        </TextField>
      </FormControl>
      {/* dti Rating */}
      {borrower_type === 'Consumer' && (
        <FormControl fullWidth margin="dense">
          <FormLabel>DTI Rating</FormLabel>
          <TextField
            name="dti_rating"
            defaultValue={loanDetails.attributes.dti_rating}
            placeholder="DTI Rating"
            autoComplete="off"
            inputRef={register()}
          />
        </FormControl>
      )}
      <Grid container justify="space-between">
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" color="primary">
          Save
        </Button>
      </Grid>
    </form>
  )
}
