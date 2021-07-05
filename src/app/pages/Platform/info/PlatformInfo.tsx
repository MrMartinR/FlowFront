import { useEffect, useState } from 'react'
import {
  makeStyles,
  Chip,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Container,
  InputLabel,
  Tooltip,
  IconButton,
} from '@material-ui/core/'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab/'
import IconInfo from '../../../../common/layout/components/icons/Info'

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
                  <Chip label={item} key={idx} size="small" style={{ margin: '4px' }} />
                ))}
            </CardContent>
          </Card>

          {/* details */}
          <Card className={classes.card}>
            <CardHeader title="Details" />
            <CardContent>
              <Grid container justify="space-between">
                <InputLabel>Term</InputLabel>
                <Typography>{platformDetails?.data.attributes.term || 'n/a'}</Typography>
              </Grid>
              <Grid container justify="space-between">
                <InputLabel>AIR</InputLabel>
                {/* TODO Missing data from the Backend */}
                <Typography>n/a</Typography>
              </Grid>
              <Grid container justify="space-between">
                <InputLabel>Default</InputLabel>
                {/* TODO Missing data from the Backend */}
                <Typography>n/a</Typography>
              </Grid>
              <Grid container justify="space-between">
                <InputLabel>Loss</InputLabel>
                {/* TODO Missing data from the Backend */}
                <Typography>n/a</Typography>
              </Grid>
              <Grid container justify="space-between">
                <InputLabel>Liquidity</InputLabel>
                <Typography>{platformDetails?.data.attributes.liquidity || 'n/a'}</Typography>
              </Grid>
            </CardContent>
          </Card>

          {/* company */}
          <Card className={classes.card}>
            <CardHeader title="Company" />
            <CardContent>
              <Grid container justify="space-between">
                <InputLabel>Profitable</InputLabel>
                <Typography>{platformDetails?.data.attributes.profitable || 'n/a'} </Typography>
              </Grid>
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
              <ToggleButtonGroup value={accounts}>
                <ToggleButton value="Personal">Personal</ToggleButton>
                <ToggleButton value="Corporate">Corporate</ToggleButton>
                <ToggleButton value="Accredited">Accredited</ToggleButton>
              </ToggleButtonGroup>
              {platformDetails?.included[0].relationships.country.data.id ===
                '61c2888b-8b6a-4536-830f-3a14e86a9cd5' && (
                <Grid container justify="space-between">
                  {/* TODO if the value is null/empty shows n/a */}
                  <InputLabel>IFISA</InputLabel>
                  <Typography>{platformDetails?.data.attributes.ifisa ? 'Yes' : 'No'}</Typography>
                </Grid>
              )}
            </CardContent>
          </Card>

          {/* agreement structure */}
          <Card className={classes.card}>
            <CardHeader title="Agreement Structure" />
            <CardContent>
              <ToggleButtonGroup value={agreement}>
                <ToggleButton value="Indirect">Indirect</ToggleButton>
                <ToggleButton value="Direct">Direct</ToggleButton>
                <ToggleButton value="Bilateral">Bilateral</ToggleButton>
              </ToggleButtonGroup>
              <Grid container justify="space-between">
                <InputLabel>Taxes</InputLabel>
                <Typography>{platformDetails?.data.attributes.taxes || 'n/a'} </Typography>
              </Grid>
            </CardContent>
          </Card>

          {/* protection scheme */}
          <Card className={classes.card}>
            <CardHeader title="Protection Scheme" />
            <CardContent>
              <ToggleButtonGroup value={protection}>
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
              <Grid container justify="space-between" alignItems="center">
                <InputLabel>Invest Mode</InputLabel>
                <ToggleButtonGroup value={investment}>
                  <ToggleButton value="Bid">Bid</ToggleButton>
                  <ToggleButton value="Manual">Manual</ToggleButton>
                  <ToggleButton value="Preset">Preset</ToggleButton>
                  <ToggleButton value="Auto">Auto</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid container alignItems="center">
                {/* <Grid container justify="space-between" alignItems="center"> */}
                <Grid xs={10}>
                  <InputLabel>Secondary Market</InputLabel>
                </Grid>
                {platformDetails?.data.attributes.sm_notes ? (
                  <>
                    <Grid xs={1}>
                      <Typography>{platformDetails?.data.attributes.secondary_market || 'n/a'} </Typography>
                    </Grid>
                    <Tooltip title={platformDetails?.data.attributes.sm_notes}>
                      <Grid xs={1}>
                        <IconButton disabled style={{ padding: '4px' }}>
                          <IconInfo />
                        </IconButton>
                      </Grid>
                    </Tooltip>
                  </>
                ) : (
                  <Grid xs={2}>
                    <Typography align="right">{platformDetails?.data.attributes.secondary_market || 'n/a'} </Typography>
                  </Grid>
                )}

                {/* <Typography>{platformDetails?.data.attributes.sm_notes}</Typography> */}
              </Grid>

              <Grid container justify="space-between">
                <InputLabel>Cost</InputLabel>
                <Typography>{platformDetails?.data.attributes.cost || 'n/a'} </Typography>
              </Grid>
              <Grid container justify="space-between">
                <InputLabel>Min. Investment</InputLabel>
                <Typography>{platformDetails?.data.attributes.min_investment || 'n/a'} </Typography>
              </Grid>
              <Grid container justify="space-between">
                <InputLabel>Cashflow Options</InputLabel>
                <Typography>
                  {(cashflow && cashflow.map((item: string, idx: number) => <Chip label={item} key={idx} />)) || 'n/a'}{' '}
                </Typography>
              </Grid>
            </CardContent>
          </Card>

          {/* promotions */}
          <Card className={classes.card}>
            <CardHeader title="Promotions" />
            <CardContent>
              <Grid container justify="space-between">
                <InputLabel>Welcome Bonus</InputLabel>
                <Typography>{platformDetails?.data.attributes.welcome_bonus || 'n/a'} </Typography>
              </Grid>
              <Grid container justify="space-between">
                <InputLabel>Promotion</InputLabel>
                <Typography>{platformDetails?.data.attributes.promo || 'n/a'} </Typography>
              </Grid>
              {platformDetails?.data.attributes.promo_end ? (
                <Grid container justify="space-between">
                  <InputLabel>Promotion Ends</InputLabel>
                  <Typography>{platformDetails?.data.attributes.promo_end}</Typography>
                </Grid>
              ) : (
                ''
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
