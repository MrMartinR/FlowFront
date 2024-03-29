import { Grid, ButtonGroup, Button } from '@material-ui/core'

export const HeaderMenu = () => {
  return (
    <Grid container direction="row" spacing={2}>
      {/* begin::Dashboard */}
      <ButtonGroup>
        {/* begin::Contacts */}
        <Button href="/contacts">Contacts</Button>

        {/* begin::UserAccounts */}
        <Button href="/user_accounts">Accounts</Button>

        {/* begin::Lending */}
        <Button href="/lending">Lending</Button>
      </ButtonGroup>
    </Grid>
  )
}
