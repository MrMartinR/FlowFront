import { Grid, Button, ButtonBase, Typography, Toolbar, Avatar, makeStyles, Container } from '@material-ui/core/'
import { useHistory } from 'react-router'

/* styles */
/* styles */
const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 0,
  },
  cardHeaderAction: {
    margin: 'auto' /* adds margin on top of the elements */,
  },
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
    <Container>
      <Toolbar variant="dense" className={classes.root}>
        {/* <Grid container> */}
        <Grid container >
          {/* block 1 */}
          <Grid item xs={8} container alignItems="center" spacing={1} className={classes.root}>
            <Grid item>
              <Avatar
                component={ButtonBase}
                onClick={handlePlatform}
                src={'/media/svg/contact/icons/' + loanDetails.attributes?.platform_contact_id + '.svg'}
                alt={loanDetails.attributes?.platform.trade_name}
                variant="square"
              >
              </Avatar>
            </Grid>
            <Grid item>
              <Avatar
                component={ButtonBase}
                onClick={handleOriginator}
                src={'/media/svg/contact/icons/' + loanDetails.attributes?.originator_contact_id + '.svg'}
                alt={loanDetails.attributes?.originator_trade_name}
                variant="square"
              >
              </Avatar>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{loanDetails.attributes?.name}</Typography>
              <Typography variant="caption">{loanDetails.attributes?.code}</Typography>
            </Grid>
          </Grid>

          {/* block 2 */}
          <Grid item xs={2} container alignItems="center" justify="space-around" className={classes.root}>
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
          <Grid container xs={2} justify="space-around" className={classes.root}>
            <Button href={loanDetails.attributes?.link} target="_blank">
              Link
            </Button>
            {/* // Only visible to Admin/Contributors */}
            <Button>•••</Button>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Toolbar>
    </Container>
  )
}
