import {
  Card,
  CardActionArea,
  CardHeader,
  Grid,
} from '@material-ui/core'
import IconOriginator from '../../../common/layout/components/icons/Originator'
import IconPlatform from '../../../common/layout/components/icons/Platform'
import IconLoan from '../../../common/layout/components/icons/Loan'
export const LendingDetails = () => {
  return (
    <Grid container alignItems="center" justify="space-evenly" alignContent="center">
      <Grid item xs={3}>
        <Card>
          <CardActionArea href='/user-platform-overall'>
            <CardHeader
              avatar={<IconPlatform />}
              title="Platforms"
              subheader="Platforms in your portfolio"
            />
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card>
          <CardActionArea href="/user-originators">
            <CardHeader
              avatar={<IconOriginator />}
              title="Originators"
              subheader="Originators in your portfolio"
            />
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card>
          <CardActionArea href="/user-loans">
            <CardHeader
              avatar={<IconLoan />}
              title="Loans"
              subheader="Loans in your portfolio"
            />
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}
