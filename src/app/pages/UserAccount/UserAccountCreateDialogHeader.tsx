import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Modal, Badge } from 'react-bootstrap'
import { RootState } from '../../../redux/rootReducer'

export const UserAccountCreateDialogHeader = (props: any) => {
  const { id } = props
  // User Account Redux state
  const { userAccountForEdit, actionsLoading } = useSelector(
    (state: RootState) => ({
      userAccountForEdit: state.userAccounts.userAccountForEdit,
      actionsLoading: state.userAccounts.actionsLoading,
    }),
    shallowEqual
  )

  return (
    <>
      {actionsLoading}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {userAccountForEdit && id ? (
            <label>
              {' '}
              Edit userAccount <Badge variant="secondary">{userAccountForEdit.name}</Badge>
            </label>
          ) : (
            'Create User Account'
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  )
}
