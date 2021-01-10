import React from "react"
import { Grid, Card, CardHeader, CardContent, Toolbar, InputBase } from '@material-ui/core'

import LoansData from './LoansDataTable'

export const LoansPage = () => {


  return (
        <Grid 
          container 
          direction="column"
         >
          <Card>
            <Toolbar variant="dense">
              <InputBase placeholder="Search…" />
            </Toolbar>
          </Card>
          
          <Card>
            <CardHeader title="Loans" />
            <CardContent>
              <LoansData />
            </CardContent>
          </Card>

         </Grid>
    );

}
