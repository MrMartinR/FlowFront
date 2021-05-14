import { Grid, Card, CardHeader, CardContent, Typography } from '@material-ui/core/'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useEffect, useState } from 'react';

export const LoanDetails = (props: any) => {
  const { loanDetails } = props
  const [security, setSecurity] = useState();
  useEffect(() => {
    setSecurity(loanDetails.attributes?.protection_scheme);
  }, [loanDetails])
  return (
    <>
      <Grid container direction="row">
        <Grid container direction="column" item xs={6}>
          <Grid container direction="row">
            <Card>
              <CardHeader title="Description"></CardHeader>
              <CardContent>
                <Typography>Borrower Type: {loanDetails.attributes?.borrower_type}</Typography>
                <Typography>{loanDetails.attributes?.borrower}</Typography>
                <Typography>Category: {loanDetails.attributes?.category}</Typography>
                <Typography>Description: {loanDetails.attributes?.description}</Typography>
                {/* Only show if Borrower = Consumer */}
                {(loanDetails.attributes?.borrower_type==='Consumer')
                  &&<Typography>DTI: {loanDetails.attributes?.dti_rating}</Typography>}
              </CardContent>
            </Card>
          </Grid>
          <Grid container direction="row">
            <Card>
              <CardHeader title="Notes"></CardHeader>
              <CardContent>
                <Typography>{loanDetails.attributes?.notes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container direction="column" item xs={6}>
          <Grid container direction="row">
            <Card>
              <CardHeader title="Details"></CardHeader>
              <CardContent>
                <Typography>Amortization: {loanDetails.attributes?.amortization}</Typography>
                <Typography>Installment: {loanDetails.attributes?.installment}</Typography>
                <Typography>Air: {loanDetails.attributes?.air}</Typography>
                <Typography>XIRR: {loanDetails.attributes?.xirr}</Typography>
                <Typography>Amount: {loanDetails.attributes?.amount}</Typography>
                <Typography>Term: [Calculation]</Typography>
                <Typography>Remaining: [Calculation]</Typography>
                <Typography>Date listed: {loanDetails.attributes?.date_listed}</Typography>
                <Typography>Date issued: {loanDetails.attributes?.date_issued}</Typography>
                <Typography>Date maturity: {loanDetails.attributes?.date_maturity}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container direction="row">
            <Card>
              <CardHeader title="Security"></CardHeader>
              <CardContent>
                <ToggleButtonGroup value={security}>
                    <ToggleButton value='Buyback'>Buyback</ToggleButton>
                    <ToggleButton value='Personal Guarantee'>Personal Guarantee</ToggleButton>
                    <ToggleButton value='Collateral'>Collateral</ToggleButton>
                </ToggleButtonGroup>
                <Typography>Security details: {loanDetails.attributes?.security_details}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}