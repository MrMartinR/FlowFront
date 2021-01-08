/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import { Grid, ButtonGroup, Button } from '@material-ui/core'

export function HeaderMenu() {

  return (
<Grid container direction='row' xs={12} spacing={2}>
        {/* begin::Dashboard */}
        <ButtonGroup>
          <Button
           href="/dashboard">
             Dashboard
          </Button>

        {/* begin::Contacts */}
        <Button 
          href="/contacts">
            Contacts
          </Button>


        {/* begin::UserAccounts */}
        <Button
          href="/user_accounts">
            Accounts
          </Button>


        {/* begin::Lending */}
        <Button
          href="/lending">
            Lending
          </Button>

          </ButtonGroup>
    </Grid>

  )
}

export default HeaderMenu
