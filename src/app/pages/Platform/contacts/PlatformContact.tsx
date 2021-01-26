import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItemText
} from '@material-ui/core/'


const PlatformContact = (props: any) => {
  const err = 'Not Found'
  const { platformContact } = props
  return (
    <>
    <Grid xs={12}>
      <Card>
        <CardHeader title='Platform Contact'></CardHeader>
        <CardContent>
          <List>
            <ListItemText
              primary={`Trade name: ${platformContact.trade_name || err}`}
            />
            <ListItemText
              primary={`Company name: ${platformContact.company_name || err}`}
            />
            <ListItemText
              primary={`Id: ${platformContact.id_number || err}`}
            />
            <ListItemText
              primary={`Founded: ${platformContact.founded || err}`}
            />
          </List>
          <Typography variant='body2' component='p'>
            {`${platformContact.description || err}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    </>
  )
}
export default PlatformContact
