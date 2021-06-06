import { useEffect, useState } from 'react'
import {
  Avatar,
  Card,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxHeight: 600,
    position: 'relative',
    overflow: 'auto',
  },
  avatar: {
    background: 'transparent',
    color: '#e6e6e6',
  },
})

export const AccountsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { setSelectedItemIndex, isLoading, list } = props
  const [options, setOptions] = useState([] as any)

  // lista para o autocomplete do buscador
  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        opt.push(option.attributes.contact.trade_name)
        return opt
      })
      setOptions(opt)
    }
  }, [list])
  // función que se chama o elexir unha opción do buscador
  const handlePick = (e: any, v: any) => {
    let selected = list.findIndex((itm: any) => itm.attributes.contact.trade_name === v)
    setSelectedItemIndex(selected)
  }

  return (
    <>
      <Autocomplete
        freeSolo
        options={options}
        onChange={handlePick}
        renderInput={(params) => <TextField {...params} label="Search" margin="normal" variant="outlined" />}
      />
      <Card className={classes.root}>
        <List>
          {isLoading ? (
            <LinearProgress color="secondary" />
          ) : (
            list.map((item: any, idx: any) => (
              <Card key={item.id}>
                <ListItem
                  button
                  onClick={(e) => {
                    setSelectedItemIndex(idx)
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={'/media/svg/contact/icons/' + item.attributes.contact.id + '.svg'}
                      alt={item.attributes.contact.trade_name}
                      variant="square"
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`${item.attributes.contact.trade_name}`} />
                </ListItem>
              </Card>
            ))
          )}
        </List>
      </Card>
    </>
  )
}
