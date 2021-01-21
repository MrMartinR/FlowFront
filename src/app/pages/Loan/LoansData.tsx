import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from '@material-ui/core/';
import { connect } from 'react-redux';
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid';

import { fetchLoansData } from "./state/loansActions";


LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x',
  );

const columns: ColDef[] = [
  // column definition format here
  { field: 'id', headerName: 'Id', width: 70 },
] as any;


const LoansData = (props: any) => {
  const { loansData = [], loading } = props.loans
  
  useEffect(() => {
    props.fetchLoansData();
  }, [])

  if(loading) {
    return (
      <>
        <Typography variant="h5">
            Loading loans...
        </Typography>
      </>
    )
  }

  return (
    <>
      <Typography variant="h3">
          Loans 
      </Typography> 
      <Grid container direction="column">
        <Card>
          <CardContent>
            <div style={{ height: 600, width: '100%' }}>
              <XGrid 
                rows={loansData} 
                columns={columns} 
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
    loans: state.loans
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchLoansData: () => dispatch(fetchLoansData())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoansData);









  


