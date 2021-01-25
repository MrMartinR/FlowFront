import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Grid } from '@material-ui/core'
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 5,
    },
  })
)

export const CompanyForm = (props: any) => {
  const { kind, visibility } = props
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)
  const classes = useStyles()
  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <TextField
          name="kind"
          label="Kind"
          variant="filled"
          value={kind}
          inputRef={register}
          className={classes.root}
        />
        <TextField
          name="visibility"
          label="Select"
          variant="filled"
          value={visibility}
          inputRef={register}
          className={classes.root}
        ></TextField>

        <TextField
          name="trade_name"
          label="Trade name"
          variant="outlined"
          placeholder="Trade name"
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
