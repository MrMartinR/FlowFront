import React from 'react';
import { Grid, Card, CardContent } from '@material-ui/core/';
import { connect } from 'react-redux';


const PlatformDetails = () => {
    return (
        <>
            <Grid container direction="column">
                <Card>
                <CardContent>
                    <h3>Platform details</h3>
                </CardContent>
                </Card>
            </Grid>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        platforms: state.platforms
    }
}


export default connect(mapStateToProps)(PlatformDetails)