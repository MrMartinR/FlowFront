import React, { useEffect, useState } from 'react'
/* eslint-disable no-restricted-imports*/
import {
  Card,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
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
      <Autocomplete
        freeSolo
        options={options}
        onChange={handlePick}
        renderInput={(params) => <TextField {...params} label="Search" margin="normal" variant="outlined" />}
      />

      <Card>
        <List>
          {isLoading ? (
            <LinearProgress color="secondary" />
          ) : (
            list.map((item: any, idx: any) => (
              <Card key = { item.id }>
                <ListItem
                  button
                  onClick={(e) => {
                    setSelectedItemIndex(idx)
                  }}
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded"></Avatar>
                  </ListItemAvatar>

                  <ListItemText primary={`${item.attributes.name}`} />
                </ListItem>
              </Card>
            ))
          )}
        </List>
      </Card>
    </>
  )
}
