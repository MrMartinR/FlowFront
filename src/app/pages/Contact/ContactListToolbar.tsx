import { Button, Container, makeStyles } from '@material-ui/core'
import { Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useEffect, useState } from 'react'
/* styles */
const useStyles = makeStyles({
  search: {
    minWidth: '100%',
    margin: 6,
  },
})
export const ContactListToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { list, setSelectedItemIndex } = props
  const [options, setOptions] = useState([] as any)
  // funcion que se chama o elexir unha opción no buscador
  const handlePick = (e: any, v: any) => {
    let selected = list.findIndex((itm: any) => itm.attributes.name_header === v)
    setSelectedItemIndex(selected)
  }
  // Lista para o autocomplete do buscador
  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        opt.push(option.attributes.name_header)
        return opt
      })
      setOptions(opt)
    }
  }, [list])
  return (
    <Container className={classes.search}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item container justify="space-between">
          {/* seach field */}
          <Grid item xs={9}>
            <Autocomplete
              freeSolo
              options={options}
              onChange={handlePick}
              renderInput={(params) => <TextField {...params} size="small" label="Search" variant="outlined" />}
            />
          </Grid>
          <Grid item xs={2}>
            <Button>•••</Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
