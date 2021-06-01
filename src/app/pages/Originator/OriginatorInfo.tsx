import { Card, CardContent, CardHeader, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useEffect, useState } from 'react'
/* styles */
const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: 0,
    },
    card: {
      minWidth: '100%',
      margin: 6,
    },
  })
export const OriginatorInfo = (props: any) => {
    /* styles */
  const classes = useStyles()
    const { originatorDetails } = props
    const [consumer, setConsumer] = useState();
    const [category, setCategory] = useState();
    const [business, setBusiness] = useState();
    useEffect(() => {
        setCategory(originatorDetails.attributes?.customer_category);
        setConsumer(originatorDetails.attributes?.product_category_consumer);
        setBusiness(originatorDetails.attributes?.product_category_business);
      }, [originatorDetails])
    return (
        <Container>
            <Grid container direction="column" justify="space-between" spacing={2}> 
                <Grid container direction="column" item>
                    <Card className={classes.card}>
                        <CardHeader title="Customer Category:"> </CardHeader>
                        <CardContent>
                        <ToggleButtonGroup value={category}>
                            {originatorDetails.attributes?.customer_category}
                            <ToggleButton value='Business'>Business</ToggleButton>
                            <ToggleButton value='Consumer'>Consumer</ToggleButton>
                        </ToggleButtonGroup>
                        </CardContent>
                    </Card>     
                </Grid>
                <Grid container direction="column" item>
                    <Card className={classes.card}>
                        <CardHeader title="Product Category Consumer:"> </CardHeader>
                        <CardContent>
                        <ToggleButtonGroup value={business}>
                            {originatorDetails.attributes?.product_category_business}
                            <ToggleButton value='Agricultural'>Agricultural</ToggleButton>
                            <ToggleButton value='Invoice Trading'>Invoice Trading</ToggleButton>
                            <ToggleButton value='Debt Consolidation'>Debt Consolidation</ToggleButton>
                            <ToggleButton value='Pawnbroking'>Pawnbroking</ToggleButton>
                            <ToggleButton value='Mortgage'>Mortgage</ToggleButton>
                            <ToggleButton value='Real Estate'>Real Estate</ToggleButton>
                            <ToggleButton value='Growth'>Growth</ToggleButton>
                            <ToggleButton value='Working Capital'>Working Capital</ToggleButton>
                            <ToggleButton value='Bridge'>Bridge</ToggleButton>
                        </ToggleButtonGroup>
                        </CardContent>
                    </Card>    
                </Grid>
                <Grid container direction="column" item>
                    <Card className={classes.card}>
                        <CardHeader title="Product Category Business:"> </CardHeader>
                        <CardContent>
                        <ToggleButtonGroup value={consumer}>
                            {originatorDetails.attributes?.product_category_consumer}
                            <ToggleButton value='Personal'>Personal</ToggleButton>
                            <ToggleButton value='Debt Consolidation'>Debt Consolidation</ToggleButton>
                            <ToggleButton value='Short Term'>Short Term</ToggleButton>
                            <ToggleButton value='Vehicle'>Vehicle</ToggleButton>
                            <ToggleButton value='Pawnbroking'>Pawnbroking</ToggleButton>
                            <ToggleButton value='Mortgage'>Mortgage</ToggleButton>
                            <ToggleButton value='Bridge'>Bridge</ToggleButton>
                        </ToggleButtonGroup>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container direction="column" item>
                    <Card className={classes.card}>
                        <CardHeader title="APR:"></CardHeader>
                        <CardContent>
                            <Typography>{originatorDetails.attributes?.apr}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
        </Grid>
        </Container>
    )
}
