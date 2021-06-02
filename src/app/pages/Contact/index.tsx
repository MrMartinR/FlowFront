import { useEffect, useState } from 'react'
import { makeStyles, Grid, Container } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as contactsActions from './state/contactsActions'
import { ContactMethod } from './ContactMethods/ContactMethods'
import { ContactsList } from './ContactList'
import { ContactDetails } from './ContactDetails'
import { ContactToolBar } from './ContactToolbar'
import { UserSettings } from './UserSettings/UserSettings'
import { UserAlert } from '../../utils/UserAlert'

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
  // actualización do flag que indica se se pasou un id pola barra de direccions ou non
  useEffect(() => {
    if (params.id) {
      setIsContact(true)
    }
  }, [params.id])

  if (list.length > 1) {
    // se flag e true, o contact por defecto e o da barra de direccion, posición 0 en caso contrario
    if (isContact) {
      const selected = list.findIndex((itm: any) => itm.id === params.id)
      selected !== -1 && setSelectedItemIndex(selected)
      setIsContact(false)
    }
    // actualizacion de selected contact segundo o contact seleccionado na lista
    if (list[selectedItemIndex]) {
      selectedContact = list[selectedItemIndex]
    }
  }
  const dispatch = useDispatch()
  // Petición a API da lista de contacts
  useEffect(() => {
    dispatch(contactsActions.fetchContacts())
  }, [dispatch])
  // Recibida a resposta actualizase o state
  useEffect(() => {
    if (currentState.contactsTable && currentState.contactsTable.entities) {
      setList(currentState.contactsTable.entities)
    }
  }, [currentState.contactsTable])

  // Unha vez seleccionado un contact, petición a API dos details de ese contact
  useEffect(() => {
    if (selectedContact) {
      dispatch(contactsActions.fetchContact(selectedContact.id))
    }
  }, [dispatch, selectedContact])
  // recibida a resposta, actualizase o state
  useEffect(() => {
    if (currentState.singleContact && currentState.singleContact.entry && currentState.singleContact.entry.attributes) {
      setSingleContact(currentState.singleContact.entry)
      setListMethods(currentState.singleContact.entry.attributes.contact_methods)
    }
  }, [currentState.singleContact, currentState.singleContact.entry.attributes.contact_methods])
  // actualizacion dos flags de loading
  useEffect(() => {
    setIsLoading(currentState.listLoading)
    setActionsLoading(currentState.actionsLoading)
  }, [currentState.listLoading, currentState.actionsLoading])
  // resetea o state para que se oculte o snackbar
  const resetSuccess = () => {
    dispatch(contactsActions.resetSuccess())
  }
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
          <Grid item xs={5} container direction="column" spacing={1}>
            <Grid item>
              <ContactDetails selectedContact={singleContact} />
            </Grid>
            {/* user settings */}
            <Grid item>{authState.user.contact_id === singleContact.id && <UserSettings />}</Grid>
          </Grid>
          {/* contactmethods */}
          <Grid item xs={4}>
            <ContactMethod listMethods={listMethods} methodLoading={actionsLoading} selectedContact={singleContact} />
          </Grid>
        </Grid>
        {/* Alert */}
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
      </Grid>
    </Container>
  )
}
