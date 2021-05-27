import React, { useMemo } from 'react'
import objectPath from 'object-path'
import { useHtmlClassService } from '../_core/MetronicLayout'
import { Grid } from '@material-ui/core'
import { HeaderWrapper } from './header/HeaderWrapper'

// TODO: adding type any to children
export const Layout = ({ children }: any) => {
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(
    () => ({
      layoutConfig: uiService.config,
      selfLayout: objectPath.get(uiService.config, 'self.layout'),
      desktopHeaderDisplay: objectPath.get(uiService.config, 'header.self.fixed.desktop'),
      contentCssClasses: uiService.getClasses('content', true),
      contentContainerClasses: uiService.getClasses('content_container', true),
      contentExtended: objectPath.get(uiService.config, 'content.extended'),
    }),
    [uiService]
  )

  return layoutProps.selfLayout !== 'blank' ? (
    <div className="wrapper">
      <Grid container direction="column">
        <Grid item>
          <HeaderWrapper />
        </Grid>

        <Grid item>{children}</Grid>
      </Grid>
    </div>
  ) : (
    // BLANK LAYOUT
    <div>{children}</div>
  )
}

export default Layout
