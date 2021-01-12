import React from 'react';
import {AppBar} from '@material-ui/core/';
import {Tabs} from '@material-ui/core/';
import {Tab} from '@material-ui/core/';
import {Typography} from '@material-ui/core/';
import {Box} from '@material-ui/core/';

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

const PlatformsList = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="">
    {/* <div className={classes.root}> */}
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
         Details
      </TabPanel>
      <TabPanel value={value} index={1}>
        Originators
      </TabPanel>
      <TabPanel value={value} index={2}>
        Originators User
      </TabPanel>
      <TabPanel value={value} index={3}>
        Loans
      </TabPanel>
      <TabPanel value={value} index={4}>
        Add a Loan
      </TabPanel>
      <TabPanel value={value} index={5}>
        Account
      </TabPanel>
      <TabPanel value={value} index={6}>
        Sync
      </TabPanel>
    </div>
  );
}

export default PlatformsList;
