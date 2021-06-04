import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { PlatformInfo } from './info/PlatformInfo'
import { PlatformOriginators } from './originators/PlatformOriginators'
import { PlatformLoans } from './loans/PlatformLoans'
import * as platformsActions from './state/platformsActions'
import { RootState } from '../../../redux/rootReducer'
import { PlatformDetailsToolbar } from './PlatformDetailsToolbar'
import { UserAlert } from '../../utils/UserAlert'

export const PlatformDetailsPage = (props: any) => {
  const { params } = props.match
  const [currentTab, setTab] = useState('')
  const [platformDetails, setPlatformDetails] = useState({} as any)
  const dispatch = useDispatch()
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.platforms,
    }),
    shallowEqual
  )
  // peticion dos details do platform
  useEffect(() => {
    dispatch(platformsActions.fetchPlatformDetails(params.id))
  }, [dispatch, params.id])
  // recibida resposta carganse os datos do state
  useEffect(() => {
    currentState.platformDetails && setPlatformDetails(currentState.platformDetails)
  }, [currentState.platformDetails])

  /* function that returns a switch statement of the details, contact, originators and loans tab */
  const renderSwitch = (param: any) => {
    switch (param) {
      case 'Info':
        return <PlatformInfo platformDetails={platformDetails} />
      case 'Originators':
        return <PlatformOriginators id={params.id} />
      case 'Loans':
        return <PlatformLoans id={params.id} />
      default:
        return <PlatformInfo platformDetails={platformDetails} />
    }
  }
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(platformsActions.resetSuccess())
  }
  return (
    <>
      <PlatformDetailsToolbar
        id={platformDetails.attributes?.contact?.id}
        trade_name={platformDetails.attributes?.contact?.trade_name}
        company_name={platformDetails.attributes?.contact?.company_name}
        setTab={setTab}
      />
      <UserAlert
        resetSuccess={resetSuccess}
        success={currentState.success}
        message={currentState.message}
        error={currentState.error}
      />
      {/* render a switch statement passing in the currentTab state as the key */}
      {renderSwitch(currentTab)}
    </>
  )
}
