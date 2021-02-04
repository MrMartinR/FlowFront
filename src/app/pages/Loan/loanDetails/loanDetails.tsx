import React from 'react'
import { Typography } from '@material-ui/core'

const LoanDetails = (props: any) => {
  const {
    match: { params },
  } = props

  return (
    <>
      <Typography variant="h5">Loan details component</Typography>
    </>
  )
}

export default LoanDetails
