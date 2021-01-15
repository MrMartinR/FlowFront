import React, { useEffect } from "react";
import { Grid, Card, CardContent } from '@material-ui/core/';
import { connect } from 'react-redux';
import { ColDef } from '@material-ui/data-grid';
import { XGrid, LicenseInfo } from '@material-ui/x-grid';

import { fetchOriginators } from "../../../redux/originators/actions";

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x',
  );

const columns: ColDef[] = [
  // column definition format here
  { field: 'id', headerName: 'Id', width: 70 },
];

const OriginatorsTab = (props: any) => {
  const { originators = [], isFetching, update } = props.originators

  useEffect(() => {
    props.fetchOriginators();
  }, [update])

  if(isFetching) {
    return (
      <div>
        <h1>Loading originators...</h1>
      </div>
    )
  }

  return (
    <div className="">
      <Grid container direction="column">
        <Card>
          <CardContent>
            <h3>Originators</h3>
            <div style={{ height: 600, width: '100%' }}>
              <XGrid rows={originators} columns={columns} checkboxSelection />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    originators: state.originators
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchOriginators: () => dispatch(fetchOriginators())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OriginatorsTab);









  


