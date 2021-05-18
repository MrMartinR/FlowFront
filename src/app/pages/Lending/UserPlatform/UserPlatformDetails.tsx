import { Grid, Card, CardHeader, Typography, CardContent } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/rootReducer'

export const UserPlatformsDetails = (props: any) => {
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userPlatforms,
    }),
    shallowEqual
  )
  const [platformDetails, setPlatformDetails] = useState({} as any);
  useEffect(() => {
    currentState.userPlatformDetails &&
    setPlatformDetails(currentState.userPlatformDetails);
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
                  <Typography>User platform Id: {platformDetails.id}</Typography>
                  <Typography>User id: {platformDetails.attributes?.user?.id}</Typography>
                  <Typography>Platform id: {platformDetails.attributes?.platform?.id}</Typography>
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