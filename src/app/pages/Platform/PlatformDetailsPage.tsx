import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from '@material-ui/core/';
import { connect } from 'react-redux';

import { fetchPlatformDetails } from "./state/platformsActions";


const PlatformDetailsPage = (props: any) => {
    const { match: { params } } = props
    useEffect(() => {
        props.fetchPlatformDetails(params.id);
    }, [])

    const { platformDetails, loading } = props.platforms
   

    if(loading) {
        return (
          <>
            <Typography variant="h5">
                Loading platform details...
            </Typography>
          </>
        )
    }
    return (
        <>
            <Typography variant="h3">
                Platform details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography>
                                Platform id: {platformDetails.id}
                            </Typography>
                            <Typography variant="h5" component="h3">
                                Contact: 
                            </Typography>
                            <Typography>
                                Contact id: {platformDetails.contact_id}
                            </Typography>
                            <Typography>
                                Cashflow options: {platformDetails.cashflow_options}
                            </Typography>
                            <Typography>
                                Promo: {platformDetails.promo}
                            </Typography>
                            <Typography>
                                Liquidity: {platformDetails.liquidity}
                            </Typography>
                            <Typography>
                                Min investment: {platformDetails.min_investment}
                            </Typography>
                            <Typography>
                                Profitable: {platformDetails.profitable}
                            </Typography>
                            <Typography>
                                Term: {platformDetails.term}
                            </Typography>
                            <Typography>
                                Cost: {platformDetails.cost}
                            </Typography>
                            <Typography>
                                Taxes: {platformDetails.taxes}
                            </Typography>
                            <Typography>
                                Protection scheme: {platformDetails.protection_scheme}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography>
                                Category: {platformDetails.category}
                            </Typography>
                            <Typography>
                                Account category: {platformDetails.account_category}
                            </Typography>
                            <Typography>
                                Sm notes: {platformDetails.sm_notes}
                            </Typography>
                            <Typography>
                                Secondary market: {platformDetails.secondary_market}
                            </Typography>
                            <Typography>
                                Invest mode: {platformDetails.invest_mode}
                            </Typography>
                            <Typography>
                                Promo end: {platformDetails.promo_end}
                            </Typography>
                            <Typography>
                                Ifisa: {platformDetails.ifisa}
                            </Typography>
                            <Typography>
                                Structure: {platformDetails.structure}
                            </Typography>
                            <Typography>
                                Status: {platformDetails.status}
                            </Typography>
                            <Typography>
                                Welcome bonus: {platformDetails.welcome_bonus}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
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