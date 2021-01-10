import React from "react"
import { Grid, Card, CardHeader, CardContent, Toolbar, InputBase } from '@material-ui/core'

// import PlatformsList from './PlatformsList'

export const PlatformsPage = () => {


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
            <CardHeader title="Platforms List" />
          <CardContent>
            Table Grid X
          {/* <PlatformsList /> */}
          </CardContent>
          </Card>

         </Grid>
    );

}
