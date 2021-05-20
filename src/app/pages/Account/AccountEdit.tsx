import { Button, LinearProgress, MenuItem, Select, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as countriesActions from '../Country/state/countriesActions'
import * as accountsActions from './state/accountsActions'
export const AccountEdit = (props:any) => {
    const { selectedAccount, setOpen } = props
    const { countryState } = useSelector(
        (state: RootState) => ({
        countryState: state.countries,
        }),
        shallowEqual
    )
    const { register, handleSubmit, errors } = useForm()
  const [formData, setFormData] = useState({})
  const [params, SetParams] = useState('' as any)
  const [country, setCountry] = useState('')
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }
  const dispatch = useDispatch()
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
      setList(countryState.countryTable.entities)
      setIsLoading(countryState.listLoading)
    }
  }, [countryState])

  useEffect(() => {
    setCountry(selectedAccount?.attributes?.contact.country_id);
  }, [selectedAccount]);
console.log(JSON.stringify(selectedAccount));
  const onSubmit = (data: any, e: any) => { 
    SetParams(selectedAccount.id);
    data = { ...data, country_id: country }
    setFormData(data);
    setOpen(false);
  }
  const EditDispatch = useDispatch()
  useEffect(() => {
    if (EditDispatch) {
      var size = Object.keys(formData).length
      if (size > 0) {
        EditDispatch(accountsActions.updateAccount(formData, params));
      }
    }
  }, [formData, EditDispatch]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='body1'>Select Country</Typography>
        {
          !isLoading
          ?<Select labelId="Country" id="country" value = { country } onChange = { handleCountry }>
              {list.map((country:any) => (
                <MenuItem 
                  value= { country.id }
                  key = { country.id }>{ country.attributes.name }</MenuItem>
              ))}  
            </Select>
          :<LinearProgress color="secondary" />
        }
        <br/><br/>
        <Button type="submit" disabled variant="contained" color="secondary">
          Submit
        </Button>
        </form>
    )
}
