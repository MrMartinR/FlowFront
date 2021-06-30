import {
  Container,
  Grid,
  Card,
  Chip,
  CardHeader,
  CardContent,
  Dialog,
  DialogContent,
  Button,
  Typography,
  InputLabel,
  LinearProgress,
} from '@material-ui/core/'
import { useEffect, useState } from 'react'
import IconOption from '../../../../common/layout/components/icons/Option'
import { BorrowerEdit } from './BorrowerEdit'
import { DescriptionEdit } from './DescriptionEdit'
import { DetailsEdit } from './DetailsEdit'
import { NotesEdit } from './NotesEdit'
import { SecurityEdit } from './SecurityEdit'

const milisecToText = (milisecs: number) => {
  const days = Math.floor(milisecs / 86400000)
  const months = Math.floor(days / 30)
  const daysr = days % 30
  const years = Math.floor(months / 12)
  const monthsr = months % 12
  return `${years} year/s, ${monthsr} month/s and ${daysr} day/s`
}
export const LoanDetails = (props: any) => {
  const { loanDetails } = props
  const [security, setSecurity] = useState([])
  const [date, setDate] = useState(null as any)
  const [issued, setIssued] = useState(null as any)
  const [progress, setProgress] = useState(null as any)
  const [maturity, setMaturity] = useState(null as any)
  const [remaining, setRemaining] = useState(null as any)
  const [term, setTerm] = useState(null as any)
  const [remainingText, setRemainingText] = useState(null as any)
  const [termText, setTermText] = useState(null as any)
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState('')

  // carga os datos do togglebutton
  useEffect(() => {
    setSecurity(loanDetails.attributes.protection_scheme)
  }, [loanDetails])

  useEffect(() => {
    setDate(new Date().getTime())
    if (loanDetails.attributes.date_maturity) {
      setMaturity(new Date(loanDetails.attributes.date_maturity).getTime())
    } else setMaturity(null)
    if (loanDetails.attributes.date_issued) {
      setIssued(new Date(loanDetails.attributes.date_issued).getTime())
    } else setIssued(null)
  }, [loanDetails])
  const numberCurrencyFormat = (value: any) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: `${loanDetails.attributes.currency.code}`,
    }).format(value)

  useEffect(() => {
    if (maturity && date) {
      setRemaining(maturity - date)
    }
    if (maturity && issued) {
      setTerm(maturity - issued)
    }
  }, [maturity, issued, date])
  useEffect(() => {
    if (remaining) {
      if (remaining > 0) {
        setRemainingText(milisecToText(remaining))
      } else setRemainingText('0 days')
    }
    if (term) {
      setTermText(milisecToText(term))
    }
    if (remaining & term) {
      if (remaining > 0) {
        setProgress(100 * (1 - remaining / term))
      } else setProgress(100)
    }
  }, [remaining, term])

  const handleOpen = (e: any, value: any) => {
    setEdit(value)
    setOpen(true)
  }
  /* handle the edit/delete closing dialog */
  const handleClose = () => {
    setOpen(false)
  }

  // corpo do dialog de edit
  const body =
    edit === 'borrower' ? (
      <BorrowerEdit loanDetails={loanDetails} handleClose={handleClose} />
    ) : edit === 'description' ? (
      <DescriptionEdit loanDetails={loanDetails} handleClose={handleClose} />
    ) : edit === 'notes' ? (
      <NotesEdit loanDetails={loanDetails} handleClose={handleClose} />
    ) : edit === 'details' ? (
      <DetailsEdit loanDetails={loanDetails} handleClose={handleClose} />
    ) : edit === 'security' &&
      <SecurityEdit loanDetails={loanDetails} handleClose={handleClose} />
    

  return (
    <Container>
      {/* edit loan dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{body}</DialogContent>
      </Dialog>
      <Grid container spacing={2}>
        {/* block 1 */}
        <Grid container direction="column" item xs={6} spacing={2}>
          {/* borrower */}
          <Grid item>
            <Card>
              <CardHeader
                title="Borrower"
                action={
                  <Button onClick={(e) => handleOpen(e, 'borrower')} color="primary">
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                <Typography variant="h6"> {loanDetails.attributes.borrower}</Typography>

                {/* Type */}
                <Grid container justify="space-between">
                  <InputLabel>Type</InputLabel>
                  <Typography>{loanDetails.attributes.borrower_type}</Typography>
                </Grid>

                {/* Category */}
                <Grid container justify="space-between">
                  <InputLabel>Category</InputLabel>
                  <Typography>{loanDetails.attributes.category}</Typography>
                </Grid>

                {/* DTI */}
                {/* Only show if Borrower = Consumer */}
                {loanDetails.attributes?.borrower_type === 'Consumer' && (
                  <Grid container justify="space-between">
                    <InputLabel>DTI</InputLabel>
                    <Typography>{loanDetails.attributes.dti_rating}</Typography>
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
                  <Button onClick={(e) => handleOpen(e, 'description')} color="primary">
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                <Typography>Description: {loanDetails.attributes.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* notes */}
          <Grid item>
            <Card>
              <CardHeader
                title="Notes"
                action={
                  <Button onClick={(e) => handleOpen(e, 'notes')} color="primary">
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                <Typography>{loanDetails.attributes.notes}</Typography>
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
                  <Button onClick={(e) => handleOpen(e, 'details')} color="primary">
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                {/* Amortization */}
                <Grid container justify="space-between">
                  <InputLabel>Amortization</InputLabel>
                  <Typography>{loanDetails.attributes.amortization}</Typography>
                </Grid>
                {/* Installment */}
                <Grid container justify="space-between">
                  <InputLabel>Installment</InputLabel>
                  <Typography>{loanDetails.attributes.installment}</Typography>
                </Grid>
                {/* AIR */}
                <Grid container justify="space-between">
                  <InputLabel>AIR</InputLabel>
                  <Typography>{loanDetails.attributes.air && (loanDetails.attributes.air * 100).toFixed(2)}</Typography>
                </Grid>
                {/* XIRR */}
                <Grid container justify="space-between">
                  <InputLabel>XIRR</InputLabel>

                  {(loanDetails.attributes.xirr && (
                    <Typography>{(loanDetails.attributes.xirr * 100).toFixed(2)}</Typography>
                  )) || <Typography color="primary">n/a</Typography>}
                </Grid>
                {/* Amount */}
                <Grid container justify="space-between">
                  <InputLabel>Amount</InputLabel>
                  <Typography>
                    {loanDetails.attributes.amount && numberCurrencyFormat(loanDetails.attributes.amount.toFixed(2))}
                  </Typography>
                </Grid>
                {/* Term */}
                <Grid container justify="space-between">
                  <InputLabel>Term</InputLabel>
                  <Typography>{termText}</Typography>
                </Grid>

                {/* Remaining */}
                <Grid container justify="space-between">
                  <InputLabel>Remaining</InputLabel>

                  <Typography>{remainingText}</Typography>
                </Grid>
                <LinearProgress variant="determinate" value={progress} />
                {/* Listed */}
                {loanDetails.attributes.date_listed && (
                  <Grid container justify="space-between">
                    <InputLabel>Listed</InputLabel>
                    <Typography>{loanDetails.attributes.date_listed}</Typography>
                  </Grid>
                )}
                {/* Issued */}
                {loanDetails.attributes.date_issued && (
                  <Grid container justify="space-between">
                    <InputLabel>Issued</InputLabel>
                    <Typography>{loanDetails.attributes.date_issued}</Typography>
                  </Grid>
                )}
                {/* Maturity */}
                {loanDetails.attributes.date_maturity && (
                  <Grid container justify="space-between">
                    <InputLabel>Maturity</InputLabel>
                    {(loanDetails.attributes.date_maturity && (
                      <Typography>{loanDetails.attributes.date_maturity}</Typography>
                    )) || <Typography color="primary">n/a</Typography>}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* security */}
          <Grid item>
            <Card>
              <CardHeader
                title="Security"
                action={
                  <Button onClick={(e) => handleOpen(e, 'security')} color="primary">
                    <IconOption />
                  </Button>
                }
              />
              <CardContent>
                {security && security.map((item: string, idx: number) => <Chip label={item} key={idx} />)}
                <Typography>{loanDetails.attributes.security_details}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
