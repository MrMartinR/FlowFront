import { Container, Grid, makeStyles } from '@material-ui/core/'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserAlert } from '../../utils/UserAlert'
import { CountriesList } from './CountryList'
import { CountryToolbar } from './CountryToolbar'
import * as countriesActions from './state/countriesActions'

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

export const CountriesPage = () => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.countries,
    }),
    shallowEqual
  )
  const dispatch = useDispatch()
  // Peticion da lista de countries
  useEffect(() => {
    dispatch(countriesActions.fetchCountries())
  }, [dispatch])
  // unha vez recibida a resposta leese do state
  useEffect(() => {
    if (currentState.countryTable) {
      setList(currentState.countryTable.entities)
    }
  }, [currentState.countryTable])
  // definense as filas da tabla cos datos da lista
  const rows = [] as any
  if (list.length > 1)
    list.map((country: any) => {
      const newRow = {
        id: country.id,
        type: country.type,
        name: country.attributes.name,
        iso_code: country.attributes.iso_code,
        continent: country.attributes.continent,
        currency: `${country.attributes.currency.code}`,
        flag: country.attributes.iso_code,
        fiscal_year_start: country.attributes.fiscal_year_start,
      }
      rows.push(newRow)
      return rows
    })
  // actualizacion do flag de loading cos datos do state
  useEffect(() => {
    setIsLoading(currentState.listLoading)
  }, [currentState.listLoading])
  // resetea o state para que se oculte o snackbar
  const resetSuccess = () => {
    dispatch(countriesActions.resetSuccess())
  }
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <CountryToolbar list={rows} />
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
        {/* table */}
        <Grid item xs={12}>
          <CountriesList isLoading={isLoading} rows={rows} />
        </Grid>
      </Grid>
    </Container>
  )
}
