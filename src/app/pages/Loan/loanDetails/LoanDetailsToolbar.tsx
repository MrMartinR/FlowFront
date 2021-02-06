import React, { useEffect } from 'react'
import { Grid, Button, Typography, Toolbar } from '@material-ui/core/'
import { connect } from 'react-redux'
import { fetchLoanDetails } from '../state/loansActions'

const LoanDetailsToolbar = (props: any) => {
  const { loanDetails } = props.loans
  const [data, setData] = React.useState([] as any)

  const processData = (obj: any) => {
    let data = {} as any
    for (const property in obj) {
      data[`${property}`] = property === 'country' || property === 'currency' ? obj[property].name : obj[property]
    }
    return data
  }

  useEffect(() => {
    setData(processData(loanDetails))
  }, [loanDetails])

  return (
    <Toolbar>
      <Grid container direction="row" justify="space-between" spacing={2}>
        <Typography>[PlatformIcon][originator.trade_name]</Typography>
        <Typography variant="h6">{data.name}</Typography>
        <Typography>{data.code}</Typography>
        <Typography>{data.status}</Typography>
        <Typography>{data.rating}</Typography>
        <Typography>[CODE]{data.currency}</Typography>
        <Typography>[FLAG]{data.country}</Typography>
        <Button href={data.link}>Link</Button>
        {/* // Only visible to Admin/Contributors */}
        <Button>•••</Button>
      </Grid>
    </Toolbar>
  )
}

const mapStateToProps = (state: any) => {
  return {
    loans: state.loans,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchLoanDetails: (id: any) => dispatch(fetchLoanDetails(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanDetailsToolbar)
