import { Button, Card, CardActions, CardContent, CardHeader, Grid, makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as transactionActions from './state/userAccountsActions'
/* types */
type EditTransactionType = {
    kind: string
    data: string
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
  const onSubmit = ({ kind, data }: EditTransactionType) => {
    setTransactionId(transaction.id)
    const form = {
      data,
      kind,
    }
    setFormData(form)
    handleClose()
  }
  // chamada a action updateContactMethods cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(transactionActions.updateTransaction(formData, userId, transactionId))
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
            <CardHeader title="Edit Contact Method" />
            <CardContent>

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
