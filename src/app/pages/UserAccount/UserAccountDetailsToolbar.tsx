import { makeStyles, Toolbar, Grid, CardHeader, Button, Avatar } from '@material-ui/core/'

/* styles */
const useStyles = makeStyles({
  root: {
    // background: '#f1f1f1',
    maxWidth: '100%',
    position: 'relative',
    overflow: 'auto',
  },
})

export const UserAccountDetailsToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()

  const { value, balance, singleAccount } = props
  return (
    <Toolbar variant="dense" className={classes.root}>
      <Grid item xs={12}>
        <CardHeader
          avatar={
            <Avatar
              src={'/media/svg/contact/icons/' + singleAccount.attributes?.account?.contact_id + '.svg'}
              alt={singleAccount.attributes?.name}
              variant="square"
            >
              {singleAccount.attributes?.name[0]}
            </Avatar>
          }
          title={singleAccount.attributes?.name}
          subheader={'Value ' + value + ' Balance ' + balance.toFixed(2)}
          action={
            <>
              <Button>Add Transfer</Button>
              <Button>Add Transaction</Button>
              <Button>Import</Button>
              <Button>•••</Button>
            </>
          }
        ></CardHeader>
      </Grid>
    </Toolbar>
  )
}
