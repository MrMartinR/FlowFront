import { Grid, Button, Typography, Toolbar } from '@material-ui/core/'

export const UserAccountDetailsToolbar = (props: any) => {
  const { value, balance, singleAccount } = props
  return (
    <Toolbar variant="dense">
      <Grid container direction="row" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="body1">[ICON]</Typography>
          <Typography variant="body1">{singleAccount.attributes?.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Value: { value }</Typography>
          <Typography variant="h6">Balance: { balance }</Typography>
        </Grid>
        <Grid item xs={5}>
          <Button>+ New Transfer</Button>
          <Button>+ New Transaction</Button>
          <Button>•••</Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}
