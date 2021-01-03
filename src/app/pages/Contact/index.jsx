import React, { useEffect, useState } from "react";
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
  }, [currentState]);


  return (
      <div style={ContactsPageStyles.main}>
        <ContactsList
          perPage={perPage}
          isLoading={isLoading}
          list={list}
          currentPage={currentPage}
          totalPages={totalPages}
          setSelectedItemIndex={setSelectedItemIndex}
        />
        <ContactDetails
          selectedContact={selectedContact}
        />
      </div>
  );
};