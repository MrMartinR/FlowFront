import { Grid, Container, makeStyles } from '@material-ui/core'
import { UserOriginatorsList } from './UserOriginatorsList'
import * as userOriginatorsActions from './state/userOriginatorsActions'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserOriginatorsListToolbar } from './UserOriginatorListToolbar'
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
export const UserOriginatorsPage = () => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userOriginators,
    }),
    shallowEqual
  )
  const dispatch = useDispatch()
  // peticion da lista de user originators
  useEffect(() => {
    dispatch(userOriginatorsActions.fetchUserOriginatorsData())
  }, [dispatch])
  // recibida resposta cargase a data do state
  useEffect(() => {
    if (currentState.userOriginatorsData) {
      setList(currentState.userOriginatorsData)
    }
  }, [currentState.userOriginatorsData])

  // Cos datos cargados do state actualizase o array coa data das filas da tabla
  const rows = [] as any
  if (list.length > 1)
    list.map((originator: any) => {
      const newRow = {
        id: originator.id,
        trade_name: originator.attributes.contact?.trade_name,
        customer_category: originator.attributes.customer_category,
        product_category_business: originator.attributes.product_category_business,
        product_category_consumer: originator.attributes.product_category_consumer,
        apr: originator.attributes.apr,
      }
      rows.push(newRow)
      return rows
    })
  // actualización dos flags de loading
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])
  // funcion que se chama o cerrar o snackbar de notificacions
  const resetSuccess = () => {
    dispatch(userOriginatorsActions.resetSuccess())
  }
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <UserOriginatorsListToolbar list={rows} />
        <UserAlert
          error={currentState.error}
          message={currentState.message}
          success={currentState.success}
          resetSuccess={resetSuccess}
        />
        {/* table */}
        <Grid item xs={12}>
          <UserOriginatorsList isLoading={isLoading} rows={rows} />
        </Grid>
      </Grid>
    </Container>
  )
}
