import { Grid, makeStyles } from '@material-ui/core'
import { HeaderWrapper } from './header/HeaderWrapper'
import React, { useMemo } from 'react'
import objectPath from 'object-path'
import { useHtmlClassService } from '../_core/MetronicLayout'

/* styles */
const useStyles = makeStyles({
  root: {
    width: '99%',
  },
})
export const Layout = ({ children }: any) => {
  /* styles */
  const classes = useStyles()
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
      <Grid container direction="column" className={classes.root} >
        <HeaderWrapper />
      </Grid>

      <Grid item>{children}</Grid>
    </div>
    ) : (
      // BLANK LAYOUT
      <div>{children}</div>
  )
}
