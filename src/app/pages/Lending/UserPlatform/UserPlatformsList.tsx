import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'
import { Grid, CardHeader } from '@material-ui/core'
import { fetchUserPlatformsList, fetchUserPlatformDetails } from '../state/userPlatformsActions'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
  { field: 'id', headerName: 'Id', width: 200 },
]

const UserPlatformsList = (props: any) => {
  const { fetchUserPlatformsList, fetchUserPlatformDetails } = props;
  const { userPlatformsTable = [] } = props.userPlatforms

  useEffect(() => {
    fetchUserPlatformsList()
  }, [fetchUserPlatformsList])

  const handleClick = (e: any) => {
    fetchUserPlatformDetails(e.row.id)
  }

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
    fetchUserPlatformDetails: (id: any) => dispatch(fetchUserPlatformDetails(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlatformsList)
