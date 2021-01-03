import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal, Badge } from "react-bootstrap";

export const UserAccountCreateDialogHeader = ({ id }) => {
  // User Account Redux state
  const { userAccountForEdit, actionsLoading } = useSelector(
    (state) => ({
      userAccountForEdit: state.userAccounts.userAccountForEdit,
      actionsLoading: state.userAccounts.actionsLoading,
    }),
    shallowEqual
  );

  return (
    <>
      {actionsLoading}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {userAccountForEdit && id ? (
            <label>
              {" "}
              Edit userAccount{" "}
              <Badge variant="secondary">{userAccountForEdit.name}</Badge>
            </label>
          ) : (
            "Create User Account"
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  );
};
