import { useEffect, useState } from 'react'
import { Toolbar, Typography, Grid, TextField, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router'
import { Autocomplete } from '@material-ui/lab'

/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxWidth: '100%',
  },
  search: {
    minWidth: '100%',
    margin: 6,
  },
})

export const CurrencyToolBar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { list } = props
  const linkTo = useHistory()
  const [options, setOptions] = useState([] as any)
  // lista para o autocomplete do buscador
  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        if (option.name !== undefined) {
          opt.push(option.name)
        }
        return opt
      })
      setOptions(opt)
    }
  }, [list])
  // funcion que se chama o elexir unha opción no buscador
  const handlePick = (e: any, v: any) => {
    let selected = list.find((itm: any) => itm.name === v)
    selected && linkTo.push(`/currencies/${selected.id}`)
  }
  return (
    <Toolbar variant="dense" className={classes.root}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h5">Currencies</Typography>
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            freeSolo
            options={options}
            onChange={handlePick}
            renderInput={(params) => <TextField {...params} label="Search" margin="normal" variant="outlined" />}
          />
        </Grid>
      </Grid>
    </Toolbar>
  )
}
