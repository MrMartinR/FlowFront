import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as CurrenciesActions from './state/currenciesActions'
import CurrencyToolbar from './CurrencyToolbar'
import CurrencyList from './CurrencyList'
import { Grid } from '@material-ui/core'

export const Currencies = () => {
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.currencies,
    }),
    shallowEqual
  )

  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)

  let selectedContact = {}

  if (list && list[selectedItemIndex]) {
    selectedContact = list[selectedItemIndex]
  }
  // currencies Redux state
  const GetAllCurrencies = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(CurrenciesActions.getAllCurrencies())
      }
    }, [dispatch])
  }
  GetAllCurrencies()

  useEffect(() => {
    if (
      currentState &&
      currentState.currenciesTable &&
      currentState.currenciesTable.success &&
      currentState.currenciesTable.entities
    ) {
      setList(currentState.currenciesTable.entities)
      setIsLoading(currentState.listLoading)
    }
  }, [currentState])

  return (
    <>
      <CurrencyToolbar />
      <Grid>
        <Grid key={1} md={4} item>
          <CurrencyList isLoading={isLoading} list={list} setSelectedItemIndex={setSelectedItemIndex} />
        </Grid>
      </Grid>
    </>
  )
}
