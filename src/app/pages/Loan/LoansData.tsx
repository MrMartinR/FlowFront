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
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'air', headerName: 'Air', width: 180 },
  { field: 'amortization', headerName: 'Amortization', width: 180 },
  { field: 'amount', headerName: 'Amount', width: 180 },
  { field: 'borrower', headerName: 'Borrower', width: 180 },
  { field: 'borrower_type', headerName: 'Borrower type', width: 180 },
  { field: 'category', headerName: 'Category', width: 180 },
  { field: 'code', headerName: 'Code', width: 180 },
  { field: 'country', headerName: 'Country', width: 180 },
  { field: 'currency', headerName: 'Currency', width: 180 },
  { field: 'date_issued', headerName: 'Date issued', width: 180 },
  { field: 'date_listed', headerName: 'Date listed', width: 180 },
  { field: 'date_maturity', headerName: 'Maturity date', width: 180 },
  { field: 'description', headerName: 'Description', width: 180 },
  { field: 'dti_rating', headerName: 'Dti rating', width: 180 },
  { field: 'gender', headerName: 'Gender', width: 180 },
  { field: 'installment', headerName: 'Installment', width: 180 },
  { field: 'internal_code', headerName: 'Internal code', width: 180 },
  { field: 'notes', headerName: 'Notes', width: 180 },
  { field: 'originator', headerName: 'Originator', width: 180 },
  { field: 'platform', headerName: 'Platform', width: 180 },
  { field: 'protection_scheme', headerName: 'Protection scheme', width: 180 },
  { field: 'rating', headerName: 'Rating', width: 180 },
  { field: 'security_details', headerName: 'Security details', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
  { field: 'xirr', headerName: 'Xirr', width: 180 },
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









  


