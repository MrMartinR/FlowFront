import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Paper,
} from '@material-ui/core'
import { ReactComponent as LendingIcon } from '../../../common/media/svg/icons/lending.svg'
import IconOriginator from '../../../common/layout/components/icons/Originator'
import IconPlatform from '../../../common/layout/components/icons/Platform'
import IconLoan from '../../../common/layout/components/icons/Loan'
/* styles */
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  icon: {
    // width: '32',
    // height: '32',
  },
})
export const LendingDetails = () => {
  /* styles */
  const classes = useStyles()
  return (
    <Grid container alignItems="center" justify="space-evenly" alignContent="center">
      <Grid item xs={3}>
        <Card>
          <CardActionArea>
            <CardHeader
              avatar={<IconPlatform />}
              action={<Button href="/user-platform-overall"></Button>}
              title="Platforms"
              subheader="Platforms in your portfolio"
            />
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card>
          <CardActionArea>
            <CardHeader
              avatar={<IconOriginator />}
              action={<Button href="/user-originators"></Button>}
              title="Originators"
              subheader="Originators in your portfolio"
            />
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card>
          <CardActionArea>
            <CardHeader
              avatar={<IconLoan />}
              action={<Button href="/user-loans"></Button>}
              title="Loans"
              subheader="Loans in your portfolio"
            />
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}
