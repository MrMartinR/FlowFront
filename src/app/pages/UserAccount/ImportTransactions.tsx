import { Button, Grid, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { individualTransaction } from './individualTransaction'
import * as loansActions from '../Loan/state/loansActions'
export const ImportTransactions = (props: any) => {
  const { handleClose } = props
  const { register, handleSubmit } = useForm()
  const [list, setList] = useState(null as any)
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
    handleClose()
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
        individualTransaction(transaction, currentState, loans, dispatch)
        return transaction
      })
    }
    setList(null)
  }, [list, currentState, loans, dispatch])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <TextField name="file" type="file" margin="normal" variant="outlined" inputRef={register({ required: true })} />
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Import
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
