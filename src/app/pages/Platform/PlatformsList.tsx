import React, { useEffect } from "react";
import { AppBar, Tabs, Tab, Typography, Box, Grid, Card, CardHeader, CardContent, Toolbar, InputBase } from '@material-ui/core/';
import { connect } from 'react-redux';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import { XGrid, LicenseInfo } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';


import { fetchPlatformslist } from "../../../redux/platforms/actions";
import Details from './Details';
import Originators from './Originators';

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x',
  );


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


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

// const rows = [...]
const rows = [
  {
    id:"cd388e16-7707-5045-aa91-fde9c45a08be",
    contact_id:"91ed9231-d3df-4ecd-ace3-de0d15f05e55",
    category:null,
    status:"Active",
    liquidity:"High",
    term:"30d",
    invest_mode:null,
    min_investment:"€10",
    secondary_market:"No",
    taxes:"PeerBerry does not deduct any tax or send information to any tax agency.",
    cashflow_options:null,
    protection_scheme:null,
    cost:"Free",
    profitable:true,
    ifisa:null,
    structure:null,
    account_category:null,
    welcome_bonus:null,
    promo:null,
    promo_end:null,
    sm_notes:null,
    contact:"Not Found",
  }
]




const PlatformsList = (props: any) => {

  useEffect(() => {
    props.fetchPlatformslist();
  }, [])


  const { platformTable = [] } = props.platformslist


  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
  });
  

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="">
      <Grid container direction="column">
        <Card>
          <Toolbar variant="dense">
            <InputBase placeholder="Search…" />
          </Toolbar>
        </Card> 
        <Card>
          <CardContent>




            <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Originators" {...a11yProps(1)} />
          <Tab label="Originators User" {...a11yProps(2)} />
          <Tab label="Loans" {...a11yProps(3)} />
          <Tab label="Add a Loan" {...a11yProps(4)} />
          <Tab label="Account" {...a11yProps(5)} />
          <Tab label="Sync" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
            <TabPanel value={value} index={0}>
         <h1>Details tab page</h1>
         <p>Details content should go here... but this demo content will be here for now.</p>
         <div style={{ height: 600, width: '100%' }}>
           {console.log("Okay, this is working here...")}
           {console.log(props.platformslist.platformTable)}
            {/* <XGrid
              {...data}
              // {...props.platformslist.platformTable}
              loading={data.rows.length === 0}
              rowHeight={38}
              checkboxSelection
            /> */}
            {/* <DataGrid rows={rows} columns={columns} pageSize={100} checkboxSelection /> */}
            <DataGrid rows={props.platformslist.platformTable} columns={columns} pageSize={100} checkboxSelection />
          </div>
      </TabPanel>
            <TabPanel value={value} index={1}>
                <h1>Originators tab page</h1>
              <Originators />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <h1>Originators User</h1>
              <p>Details content goes here...</p>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <h1>Loans</h1>
              <p>Details content goes here...</p>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <h1>Add a Loan</h1>
              <p>Details content goes here...</p>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <h1>Account</h1>
              <p>Details content goes here...</p>
            </TabPanel>
            <TabPanel value={value} index={6}>
              <h1>Sync</h1>
              <p>Details content goes here...</p>
            </TabPanel>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}


const mapStateToProps = (state: any) => {
  return {
    platformslist: state.platformslist
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPlatformslist: () => dispatch(fetchPlatformslist())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsList);









  


