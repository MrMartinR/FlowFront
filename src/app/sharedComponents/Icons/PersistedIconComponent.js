import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import * as actions from '../../../redux/icons/iconsActions'
import SvgDisplayComponent from './SvgDisplayComponent'

export const PersistedIconComponent = ({ category, uid, width, height }) => {
  const dispatch = useDispatch()

  const [hasRequested, setHasRequested] = useState(false)
  const [svgData, setSvgData] = useState(null)

  const { iconsState } = useSelector((state) => ({ iconsState: state.icons }), shallowEqual)

  useEffect(() => {
    if (iconsState[uid] && !svgData) {
      setSvgData(iconsState[uid].logo)
    }
    if (!iconsState[uid] && !hasRequested) {
      setHasRequested(true)
      dispatch(actions.updateIcon({ uid, category }))
    }
  }, [iconsState, svgData, category, uid, hasRequested, dispatch])

  return (
    <>{svgData && svgData !== '' ? <SvgDisplayComponent width={width} height={height} svgData={svgData} /> : <></>}</>
  )
}

export default PersistedIconComponent