import React, { useEffect, useState } from 'react'
/* eslint-disable no-restricted-imports*/
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  CircularProgress,
  TextField
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import { Autocomplete } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 650,
    top: 20
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  }
}))

export const ContactsList = (props: any) => {
  const { setSelectedItemIndex, isLoading, list } = props
  const [options, setOptions] = useState([] as any)
  const classes = useStyles()
  const updateSelected = (value: any) => {
    setSelectedItemIndex(value)
  }

  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        if (option.kind === 'Company') {
          opt.push(option.trade_name)
        }
        if (option.kind === 'Individual') {
          opt.push(option.name)
        }
        return opt
      })
      setOptions(opt)
    }
  }, [list])

  const handlePick = (e: any, v: any) => {
    let selected = list.findIndex((itm: any) => itm.trade_name === v || itm.name === v)
    setSelectedItemIndex(selected)
  }

  return (
    <div style={{ width: '100%' }}>
      {isLoading ? (
        <p>loading ...</p>
      ) : (
        <div style={{ width: '80%' }}>
          <Autocomplete
            freeSolo
            options={options}
            onChange={handlePick}
            renderInput={(params) => <TextField {...params} label="Search" margin="normal" variant="outlined" />}
          />
        </div>
      )}

      <List className={classes.root} subheader={<li />}>
        <li key={`Contacts`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`Contacts `}</ListSubheader>
            {/* TODO: I applied the type any to fix the error TS7006 */}
            {isLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              list.map((item: any, idx: any) => (
                <ListItem
                  key={`${item.id}`}
                  button
                  onClick={(e) => {
                    updateSelected(idx)
                  }}
                >
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  {item.kind === 'Company' ? (
                    <ListItemText primary={`${item.trade_name}`} />
                  ) : (
                    <ListItemText primary={`${item.name}`} />
                  )}
                </ListItem>
              ))
            )}
          </ul>
        </li>
      </List>
    </div>
  )
}
