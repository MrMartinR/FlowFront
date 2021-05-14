import { Grid, Card, CardContent } from '@material-ui/core'

import { LoansList } from './LoansList'

export const LoansPage = () => {
  return (
    <Grid container direction="column">
      <Card>
        <CardContent>
          <LoansList />
        </CardContent>
      </Card>
    </Grid>
  )
}
