import React from "react";
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  Card,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { green } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import AddContactMethodForm from "./AddContactMethodForm"
import EditContactMethodForm from "./EditContactMethodForm"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "relative",
      overflow: "auto",
      height: "100%",
      top: 20,
    },
    green: {
      color: "#fff",
      backgroundColor: green[500],
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      margin: "auto",
    },
    add: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
    },
  })
);

export const ContactMethod = (props: any) => {
  const { methodLoading, listMethods, selectedContact} = props;
  const classes = useStyles();
  const err = "Not Found";
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(true);
  const [edit, setEdit] = React.useState(null);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleOpen = (e: any, value: any, itm= null) => {
    if (value === "add") {
      setAdd(true);
    }
    if (value === "edit") {
      setAdd(false);
      setEdit(itm)
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <>
      {add === true ? (
        <>
          <h2 id="simple-modal-title">Add Contact methods</h2>

          <AddContactMethodForm selectedContact={selectedContact}/>

        </>
        
      ) : (
        <>
          <h2 id="simple-modal-title">Edit Contact methods</h2>
          <EditContactMethodForm selectedContact={selectedContact} edit={edit}/>
        </>
      )}
    </>
  );

  return (
    <Card className={classes.root} variant="outlined">
      <Fab
          className={classes.add}
          aria-label="add"
          id="add"
          onClick={(e) => handleOpen(e, "add")}
        >
          <AddIcon />
        </Fab>
        
        <Dialog open={open} onClose={handleClose} >
        <DialogContent>
          {body}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          
        </DialogActions>
      </Dialog>
      {methodLoading === true ? (
        <CircularProgress color="secondary" />
      ) : listMethods.length >= 1 ? (
        listMethods.map((itm: any, idx:any) => (
          <Accordion
            expanded={expanded === `panel${idx}`}
            onChange={handleChange(`panel${idx}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Avatar className={classes.green}>
                <AssignmentIcon />
              </Avatar>

              <Typography className={classes.secondaryHeading}>
                {itm.kind || err}
              </Typography>
              <Fab
          className={classes.add}
          aria-label="edit"
          onClick={(e) => handleOpen(e, "edit", itm)}
        >
          <EditIcon />
        </Fab>
            </AccordionSummary>
            <AccordionDetails>
              <List
                component="nav"
                className={classes.root}
                aria-label="contacts"
              >
                <ListItem button>
                  <ListItemIcon >
                    <StarIcon />
                      
                  </ListItemIcon>
                  <ListItemText primary={itm.data} />
                  
                </ListItem>
                <ListItem button >
                  <ListItemIcon >
                    <StarIcon  />
                  </ListItemIcon>
                  <ListItemText primary="Visibility" />
                  {itm.visibility}
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </Card>
  );
};
