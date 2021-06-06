import { makeStyles, TextField, Toolbar } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as userPlatformsActions from './../state/userPlatformsActions'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxWidth: '100%',
  },
  search: {
    minWidth: '100%',
  },
})
export const UserPlatformListToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { list } = props
  const [options, setOptions] = useState([] as any)
  const dispatch = useDispatch()
  // Lista para o autocmplete do buscador
  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        if (option.id !== undefined) {
          opt.push(option.id)
        }
        return opt
      })
      setOptions(opt)
    }
  }, [list])
  // Cando se preme nunha opción do buscador cfaise unha petición para obter os details
  const handlePick = (e: any, v: any) => {
    let selected = list.find((itm: any) => itm.id === v)
    selected && dispatch(userPlatformsActions.fetchUserPlatformDetails(selected.id))
  }
  return (
    <Toolbar variant="dense" className={classes.root}>
      <Autocomplete
        className={classes.search}
        freeSolo
        options={options}
        onChange={handlePick}
        renderInput={(params) => (
          <TextField {...params} label="Search" size="small" margin="normal" variant="outlined" />
        )}
      />
    </Toolbar>
  )
}
