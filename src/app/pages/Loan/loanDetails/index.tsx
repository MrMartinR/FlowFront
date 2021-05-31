import { useEffect, useState } from 'react'
import { RootState } from '../../../../redux/rootReducer'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { LoanDetails } from './LoanDetails'
import { UserLoanDetails } from '../../UserLoan/UserLoanDetails'
import { LoanDetailsToolbar } from './LoanDetailsToolbar'
import * as loansActions from './../state/loansActions'
import { LoansAlert } from '../LoansAlert'
import { Grid } from '@material-ui/core/'

export const LoanDetailsPage = (props: any) => {
  const { params } = props.match
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.loans,
    }),
    shallowEqual
  )
  const [loanDetails, setLoanDetails] = useState({} as any)
  const GetLoan = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(loansActions.fetchLoanDetails(params.id))
      }
    }, [dispatch])
  }
  GetLoan()

  useEffect(() => {
    currentState.loanDetails && setLoanDetails(currentState.loanDetails)
  }, [currentState.loanDetails])

  return (
    <>
      <Grid container direction="column" xs={12}>
        <LoanDetailsToolbar loanDetails={loanDetails} />
        <LoansAlert />
        <Grid container direction="column">
          <Grid item xs={12}>
            <LoanDetails loanDetails={loanDetails} />
          </Grid>
          <Grid item xs={12}>
            <UserLoanDetails id={loanDetails.attributes?.user_loan_id} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
