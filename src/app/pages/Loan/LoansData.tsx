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
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'air', headerName: 'Air', width: 180 },
  { field: 'country', headerName: 'Country', width: 180 },
  { field: 'currency', headerName: 'Currency', width: 180 },
  { field: 'amortization', headerName: 'Amortization', width: 180 },
  { field: 'amount', headerName: 'Amount', width: 180 },
  { field: 'borrower', headerName: 'Borrower', width: 180 },
  { field: 'borrower_type', headerName: 'Borrower type', width: 180 },
  { field: 'category', headerName: 'Category', width: 180 },
  { field: 'code', headerName: 'Code', width: 180 },
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
  const { fetchLoansData } = props
  const { loansData = [], loading } = props.loans
  const [data, setData] = React.useState([] as any)

  const processData = (arr: any) => {
    let data = [] as any
    arr.forEach((element: any) => {
      let dt = {} as any
      dt["id"] = element.id
      dt["name"] = element.name
      dt["air"] = element.air
      dt["country"] = element.country.name
      dt["currency"] = element.currency.name
      dt["amortization"] = element.amortization
      dt["amount"] = element.amount
      dt["borrower"] = element.borrower
      dt["borrower_type"] = element.borrower_type
      dt["category"] = element.category
      dt["code"] = element.code
      dt["date_issued"] = element.date_issued
      dt["date_listed"] = element.date_listed
      dt["date_maturity"] = element.date_maturity
      dt["description"] = element.description
      dt["dti_rating"] = element.dti_rating
      dt["gender"] = element.gender
      dt["installment"] = element.installment
      dt["internal_code"] = element.internal_code
      dt["notes"] = element.notes
      dt["originator"] = element.originator
      dt["platform"] = element.platform
      dt["protection_scheme"] = element.protection_scheme
      dt["rating"] = element.rating
      dt["security_details"] = element.security_details
      dt["status"] = element.status
      dt["xirr"] = element.xirr
      data.push(dt)
    })
    return data
  }
  
  useEffect(() => {
    fetchLoansData();
  }, [fetchLoansData])

  useEffect(() => {
    setData(processData(loansData))
  }, [loansData])

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
                rows={data} 
                columns={columns} 
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
    loans: state.loans
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchLoansData: () => dispatch(fetchLoansData())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoansData);









  


