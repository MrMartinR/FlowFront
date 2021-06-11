import { Button, Grid } from '@material-ui/core'

export const AccountAdd = (props: any) => {
  const { handleClose } = props
  return (
    <form>
      <Grid container justify="space-between">
        <Button onClick={handleClose}>Cancel</Button>
<<<<<<< Updated upstream
        <Button type="submit" disabled variant="contained" color="secondary">
          Submit
=======
        <Button type="submit"  color='primary'>
          Save
>>>>>>> Stashed changes
        </Button>
      </Grid>
    </form>
  )
}
