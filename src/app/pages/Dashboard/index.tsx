import { Grid, Card, CardHeader, CardContent, Button, ButtonGroup } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import Kanban1 from './Kanban/Kanban1'
// import Kanban2 from './Kanban/Kanban2'
export const DashboardPage = () => {
  const [role, setRole] = useState('')
  const { authState } = useSelector(
    (state: RootState) => ({
      authState: state.auth,
    }),
    shallowEqual
  )
  useEffect(() => {
    setRole(authState.role)
  }, [authState.role]) 
  return (
    <Grid container spacing={1}>
      {/* begin::navigation */}
      <Grid item>
        <Card>
          {/* begin::header */}
          <CardHeader title="Dashboard" />
          <CardContent>
            {/* begin::buttonbar */}
            <ButtonGroup orientation="vertical">
              {role==='admin'&&<Button href="/accounts">Accounts(Admin)</Button>}
              <Button href="/countries">Countries(Admin)</Button>
              <Button href="/currencies">Currencies(Admin)</Button>
              <Button href="/lending">Lending</Button>
              <Button href="/platforms">Platforms</Button>
              <Button href="/originators">Originators</Button>
              <Button href="/loans">Loans</Button>
              <Button href="/property">Property</Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={9}>
        <Kanban1 />
      </Grid>
    </Grid>
  )
}
