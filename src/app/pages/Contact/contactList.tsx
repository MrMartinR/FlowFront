import React, { useEffect, useState } from 'react'
/* eslint-disable no-restricted-imports*/
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core'
/**
 * @rev this Autocomplete thing... the final result will be search/filter-as-you-type
 * the list of contacts will be the one to shrink to accomodate the search terms.
 * More Lab!!
 */
import { Autocomplete } from '@material-ui/lab'

export const ContactsList = (props: any) => {
  const { setSelectedItemIndex, isLoading, list } = props
  const [options, setOptions] = useState([] as any)
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
    let selected = list.findIndex(
      (itm: any) => itm.trade_name === v || itm.name === v
    )
    setSelectedItemIndex(selected)
  }

  return (
    <>
      {isLoading ? (
        <Typography>loading ...</Typography>
      ) : (
        <>
          <Autocomplete
            freeSolo
            options={options}
            onChange={handlePick}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search'
                margin='normal'
                variant='outlined'
              />
            )}
          />
        </>
      )}

      <List>
        {isLoading ? (
          <CircularProgress color='secondary' />
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
