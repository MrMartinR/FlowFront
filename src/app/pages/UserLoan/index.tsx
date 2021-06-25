import { Grid, Container, makeStyles } from '@material-ui/core'
import { UserLoansList } from './UserLoansList'
import * as userLoansActions from './state/userLoansActions'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserLoansListToolbar } from './UserLoansListToolbar'
import { UserAlert } from '../../utils/UserAlert'
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
export const UserLoansPage = () => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userLoans,
    }),
    shallowEqual
  )
  const dispatch = useDispatch()
  // peticion da lista de userLoans
  useEffect(() => {
    dispatch(userLoansActions.fetchUserLoansData())
  }, [dispatch])
  // recibida resposta cargase os datos do state
  useEffect(() => {
    if (currentState.userLoansData) {
      setList(currentState.userLoansData)
    }
  }, [currentState.userLoansData])
  // cos datos do state preparanse as filas da tabla
  const rows = [] as any
  if (list.length > 1)
    list.map((loan: any) => {
      let xirr=null
      let air=null
      if (loan.attributes.xirr) xirr = loan.attributes.xirr.toFixed(2)
      if (loan.attributes.loan?.air) air = loan.attributes.loan?.air.toFixed(2)
      const newRow = {
        id: loan.id, // este campo seguramente deberiase gardar pero non mostrar na tabla
        name: loan.attributes.loan?.name,
        air: air,
        country: loan.attributes.loan?.country, // deberia traer o iso_code do country para poder mostrar a bandeira ou quitar o campo
        country_name: loan.attributes.loan?.country_id || '', // deberia traer o name do country para mostrar na tabla ou quitar o campo
        currency: loan.attributes.loan?.currency_id || '', // deberia traer o name ou o code do currency para mostrar na tabla ou quitar o campo
        amortization: loan.attributes.loan?.amortization || '',
        amount: loan.attributes.loan?.amount || '',
        borrower: loan.attributes.loan?.borrower || '',
        borrower_type: loan.attributes.loan?.borrower_type || '',
        category: loan.attributes.loan?.category || '',
        code: loan.attributes.loan?.code || '',
        date_issued: loan.attributes.loan?.date_issued || '',
        date_listed: loan.attributes.loan?.date_listed || '',
        date_maturity: loan.attributes.loan?.date_maturity || '',
        description: loan.attributes.loan?.description || '',
        dti_rating: loan.attributes.loan?.dti_rating || '',
        gender: loan.attributes.loan?.gender || '',
        installment: loan.attributes.loan?.installment || '',
        internal_code: loan.attributes.loan?.internal_code || '',
        notes: loan.attributes.loan?.notes || '',
        position: loan.attributes.position || '',
        investment_amount: loan.attributes.investment_amount,
        date_in: loan.attributes.date_in,
        date_out: loan.attributes.date_out,
        loan_id: loan.attributes.loan?.id || '', // este campo seguramente non se deberia mostra na tabla, xa ten o name
        invest_mode: loan.attributes.invest_mode,
        originator: loan.attributes.loan?.platform_originator_id || '', // check this??
        platform: loan.attributes.loan?.platform_originator_id || '', // isto e temporal, estes campos xa estaban definidos. Ou se quitan ou se mete na resposta o contact_id do platform e do origiinator para poñer o logo
        protection_scheme: loan.attributes.loan?.protection_scheme || '',
        rating: loan.attributes.loan?.rating || '',
        security_details: loan.attributes.loan?.security_details || '',
        status: loan.attributes.loan?.status || '',
        xirr: xirr,
        market: loan.attributes.market,
      }
      rows.push(newRow)
      return rows
    })
  // actualizanse os flags de loading cos datos do state
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(userLoansActions.resetSuccess())
  }
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <UserLoansListToolbar list={rows} />
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
        {/* table */}
        <Grid item xs={12}>
          <UserLoansList isLoading={isLoading} rows={rows} />
        </Grid>
      </Grid>
    </Container>
  )
}
