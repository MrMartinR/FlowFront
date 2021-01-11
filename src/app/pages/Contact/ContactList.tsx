import React, { useEffect, useState } from "react";
/* eslint-disable no-restricted-imports*/
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 650,
    top: 20,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

export const ContactsList = (props: any) => {
  const { setSelectedItemIndex, isLoading, list } = props;
  const [options, setOptions] = useState([] as any);
  const classes = useStyles();
  const updateSelected = (value: any) => {
    setSelectedItemIndex(value);
  };

  useEffect(() => {
    if (list.length >= 1) {
      let opt = list.map((option: any) => option.trade_name);
      let options = opt.filter((item: any) => item !== null);
      setOptions(options);
    }
  }, [list]);

  const handlePick = (e: any, v: any) => {
    let selected = list.map((itm: any, idx: any) => {
      if (itm.trade_name === v) {
        return idx;
      }
      return undefined
    });
    let index = selected.filter((itm: any) => itm !== undefined);
    setSelectedItemIndex(index[0]);
  };

  return (
    <div>
      {isLoading ? (
        <p>loading ...</p>
      ) : (
        <div style={{ width: 300,}}>
          <Autocomplete
            freeSolo
            options={options}
            onChange={handlePick}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                margin="normal"
                variant="outlined"
              />
            )}
          />
        </div>
      )}

      <List className={classes.root} subheader={<li />}>
        <li key={`Contacts`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`Contacts `}</ListSubheader>
            {/* TODO: I applied the type any to fix the error TS7006 */}
            {isLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              list.map((item: any, idx: any) => (
                <ListItem
                  key={`${item.id}`}
                  button
                  onClick={(e) => {
                    updateSelected(idx);
                  }}
                >
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${item.trade_name || item.nick}`} />
                </ListItem>
              ))
            )}
          </ul>
        </li>
      </List>
    </div>
  );
};
