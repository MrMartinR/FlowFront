import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { CurrencyAlert } from './CurrencyAlert';
import { CurrencyDetailsToolbar } from './CurrencyDetailsToolbar';
import * as currenciesActions from './state/currenciesActions'
export const CurrencyDetails = (props: any) => {
    const { params } = props.match;
    const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.currencies,
    }),
    shallowEqual
    )
    const [currencyDetails, setCurrencyDetails] = useState({} as any);
    const GetCurrency = () => {
        let dispatch = useDispatch()
        useEffect(() => {
            if (dispatch) {
                dispatch(currenciesActions.fetchCurrency(params.id));
            } 
        }, [dispatch]);
    }
    GetCurrency();
    useEffect(() => {
        currentState.singleCurrency &&
        setCurrencyDetails(currentState.singleCurrency);
      }, [currentState.singleCurrency])
    return (
        <>
            <CurrencyDetailsToolbar 
                name = { currencyDetails.attributes?.name }
                symbol = { currencyDetails.attributes?.symbol }
            />
            <CurrencyAlert />
            <Grid container direction='row' justify= 'space-between'>
                <Grid item xs={3}>
                    <Card>
                        <CardHeader title="Code:"></CardHeader>
                        <CardContent>
                            <Typography>{currencyDetails.attributes?.code}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardHeader title="Kind:"></CardHeader>
                        <CardContent>
                            <Typography>{currencyDetails.attributes?.kind}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardHeader title="fx_eur"></CardHeader>
                        <CardContent>
                            <Typography>{currencyDetails.attributes?.fx_eur}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                    <Card>
                        <CardHeader title="Decimal Places"></CardHeader>
                        <CardContent>
                            <Typography>{currencyDetails.attributes?.decimal_places}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
        </>
    )
}
