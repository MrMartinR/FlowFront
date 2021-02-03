/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'
import { Modal } from 'react-bootstrap'
import { EnhancedUserAccountForm } from './EnhancedUserAccountForm'
import { initAccount } from './UserAccountsUIContext'
import { useDispatch } from 'react-redux'
// FIX THIS, do not refer to old js files
import * as AccountActions from '../Account/XXX/accountsActions'
import { UserAccountCreateDialogHeader } from './UserAccountCreateDialogHeader'

export const UserAccountCreateDialog = ({ id, show, onHide, countriesTable, currencyTable }) => {
  // Accounts UI Context
  const accountsUIProps = useMemo(() => {
    return {
      initAccount,
    }
  }, [initAccount])

  const dispatch = useDispatch()

  // server request for saving account
  const saveAccount = (account, callback) => {
    // console.log("ACCOUNT: ", account);
    dispatch(AccountActions.createAccount(account)).then(() => onHide())
  }

  return (
    <Modal size="lg" show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
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
  )
}
