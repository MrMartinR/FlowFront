import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  makeStyles,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import store from '../../../redux/store'
import * as contactsActions from './state/contactsActions'
import * as countriesActions from '../Country/state/countriesActions'
import { RootState } from '../../../redux/rootReducer'

export const ContactEdit = (props: any) => {
  const { selectedContact, setOpen } = props
  const { countryState } = useSelector(
    (state: RootState) => ({
      countryState: state.countries,
    }),
    shallowEqual
  )
  const { register, handleSubmit, errors } = useForm()
  const [formData, setFormData] = useState({})
  const [params, SetParams] = React.useState('' as any)
  const [visibility, setVisibility] = useState(selectedContact.attributes.visibility)
  const [kind, setKind] = useState(selectedContact.attributes.kind)
  const [country, setCountry] = useState('')
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const [checkState, setCheckState] = useState({
    checkedA: false,
    checkedB: false,
  })
  const [checkVisible, setCheckVisible] = useState({
    checkedC: false,
    checkedD: false,
  })
  const [description, setDescription] = useState(selectedContact.attributes.description)
  useEffect(() => {
    if (selectedContact?.attributes.kind==='Company') setCheckState({
      checkedA: true,
      checkedB: false
    })
    if (selectedContact?.attributes.kind==='Individual') setCheckState({
      checkedA: false,
      checkedB: true
    });
    setCountry(selectedContact?.attributes.country.id);
    if (selectedContact?.attributes.visibility==='Private') setCheckVisible({
      checkedC: true,
      checkedD: false
    })
    if (selectedContact?.attributes.visibility==='Public') setCheckVisible({
      checkedC: false,
      checkedD: true
    });
  }, [selectedContact]);


  const handleChange = (e: any) => {
    setDescription(e.target.value)
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        margin: 5,
      },
    })
  )

  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }
  const handleKind = (e: any) => {
    if (e.target.name === 'checkedA') {
      setCheckState({
        ...checkState,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedB']: false,
      })
    }
    if (e.target.name === 'checkedB') {
      setCheckState({
        ...checkState,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedA']: false,
      })
    }
    if (e.target.name === 'checkedC') {
      setCheckVisible({
        ...checkVisible,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedD']: false,
      })
    }
    if (e.target.name === 'checkedD') {
      setCheckVisible({
        ...checkVisible,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedC']: false,
      })
    }
  }
  // contact Redux state
  const dispatch = useDispatch()
  const GetAllCountries = () => {
    useEffect(() => {
      if (dispatch) {
        dispatch(countriesActions.getAllCountries())
      }
    }, [])
  }
  GetAllCountries()

  useEffect(() => {
    if (countryState && countryState.countryTable && countryState.countryTable.entities.length > 0) {
      setList(countryState.countryTable.entities)
      setIsLoading(countryState.listLoading)
      setCountry(selectedContact.attributes.country.id)
    }
  }, [countryState, selectedContact.attributes.country.id])

  const {
    auth: { user },
  } = store.getState()
  let userId: any
  visibility === 'Public' ? (userId = null) : (userId = user.id)
  const onSubmit = (data: any, e: any) => { 
    SetParams(selectedContact.id);
    data = { ...data, kind: kind, country_id: country, visibility: visibility, description: description }
    if (userId !== null) {
      data = {
        ...data,
        user_id: userId,
      }
    }
    setFormData(data);
    setOpen(false);
  }
  const EditDispatch = useDispatch()
  useEffect(() => {
    if (EditDispatch) {
      var size = Object.keys(formData).length
      if (size > 0) {
        EditDispatch(contactsActions.updateContact(formData, params));
      }
    }
  }, [formData, EditDispatch]);

  useEffect(() => {
    if (checkState.checkedA === true) {
      setKind('Company')
    }
    if (checkState.checkedB === true) {
      setKind('Individual')
    }
  }, [checkState])
  useEffect(() => {
    if (checkVisible.checkedC === true) {
      setVisibility('Private')
    }
    if (checkVisible.checkedD === true) {
      setVisibility('Public')
    }
  }, [checkVisible])
  const classes = useStyles()
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <Typography variant='body1'>Select Contact Type</Typography>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={checkState.checkedA} name="checkedA" onChange={handleKind} />}
            label="Company"
          />
          <FormControlLabel
            control={<Checkbox checked={checkState.checkedB} onChange={handleKind} name="checkedB" />}
            label="Individual"
          />
        </FormGroup>
        <hr/>
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
          <hr/>
          <Typography variant='body1'>Select Visibility</Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={checkVisible.checkedC} name="checkedC" onChange={handleKind} />}
              label="Private"
            />
            <FormControlLabel
              control={<Checkbox checked={checkVisible.checkedD} onChange={handleKind} name="checkedD" />}
              label="Public"
            />
          </FormGroup>

        {kind.toUpperCase() === 'COMPANY' ? (
          <>
            <TextField
              name="trade_name"
              label="Trade_name"
              variant="outlined"
              defaultValue={selectedContact.attributes.trade_name}
              placeholder="Trade name"
              autoComplete="off"
              inputRef={register({ required: true, minLength: 3 })}
              color="secondary"
              className={classes.root}
            />
            <TextField
              name="company_name"
              label="Company name"
              variant="outlined"
              autoComplete="off"
              defaultValue={selectedContact.attributes.company_name}
              placeholder="Company name"
              color="secondary"
              inputRef={register({ required: false })}
              className={classes.root}
            />
            <TextField
              name="founded"
              label="Founded"
              variant="outlined"
              autoComplete="off"
              defaultValue={selectedContact.attributes.founded}
              placeholder="founded"
              color="secondary"
              inputRef={register({ required: false })}
              className={classes.root}
            />
          </>
        ) : (
          <>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              placeholder="Name"
              defaultValue={selectedContact.attributes.name}
              autoComplete="off"
              inputRef={register({ required: true, minLength: 3 })}
              color="secondary"
              className={classes.root}
            />
            <TextField
              name="surname"
              label="surname"
              variant="outlined"
              autoComplete="off"
              defaultValue={selectedContact.attributes.surname}
              placeholder="Surname"
              color="secondary"
              inputRef={register({ required: false })}
              className={classes.root}
            />
            <TextField
              name="nick"
              label="nick"
              variant="outlined"
              autoComplete="off"
              defaultValue={selectedContact.attributes.nick}
              placeholder="Nick"
              color="secondary"
              inputRef={register({ required: false })}
              className={classes.root}
            />
          </>
        )}
        <TextField
          name="id_number"
          label="id_number"
          variant="outlined"
          defaultValue={selectedContact.attributes.id_number}
          placeholder="ID Number"
          color="secondary"
          inputRef={register({ required: false })}
          className={classes.root}
        />
        <TextareaAutosize
          name="description"
          rowsMin={5}
          value={description}
          placeholder="Description"
          color="secondary"
          onChange={handleChange}
          className={classes.root}
        />
        {errors.trade_name && errors.trade_name.type === 'required' && (
          <Alert severity="error">Trade name is required</Alert>
        )}
        {errors.trade_name && errors.trade_name.type === 'minLength' && (
          <Alert severity="error">Trade name should be at-least 3 characters.</Alert>
        )}
        {errors.name && errors.name.type === 'required' && (
          <Alert severity="error">Name is required</Alert>
        )}
        {errors.name && errors.name.type === 'minLength' && (
          <Alert severity="error">Name should be at-least 3 characters.</Alert>
        )}

        <br />
        
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
        <br />
      </Grid>
    </form>
    </>
  )
}
