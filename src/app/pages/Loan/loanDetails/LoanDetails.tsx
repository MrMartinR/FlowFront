import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  InputLabel,
  makeStyles,
  LinearProgress,
} from '@material-ui/core/'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import IconOption from '../../../../common/layout/components/icons/Option'

// @TODO: intentei meterlle o marginRight auto para q alinee a esqueda o seguinte bloque desde o ThemeProvider,
// pero InputLabel non soporta ese comando... asi q llo metin aqui.. non sei si hay forma de aplicalo a todos os
// InputLabels da view esta... en CSS soname que se pode aplicar cousas a todos os elementos, digo por
// que me parece algo raro ter q enchufarlle className={classes.inputLabel} a todos os ImputLabels... pero bueno..

/* styles */
const useStyles = makeStyles({
  inputLabel: {
    marginRight: 'auto',
  },
})

export const LoanDetails = (props: any) => {
  const { loanDetails } = props
  const [security, setSecurity] = useState([])

  /* styles */
  const classes = useStyles()
  // carga os datos do togglebutton
  useEffect(() => {
    setSecurity(loanDetails.attributes?.protection_scheme)
  }, [loanDetails])

  // @TODO: Creo que cando se carga a paxina ainda non hay valores no loanDetails.attributes?.currency.code
  //  e dame error RangeError: Invalid currency code : undefined...
  // si a view esta cargada si que funciona...

  const numberCurrencyFormat = (value: any) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      // currency: `${loanDetails.attributes?.currency_code}`,
      // currency: `${loanDetails.attributes?.currency.code}`,
    }).format(value)

  return (
    <Container>
      <Grid container spacing={2}>
        {/* block 1 */}
        <Grid container direction="column" item xs={6} spacing={2}>
          {/* borrower */}
          <Grid item>
            <Card>
              <CardHeader
                title="Borrower"
                action={
                  <Button>
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                <Typography variant="h6"> {loanDetails.attributes?.borrower}</Typography>

                {/* Type */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>Type</InputLabel>
                  <Typography>{loanDetails.attributes?.borrower_type}</Typography>
                </Grid>

                {/* Category */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>Category</InputLabel>
                  <Typography>{loanDetails.attributes?.category}</Typography>
                </Grid>

                {/* DTI */}
                {/* Only show if Borrower = Consumer */}
                {loanDetails.attributes?.borrower_type === 'Consumer' && (
                  <Grid container alignItems="center">
                    <InputLabel className={classes.inputLabel}>DTI</InputLabel>
                    <Typography>{loanDetails.attributes?.dti_rating}</Typography>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
          {/* description */}
          <Grid item>
            <Card>
              <CardHeader
                title="Description"
                action={
                  <Button>
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                <Typography>Description: {loanDetails.attributes?.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* notes */}
          <Grid item>
            <Card>
              <CardHeader
                title="Notes"
                action={
                  <Button>
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                <Typography>{loanDetails.attributes?.notes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* block 2 */}
        <Grid container direction="column" item xs={6} spacing={2}>
          {/* details */}
          <Grid item>
            <Card>
              <CardHeader
                title="Details"
                action={
                  <Button>
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                {/* Amortization */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>Amortization</InputLabel>
                  <Typography>{loanDetails.attributes?.amortization}</Typography>
                </Grid>
                {/* Installment */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>Installment</InputLabel>
                  <Typography>{loanDetails.attributes?.installment}</Typography>
                </Grid>
                {/* AIR */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>AIR</InputLabel>
                  <Typography>
                    {loanDetails.attributes?.air && (loanDetails.attributes.air * 100).toFixed(2)}
                  </Typography>
                </Grid>
                {/* XIRR */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>XIRR</InputLabel>

                  {(loanDetails.attributes?.xirr && (
                    <Typography> (loanDetails.attributes.xirr * 100).toFixed(2)) </Typography>
                  )) || <Typography color="primary">n/a</Typography>}
                </Grid>
                {/* Amount */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>Amount</InputLabel>
                  <Typography>
                    {numberCurrencyFormat(loanDetails.attributes?.amount.toFixed(2))}
                    {/* {loanDetails.attributes?.currency.symbol} {loanDetails.attributes?.amount.toFixed(2)} */}
                  </Typography>
                </Grid>
                {/* Term */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>Term</InputLabel>
                  <Typography>[Calculation]</Typography>
                </Grid>

                {/* Remaining */}
                {/* Derivar estes calculos a o backend?? De todas formas o asunto do formateo de fechas vai
                     ser asunto do frontend, non queria usar unha dependencia para esto...  */}
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <InputLabel className={classes.inputLabel}>Remaining</InputLabel>
                  </Grid>
                  <Grid item xs={7}>
                    {/* @TODO: Calcular el % de progreso desde la fecha de Issued a fecha de Maturity */}
                    <LinearProgress variant="determinate" value={80} />
                  </Grid>
                  <Grid item xs={2}>
                    {/* @TODO: calcular el tiempo restante entre Fecha Actual y Maturity y mostrarlo como: x years, y months and z days
                     * y reemplazar ese 3000000, asumo q hay q pasar la fecha maturity a formato numerico */}

                    <Typography>
                      {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }).format(Date.now() - 300000000)}
                      {/* {loanDetails.attributes?.date_maturity} */}
                      {/* {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      }).format(Date.now())} */}
                      {/* {Date.now().toLocaleString('en-GB')} */}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Listed */}
                {/* Renders the Listed date if exists */}
                {/* @TODO: Misma historia pasar a fecha a numero e formateala */}
                {loanDetails.attributes?.date_listed && (
                  <Grid container alignItems="center">
                    <InputLabel className={classes.inputLabel}>Listed</InputLabel>
                    <Typography>{loanDetails.attributes?.date_listed}</Typography>
                  </Grid>
                )}
                {/* Issued */}
                {/* @TODO: Misma historia pasar a fecha a numero e formateala */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>Issued</InputLabel>
                  <Typography>{loanDetails.attributes?.date_issued}</Typography>
                </Grid>

                {/* Maturity */}
                {/* @TODO: Misma historia pasar a fecha a numero e formateala */}
                <Grid container alignItems="center">
                  <InputLabel className={classes.inputLabel}>Maturity</InputLabel>
                  {(loanDetails.attributes?.date_maturity && (
                    <Typography>{loanDetails.attributes?.date_maturity}</Typography>
                  )) || <Typography color="primary">n/a</Typography>}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* security */}
          <Grid item>
            <Card>
              <CardHeader
                title="Security"
                action={
                  <Button>
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                <ToggleButtonGroup value={security} size="small">
                  <ToggleButton value="BuyBack">BuyBack</ToggleButton>
                  <ToggleButton value="Personal Guarantee">Personal Guarantee</ToggleButton>
                  <ToggleButton value="Collateral">Collateral</ToggleButton>
                  <ToggleButton value="Provision Fund">Provision Fund</ToggleButton>
                </ToggleButtonGroup>
                <Typography>{loanDetails.attributes?.security_details}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
