import { CurrenciesList } from './CurrenciesList'
import { Container, Grid, makeStyles } from '@material-ui/core'
import * as currenciesActions from './state/currenciesActions'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { CurrencyToolBar } from './CurrencyToolbar'
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

export const Currencies = () => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.currencies,
    }),
    shallowEqual
  )
  const dispatch = useDispatch()
  // Peticion da lista de currencies
  useEffect(() => {
    dispatch(currenciesActions.getAllCurrencies())
  }, [dispatch])
  // recibida a resposta colle os datos e state
  useEffect(() => {
    if (currentState.currenciesTable) {
      setList(currentState.currenciesTable.entities)
    }
  }, [currentState.currenciesTable])
  // definense as filas da tabla cos datos da lista
  const rows = [] as any
  if (list.length > 1)
    list.map((currency: any) => {
      const newRow = {
        id: currency.id,
        type: currency.type,
        name: currency.attributes.name,
        code: currency.attributes.code,
        symbol: currency.attributes.symbol,
        kind: currency.attributes.kind,
        fx_eur: currency.attributes.fx_eur,
        decimal_places: currency.attributes.decimal_places,
      }
      rows.push(newRow)
      return rows
    })
  // actualizacion do flag de loading cos datos do state
  useEffect(() => {
    setIsLoading(currentState.listLoading)
  }, [currentState.listLoading])
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(currenciesActions.resetSuccess())
  }
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <CurrencyToolBar list={rows} />
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
        {/* table */}
        <Grid item xs={12}>
          <CurrenciesList isLoading={isLoading} rows={rows} />
        </Grid>
      </Grid>
    </Container>
  )
}
