import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from '@material-ui/core/';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ColDef } from '@material-ui/data-grid';
import { XGrid, LicenseInfo } from '@material-ui/x-grid';

import { fetchPlatformsList } from "./state/platformsActions";

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x',
  );

const columns: ColDef[] = [
  { field: 'contact', headerName: 'Contact trade name', width: 200 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'liquidity', headerName: 'Liquidity', width: 130 },
  { field: 'account_category', headerName: 'Account Category', width: 130 },
  { field: 'cashflow_options', headerName: 'Cashflow Options', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'cost', headerName: 'Cost', width: 130 },
  { field: 'ifisa', headerName: 'Ifisa', width: 130 },
  { field: 'invest_mode', headerName: 'Invest Mode', width: 130 },
  { field: 'min_investment', headerName: 'Min Investment', width: 130 },
  { field: 'profitable', headerName: 'Profitable', width: 130 },
  { field: 'promo', headerName: 'Promo', width: 130 },
  { field: 'promo_end', headerName: 'Promo End', width: 130 },
  { field: 'protection_scheme', headerName: 'Protection Scheme', width: 130 },
  { field: 'secondary_market', headerName: 'Secondary Market', width: 130 },
  { field: 'sm_notes', headerName: 'SM Notes', width: 130 },
  { field: 'structure', headerName: 'Structure', width: 130 },
  { field: 'taxes', headerName: 'Taxes', width: 130 },
  { field: 'term', headerName: 'Term', width: 130 },
  { field: 'welcome_bonus', headerName: 'Welcome Bonus', width: 130 },
];


const PlatformsList = (props: any) => {
  const { fetchPlatformsList } = props
  const { platformsTable = [], loading } = props.platforms
  const [data, setData] = React.useState([] as any)

  const processData = (arr: any) => {
    let data = [] as any
    arr.forEach((element: any) => {
      let dt = {} as any 
      dt["id"] = element.id 
      dt["contact_id"] = element.contact_id 
      dt["contact"] = element.contact.trade_name 
      dt["status"] = element.status
      dt["liquidity"] = element.liquidity
      dt["account_category"] = element.account_category
      dt["cashflow_options"] = element.cashflow_options
      dt["category"] = element.category
      dt["cost"] = element.cost
      dt["ifisa"] = element.ifisa
      dt["invest_mode"] = element.invest_mode
      dt["min_investment"] = element.min_investment
      dt["profitable"] = element.profitable
      dt["promo"] = element.promo
      dt["promo_end"] = element.promo_end
      dt["protection_scheme"] = element.protection_scheme
      dt["secondary_market"] = element.secondary_market
      dt["sm_notes"] = element.sm_notes
      dt["structure"] = element.structure
      dt["taxes"] = element.taxes
      dt["term"] = element.term
      dt["welcome_bonus"] = element.welcome_bonus
      data.push(dt)
    })
    return data
  }

  useEffect(() => {
    fetchPlatformsList();
  }, [fetchPlatformsList])

  useEffect(() => {
    setData(processData(platformsTable))
  }, [platformsTable])

  const linkTo = useHistory();
  const handleClick = (e: any) => linkTo.push(`/platforms/${e.row.id}`)

  if(loading) {
    return (
      <>
        <Typography variant="h5">
            Loading platforms...
        </Typography>
      </>
    )
  }
  return (
    <>
      <Typography variant="h3">
          Platform 
      </Typography>     
      <Grid container direction="column">
        <Card>
          <CardContent>
            <div style={{ height: 600, width: '100%' }}>
              <XGrid 
                rows={data} 
                columns={columns} 
                onRowClick={handleClick}
                disableMultipleSelection={true}
                loading={true}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    platforms: state.platforms
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPlatformsList: () => dispatch(fetchPlatformsList()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsList);









  


