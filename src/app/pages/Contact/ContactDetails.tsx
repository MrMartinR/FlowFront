import React from "react";
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  ListItemText,
  CardContent,
  Card,
  Divider,
  ListItem,
  List,
  Chip
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 400,
      position: "relative",
      overflow: "auto",
      height: "100%",
      top: 20,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    list: {
      width: "100%",
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const ContactDetails = (props: any) => {
  const { selectedContact } = props;
  const classes = useStyles();
  const err = "Not Found";

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>

        <List
          component="nav"
          className={classes.list}
          aria-label="mailbox folders"
        >
          <ListItem button>
            <ListItemText primary="Company" />
            {` ${selectedContact.company_name || err}`}
          </ListItem>
          <Divider />
          {/* <ListItem button>
            <ListItemText primary="Country" />
            {` ${selectedContact.country.name || err}`}
          </ListItem>
          <Divider /> */}
          <ListItem button divider>
            <ListItemText primary="Kind" />
            {` ${selectedContact.kind || err}`}
          </ListItem>
          <ListItem button>
            <ListItemText primary="Visibility" />
            {` ${selectedContact.visibility || err}`}
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="Legal form" />
            {` ${selectedContact.legal_form || err}`}
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Trade name" />
            {` ${selectedContact.trade_name || err}`}
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Nick" />
            {` ${selectedContact.nick || err}`}
          </ListItem>
        </List>
        <Divider />
        <Typography variant="body2" component="p">
          <br />
          {`${selectedContact.description || err}`}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
      <Chip label={`${selectedContact.tags || err}`} />
      <Chip label={`${selectedContact.tags || err}`} />
      </CardContent>
    </Card>
  );
};
