import React, {useEffect, useState} from 'react'
/* eslint-disable no-restricted-imports*/

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as contactsActions from "./state/contactsActions";
import * as contactMethodsActions from "./ContactMethods/state/contactMethodsActions";
import {ContactMethod} from './ContactMethods/ContactMethods'
import { ContactsList } from "./ContactList";
import { ContactDetails } from "./ContactDetails";
import { RootState } from "../../../redux/rootReducer";


const useStyles = makeStyles((theme) => ({
  root: {
   
  }
}))

export const Contacts = () => {
  const {currentState, methodsState} = useSelector(
    (state: RootState) => ({
      currentState: state.contacts,
      methodsState: state.contactMethods,
    }),
    shallowEqual
  )


  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [list, setList] = useState([] as any);
  const [listMethods, setListMethods] = useState([] as any);
  const [methodLoading, setMethodLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();


  let selectedContact = {}

  if (list && list[selectedItemIndex]) {
    selectedContact = list[selectedItemIndex]
  }
  // contact Redux state
  const GetAllContacts = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(contactsActions.fetchContacts())
      }
    }, [dispatch])
  }
  GetAllContacts()

  // console.log(methodsState)

  useEffect(() => {
    if (
      currentState &&
      currentState.contactsTable &&
      currentState.contactsTable.success &&
      currentState.contactsTable.entities
    ) {
      setList(currentState.contactsTable.entities)
      setIsLoading(currentState.listLoading)
    }
  }, [currentState])

  const GetMethods = () => {
    let MethodDispatch = useDispatch()
    useEffect(() => {
      let len = Object.keys(selectedContact)
      if (len.length >= 1) {
        let id = (selectedContact as any)?.id

        MethodDispatch(contactMethodsActions.fetchContactMethods(id));
      }
      // eslint-disable-next-line 
    }, [MethodDispatch, selectedContact]);

  }
  GetMethods()

  useEffect(() => {
    if (
      methodsState &&
      methodsState.contactMethodsTable &&
      methodsState.contactMethodsTable.success &&
      methodsState.contactMethodsTable.entities
    ) {
      setListMethods(methodsState.contactMethodsTable.entities);
      setMethodLoading(methodsState.listLoading);
    }
  }, [methodsState]);


  return (
    <Grid  className={classes.root}>
      <Grid item md={12}>
        <Grid container spacing={1} direction="row" justify="space-evenly">
          <Grid
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
            key={2}
            md={4}
            item
          >
            <ContactDetails selectedContact={selectedContact} />
          </Grid>
          <Grid
            key={3}
            md={4}
            item
          >
            <ContactMethod 
            listMethods={listMethods}
            methodLoading={methodLoading}
            selectedContact={selectedContact}
             />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
