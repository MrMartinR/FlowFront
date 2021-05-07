import React, { useEffect, useState } from 'react'
import { Grid, Typography, Toolbar, TextField } from '@material-ui/core/'
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router';

const PlatformListToolbar = (props: any) => {
  const { list } = props;
  const linkTo = useHistory();
  const [options, setOptions] = useState([] as any)
  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        if (option.trade_name!==undefined){
          opt.push(option.trade_name);
        }
        return opt;
      })
      setOptions(opt);
    }
  }, [list])
  const handlePick = (e: any, v: any) => {
    let selected = list.find((itm: any) => itm.trade_name === v);
    (selected)&&linkTo.push(`/platforms/${selected.id}`);
  }
  return (
    <Toolbar variant="dense">
      <Grid container direction="row" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h5">Platforms</Typography>
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

export default PlatformListToolbar
