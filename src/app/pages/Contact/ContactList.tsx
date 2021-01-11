import React from "react";
/* eslint-disable no-restricted-imports*/
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  CircularProgress,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";

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
  const classes = useStyles();
  const updateSelected = (value: any) => {
    setSelectedItemIndex(value);
  };
 

  return (
    <List className={classes.root} subheader={<li />}>
      <li key={`Contacts`} className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader>{`Contacts `}</ListSubheader>
          {/* TODO: I applied the type any to fix the error TS7006 */}
          {isLoading ? <CircularProgress color="secondary" /> :
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
              <ListItemText primary={`${item.trade_name}`} />
            </ListItem>
          ))
          }
        </ul>
      </li>
    </List>
  );
};
