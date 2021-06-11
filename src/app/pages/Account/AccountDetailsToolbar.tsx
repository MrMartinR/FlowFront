import { Card, CardContent, Grid, CardHeader, Button, Avatar, makeStyles } from '@material-ui/core'
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
export const AccountDetailsToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { selectedAccount, handleOpen, id } = props
  return (
    <Card>
      <CardContent>
        <Grid container direction="row">
          <Grid item xs={12} className={classes.root}>
            <CardHeader
              avatar={
                <Avatar
                  variant="square"
                  src={'/media/svg/contact/icons/' + id + '.svg'}
                  alt={selectedAccount.attributes?.contact?.trade_name}
                />
              }
              title={selectedAccount.attributes?.contact?.trade_name}
              subheader={selectedAccount.attributes?.contact?.company_name}
              action={
                <>
                  <Button href={`/contacts/${id}`}>Contact</Button>
                  <Button onClick={(e) => handleOpen(e, 'edit')}>•••</Button>
                </>
              }
              classes={{
                action: classes.cardHeaderAction,
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
