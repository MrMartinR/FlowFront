/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { Modal } from "react-bootstrap";
import { AccountCreateDialogHeader } from "./AccountCreateDialogHeader";
import { MyEnhancedAccountForm } from "./AccountCreateForm";
import { useAccountsUIContext } from "../AccountsUIContext";
import { useDispatch } from "react-redux";
import * as AccountActions from '../../../../redux/accounts/accountsActions'

export function AccountCreateDialog({ id, show, onHide, countriesTable, currencyTable }) {
  // Accounts UI Context
  const accountsUIContext = useAccountsUIContext();
  const accountsUIProps = useMemo(() => {
    return {
      initAccount: accountsUIContext.initAccount,
    };
  }, [accountsUIContext]);
  
  const dispatch = useDispatch();
  
  // server request for saving account
  const saveAccount = (account, callback) => {
    // console.log("ACCOUNT: ", account);
    dispatch(AccountActions.createAccount({account: account})).then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <AccountCreateDialogHeader id={id} />
      <MyEnhancedAccountForm
        saveAccount={saveAccount}
        countriesTable={countriesTable}
        currencyTable={currencyTable}
        actionsLoading={false}
        account={accountsUIProps.initAccount}
        onHide={onHide}
      />
    </Modal>
  );
}
