import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as contactsActions from './state/contactsActions'
import * as contactMethodsActions from './ContactMethods/state/contactMethodsActions'
import { ContactMethod } from './ContactMethods/XContactMethods'
import { ContactsList } from './ContactList'
import { ContactDetails } from './ContactDetails'

import ContactToolBar from './ContactToolbar'

export const Contacts = () => {
  const { currentState, methodsState } = useSelector(
    (state: RootState) => ({
      currentState: state.contacts,
      methodsState: state.contactMethods,
    }),
    shallowEqual
  )

  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [list, setList] = useState([] as any)
  const [listMethods, setListMethods] = useState([] as any)
  const [methodLoading, setMethodLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

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

        MethodDispatch(contactMethodsActions.fetchContactMethods(id))
      }
      // eslint-disable-next-line
    }, [MethodDispatch, selectedContact])
  }
  GetMethods()

  useEffect(() => {
    if (
      methodsState &&
      methodsState.contactMethodsTable &&
      methodsState.contactMethodsTable.success &&
      methodsState.contactMethodsTable.entities
    ) {
      setListMethods(methodsState.contactMethodsTable.entities)
      setMethodLoading(methodsState.listLoading)
    }
  }, [methodsState])

  return (
    <>
      <ContactToolBar />

      <Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} direction="row" justify="space-evenly">
            <Grid key={1} xs={3} item>
              <ContactsList isLoading={isLoading} list={list} setSelectedItemIndex={setSelectedItemIndex} />
            </Grid>
            <Grid key={2} xs={4} item>
              <ContactDetails selectedContact={selectedContact} />
            </Grid>
            <Grid key={3} xs={4} item>
              <ContactMethod
                listMethods={listMethods}
                methodLoading={methodLoading}
                selectedContact={selectedContact}
                methodsState={methodsState}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
