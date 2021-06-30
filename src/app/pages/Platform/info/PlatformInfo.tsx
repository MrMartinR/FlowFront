import { useEffect, useState } from 'react'
import { makeStyles, Chip, Grid, Card, CardHeader, CardContent, Typography, Container } from '@material-ui/core/'

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
  const [accounts, setAccounts] = useState(null as any)
  const [agreement, setAgreement] = useState(null as any)
  const [protection, setProtection] = useState(null as any)
  const [investment, setInvestment] = useState(null as any)
  const [cashflow, setCashflow] = useState(null as any)
  // actualizaciond e variables para os toggleButtons
  useEffect(() => {
    setAccounts(platformDetails?.data.attributes.account_category)
    setAgreement(platformDetails?.data.attributes.structure)
    setProtection(platformDetails?.data.attributes.protection_scheme)
    setInvestment(platformDetails?.data.attributes.invest_mode)
    setCashflow(platformDetails?.data.attributes.cashflow_options)
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
              <Typography>{platformDetails?.data.attributes.status}</Typography>
            </CardContent>
          </Card>

          {/* type */}
          <Card className={classes.card}>
            <CardHeader title="Type" />
            <CardContent>
              {platformDetails?.data.attributes.category &&
                platformDetails.data.attributes.category.map((item: string, idx: number) => (
                  <Chip label={item} key={idx} />
                ))}
            </CardContent>
          </Card>

          {/* details */}
          <Card className={classes.card}>
            <CardHeader title="Details" />
            <CardContent>
              <Typography>Term: {platformDetails?.data.attributes.term}</Typography>
              <Typography>AIR: </Typography>
              <Typography>Default: </Typography>
              <Typography>Loss: </Typography>
              <Typography>Liquidity: {platformDetails?.data.attributes.liquidity}</Typography>
            </CardContent>
          </Card>

          {/* company */}
          <Card className={classes.card}>
            <CardHeader title="Company" />
            <CardContent>
              <Typography>Profitable: {platformDetails?.data.attributes.profitable}</Typography>
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
              {accounts && accounts.map((item: string, idx: number) => <Chip label={item} key={idx} />)}
              {platformDetails?.included[0].relationships.country.data.id ===
                '61c2888b-8b6a-4536-830f-3a14e86a9cd5' && (
                <Typography>IFISA: {platformDetails?.data.attributes.ifisa ? 'Yes' : 'No'}</Typography>
              )}
            </CardContent>
          </Card>

          {/* agreement structure */}
          <Card className={classes.card}>
            <CardHeader title="Agreement Structure" />
            <CardContent>
              {agreement && agreement.map((item: string, idx: number) => <Chip label={item} key={idx} />)}
              <Typography>Taxes: {platformDetails?.data.attributes.taxes}</Typography>
            </CardContent>
          </Card>

          {/* protection scheme */}
          <Card className={classes.card}>
            <CardHeader title="Protection Scheme" />
            <CardContent>
              {protection && protection.map((item: string, idx: number) => <Chip label={item} key={idx} />)}
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
              {investment && investment.map((item: string, idx: number) => <Chip label={item} key={idx} />)}
              <Typography>Secondary Market: {platformDetails?.data.attributes.secondary_market}</Typography>
              <Typography>SM Notes: {platformDetails?.data.attributes.sm_notes}</Typography>
              <Typography>Cost: {platformDetails?.data.attributes.cost}</Typography>
              <Typography>Min. Investment: {platformDetails?.data.attributes.min_investment}</Typography>
              <Typography>Cashflow options:</Typography>
              {cashflow && cashflow.map((item: string, idx: number) => <Chip label={item} key={idx} />)}
            </CardContent>
          </Card>

          {/* promotions */}
          <Card className={classes.card}>
            <CardHeader title="Promotions" />
            <CardContent>
              <Typography>Welcome bonus: {platformDetails?.data.attributes.welcome_bonus}</Typography>
              <Typography>Promo: {platformDetails?.data.attributes.promo}</Typography>
              <Typography>Promo end: {platformDetails?.data.attributes.promo_end}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
