import { useEffect, useState } from 'react'
import {
  makeStyles,
  Container,
  Card,
  List,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxHeight: 700,
    minWidth: 260,
    position: 'relative',
    overflow: 'auto',
  },
  search: {
    minWidth: '100%',
    margin: 6,
  },
  card: {
    background: '#fff', // #707070
    margin: 6,
  },
  avatar: {
    background: '#e6e6e6',
    color: '#fff',
  },
  text: {
    color: '#787878',
  },
})

export const UserAccountsList = (props: any) => {
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
      {/* <Autocomplete
        freeSolo
        options={options}
        onChange={handlePick}
        renderInput={(params) => <TextField {...params} label="Search" margin="normal" variant="outlined" />}
      /> */}

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
                    <Avatar variant="rounded" className={classes.avatar}></Avatar>
                  </ListItemAvatar>

                  <ListItemText primary={`${item.attributes.name}`} className={classes.text} />
                  {/* @ToDo add the value and balance in the right part of the card */}
                  {/* <ListItemText secondary={`${item.attributes.value}`} />
                  <ListItemText secondary={`${item.attributes.balance}`} /> */}
                </ListItem>
              </Card>
            ))
          )}
        </List>
      </Container>
    </>
  )
}
