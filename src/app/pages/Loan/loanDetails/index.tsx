import React from 'react'
import { Typography } from '@material-ui/core'
import LoanDetails from './loanDetails'

const LoanDetailsPage = (props: any) => {
  const {
    match: { params },
  } = props

  return (
    <>
      <LoanDetails id={params.id} />
    </>
  )
}

export default LoanDetailsPage
