import React, { useEffect } from "react";
import { Grid, Card, CardContent } from '@material-ui/core/';
import { connect } from 'react-redux';

import { fetchPlatformDetails } from "./state/platformsActions";


const PlatformDetailsPage = (props: any) => {
    const { platformDetails, loading } = props.platforms
    const { match: { params } } = props

    useEffect(() => {
        props.fetchPlatformDetails(params.id);
    }, [])


    if(loading) {
        return (
          <>
            <h1>Loading platform details...</h1>
          </>
        )
    }
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchPlatformDetails: (platformId: any) => dispatch(fetchPlatformDetails(platformId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailsPage)