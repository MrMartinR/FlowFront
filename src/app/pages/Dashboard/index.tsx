import React from 'react'
import { Grid, Card, CardHeader, CardContent, Button, ButtonGroup } from "@material-ui/core"
import Kanban from "./Kanban/Kanban"

function DashboardPage() {
  
  return (
    <Grid container spacing={2}>

    {/* begin::navigation */} 
      <Grid item>
        <Card>
          {/* begin::header */} 
        <CardHeader title='Dashboard' />
        <CardContent>
          {/* begin::buttonbar */}
            <ButtonGroup orientation="vertical" >
              <Button
                href="/accounts">
                  Accounts(Admin)
              </Button>
            <Button 
              href="/countries">
                Countries(Admin)
              </Button>
            <Button
              href="/currencies">
                Currencies(Admin)
              </Button>
            <Button
              href="/lending">
                Lending
            </Button>
            <Button
              href="/platforms">
                Platforms
            </Button>
            <Button
              href="/originators">
                Originators
            </Button>
            <Button
              href="/loans">
                Loans
            </Button>
            <Button
              href="/property">
                Property
            </Button>
            <Button
              href="/settings">
                Settings
            </Button>
          </ButtonGroup> 

          </CardContent>
      </Card>
      </Grid>
 

      {/* begin::kanban*/}
      <Grid item xs={10}>
       <Kanban />
        {/* end::kanban*/}
      </Grid>

    </Grid>
  )
}

export default DashboardPage
