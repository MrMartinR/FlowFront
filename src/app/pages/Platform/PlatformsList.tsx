import React, { useEffect } from "react";
import { Grid, Card, CardContent } from '@material-ui/core/';
import { connect } from 'react-redux';
import { ColDef } from '@material-ui/data-grid';
import { XGrid, LicenseInfo } from '@material-ui/x-grid';

import { fetchPlatformslist } from "../../../redux/platforms/actions";

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x',
  );

const columns: ColDef[] = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'contact_id', headerName: 'Contact Id', width: 70 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'liquidity', headerName: 'Liquidity', width: 130 },
  { field: 'account_category', headerName: 'Account Category', width: 130 },
  { field: 'cashflow_options', headerName: 'Cashflow Options', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'contact', headerName: 'Contact', width: 130 },
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
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'structure', headerName: 'Structure', width: 130 },
  { field: 'taxes', headerName: 'Taxes', width: 130 },
  { field: 'term', headerName: 'Term', width: 130 },
  { field: 'welcome_bonus', headerName: 'Welcome Bonus', width: 130 },
];

const PlatformsList = (props: any) => {
  const { platformTable = [], isFetching } = props.platforms

  useEffect(() => {
    props.fetchPlatformslist();
  }, [props])

  if(isFetching) {
    return (
      <div>
        <h1>Loading platforms...</h1>
      </div>
    )
  }
  // if(platformTable.length > 0) {
    
  // }
  return (
    <div className="">
      <Grid container direction="column">
        <Card>
          <CardContent>
            <h3>Platforms</h3>
            <div style={{ height: 600, width: '100%' }}>
              <XGrid rows={platformTable} columns={columns} checkboxSelection />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    platforms: state.platforms
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPlatformslist: () => dispatch(fetchPlatformslist())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsList);









  


