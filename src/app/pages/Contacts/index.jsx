import React, { useEffect, useState } from "react";
import { ContactsUIProvider } from "./ContactsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as contactsActions from "./state/contactsActions";
import { ContactsList } from "./ContactList";
import { ContactDetails } from "./ContactDetails";

const ContactsPageStyles = {
  main: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    overflowY: "scroll",
  },
};

export const Contacts = ({ history }) => {
  // Getting curret state of contacts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.userAccounts }),
    shallowEqual
  );


  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [list, setList] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [perPage] = useState(10);
  let selectedContact = {};

  if (list && list[selectedItemIndex]) {
    selectedContact = list[selectedItemIndex];
  }
  // Accounts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    if (dispatch && perPage) {
      const pageNumber = 1;
      dispatch(
          contactsActions.fetchContacts({
          page: pageNumber,
          perPage: perPage,
        })
      );
      // dispatch(contactsActions.fetchAccountTransaction());
    }
  }, [dispatch, perPage]);

  useEffect(() => {
    if (
      currentState &&
      currentState.userAccountTable &&
      currentState.userAccountTable.success &&
      currentState.userAccountTable.data &&
      currentState.userAccountTable.data.length > 0
    ) {
      setList(currentState.userAccountTable.data);
      setCurrentPage(currentState.userAccountTable.page);
      setTotalPages(currentState.userAccountTable.pages);
      setIsLoading(currentState.listLoading);
    }
    if (
      currentState &&
      currentState.userAccountTransactions &&
      currentState.userAccountTransactions &&
      currentState.userAccountTransactions.length > 0
    ) {
      setAllTransactions(currentState.userAccountTransactions);
    }
  }, [currentState]);

  const userAccountsUIEvents = {
    newAccountButtonClick: () => {
      history.push("/user_accounts/new");
    },
    openEditAccountDialog: (id) => {
      history.push(`/user_accounts/${id}/edit`);
    },

  };

  return (
    <ContactsUIProvider userAccountsUIEvents={userAccountsUIEvents}>

      <div style={ContactsPageStyles.main}>
        <ContactsList
          perPage={perPage}
          isLoading={isLoading}
          list={list}
          currentPage={currentPage}
          totalPages={totalPages}
          setSelectedItemIndex={setSelectedItemIndex}
          newAccountFunc={userAccountsUIEvents.newAccountButtonClick}
          style={{ position: "static" }}
          allTransactions={allTransactions}
        />
        <ContactDetails
          allTransactions={allTransactions}
          selectedContact={selectedContact}
          selectedItemIndex={selectedItemIndex}
        />
      </div>
    </ContactsUIProvider>
  );
};


// import React from 'react';
// import { useSubheader } from '../../../_metronic/layout';

// export const ContactsPage = () => {
//     const suhbeader = useSubheader();
//     suhbeader.setTitle('Contacts');

//     return <h1>Contacts Page</h1>;
// };
