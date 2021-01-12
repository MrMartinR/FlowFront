import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core/';

import Details from './Details';
import Originators from './Originators';

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
         <h1>Details tab page</h1>
         <p>Details content should go here... but this demo content will be here for now.</p>
         <Details />
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
    </div>
  );
}

export default PlatformsList;
