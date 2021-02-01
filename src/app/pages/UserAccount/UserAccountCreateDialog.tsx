/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { Modal } from "react-bootstrap";
import { EnhancedUserAccountForm } from "./EnhancedUserAccountForm";
import { initAccount } from "./UserAccountsUIContext";
import { useDispatch } from "react-redux";
import * as AccountActions from "../../../redux/accounts/accountsActions";
import { UserAccountCreateDialogHeader } from "./UserAccountCreateDialogHeader";

interface Props {
  // saveAccount: () => void;
  countriesTable:any;
  currencyTable:any;
  show:boolean;
  onHide: () => void;
}

export const UserAccountCreateDialog: React.FC<Props> = (props: any) => {
  const {
    id,
    show,
    onHide,
    countriesTable,
    currencyTable,
  } = props
  // Accounts UI Context
  const accountsUIProps = useMemo(() => {
    return {
      initAccount,
    };
  }, [initAccount]);

  const dispatch = useDispatch();

  // server request for saving account
  const saveAccount = (account: any, callback: any) => {
    // console.log("ACCOUNT: ", account);
    dispatch(AccountActions.createAccount(account))
    onHide()
    // .then(() => onHide());
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <UserAccountCreateDialogHeader id={id} />
      <EnhancedUserAccountForm
        saveAccount={saveAccount}
        countriesTable={countriesTable}
        currencyTable={currencyTable}
        actionsLoading={false}
        account={accountsUIProps.initAccount}
        onHide={onHide}
      />
    </Modal>
  );
};
