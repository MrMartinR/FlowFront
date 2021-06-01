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

/**
 * @rev this Autocomplete thing... the final result will be search/filter-as-you-type
 * the list of contacts will be the one to shrink to accomodate the search terms.
 */

import { Autocomplete } from '@material-ui/lab'

/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxHeight: 600,
    position: 'relative',
    overflow: 'auto',
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
  text: {
    color: '#787878',
  },
})

export const ContactsList = (props: any) => {
  /* styles */
  const classes = useStyles()

  const { setSelectedItemIndex, isLoading, list } = props
  const [options, setOptions] = useState([] as any)
  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        opt.push(option.attributes.name)
        return opt
      })
      setOptions(opt)
    }
  }, [list])

  const handlePick = (e: any, v: any) => {
    let selected = list.findIndex((itm: any) => itm.attributes.name === v)
    setSelectedItemIndex(selected)
  }

  return (
    <>
      <Container className={classes.search}>
        {/* seach field */}
        <Grid container>
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
        {/* type filter */}
        {/* <ButtonGroup>
          <Button>General</Button>
          <Button>Platforms</Button>
          <Button>Originators</Button>
        </ButtonGroup> */}
      </Container>
      <Container className={classes.root}>
        <List>
          {isLoading ? (
            <LinearProgress color="secondary" />
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
                      variant="square"
                      className={classes.avatar}
                    >
                      {item.attributes.name[0]}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText primary={`${item.attributes.name}`} className={classes.text} />
                </ListItem>
              </Card>
            ))
          )}
        </List>
      </Container>
    </>
  )
}
