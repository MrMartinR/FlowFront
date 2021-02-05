import React, { useEffect, useState } from 'react'
/* eslint-disable no-restricted-imports*/
import { LinearProgress, List, ListItem, ListItemText } from '@material-ui/core'

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
        return opt
      })
      setOptions(opt)
    }
  }, [list])

  const handlePick = (e: any, v: any) => {
    let selected = list.findIndex((itm: any) => itm.trade_name === v)
    setSelectedItemIndex(selected)
  }

  return (
    <>
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
              <ListItemText primary={`${item.trade_name}`} />
            </ListItem>
          ))
        )}
      </List>
    </>
  )
}
