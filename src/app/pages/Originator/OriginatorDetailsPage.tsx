import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { OriginatorDetailsToolbar } from '../Originator/OriginatorDetailsToolbar'
import { OriginatorInfo } from './OriginatorInfo';
import { OriginatorLoans } from './OriginatorLoans';
import { OriginatorsAlert } from './OriginatorsAlert';
import * as originatorsActions from './state/originatorsActions'
export const OriginatorDetailsPage = (props: any) => {
  const { params } = props.match;
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.originators,
    }),
    shallowEqual
  )
  const [currentTab, setTab] = useState('')
  const [originatorDetails, setOriginatorDetails] = useState({} as any);
  const GetOriginator = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(originatorsActions.fetchOriginatorDetails(params.id));
      } 
    }, [dispatch]);
  }
  GetOriginator();
  useEffect(() => {
    currentState.originatorDetails &&
    setOriginatorDetails(currentState.originatorDetails);
  }, [currentState.originatorDetails])

  /* onClick function that sets the state of the currentTab to be displayed */
  

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
  return (
    <>
      <OriginatorDetailsToolbar 
        id = { originatorDetails.attributes?.contact?.id }
        trade_name = { originatorDetails.attributes?.contact?.trade_name }
        company_name = { originatorDetails.attributes?.contact?.company_name }
        setTab = {setTab}
      />
      <OriginatorsAlert />
      {/* render a switch statement passing in the currentTab state as the key */}
      {renderSwitch(currentTab)}
    </>
  )
}
