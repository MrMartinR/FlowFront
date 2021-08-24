import { useEffect, useState } from 'react'
import { RootState } from '../../../../redux/rootReducer'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { LoanDetails } from './BananaLoanDetails'
import { UserLoanDetails } from '../../UserLoan/UserLoanDetails'
import { LoanDetailsToolbar } from './LoanDetailsToolbar'
import * as loansActions from '../state/loansActions'
import { Grid } from '@material-ui/core/'
import { UserAlert } from '../../../utils/UserAlert'

export const LoanDetailsPage = (props: any) => {
  const { params } = props.match
  const [loanDetails, setLoanDetails] = useState(null as any)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.loans,
    }),
    shallowEqual
  )
  const dispatch = useDispatch()
  // peticion dos details do loan
  useEffect(() => {
    dispatch(loansActions.fetchLoanDetails(params.id))
  }, [dispatch, params])
  // recibida resposta carga os datos do state
  useEffect(() => {
    currentState.loanDetails && setLoanDetails(currentState.loanDetails)
  }, [currentState.loanDetails])
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(loansActions.resetSuccess())
  }
  return (
    <Grid container direction="column">
      {loanDetails && <LoanDetailsToolbar loanDetails={loanDetails} />}
      <UserAlert
        resetSuccess={resetSuccess}
        success={currentState.success}
        message={currentState.message}
        error={currentState.error}
      />
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          {loanDetails && <LoanDetails loanDetails={loanDetails} />}
        </Grid>
        <Grid item xs={12}>
          {loanDetails && <UserLoanDetails id={loanDetails.attributes.user_loan_id} />}
        </Grid>
      </Grid>
    </Grid>
  )
}
