import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

export const useForm = (initialFormValues) => {
  // const [values, setValues] = useState(initialFormValues);

  // const handleInputChange = e => {
  //   console.log(e.target.value)
  //     const { name, value } = e.target
  //     setValues({
  //         ...values,
  //         [name]: value
  //     })
  // }

  //   const resetForm = () => {
  //     console.log('resetForm')
  //     setValues(initialFormValues);
  // }

  return {
    // values,
    // setValues,
    // resetForm,
    // handleInputChange
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}))

export const Form = (props) => {
  const classes = useStyles()
  const { children, ...other } = props
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  )
}
