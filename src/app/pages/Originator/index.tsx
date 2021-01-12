import React from "react"
import { Grid, Card, CardHeader, CardContent, Toolbar, InputBase } from '@material-ui/core'

import OriginatorsData from './OriginatorsDataTable'

export const OriginatorsPage = () => {


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
            <CardHeader title="Originators" />
            <CardContent>
              <OriginatorsData />
            </CardContent>
          </Card>

         </Grid>
    );

}
