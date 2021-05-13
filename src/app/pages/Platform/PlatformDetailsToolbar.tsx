import { Button, ButtonGroup, Grid, Toolbar, Typography } from '@material-ui/core'

export const PlatformDetailsToolbar = (props: any) => {
    const { setTab, id, trade_name } = props;
    const handleClick = (e: any) => {
        setTab(`${e.target.innerHTML}`)
      }
    return (
      <Toolbar>
        <Grid container direction="row" justify="space-between">
          <Grid item xs={4}>
            <Typography variant="h4">{trade_name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup>
              <Button onClick={handleClick}>Info</Button>
              <Button onClick={handleClick}>Originators</Button>
              <Button onClick={handleClick}>Loans</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Button href={`/contacts/${id}`}>
            Contact
          </Button>
        </Grid>
      </Toolbar>
    )
}
