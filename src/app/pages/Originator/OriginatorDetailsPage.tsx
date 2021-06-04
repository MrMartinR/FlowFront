import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserAlert } from '../../utils/UserAlert'
import { OriginatorDetailsToolbar } from '../Originator/OriginatorDetailsToolbar'
import { OriginatorInfo } from './OriginatorInfo'
import { OriginatorLoans } from './OriginatorLoans'
import * as originatorsActions from './state/originatorsActions'
export const OriginatorDetailsPage = (props: any) => {
  const { params } = props.match
  const dispatch = useDispatch()
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.originators,
    }),
    shallowEqual
  )
  const [currentTab, setTab] = useState('')
  const [originatorDetails, setOriginatorDetails] = useState({} as any)
  // peticion dos details dun originator
  useEffect(() => {
    if (dispatch) {
      dispatch(originatorsActions.fetchOriginatorDetails(params.id))
    }
  }, [dispatch, params])
  // recibida resposta actualiza cos datos do state
  useEffect(() => {
    currentState.originatorDetails && setOriginatorDetails(currentState.originatorDetails)
  }, [currentState.originatorDetails])

  /* a function that returns a switch statement of the details, contact, originators and loans tab */
  const renderSwitch = (param: any) => {
    switch (param) {
      case 'Info':
        return <OriginatorInfo originatorDetails={originatorDetails} />
      case 'Loans':
        return <OriginatorLoans id={params.id} />
      default:
        return <OriginatorInfo originatorDetails={originatorDetails} />
    }
  }
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(originatorsActions.resetSuccess())
  }
  return (
    <>
      <OriginatorDetailsToolbar
        id={originatorDetails.attributes?.contact?.id}
        trade_name={originatorDetails.attributes?.contact?.trade_name}
        company_name={originatorDetails.attributes?.contact?.company_name}
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
