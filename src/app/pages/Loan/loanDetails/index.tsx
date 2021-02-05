import React from 'react'
import { Typography, Grid, CardContent, Card } from '@material-ui/core'
import LoanDetails from './loanDetails'
import UserLoanDetails from '../../UserLoan/UserLoanDetails'

const LoanDetailsPage = (props: any) => {
  const {
    match: { params },
  } = props

  return (
    <>
      <LoanDetails id={params.id} />
      <br></br>
      <br></br>
      <br></br>
      <UserLoanDetails />
    </>
  )
}

export default LoanDetailsPage
