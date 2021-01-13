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
  Chip,
  Grid,
  Avatar,
} from "@material-ui/core";
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
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
    square: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      margin: 5,
      width:"100%",
      height: "45%",
    },
  })
);

export const ContactDetails = (props: any) => {
  const { selectedContact } = props;
  const classes = useStyles();
  const err = "Not Found";
  console.log(selectedContact);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid className={classes.root} spacing={1}>
          <Grid container md={12}>
            <Grid container direction="row" justify="space-evenly">
              <div style={{ width: "50%", }}>
                <Avatar variant="square" className={classes.square}>
                  ICON
                </Avatar>
                <Avatar variant="square" className={classes.square}>
                  FLAG
                </Avatar>
              </div>
              <div style={{ width: "50%", }}>
                {selectedContact.kind === "Company" ? (
                  <List
                    component="nav"
                    className={classes.list}
                    aria-label="mailbox folders"
                  >
                     <Divider />
                     Company
                     <Divider />
                    <ListItem button>
                      <ListItemText
                        primary={` ${selectedContact.trade_name || err}`}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText
                        primary={` ${selectedContact.company_name || err}`}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                      <ListItemText
                        primary={` ${selectedContact.id_number || err}`}
                      />
                    </ListItem>
                    <Divider light />
                    <ListItem button>
                      <ListItemText
                        primary={` ${selectedContact.founded || err}`}
                      />
                    </ListItem>
                    <Divider />
                  </List>
                ) : (
                  <List
                    component="nav"
                    className={classes.list}
                    aria-label="mailbox folders"
                  >
                     <Divider />
                     Individual
                     <Divider />
                    <ListItem button>
                      <ListItemText
                        primary={` ${selectedContact.name || err}`}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText
                        primary={` ${selectedContact.surname || err}`}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                      <ListItemText
                        primary={` ${selectedContact.id_number || err}`}
                      />
                    </ListItem>
                    <ListItem button>
                      <ListItemText
                        primary={` ${selectedContact.nick || err}`}
                      />
                    </ListItem>
                  </List>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
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
