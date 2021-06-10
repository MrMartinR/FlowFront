import { Button, Grid } from '@material-ui/core'

export const AccountAdd = (props: any) => {
  const { handleClose } = props
  return (
    <form>
      <Grid container justify="space-between">
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled variant="contained">
          Submit
        </Button>
      </Grid>
    </form>
  )
}
