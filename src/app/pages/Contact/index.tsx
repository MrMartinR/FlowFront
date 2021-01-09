import React, { useEffect, useState } from "react";
/* eslint-disable no-restricted-imports*/
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as contactsActions from "./state/contactsActions";
import { ContactsList } from "./ContactList";
import { ContactDetails } from "./ContactDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(1),
    spacing: 1,
  },
}));

export const Contacts = () => {
  // Getting curret state of contacts list from store (Redux)
  const { currentState } = useSelector(
    (state: RootState) => ({ currentState: state.contacts }),
    shallowEqual
  );

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  let selectedContact = {};

  if (list && list[selectedItemIndex]) {
    selectedContact = list[selectedItemIndex];
  }
  // Accounts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    if (dispatch) {
      dispatch(contactsActions.fetchContacts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      currentState &&
      currentState.contactsTable &&
      currentState.contactsTable.success &&
      currentState.contactsTable.entities &&
      currentState.contactsTable.entities.length > 0
    ) {
      setList(currentState.contactsTable.entities);
      setIsLoading(currentState.listLoading);
    }
  }, [currentState]);

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item md={12}>
        <Grid container justify="center" spacing={1} md={12} item>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            key={1}
            md={4}
            item
          >
            <ContactsList
              isLoading={isLoading}
              list={list}
              setSelectedItemIndex={setSelectedItemIndex}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            key={2}
            md={4}
            item
          >
            <ContactDetails selectedContact={selectedContact} />
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
            key={3}
            md={4}
            item
          >
            contact meth
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
