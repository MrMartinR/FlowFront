import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUserPlatformsList } from '../state/userPlatformsActions'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'


import {
  Grid,
  Card,
  CardHeader,
  Typography,
  CardContent,
} from '@material-ui/core'


const columns: ColDef[] = [
  { field: 'id', headerName: 'Id', width: 200 },
]

const UserPlatformsList = (props: any) => {
  const { fetchUserPlatformsList } = props;
  const { userPlatformsTable = [], loading } = props.userPlatforms

  useEffect(() => {
    fetchUserPlatformsList()
  }, [fetchUserPlatformsList])



  const handleClick = (e: any) => console.log(e.row.id)


  return (
    <>
     <Grid container direction='column'>
        <CardHeader title='User Platforms'></CardHeader>
        <div style={{ height: 600, width: '100%' }}>
          <XGrid
            rows={userPlatformsTable}
            columns={columns}
            onRowClick={handleClick}
            disableMultipleSelection={true}
            loading={true}
          />
        </div>
      </Grid>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    userPlatforms: state.userPlatforms,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserPlatformsList: () => dispatch(fetchUserPlatformsList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlatformsList)
