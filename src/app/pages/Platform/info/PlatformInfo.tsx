import { Grid, Card, CardContent, Typography, CardHeader, ButtonGroup, Button } from '@material-ui/core/'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useState } from 'react';

export const PlatformInfo = (props: any) => {
  const { platformDetails } = props
  const [accounts, setAccounts] = useState(() => []);
  const [agreement, setAgreement] = useState(() => []);
  const [protection, setProtection] = useState(() => []);
  const [investment, setInvestment] = useState(() => []);
  const handleAccounts = (event: React.MouseEvent<HTMLElement>, newAccounts:[]) => {
    setAccounts(newAccounts);
    console.log(accounts);
  };
  const handleAgreement = (event: React.MouseEvent<HTMLElement>, newAgreement:[]) => {
    setAgreement(newAgreement);
    console.log(agreement);
  };
  const handleProtection = (event: React.MouseEvent<HTMLElement>, newProtection:[]) => {
    setProtection(newProtection);
    console.log(protection);
  };
  const handleInvestment = (event: React.MouseEvent<HTMLElement>, newInvestment:[]) => {
    setInvestment(newInvestment);
    console.log(investment);
  };
  return (
    <>
      <Grid container direction="row" justify="space-between" spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid container direction="column" item xs={3}>
          <Card>
            <CardHeader title="Status"></CardHeader>
            <CardContent>
              <Typography>{platformDetails.attributes?.status}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Type"> </CardHeader>
            <CardContent>
              <Typography>{platformDetails.attributes?.category}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Details"> </CardHeader>
            <CardContent>
              <Typography>Term: {platformDetails.attributes?.term}</Typography>
              <Typography>AIR: </Typography>
              <Typography>Default: </Typography>
              <Typography>Loss: </Typography>
              <Typography>Liquidity: {platformDetails.attributes?.liquidity}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Company"> </CardHeader>
            <CardContent>
              <Typography>Profitable: {platformDetails.attributes?.profitable}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid container direction="column" item xs={4}>
          <Card>
            <CardHeader title="Accounts"> </CardHeader>
            <CardContent>
              <ToggleButtonGroup value={accounts} onChange={handleAccounts}>
                {platformDetails.attributes?.account_category}
                <ToggleButton value='Personal'>Personal</ToggleButton>
                <ToggleButton value='Corporate'>Corporate</ToggleButton>
                <ToggleButton value='Accredited'>Accredited</ToggleButton>
              </ToggleButtonGroup>
              <Typography>IFISA: {platformDetails.attributes?.ifisa}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Agreement Structure"> </CardHeader>
            <CardContent>
              <ToggleButtonGroup value={agreement} onChange={handleAgreement}>
                {platformDetails.attributes?.structure}
                <ToggleButton value='Indirect'>Indirect</ToggleButton>
                <ToggleButton value='Direct'>Direct</ToggleButton>
                <ToggleButton value='Bilateral'>Bilateral</ToggleButton>
              </ToggleButtonGroup>
              <Typography>Taxes: {platformDetails.attributes?.taxes}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Protection Scheme"> </CardHeader>
            <CardContent>
              <ToggleButtonGroup value={protection} onChange={handleProtection}>
                {platformDetails.attributes?.protection_scheme}
                <ToggleButton value='Buyback'>BuyBack</ToggleButton>
                <ToggleButton value='Provision Fund'>Provision Fund</ToggleButton>
                <ToggleButton value='Personal'>Personal</ToggleButton>
                <ToggleButton value='Collateral'>Collateral</ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Card>
        </Grid>

        <Grid container direction="column" item xs={3}>
          <Card>
            <CardHeader title="Investment Details"> </CardHeader>
            <CardContent>
              <Typography>Invest Mode: </Typography>
              <ToggleButtonGroup value={investment} onChange={handleInvestment}>
                {platformDetails.attributes?.invest_mode}
                <ToggleButton value='Bid'>Bid</ToggleButton>
                <ToggleButton value='Manual'>Manual</ToggleButton>
                <ToggleButton value='Preset'>Preset</ToggleButton>
                <ToggleButton value='Auto'>Auto</ToggleButton>
              </ToggleButtonGroup>
              <Typography>Secondary Market: {platformDetails.attributes?.secondary_market}</Typography>
              <Typography>SM Notes: {platformDetails.attributes?.sm_notes}</Typography>
              <Typography>Cost: {platformDetails.attributes?.cost}</Typography>
              <Typography>Min. Investment: {platformDetails.attributes?.min_investment}</Typography>
              <Typography>Cashflow options: {platformDetails.attributes?.cashflow_options}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Promotions"> </CardHeader>
            <CardContent>
              <Typography>Welcome bonus: {platformDetails.attributes?.welcome_bonus}</Typography>
              <Typography>Promo: {platformDetails.attributes?.promo}</Typography>
              <Typography>Promo end: {platformDetails.attributes?.promo_end}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  )
}
