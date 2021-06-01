import { useEffect, useState } from 'react'
import { Grid, Typography, Toolbar, TextField, makeStyles } from '@material-ui/core/'
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router';

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
export const LoansListToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
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
    (selected)&&linkTo.push(`/loans/${selected.id}`);
  }
  return (
    <Toolbar variant="dense" className={classes.root}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h5">Loans</Typography>
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            freeSolo
            options={options}
            onChange={handlePick}
            renderInput={(params) => <TextField {...params} label="Search" size="small" margin="normal" variant="outlined" />}
          />
        </Grid>
      </Grid>
    </Toolbar>
  )
}
