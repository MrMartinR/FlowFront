import React, { useEffect, useState } from 'react'
/* eslint-disable no-restricted-imports*/
import { LinearProgress, List, ListItem, ListItemText, TextField } from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'

export const AccountsList = (props: any) => {
  const { setSelectedItemIndex, isLoading, list } = props
  const [options, setOptions] = useState([] as any)
  const updateSelected = (value: any) => {
    setSelectedItemIndex(value)
  }

  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        opt.push(option.name)
        // if (option.kind === 'Company') {
        //   opt.push(option.trade_name)
        // }
        // if (option.kind === 'Individual') {
        //   opt.push(option.name)
        // }
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
    <>
      <Autocomplete
        freeSolo
        options={options}
        onChange={handlePick}
        renderInput={(params) => <TextField {...params} label="Search" margin="normal" variant="outlined" />}
      />

      <List>
        {isLoading ? (
          <LinearProgress color="secondary" />
        ) : (
          list.map((item: any, idx: any) => (
            <ListItem
              key={`${item.id}`}
              button
              onClick={(e) => {
                updateSelected(idx)
              }}
            >
              {item.kind === 'Company' ? (
                <ListItemText primary={`${item.trade_name}`} />
              ) : (
                <ListItemText primary={`${item.name}`} />
              )}
            </ListItem>
          ))
        )}
      </List>
    </>
  )
}
