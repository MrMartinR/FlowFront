import React from 'react'
import LoanDetails from './loanDetails'
import UserLoanDetails from '../../UserLoan/UserLoanDetails'

const LoanDetailsPage = (props: any) => {
  const {
    match: { params },
  } = props

  return (
    <>
      <LoanDetails id={params.id} />
      <UserLoanDetails loan_id={params.id} />
    </>
  )
}

export default LoanDetailsPage
