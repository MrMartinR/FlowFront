import { Avatar, Grid, Toolbar, Typography } from "@material-ui/core";

export const CountryDetailsToolbar = (props: any) => {
    const { name, iso_code } = props;

    return (
        <Toolbar>
            <Grid container direction="row">
                <Grid item xs={2}>
                    <strong>
                        <Avatar variant="square"><img src={'/media/svg/flags/'+iso_code+'.svg'} alt="" /></Avatar>
                    </strong>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h4">{name}</Typography>
                </Grid>
            </Grid>
        </Toolbar>
    )
}
