import { useEffect, useState } from 'react'
import { makeStyles, Grid, Card, CardHeader, CardContent, Typography, Container } from '@material-ui/core/'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'

/* styles */
const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 0,
  },
  card: {
    minWidth: '100%',
    margin: 6,
  },
})

export const PlatformInfo = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { platformDetails } = props
  const [accounts, setAccounts] = useState()
  const [agreement, setAgreement] = useState()
  const [protection, setProtection] = useState()
  const [investment, setInvestment] = useState()
  const [cashflow, setCashflow] = useState()
  // actualizaciond e variables para os toggleButtons
  useEffect(() => {
    setAccounts(platformDetails.attributes?.account_category)
    setAgreement(platformDetails.attributes?.structure)
    setProtection(platformDetails.attributes?.protection_scheme)
    setInvestment(platformDetails.attributes?.invest_mode)
    setCashflow(platformDetails.attributes?.cashflow_options)
  }, [platformDetails])
  return (
    <Container>
      <Grid container justify="space-between">
        <Grid item xs={3} container direction="column">
          {/*
           * Block 1
           * */}
          {/* status */}
          <Card className={classes.card}>
            <CardHeader title="Status" />
            <CardContent>
              <Typography>{platformDetails.attributes?.status}</Typography>
            </CardContent>
          </Card>

          {/* type */}
          <Card className={classes.card}>
            <CardHeader title="Type" />
            <CardContent>
              <Typography>{platformDetails.attributes?.category}</Typography>
            </CardContent>
          </Card>

          {/* details */}
          <Card className={classes.card}>
            <CardHeader title="Details" />
            <CardContent>
              <Typography>Term: {platformDetails.attributes?.term}</Typography>
              <Typography>AIR: </Typography>
              <Typography>Default: </Typography>
              <Typography>Loss: </Typography>
              <Typography>Liquidity: {platformDetails.attributes?.liquidity}</Typography>
            </CardContent>
          </Card>

          {/* company */}
          <Card className={classes.card}>
            <CardHeader title="Company" />
            <CardContent>
              <Typography>Profitable: {platformDetails.attributes?.profitable}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/*
         * Block 2
         * */}

        <Grid item xs={4} container direction="column">
          {/* accounts */}
          <Card className={classes.card}>
            <CardHeader title="Accounts" />
            <CardContent>
              <ToggleButtonGroup value={accounts} size="small">
                <ToggleButton value="Personal">Personal</ToggleButton>
                <ToggleButton value="Corporate">Corporate</ToggleButton>
                <ToggleButton value="Accredited">Accredited</ToggleButton>
              </ToggleButtonGroup>
              {/* @TODO: only show IFISA on platforms from the UK */}
              <Typography>IFISA: {platformDetails.attributes?.ifisa}</Typography>
            </CardContent>
          </Card>

          {/* agreement structure */}
          <Card className={classes.card}>
            <CardHeader title="Agreement Structure" />
            <CardContent>
              <ToggleButtonGroup value={agreement} size="small">
                <ToggleButton value="Indirect">Indirect</ToggleButton>
                <ToggleButton value="Direct">Direct</ToggleButton>
                <ToggleButton value="Bilateral">Bilateral</ToggleButton>
              </ToggleButtonGroup>
              <Typography>Taxes: {platformDetails.attributes?.taxes}</Typography>
            </CardContent>
          </Card>

          {/* protection scheme */}
          <Card className={classes.card}>
            <CardHeader title="Protection Scheme" />
            <CardContent>
              <ToggleButtonGroup value={protection} size="small">
                <ToggleButton value="Buyback">BuyBack</ToggleButton>
                <ToggleButton value="Provision Fund">Provision Fund</ToggleButton>
                <ToggleButton value="Personal">Personal</ToggleButton>
                <ToggleButton value="Collateral">Collateral</ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Card>
        </Grid>

        {/*
         * Block 3
         * */}

        <Grid container direction="column" item xs={4}>
          {/* investment details */}
          <Card className={classes.card}>
            <CardHeader title="Investment Details"> </CardHeader>
            <CardContent>
              <Typography>Invest Mode: </Typography>
              <ToggleButtonGroup value={investment} size="small">
                <ToggleButton value="Bid">Bid</ToggleButton>
                <ToggleButton value="Manual">Manual</ToggleButton>
                <ToggleButton value="Preset">Preset</ToggleButton>
                <ToggleButton value="Auto">Auto</ToggleButton>
              </ToggleButtonGroup>
              <Typography>Secondary Market: {platformDetails.attributes?.secondary_market}</Typography>
              <Typography>SM Notes: {platformDetails.attributes?.sm_notes}</Typography>
              <Typography>Cost: {platformDetails.attributes?.cost}</Typography>
              <Typography>Min. Investment: {platformDetails.attributes?.min_investment}</Typography>
              <Typography>Cashflow options:</Typography>
              <ToggleButtonGroup value={cashflow} size="small">
                <ToggleButton value="Bank Transfer">Bank Transfer</ToggleButton>
                <ToggleButton value="Revolut">Revolut</ToggleButton>
                <ToggleButton value="Debit Card">Debit Card</ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Card>

          {/* promotions */}
          <Card className={classes.card}>
            <CardHeader title="Promotions" />
            <CardContent>
              <Typography>Welcome bonus: {platformDetails.attributes?.welcome_bonus}</Typography>
              <Typography>Promo: {platformDetails.attributes?.promo}</Typography>
              <Typography>Promo end: {platformDetails.attributes?.promo_end}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
