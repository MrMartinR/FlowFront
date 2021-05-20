import { useEffect, useState } from 'react'
import { Toolbar, Typography, Grid, TextField } from '@material-ui/core'
import { useHistory } from 'react-router';
import { Autocomplete } from '@material-ui/lab';

/**
 * The currency top bar nav
 * holder the add currency component
 */
export const CurrencyToolBar = (props: any) => {
  const { list } = props;
  const linkTo = useHistory();
  const [options, setOptions] = useState([] as any)
  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        if (option.name!==undefined){
          opt.push(option.name);
        }
        return opt;
      })
      setOptions(opt);
    }
  }, [list])
  const handlePick = (e: any, v: any) => {
    let selected = list.find((itm: any) => itm.name === v);
    (selected)&&linkTo.push(`/currencies/${selected.id}`);
  }
  return (
    <Toolbar variant="dense">
      <Grid container direction="row" justify="space-between">
      <Grid item xs={4}>
          <Typography variant="h5">Currencies List</Typography>
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