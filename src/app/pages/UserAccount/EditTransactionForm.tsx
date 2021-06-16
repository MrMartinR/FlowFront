import { TextField } from "@material-ui/core"
import { FormControl, FormLabel } from "@material-ui/core"
import { Button, Card, CardActions, CardContent, CardHeader, Grid, makeStyles } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as transactionActions from './state/userAccountsActions'
/* types */
type EditTransactionType = {
    date: string
    kind: string
    category: string
    description: string
    amount: string
  }
  /* styles */
const useStyles = makeStyles({
    root: {
      width: '400px',
    },
    type: {
      width: '140px',
      marginBottom: '12px',
    },
  })
export const EditTransactionForm = (props:any) => {
    /* styles */
  const classes = useStyles()
    const { transaction, handleClose, userId} = props
    const { register, handleSubmit, errors } = useForm()
    const [transactionId, setTransactionId] = useState('' as any)
    const [formData, setFormData] = useState(null as any)
    const dispatch = useDispatch()
    // funcion que prepara os datos do formulario para o envio
  const onSubmit = (data: EditTransactionType) => {
    setTransactionId(transaction.id)
    const form = {
      ...data,
      user_account_id: userId,
      loan_id: transaction.loanId,
    }
    setFormData(form)
    handleClose()
  }
  // chamada a action updateTransaction cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(transactionActions.updateTransaction(formData, transactionId))
    }
  }, [formData, dispatch, transactionId, userId])
  const handleDelete = () => {
    dispatch(transactionActions.deleteUserTransaction(transaction.id))
    handleClose()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column">
        <Card className={classes.root}>
          <Grid item xs={12}>
            <CardHeader title="Edit Transaction" />
            <CardContent>
              <FormControl fullWidth size='small'>
                <FormLabel>Date</FormLabel>
                  <TextField
                    name="date"
                    type='date'
                    margin='normal'
                    variant="outlined"
                    autoComplete="off"
                    defaultValue={transaction.date}
                    inputRef={register({ required: true, minLength: 3 })}
                  />
                <FormLabel>Type</FormLabel>
                  <TextField
                    name="kind"
                    margin='normal'
                    variant="outlined"
                    autoComplete="off"
                    defaultValue={transaction.kind}
                    inputRef={register({ required: true, minLength: 3 })}
                  />
                  {errors.kind && errors.kind.type === 'required' && <Alert severity="error">Type is required</Alert>}
                {errors.kind && errors.kind.type === 'minLength' && (
                  <Alert severity="error">Type should be at-least 3 characters.</Alert>
                )}
                <FormLabel>Category</FormLabel>
                  <TextField
                    name="category"
                    margin='normal'
                    variant="outlined"
                    autoComplete="off"
                    defaultValue={transaction.category}
                    inputRef={register({ required: true, minLength: 3 })}
                  />
                <FormLabel>Description</FormLabel>
                  <TextField
                    name="description"
                    margin='normal'
                    multiline
                    variant="outlined"
                    autoComplete="off"
                    defaultValue={transaction.description}
                    inputRef={register({ required: true, minLength: 3 })}
                  />
                <FormLabel>Amount</FormLabel>
                  <TextField
                    name="amount"
                    margin='normal'
                    variant="outlined"
                    autoComplete="off"
                    defaultValue={transaction.amount}
                    inputRef={register({ required: true, minLength: 3 })}
                  />
              </FormControl>
            </CardContent>
            </Grid>

          <CardActions>
            <Grid container>
              <Grid item xs={3}>
                {/* delete */}
                <Button onClick={handleDelete} color="secondary">
                  Delete
                </Button>
              </Grid>
              <Grid item xs={9}>
                <Grid container justify="flex-end">
                  {/* cancel */}
                  <Button onClick={handleClose}>
                    Cancel
                  </Button>
                  {/* save */}
                  <Button type="submit" color='primary'>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </form>
  )
}
