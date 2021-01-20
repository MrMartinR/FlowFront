import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from '@material-ui/core/';
import { connect } from 'react-redux';

import { fetchPlatformDetails } from "./state/platformsActions";


const PlatformDetailsPage = (props: any) => {
    const { platformDetails, loading } = props.platforms
    const { match: { params } } = props

   const {
       account_category,
       cashflow_options,
       category,
       contact,
       contact_id,
       cost,
       id,
       ifisa,
       invest_mode,
       liquidity,
       min_investment,
       profitable,
       promo,
       promo_end,
       protection_scheme,
       secondary_market,
       sm_notes,
       status,
       structure,
       taxes,
       term,
       welcome_bonus
    } = platformDetails

    useEffect(() => {
        props.fetchPlatformDetails(params.id);
    }, [])


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
                            <Typography variant="h5" component="h3">
                                Contact: {contact.trade_name}
                            </Typography>
                            <Typography>
                                Contact id: {contact_id}
                            </Typography>
                            <Typography>
                                Cashflow options: {cashflow_options}
                            </Typography>
                            <Typography>
                                Promo: {promo}
                            </Typography>
                            <Typography>
                                Liquidity: {liquidity}
                            </Typography>
                            <Typography>
                                Min investment: {min_investment}
                            </Typography>
                            <Typography>
                                Profitable: {profitable}
                            </Typography>
                            <Typography>
                                Term: {term}
                            </Typography>
                            <Typography>
                                Cost: {cost}
                            </Typography>
                            <Typography>
                                Taxes: {taxes}
                            </Typography>
                            <Typography>
                                Protection scheme: {protection_scheme}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography>
                                Category: {category}
                            </Typography>
                            <Typography>
                                Account category: {account_category}
                            </Typography>
                            <Typography>
                                Sm notes: {sm_notes}
                            </Typography>
                            <Typography>
                                Secondary market: {secondary_market}
                            </Typography>
                            <Typography>
                                Invest mode: {invest_mode}
                            </Typography>
                            <Typography>
                                Promo end: {promo_end}
                            </Typography>
                            <Typography>
                                Ifisa: {ifisa}
                            </Typography>
                            <Typography>
                                Structure: {structure}
                            </Typography>
                            <Typography>
                                Status: {status}
                            </Typography>
                            <Typography>
                                Welcome bonus: {welcome_bonus}
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