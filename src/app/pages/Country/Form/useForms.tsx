import React from 'react'
import { makeStyles, styled, Button } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
  error: {
    backgroundColor: '#f7a1a1',
    color: '#fff',
    fontWeight: 700,
    height: '30px',
    paddingTop: '10px',
    paddingLeft: '5px',
    width: '50%',
  },
}))

export const Form = (props: any) => {
  const classes = useStyles()
  const { children, ...other } = props
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  )
}

export const MyButton = styled(Button)({
  marginTop: '10px',
  backgroundColor: '#e0e0e0',
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  width: '20%',
})
