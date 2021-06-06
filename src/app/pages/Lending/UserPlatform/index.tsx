import { CardHeader, Container, Grid, makeStyles } from '@material-ui/core'
import { UserPlatformsList } from './UserPlatformsList'
import { UserPlatformsDetails } from './UserPlatformDetails'
import { UserPlatformsToolbar } from './UserPlatformsToolbar'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/rootReducer'
import * as userPlatformsActions from './../state/userPlatformsActions'
import { UserPlatformListToolbar } from './UserPlatformListToolbar'
import { UserAlert } from '../../../utils/UserAlert'
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
export const UserPlatformsPage = () => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userPlatforms,
    }),
    shallowEqual
  )
  const dispatch = useDispatch()
  // Peticion da lista de platforms
  useEffect(() => {
    dispatch(userPlatformsActions.fetchUserPlatformsList())
  }, [dispatch])
  // recibida resposta cargase os datos do state
  useEffect(() => {
    if (currentState.userPlatformsTable) {
      setList(currentState.userPlatformsTable)
    }
  }, [currentState.userPlatformsTable])
  // Cos datos gardados preparanse as filas da tabla
  const rows = [] as any
  if (list.length > 1)
    list.map((platform: any) => {
      const newRow = {
        id: platform.id,
        contact_id: platform.attributes?.platform?.contact_id || '',
      }
      rows.push(newRow)
      return rows
    })
  // actualización dos flags de loading cos datos do state
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(userPlatformsActions.resetSuccess())
  }
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <UserPlatformsToolbar />
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
        {/* Details */}
        <Grid item>
          <Grid container justify="space-between">
            <Grid xs={2}>
              <Grid container direction="column" spacing={1}>
                <UserPlatformListToolbar list={rows} />
                <CardHeader title="User Platforms"></CardHeader>
                <UserPlatformsList isLoading={isLoading} rows={rows} />
              </Grid>
            </Grid>
            <Grid xs={9}>
              <UserPlatformsDetails />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
