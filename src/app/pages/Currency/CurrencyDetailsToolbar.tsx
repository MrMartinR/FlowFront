import { Grid, Toolbar, Typography } from "@material-ui/core";

export const CurrencyDetailsToolbar = (props: any) => {
    const { name, symbol } = props;

    return (
        <Toolbar>
            <Grid container direction="row">
                <Grid item xs={2}>
                <Typography variant="h4">{symbol}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h4">{name}</Typography>
                </Grid>
            </Grid>
        </Toolbar>
    )
}
