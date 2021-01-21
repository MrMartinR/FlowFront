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
  useEffect(() => {
    props.fetchPlatformsList();
  }, [])
  
  const { platformsTable = [], loading } = props.platforms
  
  
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
                rows={platformsTable} 
                columns={columns} 
                onRowClick={handleClick}
                disableMultipleSelection={true}
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









  


