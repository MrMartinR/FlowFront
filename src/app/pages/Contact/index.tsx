import { useEffect, useState } from 'react'
import { makeStyles, Grid, Container } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as contactsActions from './state/contactsActions'
import { ContactMethod } from './ContactMethods/ContactMethods'
import { ContactsList } from './ContactList'
import { ContactDetails } from './ContactDetails'

import { ContactToolBar } from './ContactToolbar'
import { ContactAlert } from './ContactAlert'
import { UserSettings } from './UserSettings/UserSettings'

/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const Contacts = (props: any) => {
  /* styles */
  const classes = useStyles()

  const { match } = props
  const { params } = match
  const { currentState, authState } = useSelector(
    (state: RootState) => ({
      currentState: state.contacts,
      authState: state.auth,
    }),
    shallowEqual
  )
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [isContact, setIsContact] = useState(false)
  const [list, setList] = useState([] as any)
  const [listMethods, setListMethods] = useState([] as any)
  const [isLoading, setIsLoading] = useState(false)
  const [actionsLoading, setActionsLoading] = useState(false)
  const [singleContact, setSingleContact] = useState({} as any)
  let selectedContact = null as any
  if (list.length > 1) {
    if (isContact) {
      const selected = list.findIndex((itm: any) => itm.id === params.id)
      selected !== -1 && setSelectedItemIndex(selected)
      setIsContact(false)
    }

    if (list[selectedItemIndex]) {
      selectedContact = list[selectedItemIndex]
    }
  }
  /* contact Redux state */
  const GetAllContacts = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(contactsActions.fetchContacts())
      }
    }, [dispatch])
  }
  GetAllContacts()

  const GetContact = () => {
    let ContactDispatch = useDispatch()
    useEffect(() => {
      if (selectedContact) {
        ContactDispatch(contactsActions.fetchContact(selectedContact.id))
      }
    }, [ContactDispatch, selectedContact])
  }
  GetContact()

  useEffect(() => {
    if (params.id) {
      setIsContact(true)
    }
  }, [params.id])
  useEffect(() => {
    if (currentState.contactsTable && currentState.contactsTable.entities) {
      setList(currentState.contactsTable.entities)
    }
  }, [currentState.contactsTable])

  useEffect(() => {
    if (currentState.singleContact && currentState.singleContact.entry && currentState.singleContact.entry.attributes) {
      setSingleContact(currentState.singleContact.entry)
      setListMethods(currentState.singleContact.entry.attributes.contact_methods)
    }
  }, [currentState.singleContact, currentState.singleContact.entry.attributes.contact_methods])

  useEffect(() => {
    setIsLoading(currentState.listLoading)
    setActionsLoading(currentState.actionsLoading)
  }, [currentState.listLoading, currentState.actionsLoading])
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <ContactToolBar selectedContact={singleContact} />

        <Grid container justify="space-around">
          {/* contactlists */}
          <Grid item xs={3}>
            <ContactsList isLoading={isLoading} list={list} setSelectedItemIndex={setSelectedItemIndex} />
          </Grid>
          {/* contactdetails */}
          <Grid item container xs={9} justify="space-around">
            <Grid item xs={6}>
              <ContactDetails selectedContact={singleContact} />
            </Grid>
            {/* contactmethods */}
            <Grid item xs={6}>
              <ContactMethod listMethods={listMethods} methodLoading={actionsLoading} selectedContact={singleContact} />
            </Grid>

            {/* begin: user settings */}
            <Grid item container>
              <Grid item xs={6}>
                {authState.user.contact_id === singleContact.id && <UserSettings />}
              </Grid>
            </Grid>
            {/* end: user settings */}
          </Grid>
        </Grid>
        {/* Alert */}
        <ContactAlert />
      </Grid>
    </Container>
  )
}
