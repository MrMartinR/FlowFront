import { CurrenciesList } from './CurrenciesList'
import { Card, CardContent, Grid } from '@material-ui/core'

export const Currencies = () => {
  return (
    <Grid container direction="column">
      <Card>
        <CardContent>
          <CurrenciesList />
        </CardContent>
      </Card>
    </Grid>
  )
}
