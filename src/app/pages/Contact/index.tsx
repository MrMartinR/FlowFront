import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as contactsActions from './state/contactsActions'
import { ContactMethod } from './ContactMethods/ContactMethods'
import { ContactsList } from './ContactList'
import { ContactDetails } from './ContactDetails'

import ContactToolBar from './ContactToolbar'

export const Contacts = () => {
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.contacts,
    }),
    shallowEqual
  )

  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [list, setList] = useState([] as any)
  const [listMethods, setListMethods] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const [actionsLoading, setActionsLoading] = useState(true)

  let selectedContact = {}
  const [singleContact, setSingleContact] = useState({})

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
  GetAllContacts();

  const GetContact = () => {
    let ContactDispatch = useDispatch()
    useEffect(() => {
      let len = Object.keys(selectedContact)
      if (len.length >= 1) {
        let id = (selectedContact as any)?.id
        ContactDispatch(contactsActions.fetchContact(id))
      }
    }, [ContactDispatch, selectedContact ])
  }
  GetContact();


  useEffect(() => { if (
      currentState&&
      currentState.contactsTable &&
      currentState.contactsTable.entities
    ) {
      setList(currentState.contactsTable.entities);
      setIsLoading(currentState.listLoading);
    }
  }, [currentState.contactsTable]);

  useEffect(() => { if (
      currentState.singleContact &&
      currentState.singleContact.entry &&
      currentState.singleContact.entry.attributes
    ) {
      setSingleContact(currentState.singleContact.entry)
      setListMethods(currentState.singleContact.entry.attributes.contact_methods);
    }
  }, [currentState.singleContact, currentState.singleContact.entry.attributes.contact_methods]);

  useEffect( () => {
    setIsLoading(currentState.listLoading);
    setActionsLoading(currentState.actionsLoading);
  }, [currentState.listLoading, currentState.actionsLoading]);

  return (
    <>
      <ContactToolBar selectedContact = { singleContact } />

      <Grid>
        <Grid key = {0} item xs={12}>
          <Grid container spacing={1} direction="row" justify="space-evenly">
            <Grid key={1} xs={3} item>
              <ContactsList isLoading={isLoading} list={list} setSelectedItemIndex={setSelectedItemIndex} />
            </Grid>
            <Grid key={2} xs={4} item>
              <ContactDetails selectedContact={singleContact} />

            </Grid>
            <Grid key={3} xs={4} item>
              <ContactMethod
                listMethods={listMethods}
                methodLoading={actionsLoading}
                selectedContact={singleContact}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}