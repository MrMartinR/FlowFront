import { Container, Grid, Card, CardHeader, CardContent, Button, Typography } from '@material-ui/core/'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useEffect, useState } from 'react'

export const LoanDetails = (props: any) => {
  const { loanDetails } = props
  const [security, setSecurity] = useState([])
  
  // carga os datos do togglebutton
  useEffect(() => {
    setSecurity(loanDetails.attributes?.protection_scheme)
  }, [loanDetails])
  return (
    <Container>
      <Grid container spacing={2}>
        {/* block 1 */}
        <Grid container direction="column" item xs={6} spacing={2}>
          {/* borrower */}
          <Grid item>
            <Card>
              <CardHeader title="Borrower" action={<Button>•••</Button>} />
              <CardContent>
                <Typography variant="h6"> {loanDetails.attributes?.borrower}</Typography>
                <Typography>Type: {loanDetails.attributes?.borrower_type}</Typography>
                <Typography>Category: {loanDetails.attributes?.category}</Typography>
                {/* Only show if Borrower = Consumer */}
                {loanDetails.attributes?.borrower_type === 'Consumer' && (
                  <Typography>DTI: {loanDetails.attributes?.dti_rating}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          {/* description */}
          <Grid item>
            <Card>
              <CardHeader title="Description" action={<Button>•••</Button>} />
              <CardContent>
                <Typography>Description: {loanDetails.attributes?.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* notes */}
          <Grid item>
            <Card>
              <CardHeader title="Notes" action={<Button>•••</Button>} />
              <CardContent>
                <Typography>{loanDetails.attributes?.notes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* block 2 */}
        <Grid container direction="column" item xs={6} spacing={2}>
          {/* details */}
          <Grid item>
            <Card>
              <CardHeader title="Details" action={<Button>•••</Button>} />
              <CardContent>
                <Typography>Amortization: {loanDetails.attributes?.amortization}</Typography>
                <Typography>Installment: {loanDetails.attributes?.installment}</Typography>
                <Typography>Air: {loanDetails.attributes?.air && loanDetails.attributes.air.toFixed(2)}</Typography>
                <Typography>XIRR: {loanDetails.attributes?.xirr && loanDetails.attributes.xirr.toFixed(2)}</Typography>
                <Typography>Amount: {loanDetails.attributes?.amount}</Typography>
                <Typography>Term: [Calculation]</Typography>
                <Typography>Remaining: [Calculation]</Typography>
                <Typography>Date listed: {loanDetails.attributes?.date_listed}</Typography>
                <Typography>Date issued: {loanDetails.attributes?.date_issued}</Typography>
                <Typography>Date maturity: {loanDetails.attributes?.date_maturity}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* security */}
          <Grid item>
            <Card>
              <CardHeader title="Security" action={<Button>•••</Button>} />
              <CardContent>
                <ToggleButtonGroup value={security} size="small">
                  <ToggleButton value="BuyBack">BuyBack</ToggleButton>
                  <ToggleButton value="Personal Guarantee">Personal Guarantee</ToggleButton>
                  <ToggleButton value="Collateral">Collateral</ToggleButton>
                  <ToggleButton value="Provision Fund">Provision Fund</ToggleButton>
                </ToggleButtonGroup>
                <Typography>{loanDetails.attributes?.security_details}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
