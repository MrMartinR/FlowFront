import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core/'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'
import UserPlatformsListToolbar from './UserPlatformsListToolbar'
import { fetchUserPlatformsList } from './state/userPlatformsActions'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
  { field: 'id', headerName: 'id', width: 200 },
]

const UserPlatformsList = (props: any) => {
  const { fetchUserPlatformsList } = props
  const { userPlatformsTable = [], loading } = props.platforms

  useEffect(() => {
    fetchUserPlatformsList()
  }, [fetchUserPlatformsList])

  const linkTo = useHistory()
  // const handleClick = (e: any) => linkTo.push(`/user_platforms/${e.row.id}`)
  const handleClick = (e: any) => console.log(e.row.id)
  if (loading) {
    return (
      <>
        <Typography variant='h5'>Loading user platforms...</Typography>
      </>
    )
  }
  return (
    <>
      <UserPlatformsListToolbar />
      <Grid container direction='column'>
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
