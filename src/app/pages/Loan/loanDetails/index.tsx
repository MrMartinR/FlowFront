import React from 'react'
import { Grid } from '@material-ui/core/'

import LoanDetails from './LoanDetails'
import UserLoanDetails from '../../UserLoan/UserLoanDetails'
import LoanDetailsToolbar from './LoanDetailsToolbar'

const LoanDetailsPage = (props: any) => {
  const {
    match: { params },
  } = props

  return (
    <>
      {/* <Grid container direction="column" xs={12}> */}
      <LoanDetailsToolbar id={params.id} />
      <Grid container direction="column">
        <Grid item xs={12} direction="row">
          <LoanDetails id={params.id} />
        </Grid>
        <Grid item xs={12} direction="row">
          <UserLoanDetails loan_id={params.id} />
        </Grid>
      </Grid>
      {/* </Grid> */}
    </>
  )
}

export default LoanDetailsPage
