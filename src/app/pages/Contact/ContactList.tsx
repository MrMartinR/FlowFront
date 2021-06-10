import { useEffect, useState } from 'react'
/* eslint-disable no-restricted-imports*/
import {
  makeStyles,
  Container,
  Grid,
  Card,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
} from '@material-ui/core'

import { Autocomplete /*ToggleButton, ToggleButtonGroup*/ } from '@material-ui/lab'

/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxHeight: 600,
    position: 'relative',
    overflow: 'auto',
    padding: 12,
  },
  search: {
    minWidth: '100%',
    margin: 6,
  },
  card: {
    background: '#fff', // #707070
    minWidth: '100%',
    margin: 6,
  },
  avatar: {
    background: 'transparent',
    color: '#e6e6e6',
  },
  toggle: {
    background: 'transparent',
    maxHeight: '20px',
    width: '20px',
  },
  text: {
    color: '#787878',
  },
})

export const ContactsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { setSelectedItemIndex, isLoading, list } = props
  const [options, setOptions] = useState([] as any)
  /* const [ listFiltered, setListFiltered ] = useState([] as any)
  const [filters, setFilters] = useState(() => []);
  const handleFilters = (event: React.MouseEvent<HTMLElement>, newFormats: any) => {
    setFilters(newFormats);
  };
   // lista con filtros
  (() => {
    if (filters===['Platforms']) {
      setListFiltered(list)
    }
    else if (filters===['Originators']) {
      setListFiltered(list)
    } else setListFiltered(list)
  }, [filters, list]) */
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
  // funcion que se chama o elexir unha opción no buscador
  const handlePick = (e: any, v: any) => {
    let selected = list.findIndex((itm: any) => itm.attributes.name_header === v)
    setSelectedItemIndex(selected)
  }

  return (
    <>
      <Container className={classes.search}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          {/* type filter
          <Grid item>
            <ToggleButtonGroup value={filters} exclusive onChange={handleFilters}>
              <ToggleButton value='General'>
                <Avatar
                  variant="square"
                  src={'/media/svg/icons/dashboard.svg'}
                  className={classes.toggle}
                />
              </ToggleButton>
              <ToggleButton value='Platforms'>
                <Avatar
                    variant="square"
                    src={'/media/svg/icons/platform.svg'}
                    className={classes.toggle}
                    />
              </ToggleButton>
              <ToggleButton value='Originators'>
                <Avatar
                    variant="square"
                    src={'/media/svg/icons/originator.svg'}
                    className={classes.toggle}
                />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid> */}
          {/* seach field */}
          <Grid item container justify="space-between">
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
      <Container className={classes.root}>
        <List>
          {isLoading ? (
            <LinearProgress />
          ) : (
            list.map((item: any, idx: any) => (
              <Card key={item.id} className={classes.card}>
                <ListItem
                  button
                  onClick={(e) => {
                    setSelectedItemIndex(idx)
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={'/media/svg/contact/icons/' + item.id + '.svg'}
                      alt={item.attributes.name_header}
                      variant="square"
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`${item.attributes.name_header}`} className={classes.text} />
                </ListItem>
              </Card>
            ))
          )}
        </List>
      </Container>
    </>
  )
}
