import { Grid, Card, CardContent } from '@material-ui/core'
import { UserLoansList } from './UserLoansList'

export const UserLoansPage = () => {
  return (
    <Grid container direction="column">
      <Card>
        <CardContent>
          <UserLoansList />
        </CardContent>
      </Card>
    </Grid>
  )
}
