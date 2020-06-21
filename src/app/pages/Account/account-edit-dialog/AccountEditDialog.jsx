import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/accounts/accountsActions";
import { AccountEditDialogHeader } from "./AccountEditDialogHeader";
import { MyEnhancedAccountForm } from "./AccountEditForm";
import { useAccountsUIContext } from "../AccountsUIContext";

export function AccountEditDialog({ id, show, onHide }) {
  // Accounts UI Context
  const accountsUIContext = useAccountsUIContext();
  const accountsUIProps = useMemo(() => {
    return {
      initAccount: accountsUIContext.initAccount,
    };
  }, [accountsUIContext]);

  // Accounts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, accountForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.accounts.actionsLoading,
      accountForEdit: state.accounts.accountForEdit,
    }),
    shallowEqual
  );
  
  useEffect(() => {
    // server call for getting Account by id
    dispatch(actions.fetchAccount(id));
  }, [id]);
  
  // server request for saving account
  const saveAccount = (account) => {
    if (!id) {
      // server request for creating account
      dispatch(actions.createAccount(account)).then(() => onHide());
    } else {
      // server request for updating account
      dispatch(actions.updateAccount(account)).then(() => onHide());
    }
  };
  console.log("CCC", accountForEdit)

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <AccountEditDialogHeader id={id} />
      <MyEnhancedAccountForm
        saveAccount={saveAccount}
        actionsLoading={actionsLoading}
        account={accountForEdit || accountsUIProps.initAccount}
        onHide={onHide}
      />
    </Modal>
  );
}
