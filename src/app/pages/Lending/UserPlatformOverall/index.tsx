import { Container, Grid, makeStyles } from '@material-ui/core'
import { UserAlert } from '../../../utils/UserAlert'
import { UserPlatformsOverall } from './UserPlatformOverall'
import { UserPlatformOverallToolbar } from './UserPlatformOverallToolbar'
import * as userPlatformsActions from './../state/userPlatformsActions'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/rootReducer'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export const UserPlatformsOverallPage = () => {
  /* styles */
  const classes = useStyles()
  const dispatch = useDispatch()
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userPlatforms,
    }),
    shallowEqual
  )
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(userPlatformsActions.resetSuccess())
  }
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <Grid item>
          <UserPlatformOverallToolbar />
        </Grid>
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
        {/* Details */}
        <Grid item>
          <UserPlatformsOverall />
        </Grid>
      </Grid>
    </Container>
  )
}
