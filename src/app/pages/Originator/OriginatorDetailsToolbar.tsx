import { Grid, Button, Toolbar, makeStyles, Container, CardHeader, Avatar } from '@material-ui/core/'

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

export const OriginatorDetailsToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { setTab, id, trade_name, company_name } = props
  /* onClick function that sets the state of the currentTab to be displayed */
  const handleClick = (e: any) => {
    setTab(`${e.target.innerHTML}`)
  }
  return (
    <Container>
      <Toolbar variant="dense" className={classes.root}>
        <Grid item xs={12} className={classes.root}>
          <CardHeader
            avatar={<Avatar variant="square" src={'/media/svg/contact/icons/' + id + '.svg'} alt={trade_name} />}
            title={trade_name}
            subheader={company_name}
            action={
              <>
                <Button onClick={handleClick}>Info</Button>
                <Button onClick={handleClick}>Loans</Button>
                <Button href={`/contacts/${id}`}>Contact</Button>
              </>
            }
            classes={{
              action: classes.cardHeaderAction,
            }}
          />
        </Grid>
      </Toolbar>
    </Container>
  )
}
