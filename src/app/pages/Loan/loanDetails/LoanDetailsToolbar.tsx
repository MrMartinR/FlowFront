import { Grid, Button, ButtonBase, Typography, Toolbar, Avatar, makeStyles } from '@material-ui/core/'
import { useHistory } from 'react-router'

/* styles */
const useStyles = makeStyles({
  root: {},
})

export const LoanDetailsToolbar = (props: any) => {
  const classes = useStyles()

  const { loanDetails } = props
  const linkTo = useHistory()

  const handlePlatform = (e: any) => {
    linkTo.push(`/platforms/${loanDetails.attributes?.platform.id}`)
  }
  const handleOriginator = (e: any) => {
    linkTo.push(`/originators/${loanDetails.attributes?.originator.id}`)
  }
  return (
    <Toolbar variant="dense">
      {/* <Grid container> */}
      <Grid container xs={8} alignItems="center" spacing={1}>
        <Grid item>
          <Avatar
            component={ButtonBase}
            onClick={handlePlatform}
            // src={' @ToDo add the source of the platform icon'}
            alt={loanDetails.attributes?.platform_trade_name}
            variant="square"
          >
            {loanDetails.attributes?.platform_trade_name[0]}
          </Avatar>
        </Grid>
        <Grid item>
          <Avatar
            component={ButtonBase}
            onClick={handleOriginator}
            // src={' @ToDo add the source of the originator icon'}
            alt={loanDetails.attributes?.originator_trade_name}
            variant="square"
          >
            {loanDetails.attributes?.originator_trade_name[0]}
          </Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">{loanDetails.attributes?.name}</Typography>
          <Typography variant="caption">{loanDetails.attributes?.code}</Typography>
        </Grid>
      </Grid>

      {/* block 2 */}
      <Grid container xs={2} alignItems="center" justify="space-around">
        <Grid>
          <Typography>{loanDetails.attributes?.rating}</Typography>
        </Grid>
        <Grid>
          <Avatar
            variant="square"
            src={'/media/svg/flags/' + loanDetails.attributes?.country_iso_code + '.svg'}
            alt={loanDetails.attributes?.country_name}
          />
        </Grid>
        <Grid>
          <Typography>{loanDetails.attributes?.currency_code}</Typography>
        </Grid>
        <Grid>
          <Typography>{loanDetails.attributes?.status}</Typography>
        </Grid>
      </Grid>

      {/* block 3 */}
      <Grid container xs={2} justify="space-around">
        <Button href={loanDetails.attributes?.link} target="_blank">
          Link
        </Button>
        {/* // Only visible to Admin/Contributors */}
        <Button>•••</Button>
      </Grid>
      {/* </Grid> */}
    </Toolbar>
  )
}
