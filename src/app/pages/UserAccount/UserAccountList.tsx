import React, { useEffect, useState } from 'react'
import {
  Card,
  TextField,
  List,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
export const UserAccountsList = (props: any) => {
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
              <Card key={item.id} style={{ backgroundColor: '#676767' }}>
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
