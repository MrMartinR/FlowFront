import { Card, CardContent, Grid } from '@material-ui/core/'
import { CountriesList } from './CountryList'

export const CountriesPage = () => {
  return (
    <Grid container direction="column">
      <Card>
        <CardContent>
          <CountriesList />
        </CardContent>
      </Card>
    </Grid>
  )
}
