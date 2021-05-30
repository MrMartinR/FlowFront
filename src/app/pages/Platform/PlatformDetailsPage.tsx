import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { PlatformInfo } from './info/PlatformInfo'
import { PlatformOriginators } from './originators/PlatformOriginators'
import { PlatformLoans } from './loans/PlatformLoans'
import * as platformsActions from './state/platformsActions'
import { RootState } from '../../../redux/rootReducer'
import { PlatformDetailsToolbar } from './PlatformDetailsToolbar'
import { PlatformAlert } from './PlatformAlert'

export const PlatformDetailsPage = (props: any) => {
  const { params } = props.match
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.platforms,
    }),
    shallowEqual
  )
  const [currentTab, setTab] = useState('')
  const [platformDetails, setPlatformDetails] = useState({} as any)
  const GetPlatform = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(platformsActions.fetchPlatformDetails(params.id))
      }
    }, [dispatch])
  }
  GetPlatform()

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

  return (
    <>
      <PlatformDetailsToolbar
        id={platformDetails.attributes?.contact?.id}
        trade_name={platformDetails.attributes?.contact?.trade_name}
        company_name={platformDetails.attributes?.contact?.company_name}
        setTab={setTab}
      />

      <PlatformAlert />
      {/* render a switch statement passing in the currentTab state as the key */}
      {renderSwitch(currentTab)}
    </>
  )
}
