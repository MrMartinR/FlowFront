import { Grid, makeStyles, Container } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as originatorsActions from './state/originatorsActions'
import { OriginatorsList } from './OriginatorsList'
import { OriginatorsListToolbar } from './OriginatorsListToolbar'
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
export const OriginatorsPage = () => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.originators,
    }),
    shallowEqual
  )
  const GetAllOriginators = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(originatorsActions.fetchOriginatorsList())
      }
    }, [dispatch])
  }
  GetAllOriginators()
  useEffect(() => {
    if (currentState.originatorsTable) {
      setList(currentState.originatorsTable)
    }
  }, [currentState.originatorsTable])

  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])

  const rows = [] as any
  if (list.length > 1)
    list.map((originator: any) => {
      const newRow = {
        id: originator.id,
        contact_id: originator.attributes.contact?.id,
        trade_name: originator.attributes.contact?.trade_name,
        customer_category: originator.attributes.customer_category,
        product_category_business: originator.attributes.product_category_business,
        product_category_consumer: originator.attributes.product_category_consumer,
        apr: originator.attributes.apr,
      }
      rows.push(newRow)
      return rows
    })
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <OriginatorsListToolbar list={rows} />
        <UserAlert />
        {/* table */}
        <Grid item xs={12}>
          <OriginatorsList isLoading={isLoading} rows={rows} />
        </Grid>
      </Grid>
    </Container>
  )
}
