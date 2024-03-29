import { makeStyles, Container, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserAlert } from '../../utils/UserAlert'
import { PlatformListToolbar } from './PlatformListToolbar'
import { PlatformsList } from './PlatformsList'
import * as platformsActions from './state/platformsActions'
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

export const PlatformsPage = () => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.platforms,
    }),
    shallowEqual
  )
  // peticion da lista de platforms
  useEffect(() => {
    if (dispatch) {
      dispatch(platformsActions.fetchPlatformsList())
    }
  }, [dispatch])
  // unha vez recibida resposta carganse os datos do state
  useEffect(() => {
    if (currentState.platformsTable) {
      setList(currentState.platformsTable)
    }
  }, [currentState.platformsTable])
  // con eses datos preparanse as filas para a tabla
  const rows = [] as any
  if (list.length > 1)
    list.map((platform: any) => {
      const newRow = {
        id: platform.id,
        type: platform.type,
        trade_name: platform.relationships.contact.data.attributes?.trade_name || '',
        contact_id: platform.relationships.contact.data.id,
        status: platform.attributes.status,
        liquidity: platform.attributes.liquidity,
        account_category: platform.attributes.account_category,
        category: platform.attributes.category,
        cost: platform.attributes.cost,
        invest_mode: platform.attributes.invest_mode,
        min_investment: platform.attributes.min_investment,
        protection_scheme: platform.attributes.protection_scheme,
        secondary_market: platform.attributes.secondary_market,
        structure: platform.attributes.structure,
        term: platform.attributes.term,
        promo: platform.attributes.promo,
        welcome_bonus: platform.attributes.welcome_bonus,
        taxes: platform.attributes.taxes,
      }
      rows.push(newRow)
      return rows
    })
  // actualizanse os flags de loading cos datos do state
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(platformsActions.resetSuccess())
  }
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <PlatformListToolbar list={rows} />
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
        {/* table */}
        <Grid item xs={12}>
          <PlatformsList isLoading={isLoading} rows={rows} />
        </Grid>
      </Grid>
    </Container>
  )
}
