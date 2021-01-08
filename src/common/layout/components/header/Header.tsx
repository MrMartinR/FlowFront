import React, { useMemo } from 'react'
import { useHtmlClassService } from '../../_core/MetronicLayout'
import HeaderMenuWrapper from './HeaderWrapper'
import { Grid } from '@material-ui/core'

// [TODO] get rid of the metronic stuff

function Header() {
  const uiService = useHtmlClassService()

  const layoutProps = useMemo(
    () => ({
      headerClasses: uiService.getClasses('header', true),
    }),
    [uiService],
  )

  return (
    <Grid container xs={12} direction='row'>

      {/* begin::Header */}
      <div
        className={`header ${layoutProps.headerClasses}`}
      >
        {/* begin::Container */}
          <HeaderMenuWrapper />
        </div>

      {/* end::Header */}
    </Grid>
  )
}

export default Header
