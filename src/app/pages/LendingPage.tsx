import React from "react"
import { Grid, Card, CardHeader, CardContent, Button } from '@material-ui/core'
import { ReactComponent as PlatformIcon } from '../../common/media/svg/icons/platform.svg';
import { ReactComponent as LendingIcon } from '../../common/media/svg/icons/lending.svg';
import { ReactComponent as OriginatorIcon } from '../../common/media/svg/icons/originator.svg';


export const LendingPage = () => {

  return (

    <Grid 
    container alignItems="center" 
    spacing={2} 
    justify="space-evenly" 
    alignContent="center"
    >
      <Grid item xs={2} style={{textAlign: "center"}}>
        <Card>
          <CardHeader title="Platforms" />
          <CardContent>
          <PlatformIcon />
            <Button
              variant="outlined"
              href="/platforms"
            >
            Platforms
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={2} style={{textAlign: "center"}}>
        <Card>
          <CardHeader title="Originators" />
          <CardContent>
          <OriginatorIcon />
            <Button 
              variant="outlined" 
              href="/originators"
            >
            Originators
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={2} style={{textAlign: "center"}}>
        <Card>
          <CardHeader title="Loans" />
          <CardContent>
          <LendingIcon />
            <Button 
              variant="outlined" 
              href="/loans"
            >
            Loans
            </Button>
          </CardContent>
        </Card>
      </Grid>


    </Grid>
  );
}
  






  

export default LendingPage