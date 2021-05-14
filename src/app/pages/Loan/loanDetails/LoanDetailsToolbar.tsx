import { Grid, Button, Typography, Toolbar, Avatar, makeStyles } from '@material-ui/core/'
import { useHistory } from 'react-router'

export const LoanDetailsToolbar = (props: any) => {
  const { loanDetails } = props
  const linkTo = useHistory()
  const useStyles = makeStyles({
    root: {
      cursor: 'pointer'
    }
  });
  const classes = useStyles();
  const handlePlatform = (e: any) => {
    linkTo.push(`/platforms/${loanDetails.attributes?.platform.id}`)
  }
  const handleOriginator = (e: any) => {
    linkTo.push(`/originators/${loanDetails.attributes?.originator.id}`)
  }
  return (
    <Toolbar>
      <Grid container direction="row" justify="space-between" spacing={2}>
        <Typography onClick={handlePlatform} classes={{root:classes.root}}>{loanDetails.attributes?.platform_trade_name}</Typography>
        <Typography onClick={handleOriginator} classes = {{root:classes.root}}>{loanDetails.attributes?.originator_trade_name}</Typography>
        <Typography variant="h6">{loanDetails.attributes?.name}</Typography>
        <Typography>{loanDetails.attributes?.code}</Typography>
        <Typography>{loanDetails.attributes?.status}</Typography>
        <Typography>{loanDetails.attributes?.rating}</Typography>
        <Typography>[{loanDetails.attributes?.currency_code}] {loanDetails.attributes?.currency.name}</Typography>
        <Avatar variant="square"><img src={'/media/svg/flags/'+loanDetails.attributes?.country_iso_code+'.svg'} alt="" /></Avatar>
        <Typography>{loanDetails.attributes?.country_name}</Typography>
        <Button href={loanDetails.attributes?.link} target='_blank'>Link</Button>
        {/* // Only visible to Admin/Contributors */}
        <Button>•••</Button>
      </Grid>
    </Toolbar>
  )
}