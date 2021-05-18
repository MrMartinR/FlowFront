import { Grid, Card, CardContent } from '@material-ui/core'
import { UserOriginatorsList } from './UserOriginatorsList'

export const UserOriginatorsPage = () => {
  return (
    <Grid container direction="column">
      <Card>
        <CardContent>
          <UserOriginatorsList />
        </CardContent>
      </Card>
    </Grid>
  )
}