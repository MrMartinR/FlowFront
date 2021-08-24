import { Button, Grid, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { individualTransaction } from './individualTransaction'
import * as loansActions from '../Loan/state/loansActions'
import { Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export const ImportTransactions = (props: any) => {
  const { handleClose } = props
  const { register, handleSubmit } = useForm()
  const [counterTotal, setCounterTotal] = useState(0)
  const [counterTransfer, setCounterTransfer] = useState(0)
  const [counterTransaction, setCounterTransaction] = useState(0)
  const [counterNoPlatform, setCounterNoPlatform] = useState(0)
  const [counterNoLoan, setCounterNoLoan] = useState(0)
  const [list, setList] = useState(null as any)
  const [flag, setFlag] = useState(false)
  const [loans, setLoans] = useState(null as any)
  const { currentState, loansState } = useSelector(
    (state: RootState) => ({ currentState: state.userAccounts, loansState: state.loans }),
    shallowEqual
  )
  const dispatch = useDispatch()
  const onSubmit = async (data: any) => {
    const fr = new FileReader()
    const blob = new Blob([data.file[0]], { type: 'application/json' })
    fr.addEventListener('load', (e) => {
      if (fr.result) setList(fr.result)
    })

    fr.readAsText(blob)
  }
  useEffect(() => {
    dispatch(loansActions.fetchLoansData())
  }, [dispatch])
  useEffect(() => {
    if (loansState.loansData !== null) {
      setLoans(loansState.loansData)
    }
  }, [loansState])
  useEffect(() => {
    if (list !== null) {
      const a = JSON.parse(list)
      a.map((transaction: any) => {
        individualTransaction(
          transaction,
          currentState,
          loans,
          dispatch,
          setCounterTotal,
          setCounterTransfer,
          setCounterTransaction,
          setCounterNoPlatform,
          setCounterNoLoan
        )
        return transaction
      })
      setList(null)
      setFlag(true)
    }
  }, [list, currentState, loans, dispatch])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Import Transactions</Typography>
      <Grid container direction="column">
        <TextField name="file" type="file" inputRef={register({ required: true })} />
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Import
          </Button>
        </Grid>
      </Grid>
      {flag && (
        <Alert onClose={handleClose}>
          {`Archivo de datos importado.
          ${counterTotal} operaciones totales.
          ${counterNoPlatform} operaciones con un ID de platform incorrecto.
          ${counterNoLoan} operaciones con un CODE incorrecto.
          ${counterTransfer} transferencias y ${counterTransaction} transactions`}
        </Alert>
      )}
    </form>
  )
}
