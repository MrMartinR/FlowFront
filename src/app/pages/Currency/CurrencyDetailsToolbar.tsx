import { Avatar, Button, CardHeader, Container, Grid, makeStyles, Toolbar } from '@material-ui/core'
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
export const CurrencyDetailsToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { name, symbol } = props

  return (
    <Container>
      <Toolbar variant="dense" className={classes.root}>
        <Grid container className={classes.root} justify="space-between">
          <Grid item>
            <CardHeader avatar={<Avatar src="" variant="square" alt={name} />} title={symbol} subheader={name} />
          </Grid>
          <Grid item>
            <Button href="/currencies">Currencies List</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  )
}
