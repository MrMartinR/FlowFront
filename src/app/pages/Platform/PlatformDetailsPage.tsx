import React, { useEffect } from 'react'
import { Typography, Grid, Toolbar, ButtonGroup, Button } from '@material-ui/core/'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { PlatformInfo } from './info/PlatformInfo'
import { PlatformOriginators } from './originators/PlatformOriginators'
import { PlatformLoans } from './loans/PlatformLoans'
import * as platformsActions from './state/platformsActions'
import { RootState } from '../../../redux/rootReducer'
import { PlatformDetailsToolbar } from './PlatformDetailsToolbar'

export const PlatformDetailsPage = (props: any) => {
  const { params } = props.match;
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.platforms,
    }),
    shallowEqual
  )
  const [currentTab, setTab] = React.useState('')
  const [platformDetails, setPlatformDetails] = React.useState({} as any);
  const GetPlatform = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(platformsActions.fetchPlatformDetails(params.id));
      } 
    }, [dispatch]);
  }
  GetPlatform();

  useEffect(() => {
    currentState.platformDetails &&
    setPlatformDetails(currentState.platformDetails);
  }, [currentState.platformDetails])

  /* onClick function that sets the state of the currentTab to be displayed */
  

  /* a function that returns a switch statement of the details, contact, originators and loans tab */
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
        id = { platformDetails.attributes?.contact?.id }
        trade_name = { platformDetails.attributes?.contact.trade_name }
        setTab = {setTab}
        />
      {/* render a switch statement passing in the currentTab state as the key */}
      {renderSwitch(currentTab)}
    </>
  )
}