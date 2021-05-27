import { FormControl, Grid, LinearProgress, MenuItem, Select, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../redux/rootReducer"
import * as countriesActions from '../../Country/state/countriesActions'
import * as currenciesActions from '../../Currency/state/currenciesActions'
export const AccountInformation = () => {
    const { authState, countryState, currencyState } = useSelector(
        (state: RootState) => ({
            authState : state.auth,
            countryState: state.countries,
            currencyState: state.currencies,
        }),
        shallowEqual,
      )
    const [currencies, setCurrencies] = useState([])
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('')
    const [currency, setCurrency] = useState('')
    const [countriesLoading, setCountriesLoading] = useState([] as any)
    const [currenciesLoading, setCurrenciesLoading] = useState([] as any)
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch()
    const handleCountry = (e: any) => {
        setCountry(e.target.value);
    }
    const handleCurrency = (e: any) => {
        setCurrency(e.target.value);
    }
    const onSubmit = (formData: any, e:any) => {
        e.preventDefault();
        formData= {
          ...formData,
        }
      }
    const GetAllCountries = () => {
        useEffect(() => {
          if (dispatch) {
            dispatch(countriesActions.fetchCountries())
          }
        }, [])
      }
      GetAllCountries()
      useEffect(() => {
        if (countryState && countryState.countryTable && countryState.countryTable.entities.length > 0) {
          setCountries(countryState.countryTable.entities)
          setCountriesLoading(countryState.listLoading)
        }
      }, [countryState, authState.user])

      const GetAllCurrencies = () => {
        useEffect(() => {
          if (dispatch) {
            dispatch(currenciesActions.getAllCurrencies())
          }
        }, [])
      }
      GetAllCurrencies()
      useEffect(() => {
        if (currencyState && currencyState.currenciesTable && currencyState.currenciesTable.entities.length > 0) {
          setCurrencies(currencyState.currenciesTable.entities)
          setCurrenciesLoading(currencyState.listLoading)
        }
      }, [currencyState, authState.user])
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction='column'>
                  {/* username */}
                    <TextField
                      label="Username"
                      margin="normal"
                      variant="outlined"
                      autoComplete="true"
                      type="text"
                      name="username"
                      inputRef={register()}
                    />

                  {/* email */}
                    <TextField
                      label="Email"
                      margin="normal"
                      variant="outlined"
                      autoComplete="true"
                      type="email"
                      name="email"
                      inputRef={register()}
                    />
                    <Typography variant='body2'>
                      Email will not be publicly displayed
                    </Typography>
                    <FormControl margin = 'normal'>
                    {/* country */}
                    <Typography variant='body1'>
                      Country
                    </Typography>
                        { !countriesLoading
                        ?<Select labelId="Country" id="country" value = { country } onChange = { handleCountry }>
                            {countries.map((country:any) => (
                                <MenuItem 
                                value= { country.id }
                                key = { country.id }>{ country.attributes.name }</MenuItem>
                            ))}  
                        </Select>
                        :<LinearProgress color="secondary" />}
                    </FormControl>
                    <FormControl margin = 'normal'>
                    {/* currency */}
                    <Typography variant='body1'>
                      Currency
                    </Typography>
                        { !currenciesLoading
                        ?<Select labelId="Currency"  id="currency" value = { currency } onChange = { handleCurrency }>
                            {currencies.map((currency:any) => (
                                <MenuItem 
                                value= { currency.id }
                                key = { currency.id }>{ currency.attributes.name }</MenuItem>
                            ))}  
                        </Select>
                        :<LinearProgress color="secondary" />}

                    </FormControl>
                </Grid>
        </form>
    )
}
