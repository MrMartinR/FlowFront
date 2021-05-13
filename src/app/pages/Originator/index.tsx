import { Grid, Card, CardContent } from '@material-ui/core'

import { OriginatorsList } from './OriginatorsList'

export const OriginatorsPage = () => {
  return (
    <Grid container direction="column">
      <Card>
        <CardContent>
          <OriginatorsList />
        </CardContent>
      </Card>
    </Grid>
  )
}
