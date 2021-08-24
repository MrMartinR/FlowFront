import { Grid, Container, makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserAlert } from '../../utils/UserAlert'
import { LoansList } from './LoansList'
import { LoansListToolbar } from './LoansListToolbar'
import * as loansActions from './state/loansActions'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export const LoansPage = () => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.loans,
    }),
    shallowEqual
  )
  // peticion da lista de loans
  useEffect(() => {
    dispatch(loansActions.fetchLoansData())
  }, [dispatch])
  // recibida resposta carga os datos do state
  useEffect(() => {
    if (currentState.loansData) {
      setList(currentState.loansData)
    }
  }, [currentState.loansData])
  // con ese datos cubre as filas da tabla
  const rows = [] as any
  if (list.length > 0)
    list.map((loan: any) => {
      let xirr=null
      let air=null
      if (loan.attributes.xirr) xirr = loan.attributes.xirr.toFixed(2)
      if (loan.attributes.air) air = loan.attributes.air.toFixed(2)
      const newRow = {
        id: loan.id,
        name: loan.attributes.name,
        air: air,
        country: loan.attributes.country.iso_code,
        country_name: loan.attributes.country.name,
        currency: loan.attributes.currency.code,
        amortization: loan.attributes.amortization,
        amount: loan.attributes.amount,
        borrower: loan.attributes.borrower,
        borrower_type: loan.attributes.borrower_type,
        category: loan.attributes.category,
        code: loan.attributes.code,
        date_issued: loan.attributes.date_issued,
        date_listed: loan.attributes.date_listed,
        date_maturity: loan.attributes.date_maturity,
        description: loan.attributes.description,
        dti_rating: loan.attributes.dti_rating,
        gender: loan.attributes.gender,
        installment: loan.attributes.installment,
        internal_code: loan.attributes.internal_code,
        notes: loan.attributes.notes,
        originator: loan.attributes.originator.contact_id,
        platform: loan.attributes.platform.contact_id,
        protection_scheme: loan.attributes.protection_scheme,
        rating: loan.attributes.rating,
        security_details: loan.attributes.security_details,
        status: loan.attributes.status,
        xirr: xirr,
      }
      rows.push(newRow)
      return rows
    })
  // actualizanse os flags de loading cos datos do state
  useEffect(() => {
    setIsLoading(currentState.listLoading)
  }, [currentState.listLoading])
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(loansActions.resetSuccess())
  }
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <LoansListToolbar list={rows} />
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
        {/* table */}
        <Grid item xs={12}>
          <LoansList isLoading={isLoading} rows={rows} />
        </Grid>
      </Grid>
    </Container>
  )
}
