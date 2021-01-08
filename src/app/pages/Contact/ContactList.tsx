import React from "react";
/* eslint-disable no-restricted-imports*/
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 580,
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

export const ContactsList = (props) => {
  const { setSelectedItemIndex, isLoading, list } = props;
  const classes = useStyles();
  const updateSelected = (value) => {
    setSelectedItemIndex(value);
  };

  return (
    <List className={classes.root} subheader={<li />}>
      <li key={`Contacts`} className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader>{`Contacts `}</ListSubheader>
          {list.map((item, idx) => (
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
          ))}
        </ul>
      </li>
    </List>
  );
};
