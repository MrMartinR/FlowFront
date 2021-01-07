import React from 'react'
import { useSubheader } from '../../common/layout'

const PropertyPage = () => {
  const suhbeader = useSubheader()
  suhbeader.setTitle('Property')

  return <>Property Page</>
}

export default PropertyPage
