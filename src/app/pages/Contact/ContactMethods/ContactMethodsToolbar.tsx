import { Grid, CardHeader, Button } from '@material-ui/core'
import IconAdd from '../../../../common/layout/components/icons/Add'
export const ContactMethodsToolbar = (props: any) => {
  const { canEdit, handleOpen } = props
  return (
    <Grid container>
      <Grid item xs={12}>
        <CardHeader
          title="Contact Methods"
          action={
            canEdit && (
              <Button onClick={(e) => handleOpen(e, 'add')}>
                <IconAdd />
              </Button>
            )
          }
        />
      </Grid>
    </Grid>
  )
}
