import { useEffect, useState } from 'react'
import { XGrid, LicenseInfo, GridColDef } from '@material-ui/x-grid'
import { Grid, CardHeader, LinearProgress, TextField } from '@material-ui/core'
import { RootState } from '../../../../redux/rootReducer'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as userPlatformsActions from './../state/userPlatformsActions'
import { Autocomplete } from '@material-ui/lab'
LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: GridColDef[] = [{ field: 'id', headerName: 'ID', width: 200 }]

export const UserPlatformsList = (props: any) => {
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userPlatforms,
    }),
    shallowEqual
  )
  const [options, setOptions] = useState([] as any)
  useEffect(() => {
    if (list.length >= 1) {
      let opt = [] as any
      list.map((option: any) => {
        if (option.id!==undefined){
          opt.push(option.id);
        }
        return opt;
      })
      setOptions(opt);
    }
  }, [list])
  const handlePick = (e: any, v: any) => {
    let selected = list.find((itm: any) => itm.id === v);
    (selected)&&dispatch(userPlatformsActions.fetchUserPlatformDetails(selected.id));
  }
  const dispatch = useDispatch()
  const GetAllUserPlatforms = () => {
    useEffect(() => {
      if (dispatch) {
        dispatch(userPlatformsActions.fetchUserPlatformsList());
      } 
    }, [])
  }
  GetAllUserPlatforms();
  useEffect(() => { if (
    currentState.userPlatformsTable
    ) {
      setList(currentState.userPlatformsTable);
    }
  }, [currentState.userPlatformsTable]);

  const rows = [] as any;
  if (list.length >1) list.map((platform: any) => {
    const newRow = {
      id : platform.id,
      trade_name: platform.attributes.contact?.trade_name||'',
    }
    rows.push(newRow);
    return rows;
  })
  const handleClick = (e: any) => {
    dispatch(userPlatformsActions.fetchUserPlatformDetails(e.row.id));
  }
  useEffect( () => {
    setIsLoading(currentState.loading);
  }, [currentState.loading]);
  return (
    <>
      {isLoading ? (
        <Grid container direction="column">
          <LinearProgress color="secondary" />
        </Grid>
      ) : (
        <Grid container direction="column">
          <Autocomplete
            freeSolo
            options={options}
            onChange={handlePick}
            renderInput={(params) => <TextField {...params} label="Search" margin="normal" variant="outlined" />}
          />
          <CardHeader title="User Platforms"></CardHeader>
          <div style={{ height: 600, width: '100%' }}>
            <XGrid
              rows={rows}
              columns={columns}
              onRowClick={handleClick}
              disableMultipleSelection={true}
              loading={isLoading}
            />
          </div>
        </Grid>
      )}
    </>
  )
}
