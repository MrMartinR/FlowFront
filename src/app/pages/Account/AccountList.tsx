import React, { useEffect, useState } from 'react'
import { LinearProgress, List, ListItem, ListItemText } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as accountsActions from './state/accountsActions'

export const AccountsList = (props: any) => {
  // const { currentState } = useSelector(
  //   (state: RootState) => ({
  //     currentState: state.accounts,
  //   }),
  //   shallowEqual
  // )

  // const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  // const [list, setList] = useState([] as any)
  // const [isLoading, setIsLoading] = useState(true)

  // let selectedAccount = {}

  // if (list && list[selectedItemIndex]) {
  //   selectedAccount = list[selectedItemIndex]
  // }
  // // account Redux state
  // const GetAllAccounts = () => {
  //   let dispatch = useDispatch()
  //   useEffect(() => {
  //     if (dispatch) {
  //       dispatch(accountsActions.fetchAccounts())
  //     }
  //   }, [dispatch])
  // }
  // GetAllAccounts()

  // useEffect(() => {
  //   if (
  //     currentState &&
  //     currentState.accountsTable &&
  //     currentState.accountsTable.success &&
  //     currentState.accountsTable.entities
  //   ) {
  //     setList(currentState.accountsTable.entities)
  //     setIsLoading(currentState.listLoading)
  //   }
  // }, [currentState])

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
              {/* // <ListItemText primary={`${item.trade_name}`} /> */}
              <ListItemText primary={`${item.id}`} />
            </ListItem>
          ))
        )}
      </List>
    </>
  )
}
