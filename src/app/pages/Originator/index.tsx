import { Grid, makeStyles, Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as originatorsActions from './state/originatorsActions'
import { OriginatorsList } from './OriginatorsList'
import { OriginatorsListToolbar } from './OriginatorsListToolbar'
import { UserAlert } from '../../utils/UserAlert'
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
export const OriginatorsPage = () => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.originators,
    }),
    shallowEqual
  )
  // PEticion da lista de originators
  useEffect(() => {
    dispatch(originatorsActions.fetchOriginatorsList())
  }, [dispatch])
  // recibida resposta carga os datos do state
  useEffect(() => {
    if (currentState.originatorsTable) {
      setList(currentState.originatorsTable)
    }
  }, [currentState.originatorsTable])
  // con eses datos prepara as filas da tabla
  const rows = [] as any
  if (list.length > 0)
    list.map((originator: any) => {
      const newRow = {
        id: originator.id,
        contact_id: originator.attributes.contact?.id,
        trade_name: originator.attributes.contact?.trade_name,
        customer_category: originator.attributes.customer_category,
        product_category_business: originator.attributes.product_category_business,
        product_category_consumer: originator.attributes.product_category_consumer,
        apr: originator.attributes.apr,
      }
      rows.push(newRow)
      return rows
    })
  // actualizacion dos flags cos datos do state
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(originatorsActions.resetSuccess())
  }
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <OriginatorsListToolbar list={rows} />
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
        {/* table */}
        <Grid item xs={12}>
          <OriginatorsList isLoading={isLoading} rows={rows} />
        </Grid>
      </Grid>
    </Container>
  )
}
