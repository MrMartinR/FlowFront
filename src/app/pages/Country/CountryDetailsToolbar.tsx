import { Avatar, Grid, Button, Toolbar, makeStyles, Container, CardHeader } from '@material-ui/core'

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

export const CountryDetailsToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { name, iso_code } = props
  return (
    <Container>
      <Toolbar variant="dense" className={classes.root}>
        <Grid container className={classes.root} justify="space-between">
          <Grid item>
            <CardHeader
              avatar={<Avatar variant="square" src={'/media/svg/flags/' + iso_code + '.svg'} alt={name} />}
              title={name}
            />
          </Grid>
          <Grid item>
            <Button href="/countries">Countries List</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  )
}
