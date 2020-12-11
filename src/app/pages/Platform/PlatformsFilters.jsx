import { Select, FormControl, InputLabel, Checkbox, MenuItem, ListItemText, Input, Button, Typography, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/platforms/platformsActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const statusOptions = [
  'Active',
  'Administration',
  'Closing',
  'Dead',
  'Dodgy',
  'Merged',
  'Paused',
  'Scam',
  'Stopped',
  'Stopping',
  'Unknown',
];

const catOptions = [
  'Bonds',
  'Business Lending',
  'Consumer Lending',
  'Equity Based',
  'Equity Property',
  'Invoice Trading',
  'Property Lending',
  'Litigation',
];

const protOptions = [
  'BuyBack Guarantee',
  'Collateral',
  'Provision Fund',
  'Personal Guarantee',
];


const PlatformsFilters = ({ history }) => {
  
  const classes = useStyles();
  const [statusList, setSetStatusList] = React.useState([]);
  const [catList, setCatList] = React.useState([]); // selected category list
  const [protList, setProtList] = React.useState([]); // selected protection list
  const [secMarketYes, setSecMarketYes] = React.useState(false);
  const [secMarketNo, setSecMarketNo] = React.useState(false);
  // const [protList, setProtList] = React.useState([]); // selected protection list
  
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.name === 'status') {
      setSetStatusList(event.target.value);
    }
    else if (event.target.name === 'category') {
      setCatList(event.target.value);
    }
    else if (event.target.name === 'protection') {
      setProtList(event.target.value);
    }
    else if (event.target.name === 'yes') {
      if (event.target.checked) {
        setSecMarketYes(true)
      }
      else {
        setSecMarketYes(false)
      }
      // console.log("yes")
      // console.log(event.target.checked)
    }
    else if (event.target.name === 'no') {
      if (event.target.checked) {
        setSecMarketNo(true)
      }
      else {
        setSecMarketNo(false)
      }
    }
  };

  const filterResult = () => {
    dispatch(actions.filterPlatforms({statusList, catList, protList, secMarketYes, secMarketNo}))
    history.push("/platforms")
  }

  return (
    <div className="pf_filtersContainer">
      <div className="pf_filtersInnerContainer">
        <Typography variant="h4">Filters</Typography>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="demo-mutiple-checkbox-label">Status</InputLabel>
          <Select
            name="status"
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={statusList}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {statusOptions.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={statusList.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="demo-mutiple-checkbox-label">Category</InputLabel>
          <Select
            name="category"
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={catList}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {catOptions.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={catList.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="demo-mutiple-checkbox-label">Protection</InputLabel>
          <Select
            name="protection"
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={protList}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {protOptions.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={protList.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>
          <div>
          <Typography className="mr-5" variant="p">Secondary Market</Typography>
          <FormControlLabel
            control={
              <Checkbox
                // checked={checked}
                onChange={handleChange}
                name="yes"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Yes"
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={checked}
                onChange={handleChange}
                name="no"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="No"
          />
          </div>
        </div>

        <Button variant="contained" color="default" onClick={filterResult}>Filter</Button>
      </div>
    </div>
  )
}

export default PlatformsFilters
