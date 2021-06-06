import { Grid, Card, CardHeader, Typography, CardContent, CardMedia, makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/rootReducer'
const useStyles = makeStyles({
  root: {
    width: '60vh',
    margin: 'auto',
  },
})
export const UserPlatformsDetails = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userPlatforms,
    }),
    shallowEqual
  )
  const [platformDetails, setPlatformDetails] = useState(null as any)
  // cando o state ten os datos dos details cargaos na variable
  useEffect(() => {
    currentState.userPlatformDetails && setPlatformDetails(currentState.userPlatformDetails)
  }, [currentState.userPlatformDetails])
  return (
    <>
      <CardHeader title="User Platform Performance"></CardHeader>
      <Grid container direction="row" justify="space-between">
        <Grid container direction="column" xs={12}>
          <Card>
            <CardContent>
              {!platformDetails ? (
                <Typography>Click a platform to load performance</Typography>
              ) : (
                <>
                  <CardMedia
                    className={classes.root}
                    component="img"
                    src={'/media/svg/contact/logos/' + platformDetails.attributes?.platform.contact_id + '.svg'}
                    alt={`${platformDetails.id}`}
                  />
                  <Typography>Login User: {platformDetails.attributes?.login_user}</Typography>
                  <Typography>Strategy: {platformDetails.attributes?.strategy}</Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
