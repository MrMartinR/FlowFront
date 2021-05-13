import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { TextField, Button, Grid } from '@material-ui/core'
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import * as contactsActions from './state/contactsActions'
import Alert from '@material-ui/lab/Alert'
import store from './../../../redux/store'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 5,
    },
  })
)

export const CompanyForm = (props: any) => {
  const { kind, visibility, country, setOpen } = props
  const { register, handleSubmit, errors } = useForm()
  const [formData, setFormData] = useState({})
  // const {
  //   auth: { user },
  // } = store.getState()
  // let userId:any;
  // visibility==='Public'?userId=null:userId=user.id;
  const onSubmit = (data: any, e:any) => {
    data = {...data ,
      kind: kind,
      country_id: country,
      visibility: visibility,
    }
    // if (userId!==null) {
    //   data = {
    //   ...data,
    //   user_id: userId,
    //   }
    // }
    setFormData(data);
    setOpen(false);
  }
 let ContactDispatch = useDispatch()
  useEffect(() => {
    (async function () {
      var size = Object.keys(formData).length
      if (size > 0) {
        await ContactDispatch(contactsActions.createContact(formData))
      }
    })()
  }, [ContactDispatch, formData, setOpen])
  const classes = useStyles()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <TextField
          name="kind"
          label="Kind"
          disabled
          variant="filled"
          value={kind}
          inputRef={register}
          className={classes.root}
        />
        <TextField
          name="visibility"
          label="Select"
          variant="filled"
          disabled
          value={visibility}
          inputRef={register}
          className={classes.root}
        ></TextField>

        <TextField
          name="trade_name"
          label="Trade name"
          variant="outlined"
          placeholder="Trade name"
          autoComplete = 'off'
          inputRef={register({ required: true, minLength: 3 })}
          color="secondary"
          className={classes.root}
        />
        {errors.trade_name && errors.trade_name.type === 'required' && (
          <Alert severity="error">Trade name is required</Alert>
        )}
        {errors.trade_name && errors.trade_name.type === 'minLength' && (
          <Alert severity="error">Trade name should be at-least 3 characters.</Alert>
        )}

        <br />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
        <br />
      </Grid>
    </form>
  )
}
export default CompanyForm
