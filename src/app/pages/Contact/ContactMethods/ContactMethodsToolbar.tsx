import { Grid, CardHeader, Button } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
export const ContactMethodsToolbar = (props: any) => {
    const { canEdit, handleOpen } = props
  return (
    <Grid container>
      <Grid item xs={12}>
        <CardHeader
          title="Contact Methods"
          action={
            canEdit && (
              <Button>
                <AddIcon id="add" onClick={(e) => handleOpen(e, 'add')} />
              </Button>
            )
          }
        />
      </Grid>
    </Grid>
  )
}
