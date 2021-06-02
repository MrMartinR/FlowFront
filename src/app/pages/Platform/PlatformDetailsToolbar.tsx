import { makeStyles, Container, Toolbar, Grid, CardHeader, Avatar, Button, ButtonGroup } from '@material-ui/core'

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

export const PlatformDetailsToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()

  const { setTab, id, trade_name, company_name } = props
  const handleClick = (e: any) => {
    setTab(`${e.target.innerHTML}`)
  }
  return (
    <Container>
      <Toolbar variant="dense" className={classes.root}>
        <Grid container className={classes.root}>
          <CardHeader
            avatar={<Avatar variant="square" src={'/media/svg/contact/icons/' + id + '.svg'} alt={trade_name} />}
            title={trade_name}
            subheader={company_name}
            action={
              <>
                <ButtonGroup>
                  <Button onClick={handleClick}>Info</Button>
                  <Button onClick={handleClick}>Originators</Button>
                  <Button onClick={handleClick}>Loans</Button>
                </ButtonGroup>
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
