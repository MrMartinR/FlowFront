import { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export function CurrenciesLoadingDialog() {
  // Currencies Redux state
  const { isLoading } = useSelector((state) => ({ isLoading: state.currencies.listLoading }), shallowEqual)
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading])
  return ''
}
